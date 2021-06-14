<template lang="pug">
  .home
    .hero.is-primary
      .hero-body
        .title.is-5
          span Panel de administración
        .subtitle.is-6
          span Gestione su sitio por completo
    .section
      Login(v-if="!loggedIn")
</template>

<script>
import { mapState } from "vuex";

import Login from "@/admin/components/Users/Login";

export default {
  components: {
    Login
  },
  computed: {
    ...mapState("users", ["loggedIn"])
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.home {
  .title {
    margin: 20px 0;
    span {
      font-size: 200%;
    }
  }
}
</style>
