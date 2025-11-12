<template>
  <section id="projects" class="projects-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Projects</h2>
      </div>
      
      <div class="projects-timeline" ref="timeline">
        <ProjectCard 
          v-for="(project, index) in projects" 
          :key="index" 
          :project="project" 
          :isDarkMode="isDarkMode"
          :class="{ 'visible': isInView }"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ProjectCard from '../ui/ProjectCard.vue';

export default {
  name: 'ProjectsSection',
  components: {
    ProjectCard
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
    
    const projects = [
      {
        title: 'Loyalty Rewards Engine for E-Commerce',
        duration: '2025',
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
        duration: '2025',
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
        duration: '2025',
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
      projects,
      timeline,
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

.projects-timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 120px;
    height: 100%;
    width: 2px;
    background-color: $light-border;
    
    .dark-mode & {
      background-color: $dark-border;
    }
    
    @media (max-width: $breakpoint-md) {
      left: -5px;
    }
  }
  
  :deep(.project-card) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
