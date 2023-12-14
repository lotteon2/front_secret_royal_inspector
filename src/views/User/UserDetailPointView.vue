<template>
  <div>USER ORDER 포인트 적립 , 사용</div>
</template>

<script lang="ts">
import CustomTable from '@/components/common/CustomTable.vue'
import { getConsumerPointListByConsumerId } from '@/api/consumer/consumerAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  components: {
    CustomTable
  },
  data() {
    return {
      consumerId: -1,
      header: [
        { text: '상품 이름', value: 'productName' },
        { text: '상세', value: 'tradePath' },
        { text: '내역', value: 'productTotalAmount' },
        { text: '날짜', value: 'tradeDate' }
      ],
      items: []
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
}
</script>

<style lang="scss" scoped></style>
