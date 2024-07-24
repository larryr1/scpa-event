import logo from './assets/logo.png';
import './App.css';
import { Clock } from './components/utilities/Clock';
import { EventPreview } from './components/EventPreview';
import { Messages } from './components/Messages';

function App() {

  console.log("Rendering app!")

  return (
    <div>
      <p className='attribution'>This display programmed by Larry Rowe, SCPA IT Department.<br />{window.location.href}<br />{process.env.NODE_ENV.toUpperCase()} MODE</p>
      <div className="App">
        <img src={logo} className='App-logo' alt='SCPA Logo' />
        <div className="App-body">
          <h1 className='School-color fw-bold display-2'>Somerset College Preparatory Academy</h1>
          <Clock className="App-time" />
          <EventPreview className="mt-5" />
          <Messages />
        </div>
      </div>
    </div>
    
  );
}

export default App;

/*
<Messages />
        
*/