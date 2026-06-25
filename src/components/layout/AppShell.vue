<script setup>
import AppHeader from './AppHeader.vue';
import HomeView from '../../views/HomeView.vue';
import CalculatorView from '../../views/CalculatorView.vue';
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main class="app-shell__main">
      <HomeView />
      <CalculatorView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 8%, rgba(200, 155, 60, 0.18), transparent 28rem),
    radial-gradient(circle at 90% 14%, rgba(22, 56, 50, 0.12), transparent 30rem),
    linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 48%, #eef5f1 100%);
}

.app-shell::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(22, 56, 50, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 56, 50, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.58), transparent 72%);
  content: '';
}

.app-shell__main {
  position: relative;
  z-index: 1;
}
</style>