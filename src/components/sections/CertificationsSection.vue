<template>
  <section id="certifications" class="certifications-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>My Certifications</h2>
      </div>

      <div class="certifications-grid">
        <article
          v-for="(cert, index) in certifications"
          :key="index"
          class="cert-card"
          :class="{ visible: isInView }"
          :style="{ transitionDelay: `${index * 0.1}s` }"
        >
          <div class="cert-icon">
            <i :class="cert.icon || 'fas fa-certificate'"></i>
          </div>

          <div class="cert-content">
            <h3>{{ cert.name }}</h3>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-description">{{ cert.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CertificationsSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);

    const certifications = [
      {
        name: 'Pega Certified System Architect (PCSA)',
        issuer: 'Pegasystems Inc.',
        description: 'Validated in core Pega platform design, case workflows, data modeling, and UI implementation using platform best practices.',
        icon: 'fas fa-robot'
      },
      {
        name: 'Pega Certified Senior System Architect (PCSSA)',
        issuer: 'Pegasystems Inc.',
        description: 'Advanced certification covering complex application design, integrations, and performance optimization on the Pega platform.',
        icon: 'fas fa-robot'
      },
      {
        name: 'Claude Code in Action',
        issuer: 'Anthropic Education',
        description: 'Hands-on training in Claude Code CLI workflows, including context management, custom instructions, automation, GitHub integration, and MCP server setup.',
        icon: 'fas fa-terminal'
      },
      {
        name: 'The Fundamentals of Digital Marketing',
        issuer: 'Google',
        description: 'Covered SEO, content, social media, and analytics through a structured digital marketing program.',
        icon: 'fab fa-google'
      },
      {
        name: 'Data Analytics and Visualization',
        issuer: 'Forage',
        description: 'Focused on data analysis, visualization techniques, and drawing business insight from large datasets.',
        icon: 'fas fa-chart-line'
      },
      {
        name: 'Generative AI Fundamentals',
        issuer: 'Cognizant',
        description: 'Built foundational understanding of generative AI concepts, real-world applications, and responsible use in enterprise settings.',
        icon: 'fas fa-brain'
      },
      {
        name: 'SQL',
        issuer: 'Udemy',
        description: 'Covered database fundamentals, query writing, and practical data manipulation using SQL.',
        icon: 'fas fa-database'
      },
      {
        name: 'Agile Methodology and Jira Software Tool',
        issuer: 'KARE',
        description: 'Focused on Agile delivery practices and hands-on sprint planning, issue tracking, and reporting in Jira.',
        icon: 'fab fa-jira'
      }
    ];

    const checkIfInView = () => {
      const certSection = document.getElementById('certifications');

      if (certSection) {
        const rect = certSection.getBoundingClientRect();
        const isVisible =
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
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
      certifications,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.certifications-section {
  background-color: $light-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-lg;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.cert-card {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: $spacing-md;
  align-items: start;
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba($primary-color, 0.16);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-sm;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease, border-color $transition-normal;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: rgba($primary-color, 0.28);
  }

  .dark-mode & {
    background-color: rgba(23, 27, 37, 0.86);
    border-color: rgba($primary-color, 0.28);

    &:hover {
      border-color: rgba($primary-color, 0.4);
    }
  }
}

.cert-icon {
  width: 64px;
  height: 64px;
  border-radius: $border-radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($primary-color, 0.1);
  color: $primary-color;
  font-size: 24px;

  .dark-mode & {
    background: rgba($primary-color, 0.18);
    color: lighten($primary-color, 10%);
  }
}

.cert-content {
  h3 {
    margin: 0 0 $spacing-xs;
    color: $light-text;
    font-size: $font-size-lg;

    .dark-mode & {
      color: $dark-text;
    }
  }
}

.cert-issuer {
  margin: 0 0 $spacing-sm;
  color: $primary-color;
  font-size: $font-size-sm;
  font-weight: 600;

  .dark-mode & {
    color: lighten($primary-color, 10%);
  }
}

.cert-description {
  margin: 0;
  color: $light-secondary-text;
  line-height: 1.6;

  .dark-mode & {
    color: $dark-secondary-text;
  }
}

@media (max-width: $breakpoint-sm) {
  .cert-card {
    grid-template-columns: 1fr;
  }

  .cert-icon {
    width: 56px;
    height: 56px;
  }
}
</style>
