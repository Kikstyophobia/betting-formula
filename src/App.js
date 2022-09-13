import './App.css';
import apiRequest from './api/api';

function App() {
  return (
    <div className="App">

      <button className='request-button' onClick={apiRequest}>request</button>
    </div>
  );
}

export default App;
