import './App.css';
import RaceInfo from './components/RaceInfo';
import SearchBar from './components/SearchBar';

function App() {
  const {
    state,
    oddsList,
    racerList
  } = RaceInfo();

  return (
    <div className="App">
      <SearchBar />
      {/* <RaceInfo /> */}
    </div>
  );
}

export default App;
