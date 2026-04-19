<template>
  <section id="projects" class="projects-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Projects</h2>
      </div>

      <div class="projects-grid">
        <article
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
          :class="{ visible: isInView }"
          :style="{ transitionDelay: `${index * 0.12}s` }"
        >
          <div class="project-top">
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
          </div>

          <ul class="project-highlights">
            <li v-for="(detail, detailIndex) in project.highlights" :key="detailIndex">
              {{ detail }}
            </li>
          </ul>

          <div class="technologies" v-if="project.technologies?.length">
            <span class="tech-badge" v-for="(tech, techIndex) in project.technologies" :key="techIndex">
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ProjectsSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);

    const projects = [
      {
        title: 'Loyalty Rewards Engine for E-Commerce',
        summary: 'A full-stack commerce platform with an integrated loyalty system designed to improve retention, campaign control, and customer engagement.',
        highlights: [
          'Built a modular shopping experience with automatic points tracking and instant reward redemption.',
          'Developed responsive React interfaces for browsing, cart flow, rewards visibility, and campaign engagement.',
          'Created a Django REST backend with PostgreSQL for users, orders, rewards, campaigns, and transaction history.',
          'Added analytics dashboards for redemption trends, campaign ROI, and tier distribution.'
        ],
        technologies: ['React', 'Material UI', 'Django REST', 'PostgreSQL', 'JWT', 'Vercel']
      },
      {
        title: 'Armory E-commerce',
        summary: 'A lightweight e-commerce web application focused on responsive shopping flows and client-side state handling.',
        highlights: [
          'Built product browsing, cart management, and checkout flows using React and React-Bootstrap.',
          'Used local storage to handle cart data, session persistence, and lightweight state management.',
          'Designed a responsive interface with reusable UI components for a smoother shopping experience.'
        ],
        technologies: ['React', 'React-Bootstrap', 'HTML5', 'CSS3', 'JavaScript']
      },
      {
        title: 'Pharmacy E-commerce',
        summary: 'A pharmacy-focused commerce platform with secure authentication, product discovery, and scalable backend support.',
        highlights: [
          'Built the frontend with React and Tailwind CSS for a faster and cleaner cross-device experience.',
          'Implemented filtering, inventory handling, checkout flows, and automated status updates.',
          'Supported multiple authentication paths including OAuth, OTP, and email-based login.',
          'Backed the platform with Node.js and a database stack using PostgreSQL, MySQL, and MongoDB.'
        ],
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB']
      }
    ];

    const checkIfInView = () => {
      const projectsSection = document.getElementById('projects');

      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
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
      projects,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.projects-section {
  background-color: $light-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-lg;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba($primary-color, 0.16);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
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

.project-top {
  margin-bottom: $spacing-lg;

  h3 {
    margin: 0 0 $spacing-sm;
    color: $light-text;
    font-size: $font-size-lg;

    .dark-mode & {
      color: $dark-text;
    }
  }

  p {
    margin: 0;
    color: $light-secondary-text;
    line-height: 1.6;

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
}

.project-highlights {
  margin: 0 0 $spacing-lg;
  padding-left: $spacing-lg;

  li {
    margin-bottom: $spacing-sm;
    color: $light-secondary-text;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }

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
}

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

@media (max-width: $breakpoint-sm) {
  .project-card {
    padding: $spacing-lg;
  }
}
</style>
