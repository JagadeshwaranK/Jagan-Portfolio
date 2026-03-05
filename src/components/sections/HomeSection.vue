<template>
  <section
    id="home"
    class="home-section"
    :class="{ 'dark-mode': isDarkMode, 'cursor-moving': isCursorMoving }"
  >
    <div
      v-if="enableCursorFx"
      class="cursor-trail"
      :class="{ 'is-active': cursorActive }"
      :style="{ transform: `translate3d(${trailX}px, ${trailY}px, 0)` }"
    ></div>
    <div
      v-if="enableCursorFx"
      class="cursor-orb"
      :class="{ 'is-active': cursorActive }"
      :style="{ transform: `translate3d(${cursorX}px, ${cursorY}px, 0)` }"
    ></div>
    <div
      v-if="enableCursorFx"
      class="cursor-ring"
      :class="{ 'is-active': cursorActive }"
      :style="{ transform: `translate3d(${ringX}px, ${ringY}px, 0)` }"
    ></div>
    <div class="container home-content" :style="contentStyleVars">
      <div class="greeting-text" :class="{ 'fade-in': isVisible }">
        <span>Hello, I'm</span>
      </div>
      <h1 class="name-text" :class="{ 'fade-in': isVisible }">JAGADESHWARAN</h1>
      <div class="auto-type" :class="{ 'fade-in': isVisible }">
        <span ref="typeTarget"></span>
      </div>
      <div class="actions" :class="{ 'fade-in': isVisible }">
        <router-link to="/contact" class="btn home-btn home-btn-primary">
          <i class="fas fa-paper-plane"></i>
          <span>Contact Me</span>
        </router-link>
        <router-link to="/about" class="btn home-btn home-btn-secondary">
          <i class="fas fa-user-circle"></i>
          <span>Learn More</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import TypeIt from 'typeit';

