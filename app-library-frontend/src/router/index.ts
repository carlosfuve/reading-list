import Landing from '@/components/Landing.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing
        }
    ],
    history: createWebHistory(import.meta.env.BASE_URL) // TODO: Revisar lo que hace
})

export default router