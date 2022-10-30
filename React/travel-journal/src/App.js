import './App.css';
import globe from './images/globe.png'
import Card from './components/Card'
import data from './data'
function App() {
// variable that creates an object with all the values mapped onto it//

let cards= data.map(item => {
  return (
    <Card 
    item={item} />
  )
})
  return (
    <div className="App">
      <nav className="navbar">
        <span className="globe"><img src={globe} alt="globe graphic"/></span>
        Spencer Buhler Travel Highlights
      </nav>
      {cards}
    </div>
  );
}

export default App;
