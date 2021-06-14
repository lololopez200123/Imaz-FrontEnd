<template lang="pug">
  #root-app
    .container.is-fullhd
      MainMenu
      RouterView
</template>

<script>
import MainMenu from "@/admin/components/General/MainMenu";

export default {
  components: {
    MainMenu
  },
  mounted() {
    this.$http.headers.common.prueba = 123;
    // console.log(window.App.$http.options.common);
    // this.$http({
    //   method: 'GET',
    //   url: '/api/usuarios/gtcf',
    // }).then(
    //   ({ data }) => {
    //
    //     // axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrfToken
    //   },
    //   error => {
    //     console.error(error);
    //   },
    // );
  }
};
</script>

<style lang="scss">
@import "~Styles/config";
@import "~Styles/bulma-overwrite";
@import "~bulma/bulma.sass";

  @font-face {
    font-family: "Gibson";
    src: url("../assets/fonts/Gibson.ttf") format("truetype"), url("../assets/fonts/Gibson.woff") format("woff");
    font-weight: 400;
  }

  @font-face {
    font-family: "Gibson";
    src: url("../assets/fonts/Gibson-SemiBold.ttf") format("truetype"), url("../assets/fonts/Gibson-SemiBold.woff") format("woff");
    font-weight: 600;
  }

  @font-face {
    font-family: "Gibson";
    src: url("../assets/fonts/Gibson-Light.ttf") format("truetype"), url("../assets/fonts/Gibson-Light.woff") format("woff");
    font-weight: 300;
  }

ul {
  padding: 25px;
  list-style: initial !important;
  li {
    list-style: initial !important;
  }
}

ol {
  padding: 25px;
  list-style: decimal !important;
  li {
    list-style: decimal !important;
  }
}

body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  #root-app {
    display: block;
    * {
      box-sizing: border-box !important;
    }
  }
}
</style>
