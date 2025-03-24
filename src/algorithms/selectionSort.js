export const selectionSort = async (arr, update, speed, shouldCancel) => {
    for (let i = 0; i < arr.length; i++) {
      if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
      
      let minIdx = i;
      
      for (let j = i + 1; j < arr.length; j++) {
        if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
        
        await update([...arr], [minIdx, j], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      await update([...arr], [i, minIdx], true);
    }
    await update([...arr], [], false);
  };