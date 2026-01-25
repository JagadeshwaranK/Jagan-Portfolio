<template>
  <section id="experience" class="experience-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Work Experience</h2>
      </div>
      
      <div class="experience-timeline" ref="timeline">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="timeline-item"
          :class="{ 'visible': isInView }"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="timeline-connector">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="index < experiences.length - 1"></div>
          </div>

          <div class="timeline-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="timeline-header">
              <h3>{{ exp.role }}</h3>
              <span class="timeframe">{{ exp.startYear }} - {{ exp.endYear || 'Present' }}</span>
            </div>

            <div class="timeline-body">
              <h4>{{ exp.company }}</h4>
              <p class="location">
                <i class="fas fa-map-marker-alt"></i> {{ exp.location }}
              </p>

              <ul class="responsibilities">
                <li v-for="(detail, detailIndex) in exp.details" :key="detailIndex">
                  {{ detail }}
                </li>
              </ul>

              <div class="technologies" v-if="exp.technologies?.length">
                <span class="tech-badge" v-for="(tech, techIndex) in exp.technologies" :key="techIndex">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ExperienceSection',
  components: {
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const timeline = ref(null);
    const isInView = ref(false);
    

    const experiences = [
       {
        role: 'Associate Software Engineer',
        company: 'Glancito',
        location: 'Remote',
        startYear: '2025',
        endYear: 'Current',
        details: [
          'End-to-End Case Life Cycle Development: Designed and implemented processes for diverse applications, ensuring scalability and maintainability.',
          'API Integration: Configured REST APIs and services using REST connectors, seamlessly managing customer records through connectors, endpoint URLs, and Data Transforms.',
          'Data Accuracy Improvement: Enhanced data accuracy by 15% with Data Transforms and Data Pages, streamlining operations for better performance.',
          'Process Reliability: Reduced SLA violations by 10% through the creation and management of Service-Level Agreements (SLAs) with escalation protocols for timely task completion.',
          'User Interface Enhancement: Developed Business Process Flows, Flow Actions, and UI components using CSS, HTML, and JavaScript to improve UI consistency and user experience.',
          'Debugging Expertise: Leveraged tools like Tracer, Live UI, and Clipboard for effective issue resolution, ensuring smooth application operation.',
                  ],
        technologies: ['Pega', 'Agile', 'Java', 'REST API', 'SQL', 'SLA', 'Javascript']
      },

      {
        role: 'Pega Developer',
        company: 'Cognizant Technology Solutions',
        location: 'Chennai, India',
        startYear: '2022',
        endYear: '2024',
        details: [
          'End-to-End Case Life Cycle Development: Designed and implemented processes for diverse applications, ensuring scalability and maintainability.',
          'API Integration: Configured REST APIs and services using REST connectors, seamlessly managing customer records through connectors, endpoint URLs, and Data Transforms.',
          'Data Accuracy Improvement: Enhanced data accuracy by 15% with Data Transforms and Data Pages, streamlining operations for better performance.',
          'Process Reliability: Reduced SLA violations by 10% through the creation and management of Service-Level Agreements (SLAs) with escalation protocols for timely task completion.',
          'User Interface Enhancement: Developed Business Process Flows, Flow Actions, and UI components using CSS, HTML, and JavaScript to improve UI consistency and user experience.',
          'Debugging Expertise: Leveraged tools like Tracer, Live UI, and Clipboard for effective issue resolution, ensuring smooth application operation.',
                  ],
        technologies: ['Pega', 'Agile', 'Java', 'REST API', 'SQL', 'SLA', 'Javascript']
      }
    ];
    
    const checkIfInView = () => {
      if (timeline.value) {
        const rect = timeline.value.getBoundingClientRect();
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
      experiences,
      timeline,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.experience-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.experience-timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  padding: $spacing-xl 0;
}

.timeline-item {
  display: flex;
  margin-bottom: $spacing-xl;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-connector {
  flex: 0 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: $breakpoint-md) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: $spacing-md;
  }
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $primary-color;
  position: relative;
  z-index: 2;
  margin-bottom: $spacing-sm;

  @media (max-width: $breakpoint-md) {
    margin-right: $spacing-sm;
    margin-bottom: 0;
  }

  .dark-mode & {
    background-color: lighten($primary-color, 10%);
  }
}

.timeline-line {
  flex: 1;
  width: 2px;
  background-color: $light-border;
  margin-left: 7px;

  @media (max-width: $breakpoint-md) {
    width: 100%;
    height: 2px;
    margin-left: 0;
    margin-top: 7px;
  }

  .dark-mode & {
    background-color: $dark-border;
  }
}

.timeline-card {
  flex: 1;
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-md;
  transition: all $transition-normal;
  position: relative;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid $primary-color;
    box-shadow: $shadow-lg;
  }

  .dark-mode & {
    background: $dark-card-bg;
    border: 1px solid $dark-border;

    &:hover {
      border: 1px solid lighten($primary-color, 10%);
    }
  }
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $light-border;

  h3 {
    color: $light-text;
    font-size: $font-size-lg;
    margin: 0;

    .dark-mode & {
      color: $dark-text;
    }
  }

  .timeframe {
    color: $primary-color;
    font-size: $font-size-sm;
    font-weight: 600;
    white-space: nowrap;

    .dark-mode & {
      color: lighten($primary-color, 10%);
    }
  }
}

.timeline-body {
  h4 {
    color: $light-secondary-text;
    margin-bottom: $spacing-sm;
    font-weight: 600;

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }

  .location {
    color: $light-secondary-text;
    font-size: $font-size-sm;
    margin-bottom: $spacing-md;
    display: flex;
    align-items: center;

    i {
      margin-right: $spacing-xs;
      color: $primary-color;

      .dark-mode & {
        color: lighten($primary-color, 10%);
      }
    }

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }

  .responsibilities {
    margin-left: $spacing-lg;
    margin-bottom: $spacing-lg;

    li {
      margin-bottom: $spacing-sm;
      color: $light-secondary-text;
      line-height: 1.6;

      .dark-mode & {
        color: $dark-secondary-text;
      }

      &::marker {
        color: $primary-color;

        .dark-mode & {
          color: lighten($primary-color, 10%);
        }
      }
    }
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;

    .tech-badge {
      padding: $spacing-xs $spacing-sm;
      background-color: rgba($primary-color, 0.1);
      color: $primary-color;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;

      .dark-mode & {
        background-color: rgba($primary-color, 0.2);
        color: lighten($primary-color, 10%);
      }
    }
  }
}
</style>
