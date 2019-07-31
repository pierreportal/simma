import React, { Component } from "react";
import Tone from "tone";
import SpaceMap from "../edit-mode/SpaceMap";

export default class Sounds extends Component {
  constructor(props) {
    super(props);

    //define global volume controls
    let limiter = new Tone.Limiter(-3);
    let globalChannel = new Tone.Channel({
      volume: 0
    });

    //bring in state from parent(EditMap)
    let space = {
      amp: 0,
      flavor: "",
      note: "",
      start: false
    };

    //declare effects and give default states
    //these states will change when the flavor states are set by distance function (in EditMap)

    //delay and lowpass filter
    let delayChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let filter = new Tone.Filter({
      type: "notch",
      frequency: 800,
      q: 0,
      gain: 0
    });
    let envelope = new Tone.Envelope({
      attack: 0.1,
      decay: 0.3,
      sustain: 0.1,
      release: 0.4,
      decayCurve: "exponential"
    });
    let lfo = new Tone.LFO({
      type: "sine",
      frequency: "48n",
      amplitude: 1
    });
    lfo.connect(filter);
    envelope.connect(filter);
    let delay = new Tone.PingPongDelay(2).chain(delayChannel, filter);

    //chorus
    let chorusChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let chorus = new Tone.Chorus({
      frequency: 2,
      delayTime: 0,
      depth: 0,
      spread: 66,
      type: "sine",
      feedback: 0
    }).chain(chorusChannel);

    //Pitch Shift
    let pitchShiftChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let pitchShift = new Tone.PitchShift({
      pitch: -1.8,
      windowSize: 0.8,
      delayTime: 0,
      feedback: 0,
      wet: 0
    }).chain(pitchShiftChannel);

    //Tremolo & Vibrato
    let tremoloChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0,
      type: "sine"
    });
    let tremolo = new Tone.Tremolo({
      frequency: 0,
      type: "sawtooth",
      depth: 0,
      spread: 180
    }).chain(tremoloChannel, vibrato);

    //Bitcrusher
    let bitCrusherChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let chebyshev = new Tone.Chebyshev({
      order: 150,
      oversample: "none"
    });
    let feedBackDelay = new Tone.FeedbackDelay({
      delayTime: 0,
      feedback: 0,
      wet: 0
    });
    let bitCrusher = new Tone.BitCrusher({
      bits: 24
    }).chain(bitCrusherChannel, chebyshev, feedBackDelay);

    //AutoWah & Freeverb
    let autoWah = new Tone.AutoWah({
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 0,
      gain: 0,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    });
    let freeVerbChannel = new Tone.PanVol({
      pan: 0,
      volume: -9
    });
    let freeVerb = new Tone.Freeverb({
      roomSize: 0,
      dampening: 300
    }).chain(freeVerbChannel, autoWah);

    //JCReverb
    let jcVerbChannel = new Tone.PanVol({
      pan: 0,
      volume: -24
    });
    let verbFilter = new Tone.Filter({
      type: "lowpass",
      frequency: 350
    });
    let jcReverb = new Tone.JCReverb({
      roomSize: 0
    }).chain(jcVerbChannel, verbFilter);

    //Phaser
    let phasePitch = new Tone.PitchShift({
      pitch: 0.08,
      windowSize: 0.1,
      delayTime: 0.03,
      wet: 1
    });
    let phaseChannel = new Tone.PanVol({
      pan: 0,
      volume: -2
    });
    let phaser = new Tone.Phaser({
      frequency: 5,
      octaves: 0.3,
      Q: 0,
      baseFrequency: 9
    }).chain(phaseChannel, phasePitch);

    //declare synth and default values
    const synth = new Tone.FMSynth({
      harmonicity: 0,
      modulationIndex: 0,
      oscillator: {
        type: "sine",
        modulationType: "sine",
        modulationIndex: 0,
        harmonicity: 0
      },
      envelope: {
        attack: 8,
        decay: 15,
        sustain: 1,
        release: 0.002,
        attackCurve: "exponential"
      },
      modulation: {
        volume: 0,
        type: "triangle"
      },
      modulationEnvelope: {
        attack: 1,
        decay: 0.04,
        sustain: 0.5,
        release: 0.2
      },
      volume: 0,
      frequency: 0
    });

    //set the state
    this.state = {
      synth: synth,

      delayChannel: delayChannel,
      filter: filter,
      envelope: envelope,
      lfo: lfo,

      chorusChannel: chorusChannel,
      chorus: chorus,

      pitchShiftChannel: pitchShiftChannel,
      pitchShift: pitchShift,

      tremoloChannel: tremoloChannel,
      vibrato: vibrato,
      tremolo: tremolo,

      bitCrusherChannel: bitCrusherChannel,
      chebyshev: chebyshev,
      feedBackDelay: feedBackDelay,
      bitCrusher: bitCrusher,
      autoWah: autoWah,

      freeVerbChannel: freeVerbChannel,
      freeVerb: freeVerb,

      jcVerbChannel: jcVerbChannel,
      verbFilter: verbFilter,
      jcReverb: jcReverb,

      phaseChannel: phaseChannel,
      phasePitch: phaseChannel,
      phaser: phaser,

      limiter: limiter,
      globalChannel: globalChannel,

      space: space,

      synthOn: new Tone.Event(function (time, note) {
        console.log("it");
        synth.triggerAttack("C3", "8n");
        envelope.triggerAttack();
      }),
      synthOff: new Tone.Event(function (time, note) {
        synth.triggerRelease("C3", "8n");
        envelope.triggerRelease();
        console.log("made");
      })
    };

    //set up effect connections
    synth.connect(limiter);
    limiter.fan(
      delay,
      chorus,
      pitchShift,
      tremolo,
      bitCrusher,
      freeVerb,
      jcReverb,
      phaser
    );

    //routed effects into global channel strip
    delay.connect(globalChannel);
    chorus.connect(globalChannel);
    pitchShift.connect(globalChannel);
    tremolo.connect(globalChannel);
    bitCrusher.connect(globalChannel);
    freeVerb.connect(globalChannel);
    jcReverb.connect(globalChannel);
    phaser.connect(globalChannel);

    //global channel strip into master output
    globalChannel.connect(Tone.Master);
  }

  //mount the components
  componentDidMount() {
    //Initialize an audio context
    this.audioContext = new AudioContext();
  }

  //unmount audiocontext and settimeout
  componentWillUnmount() {
    // clearInterval(this.state.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    // const space = this.props.space || [];
    // let newSpace = [...space];
    if (this.props.space[0].note !== this.state.space.note) {
      this.setState({
        space: {
          ...this.state.space,
          note: this.props.space[0].note
        }
      });
    }
    if (this.props.space[0].amp !== this.state.space.amp) {
      this.setState({
        space: {
          ...this.state.space,
          amp: this.props.space[0].amp
        }
      });
    }
    if (this.props.space[0].flavor !== this.state.space.flavor) {
      this.setState({
        space: {
          ...this.state.space,
          flavor: this.props.space[0].flavor
        }
      });
    }
    if (this.props.space[0].start !== this.state.space.start) {
      this.setState({
        space: {
          ...this.state.space,
          start: this.props.space[0].start
        }
      });
    }
    if (this.state.space.start) {
      this.state.synthOn.start(0);
      // this.state.synthOff.stop(0);
      Tone.Transport.start();
      Tone.Master.mute = false;
    }
    if (!this.state.space.start) {
      this.state.synthOn.stop(0);
      this.state.synthOff.start(0);
      Tone.Master.mute = true;
    }
  }
  // handleClick = () => {
  //   this.setState(flavors.vanilla);
  // };
  playSound = () => {
    this.setState(flavors.vanilla)
    console.log(this.state)
  }

  render() {
    console.log(this.state);
    console.log(flavors.vanilla);
    return (
      <div>
        {/* <button onClick={this.handleClick}>Set State</button> */}
        <SpaceMap user={this.props.user} {...this.props} playSound={this.playSound} />
      </div>
    );
  }
}

