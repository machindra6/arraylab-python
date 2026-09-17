# ArrayLab

A focused Python DSA learning platform for learning arrays through written lessons, interactive code, and practice problems.

## What is included

- 8 Array lessons, from array basics to rotation
- Python examples with expected output
- Browser code editor
- Local Python code runner
- 8 practice problems with hidden-style test cases
- Hints and immediate test feedback
- Lesson completion and progress stored in the browser
- Responsive interface for desktop and mobile

## Run locally

1. Open PowerShell in this folder.
2. Start any static web server, for example:

```powershell
python -m http.server 8000
```

3. Open this address:

```text
http://127.0.0.1:8000
```

The public-demo runner uses Pyodide in a browser Web Worker. Submitted Python code stays in the browser and is not sent to a server.

## Secure deployment boundary

The static lesson experience and browser runner are suitable for a public demo. The current `server.py` is a local-only prototype and must not be deployed publicly. It executes Python on the host machine.

For production submissions, add an isolated execution service with containers or VMs, CPU/memory/time limits, disabled network access, a queue, rate limiting, and server-side hidden tests. Add PostgreSQL and authentication when progress must sync across devices.

## Next steps

- Add a real backend database for users, lessons, problems, submissions, and progress.
- Move lesson and problem content from `app.js` into an admin-managed API.
- Add server-side hidden tests using an isolated execution service.
- Add automated tests and GitHub Actions CI.
- Add authentication and cross-device progress.
- Deploy the static public demo first, then add the backend runner as a separate protected service.
