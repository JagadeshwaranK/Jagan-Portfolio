<template>
  <div class="portfolio-app" :class="{ 'dark-mode': isDarkMode }">
    <TheNavbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />

    <main>
      <router-view :isDarkMode="isDarkMode" />
    </main>

    <BottomNav :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import TheNavbar from './components/TheNavbar.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  name: 'App',
  components: {
    TheNavbar,
    BottomNav
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
    };

    // Check for user's preferred theme
    onMounted(() => {
      // Check saved preference
      const savedTheme = localStorage.getItem('darkMode');

      if (savedTheme !== null) {
        isDarkMode.value = savedTheme === 'true';
      } else {
        // Check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.value = prefersDarkMode;
      }
    });

    // Update body class when dark mode changes
    watch(isDarkMode, (newValue) => {
      if (newValue) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }, { immediate: true });

    return {
      isDarkMode,
      toggleDarkMode
    };
  }
};
</script>

<style lang="scss">
.portfolio-app {
  min-height: 100vh;
  transition: background-color $transition-normal, color $transition-normal;
}

.portfolio-app.dark-mode {
  background-color: $dark-bg;
  color: $dark-text;
}
</style>