let flavors = {
  vanilla: {
    synth: {
      harmonicity: 0.5,
      modulationIndex: 1.4,
      oscillator: {
        type: "fmsawtooth",
        modulationType: "square",
        modulationIndex: 20,
        vibratomount: 0,
        harmonicity: 3
      },
      envelope: {
        attack: 8,
        decay: 15,
        sustain: 1,
        release: 0.002,
        attackCurve: "exponential"
      },
      modulation: {
        volume: 2,
        type: "triangle"
      },
      modulationEnvelope: {
        attack: 1,
        decay: 0.04,
        sustain: 0.5,
        release: 0.2
      },
      volume: 0,
      frequency: 0
    },
    delayChannel: {
      pan: 0,
      volume: 0
    },
    filter: {
      type: "notch",
      frequency: 800,
      q: 4,
      gain: 0
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.1,
      release: 0.4,
      decayCurve: "exponential"
    },
    lfo: {
      type: "sine",
      frequency: "48n",
      amplitude: 1
    },
    chorusChannel: {
      pan: 0,
      volume: 0
    },
    chorus: {
      frequency: 2,
      delayTime: 8,
      depth: 1,
      spread: 66,
      type: "sine",
      feedback: 0.8
    },
    pitchShiftChannel: {
      pan: 0,
      volume: 0
    },
    pitchShift: {
      pitch: -1.8,
      windowSize: 0.8,
      delayTime: 0.8,
      feedback: 0.5,
      wet: 1
    },
    tremoloChannel: {
      pan: 0,
      volume: 0
    },
    vibrato: {
      frequency: 5,
      depth: 0.2,
      type: "sine"
    },
    tremolo: {
      frequency: 120,
      type: "sawtooth",
      depth: 1,
      spread: 180
    },
    bitCrusherChannel: {
      pan: 0,
      volume: 0
    },
    chebyshev: {
      order: 150,
      oversample: "none"
    },
    feedBackDelay: {
      delayTime: 0.5,
      feedback: 0.9,
      wet: 1
    },
    bitCrusher: {
      bits: 8
    },
    autoWah: {
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    },
    freeVerbChannel: {
      pan: 0,
      volume: -9
    },
    freeVerb: {
      roomSize: 1.06,
      dampening: 300
    },
    jcVerbChannel: {
      pan: 0,
      volume: -20
    },
    verbFilter: {
      type: "lowpass",
      frequency: 350
    },
    jcReverb: {
      roomSize: 0.7
    },
    phasePitch: {
      pitch: 0.08,
      windowSize: 0.1,
      delayTime: 0.03,
      wet: 1
    },
    phaseChannel: {
      pan: 0,
      volume: -2
    },
    phaser: {
      frequency: 5,
      octaves: 0.3,
      Q: 1,
      baseFrequency: 9
    },
    limiter: {
      threshold: -3
    },
    globalChannel: {
      volume: 0
    }
  },
  grappe: {
    synth: {
      harmonicity: 0,
      modulationIndex: 0,
      oscillator: {
        type: "square",
        modulationType: "square",
        modulationIndex: 20,
        vibratomount: 0.5,
        harmonicity: 0
      },
      envelope: {
        attack: 0.93,
        decay: 0.6,
        sustain: 0.03,
        release: 1.1,
        attackCurve: "sine"
      },
      modulation: {
        volume: 0.2,
        type: "square"
      },
      modulationEnvelope: {
        attack: 2,
        decay: 0.04,
        sustain: 0.1,
        release: 0.9
      },
      volume: -3,
      frequency: 0
    },
    delayChannel: {
      pan: 0,
      volume: 0
    },
    filter: {
      type: "notch",
      frequency: 800,
      q: 4,
      gain: 0
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.1,
      release: 0.4,
      decayCurve: "exponential"
    },
    lfo: {
      type: "sine",
      frequency: "48n",
      amplitude: 1
    },
    chorusChannel: {
      pan: 0,
      volume: 0
    },
    chorus: {
      frequency: 2,
      delayTime: 8,
      depth: 1,
      spread: 66,
      type: "sine",
      feedback: 0.8
    },
    pitchShift: {
      pitch: -1.8,
      windowSize: 0.8,
      delayTime: 0.1,
      feedback: 0.1,
      wet: 1
    },
    pitchShiftChannel: {
      pan: 0,
      volume: 0
    },
    tremoloChannel: {
      pan: 0,
      volume: 0
    },
    vibrato: {
      frequency: 5,
      depth: 0.2,
      type: "sine"
    },
    tremolo: {
      frequency: 120,
      type: "sawtooth",
      depth: 1,
      spread: 180
    },
    bitCrusherChannel: {
      pan: 0,
      volume: 0
    },
    chebyshev: {
      order: 150,
      oversample: "none"
    },
    feedBackDelay: {
      delayTime: 0.2,
      feedback: 0.3,
      wet: 1
    },
    bitCrusher: {
      bits: 8
    },
    autoWah: {
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    },
    freeVerbChannel: {
      pan: 0,
      volume: -9
    },
    freeVerb: {
      roomSize: 0.26,
      dampening: 300
    },
    jcVerbChannel: {
      pan: 0,
      volume: -10
    },
    verbFilter: {
      type: "lowpass",
      frequency: 350
    },
    jcReverb: {
      roomSize: 0.7
    },
    phasePitch: {
      pitch: 0.008,
      windowSize: 0.1,
      delayTime: 0.03,
      wet: 1
    },
    phaseChannel: {
      pan: 0,
      volume: -4
    },
    phaser: {
      frequency: 5,
      octaves: 0.3,
      Q: 1,
      baseFrequency: 9
    }
  },
  mint: {
    synth: {
      harmonicity: 0,
      modulationIndex: 0,
      oscillator: {
        type: "sine",
        modulationType: "square",
        modulationIndex: 0,
        vibratomount: 0,
        harmonicity: 0
      },
      envelope: {
        attack: 0.33,
        decay: 0.6,
        sustain: 0.3,
        release: 0.8,
        attackCurve: "sine"
      },
      modulation: {
        volume: 99,
        type: "sawtooth"
      },
      modulationEnvelope: {
        attack: 0.9,
        decay: 0.04,
        sustain: 0.1,
        release: 0.9
      },
      volume: -3,
      frequency: 0
    },
    delayChannel: {
      pan: 0,
      volume: 0
    },
    filter: {
      type: "notch",
      frequency: 800,
      q: 4,
      gain: 0
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.1,
      release: 0.4,
      decayCurve: "exponential"
    },
    lfo: {
      type: "sine",
      frequency: "48n",
      amplitude: 1
    },
    chorusChannel: {
      pan: 0,
      volume: 0
    },
    chorus: {
      frequency: 2,
      delayTime: 8,
      depth: 1,
      spread: 66,
      type: "sine",
      feedback: 0.8
    },
    pitchShiftChannel: {
      pan: 0,
      volume: 0
    },
    pitchShift: {
      pitch: -0.03,
      windowSize: 0.3,
      delayTime: 0.2,
      feedback: 0.5,
      wet: 1
    },
    tremoloChannel: {
      pan: 0,
      volume: 0
    },
    vibrato: {
      frequency: 5,
      depth: 0.2,
      type: "sine"
    },
    tremolo: {
      frequency: 120,
      type: "sawtooth",
      depth: 1,
      spread: 180
    },
    bitCrusherChannel: {
      pan: 0,
      volume: 0
    },
    chebyshev: {
      order: 150,
      oversample: "none"
    },
    feedBackDelay: {
      delayTime: 2,
      feedback: 0.2,
      wet: 1
    },
    bitCrusher: {
      bits: 16
    },
    autoWah: {
      baseFrequency: 100,
      octaves: 2,
      sensitivity: 0,
      Q: 1,
      gain: 1,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    },
    freeVerbChannel: {
      pan: 0,
      volume: -6
    },
    freeVerb: {
      roomSize: 0.06,
      dampening: 300
    },
    jcVerbChannel: {
      pan: 0,
      volume: -7
    },
    verbFilter: {
      type: "lowpass",
      frequency: 350
    },
    jcReverb: {
      roomSize: 0.0002
    },
    phasePitch: {
      pitch: 0.04,
      windowSize: 0.01,
      delayTime: 0.03,
      wet: 1
    },
    phaseChannel: {
      pan: 0,
      volume: -2
    },
    phaser: {
      frequency: 1,
      octaves: 0.3,
      Q: 1,
      baseFrequency: 2
    }
  }
};