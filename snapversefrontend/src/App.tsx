import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/AppRoutes';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
