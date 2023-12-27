import React from 'react';
import EventComponent from './components/event/event';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <p>EventHub</p>
      </header>
      <EventComponent></EventComponent>
    </div>
  );
}

export default App;
