import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SearchPage from './pages/search';
import AuthForm from './pages/login';
import Header from './pages/header';
import CoolHeader from './pages/header';

function App() {
  return (
    <Router>
      <CoolHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path = "/search" element={<SearchPage />} />
                <Route path = "/login" element={<AuthForm />} />
                {/* <Route path="/" element={<BasicAuthPage />} /> */}
            </Routes>
        </Router>
  );
}

export default App;
