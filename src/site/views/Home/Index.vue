<template lang="pug">
  .home
    //- BannerFormContacto
    .seccion.nosotros(:class="{active: seccionActiva === 'nosotros'}")
      //- .indicador
        span Nosotros
      Nosotros
    .fondo
      .seccion.servicios(:class="{active: seccionActiva === 'servicios'}")
        .title
          h1 Servicios
        .ribbon
          span.left 
            font-awesome-icon(icon="circle")
          hr.linea
          span.right 
            font-awesome-icon(icon="circle")
        Servicios
      .seccion.noticias(:class="{active: seccionActiva === 'noticias'}")
        .title
          h1 Noticias
        .ribbon
          span.left 
            font-awesome-icon(icon="circle")
          hr.linea
          span.right 
            font-awesome-icon(icon="circle")
        Noticias
      .seccion.anuncios(:class="{active: seccionActiva === 'anuncios'}")
        .title
          h1 Anuncios
        .ribbon
          span.left 
            font-awesome-icon(icon="circle")
          hr.linea
          span.right 
            font-awesome-icon(icon="circle")
        Anuncios
    Footer
</template>

<script>
import jQuery from "jquery";

import Anuncios from "./Anuncios";
import Nosotros from "./Nosotros";
import Servicios from "./Servicios";
import Noticias from "./Noticias";
import Footer from "@/site/components/General/Footer";
import BannerFormContacto from "@/site/components/General/BannerFormContacto";

export default {
  components: {
    Nosotros,
    Servicios,
    Noticias,
    Anuncios,
    Footer,
    BannerFormContacto
  },
  data() {
    return {
      screenOnFooter: false,
      seccionActiva: "nosotros",
      nextSeccion: "servicios"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.home {
  position: relative;
  @media all and (max-width: $btMD) {
    /*padding-bottom: 40px;*/
  }
  .fondo {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../../assets/images/Home/fondo.jpg");
    @media all and (max-width: $btMD) {
      background-image: url("../../../assets/images/Home/fondo-mobile.png");
    }
  }
  .seccion {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    @media all and (max-width: $btLG) {
      flex-direction: column;
      left: 0;
      top: 0;
      height: auto;
    }
    &.nosotros {
      height: 650px;
      @media all and (max-width: $btLG) {
        height: auto;
      }
      .indicador {
        left: 80px;
        top: -50px;
        @media all and (max-width: $btLG) {
          position: absolute;
          top: -50px;
          left: 15%;
        }
      }
    }
    &.servicios {
      height: 500px;
      margin-top: -10px;
      z-index: 25;
      color: $colorAzulBase;
      padding-bottom: 50px;
      @media all and (max-width: $btLG) {
        height: 400px;
        padding-bottom: 0;
      }
    }
    &.noticias {
      height: 600px;
      background-color: $colorAzulOscuro;
      color: $colorAzulBase;
      @media all and (max-width: $btLG) {
        height: auto;
      }
    }
    &.anuncios {
      height: 600px;
      background-color: #fff;
      color: $colorAzulBase;
      @media all and (max-width: $btLG) {
        height: 500px;
        justify-content: flex-end;
      }
    }
    .title {
      position: absolute;
      top: 65px;
      left: calc(10% + 15px);
      font-family: $fontGibson;
      font-weight: 600;
      h1 {
        margin: 0;
      }
    }
    .ribbon {
      top: 100px;
      position: absolute;
      width: 80%;
      font-size: 12px;
      color: $colorAzulBase;
      .linea {
        border-top: 2px solid $colorAzulBase;
        border-bottom: 0;
        width: calc(100% - 8px);
      }
      span {
        position: absolute;
        top: 0;
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
      }
    }
    .indicador {
      position: absolute;
      left: 40px;
      top: 40px;
      background-color: $colorCelesteAgua;
      border-radius: 15px;
      @include sombra(1px 1px 4px 0 #444);
      width: 130px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      @include ease-transition;
      @media all and (max-width: $btLG) {
        position: relative;
        left: 0;
        top: 0;
        width: 70% !important;
      }
      span {
        /*font-family: $fontMontserratRegular;*/
        font-family: $fontGibson;
        text-transform: uppercase;
        color: $colorAzulOscuro;
        font-size: 95%;
      }
    }
  }
}
</style>
