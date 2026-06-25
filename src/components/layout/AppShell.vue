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
    radial-gradient(circle at 10% 0%, rgba(255, 248, 235, 0.38), transparent 30rem),
    radial-gradient(circle at 92% 8%, rgba(120, 84, 50, 0.12), transparent 36rem),
    linear-gradient(135deg, #d8cdbd 0%, #eee6d9 46%, #f8f2e8 100%);
}

.app-shell::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(43, 41, 35, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(43, 41, 35, 0.032) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.42), transparent 84%);
  content: '';
}

.app-shell__main {
  position: relative;
  z-index: 1;
}
</style>