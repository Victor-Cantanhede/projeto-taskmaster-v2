import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLogin from './components/FormLogin/FormLogin';
import Home from './pages/Home/Home';
import Consulta from './pages/Consulta/Consulta';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className='appBody'>
            <div className='containerHeader'>
              <h1>Login</h1>
              <h1>Task Master</h1>
            </div>
            <div className='gc-001'>
              <FormLogin />
            </div>
          </div>
        } />
        <Route path="/Home" element={<Home />} />
        <Route path="/Consulta" element={<Consulta />} />
      </Routes>
    </Router>
  )
}

export default App;
