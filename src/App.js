import React from "react";
import { useState } from "react";
import { Board } from "./components/board";
import './App.css';

function App() {
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);

  return (
    <div className="App">
      <Board height={height} width={width} mines={mines} />
    </div>
  );
}

export default App;
