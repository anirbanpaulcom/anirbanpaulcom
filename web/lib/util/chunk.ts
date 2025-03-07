export const chunk = <T>(array: T[], chunk_size: number): T[][] => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunk_size);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, [] as T[][]);
};
