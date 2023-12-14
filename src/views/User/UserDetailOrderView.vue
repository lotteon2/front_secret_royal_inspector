<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts" scoped>
import CustomTable from '@/components/common/CustomTable.vue'
import { getOrderListByConsumerId } from '@/api/order/orderAPIService.ts'
import { useToast } from 'vue-toastification'
import type { GetOrderListByConsumerIdResponseData } from '@/api/order/orderAPIService.types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CustomTable
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '판매량', value: 'productCount' },
        { text: '총 가격', value: 'productTotalAmount' },
        { text: '주문 날짜', value: 'orderDate' },
        { text: '결제 수단', value: 'paymentType' },
        { text: '배송 상태', value: 'orderStatus' },
        { text: '경매 여부', value: 'isAuction' }
      ],
      items: []
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetOrderListByConsumerIdResponseData[]
    }
  },
  methods: {
    async getOrderListByConsumerId(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getOrderListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          toast.success(`고객의 주문내역들을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          this.items = data.data.content
        }
      } catch (error) {
        toast.error(`주모 주문내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getOrderListByConsumerId(0, 10)
  }
})
</script>

<style lang="scss" scoped>
.user-detail-order {
  width: 100%;
}
</style>
