import React, { useState, useEffect } from 'react';

const CrossServerMessageForm = () => {
  const [servers, setServers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedServers, setSelectedServers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch servers and players from backend on component mount
  useEffect(() => {
    fetchServers();
    fetchPlayers();
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
    
    if (!message.trim()) {
      setError('Please enter a message');
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
      const response = await fetch(`${API_BASE_URL}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          servers: selectedServers,
          players: selectedPlayers
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const result = await response.json();
      setSuccess('Message sent successfully!');
      setMessage('');
      setSelectedServers([]);
      setSelectedPlayers([]);
    } catch (err) {
      setError('Failed to send message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cross-server-message-form">
      <h2>Send Cross-Server Message</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            rows={4}
            required
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
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default CrossServerMessageForm;