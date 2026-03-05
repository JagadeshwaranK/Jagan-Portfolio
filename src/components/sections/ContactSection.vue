<template>
  <section id="contact" class="contact-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <!-- <div class="info-items">
            <div class="info-item">
              <div class="icon-container">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-details">
                <h4>Location</h4>
                <p>Madurai, Tamil Nadu</p>
              </div>
            </div>
      </div> -->

      <div class="contact-content">
        <h3 class="contact-heading">Contact Information</h3>
        <div class="contact-info" :class="{ 'visible': isInView }">
          <p>Feel free to reach out to me. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          
          <div class="info-items">
            <div class="info-item">
              <div class="icon-container">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-details">
                <h4>Email</h4>
                <p>jagadesh.k3008@gmail.com</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon-container">
                <i class="fas fa-phone"></i>
              </div>
              <div class="info-details">
                <h4>Phone</h4>
                <p>+917826016047</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <a href="https://www.linkedin.com/in/jagadeshwaran-k-5b504321a/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/JagadeshwaranK" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://x.com/JAGADES68462368?t=sj1YEthbQpmcys5KdAxINg&s=09" target="_blank" rel="noopener noreferrer" title="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/jagadesh_3014?igsh=MWk5OGVuZ2cyYzU2ag==" target="_blank" rel="noopener noreferrer" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>

          <button type="button" class="get-in-touch-btn" @click="openTallyForm">
            <i class="fas fa-paper-plane"></i>
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showTallyModal" class="tally-modal" @click.self="closeTallyForm">
      <div class="tally-modal-content">
        <button type="button" class="tally-close-btn" @click="closeTallyForm" aria-label="Close form">
          <i class="fas fa-times"></i>
        </button>
        <iframe
          :src="tallyFormUrl"
          title="Get in Touch Form"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ContactSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);
    const showTallyModal = ref(false);
    const tallyFormUrl = 'https://tally.so/r/Y5Z8Gz';

    const openTallyForm = () => {
      showTallyModal.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeTallyForm = () => {
      showTallyModal.value = false;
      document.body.style.overflow = 'auto';
    };
    
    const checkIfInView = () => {
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isVisible = 
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.7 && 
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
      document.body.style.overflow = 'auto';
    });
    
    return {
      isInView,
      openTallyForm,
      closeTallyForm,
      showTallyModal,
      tallyFormUrl
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.contact-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  overflow-x: clip;
  
  &.dark-mode {
    background-color: $dark-bg;
  }
}

@media (max-width: $breakpoint-md) {
  .contact-section {
    padding-bottom: calc(120px + env(safe-area-inset-bottom));
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-xxl;
  width: 100%;
  min-width: 0;
}

.contact-heading {
  text-align: center;
  font-size: clamp(1.45rem, 2.2vw, 1.9rem);
  margin-bottom: -$spacing-md;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-self: center;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba($primary-color, 0.24);
  background: linear-gradient(135deg, rgba($primary-color, 0.1), rgba(255, 255, 255, 0.78));
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  letter-spacing: 0.01em;
  max-width: 100%;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $primary-color;
    flex-shrink: 0;
    box-shadow: 0 0 0 4px rgba($primary-color, 0.14);
  }

  .dark-mode & {
    border-color: rgba($primary-color, 0.32);
    background: linear-gradient(135deg, rgba($primary-color, 0.18), rgba(15, 23, 42, 0.76));
    box-shadow: 0 10px 24px rgba(2, 6, 23, 0.4);
  }
}

.contact-info {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba($primary-color, 0.16);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-sm;
  text-align: center;
  min-width: 0;
  overflow-wrap: anywhere;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  > p {
    font-size: $font-size-lg;
    line-height: 1.8;
    margin-bottom: $spacing-xl;
    color: $light-secondary-text;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }

  .dark-mode & {
    background-color: rgba(23, 27, 37, 0.86);
    border-color: rgba($primary-color, 0.28);
  }
}

@media (max-width: $breakpoint-md) {
  .contact-info {
    padding: $spacing-lg;
  }
}

.info-items {
  margin-bottom: $spacing-xl;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-lg;
  min-width: 0;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0;
  text-align: left;
  min-width: 0;
  
  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: $border-radius-full;
    background-color: rgba($primary-color, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $spacing-md;
    flex-shrink: 0;
    
    i {
      color: $primary-color;
      font-size: $font-size-lg;
      
      .dark-mode & {
        color: lighten($primary-color, 10%);
      }
    }
    
    .dark-mode & {
      background-color: rgba($primary-color, 0.2);
    }
  }
  
  .info-details {
    min-width: 0;

    h4 {
      margin-bottom: $spacing-xs;
      color: $light-text;
      font-size: $font-size-base;
      
      .dark-mode & {
        color: $dark-text;
      }
    }
    
    p {
      color: $light-secondary-text;
      margin-bottom: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
      line-height: 1.45;
      
      .dark-mode & {
        color: $dark-secondary-text;
      }
    }
  }
}

.social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: $border-radius-full;
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    transition: all $transition-fast;
    
    &:hover {
      background-color: $primary-color;
      color: white;
      transform: translateY(-5px);
    }
    
    .dark-mode & {
      background-color: rgba($primary-color, 0.2);
      color: lighten($primary-color, 10%);
      
      &:hover {
        background-color: lighten($primary-color, 10%);
        color: $dark-bg;
      }
    }
  }
}

.get-in-touch-btn {
  width: min(100%, 280px);
  margin: 0 auto;
  min-height: 46px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: linear-gradient(135deg, #4b5563, #9ca3af);
  color: #f9fafb;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  cursor: pointer;
  transition: transform $transition-fast, opacity $transition-fast;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  .dark-mode & {
    background: linear-gradient(135deg, #e5e7eb, #cbd5e1);
    color: #111827;
  }
}

.tally-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  padding: $spacing-md;
}

.tally-modal-content {
  width: min(920px, 96vw);
  height: min(86vh, 860px);
  background: #0b0f17;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: $border-radius-lg;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    background: #fff;
  }
}

@media (max-width: $breakpoint-sm) {
  .contact-content {
    gap: $spacing-xl;
  }

  .contact-heading {
    font-size: clamp(1.2rem, 5.4vw, 1.45rem);
    padding: 0.38rem 0.75rem;
    gap: 8px;
  }

  .contact-info {
    padding: $spacing-md;
    border-radius: $border-radius-md;

    > p {
      font-size: $font-size-base;
      line-height: 1.65;
      margin-bottom: $spacing-lg;
    }
  }

  .get-in-touch-btn {
    margin-bottom: 4px;
  }

  .info-items {
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  .info-item {
    justify-content: flex-start;

    .icon-container {
      width: 42px;
      height: 42px;
      margin-right: $spacing-sm;
    }

    .info-details {
      h4 {
        font-size: $font-size-sm;
      }

      p {
        font-size: $font-size-sm;
      }
    }
  }

  .tally-modal {
    padding: $spacing-sm;
  }

  .tally-modal-content {
    width: 100%;
    height: min(92vh, 860px);
    border-radius: $border-radius-md;
  }
}

.tally-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.65);
  color: #fff;
  z-index: 2;
  cursor: pointer;
}

</style>
