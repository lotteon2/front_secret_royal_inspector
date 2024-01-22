<template>
  <div>
    <div class="dashboardHeader">
      <DashBoardInfoBox state="입점 대기" :cnt="authData.waitingApprovalSellerCnts" />
      <DashBoardInfoBox state="신규 주모" :cnt="authData.newSellerCnts" />
      <DashBoardInfoBox state="신규 유저" :cnt="authData.newConsumerCnts" />
      <DashBoardInfoBox state="탈퇴 유저" :cnt="authData.deletedMemberCnts" />
      <DashBoardInfoBox state="경매 대기 주모" :cnt="authData.waitingApprovalAuctionCnts" />
    </div>
    <div class="dashboardFlexBottom">
      <div class="flexBox">
        <div class="dashboardFlexRank">
          <div class="dashboardRankBox">
            <h2 class="dashboardRankBox-title">월별 상품 판매 순위</h2>
            <div
              v-for="data in orderData.monthProductRank"
              :key="data.productId"
              class="rankWrapper"
            >
              <div class="whitespace">{{ data.productName }}</div>
              <div class="whitespace">{{ data.totalCount }} 개</div>
            </div>
          </div>
          <div class="dashboardRankBox">
            <h2 class="dashboardRankBox-title">월별 셀러 판매 순위</h2>
            <div v-for="data in orderData.monthSellerRank" :key="data.sellerId" class="rankWrapper">
              <div class="whitespace">{{ data.sellerName }}</div>
              <div class="whitespace">{{ data.totalPrice.toLocaleString() }} 원</div>
            </div>
          </div>
        </div>
        <div class="dashboardFlex">
          <DashBoardInfoBox state="이번달 정산금" :cnt="orderData.commissionMonth" />
          <DashBoardInfoBox state="이번달 총 판매금" :cnt="orderData.totalSalesMonth" />
        </div>
      </div>
      <div class="flexBox">
        <div class="userAge">
          <div class="header">지난 일주일간 가입 유저 연령대 비율</div>
          <div v-if="ageData.teenage || ageData.twenty || ageData.thirty || ageData.fortyOver">
            <DashBoardYearChartBox
              :teen="ageData.teenage"
              :twenty="ageData.twenty"
              :thirty="ageData.thirty"
              :forty="ageData.fortyOver"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="header">지난 일주일간 신규 가입자 수</div>
    <div v-if="ageData.consumers" class="dashboardFlexBottom">
      <DashBoardNewUser label="신규 고객" :chartData="ageData.consumers" class="flexBox" />
      <DashBoardNewUser label="신규 주모" :chartData="ageData.sellers" class="flexBox" />
    </div>
  </div>
</template>

<script lang="ts">
import CustomButton from '@/components/common/CustomButton.vue'
import { getDashBoardAuth, getAgeListForDashBoard } from '@/api/authentication/authAPIService'
import { getOrderForDashBoard, getAllCashUpListForDashBoard } from '@/api/order/orderAPIService'
import type {
  GetDashBoardAgeResponseData,
  GetDashBoardAuthResponseData
} from '@/api/authentication/authAPIService.types'
import type { GetOrderForDashBoardResponseData } from '@/api/order/orderAPIService.types'
import DashBoardInfoBox from '@/components/DashBoard/DashBoardInfoBox.vue'
import DashBoardRankingBox from '@/components/DashBoard/DashBoardRankingBox.vue'
import DashBoardYearChartBox from '@/components/DashBoard/DashBoardYearChartBox.vue'
import DashBoardNewUser from '@/components/DashBoard/DashBoardNewUser.vue'
import { useToast } from 'vue-toastification'
export default {
  components: {
    DashBoardInfoBox,
    DashBoardRankingBox,
    CustomButton,
    DashBoardYearChartBox,
    DashBoardNewUser
  },
  methods: {
    async getAgeData() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getAgeListForDashBoard()
        if (data.code === 200) {
          this.ageData = data.data
        }
      } catch (err) {
        console.error('err', err)
      } finally {
        this.isLoading = false
      }
    },
    async getAuthData() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getDashBoardAuth()
        if (data.code === 200) {
          this.authData = data.data
        }
      } catch (error) {
        console.error('err', error)
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
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async downloadAllCashUpList() {
      const toast = useToast()
      try {
        this.isLoading = true
        const data = await getAllCashUpListForDashBoard('2024', '01')
        if (data.code === 200) {
          window.open(data.data)
        }
      } catch (err) {
        toast.error(`셀러의 정산내역들을 불러오는데 실패했어요.`, {
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
      orderData: {},
      ageData: {}
    } as {
      isLoading: boolean
      authData: GetDashBoardAuthResponseData
      orderData: GetOrderForDashBoardResponseData
      ageData: GetDashBoardAgeResponseData
    }
  },
  mounted() {
    this.getAuthData()
    this.getOrderDashBoard()
    this.getAgeData()
  }
}
</script>

<style scoped>
.dashboardHeader {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.dashboardFlex {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.dashboardFlexRank {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.dashboardRankBox {
  border-radius: 12px;
  box-shadow: 3px 3px 1px 1px #c0c0c0;
  padding: 1rem;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  flex: 1;

  .dashboardRankBox-title {
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
}

.rankWrapper {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.dashboardFlexBottom {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.flexBox {
  flex: 1;
}

.header {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.userAge {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.whitespace {
  white-space: nowrap;
}
</style>
