const modes = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "eolian",
  "locrian"
];
const notes = ["C", "D", "E", "F", "G", "A", "B"];
const accidentals = ["#", "n", "b"];
//(♯), flat (♭), and natural (♮)
const octaves = [1, 2, 3, 4, 5];
const flavors = ["vanilla", "mint", "grappe"];

const uuidv1 = require("uuid/v1");

class Greek {
  constructor() {
    this.intervals = [0, 2, 4, 5, 7, 9, 11];
    this.modes = [
      "ionian",
      "dorian",
      "phrygian",
      "lydian",
      "mixolydian",
      "eolian",
      "locrian"
    ];
    this.notes = [
      "G#/Ab",
      "An",
      "A#/Bb",
      "Bn/Cb",
      "B#/Cn",
      "C#/Db",
      "Dn",
      "D#/Eb",
      "En/Fb",
      "E#/Fn",
      "F#/Gb",
      "Gn"
    ];
    this.freq = [
      415.3 / 3,
      440.0 / 3,
      466.16 / 3,
      493.88 / 3,
      523.25 / 3,
      554.37 / 3,
      587.33 / 3,
      622.25 / 3,
      659.25 / 3,
      698.46 / 3,
      739.99 / 3,
      783.99 / 3
    ];
  }
  scale(rootNote, accidental, ove, mode, flavor) {
    // console.log('\n', rootNote, accidental, ove, mode, '\n')

    const accRootNote = this.notes.find(n => n.includes(rootNote + accidental));

    let prevIntervals = this.intervals.slice();
    let newIntervals = prevIntervals
      .splice(this.modes.indexOf(mode))
      .concat(prevIntervals.map(x => x + 12));
    newIntervals = newIntervals.map(x => x - newIntervals[0]);
    let newScale = newIntervals.map(
      x => this.notes[(this.notes.indexOf(accRootNote) + x) % 12]
    );
    // console.log(`\n SCALE: ${newScale}\n`)
    // let newScaleFreq = newIntervals.map(x => this.freq[(this.notes.indexOf(accRootNote) + x) % 12])
    const scales = newScale.map(x => {
      let id = uuidv1();
      return {
        note: x,
        position: [
          parseInt(Math.random() * window.innerWidth),
          parseInt(Math.random() * (window.innerHeight - 300) + 300)
        ],
        id: id,
        start: false,
        amp: 0,
        flavor: flavor,
        actave: ove
      };
    });

    return scales;
  }
}

const KeyboardController = (keys, repeat) => {
  var timers = {};
  document.onkeydown = function(event) {
    var key = (event || window.event).keyCode;
    if (!(key in keys)) return true;
    if (!(key in timers)) {
      timers[key] = null;
      keys[key]();
      if (repeat !== 0) timers[key] = setInterval(keys[key], repeat);
    }
    return false;
  };

  document.onkeyup = function(event) {
    var key = (event || window.event).keyCode;
    if (key in timers) {
      if (timers[key] !== null) clearInterval(timers[key]);
      delete timers[key];
    }
  };
  // window.onblur = function () {
  //     for (key in timers)
  //         if (timers[key] !== null)
  //             clearInterval(timers[key]);
  //     timers = {};
  // };
};
let up = 0;

// KeyboardController({
//     37: function () { console.log('left'); },
//     38: function () { up++; console.log(up); },
//     39: function () { console.log('right'); },
//     40: function () { console.log('down'); }
// }, 100);

module.exports = {
  modes,
  notes,
  accidentals,
  octaves,
  Greek,
  flavors,
  KeyboardController
};
