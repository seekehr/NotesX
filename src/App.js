
import { useState } from 'react';
import Navbar from './Navbar';
import Sidepanel from './Sidepanel';
import './css/App.css';

function App() {
  // TODO: save state for sidepanel toggled
  const [isSPOpen, spToggle] = useState(false);
  return (
    <div className="App">
      <Navbar />
      {isSPOpen && <Sidepanel />}
    </div>
  );
}

export default App;
