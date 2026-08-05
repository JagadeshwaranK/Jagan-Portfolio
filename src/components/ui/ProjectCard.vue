<template>
  <div class="project-card" :class="{ 'dark-mode': isDarkMode }">
    <div class="project-timeframe">
      <p>{{ project.duration }}</p>
    </div>
    
    <div class="project-content">
      <h3>{{ project.title }}</h3>
      <h4>{{ project.type }}</h4>
      <ul class="project-details">
        <li v-for="(detail, index) in project.details" :key="index">
          {{ detail }}
        </li>
      </ul>
      <div class="project-technologies" v-if="project.technologies?.length">
        <span class="tech-tag" v-for="(tech, index) in project.technologies" :key="index">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
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
.project-card {
  text-align: left;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-lg;
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
}

.project-timeframe {
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

.project-content {
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
  
  .project-details {
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
  
  .project-technologies {
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
