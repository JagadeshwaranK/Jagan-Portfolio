<template>
  <section id="projects" class="projects-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Projects</h2>
      </div>
      
      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-item"
          :class="{ 'visible': isInView }"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="project-card" :class="{ 'dark-mode': isDarkMode }">
            <div class="project-header">
              <h3>{{ project.title }}</h3>
            </div>

            <div class="project-body">
              <ul class="project-details">
                <li v-for="(detail, detailIndex) in project.details" :key="detailIndex">
                  {{ detail }}
                </li>
              </ul>

              <div class="technologies" v-if="project.technologies?.length">
                <span class="tech-badge" v-for="(tech, techIndex) in project.technologies" :key="techIndex">
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
  name: 'ProjectsSection',
  components: {
  },
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
        details: [
          'Built a modular, full-stack e-commerce web platform featuring an integrated loyalty rewards system, delivering seamless online shopping with automatic points tracking and instant reward redemption.',
          'Engineered responsive frontend interfaces using React and Material UI for dynamic product browsing, cart management, reward visibility, and campaign engagement, ensuring an intuitive experience across devices.',
          'Developed a robust Django REST backend with PostgreSQL, managing secure data storage for user profiles, orders, reward catalogs, campaign logic, and transaction histories.',
          'Implemented real-time loyalty point computation and tier progression, instantly updating user dashboards with earned points and available rewards after every purchase.',
          'Enabled secure authentication with JWT tokens, role-based access for users and admins, and encrypted session handling, prioritizing privacy and security at every step.',
          'Provided efficient campaign management tools for administrators, including bonus point scheduling, campaign activation, and data-driven marketing controls, enhancing repeat purchase rates.',
          'Integrated advanced analytics dashboards displaying points statistics, redemption rates, campaign ROI, and user tier distribution, empowering timely, informed decisions.',
          'Supported scalable deployment and maintainability using Vercel serverless hosting, API-driven architecture, and modular React/Django codebase designed for future enhancements.',
        ],
        technologies: ['React', 'Material UI', 'Django REST Framework', 'PostgreSQL', 'JWT', 'Vercel', 'JavaScript']
      },
      {
        title: 'Armory E-commerce',
        details: [
          'Developed a responsive e-commerce web application using React, React-Bootstrap, HTML5, and CSS3.',
          'Implemented key features such as a shopping cart, product category browsing, and secure checkout.',
          'Utilized local storage for backend data management, including user session data and cart items.',
          'Integrated React-Bootstrap components for a visually appealing, responsive design.',
          'Designed real-time mechanisms to manage local storage interactions for secure user authentication.'
        ],
        technologies: ['React', 'React-Bootstrap', 'HTML5', 'CSS3', 'JavaScript']
      },
      {
        title: 'Pharmacy E-commerce',
        details: [
          'Developed a responsive e-commerce platform for pharmacy services with seamless frontend functionality using React and modern styling through Tailwind CSS.',
          'Integrated advanced features like product filtering, inventory management, secure checkout systems, and cross-device compatibility for an enhanced user experience. ',
          'Built scalable backend architecture leveraging PostgreSQL, MySQL, and MongoDB, ensuring efficient data handling and reliability.',
          'Implemented secure user authentication methods including OAuth, mobile OTP verification, and emailbased login, prioritizing robust security measures. ',
          'Enhanced functionality with technologies like Node.js and APIs, while adding automated email statusnotifications for instant user updates. ',
          'Created an intuitive user interface with a focus on usability and accessibility, ensuring a seamless experience for all users.',

        ],
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'JavaScript']
      }
    ];

    
    const checkIfInView = () => {
      const projectsSection = document.getElementById('projects');

      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
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
      projects,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.projects-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.projects-grid {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  padding: $spacing-xl 0;
}

.project-item {
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

.project-card {
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

.project-header {
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

  .dark-mode & {
    border-bottom: 1px solid $dark-border;
  }
}

.project-body {
  h4 {
    color: $light-secondary-text;
    margin-bottom: $spacing-sm;
    font-weight: 600;

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }

  .project-details {
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
