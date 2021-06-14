<template lang="pug">
  .main-menu
    .black-screen.fadeIn(
      v-if="drawerOpen"
      @click="toggleDrawer")
    .menu-drawer(
      :class="{closed: !drawerOpen, flotante: drawerOpen && flotante}")
      //- .close-drawer(@click="toggleDrawer")
        font-awesome-icon(icon="times")
      .lista-links
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('/', true)")
          span Inicio
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('/nosotros', true)")
          span Nosotros
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('servicios')")
          span Servicios
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('/noticias', true)")
          span Noticias
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('anuncios')")
          span Anuncios
        .link(
          :class="{animateLinkInFromRight: drawerOpen}"
          @click="goTo('/contacto', true)")
          span Contacto
    .menu-toggler(
      @mouseover="setHover"
      @mouseout="setNotHover"
      @click="toggleDrawer"
      :class="{hover: isHover, animateOpen: animateOpen, animateClose: animateClose}")
      .cover.slideOutUp(
        :class="[{slideInLeft: isHover}, {loaded: loaded}]")
      .bar
      .bar
      .bar
    a.logo(href="/")
      img(src="@/assets/images/logo.png")
    .social-icons
      span
        a.icon(:href="'tel:'+ phone") 
          //- font-awesome-icon(icon="mobile")
          img(src="@/assets/images/Header/telefono.png")
      span
        a.icon(:href="'mailto:' + email", target="_blank") 
          //- font-awesome-icon(icon="at")
          img(src="@/assets/images/Header/mail.png")
      span
        a.icon(:href="linkedin", target="_blank") 
          //- font-awesome-icon(:icon="['fab', 'linkedin']")
          img(src="@/assets/images/Header/linkedin.png")
      span
        a.icon(:href="instagram", target="_blank") 
          //- font-awesome-icon(:icon="['fab', 'instagram']")
          img(src="@/assets/images/Header/instagram.png")
</template>

<script>
import jQuery from "jquery";

