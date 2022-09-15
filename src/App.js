import './App.css';
import RaceInfo from './api/RaceInfo';

function App() {
  return (
    <div className="App">

      {/* <button className='request-button' onClick={ApiRequest}>request</button> */}
      <RaceInfo />
    </div>
  );
}

export default App;
