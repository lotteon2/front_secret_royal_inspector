<template>
  <Login v-if="!isLogged" @logged="isLogged = true"></Login>
  <Meeting v-else @left="isLogged = false"></Meeting>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Login from './LiveEnterView.vue'
import Meeting from './LiveMeetingView.vue'

const isLogged = ref(false)
</script>
