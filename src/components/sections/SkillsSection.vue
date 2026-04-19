<template>
  <section id="skills" class="skills-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>My Skills</h2>
      </div>

      <div class="skills-layout">
        <div
          v-for="(group, index) in skillGroups"
          :key="group.title"
          class="category-card"
          :class="{ visible: isInView, [`delay-${index}`]: true }"
        >
          <div class="category-head">
            <h3>{{ group.title }}</h3>
            <p>{{ group.description }}</p>
          </div>

          <div class="skills-grid">
            <div v-for="skill in group.skills" :key="skill.name" class="skill-chip">
              <span class="skill-icon">
                <i :class="skill.icon"></i>
              </span>
              <span class="skill-label">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="skills-progress" :class="{ visible: isInView, 'delay-3': true }">
        <div class="progress-head">
          <h3>Core Competencies</h3>
          <p>Practical strengths shaped by product work, enterprise delivery, and full-stack development.</p>
        </div>

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
import { computed, ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'SkillsSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);

    const technicalSkills = [
      { name: 'Pega', icon: 'fas fa-cogs' },
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'SQL', icon: 'fas fa-database' },
      { name: 'REST API', icon: 'fas fa-plug' }
    ];

    const frameworkSkills = [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'AWS', icon: 'fab fa-aws' },
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'MongoDB', icon: 'fas fa-server' },
      { name: 'Shopify', icon: 'fa-brands fa-shopify' },
      { name: 'Pega Platform', icon: 'fas fa-layer-group' }
    ];

    const softSkills = [
      { name: 'Problem Solving', icon: 'fas fa-lightbulb' },
      { name: 'Teamwork', icon: 'fas fa-users' },
      { name: 'Leadership', icon: 'fas fa-user-tie' },
      { name: 'Time Management', icon: 'far fa-clock' },
      { name: 'Adaptability', icon: 'fas fa-sync-alt' },
      { name: 'Critical Thinking', icon: 'fas fa-brain' },
      { name: 'Creativity', icon: 'fas fa-palette' }
    ];

    const coreSkills = [
      { name: 'Pega Development', percentage: 75 },
      { name: 'Front-end Development', percentage: 80 },
      { name: 'Back-end Development', percentage: 70 },
      { name: 'Database Design', percentage: 80 },
      { name: 'UI/UX Design', percentage: 70 },
      { name: 'Shopify Development', percentage: 70 }
    ];

    const skillGroups = computed(() => [
      {
        title: 'Technical Skills',
        description: 'Core languages and backend capabilities I use to build stable, production-ready applications.',
        skills: technicalSkills
      },
      {
        title: 'Frameworks & Tools',
        description: 'Frontend libraries, platforms, and delivery tools I rely on for shipping modern products.',
        skills: frameworkSkills
      },
      {
        title: 'Soft Skills',
        description: 'Collaboration habits that help me work effectively across teams, feedback loops, and fast-moving projects.',
        skills: softSkills
      }
    ]);

    const checkIfInView = () => {
      const skillsSection = document.getElementById('skills');

      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
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
      isInView,
      skillGroups,
      coreSkills
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.skills-section {
  background-color: $light-bg;
  transition: background-color $transition-normal;

  &.dark-mode {
    background-color: $dark-bg;
  }
}

.skills-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: $spacing-lg;
  margin-bottom: $spacing-xxl;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.category-card,
.skills-progress {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-0 {
  transition-delay: 0s;
}

.delay-1 {
  transition-delay: 0.12s;
}

.delay-2 {
  transition-delay: 0.24s;
}

.delay-3 {
  transition-delay: 0.36s;
}

.category-card {
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba($primary-color, 0.16);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-sm;

  .dark-mode & {
    background-color: rgba(23, 27, 37, 0.86);
    border-color: rgba($primary-color, 0.28);
  }
}

.category-head {
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
    font-size: $font-size-sm;

    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba($primary-color, 0.08);
  border: 1px solid rgba($primary-color, 0.14);
  color: $light-text;
  transition: transform $transition-fast, background-color $transition-fast, border-color $transition-fast;

  &:hover {
    transform: translateY(-2px);
    background: rgba($primary-color, 0.12);
    border-color: rgba($primary-color, 0.22);
  }

  .dark-mode & {
    background: rgba($primary-color, 0.16);
    border-color: rgba($primary-color, 0.22);
    color: $dark-text;
  }
}

.skill-icon {
  width: 22px;
  display: inline-flex;
  justify-content: center;
  color: $primary-color;
  font-size: 15px;

  .dark-mode & {
    color: lighten($primary-color, 10%);
  }
}

.skill-label {
  font-size: $font-size-sm;
  font-weight: 500;
}

.skills-progress {
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba($primary-color, 0.16);
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-sm;

  .dark-mode & {
    background-color: rgba(23, 27, 37, 0.86);
    border-color: rgba($primary-color, 0.28);
  }
}

.progress-head {
  margin-bottom: $spacing-lg;

  h3 {
    margin: 0 0 $spacing-sm;
    color: $light-text;

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

.progress-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-lg $spacing-xl;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.progress-item {
  margin-bottom: $spacing-sm;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  gap: $spacing-sm;
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
  background: linear-gradient(90deg, $primary-color, $accent-color);
  border-radius: $border-radius-full;
  width: 0;
  transition: width 1.2s ease;
}

@media (max-width: $breakpoint-sm) {
  .category-card,
  .skills-progress {
    padding: $spacing-lg;
  }

  .skill-chip {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
