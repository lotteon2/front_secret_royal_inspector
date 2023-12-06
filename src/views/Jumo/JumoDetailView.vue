import type { log } from 'console'; import type router from '@/router'; import type { log } from
'console'; import type { log } from 'console'; import type { log } from 'console'; import type {
mergeProps } from 'vue';
<template>
  <div class="jumo-detail">
    <UserCard
      :email="email"
      :nickName="storeName"
      :thumbnail="storeImageUrl"
      :phoneNumber="storePhoneNumber"
    ></UserCard>
    <div class="jumo-detail__menu">
      <RouterLink to="/jumo/jumoDetail/3/products" :class="{ active: isActive('products') }"
        >상품 내역</RouterLink
      >
      <RouterLink to="/jumo/jumoDetail/3/orderList" :class="{ active: isActive('orderList') }"
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
import UserCard from '@/components/UserCard/UserCard.vue'
import { getSellerInfoBySellerId } from '@/api/seller/sellerAPIService.ts'
import { useToast } from 'vue-toastification'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      sellerId: -1,
      email: '',
      storeName: '',
      storePhoneNumber: '',
      storeImageUrl: ''
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
