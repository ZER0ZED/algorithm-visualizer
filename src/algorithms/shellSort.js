export const shellSort = async (arr, update, speed, shouldCancel) => {
    let n = arr.length;
    
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
      for (let i = gap; i < n; i++) {
        if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
        
        let temp = arr[i];
        let j;
        
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
          
          await update([...arr], [j, j - gap], true);
          await new Promise(resolve => setTimeout(resolve, speed));
          
          arr[j] = arr[j - gap];
          await update([...arr], [j, j - gap], true);
        }
        
        arr[j] = temp;
        await update([...arr], [j], true);
      }
    }
    await update([...arr], [], false);
  };