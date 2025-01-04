
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// import { onAuthStateChanged } from 'firebase/auth'
// import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../config/supabaseClient'


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
      //  meta: { requiresAuth: true },
       children: [
        {
        path: 'projects',
        name: 'projects',
        component: () => import('../views/admin/ProjectView.vue'),
        // meta: { requiresAuth: true },
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

       ]
    },
  ]
})

//guard de navegacion, simpre toma los tres parametros que son to, from, next

// router.beforeEach(async(to, from, next) => {
//   // para saber si es necesario la autenticacion
//   const {data: { requiresAuth } }= await supabase.auth.getSession();

//   console.log( 'froml router', requiresAuth) 
//   if (requiresAuth){
    
//     //comprobar si el usuario esta autenticado
//     next('/login')
//   }else {
//     // no esta protegido el endpoint por lo tanto mostramos la vista
//     next()
//   }
// })

// function authenticateUser() {
//   // como estamos usando await y la funcion no es async  entonces debemos  usar promises para tomar los parametros que nos da el promise como ejemplo de una funcion async de esta manera se ejecutara uno de los dos paraetros que tenemos en el promise
//   const auth = useFirebaseAuth()

//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe()
//       if (user){
//         resolve()
//       }else{
//         reject()
//       }
//     })
//   })
// }
export default router
