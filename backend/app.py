from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Mock data - in a real application, this would come from a database
servers_data = [
    {"id": 1, "name": "Server 1", "ip": "192.168.1.10", "status": "online"},
    {"id": 2, "name": "Server 2", "ip": "192.168.1.11", "status": "online"},
    {"id": 3, "name": "Server 3", "ip": "192.168.1.12", "status": "offline"}
]

players_data = [
    {"id": 1, "name": "Player1", "server_id": 1, "status": "online"},
    {"id": 2, "name": "Player2", "server_id": 1, "status": "online"},
    {"id": 3, "name": "Player3", "server_id": 2, "status": "online"},
    {"id": 4, "name": "Player4", "server_id": 2, "status": "offline"}
]

commands_data = [
    {"id": 1, "name": "restart", "description": "Restart server"},
    {"id": 2, "name": "stop", "description": "Stop server"},
    {"id": 3, "name": "status", "description": "Check server status"},
    {"id": 4, "name": "backup", "description": "Create server backup"}
]

@app.route('/api/servers', methods=['GET'])
def get_servers():
    """Get list of all servers"""
    return jsonify(servers_data)

@app.route('/api/players', methods=['GET'])
def get_players():
    """Get list of all players"""
    return jsonify(players_data)

@app.route('/api/commands', methods=['GET'])
def get_commands():
    """Get list of available commands"""
    return jsonify(commands_data)

@app.route('/api/players/<int:server_id>', methods=['GET'])
def get_players_by_server(server_id):
    """Get players for a specific server"""
    server_players = [p for p in players_data if p['server_id'] == server_id]
    return jsonify(server_players)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    """Send cross-server message"""
    data = request.get_json()
    # In a real application, this would send the message to the selected servers/players
    return jsonify({"status": "success", "message": "Message sent successfully", "data": data})

@app.route('/api/execute-command', methods=['POST'])
def execute_command():
    """Execute command on selected servers"""
    data = request.get_json()
    # In a real application, this would execute the command on the selected servers
    return jsonify({"status": "success", "message": "Command executed successfully", "data": data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)