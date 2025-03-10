import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('../views/Landing.vue')
        }
    ],
    history: createWebHistory(import.meta.env.BASE_URL) // TODO: Revisar lo que hace
})

export default router