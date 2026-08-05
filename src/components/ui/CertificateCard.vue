<template>
  <div class="certificate-card" :class="{ 'dark-mode': isDarkMode }">
    <div class="certificate-icon">
      <i :class="certificate.icon || 'fas fa-certificate'"></i>
    </div>
    <div class="certificate-content">
      <h3>{{ certificate.name }}</h3>
      <p class="certificate-issuer">
        <i class="fas fa-building"></i> {{ certificate.issuer }}
      </p>
      <!-- <p class="certificate-date">
        <i class="fas fa-calendar-alt"></i> {{ certificate.date }}
      </p> -->
      <p class="certificate-desc">{{ certificate.description }}</p>
      <div class="certificate-actions">
        <a v-if="certificate.credentialUrl" :href="certificate.credentialUrl" target="_blank" class="btn btn-outline">
          <i class="fas fa-external-link-alt"></i> View Credential
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificateCard',
  props: {
    certificate: {
      type: Object,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.certificate-card {
  display: flex;
  background-color: $light-card-bg;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-md;
  transition: all $transition-normal;
  margin-bottom: $spacing-xl;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
  
  &.dark-mode {
    background-color: $dark-card-bg;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    .certificate-content {
      h3 {
        color: $dark-text;
      }

      .certificate-issuer,
      .certificate-date {
        color: $dark-secondary-text;

        i {
          color: color.adjust($primary-color, $lightness: 10%);
        }
      }

      .certificate-desc {
        color: $dark-secondary-text;
      }

      .certificate-actions {
        a {
          color: $dark-text;

          &:hover {
            color: color.adjust($primary-color, $lightness: 15%);
          }
        }
      }
    }
  }
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }
}

.certificate-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  background: linear-gradient(45deg, $primary-color, $secondary-color);
  color: white;
  
  i {
    font-size: 36px;
  }
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
    padding: $spacing-md 0;
  }
}

.certificate-content {
  flex: 1;
  padding: $spacing-lg;
  
  h3 {
    margin-bottom: $spacing-sm;
    font-size: $font-size-lg;
    color: $light-text;
    
    .dark-mode & {
      color: $light-text;
    }
  }
  
  .certificate-issuer,
  .certificate-date {
    color: $light-secondary-text;
    font-size: $font-size-sm;
    margin-bottom: $spacing-sm;
    
    i {
      margin-right: $spacing-xs;
      color: $primary-color;
      
      .dark-mode & {
        color: color.adjust($primary-color, $lightness: 10%);
      }
    }
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
  
  .certificate-desc {
    margin-bottom: $spacing-md;
    font-size: $font-size-sm;
    color: $light-secondary-text;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
  
  .certificate-actions {
    a {
      font-size: $font-size-sm;
      padding: $spacing-xs $spacing-md;
      
      i {
        margin-right: $spacing-xs;
      }
    }
  }
}
</style>
