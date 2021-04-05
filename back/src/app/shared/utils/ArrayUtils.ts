export const intersection = (array1: any[], array2: any[]): any[] => {
  let result: any[] = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j] && result.indexOf(array1[i]) === -1) {
        result.push(array1[i]);
        break;
      }
    }
  }
  return result;
};
