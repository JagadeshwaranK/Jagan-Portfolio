<template>
  <nav class="navbar" :class="{ 'dark-mode': isDarkMode, 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <div class="navbar-logo">
        <span>JAGADESHWARAN K</span>
      </div>
      
      <!-- Navbar menu ignored as per requirements -->
      <!-- <div class="navbar-menu" :class="{ 'active': mobileMenuOpen }">
        <ul class="navbar-links">
          <li v-for="item in navItems" :key="item.id">
            <a :href="`#${item.id}`" @click="closeMobileMenu">{{ item.label }}</a>
          </li>
        </ul>
      </div> -->
      
      <div class="navbar-actions">
        <DarkModeToggle :isDarkMode="isDarkMode" @toggle="$emit('toggle-dark-mode')" />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import DarkModeToggle from './ui/DarkModeToggle.vue';

export default {
  name: 'TheNavbar',
  components: {
    DarkModeToggle
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-dark-mode'],
  setup() {
    const isScrolled = ref(false);
    
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize on mount
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    
    return {
      isScrolled
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  --nav-logo-gradient: linear-gradient(110deg, #111111 8%, #4b5563 34%, #0f172a 56%, #6b7280 78%, #0b0b0b 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: $spacing-md 0;
  z-index: $z-index-navbar;
  transition: all $transition-normal;
  background-color: rgba($light-bg, 0.9);
  backdrop-filter: blur(10px);
  
  &.scrolled {
    box-shadow: $shadow-md;
    height: 60px;
  }
  
  &.dark-mode {
    --nav-logo-gradient: linear-gradient(110deg, #ffffff 8%, #f8fafc 34%, #e5e7eb 52%, #ffffff 72%, #f1f5f9 100%);
    background-color: rgba($dark-bg, 0.9);
    
    &.scrolled {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    
    .navbar-logo {
      color: $dark-text;
    }
    
    .navbar-links a {
      color: $dark-secondary-text;
      
      &:hover {
        color: $dark-text;
      }
    }
    
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar-logo {
  font-size: $font-size-xl;
  font-weight: 700;
  color: $light-text;
  
  span {
    background: var(--nav-logo-gradient);
    background-size: 240% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: navLogoShine 6s linear infinite;
  }
}

@keyframes navLogoShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 220% 50%;
  }
}

.navbar-links {
  display: flex;
  list-style: none;
  
  li {
    margin-left: $spacing-lg;
    
    a {
      color: $light-secondary-text;
      text-decoration: none;
      font-weight: 500;
      transition: color $transition-fast;
      position: relative;
      
      &:hover {
        color: $light-text;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $primary-color;
        transition: width $transition-normal;
      }
      
      &:hover::after {
        width: 100%;
      }
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
}
</style>
