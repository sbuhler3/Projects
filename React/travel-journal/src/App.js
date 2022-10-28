import './App.css';
import globe from './images/globe.png'
import Card from './components/Card'
function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <span className="globe"><img src={globe} alt="globe graphic"/></span>
        Spencer Buhler Travel Highlights
      </nav>
      < Card />
    </div>
  );
}

export default App;
