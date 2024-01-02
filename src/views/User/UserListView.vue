<template>
  <div class="user-list">
    <div class="user-list__info-section">
      <div>행을 클릭하면 유저 상세 페이지로 이동해요.</div>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="goDetailUser"></CustomTable>
  </div>
</template>

<script scoped>
import LiveItem from '@/components/Auction/LiveItem.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import { getConsumerList } from '@/api/consumer/consumerAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  components: { CustomTable },
  data() {
    return {
      header: [
        { text: '', value: 'thumbnail' },
        { text: '성함', value: 'name' },
        { text: '이메일', value: 'email' },
        { text: '전화번호', value: 'phoneNumber' },
        { text: '포인트', value: 'point' },
        { text: '크레딧', value: 'credit' },
        { text: '양반여부', value: 'isYangban' },
        { text: '가입일', value: 'createdAt' },
        { text: '탈퇴 여부', value: 'isDeleted' }
      ],
      items: []
    }
  },
  methods: {
    goDetailUser(item) {
      this.$router.push({
        path: `/user/userDetail/${item.consumerId}`
      })
    },
    async getConsumerList(page, size) {
      const toast = useToast()
      try {
        const data = await getConsumerList(page, size)
        if (data.code === 200) {
          toast.success(`회원 정보들을 성공적으로 불러왔어요.`, {
            timeout: 2000
          })
          this.items = data.data.content
        }
      } catch (error) {
        toast.fail(`회원 정보들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      }
    }
  },
  mounted() {
    this.getConsumerList(0, 10)
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  .user-list__info-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 70vw;
    max-width: 70vw;
    margin: 1rem 0;
  }
}
</style>
