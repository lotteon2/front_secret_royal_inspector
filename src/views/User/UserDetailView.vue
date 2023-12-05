<template>
  <div class="user-detail">
    <UserCard></UserCard>
    <div class="user-detail__menu">
      <RouterLink to="/user/userDetail/3/orderList" :class="{ active: isActive('orderList') }"
        >주문내역</RouterLink
      >
      <RouterLink to="/user/userDetail/3/point" :class="{ active: isActive('point') }"
        >포인트</RouterLink
      >
      <RouterLink to="/user/userDetail/3/credit" :class="{ active: isActive('credit') }"
        >경매 크레딧</RouterLink
      >
      <RouterLink to="/user/userDetail/3/auction" :class="{ active: isActive('auction') }"
        >경매 낙찰 내역</RouterLink
      >
    </div>
    <div>
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
  methods: {
    isActive(route) {
      return this.$route.path.includes(route)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-detail {
  margin-top: 2rem;

  .user-detail__menu {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;
  }
  a {
    text-decoration: none;
    border-radius: 4px;
    background-color: #94e8b4;
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
