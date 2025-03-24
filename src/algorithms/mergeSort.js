export const mergeSort = async (arr, update, speed) => {
    async function merge(l, m, r) {
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = new Array(n1);
      const R = new Array(n2);
  
      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  
      let i = 0, j = 0, k = l;
      
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        await update([...arr], [k], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        k++;
      }
  
      while (i < n1) {
        arr[k] = L[i];
        await update([...arr], [k], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        i++;
        k++;
      }
  
      while (j < n2) {
        arr[k] = R[j];
        await update([...arr], [k], true);
        await new Promise(resolve => setTimeout(resolve, speed));
        j++;
        k++;
      }
    }
  
    async function sort(l, r) {
      if (l >= r) return;
      const m = l + Math.floor((r - l) / 2);
      await sort(l, m);
      await sort(m + 1, r);
      await merge(l, m, r);
    }
  
    await sort(0, arr.length - 1);
    await update([...arr], [], false);
  };