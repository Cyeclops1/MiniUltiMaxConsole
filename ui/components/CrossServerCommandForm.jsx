import React, { useState, useEffect } from 'react';

const CrossServerCommandForm = () => {
  const [servers, setServers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [commands, setCommands] = useState([]);
  const [selectedServers, setSelectedServers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');
  const [commandArgs, setCommandArgs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch servers, players, and commands from backend on component mount
  useEffect(() => {
    fetchServers();
    fetchPlayers();
    fetchCommands();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/servers`);
      if (!response.ok) throw new Error('Failed to fetch servers');
      const data = await response.json();
      setServers(data);
    } catch (err) {
      setError('Failed to load servers: ' + err.message);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/players`);
      if (!response.ok) throw new Error('Failed to fetch players');
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError('Failed to load players: ' + err.message);
    }
  };

  const fetchCommands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/commands`);
      if (!response.ok) throw new Error('Failed to fetch commands');
      const data = await response.json();
      setCommands(data);
    } catch (err) {
      setError('Failed to load commands: ' + err.message);
    }
  };

  const handleServerChange = (serverId) => {
    setSelectedServers(prev => 
      prev.includes(serverId) 
        ? prev.filter(id => id !== serverId)
        : [...prev, serverId]
    );
  };

  const handlePlayerChange = (playerId) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCommand) {
      setError('Please select a command');
      return;
    }

    if (selectedServers.length === 0 && selectedPlayers.length === 0) {
      setError('Please select at least one server or player');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/execute-command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command: selectedCommand,
          args: commandArgs,
          servers: selectedServers,
          players: selectedPlayers
        })
      });

      if (!response.ok) throw new Error('Failed to execute command');
      
      const result = await response.json();
      setSuccess('Command executed successfully!');
      setSelectedCommand('');
      setCommandArgs('');
      setSelectedServers([]);
      setSelectedPlayers([]);
    } catch (err) {
      setError('Failed to execute command: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCommandObj = commands.find(cmd => cmd.id.toString() === selectedCommand);

  return (
    <div className="cross-server-command-form">
      <h2>Execute Cross-Server Command</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Command:</label>
          <select
            value={selectedCommand}
            onChange={(e) => setSelectedCommand(e.target.value)}
            required
          >
            <option value="">-- Select a command --</option>
            {commands.map(command => (
              <option key={command.id} value={command.id}>
                {command.name} - {command.description}
              </option>
            ))}
          </select>
          {selectedCommandObj && (
            <div className="command-description">
              <strong>Description:</strong> {selectedCommandObj.description}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Command Arguments (optional):</label>
          <input
            type="text"
            value={commandArgs}
            onChange={(e) => setCommandArgs(e.target.value)}
            placeholder="Enter command arguments..."
          />
        </div>

        <div className="form-group">
          <label>Select Servers:</label>
          <div className="checkbox-group">
            {servers.map(server => (
              <label key={server.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedServers.includes(server.id)}
                  onChange={() => handleServerChange(server.id)}
                />
                {server.name} ({server.ip}) - {server.status}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Select Players:</label>
          <div className="checkbox-group">
            {players.map(player => (
              <label key={player.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={() => handlePlayerChange(player.id)}
                />
                {player.name} (Server: {servers.find(s => s.id === player.server_id)?.name || 'Unknown'}) - {player.status}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Executing...' : 'Execute Command'}
        </button>
      </form>
    </div>
  );
};

export default CrossServerCommandForm;