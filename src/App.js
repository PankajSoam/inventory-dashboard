import './App.css';
import InventoryWrapper from './components/InventoryWrapper/InventoryWrapper';
import Header from './components/header/Header';
import { useState } from 'react';

function App() {
  const [isAdminView,setIsAdminView] = useState(true)

  const handleToggleChange = (value) => {
    setIsAdminView(!value)
    }

  return (
    <div className="App text-neutral-200 bg-zinc-800 min-h-screen">
      <Header handleToggleChange={handleToggleChange}/>
      <InventoryWrapper isAdminView={isAdminView}/>
    </div>
  )
}

export default App;