"""
MiniUltiMaxConsole_API2.py
API Layer 2 – Extended Game Server Endpoint Proxy
"""

import os
from flask import Blueprint, jsonify, request
import requests

api2 = Blueprint('api2', __name__)

GAME_SERVER_BASE_URL = os.getenv('GAME_SERVER_BASE_URL', 'https://api.example-game-server.com')
API_KEY = os.getenv('GAME_SERVER_API_KEY', '')

DEFAULT_HEADERS = {
    'User-Agent': 'MiniUltiMaxConsole/1.0-API2',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

if API_KEY:
    DEFAULT_HEADERS['Authorization'] = f'Bearer {API_KEY}'

def proxy_game_server(endpoint, method='GET', params=None, data=None):
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
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({
            'error': 'Failed to connect to game server',
            'message': str(e)
        }), 500

@api2.route('/api2/servers/quick-status', methods=['GET'])
def quick_server_status():
    """Returns quick status for all servers (extended endpoint)"""
    return proxy_game_server('servers/quick-status')

@api2.route('/api2/players/online', methods=['GET'])
def online_players():
    """Returns list of online players (extended endpoint)"""
    return proxy_game_server('players/online')

@api2.route('/api2/server/<server_id>/metrics', methods=['GET'])
def server_metrics(server_id):
    """Returns live metrics for a given server"""
    return proxy_game_server(f'servers/{server_id}/metrics')

@api2.route('/api2/command/queue', methods=['POST'])
def command_queue():
    """Queue a command across servers (extended endpoint)"""
    data = request.get_json()
    return proxy_game_server('command/queue', method='POST', data=data)