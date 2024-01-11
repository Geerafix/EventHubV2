import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventComponent from './components/event/event';
import EventDetails from './components/event-details/event-details';
import BuyTicket from './components/buy-ticket/buy-ticket';
import AddEvent from './components/add-event/add-event';
import EditEvent from './components/edit-event/edit-event';

function App() {
  return (
    <div className="App">
      <header>
        <p>EventHub</p>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<EventComponent/>} />
          <Route path="/szczegoly/:id" element={<EventDetails/>} />
          <Route path="/kup-bilet/:id" element={<BuyTicket/>} />
          <Route path="/dodaj-wydarzenie" element={<AddEvent/>} />
          <Route path="/edytuj/:id" element={<EditEvent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
