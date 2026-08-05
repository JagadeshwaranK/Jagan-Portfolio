<template>
  <section id="about" class="about-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>About Me</h2>
      </div>
      
      <div class="about-content">
        <!-- <div class="about-image" :class="{ 'visible': isInView }">
          <div class="image-container">
            <img src="@/assets/images/Jagadesh.jpg" alt="Jagadeshwaran K" class="profile-image" />
          </div>
        </div> -->
        
        <div class="about-text" :class="{ 'visible': isInView }">
          <h3>Hello, I'm <span class="highlight">Jagadeshwaran</span></h3>
          <p class="subtitle">Associate Software Engineer </p>
          
          <p>
            I enjoy building digital products that feel fast, clear, and dependable. My core stack is
            <span class="copy-highlight">React</span>, <span class="copy-highlight">Next.js</span>, and
            <span class="copy-highlight">TypeScript</span>, and I focus on writing code that is easy to maintain as products grow.
          </p>
          <p>
            At Glancito, I worked on improving storefront speed and overall UX by optimizing load behavior, building reusable components, and developing
            <span class="copy-highlight">Shopify</span> features in <span class="copy-highlight">Liquid</span>. I also handled plugin and
            <span class="copy-highlight">checkout page integrations</span> to ensure a smooth buying experience.
          </p>
          <p>
            At Cognizant, I delivered enterprise workflows in Pega, improved process reliability, and supported integrations across business systems.
          </p>
          <p>
            I care about outcomes as much as implementation: <span class="copy-highlight">performance</span>,
            <span class="copy-highlight">scalability</span>, <span class="copy-highlight">security</span>,
            and smooth <span class="copy-highlight">team collaboration</span> to ship production-ready features with confidence.
          </p>
          
          <div class="about-actions" :class="{ 'visible': isInView }">
            <router-link to="/contact" class="btn about-btn about-btn-primary">
              <i class="fas fa-comment-dots"></i>
              <span>Get In Touch</span>
            </router-link>
            <a href="/assets/JAGADESHWARAN%20K.pdf" download="JAGADESHWARAN K.pdf" class="btn about-btn about-btn-secondary">
              <i class="fas fa-file-arrow-down"></i>
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'AboutSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);
    
    const checkIfInView = () => {
      const aboutSection = document.getElementById('about');
      
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = 
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
          rect.bottom >= 0;
        
        isInView.value = isVisible;
      }
    };
    
    onMounted(() => {
      window.addEventListener('scroll', checkIfInView);
      window.addEventListener('resize', checkIfInView);
      
      // Initial check
      checkIfInView();
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', checkIfInView);
      window.removeEventListener('resize', checkIfInView);
    });
    
    return {
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
.about-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
    
    .profile-placeholder {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .highlight {
      color: color.adjust($primary-color, $lightness: 10%);
    }
  }
}

.about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-xxl;
  justify-items: center;
}

.about-image {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .image-container {
    width: 80%;
    height: 460px;
    max-width: 400px;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow-lg;
    position: relative;
    transition: transform $transition-normal;
    
    &:hover {
      transform: translateY(-10px);
    }
  
    .profile-image {
    width: 100%;
    height: auto;
}
    .profile-placeholder {
      width: 100%;
      height: auto;
      display: block;
      background-color: #f8f9fa;
      box-shadow: 0 10px 30px rgba(100, 100, 100, 0.2);
      border-radius: $border-radius-lg;
    }
  }
}

.about-text {
  max-width: 860px;
  margin: 0 auto;
  text-align: left;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  h3 {
    font-size: $font-size-xl;
    margin-bottom: $spacing-sm;
    
    .highlight {
      color: $primary-color;
      font-weight: 700;
    }
  }
  
  .subtitle {
    font-size: $font-size-lg;
    color: $light-secondary-text;
    margin-bottom: $spacing-lg;
    font-weight: 500;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
  
  p {
    margin-bottom: $spacing-md;
    line-height: 1.8;
  }

  .copy-highlight {
    color: $primary-color;
    font-weight: 600;

    .dark-mode & {
      color: color.adjust($primary-color, $lightness: 10%);
    }
  }
}

.about-actions {
  display: flex;
  justify-content: flex-start;
  gap: $spacing-md;
  flex-wrap: wrap;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    
    .about-btn {
      width: 100%;
      max-width: 100%;
      text-align: center;
    }

    .about-btn-primary {
      color: #f9fafb;
    }
  }
}

.about-btn {
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
  text-decoration: none;
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

.about-btn-primary {
  background: #4b5563;
  color: #f9fafb;
  box-shadow: none;
}

.about-btn-secondary {
  background: transparent;
  border-color: #6b7280;
  color: #374151;
}

.about-btn-primary:hover {
  color: #f9fafb;
}

.about-btn-secondary:hover {
  color: #374151;
}

.dark-mode .about-btn-primary:hover {
  color: #111827;
}

.dark-mode .about-btn-secondary:hover {
  color: #e5e7eb;
}

.dark-mode .about-btn-primary {
  background: #e5e7eb;
  color: #111827;
}

.dark-mode .about-btn-secondary {
  background: transparent;
  border-color: #9ca3af;
  color: #e5e7eb;
}

</style>
