import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { inject } from '@vercel/analytics'
import './assets/styles/main.scss'

// Import section components as pages
import HomeSection from './components/sections/HomeSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import CertificationsSection from './components/sections/CertificationsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

// Define routes
const routes = [
  { path: '/', component: HomeSection },
  { path: '/about', component: AboutSection },
  { path: '/experience', component: ExperienceSection },
  { path: '/skills', component: SkillsSection },
  { path: '/projects', component: ProjectsSection },
  { path: '/certifications', component: CertificationsSection },
  { path: '/contact', component: ContactSection }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const app = createApp(App)

// Use router
app.use(router)

// Inject Vercel Analytics
inject()

app.mount('#app')
