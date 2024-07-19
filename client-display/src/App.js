import logo from './logo.svg';
import './App.css';
import { Clock } from './components/utilities/Clock';

function App() {
  return (
    <div className="App">
      <img src='/scpa.png' className='App-logo' alt='SCPA Logo' />

      <header className="App-header">
        <h1>Somerset College Preparatory Academy</h1>
        <Clock className="App-time" />
      </header>
    </div>
  );
}

export default App;
