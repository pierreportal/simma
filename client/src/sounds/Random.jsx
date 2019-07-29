const randFunction = () => {
  var min = -48,
    max = -3;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(randFunction, rand * 100);
  return rand;
};
export default randFunction;
