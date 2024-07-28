import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import { router } from './components/navigation/Router';
import { Navbar } from './components/navigation/Navbar';
import { HomePage } from './components/pages/HomePage';
import { MessagesPage } from './components/pages/messagesPage/MessagesPage';
import { EventsPage } from './components/pages/EventsPage';
import { UsersPage } from './components/pages/UsersPage';
import { PointsPage } from './components/pages/PointsPage';

function App() {
  const [count, setCount] = useState(0)

  const [scanData, setScanData] = useState(0);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='mt-3 bg-white rounded p-3 mainContentContainer'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/messages' element={<MessagesPage />} />
            <Route path='/events' element={<EventsPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/points' element={<PointsPage />} />
          </Routes>
        </div>
        <p className='mt-2 text-secondary'>SCPA Event Dashboard programmed by Larry Rowe, SCPA IT Department.</p>
        <div className="bg-warning p-3 rounded mt-3">
          <h6 className="m-0">This site under development.</h6>
        </div>
      </div>
    </div>
  )
}

export default App
