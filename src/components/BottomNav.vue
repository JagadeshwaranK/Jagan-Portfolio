<template>
  <nav class="dock-nav" :class="{ 'visible': isVisible }">
    <div class="dock-container">
      <router-link
        v-for="(item, index) in navItems"
        :key="item.path"
        :to="item.path"
        class="dock-item"
        :class="{ 'active': isActive(item.path) }"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div class="dock-label">{{ item.label }}</div>
        <div class="dock-icon">
          <i :class="item.icon"></i>
        </div>
        <div class="dock-indicator" v-if="isActive(item.path)"></div>
      </router-link>
    </div>

    <!-- Tooltip -->
    <div
      class="dock-tooltip"
      v-if="tooltip.visible"
      :style="{ left: tooltip.x + 'px' }"
    >
      {{ tooltip.text }}
    </div>
  </nav>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'BottomNav',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const route = useRoute();
    const isVisible = ref(true);
    const lastScrollY = ref(0);

    const navItems = [
      { path: '/', label: 'Home', icon: 'fas fa-home' },
      { path: '/about', label: 'About', icon: 'fas fa-user' },
      { path: '/experience', label: 'Experience', icon: 'fas fa-briefcase' },
      { path: '/skills', label: 'Skills', icon: 'fas fa-code' },
      { path: '/projects', label: 'Projects', icon: 'fas fa-project-diagram' },
      { path: '/certifications', label: 'Certifications', icon: 'fas fa-certificate' },
      { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
    ];

    const tooltip = reactive({
      visible: false,
      text: '',
      x: 0
    });

    const isActive = (path) => {
      return route.path === path;
    };

    const showTooltip = (text, event) => {
      const dockItem = event.currentTarget;
      const rect = dockItem.getBoundingClientRect();
      const dockRect = dockItem.closest('.dock-container').getBoundingClientRect();

      tooltip.text = text;
      tooltip.x = rect.left + rect.width / 2 - dockRect.left;
      tooltip.visible = true;
    };

    const hideTooltip = () => {
      tooltip.visible = false;
    };

    onMounted(() => {
      // Initially visible
      isVisible.value = true;
    });

    onUnmounted(() => {
      // No cleanup needed
    });

    return {
      navItems,
      isActive,
      isVisible,
      tooltip,
      showTooltip,
      hideTooltip
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.dock-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
}

.dock-container {
  max-width: 380px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 6px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .dark-mode & {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  }
}

.expand-btn, .collapse-btn {
  background: none;
  border: none;
  color: $light-secondary-text;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 0 4px;

  &:hover {
    background: rgba($primary-color, 0.1);
    color: $primary-color;
  }

  .dark-mode & {
    color: $dark-secondary-text;

    &:hover {
      background: rgba($primary-color, 0.2);
      color: lighten($primary-color, 10%);
    }
  }
}

.dock-item {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 6px;
  margin: 0 2px;
  border-radius: 10px;
  text-decoration: none;
  color: $light-secondary-text;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: dockSlideUp 0.6s ease backwards;

  &:hover {
    color: $primary-color;
    transform: translateY(-6px);

    .dock-icon {
      transform: scale(1.1);
      background: transparent;

      i {
        transform: scale(1.1);
      }
    }
  }

  &.active {
    color: $primary-color;

    .dock-icon {
      background: transparent;
      color: $primary-color;
      box-shadow: none;
    }
  }

  .dark-mode & {
    color: $dark-secondary-text;

    &:hover {
      color: lighten($primary-color, 10%);
    }

    &.active {
      color: lighten($primary-color, 10%);
    }
  }
}

.dock-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  background: transparent;
  transition: all 0.3s ease;

  i {
    font-size: 20px;
    transition: all 0.3s ease;
  }

  .dark-mode & {
    background: transparent;
  }
}

.dock-label {
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 11px;
  font-weight: 500;
  text-align: left;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  z-index: 10;
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.3s ease;
  pointer-events: none;

  .dark-mode & {
    background: rgba(26, 32, 44, 0.9);
    color: white;
  }
}

.dock-item:hover .dock-label {
  opacity: 1;
  transform: translateY(0);
}

.dock-indicator {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: $primary-color;
  animation: indicatorPulse 2s infinite;

  .dark-mode & {
    background: lighten($primary-color, 10%);
  }
}

.dock-tooltip {
  position: absolute;
  bottom: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  color: $light-text;
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: tooltipFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-50%);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .dark-mode & {
    background: rgba(26, 32, 44, 0.95);
    color: $dark-text;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &::after {
      border-top-color: rgba(26, 32, 44, 0.95);
    }
  }
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes dockSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes indicatorPulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1.2);
  }
}

// Mobile responsive
@media (max-width: 768px) {
  .dock-nav {
    padding: 12px;
  }

  .dock-container {
    padding: 8px;
    border-radius: 20px;
  }

  .dock-item {
    padding: 6px 8px;
    margin: 0 2px;
  }

  .dock-icon {
    width: 40px;
    height: 40px;

    i {
      font-size: 18px;
    }
  }

  .dock-label {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .dock-nav {
    padding: 8px;
  }

  .dock-container {
    padding: 6px;
  }

  .dock-item {
    padding: 4px 6px;
    margin: 0 1px;
  }

  .dock-icon {
    width: 36px;
    height: 36px;

    i {
      font-size: 16px;
    }
  }

  .dock-label {
    font-size: 9px;
  }
}
</style>
