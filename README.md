# MiniUltiMaxConsole
copilot/fix-d0353382-6fe3-487e-a539-3aa38c91572c
Console with streamlined connection workflow and automation


> Console with streamlined connection workflow and automation
main

## Features

- **Backend API**: Flask-based REST API that proxies requests to real game server endpoints
- **Live Data**: All endpoints fetch real live data from game servers (no sample data)
- **Proxy Architecture**: Secure proxy layer for game server communication
copilot/fix-d0353382-6fe3-487e-a539-3aa38c91572c

## Quick Start

1. Install dependencies:
```bash

- **Cross-Server Message Form**: Send messages across multiple servers and to specific players
- **Cross-Server Command Form**: Execute commands on multiple servers with live data fetching
- **Live Data Integration**: All server, player, and command data is fetched dynamically from the Flask backend

## Project Structure

```
MiniUltiMaxConsole/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── ui/
│   ├── components/
│   │   ├── CrossServerMessageForm.jsx
│   │   └── CrossServerCommandForm.jsx
│   ├── src/                # React application source
│   ├── public/             # React public files
│   └── package.json        # Node.js dependencies
└── README.md
```

## Setup and Running

### Backend (Flask API)

1. Install Python dependencies:
```bash
cd backend
main
pip install -r requirements.txt
```

2. Configure your game server:
```bash
cp .env.example .env
# Edit .env with your game server details
```

copilot/fix-d0353382-6fe3-487e-a539-3aa38c91572c
3. Start the backend API:
```bash
python backend/app.py
```

## API Endpoints


3. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000` with these API endpoints:
main
- `GET /api/servers` - List all game servers
- `GET /api/servers/<id>` - Get specific server details
- `GET /api/players` - List players  
- `GET /api/players/<id>` - Get specific player details
- `GET /api/commands` - List available commands
- `GET /api/commands/<id>` - Get specific command details
- `POST /api/commands` - Execute commands
copilot/fix-d0353382-6fe3-487e-a539-3aa38c91572c
- `GET /health` - Health check

See [backend/README.md](backend/README.md) for detailed API documentation.

- `POST /api/send-message` - Send cross-server message
- `POST /api/execute-command` - Execute command on servers
- `GET /health` - Health check

### Frontend (React UI)

1. Install Node.js dependencies:
```bash
cd ui
npm install
```

2. Run the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Components

### CrossServerMessageForm.jsx
- Fetches servers and players from the backend API
- Allows selection of multiple servers and players
- Sends messages via POST to `/api/send-message`
- Provides real-time feedback on success/error

### CrossServerCommandForm.jsx  
- Fetches servers, players, and commands from the backend API
- Allows selection of commands with descriptions
- Supports command arguments
- Executes commands via POST to `/api/execute-command`
- Provides real-time feedback on execution status

## Configuration

The React frontend uses environment variables for API configuration:
- `REACT_APP_API_URL`: Backend API URL (defaults to `http://localhost:5000`)

## Development

Both components are designed to work with live backend data and include:
- Error handling for network requests
- Loading states during API calls
- Form validation
- Responsive design
- Real-time status updates
main
