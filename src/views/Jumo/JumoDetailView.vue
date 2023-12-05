<template>
  <div class="jumo-detail">
    <UserCard></UserCard>
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
export default {
  components: {
    UserCard
  },
  mounted() {
    this.$router.replace('/jumo/jumoDetail/3/products')
  },
  methods: {
    isActive(route) {
      return this.$route.path.includes(route)
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
