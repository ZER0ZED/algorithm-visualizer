export const quickSort = async (arr, update, speed) => {
    async function partition(low, high) {
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        await update([...arr], [j, high], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await update([...arr], [i, j], true);
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await update([...arr], [i + 1, high], true);
      return i + 1;
    }
  
    async function sort(low, high) {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    }
  
    await sort(0, arr.length - 1);
    await update([...arr], [], false);
  };