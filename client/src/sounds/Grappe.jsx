import React, { Component } from "react";
import Tone from "tone";
import random from "./Random";
import SequenceArray from "./SequenceArray";
import Coordinates from "../Components/Coordinates";

export default class Grappe extends Component {
  constructor(props) {
    super(props);

    //declare global limiter
    let limiter = new Tone.Limiter(-3);

    //declare global channel strip
    let globalChannel = new Tone.Channel({
      volume: 0
    });

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
    let delay = new Tone.PingPongDelay(1).chain(delayChannel, filter);

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
      volume: -9
    });
    let pitchShift = new Tone.PitchShift({
      pitch: -1.8,
      windowSize: 0.8,
      delayTime: 0.1,
      feedback: 0.01,
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
      delayTime: 0.2,
      feedback: 0.3,
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
      roomSize: 0.26,
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
      pitch: 0.008,
      windowSize: 0.1,
      delayTime: 0.03,
      wet: 1
    });
    let phaseChannel = new Tone.PanVol({
      pan: 0,
      volume: -4
    });
    let phaser = new Tone.Phaser({
      frequency: 5,
      octaves: 0.3,
      Q: 1,
      baseFrequency: 9
    }).chain(phaseChannel, phasePitch);

    //set tempo
    let tempo = (Tone.Transport.bpm.value = 90);
    Tone.Transport.swing = 1;
    // Tone.Transport.bpm.rampTo(80, 500);

    //declare synth
    const synth = new Tone.DuoSynth({
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
      frequency: 0,
      portamento: 0
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

      //declare pattern
      pattern: new Tone.Pattern(function(time, note) {
        synth.triggerAttackRelease(note, "5t");
        envelope.triggerAttackRelease("9t");
      }, [])
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

  //is this duplicate code?
  // changeVolume = () => {
  //   let interval = setInterval(() => {
  //     const synth = this.state.synth;
  //     synth.set("volume", random());
  //     this.setState({ synth: synth });
  //   }, 100);
  //   this.setState({ interval });
  // };

  //mount the components
  componentDidMount() {
    //bring in coorindates
    let coordinates = { ...Coordinates };
    let nodeVolume = coordinates.volume;
    let nodePan = coordinates.pan;
    console.log(nodeVolume);
    console.log(nodePan);
    const globalChannel = this.state.globalChannel;
    globalChannel.set("volume", nodeVolume);
    globalChannel.set("pan", nodePan);
    this.setState({ globalChannel: globalChannel });
    //test that data stream can manipulate synth and volume
    let randomNum = setInterval(() => {
      const pitchShift = this.state.pitchShift;
      pitchShift.set("pitch", random());
      this.setState({ pitchShift: pitchShift });
      const feedBackDelay = this.state.feedBackDelay;
      feedBackDelay.set("delayTime", random() / -49);
      this.setState({ feedBackDelay: feedBackDelay });
      const freeVerb = this.state.freeVerb;
      freeVerb.set("roomSize", random() / -84.6);
      this.setState({ freeVerb: freeVerb });
      const synth = this.state.synth;
      synth.set("portamento", random());
      synth.set("envelope", { release: random() / -38 });
      this.setState({ synth: synth });
      const tone = this.state.tempo;
      Tone.Transport.bpm.set("bpm", random() * -7);
      this.setState({ tone: tone });
    }, 10000);
    // const synth = this.state.synth;
    // synth.set("volume", randomNum);

    //Initialize an audio context
    this.audioContext = new AudioContext();
  }
  sliderChange = e => {
    const synth = this.state.synth;
    const value = e.target.value;
    synth.setState("frequency", value);
  };

  //unmount audiocontext and settimeout
  componentWillUnmount() {
    clearInterval(this.state.interval);
    // this.sequence.dispose();
    // this.audioContext.close();
  }

  //stop and start the sequence
  sequence = () => {
    const pattern = { ...this.state.pattern };
    pattern._pattern.values = SequenceArray();
    if (this.state.pattern.state === "stopped") {
      this.state.pattern.start(0);
      Tone.Transport.start();
    } else {
      this.state.pattern.stop(0);
      Tone.Transport.stop();
    }
  };

  render() {
    return (
      <div>
        <button className="Synth" onClick={this.sequence}>
          <h1>Grappe</h1>
        </button>
        <input
          type="range"
          min="0"
          max="50"
          onChange={e => this.sliderChange(e.target.value)}
        />
      </div>
    );
  }
}
