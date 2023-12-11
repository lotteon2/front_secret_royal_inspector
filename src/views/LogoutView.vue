<template>
  <div>로그아웃되었습니다.</div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  mounted() {
    this.logout()
    this.$router.replace('/login')
  },
  methods: {
    logout() {
      const toast = useToast()
      localStorage.removeItem('accessToken')
      toast.success('성공적으로 로그아웃됐어요.', {
        timeout: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
