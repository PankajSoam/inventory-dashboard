import './App.css';
import InventoryWrapper from './components/InventoryWrapper/InventoryWrapper';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App text-neutral-200 bg-zinc-800 min-h-screen">
      <Header/>
      <InventoryWrapper/>
    </div>
  );
}

export default App;
