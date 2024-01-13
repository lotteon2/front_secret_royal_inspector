<template>
  <div>
    DashBoard
    <div class="dashboardHeader">
      <DashBoardInfoBox state="입점 대기" :cnt="authData.waitingApprovalSellerCnts" />
      <DashBoardInfoBox state="신규 셀러" :cnt="authData.newSellerCnts" />
      <DashBoardInfoBox state="신규 유저" :cnt="authData.newConsumerCnts" />
      <DashBoardInfoBox state="탈퇴 유저" :cnt="authData.deletedMemberCnts" />
      <DashBoardInfoBox state="경매 대기" :cnt="authData.waitingApprovalAuctionCnts" />
    </div>
  </div>
</template>

<script lang="ts">
import { getDashBoardAuth } from '@/api/authentication/authAPIService'
import type { GetDashBoardAuthResponseData } from '@/api/authentication/authAPIService.types'
import DashBoardInfoBox from '@/components/DashBoard/DashBoardInfoBox.vue'
import { useToast } from 'vue-toastification'
export default {
  components: { DashBoardInfoBox },
  methods: {
    async getAuthData() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getDashBoardAuth()
        if (data.code === 200) {
          this.authData = data.data
        }
      } catch (error) {
        toast.error(`대시보드 데이터들을 불러오는데 실패했어요.`, {
          timeout: 2000
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  data() {
    return {
      isLoading: false,
      authData: {}
    } as {
      isLoading: boolean
      authData: GetDashBoardAuthResponseData
    }
  },
  mounted() {
    this.getAuthData()
  }
}
</script>

<style scoped>
.dashboardHeader {
  display: flex;
  gap: 1rem;
}
</style>
