<template>
  <section id="home" class="home-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container home-content">
      <div class="greeting-text" :class="{ 'fade-in': isVisible }">
        <span>Hello, I'm</span>
      </div>
      <h1 class="name-text" :class="{ 'fade-in': isVisible }">JAGADESHWARAN</h1>
      <div class="auto-type" :class="{ 'fade-in': isVisible }">
        <span ref="typeTarget"></span>
      </div>
      <div class="actions" :class="{ 'fade-in': isVisible }">
        <router-link to="/contact" class="btn home-btn home-btn-primary">
          <i class="fas fa-paper-plane"></i>
          <span>Contact Me</span>
        </router-link>
        <router-link to="/about" class="btn home-btn home-btn-secondary">
          <i class="fas fa-user-circle"></i>
          <span>Learn More</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import TypeIt from 'typeit';

export default {
  name: 'HomeSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const typeTarget = ref(null);
    const isVisible = ref(false);
    let typeInstance = null;
    
    // Array of job titles for auto typing
    const jobTitles = [
      'Associate Software Engineer',
      'Pega Developer',
      'Shopify Developer',
      'Web Developer',
      'Tech Enthusiast'
    ];
    
    const initTypeIt = () => {
      if (typeTarget.value) {
        typeInstance = new TypeIt(typeTarget.value, {
          speed: 50,
          waitUntilVisible: true,
          loop: true,
          cursorChar: "|"
        });
        
        // Add strings with pauses and deletions
        jobTitles.forEach((title, index) => {
          typeInstance
            .type(title)
            .pause(2000)
            .delete();
          
          // Don't add a pause after the last item
          if (index < jobTitles.length - 1) {
            typeInstance.pause(300);
          }
        });
        
        typeInstance.go();
      }
    };
    
    const checkVisibility = () => {
      isVisible.value = window.scrollY < 300;
    };
    
    onMounted(() => {
      initTypeIt();
      isVisible.value = true;
      window.addEventListener('scroll', checkVisibility);
    });
    
    onUnmounted(() => {
      if (typeInstance) {
        typeInstance.destroy();
      }
      window.removeEventListener('scroll', checkVisibility);
    });

    return {
      typeTarget,
      isVisible
    };
  }
};
</script>

<style lang="scss" scoped>
.home-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background: $light-bg;
  
  &.dark-mode {
    background: $dark-bg;

    .greeting-text {
      color: $dark-secondary-text;
    }
    
    .auto-type {
      color: #d1d5db;
    }
  }
}

.home-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.greeting-text {
  font-size: $font-size-lg;
  color: $light-secondary-text;
  margin-bottom: $spacing-md;
  animation-delay: 0.3s;
}

.name-text {
  font-size: clamp($font-size-xxl, 6vw, 5rem);
  font-weight: 700;
  color: $light-text;
  margin-bottom: $spacing-md;
  animation-delay: 0.6s;

  .dark-mode & {
    color: $dark-text;
  }
}

.auto-type {
  font-size: clamp($font-size-xl, 4vw, $font-size-xxl);
  color: #374151;
  margin-bottom: $spacing-xxl;
  font-weight: 500;
  min-height: 50px;
  animation-delay: 0.9s;
  
  span {
    display: inline-block;
  }
}

.actions {
  display: flex;
  gap: $spacing-md;
  align-items: center;
  flex-wrap: wrap;
  animation-delay: 1.2s;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    width: 100%;
    
    .home-btn {
      width: 100%;
      max-width: 100%;
      text-align: center;
    }
  }

  .btn {
    text-decoration: none;
  }
}

.home-btn {
  display: inline-flex;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  transition: transform $transition-fast, opacity $transition-fast;

  i {
    font-size: $font-size-base;
    flex-shrink: 0;
  }

  span {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  &:hover {
    transform: translateY(-2px);
    opacity: 0.94;
  }
}

.home-btn-primary {
  background: #4b5563;
  color: #f9fafb;
  box-shadow: none;
}

.home-btn-secondary {
  background: transparent;
  border-color: #6b7280;
  color: #374151;

  &:hover {
    color: #374151;
  }
}

.home-btn-primary:hover {
  color: #f9fafb;
}

.dark-mode .home-btn-primary:hover {
  color: #111827;
}

.dark-mode .home-btn-primary {
  background: #e5e7eb;
  color: #111827;
}

.dark-mode .home-btn-secondary {
  background: transparent;
  border-color: #9ca3af;
  color: #e5e7eb;

  &:hover {
    color: #e5e7eb;
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
