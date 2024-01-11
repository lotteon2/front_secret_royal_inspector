<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/common/CustomTable.vue'
import { getOrderListBySellerId } from '@/api/order/orderAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  components: {
    CustomTable
  },
  methods: {
    async getOrderListBySellerId(page, size) {
      const toast = useToast()
      try {
        const data = await getOrderListBySellerId(this.sellerId, page, size)
        if (data.code === 200) {
          this.items = data.data.content
        }
      } catch (error) {
        toast.error(`주모 주문내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  data() {
    return {
      sellerId: -1,
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '판매량', value: 'productCount' },
        { text: '총 가격', value: 'productTotalAmount' },
        { text: '주문 날짜', value: 'orderDate' },
        { text: '결제 수단', value: 'paymentType' },
        { text: '배송 상태', value: 'orderStatus' },
        { text: '운송장', value: 'deliveryCode' },
        { text: '경매 여부', value: 'isAuction' }
      ],
      items: []
    }
  },
  mounted() {
    this.sellerId = this.$route.params.sellerId
    this.getOrderListBySellerId(0, 10)
  }
}
</script>

<style lang="scss" scoped></style>
