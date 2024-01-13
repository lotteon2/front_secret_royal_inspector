<template>
  <div v-if="items.length > 0">
    <CustomTable :headers="header" :items="items"></CustomTable>
    <CustomPagination
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
    <div v-if="isLoading">
      <img src="../../assets/loading.gif" alt="loading" />
    </div>
  </div>
  <div v-else>
    유저의 주문 내역이 비어있어요.
  </div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import { getOrderListByConsumerId } from '@/api/order/orderAPIService.ts'
import { useToast } from 'vue-toastification'
import type { GetOrderListByConsumerIdResponseData } from '@/api/order/orderAPIService.types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CustomTable,
    CustomPagination
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
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetOrderListByConsumerIdResponseData[]
      page: number
      totalPages: number
      requestPage: number
      isLoading: boolean
    }
  },
  methods: {
    async onChangePage(page: number) {
      if (0 <= page && page < this.totalPages) {
        this.requestPage = page
      }
    },
    async getOrderListByConsumerId(page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getOrderListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          this.items = data.data.content
          this.totalPages = data.data.totalPages
        }
      } catch (error) {
        toast.error(`고객의 주문내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getOrderListByConsumerId(0, 6)
  },
  watch: {
    requestPage: function (value) {
      this.getOrderListByConsumerId(value, 6)
    }
  }
})
</script>

<style lang="scss" scoped>
.user-detail-order {
  width: 100%;
}
</style>
