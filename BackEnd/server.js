const http = require('http');
const fs = require('fs');
const path = require('path');

const Database = require('better-sqlite3');
const db = new Database('tasks.db');


const server = http.createServer((req, res) => {

    if (req.method ==='GET' && req.url === '/') {
        const filePath = path.join(__dirname, '../FrontEnd/index.html');

        const html = fs.readFileSync(filePath, 'utf-8');

        res.writeHead(200,{
            'Content-type': 'text/html'
        });

        res.end(html)

    }
    else if (req.method === 'GET' && req.url === '/script.js') {
        const filePath = path.join(__dirname, '../FrontEnd/script.js');

        const js = fs.readFileSync(filePath, 'utf-8');

        res.writeHead(200,{
            'Content-type': 'application/javascript'
        });

        res.end(js)
    }

    else if (req.method === 'GET' && req.url === '/tasks') {

        const tasks = db.prepare('SELECT * FROM tasks').all();

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(tasks));
    }

    else if (req.method === 'GET' && req.url.startsWith('/tasks/')) {

        const taskId = req.url.split('/')[2];

        const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);

        if (task) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(task));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ error: 'Task not found' }));
        }

      }
        // POST /tasks
    else if (req.method === 'POST' && req.url === '/tasks') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            let newTask;

            try{
                newTask = JSON.parse(body);
            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
                return;
            }
 
            if (!newTask.title  || newTask.title.trim() === '') {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: 'Title is required' }));
                return;
            }

            const result = db.prepare(`
                INSERT INTO tasks (title, completed)
                VALUES (?, ?)
            `).run(newTask.title, 0);

            const task = {
                id: result.lastInsertRowid,
                title: newTask.title,
                completed: 0,
            };

            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(task));
        });
    }
        // PUT /tasks/:id
else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {

    const id = req.url.split('/')[2];

    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {

        const updatedTask = JSON.parse(body);

        const result = db.prepare(`
            UPDATE tasks
            SET title = ?, completed = ?
            WHERE id = ?
        `).run(
            updatedTask.title,
            updatedTask.completed,
            id
        );

        if (result.changes === 0) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Task not found'
            }));

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(updatedTask));
    });
     }

     else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')){
        const id = req.url.split('/')[2];

        const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

        if (result.changes === 0) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Task not found'
            }));

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Task deleted successfully'
        }));
     }

        // Home
        else if (req.url === '/') {

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.end('<h1>Student Task Manager</h1>');
        }

        // Not found
        else {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            res.end('<h1>404 - Page Not Found</h1>');
        }

    });
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});