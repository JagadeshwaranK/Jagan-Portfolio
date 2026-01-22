<template>
  <section id="skills" class="skills-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>My Skills</h2>
      </div>
      
      <div class="skills-categories">
        <div class="category" :class="{ 'visible': isInView }">
          <h3>Technical Skills</h3>
          <ScrollingSkills :skills="technicalSkills" :isDarkMode="isDarkMode" :itemsPerGroup="4" />
        </div>
        
        <div class="category" :class="{ 'visible': isInView, 'delay-1': true }">
          <h3>Frameworks & Tools</h3>
          <ScrollingSkills :skills="frameworkSkills" :isDarkMode="isDarkMode" :itemsPerGroup="4" />
        </div>
        
        <div class="category" :class="{ 'visible': isInView, 'delay-2': true }">
          <h3>Soft Skills</h3>
          <ScrollingSkills :skills="softSkills" :isDarkMode="isDarkMode" :itemsPerGroup="4" />
        </div>
      </div>
      
      <div class="skills-progress" :class="{ 'visible': isInView, 'delay-3': true }">
        <h3>Core Competencies</h3>
        
        <div class="progress-container">
          <div v-for="(skill, index) in coreSkills" :key="index" class="progress-item">
            <div class="progress-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-percentage">{{ skill.percentage }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-value" :style="{ width: `${skill.percentage}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ScrollingSkills from '../ui/ScrollingSkills.vue';

export default {
  name: 'SkillsSection',
  components: {
    ScrollingSkills
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);
    
    // Technical skills with Font Awesome icons
    const technicalSkills = [
      { name: 'Pega', icon: 'fas fa-cogs' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'SQL', icon: 'fas fa-database' },
      { name: 'REST API', icon: 'fas fa-plug' }
    ];
    
    // Framework and tools skills
    const frameworkSkills = [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'MongoDB', icon: 'fas fa-server' }
      // { name: 'Sass', icon: 'fab fa-sass' }
    ];
    
    // Soft skills
    const softSkills = [
      { name: 'Problem Solving', icon: 'fas fa-lightbulb' },
      // { name: 'Communication', icon: 'fas fa-comments' },
      { name: 'Teamwork', icon: 'fas fa-users' },
      { name: 'Leadership', icon: 'fas fa-user-tie' },
      { name: 'Time Management', icon: 'far fa-clock' },
      { name: 'Adaptability', icon: 'fas fa-sync-alt' },
      { name: 'Critical Thinking', icon: 'fas fa-brain' },
      { name: 'Creativity', icon: 'fas fa-palette' }
    ];
    
    // Core skills with percentages
    const coreSkills = [
      { name: 'Pega Development', percentage: 75 },
      { name: 'Front-end Development', percentage: 80 },
      { name: 'Back-end Development', percentage: 70 },
      { name: 'Database Design', percentage: 80 },
      { name: 'UI/UX Design', percentage: 70 },
      { name:  'Shopify Development', percentage: 65 }
    ];
    
    const checkIfInView = () => {
      const skillsSection = document.getElementById('skills');
      
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
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
      isInView,
      technicalSkills,
      frameworkSkills,
      softSkills,
      coreSkills
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.skills-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
  }
}

.skills-categories {
  margin-bottom: $spacing-xl;
}

.category {
  margin-bottom: $spacing-xl;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.5s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.delay-1 {
    transition-delay: 0.2s;
  }
  
  &.delay-2 {
    transition-delay: 0.4s;
  }
  
  h3 {
    margin-bottom: $spacing-lg;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: $primary-color;
      
      .dark-mode & {
        background-color: lighten($primary-color, 10%);
      }
    }
  }
}

.skills-progress {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.delay-3 {
    transition-delay: 0.6s;
  }
  
  h3 {
    margin-bottom: $spacing-lg;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: $primary-color;
      
      .dark-mode & {
        background-color: lighten($primary-color, 10%);
      }
    }
  }
}

.progress-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: $spacing-xl;
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.progress-item {
  margin-bottom: $spacing-md;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
  
  .skill-name {
    font-weight: 500;
    color: $light-text;
    
    .dark-mode & {
      color: $dark-text;
    }
  }
  
  .skill-percentage {
    color: $primary-color;
    font-weight: 600;
    
    .dark-mode & {
      color: lighten($primary-color, 10%);
    }
  }
}

.progress-bar {
  height: 8px;
  background-color: lighten($light-border, 5%);
  border-radius: $border-radius-full;
  overflow: hidden;
  
  .dark-mode & {
    background-color: lighten($dark-border, 5%);
  }
}

.progress-value {
  height: 100%;
  background: linear-gradient(45deg, $primary-color, $secondary-color);
  border-radius: $border-radius-full;
  width: 0;
  transition: width 1.5s ease;
}
</style>
