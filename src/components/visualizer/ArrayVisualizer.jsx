import { useState, useEffect } from 'react';
import { bubbleSort } from '../../algorithms/bubbleSort';
import { quickSort } from '../../algorithms/quickSort';
import { mergeSort } from '../../algorithms/mergeSort';
import { insertionSort } from '../../algorithms/insertionSort';
import { selectionSort } from '../../algorithms/selectionSort';
import { heapSort } from '../../algorithms/heapSort';
import { shellSort } from '../../algorithms/shellSort';
import Controls from '../Controls';
import './styles.css';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(30);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const updateArray = async (newArray, activeIndices, sortingActive) => {
    setArray(newArray);
    setIsSorting(sortingActive);
    
    const bars = document.getElementsByClassName('array-bar');
    Array.from(bars).forEach(bar => 
      bar.style.background = 'linear-gradient(to top, #00ff88, #00ccff)'
    );
    activeIndices.forEach(i => {
      bars[i] && (bars[i].style.background = '#ff0000');
    });
  };

  const startSorting = async () => {
    if (isSorting) return;
    
    setIsCancelled(false);
    setIsSorting(true);
    
    try {
      const arr = [...array];
      const shouldCancel = () => isCancelled;
      
      switch(algorithm) {
        case 'bubble':
          await bubbleSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'quick':
          await quickSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'merge':
          await mergeSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'insertion':
          await insertionSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'selection':
          await selectionSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'heap':
          await heapSort(arr, updateArray, speed, shouldCancel);
          break;
        case 'shell':
          await shellSort(arr, updateArray, speed, shouldCancel);
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.message === 'SORT_CANCELLED') {
        console.log('Sorting cancelled');
      }
    } finally {
      setIsSorting(false);
      setIsCancelled(false);
    }
  };

  const cancelSorting = () => {
    setIsCancelled(true);
    setIsSorting(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Algorithm Visualizer</h1>
        <p>Visualize sorting algorithms in action</p>
      </header>

      <Controls
        generateNewArray={generateNewArray}
        startSorting={startSorting}
        cancelSorting={cancelSorting}
        isSorting={isSorting}
        algorithm={algorithm}
        handleAlgorithmChange={handleAlgorithmChange}
        speed={speed}
        setSpeed={setSpeed}
        arraySize={arraySize}
        setArraySize={setArraySize}
      />

      <div className="visualizer-container">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      <div className="stats">
        <p>Algorithm: {algorithm} | Size: {arraySize} | Speed: {speed}ms</p>
      </div>
    </div>
  );
};

export default ArrayVisualizer;