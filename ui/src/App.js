import React from 'react';
import CrossServerMessageForm from './components/CrossServerMessageForm';
import CrossServerCommandForm from './components/CrossServerCommandForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MiniUltiMaxConsole</h1>
        <p>Console with streamlined connection workflow and automation</p>
      </header>
      
      <main className="App-main">
        <div className="forms-container">
          <div className="form-section">
            <CrossServerMessageForm />
          </div>
          
          <div className="form-section">
            <CrossServerCommandForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;