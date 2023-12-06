<template>
  <div class="jumo-detail">
    <div class="jumo-detail__header">
      <UserCard
        :email="email"
        :nickName="storeName"
        :thumbnail="storeImageUrl"
        :phoneNumber="storePhoneNumber"
      ></UserCard>
      <div class="jumo-detail__header__btns">
        <CustomButton
          v-if="this.approvalState === 'WAIT'"
          btnText="승인하기"
          :handleClick="() => approveSeller('ALLOW')"
        />
        <CustomButton
          v-if="this.approvalState === 'WAIT'"
          btnText="반려하기"
          :handleClick="() => approveSeller('DENY')"
          btnType="negative"
        />
        <CustomButton
          v-if="this.isDeleted === false"
          btnText="탈퇴시키기"
          :handleClick="() => withDrawSeller()"
          btnType="negative"
        />
      </div>
    </div>
    <div class="jumo-detail__menu">
      <RouterLink
        :to="`/jumo/jumoDetail/${sellerId}/products`"
        :class="{ active: isActive('products') }"
        >상품 내역</RouterLink
      >
      <RouterLink
        :to="`/jumo/jumoDetail/${sellerId}/orderList`"
        :class="{ active: isActive('orderList') }"
        >주문 내역</RouterLink
      >
      <RouterLink to="/jumo/jumoDetail/3/cashup" :class="{ active: isActive('cashup') }"
        >정산 내역</RouterLink
      >
    </div>
    <div class="jumo-detail__sub">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/Common/CustomButton.vue'
import UserCard from '@/components/UserCard/UserCard.vue'
import {
  getSellerInfoBySellerId,
  approveSeller,
  withDrawSeller
} from '@/api/seller/sellerAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  components: {
    UserCard,
    CustomButton
  },
  data() {
    return {
      sellerId: -1,
      email: '',
      storeName: '',
      storePhoneNumber: '',
      storeImageUrl: '',
      approvalState: null,
      isDeleted: null
    }
  },
  mounted() {
    this.sellerId = this.$route.params.sellerId
    this.getSellerDetailInfo()
    this.$router.replace(`/jumo/jumoDetail/${this.sellerId}/products`)
  },
  methods: {
    isActive(route) {
      return this.$route.path.includes(route)
    },
    async approveSeller(approvalState) {
      const toast = useToast()
      try {
        const data = await approveSeller({
          sellerId: this.sellerId,
          approvalState
        })
        if (data.code === 200) {
          toast.success(`주모 ${approvalState === 'ALLOW' ? '승인' : '반려'}이 완료됐어요.`, {
            timeout: 2000
          })
          this.approvalState = approvalState
        }
      } catch (err) {
        toast.error(`주모 ${approvalState === 'ALLOW' ? '승인' : '반려'}이 실패했어요.`, {
          timeout: 2000
        })
      }
    },
    async withDrawSeller() {
      const toast = useToast()
      try {
        const data = await withDrawSeller(this.sellerId)
        if (data.code === 200) {
          toast.success(`주모 탈퇴가 완료됐어요.`, {
            timeout: 2000
          })
          this.isDeleted = false
        }
      } catch (err) {
        toast.error('주모 탈퇴가 실패했어요.', {
          timeout: 2000
        })
      }
    },
    async getSellerDetailInfo() {
      const toast = useToast()
      try {
        const data = await getSellerInfoBySellerId(this.sellerId)
        if (data.code === 200) {
          toast.success('주모 상세 정보를 불러왔어요.', {
            timeout: 2000
          })
          this.email = data.data.email
          this.storeName = data.data.storeName
          this.storePhoneNumber = data.data.storePhoneNumber
          this.storeImageUrl = data.data.storeImageUrl
          this.approvalState = data.data.approvalState
          this.isDeleted = data.data.isDeleted
        }
      } catch (err) {
        toast.error('주모 상세 정보를 불러오는데 실패했어요.', {
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jumo-detail {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  .jumo-detail__header {
    display: flex;
    gap: 2rem;
    align-items: center;

    .jumo-detail__header__btns {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
    }
  }
  .jumo-detail__menu {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;
  }
  .jumo-detail__sub {
    width: 100%;
  }
  a {
    text-decoration: none;
    border-radius: 4px;
    background-color: #9db0a3;
    padding: 0.3rem;
    color: white;
    &:hover,
    &:active {
      font-weight: bold;
      background-color: #aab3ff;
    }
  }

  .active {
    font-weight: bold;
    background-color: #aab3ff;
  }
}
</style>