export default {
  data() {
    return {
      flotante: false,
      loaded: false,
      isHover: false,
      drawerOpen: false,
      animateOpen: false,
      animateClose: false,
      phone: '+5492994823288',
      email: 'imazyasociados@estudioimaz.com.ar',
      linkedin: 'https://www.linkedin.com/in/estudio-jur%C3%ADdico-imaz-y-asociados-46b35a1b5/',
      instagram: 'https://www.instagram.com/imazyasociados/'
    };
  },
  mounted() {
    const isFirefox = !!/Firefox/i.test(navigator.userAgent);

    if (isFirefox) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 20) {
          this.flotante = true;
          this.isHover = true;
        } else {
          this.flotante = false;
          this.isHover = false;
        }
      });
    } else {
      window.addEventListener("mousewheel", () => {
        if (window.pageYOffset > 20) {
          this.flotante = true;
          this.isHover = true;
        } else {
          this.flotante = false;
          this.isHover = false;
        }
      });
    }

    setTimeout(() => {
      this.loaded = true;
    }, 500);
  },
  methods: {
    setHover() {
      this.isHover = true;
    },
    setNotHover() {
      if (!this.flotante) {
        this.isHover = false;
      }
    },
    toggleDrawer() {
      // this.isHover = false;
      if (!this.drawerOpen) {
        this.drawerOpen = true;
        this.animateOpen = true;
        this.animateClose = false;
      } else {
        this.drawerOpen = false;
        this.animateOpen = false;
        this.animateClose = true;
      }
    },
    // closeDrawer() {
    //   this.drawerOpen = false;
    // },
    goTo(seccion, isLink = false) {
      // this.drawerOpen = false;
      this.toggleDrawer();
      if (!isLink) {
        if (seccion === "inicio") {
          jQuery("html, body").animate(
            {
              scrollTop: 0
            },
            500
          );
        } else if (seccion === "anuncios" || seccion === "servicios") {
          const doScroll = () => {
            jQuery("html, body").animate(
              {
                scrollTop:
                  document.querySelector(seccion === "anuncios" ? "body .fondo .anuncios" : "body .fondo")
                    .offsetTop + 170
              },
              500
            );
          };

          if (this.$route.path !== "/") {
            this.$router.push("/", () => {
              setTimeout(doScroll, 500);
            });
          } else {
            doScroll();
          }
        }
      } else {
        this.$router.push(seccion);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.main-menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .black-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(#000, 0.5);
    z-index: 50;
  }
  .menu-drawer {
    position: fixed;
    right: 0;
    top: 0;
    width: 30vw;
    min-width: 300px;
    height: 100vh;
    background-color: $colorGrisBase;
    z-index: 100;
    @include sombra(0 0 12px 0 #000);
    @include ease-transition(500ms);
    &.closed {
      -webkit-transform: translateX(120%);
      transform: translateX(120%);
    }
    &.flotante {
      background-color: $colorAzulBaseOpacoClaro;
      .lista-links {
        .link {
          &:hover {
            @include sombra(0 1px 1px 0 #555);
          }
          span {
            color: #fff;
          }
        }
      }
    }
    .close-drawer {
      position: absolute;
      right: 15px;
      top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      @include minmaxwh(48px);
      cursor: pointer;
      opacity: 0.5;
      @include ease-transition;
      &:hover {
        opacity: 1;
      }
      svg {
        font-size: 200%;
        color: $colorAzulBase;
      }
    }
    .lista-links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      .link {
        width: 100%;
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        // @include sombra(0 2px 1px 0 #aaa);
        @include ease-transition;
        @media all and (max-width: $btMD) {
          height: 60px;
        }
        &.animateLinkInFromRight {
          span {
            -webkit-animation-name: animateLinkInFromRight;
            animation-name: animateLinkInFromRight;
            -webkit-animation-duration: 300ms;
            animation-duration: 300ms;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-delay: 300ms;
            animation-delay: 300ms;
          }
        }
        &:hover {
          @include sombra(0 2px 2px 0 #ccc);
        }
        &:active {
          background-color: $colorAzulBaseOpacoClaro;
          @include sombra(inset 0 1px 4px 0 #444);
        }
        span {
          color: $colorAzulBase;
          /*font-family: $fontMontserratRegular;*/
          font-family: $fontGibson;
          text-transform: uppercase;
          font-size: 150%;
          @include not-selectable;
          @media all and (max-width: $btMD) {
            font-size: 120%;
          }
        }
      }
    }
  }
  .menu-toggler {
    z-index: 300;
    position: fixed;
    right: 25px;
    top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @include minmaxwh(55px);
    cursor: pointer;
    @include ease-transition;
    overflow: hidden;
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: $colorAzulBaseOpacoClaro;
      opacity: 0;
      // @media all and (max-width: $btMD) {
      //   display: none;
      // }
      &.loaded {
        opacity: 1;
        -webkit-animation-duration: 300ms !important;
        animation-duration: 300ms !important;
      }
    }
    &.hover {
      .bar {
        background-color: #fff;
        // @media all and (max-width: $btMD) {
        //   background-color: $colorAzulBaseOpacoClaro;
        // }
      }
    }
    &.animateOpen {
      .bar {
        &:nth-of-type(2) {
          -webkit-animation-duration: 500ms;
          animation-duration: 500ms;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          transform: translate3d(0, 0, 0);
          -webkit-animation-name: downAndRotateLeft;
          animation-name: downAndRotateLeft;
          // @media all and (max-width: $btMD) {
          //   -webkit-animation-name: downAndRotateLeftMD;
          //   animation-name: downAndRotateLeftMD;
          // }
        }
        &:nth-of-type(3) {
          @include escalar(0);
        }
        &:nth-of-type(4) {
          -webkit-animation-name: downAndRotateRight;
          animation-name: downAndRotateRight;
          -webkit-animation-duration: 500ms;
          animation-duration: 500ms;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          transform: translate3d(0, 0, 0);
          // @media all and (max-width: $btMD) {
          //   -webkit-animation-name: downAndRotateRightMD;
          //   animation-name: downAndRotateRightMD;
          // }
        }
      }
    }
    &.animateClose {
      .bar {
        &:nth-of-type(2) {
          -webkit-animation-duration: 500ms;
          animation-duration: 500ms;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          transform: translate3d(0, 0, 0);
          -webkit-animation-name: upAndRotateRight;
          animation-name: upAndRotateRight;
          // @media all and (max-width: $btMD) {
          //   -webkit-animation-name: upAndRotateRightMD;
          //   animation-name: upAndRotateRightMD;
          // }
        }
        &:nth-of-type(3) {
          @include escalar(1);
        }
        &:nth-of-type(4) {
          -webkit-animation-duration: 500ms;
          animation-duration: 500ms;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          transform: translate3d(0, 0, 0);
          -webkit-animation-name: upAndRotateLeft;
          animation-name: upAndRotateLeft;
          // @media all and (max-width: $btMD) {
          //   -webkit-animation-name: upAndRotateLeftMD;
          //   animation-name: upAndRotateLeftMD;
          // }
        }
      }
    }
    .bar {
      width: 45px;
      height: 3px;
      display: block;
      margin: 5px 0;
      border-radius: 2px;
      background-color: $colorAzulPastelOscuro;
      @include ease-transition;
      position: relative;
    }
  }
  a.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 35px;
    width: 165px;
    height: 0.438 * 165px;
    @media all and (max-width: $btMD - 1) {
      width: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50px;
    left: 50px;

    @media all and (max-width: $btMD - 1) {
      top: 0;
      padding: 6px 0 3px;
      left: 0;
      right: 0;
      background-color: $colorGrisBase;
    }

    span {
      padding-left: 25px;
        &:first-child {
          padding-left: 0;
        }
    }
    .icon {
      font-size: 18px;
      font-weight: 600;
      color: $colorAzulPastelOscuro;
      @include ease-transition;

      img {
        height: 18px;
        &:hover {
          filter: brightness(0.1) invert(0.6) sepia(0.6) hue-rotate(160deg) saturate(400%);
        }
      }

      @media all and (max-width: $btMD - 1) {
        font-size: 15px;
        img {
          height: 15px;
        }
      }

    }
  }
}
</style>
