<template>
  <div class="user-list">
    <div class="user-list__info-section">
      <div>행을 클릭하면 유저 상세 페이지로 이동해요.</div>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="goDetailUser"></CustomTable>
    <CustomPagination
      :on-change-page="onChangePage"
      :request-page="requestPage"
      :total-pages="totalPages"
    />
    <div v-if="isLoading">
      <img src="../../assets/loading.gif" alt="loading" />
    </div>
  </div>
</template>

<script scoped lang="ts">
import CustomPagination from '@/components/common/CustomPagination.vue'
import CustomTable from '@/components/common/CustomTable.vue'
import { getConsumerList } from '@/api/consumer/consumerAPIService.ts'
import { useToast } from 'vue-toastification'
import type { GetConsumerListResponseData } from '@/api/consumer/consumerAPIService.types'
export default {
  components: { CustomTable, CustomPagination },
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
      items: [],
      requestPage: 0,
      page: 0,
      totalPages: 0,
      isLoading: false
    } as {
      items: GetConsumerListResponseData[]
      header: { text: string; value: string }[]
      requestPage: number
      page: number
      totalPages: number
      isLoading: boolean
    }
  },
  methods: {
    async onChangePage(page: number) {
      if (0 <= page && page < this.totalPages) {
        this.requestPage = page
      }
    },
    goDetailUser(item: GetConsumerListResponseData) {
      this.$router.push({
        path: `/user/userDetail/${item.consumerId}`
      })
    },
    async getConsumerList(page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getConsumerList(page, size)
        if (data.code === 200) {
          this.items = data.data.content
          console.log(data.data)
          this.totalPages = data.data.totalPages
        }
      } catch (error) {
        toast.error(`회원 정보들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.getConsumerList(0, 7)
  },
  watch: {
    requestPage: function (value) {
      console.log(value)
      this.getConsumerList(value, 7)
    }
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
    margin: 1rem 0;
  }
}
</style>
