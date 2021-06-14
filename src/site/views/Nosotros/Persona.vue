<template lang="pug">
  .persona(:class="{ hovered: hovered }")
    .imagen
      img(
        :alt="persona.nombre"
        :src="hovered ? persona.imagen2 : persona.imagen1"
        @mouseover="hovered = true", @mouseout="hovered = false"
        )
      span(
        class="hidden"
        :style="{ 'background-image': 'url(' + persona.imagen2 + ')' }"
        )
    .datos
      .nombre
        span {{persona.nombre}}
      .profesion
        span {{persona.profesion}}
      .email
        a(
          :href="'mailto:' + persona.email"
          target="_blank") {{persona.email}}
</template>
<script>
  export default {
    data() {
      return {
        hovered: false
      }
    },
    props: ["persona"],
  }
</script>
<style lang="scss" scoped>
  @import "~Styles/_config.scss";
  .persona {
    // min-width: 300px;
    width: 29.333%;
    margin: 1.75% 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @include sombra(10px 0 25px 0 rgba(#000, 0.15));
    @media all and (max-width: $btMD - 50px) {
      // width: 45%;
      min-width: 285px;
    }
    .imagen {
      width: 100%;
      height: 0.55 * ((80vw - 6) / 3);
      /*min-height: 0.85 * (80vw / 3);*/
      display: flex;
      justify-content: center;
      /*align-items: center;*/
      @media all and (max-width: $btLG) {
        height: 0.55 * (90vw / 3);
        /*min-height: 0.85 * (90vw / 3);*/
      }
      @media all and (max-width: $btMD - 50px) {
        height: 0.55 * 285px;
        /*min-height: 0.85 * 285px;*/
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .hidden {
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
    .datos {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 100%;
      min-height: 115px;
      background-color: #fff;
      padding: 45px 0;
      * {
        color: $colorAzulPastelMedio;
        font-family: $fontGibson;
      }
      .profesion {
        margin-bottom: 3px;
        span {
          font-size: 110%;
        }
      }
      .nombre {
        margin-bottom: 3px;
        span {
          font-size: 120%;
        }
      }
      .email {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
        a {
          font-size: 110%;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>