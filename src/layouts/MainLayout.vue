<template>
  <TheHeader></TheHeader>
  <div>
    <RouterView></RouterView>
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
        console.log(data)
        myInfo.setSellers(data.data)
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
div {
  width: 100vw;
}
</style>
