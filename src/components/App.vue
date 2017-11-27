<style lang="less">
@import '../main';
</style>

<style lang="less" scoped>
@import (reference) '../main';

.keyboard {
    background-color: green;
}
</style>

<template>
  <div>
    <svg class="keyboard" width="50vw" height="25vw" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
        <rect x="25%" y="25%" width="50%" height="50%"></rect>
    </svg>
    <instructions></instructions>
  </div>
</template>

<script>
import Instructions from './Instructions.vue'

export default {
  data () {
    return {}
  },
  created () {
    MIDI.loadPlugin({
        soundfontUrl: "/assets/soundfonts/",
        instrument: "acoustic_grand_piano",
        onprogress: (state, progress) => console.log(state, progress),
        onsuccess: function() {
            var delay = 0       // play one note every quarter second
            var note = 50
            var velocity = 127

            MIDI.setVolume(0, 127)
            MIDI.noteOn(0, note, velocity, delay)
            MIDI.noteOff(0, note, delay + 0.75)

            note = 60

            MIDI.setVolume(0, 127)
            MIDI.noteOn(0, note, velocity, delay)
            MIDI.noteOff(0, note, delay + 0.75)
        }
    })
  },
  mounted () {
    this.$nextTick(() => {})
  },
  computed: {},
  methods: {},
  components: {
    instructions: Instructions
  }
}
</script>
