import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NewGame from './pages/NewGame';
import PlayGame from './pages/PlayGame';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import socket from "./config/socket"

function App() {
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    socket.on("connect",()=>{
      if (!connect) {
        if (socket.connected) {
          setConnect(true);
        }
      }
    })
  }, [connect]);

  return (
    <Router>
      <Navbar/>
      <div className="App">
        <div>
          <Routes>
              <Route path="/" element={<NewGame />} />
          </Routes>
          <Routes>
            <Route path="/PlayGame" element={<PlayGame socket={socket}/>} />
          </Routes>

        </div>

      </div>
    </Router>
  );
}

export default App;
