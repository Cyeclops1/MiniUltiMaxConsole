# MiniUltiMaxConsole
Console with streamlined connection workflow and automation

## Features

- **Backend API**: Flask-based REST API that proxies requests to real game server endpoints
- **Live Data**: All endpoints fetch real live data from game servers (no sample data)
- **Proxy Architecture**: Secure proxy layer for game server communication

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure your game server:
```bash
cp .env.example .env
# Edit .env with your game server details
```

3. Start the backend API:
```bash
python backend/app.py
```

## API Endpoints

- `GET /api/servers` - List all game servers
- `GET /api/servers/<id>` - Get specific server details
- `GET /api/players` - List players  
- `GET /api/players/<id>` - Get specific player details
- `GET /api/commands` - List available commands
- `GET /api/commands/<id>` - Get specific command details
- `POST /api/commands` - Execute commands
- `GET /health` - Health check

See [backend/README.md](backend/README.md) for detailed API documentation.
