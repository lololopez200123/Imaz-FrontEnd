<template lang="pug">
  #root-app(:class="$route.name.toLowerCase()")
    MainMenu
    <router-view />
    ChatWapp  
</template>



<script>
import MainMenu from "@/site/components/General/MainMenu";
import ChatWapp from "@/site/components/General/ChatWapp";

export default {
  components: {
    MainMenu,
    ChatWapp,
  }
};
</script>

<style lang="scss" >
@import "~Styles/config";


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

html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box !important;
  button::-moz-focus-inner,
  a::-moz-focus-inner {
    border: 0;
  }
}

body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  #root-app {
    display: block;
    background-color: #fff;
    &.home {
      /*background-color: $colorGrisBase;*/
      & > .main-menu {
        height: 150px;
        @media all and (max-width: $btMD - 1) {
          height: 120px;
        }
      }
    }
    &.nosotros,
    &.contacto {
      & > .main-menu {
        height: 150px;
        @media all and (max-width: $btMD) {
          height: 130px;
        }
      }
    }
    &.publicaciones,
    &.fallosnovedosos,
    &.linksinteres {
      background-color: $colorGrisBase;
      & > .main-menu {
        height: 200px;
        @media all and (max-width: $btMD) {
          height: 130px;
        }
      }
    }
    &.publicaciones,
    &.fallosnovedosos {
      background-color: #fff;
    }
  }
}
</style>
