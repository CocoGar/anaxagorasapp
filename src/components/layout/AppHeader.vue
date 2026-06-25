<template>
  <header class="app-header">
    <div class="page-container app-header__content">
      <a class="app-header__brand" href="#">
        <span class="app-header__mark">
          <span>A</span>
        </span>

        <span class="app-header__brand-text">
          <strong>Anaxágoras</strong>
          <small>Sistema proporcional</small>
        </span>
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
  z-index: 20;
  border-bottom: 1px solid rgba(20, 36, 31, 0.1);
  background: rgba(255, 252, 246, 0.86);
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
  color: var(--color-primary);
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
  gap: 34px;
  align-items: center;
}

.app-header__nav a {
  position: relative;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.app-header__nav a::after {
  position: absolute;
  right: 0;
  bottom: -10px;
  left: 0;
  height: 1px;
  background: var(--color-accent);
  opacity: 0;
  transform: scaleX(0.35);
  transform-origin: center;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  content: '';
}

.app-header__nav a:hover {
  transform: translateY(-1px);
  color: var(--color-primary);
}

.app-header__nav a:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

@media (max-width: 760px) {
  .app-header__content {
    min-height: 70px;
  }

  .app-header__brand-text small {
    display: none;
  }

  .app-header__nav {
    display: none;
  }
}
</style>