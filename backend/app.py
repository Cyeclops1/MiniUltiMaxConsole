import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Game server config from environment
GAME_SERVER_BASE_URL = os.getenv('GAME_SERVER_BASE_URL', 'https://api.example-game-server.com')
API_KEY = os.getenv('GAME_SERVER_API_KEY', '')

DEFAULT_HEADERS = {
    'User-Agent': 'MiniUltiMaxConsole/1.0',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

if API_KEY:
    DEFAULT_HEADERS['Authorization'] = f'Bearer {API_KEY}'

def proxy_request(endpoint, method='GET', params=None, data=None):
    url = f"{GAME_SERVER_BASE_URL.rstrip('/')}/{endpoint.lstrip('/')}"
    try:
        response = requests.request(
            method=method,
            url=url,
            headers=DEFAULT_HEADERS,
            params=params,
            json=data,
            timeout=30
        )
        if response.status_code == 200:
            return response.json(), 200
        else:
            return {
                'error': f'Game server returned status {response.status_code}',
                'message': response.text
            }, response.status_code
    except requests.exceptions.RequestException as e:
        return {
            'error': 'Failed to connect to game server',
            'message': str(e)
        }, 500

@app.route('/api/servers', methods=['GET'])
def get_servers():
    params = request.args.to_dict()
    return proxy_request('servers', params=params)

@app.route('/api/servers/<server_id>', methods=['GET'])
def get_server(server_id):
    params = request.args.to_dict()
    return proxy_request(f'servers/{server_id}', params=params)

@app.route('/api/players', methods=['GET'])
def get_players():
    params = request.args.to_dict()
    return proxy_request('players', params=params)

@app.route('/api/players/<player_id>', methods=['GET'])
def get_player(player_id):
    params = request.args.to_dict()
    return proxy_request(f'players/{player_id}', params=params)

@app.route('/api/commands', methods=['GET'])
def get_commands():
    params = request.args.to_dict()
    return proxy_request('commands', params=params)

@app.route('/api/commands/<command_id>', methods=['GET'])
def get_command(command_id):
    params = request.args.to_dict()
    return proxy_request(f'commands/{command_id}', params=params)

@app.route('/api/commands', methods=['POST'])
def execute_command():
    data = request.get_json()
    return proxy_request('commands', method='POST', data=data)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    # Implement message sending logic here or proxy to game server
    return jsonify({"status": "success", "message": "Message sent successfully", "data": data})

@app.route('/api/execute-command', methods=['POST'])
def execute_command_form():
    data = request.get_json()
    # Implement command execution logic here or proxy to game server
    return jsonify({"status": "success", "message": "Command executed successfully", "data": data})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'MiniUltiMaxConsole API',
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'The requested API endpoint does not exist'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=debug_mode)