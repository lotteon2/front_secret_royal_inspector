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
  <div v-else>유저의 경매 참여 내역이 비어있어요.</div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import type { GetAuctionListByConsumerIdResponseData } from '@/api/auction/auctionAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { useToast } from 'vue-toastification'
import { getAuctionListByConsumerId } from '@/api/auction/auctionAPIService.ts'

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '', value: 'productImageUrl' },
        { text: '경매 이름', value: 'auctionName' },
        { text: '상품', value: 'productName' },
        { text: '시작가 (원)', value: 'startingPrice' },
        { text: '낙찰가 (원)', value: 'myLastBidPrice' },
        { text: '낙찰 여부', value: 'isBid' },
        { text: '낙찰 날짜', value: 'bidDate' }
      ],
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetAuctionListByConsumerIdResponseData[]
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
    async getAuctionList(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getAuctionListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          const newItems = data.data.content
          newItems.forEach(
            (it, idx) =>
              (newItems[idx] = {
                ...newItems[idx],
                startingPrice: it.startingPrice ? it.startingPrice.toLocaleString() : 0,
                myLastBidPrice: it.myLastBidPrice ? it.myLastBidPrice.toLocaleString() : 0,
                isBid: it.isBid ? 'Y' : 'N'
              })
          )
          this.items = newItems
        }
      } catch (error) {
        toast.error(`고객의 경매 내역들을 불러오는데 실패했어요.`, {
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
