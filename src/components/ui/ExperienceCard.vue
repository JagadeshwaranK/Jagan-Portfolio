<template>
  <div class="experience-card" :class="{ 'dark-mode': isDarkMode }">
    <div class="experience-timeframe">
      <p>{{ experience.startYear }} - {{ experience.endYear || 'Present' }}</p>
    </div>
    
    <div class="experience-content">
      <h3>{{ experience.role }}</h3>
      <h4>{{ experience.company }}</h4>
      <p class="experience-location">
        <i class="fas fa-map-marker-alt"></i> {{ experience.location }}
      </p>
      <ul class="experience-details">
        <li v-for="(detail, index) in experience.details" :key="index">
          {{ detail }}
        </li>
      </ul>
      <div class="experience-technologies" v-if="experience.technologies?.length">
        <span class="tech-tag" v-for="(tech, index) in experience.technologies" :key="index">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceCard',
  props: {
    experience: {
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
.experience-card {
  display: flex;
  margin-bottom: $spacing-xl;
  padding-bottom: $spacing-xl;
  border-bottom: 1px solid $light-border;
  transition: all $transition-normal;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  
  &.dark-mode {
    border-bottom-color: $dark-border;
  }
  
  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.experience-timeframe {
  flex: 0 0 150px;
  margin-right: $spacing-xl;
  
  p {
    font-weight: 600;
    color: $primary-color;
    margin-top: $spacing-sm;
    
    .dark-mode & {
      color: color.adjust($primary-color, $lightness: 10%);
    }
  }
  
  @media (max-width: $breakpoint-md) {
    flex: none;
    margin-right: 0;
    margin-bottom: $spacing-md;
  }
}

.experience-content {
  flex: 1;
  
  h3 {
    margin-bottom: $spacing-xs;
    color: $light-text;
    
    .dark-mode & {
      color: $dark-text;
    }
  }
  
  h4 {
    margin-bottom: $spacing-md;
    color: $light-secondary-text;
    font-weight: 600;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
  
  .experience-location {
    margin-bottom: $spacing-md;
    color: $light-secondary-text;
    font-size: $font-size-sm;
    
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
  
  .experience-details {
    margin-left: $spacing-lg;
    margin-bottom: $spacing-md;
    
    li {
      margin-bottom: $spacing-sm;
      color: $light-secondary-text;
      
      .dark-mode & {
        color: $dark-secondary-text;
      }
      
      &::marker {
        color: $primary-color;
        
        .dark-mode & {
          color: color.adjust($primary-color, $lightness: 10%);
        }
      }
    }
  }
  
  .experience-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    
    .tech-tag {
      padding: $spacing-xs $spacing-sm;
      background-color: rgba($primary-color, 0.1);
      color: $primary-color;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      
      .dark-mode & {
        background-color: rgba($primary-color, 0.2);
        color: color.adjust($primary-color, $lightness: 10%);
      }
    }
  }
}
</style>
