<template>
  <v-app className="vApp">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  data() {
    return {
      //
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
