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
const Tone = require("tone");
const flavors = ["vanilla", "mint", "grappe"];

// const flavorsObj = {
//   vanilla: {
//     oscillator: {
//       type: "sawtooth"
//     },
//     envelope: {
//       attack: 0.1,
//       release: 0.2
//     },
//     filterEnvelope: {
//       attack: 0.9,
//       decay: 0.4,
//       sustain: 0.7,
//       release: 0.4
//     }
//   },
//   mint: {
//     oscillator: {
//       type: "fatsquare3",
//       count: 2,
//       detune: -0.2,
//       spread: 40
//     },
//     envelope: {
//       attack: 1.4,
//       decay: 0.5,
//       sustain: 0.9,
//       release: 1.7
//     },
//     filter: {
//       type: "peaking",
//       q: 0.2,
//       gain: 2,
//       frequency: 0.01
//     },
//     filterEnvelope: {
//       attack: 0.00009,
//       decay: 0.00004,
//       sustain: 0.007,
//       release: 0.9
//     }
//   },
//   grappe: {
//     oscillator: {
//       type: "fatsawtooth12",
//       count: 2,
//       detune: 6
//     },
//     envelope: {
//       attack: 0.6,
//       decay: 1.5,
//       decayCurve: "exponential",
//       release: 0.9
//     },
//     filter: {
//       type: "lowpass"
//     },
//     filterEnvelope: {
//       attack: 0.03,
//       decay: 1.7,
//       sustain: 0.0007,
//       release: 1.4,
//       octaves: 5
//     }
//   }
// };
const flavorsObj = {
  vanilla: {
    oscillator: {
      type: "sawtooth"
    },
    envelope: {
      attack: 0.1,
      release: 0.2
    },
    filterEnvelope: {
      attack: 0.9,
      decay: 0.4,
      sustain: 0.7,
      release: 0.4
    }
  },
  mint: {
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 1.4,
      decay: 0.5,
      sustain: 0.9,
      release: 1.7
    },
    filter: {
      type: "peaking",
      q: 0.2,
      gain: 2,
      frequency: 0.01
    },
    filterEnvelope: {
      attack: 0.00009,
      decay: 0.00004,
      sustain: 0.007,
      release: 0.9
    }
  },
  grappe: {
    oscillator: {
      type: "sawtooth",
      detune: 6
    },
    envelope: {
      attack: 0.6,
      decay: 1.5,
      decayCurve: "exponential",
      release: 0.9
    },
    filter: {
      type: "lowpass"
    },
    filterEnvelope: {
      attack: 0.03,
      decay: 1.7,
      sustain: 0.0007,
      release: 1.4,
      octaves: 5
    }
  }
};

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
    // this.notes = ['G#/Ab', 'An', 'A#/Bb', 'Bn/Cb', 'B#/Cn', 'C#/Db', 'Dn', 'D#/Eb', 'En/Fb', 'E#/Fn', 'F#/Gb', 'Gn'];
    this.notes = [
      "G#/Ab",
      "An",
      "A#/Bb",
      "Bn/Cb",
      "Cn",
      "C#/Db",
      "Dn",
      "D#/Eb",
      "En/Fb",
      "Fn",
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
    const accRootNote = this.notes.find(n => n.includes(rootNote + accidental));

    let prevIntervals = this.intervals.slice();
    let newIntervals = prevIntervals
      .splice(this.modes.indexOf(mode))
      .concat(prevIntervals.map(x => x + 12));
    newIntervals = newIntervals.map(x => x - newIntervals[0]);
    let newScale = newIntervals.map(
      x => this.notes[(this.notes.indexOf(accRootNote) + x) % 12]
    );
    const scales = newScale.map(x => {
      let id = uuidv1();
      return {
        note: (x.includes("#")
          ? x.split("/")[0]
          : x.includes("n")
            ? x.split("n")[0]
            : x
        ).concat(String(ove)),
        position: [
          parseInt(Math.random() * window.innerWidth),
          parseInt(Math.random() * (window.innerHeight - 300) + 300)
        ],
        id: id,
        start: false,
        // amp: 0.,
        // amp: new Tone.Gain(3),

        flavor: flavorsObj[flavor],
        actave: ove,

        synth: new Tone.MonoSynth(flavorsObj[flavor]).toMaster()
        // ;
      };
    });
    return scales;
  }
}

const KeyboardController = (keys, repeat) => {
  var timers = {};
  document.onkeydown = function (event) {
    var key = (event || window.event).keyCode;
    if (!(key in keys)) return true;
    if (!(key in timers)) {
      timers[key] = null;
      keys[key]();
      if (repeat !== 0) timers[key] = setInterval(keys[key], repeat);
    }
    return false;
  };

  document.onkeyup = function (event) {
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

// KeyboardController({
//     37: function () { console.log('left'); },
//     38: function () { up++; console.log(up); },
//     39: function () { console.log('right'); },
//     40: function () { console.log('down'); }
// }, 100);

export {
  modes,
  notes,
  accidentals,
  octaves,
  Greek,
  flavors,
  KeyboardController
};
