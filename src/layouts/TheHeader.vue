<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/dashboard">
          <img
            src="@/assets/main_logo.png"
            alt="logo"
            width="50"
            height="50"
            class="d-inline-block align-text-top"
          />
        </RouterLink>
        <RouterLink to="/user" :class="{ active: isActive('user', '') }">회원</RouterLink>
        <RouterLink to="/jumo" :class="{ active: isActive('jumo', '') }">주모</RouterLink>
        <RouterLink to="/product" :class="{ active: isActive('product', '') }">상품</RouterLink>
        <RouterLink to="/orderList" :class="{ active: isActive('orderList', '') }"
          >주문내역</RouterLink
        >
        <RouterLink to="/live" :class="{ active: isActive('live', '') }">라이브경매</RouterLink>
        <RouterLink to="/login/logout" :class="{ active: isActive('logout', '') }"
          >로그아웃</RouterLink
        >
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { getAllSellers } from '@/api/seller/sellerAPIService'
import { useMyInfoStore } from '@/stores/myInfo'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  methods: {
    isActive(route: string, route2: string) {
      return this.$route.path.includes(route) && this.$route.path.includes(route2)
    },
    async getSellerInfo() {
      const myInfo = useMyInfoStore()
      try {
        const data = await getAllSellers()
        console.log(data)
        console.log(myInfo.getSellers())
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('accessToken')) {
      this.$router.push('/login')
    } else {
      this.getSellerInfo()
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  padding-top: 2rem;
  width: 10rem;
  height: 100vh;
  margin-bottom: 1rem;
  border-right: 1px solid #c0c0c0;
}

nav {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30vh;
  padding-left: 2rem;
}

a {
  width: 100%;
  text-decoration: none;
  color: black;

  &:hover,
  &:active {
    color: #aab3ff;
  }
}

.active {
  font-weight: bold;
  color: #aab3ff;
}
</style>
