<template>
  <header class="app-header">
    <div class="page-container app-header__content">
      <a class="app-header__brand" href="#">
        <span class="app-header__mark">A</span>
        <span>Anaxágoras</span>
      </a>

      <nav class="app-header__nav" aria-label="Navegación principal">
        <a href="#method">Método</a>
        <a href="#calculator">Calculadora</a>
        <a href="#design">Diseño</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(229, 225, 216, 0.7);
  background: rgba(247, 244, 239, 0.78);
  backdrop-filter: blur(18px);
}

.app-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
}

.app-header__brand {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.app-header__mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 900;
}

.app-header__nav {
  display: flex;
  gap: 28px;
  align-items: center;
  color: var(--color-muted);
  font-size: 0.92rem;
  font-weight: 700;
}

.app-header__nav a {
  transition: color 0.2s ease;
}

.app-header__nav a:hover {
  color: var(--color-primary);
}

@media (max-width: 720px) {
  .app-header__nav {
    display: none;
  }
}
</style>