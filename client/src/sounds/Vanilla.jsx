import React, { Component } from "react";
import Tone from "tone";

export default class Vanilla extends Component {
  constructor(props) {
    super(props);

    //declare global limiter
    let limiter = new Tone.Limiter(-3);

    //declare global channel strip
    let globalChannel = new Tone.Channel({
      volume: 0
    });

    let space = {
      amp: 0,
      flavor: "",
      note: "",
      start: false
    };

    //set up effect blocks

    //delay and lowpass filter
    let delayChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let filter = new Tone.Filter({
      type: "notch",
      frequency: 800,
      q: 4,
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
      delayTime: 8,
      depth: 1,
      spread: 66,
      type: "sine",
      feedback: 0.8
    }).chain(chorusChannel);

    //Pitch Shift
    let pitchShiftChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let pitchShift = new Tone.PitchShift({
      pitch: -1.8,
      windowSize: 0.8,
      delayTime: 0.8,
      feedback: 0.5,
      wet: 1
    }).chain(pitchShiftChannel);

    //Tremolo & Vibrato
    let tremoloChannel = new Tone.Channel({
      pan: 0,
      volume: 0
    });
    let vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.2,
      type: "sine"
    });
    let tremolo = new Tone.Tremolo({
      frequency: 120,
      type: "sawtooth",
      depth: 1,
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
      delayTime: 0.5,
      feedback: 0.9,
      wet: 1
    });
    let bitCrusher = new Tone.BitCrusher({
      bits: 8
    }).chain(bitCrusherChannel, chebyshev, feedBackDelay);

    //AutoWah & Freeverb
    let autoWah = new Tone.AutoWah({
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
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
      roomSize: 1.06,
      dampening: 300
    }).chain(freeVerbChannel, autoWah);

    //JCReverb
    let jcVerbChannel = new Tone.PanVol({
      pan: 0,
      volume: -10
    });
    let verbFilter = new Tone.Filter({
      type: "lowpass",
      frequency: 350
    });
    let jcReverb = new Tone.JCReverb({
      roomSize: 0.7
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
      Q: 1,
      baseFrequency: 9
    }).chain(phaseChannel, phasePitch);

    //set tempo
    let tempo = (Tone.Transport.bpm.value = 90);
    // Tone.Transport.bpm.rampTo(80, 500);

    //declare synth
    const synth = new Tone.FMSynth({
      harmonicity: 0.5,
      modulationIndex: 1.4,
      oscillator: {
        type: "fmsawtooth",
        modulationType: "square",
        modulationIndex: 20,
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
    });

    //set the state
    this.state = {
      globalChannel: globalChannel,
      synth: synth,
      jcVerbChannel: jcVerbChannel,
      phaseChannel: phaseChannel,
      delayChannel: delayChannel,
      chorusChannel: chorusChannel,
      pitchShiftChannel: pitchShiftChannel,
      tremoloChannel: tremoloChannel,
      bitCrusherChannel: bitCrusherChannel,
      freeVerbChannel: freeVerbChannel,
      limiter: limiter,
      pitchShift: pitchShift,
      feedBackDelay: feedBackDelay,
      freeVerb: freeVerb,
      tempo: tempo,
      space: space,

      synthOn: new Tone.Event(function(time, note) {
        console.log("it");
        synth.triggerAttack("C3", "8n");
        envelope.triggerAttack();
      }),
      synthOff: new Tone.Event(function(time, note) {
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
      // jcReverb,
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
    clearInterval(this.state.interval);
    // this.sequence.dispose();
    // this.audioContext.close();
  }

  componentDidUpdate(prevProps, prevState) {
    const space = this.props.space || [];
    let newSpace = [...space];
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
    // if (!this.state.space.start && this.state.synth.envelope.sustain > 0) {
    //   this.setState({
    //     synth: {
    //       envelope: {
    //         sustain: 0
    //       }
    //     }
    //   });
    // }
  }

  render() {
    console.log(this.props);
    console.log(this.state.space.start);
    return <div />;
  }
}
