import React, { Component } from 'react'
import { modes, notes, accidentals, octaves, flavors } from './editModeConstants'


export default class GenerateScaleBtn extends Component {
    state = {
        showScalePrompt: false,
        inputScale: modes[0],
        inputNote: notes[0],
        inputAccidentals: accidentals[0],
        inputOctaves: octaves[2],
        inputFlavor: flavors[0],
        listOfOctaves: octaves,
        listOfModes: modes,
        listOfNotes: notes,
        listOfAccidentals: accidentals,
        listOfFlavors: flavors
    }
    // METHODS
    generateScale = () => {
        this.setState({ showScalePrompt: !this.state.showScalePrompt })
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    handleSubmit = e => {
        e.preventDefault()
        const { inputScale, inputNote, inputAccidentals, inputOctaves, inputFlavor } = this.state
        this.setState({ showScalePrompt: false })
        this.props.generateScale(inputScale, inputNote, inputAccidentals, inputOctaves, inputFlavor)
    }
    // RENDER
    render() {
        return (
            <div>
                {<button onClick={this.generateScale}>{this.state.showScalePrompt ? 'cancel' : 'new space'}</button>}

                {this.state.showScalePrompt && <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} name='inputNote' value={this.state.inputNote}>
                        {this.state.listOfNotes.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select>
                    <select onChange={this.handleChange} name='inputAccidentals' value={this.state.inputAccidentals}>
                        {this.state.listOfAccidentals.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select>
                    <select onChange={this.handleChange} name='inputOctaves' value={this.state.inputOctaves}>
                        {this.state.listOfOctaves.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select>
                    <select onChange={this.handleChange} name='inputScale' value={this.state.inputScale}>
                        {this.state.listOfModes.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select>

                    <select onChange={this.handleChange} name='inputFlavor' value={this.state.inputFlavor}>
                        {this.state.listOfFlavors.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select>

                    <button type="submit">Create</button>
                </form>}
            </div>
        )
    }
}
