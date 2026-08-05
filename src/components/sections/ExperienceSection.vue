<template>
  <section id="experience" class="experience-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Work Experience</h2>
      </div>

      <div class="experience-list" ref="timeline">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="experience-item"
          :class="{ visible: isInView }"
          :style="{ transitionDelay: `${index * 0.12}s` }"
        >
          <div class="experience-meta">
            <span class="timeframe">{{ exp.startYear }} - {{ exp.endYear || 'Present' }}</span>
            <p class="location">
              <i class="fas fa-map-marker-alt"></i> {{ exp.location }}
            </p>
          </div>

          <div class="experience-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="experience-header">
              <h3>{{ exp.role }}</h3>
              <h4>{{ exp.company }}</h4>
            </div>

            <div class="experience-body">
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
        company: 'Glancito LLC',
        location: 'Remote',
        startYear: '2025',
        endYear: 'Present',
        details: [
          'Full-Stack Development: Architected scalable apps using TypeScript, Node.js, and React, implementing REST and GraphQL APIs for real-time data flow.',
          'Cloud & DevOps: Managed AWS infrastructure across ECS, EC2, and Route 53, and automated deployments with CI/CD pipelines to maintain 99.9% uptime.',
          'Innovation: Built a custom Loyalty Management System from scratch and integrated AI APIs to power personalized marketing automation.',
          'Performance: Optimized frontend Web Vitals and state management to keep interactions fast even under heavy data loads.'
        ],
        technologies: ['TypeScript', 'Node.js', 'React', 'REST API', 'GraphQL', 'AWS', 'CI/CD']
      },
      {
        role: 'Programmer',
        company: 'Cognizant',
        location: 'Bangalore',
        startYear: '2022',
        endYear: '2024',
        details: [
          'Pega BPM Expert: Engineered end-to-end case lifecycles, ensuring complex financial workflows remained maintainable and scalable.',
          'System Integration: Connected disparate systems through REST, SOAP, and Connect SQL to streamline customer record management.',
          'UI/UX & Logic: Enhanced interfaces with HTML, CSS, and JavaScript, and improved performance using Pega declarative rules and debugging tools.',
          'Security: Architected robust access controls and SLA-driven workflows to protect data integrity and support timely task execution in Agile teams.'
        ],
        technologies: ['Pega BPM', 'REST', 'SOAP', 'Connect SQL', 'HTML', 'CSS', 'JavaScript', 'Agile']
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
.experience-section {
  background-color: $light-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.experience-list {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.experience-item {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: $spacing-lg;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.45s ease, transform 0.45s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 180px 1fr;
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
}

.experience-meta {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  padding-top: $spacing-sm;

  .dark-mode & {
    color: $dark-secondary-text;
  }
}

.timeframe {
  color: $primary-color;
  font-size: $font-size-sm;
  font-weight: 700;
  letter-spacing: 0.02em;

  .dark-mode & {
    color: color.adjust($primary-color, $lightness: 10%);
  }
}

.location {
  color: $light-secondary-text;
  font-size: $font-size-sm;
  margin: 0;
  display: flex;
  align-items: center;
  gap: $spacing-xs;

  i {
    color: $primary-color;
  }

  .dark-mode & {
    color: $dark-secondary-text;
  }
}

.experience-card {
  background-color: rgba(255, 255, 255, 0.72);
  border-radius: $border-radius-lg;
  padding: $spacing-lg $spacing-xl;
  box-shadow: $shadow-sm;
  transition: all $transition-normal;
  border: 1px solid rgba($primary-color, 0.16);

  &:hover {
    border-color: rgba($primary-color, 0.28);
    box-shadow: $shadow-md;
  }

  .dark-mode & {
    background-color: rgba(23, 27, 37, 0.86);
    border-color: rgba($primary-color, 0.28);

    &:hover {
      border-color: rgba($primary-color, 0.4);
    }
  }
}

.experience-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
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

  h4 {
    margin: 0;
    color: $light-secondary-text;
    font-size: $font-size-base;
    font-weight: 600;

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
}

.experience-body {
  .responsibilities {
    margin: 0;
    padding-left: $spacing-lg;
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
          color: color.adjust($primary-color, $lightness: 10%);
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
        color: color.adjust($primary-color, $lightness: 10%);
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .experience-meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
  }

  .experience-card {
    padding: $spacing-md $spacing-lg;
  }
}
</style>
