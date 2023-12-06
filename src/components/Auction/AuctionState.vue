<template>
  <div class="auction-state">{{ this.translatedState }}</div>
</template>

<script>
export default {
  name: 'AuctionState',
  props: ['state'],
  data() {
    return {
      translatedState: ''
    }
  },
  watch: {
    state() {
      this.translateState()
    }
  },
  methods: {
    translateState() {
      console.log(this.state)
      switch (this.state) {
        case 'BEFORE':
          this.translatedState = '진행 예정'
          break
        case 'ING':
          this.translatedState = '진행 중'
          break
        case 'AFTER':
          this.translatedState = '진행 완료'
          break
        default:
          this.translatedState = '진행 완료'
          break
      }
      return '?'
    }
  },
  mounted() {
    this.translateState()
  }
}
</script>

<style lang="scss" scoped>
.auction-state {
  background-color: #94e8b4;
  color: white;
  border-radius: 8px;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  width: 6rem;
  margin-bottom: 0.3rem;
}
</style>
