<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
</script>

<template>
  <TheHeader></TheHeader>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem('accessToken')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
}
</style>
