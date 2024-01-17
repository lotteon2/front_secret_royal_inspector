<template>
  <div class="DashBoardInfoBox">
    <div class="DashBoardName">{{ state }}</div>
    <div>{{ cnt.toLocaleString() }}</div>
  </div>
</template>

<script lang="ts" scoped>
export default {
  props: {
    state: { type: String, default: '확인' },
    cnt: { type: Number, default: 0 }
  }
}
</script>

<style lang="scss" scoped>
.DashBoardInfoBox {
  border-radius: 12px;
  box-shadow: 3px 3px 1px 1px #c0c0c0;
  padding: 1rem;
  flex: 1;

  .DashBoardName {
    margin-bottom: 1rem;
  }
}
</style>
