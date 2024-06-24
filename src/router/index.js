import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import QuestionDetail from '../components/QuestionDetail.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import AskQuestion from '../components/AskQuestion.vue';
import store from '../store';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/questions/:id', name: 'QuestionDetail', component: QuestionDetail },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/ask', name: 'AskQuestion', component: AskQuestion }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
