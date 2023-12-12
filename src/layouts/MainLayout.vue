<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView></RouterView>
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

<style lang="scss" scoped></style>
