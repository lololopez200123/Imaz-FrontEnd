import Vue from "vue";
import Router from "vue-router";
import Home from "@/admin/views/Home";

import store from "@/admin/store/index";

// import {default as example} from './example';

// import {default as categoria} from './categoria';
// import {default as noticia} from './noticia';

import { default as publicacion } from "./publicacion";
import { default as fallo } from "./fallo";
import { default as link } from "./link";
import { default as profesional } from "./profesional";

Vue.use(Router);

const router = new Router({
  base: `${process.env.BASE_URL}/admin`,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
      // meta: {
      //   someProp: true,
      // },
    },

    // ...example(),

    // ...categoria(),
    // ...noticia(),

    ...publicacion(),
    ...fallo(),
    ...link(),
    ...profesional(),

    // {
    //   path: '/page',
    //   name: 'page',
    //   // route level code-splitting
    //   // this generates a separate chunk (page.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "page" */ './views/Page.vue'),
    // },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.state.users.loggedIn) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
