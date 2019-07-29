let sequenceArr = [
  "B1",
  "E4",
  "D4",
  "C3",
  "F3",
  "B2",
  "B3",
  "B3",
  "B3",
  "F5",
  "D4"
];

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
var arr = sequenceArr;
arr = shuffle(arr);

export default function SequenceArray() {
  let sequence = [];
  for (let i = 0; i < arr.length; i++) {
    sequence.push(arr[i]);
  }
  return sequence;
}
