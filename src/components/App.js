import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/search" element={<Search/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
