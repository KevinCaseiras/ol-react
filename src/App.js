import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Transcripts from './transcripts/Transcripts'

function App() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/calendars">Calendars</Link>
              </li>
              <li>
                <Link to="/agendas">Agendas</Link>
              </li>
              <li>
                <Link to="/bills">Bills</Link>
              </li>
              <li>
                <Link to="/laws">Laws</Link>
              </li>
              <li>
                <Link to="/transcripts">Transcripts</Link>
              </li>
            </ul>
          </nav>

          <hr/>

          <Switch>
            <Route path="/calendars">
              <Calendars/>
            </Route>
            <Route path="/agendas">
              <Agendas/>
            </Route>
            <Route path="/bills">
              <Bills/>
            </Route>
            <Route path="/laws">
              <Laws/>
            </Route>
            <Route path="/transcripts">
              <Transcripts/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

function Calendars() {
  return <h2>Calendars</h2>;
}

function Agendas() {
  return <h2>Agendas</h2>;
}

function Bills() {
  return <h2>Bills</h2>;
}

function Laws() {
  return <h2>Laws</h2>;
}
