import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AskQuestion from '../components/AskQuestion.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';

const routes = [
  { path: '/', component: HomePage , meta: { requiresAuth: true } },
  { path: '/ask', component: AskQuestion },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('access_token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/login');
  } else {
      next();
  }
});


export default router;
