<template>
  <header>
    <nav>
      <RouterLink to="/dashboard">
        <img
          src="@/assets/logo.svg"
          alt="logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
      </RouterLink>
      <RouterLink to="/user">회원</RouterLink>
      <RouterLink to="/jumo">주모</RouterLink>
      <RouterLink to="/user">상품</RouterLink>
      <RouterLink to="/user">주문내역</RouterLink>
      <RouterLink to="/live">라이브경매</RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
nav {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}
a {
  text-decoration: none;
  color: black;
  &:hover,
  &:active {
    color: #aab3ff;
  }
}
</style>
