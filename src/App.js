import './App.css';
import RaceInfo from './components/RaceInfo';
import SearchBar from './components/SearchBar'; 
import TopNav from './components/NavBar.js'


function App() {
  // const {
  //   state,
  //   oddsList,
  //   racerList
  // } = RaceInfo();

  return (
    <div className="App">
      <TopNav />
      <div className="content-body">
        <SearchBar />
        <RaceInfo />
      </div>
    </div>
  );
}

export default App;
