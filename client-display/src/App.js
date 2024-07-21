import logo from './logo.png';
import './App.css';
import { Clock } from './components/utilities/Clock';
import { EventPreview } from './components/EventPreview';
import { Messages } from './components/Messages';

function App() {

  console.log("Rendering app!")

  return (
    <div className="App">
      <img src={logo} className='App-logo' alt='SCPA Logo' />

      <div className="App-body">
        <h1 className='School-color'>Somerset College Preparatory Academy</h1>
        <Clock className="App-time" />
        <EventPreview />
        <Messages />
      </div>
    </div>
  );
}

export default App;

/*
<Messages />
        
*/