<template>
  <div>
    <CustomTable :headers="header" :items="items"></CustomTable>
  </div>
</template>

<script lang="ts" scoped>
import { getCreditListByConsumerId } from '@/api/consumer/consumerAPIService'
import type { GetCreditListByConsumerIdResponseData } from '@/api/consumer/consumerAPIService.types'
import CustomTable from '@/components/common/CustomTable.vue'
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
export default defineComponent({
  components: {
    CustomTable
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '날짜', value: 'tradeDate' },
        { text: '금액', value: 'tradeCredit' },
        { text: '내역', value: 'desc' }
      ],
      items: []
    } as {
      consumerId: number
      header: { text: string; value: string }[]
      items: GetCreditListByConsumerIdResponseData[]
    }
  },
  methods: {
    async getCreditList(page: number, size: number) {
      const toast = useToast()
      try {
        const data = await getCreditListByConsumerId(this.consumerId, page, size)
        if (data.code === 200) {
          toast.success(`고객의 크레딧 내역을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          const newItems = data.data.content
          newItems.forEach((it: GetCreditListByConsumerIdResponseData, idx: number) =>
            it.tradeCredit > 0
              ? (newItems[idx] = { ...newItems[idx], desc: '경매 크레딧 충전' })
              : (newItems[idx] = { ...newItems[idx], desc: '경매 낙찰시 사용' })
          )
          this.items = newItems
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
    this.getCreditList(0, 10)
  }
})
</script>

<style lang="scss" scoped></style>
