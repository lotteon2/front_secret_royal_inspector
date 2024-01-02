<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <UserPointCard
        :key="index"
        :title="item.tradePoint"
        :detail="item.tradePath"
        :date="item.tradeDate"
      />
    </div>
  </div>
</template>

<script lang="ts" scoped>
import CustomTable from '@/components/common/CustomTable.vue'
import UserPointCard from '@/components/user/UserPointCard.vue'
import { getConsumerPointListByConsumerId } from '@/api/consumer/consumerAPIService.ts'
import { useToast } from 'vue-toastification'
import { defineComponent } from 'vue'
import type { GetConsumerPointListByConsumerIdResponseData } from '@/api/consumer/consumerAPIService.types'

export default defineComponent({
  components: {
    CustomTable,
    UserPointCard
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '상세', value: 'tradePath' },
        { text: '내역', value: 'tradePoint' },
        { text: '날짜', value: 'tradeDate' }
      ],
      items: []
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetConsumerPointListByConsumerIdResponseData[]
    }
  },
  methods: {
    async getPointListByConsumerId(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getConsumerPointListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          toast.success('고객의 포인트 내역을 성공적으로 불러왔어요.', {
            timeout: 2000
          })
          this.items = data.data.content
          console.log(this.items)
        }
      } catch (err) {
        toast.error('고객의 포인트 내역을 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.consumerId = Number(this.$route.params.consumerId)
    this.getPointListByConsumerId(0, 10)
  }
})
</script>

<style lang="scss" scoped></style>
