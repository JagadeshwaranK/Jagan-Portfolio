<template>
  <div class="scrolling-skills" :class="{ 'dark-mode': isDarkMode }">
    <div class="skills-track">
      <!-- Original Set -->
      <div class="skills-slide" v-for="(group, groupIndex) in groupedSkills" :key="`original-${groupIndex}`">
        <div class="skill-item" v-for="(skill, skillIndex) in group" :key="`original-${groupIndex}-${skillIndex}`">
          <div class="skill-icon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skill-name">{{ skill.name }}</div>
        </div>
      </div>
      <!-- Duplicate Set for Seamless Loop -->
      <div class="skills-slide" v-for="(group, groupIndex) in groupedSkills" :key="`duplicate-${groupIndex}`">
        <div class="skill-item" v-for="(skill, skillIndex) in group" :key="`duplicate-${groupIndex}-${skillIndex}`">
          <div class="skill-icon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skill-name">{{ skill.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ScrollingSkills',
  props: {
    skills: {
      type: Array,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      default: false
    },
    itemsPerGroup: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    // Group skills for layout
    const groupedSkills = computed(() => {
      const groups = [];
      const skillsCopy = [...props.skills];
      
      for (let i = 0; i < skillsCopy.length; i += props.itemsPerGroup) {
        groups.push(skillsCopy.slice(i, i + props.itemsPerGroup));
      }
      
      return groups;
    });
    
    return {
      groupedSkills
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.scrolling-skills {
  width: 100%;
  overflow: hidden;
  padding: $spacing-lg 0;
  
  &.dark-mode {
    .skill-item {
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    
    .skill-name {
      color: $dark-text;
    }
  }
}

.skills-track {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
}

.skills-slide {
  display: flex;
  gap: $spacing-md;
  flex-shrink: 0;
  padding-right: $spacing-md; // Add gap between sets
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md;
  border-radius: $border-radius-md;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all $transition-fast;
  width: 120px;
  cursor: default;
  margin-right: $spacing-md; // Spacing between items
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-md;
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:last-child {
    margin-right: 0;
  }
}

.skill-icon {
  font-size: 32px;
  margin-bottom: $spacing-sm;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    background: linear-gradient(45deg, $primary-color, $secondary-color);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.skill-name {
  font-weight: 500;
  text-align: center;
  color: $light-text;
}

@media (max-width: $breakpoint-md) {
  .skill-item {
    width: 104px;
    padding: $spacing-sm;
  }

  .skill-icon {
    font-size: 26px;
    height: 34px;
    margin-bottom: 6px;
  }

  .skill-name {
    font-size: $font-size-sm;
  }
}

@media (max-width: $breakpoint-sm) {
  .skill-item {
    width: 92px;
    padding: 6px;
  }

  .skill-icon {
    font-size: 22px;
    height: 30px;
    margin-bottom: 4px;
  }

  .skill-name {
    font-size: 12px;
  }
}
</style>
