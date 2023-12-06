<template>
  <div class="user-detail-order"></div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
import { useToast } from 'vue-toastification'

export default {
  components: {
    CustomTable
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '총 판매량', value: 'totalSalesCount' },
        { text: '개당 가격', value: 'productPrice' },
        { text: '재고', value: 'stockQuantity' },
        { text: '리뷰 수', value: 'reviewCount' },
        { text: '쇼츠', value: 'shortsId' },
        { text: '공개여부', value: 'isActivate' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.user-detail-order {
  width: 100%;
}
</style>
