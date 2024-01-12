<template>
  <div class="jumoList">
    <div class="infoSection">
      <div>행을 클릭하면 주모 상세 페이지로 이동해요.</div>
    </div>
    <CustomTable :headers="header" :items="items" @rowClick="goDetailJumo"></CustomTable>
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
import CustomTable from '@/components/common/CustomTable.vue'
import { getSellerList } from '@/api/seller/sellerAPIService'
import { useToast } from 'vue-toastification'
import type { GetSellerListResponseData } from '@/api/seller/sellerAPIService.types'
export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      header: [
        { text: '', value: 'storeImageUrl' },
        { text: '주모', value: 'storeName' },
        { text: '이메일', value: 'email' },
        { text: '대표자', value: 'businessmanName' },
        { text: '대표번호', value: 'storePhoneNumber' },
        { text: '주모소개', value: 'storeDescription' },
        { text: '승인여부', value: 'approvalState' },
        { text: '가입일', value: 'createdAt' },
        { text: '탈퇴 여부', value: 'isDeleted' }
      ],
      items: [],
      page: 0,
      totalPages: 0,
      requestPage: 0,
      isLoading: false
    } as {
      header: { text: string; value: string }[]
      items: GetSellerListResponseData[]
      page: number
      totalPages: number
      requestPage: number
      isLoading: boolean
    }
  },
  methods: {
    goDetailJumo(item) {
      this.$router.push({
        path: `/jumo/jumoDetail/${item.sellerId}`
      })
    },
    async getSellerList(page: number, size: number) {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getSellerList(page, size)
        if (data.code === 200) {
          this.items = data.data.content
          this.totalPages = data.data.totalPages
        }
      } catch (err) {
        toast.error('주모 정보를 불러오는데 실패했어요.', {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.getSellerList(0, 10)
  },
  watch: {
    requestPage: function (value) {
      this.getSellerList(value, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.jumoList {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  .infoSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 70vw;
    max-width: 70vw;
    margin: 1rem 0;
  }
}
</style>
