<style lang="less">
@import '../main';
</style>

<style lang="less" scoped>
@import (reference) '../main';

.app {
  min-height       : 100vh;
  background-color : @gray;
  overflow         : hidden;
}

.app__navigation {
  position       : absolute;
  right          : 0;
  top            : 0;
  padding        : 10px;
  display        : flex;
  flex-direction : column;
}

.app__navigation-button {
  width            : 100px;
  margin-bottom    : 10px;
  padding          : 7px;
  border           : 2px solid @very-light-gray;
  border-radius    : 5px;
  font-family      : @magic-midi-font;
  font-size        : 22px;
  background-color : @very-light-gray;
  color            : @gray;

  &:hover {
    border           : 2px solid @light-gray;
    background-color : @light-gray;
    cursor           : pointer;
  }
}

.app__content--blur, .app__navigation--blur {
  filter         : blur(3px);
  pointer-events : none;
}

.app__header {
  padding-top     : 20px;
  display         : flex;
  justify-content : center;
  align-items     : center;
}

.app__logo { height: 12vw; }

.app__svg {
  margin-left : 20vw;
  padding     : 1px;
}

.app__keyboard {
  fill         : none;
  stroke       : @black;
  stroke-width : 1px;
}

.app__key { cursor: pointer; }

.app__key--white {
  fill         : @white;
  stroke       : @black;
  stroke-width : 1px;
}

.app__key--black { fill: @black; }

.app__key--pressed { fill: @pale-yellow; }

.app__key-text {
  font-family    : @medium-display-font;
  pointer-events : none;
  user-select    : none;
}

.app__key-text--white {
  fill      : @black;
  font-size : 4px;
}

.app__key-text--black {
  fill      : @white;
  font-size : 3px;
}

.app__instruments {
  // height  : calc(~'100vh - 30vw');
  padding         : 20px 10vw 10px 10vw;
  display         : flex;
  justify-content : center;
}

.app__instrument {
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
  align-items     : center;
}

.app__img, .app__checkbox { cursor: pointer; }

.app__img--instrument {
  max-width  : calc(~'(100vh - 30vw - 30px) / 4 * 1.2');;
  max-height : calc(~'(100vh - 30vw - 30px) / 4');;
  object-fit : contain;
}

.app__img--delete {
  width         : 18px;
  height        : 18px;
  padding       : 4px;
  border        : 1px solid @very-light-gray;
  border-radius : 5px;

  &:hover { background-color: @dark-gray; }
}

.app__buttons {
  display         : flex;
  justify-content : center;
}

.app__button {
  width            : 100px;
  padding          : 10px;
  border           : 2px solid @yellow;
  border-radius    : 5px;
  font-family      : @magic-midi-font;
  font-size        : 30px;
  background-color : @yellow;
  color            : @gray;
  cursor           : pointer;

  &:hover {
    border           : 2px solid @dark-yellow;
    background-color : @dark-yellow;
  }
}

.app__button_record {
  margin-right     : 10px;
  border           : 2px solid @orange;
  background-color : @orange;

  &:hover {
    border           : 2px solid @dark-orange;
    background-color : @dark-orange;
  }
}

.app__button_stop {
  margin-right     : 10px;
  border           : 2px solid @red;
  background-color : @red;

  &:hover {
    border           : 2px solid @dark-red;
    background-color : @dark-red;
  }
}

.app__button_play { margin: 0 10px; }

.app__button_save { margin-left: 10px; }
</style>

