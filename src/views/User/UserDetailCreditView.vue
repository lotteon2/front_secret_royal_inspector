<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
    <CustomPagination
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
    <div v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading" />
    </div>
  </div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import { getCreditListByConsumerId } from '@/api/consumer/consumerAPIService'
import type { GetCreditListByConsumerIdResponseData } from '@/api/consumer/consumerAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
export default defineComponent({
  components: {
    CustomTable,
    CustomPagination
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '날짜', value: 'tradeDate' },
        { text: '금액', value: 'tradeCredit' },
        { text: '내역', value: 'desc' }
      ],
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetCreditListByConsumerIdResponseData[]
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
    async getCreditList(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getCreditListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          const newItems = data.data.content
          newItems.forEach((it: GetCreditListByConsumerIdResponseData, idx: number) =>
            it.tradeCredit > 0
              ? (newItems[idx] = { ...newItems[idx], desc: '경매 크레딧 충전' })
              : (newItems[idx] = { ...newItems[idx], desc: '경매 낙찰시 사용' })
          )
          this.items = newItems
          this.totalPages = data.data.totalPages
        }
      } catch (error) {
        toast.error(`고객의 크레딧 내역들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getCreditList(0, 6)
  },
  watch: {
    requestPage: function (value) {
      this.getCreditList(value, 6)
    }
  }
})
</script>

<style lang="scss" scoped></style>
