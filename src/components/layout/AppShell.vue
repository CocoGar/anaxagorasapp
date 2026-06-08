<script setup>
import AppHeader from './AppHeader.vue';
import HomeView from '../../views/HomeView.vue';
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main>
      <HomeView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(200, 155, 60, 0.18), transparent 32rem),
    linear-gradient(135deg, #f7f4ef 0%, #ffffff 52%, #eef5f1 100%);
}
</style>