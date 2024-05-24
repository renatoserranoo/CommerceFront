import './App.css'
import React from 'react';
import AppRoutes from './routes/AppRoutes';



function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h3>React + Spring Boot Payment App</h3>
          <AppRoutes />
        </header>
      </div>
    </>
  )
}

export default App
