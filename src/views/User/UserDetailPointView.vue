<template>
  <div v-if="items.length > 0">
    <div v-for="(item, index) in items" :key="index">
      <UserPointCard
        :key="index"
        :title="item.tradePoint"
        :detail="item.tradePath"
        :date="item.tradeDate"
      />
    </div>
    <CustomPagination
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
    <div v-if="isLoading">
      <img src="../../assets/loading.gif" alt="loading" />
    </div>
  </div>
  <div v-else>유저의 포인트 내역이 비어있어요.</div>
</template>

<script lang="ts" scoped>
import CustomPagination from '@/components/common/CustomPagination.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import UserPointCard from '@/components/user/UserPointCard.vue'
import { getConsumerPointListByConsumerId } from '@/api/consumer/consumerAPIService.ts'
import { useToast } from 'vue-toastification'
import { defineComponent } from 'vue'
import type { GetConsumerPointListByConsumerIdResponseData } from '@/api/consumer/consumerAPIService.types'

export default defineComponent({
  components: {
    CustomTable,
    UserPointCard,
    CustomPagination
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '상세', value: 'tradePath' },
        { text: '내역', value: 'tradePoint' },
        { text: '날짜', value: 'tradeDate' }
      ],
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetConsumerPointListByConsumerIdResponseData[]
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
    async getPointListByConsumerId(page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getConsumerPointListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          this.items = data.data.content
          this.totalPages = data.data.totalPages
        }
      } catch (err) {
        toast.error('고객의 포인트 내역을 불러오는데 실패했어요.', {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getPointListByConsumerId(0, 3)
  },
  watch: {
    requestPage: function (value) {
      this.getPointListByConsumerId(value, 3)
    }
  }
})
</script>

<style lang="scss" scoped></style>
