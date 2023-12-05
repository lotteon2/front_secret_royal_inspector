<template>
  <div class="user-detail-order">
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
export default {
  components: { CustomTable },
  data() {
    return {
      items: [
        {
          ordersId: 11,
          productId: '280a8a4d-a27f-4d01-b031-2a003cc4c039'.slice(0, 6),
          productName: '복순도가',
          productCount: 3,
          productTotalAmount: 90000,
          orderDate: '2023-11-20T11:22:11',
          paymentType: 'NAVER',
          orderStatus: 'ORDER',
          isAuction: false
        },
        {
          ordersId: 12,
          productId: '280a8a4d-a27f-4d01-b031-2a003cc4c038'.slice(0, 6),
          productName: '진도 복순도가',
          productCount: 3,
          productTotalAmount: 90000,
          orderDate: '2023-11-21T11:22:11',
          paymentType: 'KAKAO',
          orderStatus: 'SHIPPING',
          isAuction: false
        }
      ],
      header: [
        { text: '주문번호', value: 'ordersId' },
        { text: '상품 번호', value: 'productId' },
        { text: '상품', value: 'productName' },
        { text: '구매 개수', value: 'productCount' },
        { text: '총 구매 금액', value: 'productTotalAmount' },
        { text: '주문시간', value: 'orderDate' },
        { text: '결제수단', value: 'paymentType' },
        { text: '배송 상태', value: 'orderStatus' },
        { text: '경매 여부', value: 'isAuction' }
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
