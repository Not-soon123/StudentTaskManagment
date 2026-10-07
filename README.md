
# StudentTaskManager

Lightweight task manager for students — simple Node/Express backend with a plain HTML/CSS/JS frontend. This repository is a work in progress.

## Status

- In progress — core backend and basic frontend exist, but features and polish are incomplete.

## Project structure

- BackEnd/: backend code and routes ([BackEnd/server.js](BackEnd/server.js), [BackEnd/db.js](BackEnd/db.js))
- BackEnd/models/: data models ([BackEnd/models/Task.js](BackEnd/models/Task.js))
- BackEnd/routes/: API routes ([BackEnd/routes/taskRoutes.js](BackEnd/routes/taskRoutes.js))
- FrontEnd/: single-page frontend ([FrontEnd/index.html](FrontEnd/index.html))

## Prerequisites

- Node.js (v14+ recommended)
- npm

## Quick setup

1. Install dependencies from repository root:

	npm install

2. Start the backend (from repository root or inside `BackEnd`):

	node BackEnd/server.js

	(If `npm start` is configured in `package.json`, you can use `npm start`.)

3. Open the frontend: Open `FrontEnd/index.html` in your browser, or serve it with a static server for CORS/API testing.

## Notes

- The project currently uses a simple local DB setup (see [BackEnd/db.js](BackEnd/db.js)). Verify and configure any database or connection details before use.
- API routes live in [BackEnd/routes/taskRoutes.js](BackEnd/routes/taskRoutes.js).

## TODO / Next steps

- Add persistent database setup and migrations
- Implement input validation and error handling in the API
- Add user authentication/authorization
- Improve frontend UI and add real-time updates
- Add tests (unit + integration) and CI

## Contributing

Contributions welcome. Open an issue or submit a PR with a short description of the change.

## Contact

If you want help finishing features, tell me which area to prioritize (backend, DB, auth, or frontend).

