<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts">
import type { GetAuctionListByConsumerIdResponseData } from '@/api/auction/auctionAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { useToast } from 'vue-toastification'
import { getAuctionListByConsumerId } from '@/api/auction/auctionAPIService.ts'

export default {
  components: { CustomTable },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '', value: 'productImageUrl' },
        { text: '경매 이름', value: 'auctionName' },
        { text: '상품', value: 'productName' },
        { text: '시작가', value: 'startingPrice' },
        { text: '낙찰가', value: 'myLastBidPrice' },
        { text: '낙찰 여부', value: 'isBid' },
        { text: '낙찰 날짜', value: 'bidDate' }
      ],
      items: []
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetAuctionListByConsumerIdResponseData[]
    }
  },
  methods: {
    async getAuctionList(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getAuctionListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          toast.success(`고객의 경매내역들을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          this.items = data.data.content
        }
      } catch (error) {
        toast.error(`괙의 경매 내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getAuctionList(0, 10)
  }
}
</script>

<style lang="scss" scoped></style>
