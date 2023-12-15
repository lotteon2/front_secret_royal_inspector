<template>
  <div>
    <label for="a">전체</label>
    <select id="a">
      <option value="javascript">a 주모</option>
    </select>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts" scoped>
import { getOrderListBySellerId } from '@/api/order/orderAPIService'
import type { GetOrderListBySellerIdResponseData } from '@/api/order/orderAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
export default defineComponent({
  components: {
    CustomTable
  },
  methods: {
    async getOrderListBySellerId(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getOrderListBySellerId(this.sellerId, page, size)
        if (data.code === 200) {
          toast.success(`주문내역을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          const newItems = data.data.content
          newItems.forEach(
            (it: GetOrderListBySellerIdResponseData, idx: number) =>
              (newItems[idx] = { ...newItems[idx], sellerName: 'a주모' })
          )
          this.items = newItems
        }
      } catch (error) {
        toast.error(`주문내역을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  data() {
    return {
      sellerId: -1,
      header: [
        { text: '주모 이름', value: 'sellerName' },
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
      sellerId: number
      header: { text: string; value: string }[]
      items: GetOrderListBySellerIdResponseData[]
    }
  },
  mounted() {
    this.getOrderListBySellerId(0, 10)
  }
})
</script>

<style lang="scss" scoped></style>
