<template>
  <header>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#" active-class="active">
        <img
          src="./assets/logo.svg"
          alt="logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        전통주.
      </a>
      <a href="#" active-class="active">회원</a>
      <a href="#" active-class="active">주모</a>
      <a href="#" active-class="active">상품</a>
      <a href="#" active-class="active">주문내역</a>
      <a href="#" active-class="active">라이브경매</a>
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

<style scoped></style>
