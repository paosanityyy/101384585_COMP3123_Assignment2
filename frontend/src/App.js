import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import { useState } from 'react';
import Details from './components/Details';



function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (status) => {
    setLoggedIn(status)
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            (loggedIn) ?
            <Route path='/' element={<Dashboard logout={handleLogout} />} />
            :
            <Route path='/' element={<Login loggedIn={handleLogin} />} />
          }
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Employee/Add' element={<AddEmployee />} />
          <Route path='/Employee/Update/:id' element={<UpdateEmployee />} />
          <Route path='/Employee/Details/:id' element={<Details />} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
