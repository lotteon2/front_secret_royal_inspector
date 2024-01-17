<template>
  <v-app className="vApp">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from './router'
export default defineComponent({
  name: 'App',
  data() {
    return {
      //
    }
  },
  mounted() {
    router.replace('/dashboard')
  }
})
</script>

<style>
.vApp {
}
</style>
