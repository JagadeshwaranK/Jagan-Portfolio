<template>
  <button class="dark-mode-toggle" @click="$emit('toggle')" :title="toggleTitle">
    <div class="toggle-icon">
      <i :class="iconClass"></i>
    </div>
  </button>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'DarkModeToggle',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle'],
  setup(props) {
    const iconClass = computed(() => props.isDarkMode ? 'fas fa-sun' : 'fas fa-moon');
    const toggleTitle = computed(() => props.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    
    return {
      iconClass,
      toggleTitle
    };
  }
};
</script>

<style lang="scss" scoped>
.dark-mode-toggle {
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: $border-radius-full;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color $transition-fast, transform $transition-fast;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba($primary-color, 0.1);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
  
  .toggle-icon {
    position: relative;
    transition: transform 0.5s ease;
    
    i {
      font-size: $font-size-lg;
      color: $light-text;
      transition: color $transition-fast;
      
      .dark-mode & {
        color: $dark-text;
      }
    }
  }
  
  .dark-mode & {
    .toggle-icon {
      transform: rotate(360deg);
    }
    
    &:hover {
      background-color: rgba($light-text, 0.1);
    }
  }
}
</style>
