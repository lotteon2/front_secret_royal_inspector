<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts">
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
        const data = await getCashUpListBySellerId(this.sellerId, 2023)
        if (data.code === 200) {
          this.items = data.data
        }
      } catch (error) {
        toast.error(`주모 정산내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
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
        { text: '총 판매 가격', value: 'totalAmount' },
        { text: '정산 수수료', value: 'settlementCommision' },
        { text: '정산 금액', value: 'settlementAmount' },
        { text: '정산 내역증', value: 'settlementImgUrl' }
      ]
    } as {
      sellerId: number
      items: GetCashUpListBySellerIdResponseData[]
      header: { text: string; value: string }[]
    }
  },
  mounted() {
    this.sellerId = Number(this.$route.params.sellerId)
    this.getCashUpListBySellerId()
  }
}
</script>

<style lang="scss" scoped></style>
