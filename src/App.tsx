import React from "react";
import "./App.css";

export const App = () => {
  const createGrid = () => {
    const cells = [];
    for (let i = 0; i < 64; i++) {
      cells.push(<div key={i} className="cell"></div>);
    }
    return cells;
  };
  return (
    <div className="App">
      <div className="grid">{createGrid()}</div>
    </div>
  );
};
