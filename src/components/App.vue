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

.app__loader {
  position  : absolute;
  top       : 50%;
  left      : 50%;
  transform : translate(-50%, -50%);
  width     : 100px;
  height    : 100px;
}

.app__navigation {
  position       : absolute;
  right          : 0;
  top            : 0;
  padding        : 10px;
  display        : flex;
  flex-direction : column;
  animation      : fade-in 1s linear 0s forwards;

  @keyframes fade-in {
    from { opacity : 0; }
    to   { opacity : 1; }
  }
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

.app__content {
  animation: fade-in 1s linear 0s forwards;

  @keyframes fade-in {
    from { opacity : 0; }
    to   { opacity : 1; }
  }
}

.app__content--blur, .app__navigation--blur {
  filter         : blur(3px);
  pointer-events : none;
}

.app__header {
  padding-top         : 20px;
  display             : flex;
  justify-content     : center;
  align-items         : center;
  -webkit-user-select : none;
}

.app__logo { height: 12vw; }

.app__svg {
  width   : 60vw;
  height  : 15vw;
  margin  : 0 20vw;
  padding : 1px;
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
  width           : 100%;
  height          : 150px;
  margin          : 20px 0;
  display         : flex;
  justify-content : center;
}

.app__instrument {
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
  align-items     : center;
}

.app__img { cursor: pointer; }

.app__img--disabled { cursor: not-allowed; }

.app__img--instrument {
  width         : 100px;
  height        : 100px;
  margin        : 0 10px 10px 10px;
  border        : 4px solid transparent;
  border-radius : 15px;
  object-fit    : contain;

  &:hover:not(.app__img--disabled)                          { border-color : @silver;        }
  &.app__img--instrument--selected                          { border-color : @dark-orange;   }
  &.app__img--instrument--recorded:not(.app__img--disabled) { border-color : @success-green; }
}

.app__instrument-controls { display: flex; }

.app__img--checkbox {
  width             : 25px;
  height            : 25px;
  margin-right      : 10px;
  padding           : 4px;
  border            : 1px solid @very-light-gray;
  border-radius     : 5px;
  background-origin : content-box;
  background-repeat : no-repeat;
  background-size   : contain;

  &:hover:not(.app__img--disabled) { background-color: @dark-gray; }

  &.app__img--checkbox--checked { background-image: url('/assets/images/check.svg'); }
}

.app__img--delete {
  width             : 25px;
  height            : 25px;
  padding           : 5px;
  border            : 1px solid @very-light-gray;
  border-radius     : 5px;
  background-image  : url('/assets/images/delete.svg');
  background-origin : content-box;
  background-repeat : no-repeat;
  background-size   : contain;

  &:hover:not(.app__img--disabled) { background-color: @dark-gray; }
}

.app__buttons {
  display         : flex;
  justify-content : center;
}

.app__button {
  width         : 100px;
  padding       : 10px;
  border-width  : 2px;
  border-style  : solid;
  border-radius : 5px;
  font-family   : @magic-midi-font;
  font-size     : 30px;
  cursor        : pointer;
  transition    : background-color 0.1s linear, color 0.1s linear;

  &:disabled {
    border-color     : @very-light-gray;
    background-color : @very-light-gray;
    color            : @gray;
    cursor           : not-allowed;
  }
}

.app__button_record {
  border-color     : @orange;
  background-color : @orange;

  &:hover:not([disabled]) {
    border-color     : @dark-orange;
    background-color : @dark-orange;
  }
}

.app__button_stop {
  border-color     : @red;
  background-color : @red;

  &:hover:not([disabled]) {
    border-color     : @dark-red;
    background-color : @dark-red;
  }
}

.app__button_play {
  margin           : 0 20px;
  border-color     : @yellow;
  background-color : @yellow;
  color            : @gray;

  &:hover:not([disabled]) {
    border-color     : @dark-yellow;
    background-color : @dark-yellow;
  }
}

.app__button_save {
  border-color     : @yellow;
  background-color : @yellow;
  color            : @gray;

  &:hover:not([disabled]) {
    border-color     : @dark-yellow;
    background-color : @dark-yellow;
  }
}
</style>

<template>
  <div class="app">

    <!-- Loader -->
    <img class="app__loader" src="/assets/images/loader.svg" v-if="loading"/>

    <!-- Content -->
    <div class="app__content" :class="{ 'app__content--blur': instructionsVisible }" v-else>

      <!-- Logo -->
      <div class="app__header">
        <img class="app__logo" src="/assets/images/logo.png"/>
      </div>

      <!-- Keyboard -->
      <svg class="app__svg" viewBox="0 0 100 25" preserveAspectRatio="xMidYMid meet">
        <rect class="app__key app__key--white" :class="{ 'app__key--pressed': key.pressed }" :x="(100 / nKeys * index) + '%'" y="0%" :width="(100 / nKeys) + '%'" height="100%" v-for="(key, index) in keys.white" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <rect class="app__key app__key--black" :class="{ 'app__key--pressed': key.pressed }" :x="(100 / nKeys * (0.75 + index)) + '%'" y="0%" :width="(100 / nKeys * 0.5) + '%'" height="50%" v-for="(key, index) in keys.black" v-if="key.pitch !== -1" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <g v-show="helperTextVisible">
          <text class="app__key-text app__key-text--white" :x="(100 / nKeys * (0.27 + index)) + '%'" y="90%" v-for="(key, index) in keys.white">{{ key.name }}</text>
          <text class="app__key-text app__key-text--black" :x="(100 / nKeys * (0.88 + index)) + '%'" y="20%" v-for="(key, index) in keys.black" v-if="keys.pitch !== -1">{{ key.name }}</text>
        </g>
        <rect class="app__keyboard" x="0%" y="0%" width="100%" height="100%"></rect>
      </svg>

      <!-- Instruments -->
      <div class="app__instruments">
        <div class="app__instrument" v-for="instrument in instruments">
          <img class="app__img app__img--instrument" :class="{ 'app__img--disabled': recording || playing || saving, 'app__img--instrument--selected': instrument.name === selectedInstrument.name, 'app__img--instrument--recorded': instrument.name !== selectedInstrument.name && instrument.record !== null }" :src="'/assets/images/' + instrument.name + '.svg'" @click="selectInstrument(instrument)"/>
          <div class="app__instrument-controls" v-if="instrument.record">
            <div class="app__img app__img--checkbox" :class="{ 'app__img--disabled': recording || playing || saving, 'app__img--checkbox--checked': instrument.checked }" @click="checkInstrument(instrument)"></div>
            <div class="app__img app__img--delete" :class="{ 'app__img--disabled': recording || playing || saving }" @click="clearRecord(instrument)"></div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="app__buttons">
        <button class="app__button app__button_record" @click="startRecording" v-if="!recording" :disabled="saving || selectedInstrument.record">Record</button>
        <button class="app__button app__button_stop" @click="stopRecording" v-else>Stop</button>
        <button class="app__button app__button_play" @click="startPlaying" v-if="!playing" :disabled="saving || !hasCheckedInstruments">Play</button>
        <button class="app__button app__button_play" @click="stopPlaying" v-else>Stop</button>
        <button class="app__button app__button_save" @click="save" :disabled="recording || playing || !hasCheckedInstruments">Save</button>
      </div>

    </div>

    <!-- Navigation -->
    <div class="app__navigation" :class="{ 'app__navigation--blur': instructionsVisible }" v-show="!loading">
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
      loading: true,
      loadingDelay: 2000,
      instructionsVisible: false,
      helperTextVisible: false,
      keys: {
        white: [
          { pitch: 60, code: 81, name: 'Q', pressed: false },
          { pitch: 62, code: 87, name: 'W', pressed: false },
          { pitch: 64, code: 69, name: 'E', pressed: false },
          { pitch: 65, code: 82, name: 'R', pressed: false },
          { pitch: 67, code: 84, name: 'T', pressed: false },
          { pitch: 69, code: 89, name: 'Y', pressed: false },
          { pitch: 71, code: 85, name: 'U', pressed: false },
          { pitch: 72, code: 90, name: 'Z', pressed: false },
          { pitch: 74, code: 88, name: 'X', pressed: false },
          { pitch: 76, code: 67, name: 'C', pressed: false },
          { pitch: 77, code: 86, name: 'V', pressed: false },
          { pitch: 79, code: 66, name: 'B', pressed: false },
          { pitch: 81, code: 78, name: 'N', pressed: false },
          { pitch: 83, code: 77, name: 'M', pressed: false }
        ],
        black: [
          { pitch: 61, code: 50, name: '2', pressed: false },
          { pitch: 63, code: 51, name: '3', pressed: false },
          { pitch: -1, code: -1 },
          { pitch: 66, code: 53, name: '5', pressed: false },
          { pitch: 68, code: 54, name: '6', pressed: false },
          { pitch: 70, code: 55, name: '7', pressed: false },
          { pitch: -1, code: -1 },
          { pitch: 73, code: 83, name: 'S', pressed: false },
          { pitch: 75, code: 68, name: 'D', pressed: false },
          { pitch: -1, code: -1 },
          { pitch: 78, code: 71, name: 'G', pressed: false },
          { pitch: 80, code: 72, name: 'H', pressed: false },
          { pitch: 82, code: 74, name: 'J', pressed: false }
        ]
      },
      instruments: [
        { channel: 0, name: 'piano', soundfont: 'acoustic_grand_piano', program: MIDI.GM.byName['acoustic_grand_piano'].number, record: null, checked: false },
        { channel: 1, name: 'trumpet', soundfont: 'trumpet', program: MIDI.GM.byName['trumpet'].number, record: null, checked: false },
        { channel: 2, name: 'clarinet', soundfont: 'clarinet', program: MIDI.GM.byName['clarinet'].number, record: null, checked: false },
        { channel: 3, name: 'guitar', soundfont: 'acoustic_guitar_nylon', program: MIDI.GM.byName['acoustic_guitar_nylon'].number, record: null, checked: false },
        { channel: 4, name: 'violin', soundfont: 'violin', program: MIDI.GM.byName['violin'].number, record: null, checked: false },
        { channel: 5, name: 'saxophone', soundfont: 'soprano_sax', program: MIDI.GM.byName['soprano_sax'].number, record: null, checked: false }
      ],
      INSTRUMENT_VOLUME: 127,
      NOTE_ON: 0,
      NOTE_OFF: 1,
      NOTE_VELOCITY: 64,
      NOTE_DELAY: 0,
      activeChannelKeys: {},
      selectedInstrument: null,
      noteTimeoutIds: [],
      playingTimeoutId: -1,
      recording: false,
      playing: false,
      saving: false
    }
  },
  computed: {
    nKeys () {
      return this.keys.white.length
    },
    totalDuration () {
      return Math.max(
        ...this.instruments
          .filter(instrument => instrument.checked)
          .map(instrument => instrument.record.duration)
      )
    },
    hasCheckedInstruments () {
      return this.instruments.filter(instrument => instrument.checked).length > 0
    }
  },
  created () {
    this.setupMIDIPlugin()
    this.setupChannelKeys()
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
      const startTime = Date.now()

      MIDI.loadPlugin({
        soundfontUrl: '/assets/soundfonts/',
        instruments: this.instruments.map(instrument => instrument.soundfont),
        onsuccess: () => {
          for (const instrument of this.instruments) {
            MIDI.setVolume(instrument.channel, this.INSTRUMENT_VOLUME)
            MIDI.programChange(instrument.channel, instrument.program)
          }
          setTimeout(() => {
            this.loading = false
          }, this.loadingDelay - (Date.now() - startTime))
        }
      })
    },
    setupChannelKeys () {
      const channels = {}
      for (const instrument of this.instruments) {
        channels[instrument.channel] = false
      }

      const keys = [].concat(this.keys.black, this.keys.white)
      for (const key of keys) {
        if (key.pitch !== -1) {
          this.activeChannelKeys[key.pitch] = Object.assign({}, channels)
        }
      }
    },
    getKey (keyCode) {
      const keys = [
        ...this.keys.white.filter(key => key.code === keyCode),
        ...this.keys.black.filter(key => key.code === keyCode)
      ]
      return keys.length > 0 ? keys[0] : null
    },
    isKeyOn (key) {
      const pitch = key.pitch
      const channel = this.selectedInstrument.channel
      return this.activeChannelKeys[pitch][channel]
    },
    setKeyState (key, state) {
      const pitch = key.pitch
      const channel = this.selectedInstrument.channel
      this.activeChannelKeys[pitch][channel] = state
      key.pressed = state
    },
    mousedown (key) {
      this.setKeyState(key, true)
      const pitch = key.pitch
      const channel = this.selectedInstrument.channel
      this.noteOn(channel, pitch)
      if (this.recording) {
        this.recordNote(channel, this.NOTE_ON, Date.now(), pitch)
      }
    },
    mouseup (key) {
      this.setKeyState(key, false)
      const pitch = key.pitch
      const channel = this.selectedInstrument.channel
      this.noteOff(channel, pitch)
      if (this.recording) {
        this.recordNote(channel, this.NOTE_OFF, Date.now(), pitch)
      }
    },
    keydown (event) {
      const key = this.getKey(event.keyCode)
      if (key && !this.isKeyOn(key)) {
        this.setKeyState(key, true)
        const pitch = key.pitch
        const channel = this.selectedInstrument.channel
        this.noteOn(channel, pitch)
        if (this.recording) {
          this.recordNote(channel, this.NOTE_ON, Date.now(), pitch)
        }
      }
    },
    keyup (event) {
      const key = this.getKey(event.keyCode)
      if (key && this.isKeyOn(key)) {
        this.setKeyState(key, false)
        const pitch = key.pitch
        const channel = this.selectedInstrument.channel
        this.noteOff(channel, pitch)
        if (this.recording) {
          this.recordNote(channel, this.NOTE_OFF, Date.now(), pitch)
        }
      }
    },
    noteOn (channel, pitch) {
      // channel id, note number, velocity, delay
      MIDI.noteOn(channel, pitch, this.NOTE_VELOCITY, this.NOTE_DELAY)
    },
    noteOff (channel, pitch) {
      // channel id, note number, delay
      MIDI.noteOff(channel, pitch, this.NOTE_DELAY)
    },
    recordNote (channel, event, currentTime, pitch) {
      const record = this.selectedInstrument.record

      record.notes.push({
        channel: channel,
        event: event,
        time: currentTime - record.startTime,
        pitch: pitch
      })
    },
    selectInstrument (instrument) {
      if (!this.recording && !this.playing && !this.saving && this.selectedInstrument.name !== instrument.name) {
        this.selectedInstrument = instrument
      }
    },
    checkInstrument (instrument) {
      if (!this.recording && !this.playing && !this.saving) {
        instrument.checked = !instrument.checked
      }
    },
    clearRecord (instrument) {
      if (!this.recording && !this.playing && !this.saving) {
        instrument.record = null
        instrument.checked = false
      }
    },
    startRecording () {
      this.selectedInstrument.record = {
        startTime: Date.now(),
        duration: 0,
        notes: []
      }
      if (this.hasCheckedInstruments) {
        this.startPlaying()
      }
      this.recording = true
    },
    stopRecording () {
      const record = this.selectedInstrument.record
      record.duration = Date.now() - record.startTime
      this.selectedInstrument.checked = true
      this.recording = false
      if (this.playing) {
        this.stopPlaying()
      }
    },
    startPlaying () {
      this.playing = true
      this.noteTimeoutIds = []

      const notes = this.joinNotes()

      for (const note of notes) {
        const timeoutId = setTimeout(() => {
          switch (note.event) {
            case this.NOTE_ON:
              this.noteOn(note.channel, note.pitch)
              break
            case this.NOTE_OFF:
              this.noteOff(note.channel, note.pitch)
              break
          }
        }, note.time)
        this.noteTimeoutIds.push(timeoutId)
      }

      this.playingTimeoutId = setTimeout(() => {
        this.playing = false
      }, this.totalDuration)
    },
    stopPlaying () {
      for (const timeoutId of this.noteTimeoutIds) {
        clearTimeout(timeoutId)
      }
      clearTimeout(this.playingTimeoutId)
      this.playing = false
    },
    save () {
      this.saving = true

      const data = {
        parameters: {
          NOTE_ON: this.NOTE_ON,
          NOTE_OFF: this.NOTE_OFF,
          NOTE_VELOCITY: this.NOTE_VELOCITY
        },
        programs: this.instruments.map(instrument => { return { channel: instrument.channel, program: instrument.program } }),
        notes: _.sortBy(this.joinNotes(), note => note.time)
      }

      axios.post('/api/midi', data)
        .then(response => {
          const id = response.data.id
          axios.get('/api/midi/' + id, { responseType: 'arraybuffer' })
            .then(response => {
              this.downloadFile(id + '.mid', response.data, response.headers['content-type'])
              this.saving = false
            })
            .catch(error => {
              this.saving = false
              console.log(error)
            })
        })
        .catch(error => {
          this.saving = false
          console.log(error)
        })
    },
    downloadFile (filename, data, type) {
      const blob = new Blob([data], { type: type })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(url)
    },
    joinNotes () {
      return [].concat(...this.instruments.filter(instrument => instrument.checked).map(instrument => instrument.record.notes))
    },
    openInstructions () {
      this.instructionsVisible = true
    },
    closeInstructions (time) {
      setTimeout(() => {
        this.instructionsVisible = false
      }, time * 1000)
    }
  },
  components: {
    instructions: Instructions
  }
}
</script>
