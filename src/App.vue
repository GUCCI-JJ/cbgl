<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/user';
(async () => {
  const { fetchUserInfo } = useUserStore()
  await fetchUserInfo()
})()
</script>

<template>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>