<template>
  <div class="app">

    <!-- Content -->
    <div class="app__content" :class="{ 'app__content--blur': instructionsVisible }">

      <!-- Logo -->
      <div class="app__header">
        <img class="app__logo" src="/assets/images/logo.png"/>
      </div>

      <!-- Keyboard -->
      <svg class="app__svg" width="60vw" height="15vw" viewBox="0 0 100 25" preserveAspectRatio="xMidYMid meet">
        <rect class="app__key app__key--white" :class="{ 'app__key--pressed': key.on }" :x="(100 / nKeys * index) + '%'" y="0%" :width="(100 / nKeys) + '%'" height="100%" v-for="(key, index) in keys.white" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <rect class="app__key app__key--black" :class="{ 'app__key--pressed': key.on }" :x="(100 / nKeys * (0.75 + index)) + '%'" y="0%" :width="(100 / nKeys * 0.5) + '%'" height="50%" v-for="(key, index) in keys.black" v-if="key.pitch !== -1" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <g v-show="helperTextVisible">
          <text class="app__key-text app__key-text--white" :x="(100 / nKeys * (0.27 + index)) + '%'" y="90%" v-for="(key, index) in keys.white">{{ key.name }}</text>
          <text class="app__key-text app__key-text--black" :x="(100 / nKeys * (0.88 + index)) + '%'" y="20%" v-for="(key, index) in keys.black" v-if="keys.pitch !== -1">{{ key.name }}</text>
        </g>
        <rect class="app__keyboard" x="0%" y="0%" width="100%" height="100%"></rect>
      </svg>

      <!-- Instruments -->
      <div class="app__instruments">
        <div class="app__instrument" v-for="instrument in instruments">
          <img class="app__img app__img--instrument" :src="'/assets/images/' + getInstrumentImageName(instrument) + '.svg'" @click="toggleInstrumentSelection(instrument)"/>
          <input class="app__checkbox" type="checkbox" :name="instrument.name" v-if="instrument.record">
          <img class="app__img app__img--delete" src="/assets/images/delete-gray.svg" v-if="instrument.record" @click="clearRecord(instrument)"/>
        </div>
      </div>

      <!-- Buttons -->
      <div class="app__buttons">
        <button v-if="!recording" class="app__button app__button_record" @click="record">Record</button>
        <button v-else class="app__button app__button_stop" @click="stop">Stop</button>
        <button class="app__button app__button_play" @click="play">Play</button>
        <button class="app__button app__button_save" @click="save">Save</button>
      </div>

    </div>

    <!-- Navigation -->
    <div class="app__navigation" :class="{ 'app__navigation--blur': instructionsVisible }">
      <button class="app__navigation-button" @click="openInstructions">Instructions</button>
      <button class="app__navigation-button" @click="helperTextVisible = !helperTextVisible">Keyboard</button>
    </div>

    <!-- Instructions -->
    <instructions v-if="instructionsVisible" @close="closeInstructions"></instructions>

  </div>
</template>

<script>
import Instructions from './Instructions.vue'

