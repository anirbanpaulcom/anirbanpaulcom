export const combineWords = (words: string[]) => {
  return words.join(', ').replace(/, ([^,]*)$/, ' and $1');
};
