<template>
  <v-app className="vApp">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMyInfoStore } from '@/stores/myInfo'
import { getAllSellers } from '@/api/seller/sellerAPIService'
export default defineComponent({
  name: 'App',
  data() {
    return {
      //
    }
  },
  mounted() {
    if (!localStorage.getItem('accessToken')) {
      this.$router.push('/login')
    } else {
      this.getSellerInfo()
    }
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
  }
})
</script>

<style>
.vApp {
  height: 100vh;
  margin-top: 15vh;
}
</style>
