import React from 'react';
import { Routes, Route } from "react-router-dom"
import "./App.scss"
import Authorization from './components/authorization/Authorization';
import HomePage from './components/homePage/HomePage';
import Registration from './components/registration/Registration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/registration' element={<Registration />} />
        <Route path="/homePage" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
