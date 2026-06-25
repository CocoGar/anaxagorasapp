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
  border-bottom: 1px solid rgba(20, 36, 31, 0.1);
  background: rgba(255, 252, 246, 0.88);
  backdrop-filter: blur(22px);
}

.app-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
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
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(183, 138, 82, 0.58);
  background: var(--color-primary);
  color: var(--color-accent-muted);
  font-size: 0.86rem;
  font-weight: 900;
}

.app-header__mark::before,
.app-header__mark::after {
  position: absolute;
  width: 11px;
  height: 11px;
  border-color: rgba(214, 184, 134, 0.72);
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
  gap: 2px;
  text-align: left;
}

.app-header__brand-text strong {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.02em;
}

.app-header__brand-text small {
  color: var(--color-muted);
  font-size: 0.66rem;
  font-weight: 760;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.app-header__nav {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 5px;
  border: 1px solid rgba(20, 36, 31, 0.1);
  background: rgba(255, 252, 246, 0.58);
}

.app-header__nav-link {
  position: relative;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.16em;
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
  border-color: rgba(183, 138, 82, 0.38);
  background: rgba(183, 138, 82, 0.12);
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