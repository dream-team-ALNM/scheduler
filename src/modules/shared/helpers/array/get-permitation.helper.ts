import { IJob } from '../../interfaces';

const getPermutation = <T extends IJob>(array: T[]): T[][] => {
  if (array.length > 1) {
    const firstElement = array[0];
    const returnedArray = getPermutation(array.slice(1));
    const permutedArray = [] as T[][];
    const temporaryArray = [] as T[];
    const elementLength = returnedArray[0].length;
    for (let i = 0; i < returnedArray.length; i++)
      for (let j = 0; j <= elementLength; j++) {
        temporaryArray.splice(0, temporaryArray.length, ...returnedArray[i].slice(0));
        temporaryArray.splice(j, 0, firstElement);
        permutedArray.push(temporaryArray);
      }
    return permutedArray;
  } else {
    return [array];
  }
};

export { getPermutation };
