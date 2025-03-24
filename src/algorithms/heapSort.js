export const heapSort = async (arr, update, speed, shouldCancel) => {
    async function heapify(n, i) {
      if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
      
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await update([...arr], [i, largest], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        await heapify(n, largest);
      }
    }
  
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
      await heapify(arr.length, i);
    }
  
    for (let i = arr.length - 1; i > 0; i--) {
      if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
      
      [arr[0], arr[i]] = [arr[i], arr[0]];
      await update([...arr], [0, i], true);
      await new Promise(resolve => setTimeout(resolve, speed));
      await heapify(i, 0);
    }
    
    await update([...arr], [], false);
  };