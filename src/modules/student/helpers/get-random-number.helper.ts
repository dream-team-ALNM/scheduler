const getRandomNumber = (min: number, max: number): number => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

export { getRandomNumber };
