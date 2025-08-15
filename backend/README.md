# Backend API

Flask backend API that proxies requests to real game server endpoints.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your game server details
```

3. Run the application:
```bash
python backend/app.py
```

## API Endpoints

### Servers
- `GET /api/servers` - Get list of all game servers
- `GET /api/servers/<id>` - Get specific server information

### Players  
- `GET /api/players` - Get list of players
- `GET /api/players/<id>` - Get specific player information

### Commands
- `GET /api/commands` - Get list of available commands
- `GET /api/commands/<id>` - Get specific command information
- `POST /api/commands` - Execute a command

### Health
- `GET /health` - Health check endpoint

All endpoints proxy requests to the configured game server and return real live data.