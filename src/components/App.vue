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

.app__content {}

.app__content--blur { filter: blur(3px); }

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
  height  : calc(~'100vh - 30vw');
  padding : 20px 10vw 10px 10vw;
}

.app__instruments-element {
  display         : flex;
  justify-content : space-between;
  align-items     : center;
}

.app__instruments-img-div {
  width           : calc(~'(100vh - 30vw - 30px) / 4 * 1.2');;
  height          : calc(~'(100vh - 30vw - 30px) / 4');;
  display         : flex;
  justify-content : center;
}

.app__instruments-img {
  max-width  : calc(~'(100vh - 30vw - 30px) / 4 * 1.2');;
  max-height : calc(~'(100vh - 30vw - 30px) / 4');;
  object-fit : contain;
}

.app__instruments-checkbox-div {}

.app__instruments-checkbox {}
</style>

<template>
  <div class="app">
    <div class="app__content" :class="{ 'app__content--blur': instructionsVisible }">
      <div class="app__header">
        <img class="app__logo" src="/assets/images/logo.png"/>
      </div>
      <svg class="app__svg" width="60vw" height="15vw" viewBox="0 0 100 25" preserveAspectRatio="xMidYMid meet">
        <rect class="app__key app__key--white" :class="{ 'app__key--pressed': key.on }" :x="(100 / nKeys * index) + '%'" y="0%" :width="(100 / nKeys) + '%'" height="100%" v-for="(key, index) in keys.white" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <rect class="app__key app__key--black" :class="{ 'app__key--pressed': key.on }" :x="(100 / nKeys * (0.75 + index)) + '%'" y="0%" :width="(100 / nKeys * 0.5) + '%'" height="50%" v-for="(key, index) in keys.black" v-if="key.pitch !== -1" @mousedown="mousedown(key)" @mouseup="mouseup(key)"></rect>
        <g v-show="helperTextVisible">
          <text class="app__key-text app__key-text--white" :x="(100 / nKeys * (0.27 + index)) + '%'" y="90%" v-for="(key, index) in keys.white">{{ key.name }}</text>
          <text class="app__key-text app__key-text--black" :x="(100 / nKeys * (0.88 + index)) + '%'" y="20%" v-for="(key, index) in keys.black" v-if="keys.pitch !== -1">{{ key.name }}</text>
        </g>
        <rect class="app__keyboard" x="0%" y="0%" width="100%" height="100%"></rect>
      </svg>
      <div class="app__instruments">
        <div class="app__instruments-element" v-for="instrument in instruments">
          <div class="app__instruments-img-div">
            <img class="app__instruments-img" :src="'/assets/images/' + instrument.name + '.png'"/>
          </div>
          <div class="app__instruments-checkbox-div">
            <input class="app__instruments-checkbox" type="checkbox" :name="instrument.name">
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute; right: 0; top: 0; display: flex; flex-direction: column;">
      <button @click="helperTextVisible = instructionsVisible ? helperTextVisible : !helperTextVisible">TOGGLE HELPER TEXT</button>
      <button @click="openInstructions">SHOW INSTRUCTIONS</button>
    </div>
    <instructions
      v-if="instructionsVisible"
      @close="closeInstructions">
    </instructions>
  </div>
</template>

<script>
import Instructions from './Instructions.vue'

export default {
  data () {
    return {
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
        { name: 'piano' },
        { name: 'trumpet' },
        { name: 'guitar' },
        { name: 'violin' }
      ],
      helperTextVisible: false,
      instructionsVisible: false
    }
  },
  computed: {
    nKeys () {
      return this.keys.white.length
    }
  },
  created () {
    this.setupMIDIPlugin()
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
        soundfontUrl: "/assets/soundfonts/",
        instrument: "acoustic_grand_piano",
        onsuccess: () => {
          MIDI.setVolume(0, 127)
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
      key.on = true
      this.noteOn(key.pitch)
    },
    mouseup (key) {
      key.on = false
      this.noteOff(key.pitch)
    },
    keydown (event) {
      let key = this.getKey(event.keyCode)
      if (key && !key.on) {
        key.on = true
        this.noteOn(key.pitch)
      }
    },
    keyup (event) {
      let key = this.getKey(event.keyCode)
      if (key) {
        key.on = false
        this.noteOff(key.pitch)
      }
    },
    noteOn (pitch) {
      // channel id, note number, velocity, delay
      MIDI.noteOn(0, pitch, 127, 0)
    },
    noteOff (pitch) {
      // channel id, note number, delay
      MIDI.noteOff(0, pitch, 0.75)
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
