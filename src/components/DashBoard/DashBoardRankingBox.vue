<template>
  <div class="DashBoardInfoBox">
    <div>{{ name }}</div>
    <div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
// import type { MonthSellerRank, MonthProductRank } from '@/api/order/orderAPIService.types'
export default {
  props: {
    name: { type: String, default: '확인' },
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
