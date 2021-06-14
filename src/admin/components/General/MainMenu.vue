<template lang="pug">
  .main-menu
    nav.navbar(
      role='navigation'
      aria-label='main navigation')
      .navbar-brand
        router-link.navbar-item(to='/')
          img(src='@/assets/images/logo.png', alt='IMAZ')
        a.navbar-burger(
          role='button'
          aria-label='menu'
          aria-expanded='false'
          :class="{'is-active': menuOpen}"
          @click="toggleMenu")
          span(aria-hidden='true')
          span(aria-hidden='true')
          span(aria-hidden='true')
      .navbar-menu(:class="{'is-active': menuOpen}")
        .navbar-start
          router-link.navbar-item(to="/") Home
          //- router-link.navbar-item(
          //-   v-if="loggedIn"
          //-   to="/categorias") Categorias
          //- router-link.navbar-item(
          //-   v-if="loggedIn"
          //-   to="/noticias") Noticias
          router-link.navbar-item(
            v-if="loggedIn"
            to="/publicaciones") Publicaciones
          router-link.navbar-item(
            v-if="loggedIn"
            to="/fallos") Fallos novedosos
          router-link.navbar-item(
            v-if="loggedIn"
            to="/links") Links de interés
          router-link.navbar-item(
            v-if="loggedIn"
            to="/profesionales") Profesionales
        .navbar-end(v-if="loggedIn")
          .navbar-item.has-dropdown.is-hoverable
            .navbar-link Usuario
            .navbar-dropdown.is-right
              a.navbar-item(@click="doLogout") Cerrar sesión
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    ...mapState("users", ["loggedIn"])
  },
  methods: {
    ...mapActions("users", ["logout"]),
    toggleMenu() {
      if (this.menuOpen) {
        this.menuOpen = false;
      } else {
        this.menuOpen = true;
      }
    },
    doLogout() {
      this.logout();
      this.$router.replace("/admin");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.main-menu {
}
</style>