export default {
  name: 'HomeSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const typeTarget = ref(null);
    const isVisible = ref(false);
    const cursorX = ref(-100);
    const cursorY = ref(-100);
    const ringX = ref(-100);
    const ringY = ref(-100);
    const trailX = ref(-100);
    const trailY = ref(-100);
    const cursorActive = ref(false);
    const isCursorMoving = ref(false);
    const enableCursorFx = ref(false);
    let typeInstance = null;
    let animationFrameId = null;
    let moveTimeoutId = null;
    let targetX = -100;
    let targetY = -100;
    
    // Array of job titles for auto typing
    const jobTitles = [
      'Associate Software Engineer',
      'Pega Developer',
      'Shopify Developer',
      'Web Developer',
      'Tech Enthusiast'
    ];
    
    const initTypeIt = () => {
      if (typeTarget.value) {
        typeInstance = new TypeIt(typeTarget.value, {
          speed: 50,
          waitUntilVisible: true,
          loop: true,
          cursorChar: "|"
        });
        
        // Add strings with pauses and deletions
        jobTitles.forEach((title, index) => {
          typeInstance
            .type(title)
            .pause(2000)
            .delete();
          
          // Don't add a pause after the last item
          if (index < jobTitles.length - 1) {
            typeInstance.pause(300);
          }
        });
        
        typeInstance.go();
      }
    };
    
    const checkVisibility = () => {
      isVisible.value = window.scrollY < 300;
    };

    const contentStyleVars = ref({
      '--tilt-x': '0deg',
      '--tilt-y': '0deg',
      '--float-x': '0px',
      '--float-y': '0px'
    });

    const animateCursorRing = () => {
      ringX.value += (targetX - ringX.value) * 0.18;
      ringY.value += (targetY - ringY.value) * 0.18;
      trailX.value += (targetX - trailX.value) * 0.08;
      trailY.value += (targetY - trailY.value) * 0.08;
      animationFrameId = requestAnimationFrame(animateCursorRing);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorX.value = event.clientX;
      cursorY.value = event.clientY;
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      contentStyleVars.value = {
        '--tilt-x': `${ny * -5}deg`,
        '--tilt-y': `${nx * 7}deg`,
        '--float-x': `${nx * 14}px`,
        '--float-y': `${ny * 10}px`
      };
      isCursorMoving.value = true;
      if (moveTimeoutId) {
        window.clearTimeout(moveTimeoutId);
      }
      moveTimeoutId = window.setTimeout(() => {
        isCursorMoving.value = false;
      }, 110);
      const interactiveEl = event.target.closest('a, button, .btn');
      cursorActive.value = Boolean(interactiveEl);
    };

    const handlePointerLeave = () => {
      isCursorMoving.value = false;
      cursorActive.value = false;
      contentStyleVars.value = {
        '--tilt-x': '0deg',
        '--tilt-y': '0deg',
        '--float-x': '0px',
        '--float-y': '0px'
      };
    };
    
    onMounted(() => {
      // Initialize auto typing animation
      initTypeIt();
      
      // Set initial visibility
      isVisible.value = true;
      
      // Add scroll event for animations
      window.addEventListener('scroll', checkVisibility);

      const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isDesktopViewport = window.innerWidth >= 1024;
      enableCursorFx.value = supportsFinePointer && isDesktopViewport;

      if (enableCursorFx.value) {
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseleave', handlePointerLeave);
        animationFrameId = requestAnimationFrame(animateCursorRing);
      }
    });
    
    onUnmounted(() => {
      // Clean up TypeIt instance
      if (typeInstance) {
        typeInstance.destroy();
      }
      
      // Remove event listener
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (moveTimeoutId) {
        window.clearTimeout(moveTimeoutId);
      }
    });

    return {
      typeTarget,
      isVisible,
      cursorX,
      cursorY,
      ringX,
      ringY,
      trailX,
      trailY,
      cursorActive,
      enableCursorFx,
      isCursorMoving,
      contentStyleVars
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.home-section {
  --name-shine-gradient: linear-gradient(110deg, #111111 8%, #4b5563 34%, #0f172a 56%, #6b7280 78%, #0b0b0b 100%);
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(160deg, #f5f8ff 0%, #e9efff 100%);
  isolation: isolate;
  
  &.dark-mode {
    --name-shine-gradient: linear-gradient(110deg, #ffffff 8%, #f8fafc 34%, #e5e7eb 52%, #ffffff 72%, #f1f5f9 100%);
    background: linear-gradient(160deg, #0f172a 0%, #111827 100%);

    .greeting-text {
      color: $dark-secondary-text;
    }
    
    .auto-type {
      color: #d1d5db;
    }
  }
}

@media (pointer: fine) and (min-width: 1024px) {
  .home-section {
    cursor: none;
  }

  .home-section :deep(a),
  .home-section :deep(button),
  .home-section :deep(.btn) {
    cursor: none;
  }
}

.cursor-trail,
.cursor-orb,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 60;
  transform: translate3d(-100px, -100px, 0);
}

.cursor-trail {
  width: 120px;
  height: 120px;
  margin-left: -60px;
  margin-top: -60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0.08) 36%, rgba(99, 102, 241, 0) 72%);
  filter: blur(10px);
  opacity: 0.7;
  transition: opacity 0.2s ease;

  .dark-mode & {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.08) 38%, rgba(255, 255, 255, 0) 72%);
  }

  &.is-active {
    opacity: 0.95;
  }
}

.cursor-orb {
  width: 14px;
  height: 14px;
  margin-left: -7px;
  margin-top: -7px;
  border-radius: 50%;
  background: rgba(55, 65, 81, 0.55);
  box-shadow: 0 0 0 rgba(99, 102, 241, 0), 0 0 20px rgba(99, 102, 241, 0.25);
  transition: transform 0.14s ease, background-color 0.14s ease, box-shadow 0.18s ease;
  animation: cursorCorePulse 1.8s ease-in-out infinite;

  .dark-mode & {
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0), 0 0 24px rgba(255, 255, 255, 0.26);
  }

  &.is-active {
    transform: scale(1.3);
    box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.14), 0 0 28px rgba(99, 102, 241, 0.42);

    .dark-mode & {
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.15), 0 0 30px rgba(255, 255, 255, 0.48);
    }
  }

  .cursor-moving & {
    box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.1), 0 0 26px rgba(99, 102, 241, 0.36);
  }
}

