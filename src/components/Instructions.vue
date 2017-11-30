<style lang="less" scoped>
@import (reference) '../main';

.instructions {
  position         : absolute;
  top              : 0;
  width            : 20vw;
  height           : 100vh;
  background-color : @white;
}

.instructions--open {
  animation           : open 0.2s ease-out 0s;
  animation-fill-mode : forwards;

  @keyframes open {
    from { left : -20vw; }
    to   { left : 0;     }
  }
}

.instructions--close {
  animation: close 0.2s ease-out 0s;

  @keyframes close {
    from { left : 0vw;   }
    to   { left : -20vw; }
  }
}
</style>

<template>
  <div class="instructions" :class="{ 'instructions--open': open, 'instructions--close': !open }">
    INSTRUCTIONS
    <button @click="close">HIDE INSTRUCTIONS</button>
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
