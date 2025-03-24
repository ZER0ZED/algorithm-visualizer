import React from 'react';

const Controls = ({
  generateNewArray,
  startSorting,
  cancelSorting,
  isSorting,
  algorithm,
  handleAlgorithmChange,
  speed,
  setSpeed,
  arraySize,
  setArraySize
}) => (
  <div className="controls">
    <button onClick={generateNewArray} disabled={isSorting}>
      New Array
    </button>

    <select 
      value={algorithm} 
      onChange={handleAlgorithmChange}
      disabled={isSorting}
    >
      <option value="bubble">Bubble Sort</option>
      <option value="selection">Selection Sort</option>
      <option value="insertion">Insertion Sort</option>
      <option value="shell">Shell Sort</option>
      <option value="merge">Merge Sort</option>
      <option value="quick">Quick Sort</option>
      <option value="heap">Heap Sort</option>
    </select>

    <div className="control-group">
      <label>Speed:</label>
      <input
        type="range"
        min="10"
        max="200"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        disabled={isSorting}
      />
    </div>

    <div className="control-group">
      <label>Size:</label>
      <input
        type="range"
        min="10"
        max="100"
        value={arraySize}
        onChange={(e) => setArraySize(e.target.value)}
        disabled={isSorting}
      />
    </div>

    <button 
      onClick={startSorting} 
      disabled={isSorting}
      className="start-button"
    >
      {isSorting ? 'Sorting...' : 'Start'}
    </button>

    <button 
      onClick={cancelSorting}
      disabled={!isSorting}
      className="cancel-button"
    >
      Cancel
    </button>
  </div>
);

export default Controls;