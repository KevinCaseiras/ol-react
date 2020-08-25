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
    <div className="w-full max-w-screen-xl mx-auto px-6">
      <Router>
        <div className="lg:flex -mx-6">
          <div
            className="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16) border-solid border-2">
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
            </div>
          </div>
          <div
            className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
            <div className="">
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
          </div>
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
