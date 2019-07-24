import React, { Component } from "react";
import Tone from "tone";

export default class Synth extends Component {
  constructor(props) {
    super(props);

    //declare synth
    const synth = new Tone.FMSynth({
      harmonicity: 6.01,
      modulationIndex: 9,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.09,
        decay: 0.2,
        sustain: 0.8,
        release: 1.2,
        attackCurve: "sine"
      },
      modulation: {
        type: "sine"
      },
      modulationEnvelope: {
        attack: 0,
        decay: 0,
        sustain: 1,
        release: 0.1
      },
      volume: -6
    });

    this.state = {
      synth: synth,

      //declare pattern
      pattern: new Tone.Pattern(
        function(time, note) {
          synth.triggerAttackRelease(note, "65n");
        },
        ["B3", "F4", "D2", "E3", "C3", "B3", "B3", "B3", "B3", "F5", "D4"]
      )
    };

    //set up effect blocks

    //declare global limiter
    let limiter = new Tone.Limiter(-6);

    //delay
    let delayChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let delay = new Tone.PingPongDelay(0.75).chain(
      limiter,
      delayChannel,
      Tone.Master
    );

    //filter
    let filterChannel = new Tone.PanVol({
      pan: -1,
      volume: -6
    });
    let filter = new Tone.Filter({
      type: "lowpass",
      frequency: 300,
      gain: -3
    }).chain(limiter, filterChannel, Tone.Master);

    //chorus
    let chorusChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let chorus = new Tone.Chorus({
      frequency: 0.4,
      delayTime: 13,
      depth: 1,
      spread: 100,
      type: "sine",
      feedback: 0.5
    }).chain(limiter, chorusChannel, Tone.Master);

    //Pitch Shift
    let pitchShiftChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let pitchShift = new Tone.PitchShift({
      pitch: 7,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0,
      wet: 0.5
    }).chain(limiter, pitchShiftChannel, Tone.Master);

    //Tremolo
    let tremoloChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let tremolo = new Tone.Tremolo({
      frequency: 10,
      type: "sine",
      depth: 0.5,
      spread: 180
    }).chain(limiter, tremoloChannel, Tone.Master);

    //Vibrato
    let vibratoChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.2,
      type: "sine"
    }).chain(limiter, vibratoChannel, Tone.Master);

    //Auto Filter
    let autoFilterChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let autoFilter = new Tone.AutoFilter({
      frequency: 5,
      type: "square4",
      depth: 0.4,
      baseFrequency: 150,
      octaves: 3.1,
      filter: {
        type: "lowpass",
        rolloff: -24,
        Q: 4
      }
    }).chain(limiter, autoFilterChannel, Tone.Master);

    //Bitcrusher
    let bitCrusherChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let bitCrusher = new Tone.BitCrusher({
      bits: 8
    }).chain(limiter, bitCrusherChannel, Tone.Master);

    //Feedback Delay
    let fbDelayChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let feedBackDelay = new Tone.FeedbackDelay({
      delayTime: "4n",
      feedback: 0.7
    }).chain(limiter, fbDelayChannel, Tone.Master);

    //Freeverb
    let freeVerbChannel = new Tone.PanVol({
      pan: 1,
      volume: 0
    });
    let freeVerb = new Tone.Freeverb({
      roomSize: 0.7,
      dampening: 4300
    }).chain(limiter, freeVerbChannel, Tone.Master);

    //JCReverb
    let jcVerbChannel = new Tone.PanVol({
      pan: -1,
      volume: 0.5
    });
    let jcReverb = new Tone.JCReverb({
      roomSize: 5
    }).chain(limiter, jcVerbChannel, Tone.Master);

    //Phaser
    let phaseChannel = new Tone.PanVol({
      pan: -1,
      volume: -2
    });
    let phaser = new Tone.Phaser({
      frequency: 0.5,
      octaves: 3.3,
      Q: 3,
      baseFrequency: 250
    }).chain(limiter, phaseChannel, Tone.Master);

    //set up connections
    synth.connect(filter);
  }

  // componentDidMount() {
  //   // Initialize an audio context
  //   this.audioContext = new AudioContext();
  // }

  sequence = () => {
    if (this.state.pattern.state === "stopped") {
      this.state.pattern.start(0);
      Tone.Transport.start();
    } else {
      this.state.pattern.stop(0);
      Tone.Transport.stop();
    }
    console.log(this.state.pattern.state);
  };

  render() {
    return (
      <div>
        <button className="Synth" onClick={this.sequence}>
          <h1>Mars Bar</h1>
        </button>
        <h3>{this.level}</h3>
      </div>
    );
  }
}
