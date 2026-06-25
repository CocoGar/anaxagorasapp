<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import AppHeader from './AppHeader.vue';
import HomeView from '../../views/HomeView.vue';
import CalculatorView from '../../views/CalculatorView.vue';
import DesignView from '../../views/DesignView.vue';

const AVAILABLE_PAGES = ['home', 'calculator', 'design'];
const currentPage = ref(getPageFromHash());

const activeView = computed(() => {
  if (currentPage.value === 'calculator') {
    return CalculatorView;
  }

  if (currentPage.value === 'design') {
    return DesignView;
  }

  return HomeView;
});

function getPageFromHash() {
  const hashPage = window.location.hash.replace('#', '');

  if (AVAILABLE_PAGES.includes(hashPage)) {
    return hashPage;
  }

  return 'home';
}

function updatePageFromHash() {
  currentPage.value = getPageFromHash();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToPage(pageId) {
  if (!AVAILABLE_PAGES.includes(pageId)) {
    return;
  }

  if (window.location.hash === `#${pageId}`) {
    currentPage.value = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  window.location.hash = pageId;
}

onMounted(() => {
  window.addEventListener('hashchange', updatePageFromHash);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', updatePageFromHash);
});
</script>

<template>
  <div class="app-shell">
    <AppHeader
      :active-page="currentPage"
      @navigate="navigateToPage"
    />

    <main class="app-shell__main">
      <component
        :is="activeView"
        @navigate="navigateToPage"
      />
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
    radial-gradient(circle at 10% 0%, rgba(183, 138, 82, 0.14), transparent 30rem),
    radial-gradient(circle at 92% 8%, rgba(20, 36, 31, 0.1), transparent 36rem),
    linear-gradient(135deg, #f3eee6 0%, #fffcf6 48%, #eef3ef 100%);
}

.app-shell::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(20, 36, 31, 0.034) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 36, 31, 0.034) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.58), transparent 82%);
  content: '';
}

.app-shell__main {
  position: relative;
  z-index: 1;
}
</style>