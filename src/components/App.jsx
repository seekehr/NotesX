import { useState } from 'react';
import NoteTaker from './NoteTaker';

function App() {
  // TODO: save state for sidepanel toggled
  const [isSPOpen, spToggle] = useState(false);
  return (
    <div className="App">
      <NoteTaker />
    </div>
  );
}

export default App;
