import React from 'react';
import './App.css';
import NavBar from './components/AppNavbar'
import RecordModal from './components/RecordModal'
import RecordList from './components/RecordList'

function App() {
  return (
    <div className="App">
      <NavBar />
      <RecordModal />
      <RecordList />
    </div>
  );
}

export default App;
