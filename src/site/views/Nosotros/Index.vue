<template lang="pug">
  .nosotros
    .indicador
      span Nosotros
    Header
    Historia(:v="1")
    Personas
    Historia(:v="2")
    MisionVision
    Valores
</template>

<script>
import Header from "./Header";
import Historia from "./Historia";
import Personas from "./Personas";
import MisionVision from "./MisionVision";
import Valores from "./Valores";

export default {
  components: {
    Header,
    Historia,
    Personas,
    MisionVision,
    Valores
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.nosotros {
  margin-bottom: 100px;
  .indicador {
    position: absolute;
    right: 100px;
    top: 35px;
    height: 50px;
    border-radius: 25px;
    background-color: #fff;
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
    }
    span {
      color: $colorAzulBase;
      /*font-family: $fontMontserratRegular;*/
      font-family: $fontGibson;
      text-transform: uppercase;
      font-size: 140%;
      @media all and (max-width: $btMD) {
        font-size: 120%;
      }
    }
  }
}
</style>
