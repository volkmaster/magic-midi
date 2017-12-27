<style lang="less" scoped>
@import (reference) '../main';

.instructions {
  position         : absolute;
  top              : 0;
  width            : 30vw;
  height           : 100vh;
  padding          : 10px;
  background-color : @dark-gray;
}

.instructions--open {
  animation: open 0.2s ease-out 0s forwards;

  @keyframes open {
    from { left : -30vw; }
    to   { left : 0;     }
  }
}

.instructions--close {
  animation: close 0.2s ease-out 0s;

  @keyframes close {
    from { left : 0vw;   }
    to   { left : -30vw; }
  }
}

.instructions__header {
  width           : 100%;
  margin-bottom   : 20px;
  display         : flex;
  justify-content : space-between;
  align-items     : flex-start;
}

.instructions__title {
  font-family : @magic-midi-font;
  font-size   : 40px;
  color       : @yellow;
}

.instructions__close-img {
  width  : 25px;
  heigth : auto;

  &:hover { cursor: pointer; }
}

.instructions__content {
  font-family : @regular-display-font;
  color       : @very-light-gray;
}

.instuctions__highlight {
  padding       : 0 5px;
  border-radius : 5px;
  font-family   : @magic-midi-font;
  font-size     : 20px;
  color         : @dark-gray;
}

.instuctions__highlight--magic-midi { color: @yellow; }

.instuctions__highlight--keyboard { background-color: @very-light-gray; }

.instructions__highlight--delete {
  width         : 18px;
  height        : auto;
  padding       : 4px;
  border        : 1px solid @very-light-gray;
  border-radius : 5px;
}

.instuctions__highlight--record { background-color: @orange; }

.instuctions__highlight--stop { background-color: @red; }

.instuctions__highlight--play { background-color: @yellow; }

.instuctions__highlight--save { background-color: @yellow; }

</style>

<template>
  <div class="instructions" :class="{ 'instructions--open': open, 'instructions--close': !open }">

    <!-- Header -->
    <div class="instructions__header">
      <div class="instructions__title">
        Instructions
      </div>
      <img class="instructions__close-img" src="/assets/images/close.svg" @click="close">
    </div>

    <!-- Content -->
    <div class="instructions__content">
      <p>
        <span class="instuctions__highlight instuctions__highlight--magic-midi">Magic Midi</span> is an app for recording and playing music.
      </p>
        You can play the music by clicking the keys on the piano keyboard or by using the letters on the computer keyboard. For displaying the associated letters click <span class="instuctions__highlight instuctions__highlight--keyboard">Keyboard</span> .
      <p>
      <p>
        For choosing an instrument click on the instrument icon. The selected instrument is marked with an orange border. You can have one recording for each instrument. The recording can be deleted by clicking <span><img class="instuctions__highlight instructions__highlight--delete" src="/assets/images/delete-gray.svg"/></span> .
      </p>
      <p>
        You can record melody by clicking <span class="instuctions__highlight instuctions__highlight--record">Record</span> . Click <span class="instuctions__highlight instuctions__highlight--stop">Stop</span> to stop recording.
      </p>
      <p>
        For playing the recordings select the ones you want to play by clicking the checkbox under the instrument icon and click <span class="instuctions__highlight instuctions__highlight--play">Play</span> . You can also play the previously recorded melodies and record a new one at the same time.
      </p>
      <p>
        For downloading select the recordings of deifferent instruments that you want to include in the downloaded recording by selecting the checkbox under the instrument and click <span class="instuctions__highlight instuctions__highlight--save">Save</span> .
      </p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      open: true
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    close () {
      this.open = false
      this.$emit('close', 0.2)
    }
  },
  components: {}
}
</script>