.cursor-ring {
  width: 44px;
  height: 44px;
  margin-left: -22px;
  margin-top: -22px;
  border-radius: 50%;
  border: 1px solid rgba(55, 65, 81, 0.35);
  background: radial-gradient(circle, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0) 68%);
  box-shadow: 0 0 26px rgba(99, 102, 241, 0.18);
  transition: width 0.18s ease, height 0.18s ease, margin-left 0.18s ease, margin-top 0.18s ease, border-color 0.18s ease, box-shadow 0.2s ease;
  animation: cursorRingBreath 2.6s ease-in-out infinite;

  .dark-mode & {
    border-color: rgba(255, 255, 255, 0.5);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 68%);
    box-shadow: 0 0 28px rgba(255, 255, 255, 0.22);
  }

  &.is-active {
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    box-shadow: 0 0 34px rgba(99, 102, 241, 0.36);

    .dark-mode & {
      box-shadow: 0 0 36px rgba(255, 255, 255, 0.34);
    }
  }

  .cursor-moving & {
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 0 38px rgba(99, 102, 241, 0.32);

    .dark-mode & {
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 40px rgba(255, 255, 255, 0.34);
    }
  }
}

@keyframes cursorCorePulse {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.18);
  }
}

@keyframes cursorRingBreath {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.82;
  }
}

.home-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translate3d(var(--float-x, 0px), var(--float-y, 0px), 0);
  transform-style: preserve-3d;
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}

.greeting-text {
  font-size: $font-size-lg;
  color: $light-secondary-text;
  margin-bottom: $spacing-md;
  animation-delay: 0.3s;
}

.name-text {
  font-size: clamp($font-size-xxl, 6vw, 5rem);
  font-weight: 700;
  background: var(--name-shine-gradient);
  background-size: 240% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: $spacing-md;
  animation-delay: 0.6s;
  animation: shimmerName 6s linear infinite;
}

.auto-type {
  font-size: clamp($font-size-xl, 4vw, $font-size-xxl);
  color: #374151;
  margin-bottom: $spacing-xxl;
  font-weight: 500;
  min-height: 50px;
  animation-delay: 0.9s;
  
  span {
    display: inline-block;
  }
}

.actions {
  display: flex;
  gap: $spacing-md;
  align-items: center;
  flex-wrap: wrap;
  animation-delay: 1.2s;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    width: 100%;
    
    .home-btn {
      width: 100%;
      max-width: 100%;
      text-align: center;
    }
  }

  .btn {
    text-decoration: none;
  }
}

.home-btn {
  display: inline-flex;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  transition: transform $transition-fast, opacity $transition-fast;

  i {
    font-size: $font-size-base;
    flex-shrink: 0;
  }

  span {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  &:hover {
    transform: translateY(-2px);
    opacity: 0.94;
  }
}

.home-btn-primary {
  background: #4b5563;
  color: #f9fafb;
  box-shadow: none;
}

.home-btn-secondary {
  background: transparent;
  border-color: #6b7280;
  color: #374151;
}

.home-btn-primary:hover {
  color: #f9fafb;
}

.home-btn-secondary:hover {
  color: #374151;
}

.dark-mode .home-btn-primary:hover {
  color: #111827;
}

.dark-mode .home-btn-secondary:hover {
  color: #e5e7eb;
}

.dark-mode .home-btn-primary {
  background: #e5e7eb;
  color: #111827;
}

.dark-mode .home-btn-secondary {
  background: transparent;
  border-color: #9ca3af;
  color: #e5e7eb;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmerName {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 220% 50%;
  }
}
</style>
