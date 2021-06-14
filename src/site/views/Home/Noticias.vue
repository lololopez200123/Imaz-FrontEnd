<template lang="pug">
  .noticias
    .tarjeta.publicaciones
      .titulo
        span
          | Publicaciones
          | Diario La Ley
      .leer
        router-link(to="/noticias")
          span Leer
            i.arrow
              font-awesome-icon(icon="arrow-right")
    .tarjeta.fallos
      .titulo
        span
          | Fallos
          | Novedosos
      .leer
         router-link(to="/noticias/fallos-novedosos")
            span Leer
            i.arrow
              font-awesome-icon(icon="arrow-right")
    .tarjeta.links
      .titulo
        span
          | Links
          | de interés
      .leer
        router-link(to="/noticias/links-de-interes")
            span Leer
            i.arrow
              font-awesome-icon(icon="arrow-right")
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.noticias {
  width: 80%;
  display: flex;
  padding: 0 15px;
  @media all and (max-width: $btLG) {
    margin-top: 20px;
    padding-top: 120px;
    flex-direction: column;
  }
  .tarjeta {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    position: relative;
    @media all and (max-width: $btLG) {
      margin: 10px 0;
    }
    &.publicaciones {
      flex: 1.4;
      @media all and (max-width: $btLG) {
        flex: 1;
      }
    }
    &.fallos {
      flex: 1.2;
      @media all and (max-width: $btLG) {
        flex: 1;
      }
    }
    &.links {
      flex: 0.8;
      @media all and (max-width: $btLG) {
        flex: 1;
      }
    }
    .titulo {
      position: relative;
      z-index: 2;
      height: 100%;
      span {
        white-space: pre-line;
        font-family: $fontGibson;
        font-weight: 600;
        color: #fff;
        font-size: 54px;
        @media all and (max-width: $btSM) {
          font-size: 36px;
        }
      }
    }
    .leer {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      a {
        color: #fff;
        height: 35px;
        width: 150px;
        border-radius: 10px;
        background-color: $colorAzulBase;
        display: flex;
        padding: 0 20px;
        align-items: center;
        text-decoration: none;
        @include ease-transition;
        cursor: pointer;
        position: relative;
        &:hover {
          background-color: $colorAzulBase;
          span {
            color: #f0f0f0;
          }
        }
        span {
          font-family: $fontGibson;
          text-transform: uppercase;
          font-size: 85%;
          @include ease-transition;
        }
        
      }
    }
    .arrow {
            position: absolute;
            right: 0;
            padding-right: 15px;
          }
  }
}
</style>
