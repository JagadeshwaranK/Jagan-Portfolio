<template>
  <nav class="bottom-nav" :class="{ 'is-visible': isVisible, 'dark-mode': isDarkMode }">
    <div class="bottom-nav__container">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="bottom-nav__item"
        :data-hint="item.label"
        :aria-label="item.label"
      >
        <span class="bottom-nav__icon">
          <i :class="item.icon"></i>
        </span>
        <span class="bottom-nav__label">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'BottomNav',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isVisible = ref(false);

    const navItems = [
      { path: '/', label: 'Home', icon: 'fas fa-home' },
      { path: '/about', label: 'About', icon: 'fas fa-user' },
      { path: '/experience', label: 'Experience', icon: 'fas fa-briefcase' },
      { path: '/skills', label: 'Skills', icon: 'fas fa-laptop-code' },
      { path: '/projects', label: 'Projects', icon: 'fas fa-rocket' },
      { path: '/certifications', label: 'Certifications', icon: 'fas fa-award' },
      { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
    ];

    onMounted(() => {
      isVisible.value = true;
    });

    return {
      navItems,
      isVisible
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 120;
  padding: 10px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity $transition-normal, transform $transition-normal;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.bottom-nav__container {
  max-width: 390px;
  width: min(100%, 390px);
  margin: 0 auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(14px);
}

.bottom-nav__item {
  min-width: 0;
  flex: 1 1 0;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 2px;
  border-radius: 999px;
  position: relative;
  text-decoration: none;
  color: $light-secondary-text;
  transition: background-color $transition-fast, color $transition-fast, width 0.28s cubic-bezier(0.22, 1, 0.36, 1), padding 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.bottom-nav__icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 16px;
  }
}

.bottom-nav__label {
  font-size: 0;
  line-height: 1;
  font-weight: 600;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translateX(-4px);
  transition: max-width 0.25s ease, opacity 0.2s ease, transform 0.25s ease, font-size 0.2s ease;
}

.bottom-nav__item:hover {
  color: $light-text;
  background: rgba(15, 23, 42, 0.08);
}

.bottom-nav__item.router-link-exact-active {
  flex-grow: 1.9;
  gap: 6px;
  padding: 0 8px;
  color: #ffffff;
  background: #111827;
}

.bottom-nav__item.router-link-exact-active .bottom-nav__label {
  font-size: 12px;
  line-height: 1;
  max-width: 90px;
  opacity: 1;
  transform: translateX(0);
}

.bottom-nav__item::after {
  content: attr(data-hint);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: rgba(12, 12, 14, 0.95);
  color: #fff;
  font-size: 10px;
  line-height: 1;
  font-weight: 600;
  padding: 5px 8px;
  border-radius: 7px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.bottom-nav__item::before {
  content: '';
  position: absolute;
  bottom: calc(100% + 3px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  border: 4px solid transparent;
  border-top-color: rgba(12, 12, 14, 0.95);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.bottom-nav__item:hover::after,
.bottom-nav__item:hover::before,
.bottom-nav__item:focus-visible::after,
.bottom-nav__item:focus-visible::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.bottom-nav__item.router-link-exact-active::after,
.bottom-nav__item.router-link-exact-active::before {
  display: none;
}

.bottom-nav.dark-mode .bottom-nav__container {
  background: rgba(8, 8, 10, 0.96);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.42);
}

.bottom-nav.dark-mode .bottom-nav__item {
  color: rgba(255, 255, 255, 0.92);
}

.bottom-nav.dark-mode .bottom-nav__item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 1);
}

.bottom-nav.dark-mode .bottom-nav__item.router-link-exact-active {
  color: #16181d;
  background: #f4f5f7;
}

@media (max-width: 768px) {
  .bottom-nav {
    padding: 8px;
  }

  .bottom-nav__container {
    padding: 4px;
  }

  .bottom-nav__item {
    min-width: 0;
    height: 34px;
  }

  .bottom-nav__icon {
    width: 15px;
    height: 15px;

    i {
      font-size: 15px;
    }
  }

  .bottom-nav__item.router-link-exact-active .bottom-nav__label {
    font-size: 11px;
  }

  .bottom-nav__item.router-link-exact-active {
    flex-grow: 2;
    padding: 0 7px;
  }
}

@media (max-width: 480px) {
  .bottom-nav {
    padding: 6px;
  }

  .bottom-nav__container {
    padding: 4px;
  }

  .bottom-nav__item {
    min-width: 0;
    height: 30px;
  }

  .bottom-nav__icon {
    width: 13px;
    height: 13px;

    i {
      font-size: 13px;
    }
  }

  .bottom-nav__item.router-link-exact-active .bottom-nav__label {
    font-size: 10px;
  }

  .bottom-nav__item.router-link-exact-active {
    flex-grow: 1.8;
    padding: 0 6px;
  }

  .bottom-nav__item::after {
    font-size: 9px;
    padding: 4px 7px;
  }
}

@media (hover: none) {
  .bottom-nav__item::after,
  .bottom-nav__item::before {
    display: none;
  }
}
</style>
