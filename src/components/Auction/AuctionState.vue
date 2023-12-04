<template>
  <div>{{ translateState }}</div>
</template>

<script>
export default {
  name: 'AuctionState',
  props: {
    state: {
      type: String,
      default: '진행 중'
    }
  },
  computed: {
    translateState() {
      let translatedState = ''
      switch (this.state) {
        case 'BEFORE':
          translatedState = '진행 예정'
          break
        case 'ING':
          translatedState = '진행 중'
          break
        case 'AFTER':
          translatedState = '진행 완료'
          break
        default:
          translatedState = '진행 완료'
          break
      }
      return translatedState
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  background-color: white;
  border-radius: 8px;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  width: 6rem;
  margin-bottom: 0.3rem;
}
</style>
