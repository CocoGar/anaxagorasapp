<script setup>
defineProps({
  activePage: {
    type: String,
    default: 'home'
  }
});

const emit = defineEmits(['navigate']);

function handleNavigate(pageId) {
  emit('navigate', pageId);
}
</script>

<template>
  <header class="app-header">
    <div class="page-container app-header__content">
      <button
        class="app-header__brand"
        type="button"
        @click="handleNavigate('home')"
      >
        <span class="app-header__mark">
          <span>A</span>
        </span>

        <span class="app-header__brand-text">
          <strong>Anaxágoras</strong>
          <small>Sistema proporcional</small>
        </span>
      </button>

      <nav class="app-header__nav" aria-label="Navegación principal">
        <button
          type="button"
          :class="{ 'app-header__nav-link--active': activePage === 'home' }"
          class="app-header__nav-link"
          @click="handleNavigate('home')"
        >
          Home
        </button>

        <button
          type="button"
          :class="{ 'app-header__nav-link--active': activePage === 'calculator' }"
          class="app-header__nav-link"
          @click="handleNavigate('calculator')"
        >
          Calculadora
        </button>

        <button
          type="button"
          :class="{ 'app-header__nav-link--active': activePage === 'design' }"
          class="app-header__nav-link"
          @click="handleNavigate('design')"
        >
          Diseño
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(43, 41, 35, 0.12);
  background: rgba(248, 242, 232, 0.82);
  backdrop-filter: blur(22px);
}

.app-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 74px;
}

.app-header__brand {
  display: inline-flex;
  gap: 14px;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
}

.app-header__brand:focus-visible,
.app-header__nav-link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.app-header__mark {
  position: relative;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(169, 120, 73, 0.5);
  background: rgba(43, 41, 35, 0.92);
  color: #e7c89e;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.app-header__mark::before,
.app-header__mark::after {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: rgba(231, 200, 158, 0.68);
  content: '';
}

.app-header__mark::before {
  top: 5px;
  left: 5px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.app-header__mark::after {
  right: 5px;
  bottom: 5px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.app-header__brand-text {
  display: grid;
  gap: 1px;
  text-align: left;
}

.app-header__brand-text strong {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: 1.24rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.app-header__brand-text small {
  color: var(--color-muted);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.app-header__nav {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 4px;
  border: 1px solid rgba(43, 41, 35, 0.1);
  background: rgba(248, 242, 232, 0.5);
}

.app-header__nav-link {
  position: relative;
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.app-header__nav-link:hover {
  transform: translateY(-1px);
  color: var(--color-primary);
}

.app-header__nav-link--active {
  border-color: rgba(169, 120, 73, 0.32);
  background: rgba(169, 120, 73, 0.1);
  color: var(--color-primary);
}

@media (max-width: 760px) {
  .app-header__content {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    padding: 14px 0;
  }

  .app-header__nav {
    width: 100%;
    overflow-x: auto;
  }

  .app-header__nav-link {
    flex: 1;
    min-width: fit-content;
  }
}
</style>