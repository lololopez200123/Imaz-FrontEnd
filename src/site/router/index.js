import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/site/views/Home/Index";
import Nosotros from "@/site/views/Nosotros/Index";
// import Noticias from '@/site/views/Noticias/Index';
import Publicaciones from "@/site/views/Noticias/Publicaciones";
import FallosNovedosos from "@/site/views/Noticias/FallosNovedosos";
import LinksInteres from "@/site/views/Noticias/LinksInteres";
import Contacto from "@/site/views/Contacto/Index";
import store from "@/site/store/index";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: 'Estudio Imaz',
        metaTags: [
          {
            name: 'description',
            content: 'Estudio jurídico Imaz, una firma con más de 20 años de trayectoria en la región de Neuquén capital. Nuestros servicios: Derecho civil Siniestros Viales Daños y Perjuicios. Derecho de seguros. Derecho laboral. Accidentes laborales.'
          },
          {
            property: 'og:description',
            content: 'Estudio jurídico Imaz, una firma con más de 20 años de trayectoria en la región de Neuquén capital. Nuestros servicios: Derecho civil Siniestros Viales Daños y Perjuicios. Derecho de seguros. Derecho laboral. Accidentes laborales.'
          },
          {
            name: 'keywords',
            content: 'Abogados Neuquen, Derecho penal Neuquen, Siniestro y accidentes Neuquen, Defensa judicial Neuquen, Derecho laboral Neuquen, Estudío jurídico neuquen, Derecho civil, Siniestros Viales, Daños y Perjuicios, Derecho de seguros, Derecho laboral, Accidentes laborales, Despidos'
          }
        ]
      }
      // meta: {
      //   someProp: true,
      // },
    },
    {
      path: "/nosotros",
      name: "Nosotros",
      component: Nosotros,
      meta: {
        title: 'Estudio Imaz - Nosotros',
        metaTags: [
          {
            name: 'description',
            content: 'Estudio jurídico Imaz es una firma con más de 20 años de trayectoria en la región de Neuquén capital. Grupo consolidado para dar una excelencia en la asistencia integral a nuestros clientes.'
          },
          {
            property: 'og:description',
            content: 'Estudio jurídico Imaz es una firma con más de 20 años de trayectoria en la región de Neuquén capital. Grupo consolidado para dar una excelencia en la asistencia integral a nuestros clientes.'
          },
          {
            name: 'keywords',
            content: 'Aistencia integral abogados, Abogados Neuquén, Joaquin Andres Imaz, Sabrina Maricel Cortes, Natalia Nadina Besso, Gabriel Alejandro Contrera, Andres Potolicchio Boscarino, María Celeste Caceres Russo, Susana Noemi Balboa Narambuena, Alejandro Daniel Lagos, Paula Gimena Gutierrez, Derecho de daños y perjuicios'
          }
        ]
      }
      // meta: {
      //   someProp: true,
      // },
    },
    {
      path: "/noticias",
      name: "Publicaciones",
      component: Publicaciones,
      meta: {
        title: 'Estudio Imaz - Publicaciones',
        metaTags: [
          {
            name: 'description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            property: 'og:description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            name: 'keywords',
            content: 'Noticias derecho penal, Publicaciones Diario La Ley, Fallos-novedosos, Noticias derecho judicial, Links interes abogados Neuquen'
          }
        ]
      }
    },
    {
      path: "/noticias/fallos-novedosos",
      name: "FallosNovedosos",
      component: FallosNovedosos,
      meta: {
        title: 'Estudio Imaz - Fallos Novedosos',
        metaTags: [
          {
            name: 'description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            property: 'og:description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            name: 'keywords',
            content: 'Noticias derecho penal, Publicaciones Diario La Ley, Fallos-novedosos, Noticias derecho judicial, Links interes abogados Neuquen'
          }
        ]
      }
    },
    {
      path: "/noticias/links-de-interes",
      name: "LinksInteres",
      component: LinksInteres,
      meta: {
        title: 'Estudio Imaz - Links de Interés',
        metaTags: [
          {
            name: 'description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            property: 'og:description',
            content: 'Noticias de derecho jurídico. Casos judiciales de Neuquén Capital. Estudio jurídico de Neuquen Capital.'
          },
          {
            name: 'keywords',
            content: 'Noticias derecho penal, Publicaciones Diario La Ley, Fallos-novedosos, Noticias derecho judicial, Links interes abogados Neuquen'
          }
        ]
      }
    },
    {
      path: "/contacto",
      name: "Contacto",
      component: Contacto,
      meta: {
        title: 'Estudio Imaz - Contacto',
        metaTags: [
          {
            name: 'description',
            content: 'Ubicación Estudio Imaz & Asoc.'
          },
          {
            property: 'og:description',
            content: 'Ubicación Estudio Imaz & Asoc.'
          },
          {
            name: 'keywords',
            content: 'Entre Ríos 154, Neuquen Patagonia Argentina, Neuquen Argentina'
          }
        ]
      }
    },
    
    // {
    //   path: '/page',
    //   name: 'page',
    //   // route level code-splitting
    //   // this generates a separate chunk (page.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "page" */ './views/Page.vue'),
    // },

    { path: "*", redirect: "/" }
    
  ],
  scrollBehavior() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 50);
    });
  }
});

router.beforeEach((to, from, next) => {
  Vue.$ga.page(to.fullPath);

  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if (nearestWithMeta) {
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));
  }


  if (to.matched.some(record => record.meta.someProp)) {
    if (!store.state.someObj.someVal) {
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
