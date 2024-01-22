<template>
  <div class="main">
    <TheHeader></TheHeader>
    <div class="view">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import TheHeader from '@/layouts/TheHeader.vue'
import { defineComponent } from 'vue'
import { useMyInfoStore } from '@/stores/myInfo'
import { getAllSellers } from '@/api/seller/sellerAPIService'
export default defineComponent({
  components: {
    TheHeader
  },
  methods: {
    async getSellerInfo() {
      const myInfo = useMyInfoStore()
      try {
        const data = await getAllSellers()
        myInfo.setSellers([{ value: -1, label: '전체' }, ...data.data])
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
.main {
  display: flex;
  gap: 1rem;
}

.view {
  margin-top: 1rem;
  width: 100vw;
  height: 90vh;
}
</style>
