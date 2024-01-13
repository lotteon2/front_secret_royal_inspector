<template>
  <div>
    <div class="dashboardHeader">
      <DashBoardInfoBox state="입점 대기" :cnt="authData.waitingApprovalSellerCnts" />
      <DashBoardInfoBox state="신규 주모" :cnt="authData.newSellerCnts" />
      <DashBoardInfoBox state="신규 유저" :cnt="authData.newConsumerCnts" />
      <DashBoardInfoBox state="탈퇴 유저" :cnt="authData.deletedMemberCnts" />
      <DashBoardInfoBox state="경매 대기 주모" :cnt="authData.waitingApprovalAuctionCnts" />
    </div>
    <div class="dashboardFlex">
      <div>
        <div class="dashboardFlex">
          <DashBoardRankingBox name="월 별 셀러 판매 순위" />
          <DashBoardRankingBox name="월 별 상품 판매 순위 " />
        </div>
        <div class="dashboardFlex">
          <DashBoardInfoBox state="이번달 판매량" :cnt="orderData.totalSalesMonth" />
          <DashBoardInfoBox state="이번달 정산 수수료" :cnt="orderData.commissionMonth" />
        </div>
      </div>
      <div>시각화</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getDashBoardAuth } from '@/api/authentication/authAPIService'
import { getOrderForDashBoard } from '@/api/order/orderAPIService'
import type { GetDashBoardAuthResponseData } from '@/api/authentication/authAPIService.types'
import type { GetOrderForDashBoardResponseData } from '@/api/order/orderAPIService.types'
import DashBoardInfoBox from '@/components/DashBoard/DashBoardInfoBox.vue'
import DashBoardRankingBox from '@/components/DashBoard/DashBoardRankingBox.vue'
import { useToast } from 'vue-toastification'
export default {
  components: { DashBoardInfoBox, DashBoardRankingBox },
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
    },
    async getOrderDashBoard() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getOrderForDashBoard('202401')
        if (data.code === 200) {
          this.orderData = data.data
          console.log(data.data)
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
      authData: {},
      orderData: {}
    } as {
      isLoading: boolean
      authData: GetDashBoardAuthResponseData
      orderData: GetOrderForDashBoardResponseData
    }
  },
  mounted() {
    this.getAuthData()
    this.getOrderDashBoard()
  }
}
</script>

<style scoped>
.dashboardHeader {
  display: flex;
  gap: 1rem;
}

.dashboardFlex {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
