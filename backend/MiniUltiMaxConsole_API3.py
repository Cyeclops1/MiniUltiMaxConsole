"""
MiniUltiMaxConsole_API3.py
API Layer 3 – Automation & Batch Operations
"""

import os
from flask import Blueprint, jsonify, request
import requests

api3 = Blueprint('api3', __name__)

GAME_SERVER_BASE_URL = os.getenv('GAME_SERVER_BASE_URL', 'https://api.example-game-server.com')
API_KEY = os.getenv('GAME_SERVER_API_KEY', '')

DEFAULT_HEADERS = {
    'User-Agent': 'MiniUltiMaxConsole/1.0-API3',
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
            timeout=60
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({
            'error': 'Failed to connect to game server',
            'message': str(e)
        }), 500

@api3.route('/api3/batch/execute', methods=['POST'])
def batch_execute():
    """Execute batch commands on multiple servers or players"""
    data = request.get_json()
    return proxy_game_server('batch/execute', method='POST', data=data)

@api3.route('/api3/batch/message', methods=['POST'])
def batch_message():
    """Send batch messages to servers/players"""
    data = request.get_json()
    return proxy_game_server('batch/message', method='POST', data=data)

@api3.route('/api3/automation/run', methods=['POST'])
def automation_run():
    """Trigger an automation script or workflow"""
    data = request.get_json()
    return proxy_game_server('automation/run', method='POST', data=data)