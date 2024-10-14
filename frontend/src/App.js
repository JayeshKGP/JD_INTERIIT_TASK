import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SearchPage from './pages/search';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path = "/search" element={<SearchPage />} />
                {/* <Route path="/" element={<BasicAuthPage />} /> */}
            </Routes>
        </Router>
  );
}

export default App;