export default {
  data () {
    return {
      helperTextVisible: false,
      instructionsVisible: false,
      keys: {
        white: [
          { pitch: 60, code: 81, name: 'Q', on: false },
          { pitch: 62, code: 87, name: 'W', on: false },
          { pitch: 64, code: 69, name: 'E', on: false },
          { pitch: 65, code: 82, name: 'R', on: false },
          { pitch: 67, code: 84, name: 'T', on: false },
          { pitch: 69, code: 89, name: 'Y', on: false },
          { pitch: 71, code: 85, name: 'U', on: false },
          { pitch: 72, code: 90, name: 'Z', on: false },
          { pitch: 74, code: 88, name: 'X', on: false },
          { pitch: 76, code: 67, name: 'C', on: false },
          { pitch: 77, code: 86, name: 'V', on: false },
          { pitch: 79, code: 66, name: 'B', on: false },
          { pitch: 81, code: 78, name: 'N', on: false },
          { pitch: 83, code: 77, name: 'M', on: false }
        ],
        black: [
          { pitch: 61, code: 50, name: '2', on: false },
          { pitch: 63, code: 51, name: '3', on: false },
          { pitch: -1, code: -1 },
          { pitch: 66, code: 53, name: '5', on: false },
          { pitch: 68, code: 54, name: '6', on: false },
          { pitch: 70, code: 55, name: '7', on: false },
          { pitch: -1, code: -1 },
          { pitch: 73, code: 83, name: 'S', on: false },
          { pitch: 75, code: 68, name: 'D', on: false },
          { pitch: -1, code: -1 },
          { pitch: 78, code: 71, name: 'G', on: false },
          { pitch: 80, code: 72, name: 'H', on: false },
          { pitch: 82, code: 74, name: 'J', on: false }
        ]
      },
      instruments: [
        { channel: 0, name: 'piano', soundfont: 'acoustic_grand_piano', record: null },
        { channel: 1, name: 'trumpet', soundfont: 'trumpet', record: null },
        { channel: 2, name: 'clarinet', soundfont: 'clarinet', record: null },
        { channel: 3, name: 'guitar', soundfont: 'guitar_harmonics', record: null },
        { channel: 4, name: 'violin', soundfont: 'violin', record: null },
        { channel: 5, name: 'saxophone', soundfont: 'soprano_sax', record: null }
      ],
      selectedInstrument: null,
      recording: false,
      NOTE_ON: 0,
      NOTE_OFF: 1
    }
  },
  computed: {
    nKeys () {
      return this.keys.white.length
    }
  },
  created () {
    this.setupMIDIPlugin()
    this.selectedInstrument = this.instruments[0]
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('keydown', (event) => this.keydown(event))
      window.addEventListener('keyup', (event) => this.keyup(event))
    })
  },
  destroyed () {
    window.removeEventListener('keywdown', (event) => this.keydown(event))
    window.removeEventListener('keyup', (event) => this.keyup(event))
  },
  methods: {
    setupMIDIPlugin () {
      MIDI.loadPlugin({
        soundfontUrl: '/assets/soundfonts/',
        instruments: this.instruments.map(instrument => instrument.soundfont),
        onsuccess: () => {
          this.instruments.forEach(instrument => {
            MIDI.setVolume(instrument.channel, 127)
            MIDI.programChange(instrument.channel, MIDI.GM.byName[instrument.soundfont].number)
          })
        }
      })
    },
    getKey (keyCode) {
      let keys = [
        ...this.keys.white.filter(key => key.code === keyCode),
        ...this.keys.black.filter(key => key.code === keyCode)
      ]
      return keys.length > 0 ? keys[0] : null
    },
    mousedown (key) {
      if (this.selectedInstrument) {
        key.on = true
        this.noteOn(this.selectedInstrument.channel, key.pitch)
      }
    },
    mouseup (key) {
      if (this.selectedInstrument) {
        key.on = false
        this.noteOff(this.selectedInstrument.channel, key.pitch)
      }
    },
    keydown (event) {
      if (this.selectedInstrument) {
        let key = this.getKey(event.keyCode)
        if (key && !key.on) {
          key.on = true
          this.noteOn(this.selectedInstrument.channel, key.pitch)
        }
      }
    },
    keyup (event) {
      if (this.selectedInstrument) {
        let key = this.getKey(event.keyCode)
        if (key) {
          key.on = false
          this.noteOff(this.selectedInstrument.channel, key.pitch)
        }
      }
    },
    noteOn (channel, pitch) {
      // channel id, note number, velocity, delay
      MIDI.noteOn(channel, pitch, 127, 0)
      if (this.recording) {
        this.recordNote(this.NOTE_ON, Date.now(), pitch)
      }
    },
    noteOff (channel, pitch) {
      // channel id, note number, delay
      MIDI.noteOff(channel, pitch, 0.75)
      if (this.recording) {
        this.recordNote(this.NOTE_OFF, Date.now(), pitch)
      }
    },
    openInstructions () {
      this.instructionsVisible = true
    },
    closeInstructions (time) {
      setTimeout(() => {
        this.instructionsVisible = false
      }, time * 1000)
    },
    getInstrumentImageName (instrument) {
      let suffix = ''

      if (this.selectedInstrument && this.selectedInstrument.name === instrument.name) {
        suffix = '_selected'
      } else if (instrument.record) {
        suffix = '_recorded'
      }

      return instrument.name + suffix
    },
    toggleInstrumentSelection (instrument) {
      if (this.selectedInstrument && this.selectedInstrument.name === instrument.name) {
        this.selectedInstrument = null
      } else {
        this.selectedInstrument = instrument
      }
    },
    clearRecord (instrument) {
      instrument.record = null
    },
    record () {
      this.selectedInstrument.record = { previousTime: Date.now(), data: [] }
      this.recording = true
    },
    stop () {
      this.recording = false
    },
    play () {
      let channel = this.selectedInstrument.channel
      let data = this.selectedInstrument.record.data

      let currentTime = 0

      for (let i = 0; i < data.length; i++) {
        let note = data[i]
        currentTime += note.elapsedTime

        setTimeout(() => {
          switch (note.event) {
            case this.NOTE_ON:
              this.noteOn(channel, note.pitch)
              break
            case this.NOTE_OFF:
              this.noteOff(channel, note.pitch)
              break
          }
        }, currentTime)
      }
    },
    save () {
      axios.post('/midi', this.selectedInstrument.record)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    },
    recordNote (event, currentTime, pitch) {
      let record = this.selectedInstrument.record
      record.data.push({
        event: event,
        elapsedTime: currentTime - record.previousTime,
        pitch: pitch
      })
      record.previousTime = currentTime
    }
  },
  components: {
    instructions: Instructions
  }
}
</script>
