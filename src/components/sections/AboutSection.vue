<template>
  <section id="about" class="about-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>About Me</h2>
      </div>
      
      <div class="about-content">
        <div class="about-image" :class="{ 'visible': isInView }">
          <div class="image-container">
            <img src="@/assets/images/Jagadesh.jpg" alt="Jagadeshwaran K" class="profile-image" />
          </div>
        </div>
        
        <div class="about-text" :class="{ 'visible': isInView }">
          <h3>Hello, I'm <span class="highlight">Jagadeshwaran</span></h3>
          <p class="subtitle">Associate Software Engineer & Pega Developer </p>
          
          <p>
            I'm a passionate software engineer and Pega developer with expertise in creating 
            robust, user-friendly applications. With a strong foundation in software design principles
            and a keen eye for detail, I strive to develop solutions that are not only functional
            but also intuitive and elegant.
          </p>
        
          
          <div class="personal-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span>jagadesh.k3008@gmail.com</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span>+91 782606047</span>
            </div>
          </div>
          
          <div class="about-actions" :class="{ 'visible': isInView }">
            <a href="#contact" class="btn btn-outline">Get In Touch</a>
            <a href="/assets/resume.pdf" download="JAGADESHWARAN K_SOFTWARE ENGINEER.pdf" class="btn btn-outline">Download CV</a>
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
@import '../../assets/styles/variables';

.about-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
    
    .profile-placeholder {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .highlight {
      color: lighten($primary-color, 10%);
    }
    
    .info-item {
      i {
        color: lighten($primary-color, 10%);
      }
      
      span {
        color: $dark-secondary-text;
      }
    }
  }
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxl;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
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
}

.personal-info {
  margin: $spacing-xl 0;
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-md;
    
    i {
      width: 30px;
      color: $primary-color;
      font-size: $font-size-lg;
    }
    
    span {
      color: $light-secondary-text;
    }
  }
}

.about-actions {
  display: flex;
  gap: $spacing-md;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    
    .btn {
      width: 100%;
      text-align: center;
      color: $light-text;
    }
  }

  .btn {
    color: inherit;
  }

  .dark-mode & {
    .btn {
      color: $light-text;
    }
  }
}
</style>
