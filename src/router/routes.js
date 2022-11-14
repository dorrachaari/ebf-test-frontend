
export default [
  {
    path: '/',
    name: 'default',
    meta: {
      authRequired: true,
    },
    component: () => {
      return import('@/components/EmployeesList.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta: {
    
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
    },
  },




]
