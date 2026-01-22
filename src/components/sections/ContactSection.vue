<template>
  <section id="contact" class="contact-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Get In Touch</h2>
      </div>
      
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
        <div class="contact-info" :class="{ 'visible': isInView }">
          <h3>Contact Information</h3>
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
        </div>
        
        <div class="contact-form" :class="{ 'visible': isInView }">
          <h3>Send Message</h3>
          <form
            @submit.prevent="submitForm"
          >
            
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                v-model="formData.name" 
                required 
                placeholder="Your Name"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                v-model="formData.email" 
                required 
                placeholder="Your Email"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                v-model="formData.subject" 
                required 
                placeholder="Subject"
              >
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                name="message"
                v-model="formData.message" 
                required 
                placeholder="Your Message"
              ></textarea>
            </div>

            <button type="submit" class="btn" :disabled="isSubmitting">
              <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
          
          <div v-if="formStatus.show" class="form-status" :class="{ 'success': formStatus.success }">
            {{ formStatus.message }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

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
    const isSubmitting = ref(false);
    
    const formData = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    const formStatus = reactive({
      show: false,
      success: false,
      message: ''
    });
    
    const submitForm = async () => {
      // Set submitting state
      isSubmitting.value = true;

      try {
        // Send form data to Vercel API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Show success message
          formStatus.show = true;
          formStatus.success = true;
          formStatus.message = result.message || 'Your message has been sent successfully!';

          // Reset form
          formData.name = '';
          formData.email = '';
          formData.subject = '';
          formData.message = '';
        } else {
          // Show error message
          formStatus.show = true;
          formStatus.success = false;
          formStatus.message = result.error || 'There was a problem sending your message. Please try again.';
        }

        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.show = false;
        }, 5000);
      } catch (error) {
        // Show error message for network issues
        formStatus.show = true;
        formStatus.success = false;
        formStatus.message = 'There was a problem sending your message. Please try again.';

        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.show = false;
        }, 5000);
      } finally {
        // Reset submitting state
        isSubmitting.value = false;
      }
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
    });
    
    return {
      isInView,
      formData,
      isSubmitting,
      formStatus,
      submitForm
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.contact-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-xxl;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.contact-info {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  h3 {
    margin-bottom: $spacing-md;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: $primary-color;
      
      .dark-mode & {
        background-color: lighten($primary-color, 10%);
      }
    }
  }
  
  > p {
    margin-bottom: $spacing-xl;
    color: $light-secondary-text;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
}

.info-items {
  margin-bottom: $spacing-xl;
}

.info-item {
  display: flex;
  margin-bottom: $spacing-lg;
  
  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: $border-radius-full;
    background-color: rgba($primary-color, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $spacing-md;
    
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
      
      .dark-mode & {
        color: $dark-secondary-text;
      }
    }
  }
}

.social-links {
  display: flex;
  gap: $spacing-md;
  
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

.contact-form {
  background-color: $light-card-bg;
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-md;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  h3 {
    margin-bottom: $spacing-lg;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: $primary-color;
      
      .dark-mode & {
        background-color: lighten($primary-color, 10%);
      }
    }
  }
  
  .dark-mode & {
    background-color: $dark-card-bg;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .form-group {
    margin-bottom: $spacing-md;
    
    label {
      display: block;
      margin-bottom: $spacing-xs;
      color: $light-text;
      font-weight: 500;
      
      .dark-mode & {
        color: $dark-text;
      }
    }
  }
  
  button {
    width: 100%;
    padding: $spacing-md;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.form-status {
  margin-top: $spacing-md;
  padding: $spacing-md;
  border-radius: $border-radius-md;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
  
  &.success {
    background-color: #d4edda;
    color: #155724;
    
    .dark-mode & {
      background-color: rgba(212, 237, 218, 0.2);
      color: #a3e4b0;
    }
  }
  
  .dark-mode & {
    background-color: rgba(248, 215, 218, 0.2);
    color: #f8a5ac;
  }
}
</style>
