import Tone from "tone";
import React, { useState } from "react";

export default function Pickel() {
  const synth = new Tone.FMSynth({
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
    }
  });
  synth.connect(Tone.Master);

  let [vol, setVol] = useState(0.93);
  vol = synth.envelope.attack;

  const triggerSynth = () => {
    synth.triggerAttackRelease("C3", "2n");
  };

  Tone.PolySynth.MAX_POLYPHONY = 7;
  return (
    <div>
      <button
        onClick={event => {
          setVol(1.3);
          triggerSynth();
        }}
      >
        <h3>Trigger</h3>
      </button>
    </div>
  );
}
