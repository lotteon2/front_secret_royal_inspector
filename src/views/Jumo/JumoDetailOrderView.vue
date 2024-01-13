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
  <div v-else>주모의 주문 내역이 비어있어요.</div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import { getOrderListBySellerId } from '@/api/order/orderAPIService.ts'
import { useToast } from 'vue-toastification'
import type { GetOrderListByConsumerIdResponseData } from '@/api/order/orderAPIService.types'
export default {
  components: {
    CustomTable,
    CustomPagination
  },
  methods: {
    async onChangePage(page: number) {
      if (0 <= page && page < this.totalPages) {
        this.requestPage = page
      }
    },
    async getOrderListBySellerId(page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getOrderListBySellerId(this.sellerId, page, size)
        if (data.code === 200) {
          this.items = data.data.content
          this.totalPages = data.data.totalPages
        }
      } catch (error) {
        toast.error(`주모 주문내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
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
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      sellerId: number
      header: { text: string; value: string }[]
      items: GetOrderListByConsumerIdResponseData[]
      page: number
      totalPages: number
      requestPage: number
      isLoading: boolean
    }
  },
  mounted() {
    this.sellerId = Number(this.$route.params.sellerId)
    this.getOrderListBySellerId(0, 6)
  },
  watch: {
    requestPage: function (value) {
      this.getOrderListBySellerId(value, 6)
    }
  }
}
</script>

<style lang="scss" scoped></style>
