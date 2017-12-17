<style lang="less" scoped>
@import (reference) '../main';

.instructions {
  position         : absolute;
  top              : 0;
  //width            : 20vw;
  width: 30vw;
  height           : 100vh;
  padding: 10px;
  background-color : @dark-gray;
  font-family: 'SF UI Display Regular';
  color: @very-light-gray;
}

.instructions--open {
  animation           : open 0.2s ease-out 0s;
  animation-fill-mode : forwards;

  @keyframes open {
    from { left : -20vw; }
    to   { left : 0;     }
  }
}

.instructions__header-wrapper {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.instructions__close-img{
  width: 25px;
  heigth: auto;

  &:hover {
    cursor: pointer;
  }
}

.instructions-title {
  font-family : 'Grand Hotel';
  color: @yellow;
  font-size: 40px;
}

.instructions--close {
  animation: close 0.2s ease-out 0s;

  @keyframes close {
    from { left : 0vw;   }
    to   { left : -20vw; }
  }
}

.instuctions__content {

}

.instructions__content--magic-midi {
  margin-right: 10px;
  font-family: 'Grand Hotel';
  color: @yellow;
  font-size: 20px;
}

.instructions__content--keyboard {
  padding: 0 5px;
  font-size: 20px;
  background-color: @very-light-gray;
  color: @dark-gray;
  border-radius: 5px;
  font-family: 'Grand Hotel';
}

.instructions__content--record {
  padding: 0 5px;
  font-size: 20px;
  background-color: @orange;
  color: @dark-gray;
  border-radius: 5px;
  font-family: 'Grand Hotel';
}

.instructions__content--stop {
  padding: 0 5px;
  font-size: 20px;
  background-color: @red;
  color: @dark-gray;
  border-radius: 5px;
  font-family: 'Grand Hotel';
}

.instructions__content--play {
  padding: 0 5px;
  font-size: 20px;
  background-color: @yellow;
  color: @dark-gray;
  border-radius: 5px;
  font-family: 'Grand Hotel';
}

.instructions__content--save {
  padding: 0 5px;
  font-size: 20px;
  background-color: @yellow;
  color: @dark-gray;
  border-radius: 5px;
  font-family: 'Grand Hotel';
}

.instructions__delete-img {
  width: 18px;
  height: auto;
  padding: 4px;
  border: 1px solid @very-light-gray;
  border-radius: 5px;
}

</style>

<template>
  <div class="instructions" :class="{ 'instructions--open': open, 'instructions--close': !open }">
    <div class="instructions__header-wrapper">
      <div class="instructions-title">
        Instructions
      </div>
      <img class="instructions__close-img" src="/assets/images/close.svg" @click="close">
    </div>
    <div class="instuctions__content">
      <p>
        <span class="instructions__content--magic-midi">
        Magic Midi
        </span>
        is an app for recording and playing music.
      </p>
        You can play the music by clicking the keys on the piano keyboard or by using the letters on the computer keyboard. For displaying the associated letters click <span class="instructions__content--keyboard">Keyboard</span> .
      <p>
      <p>
        For choosing an instrument click on the instrument icon. The selected instrument is marked with an orange border. You can have one recording for each instrument. The recording can be deleted by clicking
          <span>
            <img class="instructions__delete-img" :src="'/assets/images/delete-gray.svg'"/>
          </span> .
      </p>
      <p>
        You can record melody by clicking <span class="instructions__content--record">Record</span> . Click <span class="instructions__content--stop">Stop</span> to stop recording.
      </p>
      <p>
        For playing the recordings select the ones you want to play by clicking the checkbox under the instrument icon and click <span class="instructions__content--play">Play</span> . You can also play the previously recorded melodies and record a new one at the same time.
      </p>
      <p>
        For downloading select the recordings of deifferent instruments that you want to include in the downloaded recording by selecting the checkbox under the instrument and click <span class="instructions__content--save">Save</span> .
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
