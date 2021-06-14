<template lang="pug">
  .header
    .indicador
      span Noticias
    .secciones
      router-link.seccion(
        to="/noticias"
        :class="{active: seccionActiva === 'publicaciones'}")
        span Publicaciones
      router-link.seccion(
        to="/noticias/fallos-novedosos"
        :class="{active: seccionActiva === 'fallos-novedosos'}")
        span Fallos novedosos
      router-link.seccion(
        to="/noticias/links-de-interes"
        :class="{active: seccionActiva === 'links-de-interes'}")
        span Links de interés
</template>

<script>
export default {
  props: ["seccionActiva"]
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.header {
  width: 100%;
  .indicador {
    position: absolute;
    right: 100px;
    top: 35px;
    height: 50px;
    border-radius: 25px;
    background-color: $colorCelesteAgua;
    @include sombra(3px 3px 7px 0 #aaa);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    @media all and (max-width: $btMD) {
      position: relative;
      margin: auto;
      right: auto;
      top: auto;
      margin-bottom: 35px;
      width: 200px;
      height: 35px;
    }
    span {
      color: $colorAzulBase;
      /*font-family: $fontMontserratRegular;*/
      font-family: $fontGibson;
      text-transform: uppercase;
      font-size: 120%;
      @media all and (max-width: $btMD) {
        font-size: 100%;
      }
    }
  }
  .secciones {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media all and (max-width: $btMD) {
      flex-wrap: wrap;
    }
    a.seccion {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $colorAzulOscuro;
      text-decoration: none;
      height: 45px;
      border-radius: 15px 15px 0 0;
      @include sombra(0 0 3px 0 #ccc);
      @include ease-transition;
      text-align: center;
      @media all and (max-width: $btMD) {
        width: 49%;
        background-color: #f2f7fa;
        border-radius: 15px;
        @include sombra(0 0 0 0 #000);
      }
      &:hover {
        background-color: #045084;
      }
      &.active {
        height: 65px;
        background-color: $colorAzulPastelOscuro2;
        @media all and (max-width: $btMD) {
          width: 100%;
          height: 45px;
          order: 5;
        }
        span {
          color: #fff;
        }
      }
      span {
        /*font-family: $fontMontserratRegular;*/
        font-family: $fontGibson;
        font-size: 150%;
        color: #ccc;
        @include ease-transition;
        @media all and (max-width: $btMD + 50) {
          font-size: 115%;
          color: #032e4c;
        }
      }
    }
  }
}
</style>
