export const insertionSort = async (arr, update, speed) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        await update([...arr], [j, j + 1], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        
        arr[j + 1] = arr[j];
        await update([...arr], [j, j + 1], true);
        j--;
      }
      arr[j + 1] = key;
      await update([...arr], [j + 1], true);
    }
    await update([...arr], [], false);
  };