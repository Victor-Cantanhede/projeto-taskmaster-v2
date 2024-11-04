import FormLogin from './components/FormLogin/FormLogin';
import './App.css';

function App() {

  return (
    <div className='appBody'>
      <div className='containerHeader'>
        <h1>Login</h1>
        <h1>Task Master</h1>
      </div>
      <div className='gc-001'>
        <FormLogin />
      </div>
    </div>
  )
}

export default App;
