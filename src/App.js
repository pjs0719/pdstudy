import './App.css';
import { Routes, Route } from 'react-router-dom';
import ChatApp from './chatt';
import Home from './Home';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chatt' element={<ChatApp />} />
      </Routes>
    </div>

  );
}

export default App;

