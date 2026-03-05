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
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
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
    const mobileMenuOpen = ref(false);
    
    const navItems = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'certifications', label: 'Certifications' },
      { id: 'contact', label: 'Contact' }
    ];
    
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };
    
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
      
      if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
    
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
      document.body.style.overflow = 'auto';
    };
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize on mount
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    
    return {
      isScrolled,
      navItems,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';

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
    
    .mobile-menu-toggle {
      color: $dark-text;
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

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: $font-size-lg;
  cursor: pointer;
  color: $light-text;
  margin-left: $spacing-md;
  
  &:focus {
    outline: none;
  }
}

@media (max-width: $breakpoint-md) {
  .navbar-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 0;
    background-color: $light-bg;
    transition: all $transition-normal;
    overflow: hidden;
    
    &.active {
      height: calc(100vh - 70px);
    }
    
    .dark-mode & {
      background-color: $dark-bg;
    }
  }
  
  .navbar-links {
    flex-direction: column;
    padding: $spacing-xl;
    
    li {
      margin: $spacing-md 0;
      margin-left: 0;
      
      a {
        display: block;
        font-size: $font-size-lg;
        padding: $spacing-md 0;
      }
    }
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
</style>
