<template>
  <div v-if="items.length > 0">
    <CustomTable :headers="header" :items="items"></CustomTable>
    <div v-if="isLoading">
      <img src="../../assets/loading.gif" alt="loading" />
    </div>
  </div>
  <div v-else>주모의 정산 내역이 비어있어요.</div>
</template>

<script lang="ts" scoped>
import CustomTable from '@/components/common/CustomTable.vue'
import { getCashUpListBySellerId } from '@/api/order/orderAPIService'
import { GetCashUpListBySellerIdResponseData } from '@/api/order/orderAPIService.types'

import { useToast } from 'vue-toastification'
export default {
  components: {
    CustomTable
  },
  methods: {
    async getCashUpListBySellerId() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getCashUpListBySellerId(this.sellerId, 2024)
        if (data.code === 200) {
          const newItems = data.data
          newItems.forEach(
            (it, idx) =>
              (newItems[idx] = {
                ...newItems[idx],
                settlementCommision: it.settlementCommision
                  ? `${it.settlementCommision.toLocaleString()}`
                  : 0,
                totalAmount: it.totalAmount ? `${it.totalAmount.toLocaleString()}` : '0',
                settlementAmount: it.settlementAmount
                  ? `${it.settlementAmount.toLocaleString()}`
                  : 0
              })
          )
          this.items = newItems
        }
      } catch (error) {
        toast.error(`주모 정산내역들을 불러오는데 실패했어요.`, {
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
      items: [],
      header: [
        { text: '정산 연도', value: 'settlementYear' },
        { text: '정산 월', value: 'settlementMonth' },
        { text: '총 판매 가격(원)', value: 'totalAmount' },
        { text: '정산 수수료(원)', value: 'settlementCommision' },
        { text: '정산 금액', value: 'settlementAmount' },
        { text: '정산 내역증', value: 'settlementImgUrl' }
      ],

      isLoading: false
    } as {
      sellerId: number
      items: GetCashUpListBySellerIdResponseData[]
      header: { text: string; value: string }[]
      isLoading: boolean
    }
  },
  mounted() {
    this.sellerId = Number(this.$route.params.sellerId)
    this.getCashUpListBySellerId()
  }
}
</script>

<style lang="scss" scoped></style>
