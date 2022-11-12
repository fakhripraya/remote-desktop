import logo from './logo.svg';
import './App.css';
import { Fragment, useRef } from 'react';

function App() {
  const videoRef = useRef();

  return (
    <div className="App">
      <Fragment>
        <span>800 x 600</span>
        <video ref={videoRef} classname="video">video not available</video>
      </Fragment>
    </div>
  );
}

export default App;
