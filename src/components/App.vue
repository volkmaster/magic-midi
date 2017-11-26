<style lang="less">
@import '../main';
</style>

<style lang="less" scoped>
@import (reference) '../main';

.app {
  min-height: 100vh;
  background-color: @gray;
}

.app__header {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.app__logo {
  width: 25vw;

}

.app__svg {
  margin-left: 10vw;
  padding: 1px;
}

.app__keyboard {
  fill: @white;
  stroke: @black;
  stroke-width: 1px;
}

.app__key--white {
  fill: @white;
  stroke: @black;
  stroke-width: 1px;
}

.app__key--black {
  fill: @black;
}
</style>

<template>
  <div class="app">
    <div class="app__header">
      <img class="app__logo" src="/assets/images/logo.png"/>
    </div>
    <svg class="app__svg" width="80vw" height="20vw" viewBox="0 0 100 25" preserveAspectRatio="xMidYMid meet">
      <rect class="app__keyboard" x="0%" y="0%" width="100%" height="100%"></rect>
      <rect class="app__key--white" :x="(100 / nWhite * index) + '%'" y="0%" :width="(100 / nWhite) + '%'" height="100%" v-for="(key, index) in whiteKeys" @click="keyPressed(key)"></rect>
      <rect class="app__key--black" :x="(100 / nWhite * (0.75 + index)) + '%'" y="0%" :width="(100 / nWhite * 0.5) + '%'" height="50%" v-for="(key, index) in blackKeys" v-if="key.pitch !== -1" @click="keyPressed(key)"></rect>
    </svg>
    <instructions></instructions>
  </div>
</template>

<script>
import Instructions from './Instructions.vue'

export default {
  data () {
    return {
      whiteKeys: [
        { pitch: 60 },
        { pitch: 62 },
        { pitch: 64 },
        { pitch: 65 },
        { pitch: 67 },
        { pitch: 69 },
        { pitch: 71 },
        { pitch: 72 },
        { pitch: 74 },
        { pitch: 76 },
        { pitch: 77 },
        { pitch: 79 },
        { pitch: 81 },
        { pitch: 83 }
      ],
      blackKeys: [
        { pitch: 61 },
        { pitch: 63 },
        { pitch: -1 },
        { pitch: 66 },
        { pitch: 68 },
        { pitch: 70 },
        { pitch: -1 },
        { pitch: 73 },
        { pitch: 75 },
        { pitch: -1 },
        { pitch: 78 },
        { pitch: 80 },
        { pitch: 82 }
      ]
    }
  },
  computed: {
    nWhite () {
      return this.whiteKeys.length
    },
    nBlack () {
      return this.blackKeys.length
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    keyPressed (key) {
      console.log(key.pitch)
    }
  },
  components: {
    instructions: Instructions
  }
}
</script>
