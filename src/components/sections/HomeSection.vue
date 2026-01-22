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
        <a href="#contact" class="btn btn-outline">Contact Me</a>
        <a href="#about" class="btn btn-outline">Learn More</a>
      </div>
      <div class="scroll-down">
        <a href="#about">
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>
    
    <div class="home-background">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
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
      // Initialize auto typing animation
      initTypeIt();
      
      // Set initial visibility
      isVisible.value = true;
      
      // Add scroll event for animations
      window.addEventListener('scroll', checkVisibility);
    });
    
    onUnmounted(() => {
      // Clean up TypeIt instance
      if (typeInstance) {
        typeInstance.destroy();
      }
      
      // Remove event listener
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
@import '../../assets/styles/variables';

.home-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  
  &.dark-mode {
    .greeting-text {
      color: $dark-secondary-text;
    }
    
    .name-text {
      color: $dark-text;
    }
    
    .auto-type {
      color: lighten($primary-color, 10%);
    }
    
    .shape {
      opacity: 0.2;
    }
    
    .scroll-down a {
      color: $dark-secondary-text;
      
      &:hover {
        color: $dark-text;
      }
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
  background: linear-gradient(45deg, $primary-color, $secondary-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: $spacing-md;
  animation-delay: 0.6s;
}

.auto-type {
  font-size: clamp($font-size-xl, 4vw, $font-size-xxl);
  color: $primary-color;
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
  animation-delay: 1.2s;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    width: 100%;
    
    .btn {
      width: 100%;
      text-align: center;
    }
  }

  .dark-mode & {
    .btn {
      color: $light-text;
    }
  }
}

.scroll-down {
  position: absolute;
  bottom: $spacing-xxl;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  
  a {
    display: block;
    text-align: center;
    font-size: $font-size-xl;
    color: $light-secondary-text;
    transition: color $transition-fast;
    
    &:hover {
      color: $primary-color;
    }
  }
}

.home-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  
  &.shape-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(45deg, rgba($primary-color, 0.4), rgba($secondary-color, 0.4));
    top: -200px;
    right: -200px;
    animation: floatAnimation 8s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, rgba($secondary-color, 0.4), rgba($accent-color, 0.4));
    bottom: -100px;
    left: -100px;
    animation: floatAnimation 10s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba($accent-color, 0.4), rgba($primary-color, 0.4));
    top: 50%;
    left: 60%;
    animation: floatAnimation 12s ease-in-out infinite;
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(15px, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
