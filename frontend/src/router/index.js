
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../config/supabaseClient'
import { useAppStore } from '../store/appStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/admin/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/admin',
       name: 'admin',
       component: () => import('../views/admin/AdminLayout.vue'),
       meta: { requiresAuth: true },
       children: [
        {
        path: 'projects',
        name: 'projects',
        component: () => import('../views/admin/ProjectView.vue'),
        meta: { requiresAuth: true },
        },
        {
          path: 'projects/details/:id',
          name: 'projects-details',
          component: () => import('../components/ProjectDetails.vue'),
          // meta: { requiresAuth: true },
          },
        {
          path: 'projects/nuevo',
          name: 'new-project',
          component: () => import('../views/admin/NewProyect.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'projects/editar/:id',
          name: 'edit-project',
          component: () => import('../views/admin/EditProjectView.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'skills',
          name: 'Skills',
          component: () => import('../views/admin/SkillsView.vue'),
        },
        {
          path: 'skills/nuevo',
          name: 'new-skill',
          component: () => import('../components/skills/CreateSkills.vue'),
        },
        {
          path: 'skills/editar/:id',
          name: 'edit-skill',
          component: () => import('../components/skills/EditSkill.vue'),
        }

       ]
    },
  ]
})

//guard de navegacion, simpre toma los tres parametros que son to, from, next

router.beforeEach(async(to, from, next) => {
  // para saber si es necesario la autenticacion
  const {data: {session}} = await supabase.auth.getSession();
const requiresAuth = to.matched.some(record => record.meta.session)
  console.log( 'froml router', requiresAuth) 
  if (requiresAuth){
    
    //comprobar si el usuario esta autenticado
    useAppStore().openDialog = true
    next('/login')
  }else {
    // no esta protegido el endpoint por lo tanto mostramos la vista
    next()
  }
})

export default router
