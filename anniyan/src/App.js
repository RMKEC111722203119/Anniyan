import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import MeetAnniyan from './components/meetAnniyan';
import About from './components/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Main />} />
        <Route path="/meet-anniyan" element={<MeetAnniyan />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
