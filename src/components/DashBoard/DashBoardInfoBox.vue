<template>
  <div class="DashBoardInfoBox">
    <div>{{ state }}</div>
    <div>{{ count }}</div>
  </div>
</template>

<script lang="ts" scoped>
export default {
  name: 'CustomButton',
  props: {
    state: { type: String, default: '확인' },
    count: { type: Number, default: 0 }
  }
}
</script>

<style lang="scss" scoped>
.DashBoardInfoBox {
  border-radius: 12px;
  box-shadow: 3px 3px 1px 1px #c0c0c0;
  padding: 1rem;
}
</style>
