export const bubbleSort = async (arr, update, speed, shouldCancel) => {
  let len = arr.length;
  
  for (let i = 0; i < len; i++) {
    if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
    
    for (let j = 0; j < len - i - 1; j++) {
      if (shouldCancel && shouldCancel()) throw new Error('SORT_CANCELLED');
      
      await update([...arr], [j, j + 1], true);
      await new Promise(resolve => setTimeout(resolve, speed));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await update([...arr], [j, j + 1], true);
      }
    }
  }
  await update([...arr], [], false);
};