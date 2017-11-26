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
  created () {},
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
