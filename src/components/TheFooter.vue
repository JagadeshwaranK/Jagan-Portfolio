<template>
  <footer class="footer" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>JAGADESHWARAN</h3>
          <p>Thank you for visiting my portfolio. Let's connect!</p>
        </div>
        
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a :href="`#${link.id}`">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-social">
          <h4>Connect With Me</h4>
          <div class="social-icons">
            <a href="https://www.linkedin.com/in/jagadeshwaran-k-5b504321a/" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/JagadeshwaranK" title="GitHub"><i class="fab fa-github"></i></a>
            <a href="https://x.com/JAGADES68462368?t=sj1YEthbQpmcys5KdAxINg&s=09" title="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="mailto:jagadesh.k3008@gmail.com" title="Email"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
      
      <!-- <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Professional Portfolio. All Rights Reserved.</p>
      </div> -->
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TheFooter',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const navLinks = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'certifications', label: 'Certifications' },
      { id: 'contact', label: 'Contact' }
    ];
    
    const currentYear = computed(() => new Date().getFullYear());
    
    return {
      navLinks,
      // currentYear
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: color.adjust($light-card-bg, $lightness: -5%);
  padding: $spacing-xxl 0;
  margin-top: $spacing-xxl;
  
  &.dark-mode {
    background-color: color.adjust($dark-bg, $lightness: 5%);
    
    .footer-logo h3 {
      color: $dark-text;
    }
    
    .footer-links a,
    .footer-social a {
      color: $dark-secondary-text;
      
      &:hover {
        color: $dark-text;
      }
    }
    
    .footer-bottom {
      border-top-color: rgba($dark-text, 0.1);
    }
  }
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.footer-logo {
  h3 {
    margin-bottom: $spacing-md;
    background: linear-gradient(45deg, $primary-color, $secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: $light-secondary-text;
    max-width: 300px;
    
    @media (max-width: $breakpoint-md) {
      max-width: none;
    }
  }
}

.footer-links {
  h4 {
    margin-bottom: $spacing-md;
    color: $light-text;
    font-size: $font-size-lg;
    
    .dark-mode & {
      color: $dark-text;
    }
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: $spacing-sm;
      
      a {
        color: $light-secondary-text;
        text-decoration: none;
        transition: color $transition-fast;
        
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}

.footer-social {
  h4 {
    margin-bottom: $spacing-md;
    color: $light-text;
    font-size: $font-size-lg;
    
    .dark-mode & {
      color: $dark-text;
    }
  }
  
  .social-icons {
    display: flex;
    gap: $spacing-md;
    
    @media (max-width: $breakpoint-md) {
      justify-content: center;
    }
    
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
        transform: translateY(-3px);
      }
      
      .dark-mode & {
        background-color: rgba($primary-color, 0.2);
        
        &:hover {
          background-color: $primary-color;
        }
      }
      
      i {
        font-size: $font-size-lg;
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: $spacing-lg;
  border-top: 1px solid rgba($light-text, 0.1);
  
  p {
    color: $light-secondary-text;
    font-size: $font-size-sm;
    margin-bottom: 0;
  }
}
</style>
