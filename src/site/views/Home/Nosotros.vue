<template lang="pug">
  .nosotros
    .contenido
      .titulo-grande.fadeIn(
        v-for="(item, index) in nosotros"
        v-if="itemActivo === index"
        :class="'item-' + itemActivo")
        span {{item.texto}}
      //- .lista-items
        .item(
          v-for="(item, index) in nosotros"
          :class="{active: itemActivo === index}")
          .indicador(@click="setItemActivo(index)")
          .titulo(:title="item.titulo")
            span {{item.titulo}}
      .conocenos
        router-link(to="/nosotros")
            span Nosotros
            i.arrow
              font-awesome-icon(icon="arrow-right")
    .imagen
      img(
        :class="imagenActiva === 0 ? 'fadeIn' : 'fadeOut'"
        src="@/assets/images/Home/fondo-home-1.jpg"
        alt="Estudio Imaz")
      img(
        :class="imagenActiva === 1 ? 'fadeIn' : 'fadeOut'"
        src="@/assets/images/Home/fondo-home-2.jpg"
        alt="Estudio Imaz")
    .firulete
      img(src="@/assets/images/Home/firulete.png")
</template>

<script>
import nosotros from "@/site/assets/data/home/nosotros.json";

export default {
  data() {
    return {
      itemActivo: 0,
      imagenActiva: 0,
      nosotros
    };
  },
  mounted() {
    const animateImagen = () => {
      if (this.imagenActiva === 0) {
        this.imagenActiva = 1;
        this.itemActivo = 1;
      } else {
        this.imagenActiva = 0;
        this.itemActivo = 0;
      }
      setTimeout(animateImagen, 8000);
    };

    setTimeout(animateImagen, 8000);
  },
  methods: {
    setItemActivo(index) {
      this.itemActivo = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.nosotros {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  @media all and (max-width: $btLG) {
    flex-direction: column;
  }
  .contenido {
    width: 50%;
    height: auto;
    position: absolute;
    bottom: calc(50% - 150px);
    z-index: 11;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
    padding-left: calc(10% + 15px);

    @media all and (max-width: $btLG) {
      width: 80%;
    }

    @media all and (max-width: $btMD - 1) {
      width: 100%;
      padding: 20px;
      justify-content: center;
      align-items: center;
      top: 0;
      bottom: unset;
    }

    .titulo-grande {
      display: flex;
      justify-content: center;
      align-items: center;
      /*height: 280px;*/
      margin-bottom: 20px;
      @media all and (max-width: $btLG) {
        /*text-align: center;*/
        margin-bottom: 30px;
        height: auto;
      }
      span {
        font-family: $fontGibson;
        font-weight: 600;
        color: #fff;
        font-size: 44px;
        @media all and (max-width: $btLG) {
          font-size: 32px;
        }
        @media all and (max-width: $btMD - 1) {
          font-size: 24px;
        }
      }
      &.item-1 {
        span {
          color: $colorGrisBase;
        }
      }
    }
    .conocenos {
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      width: 100%;
      height: 100px;
      position: relative;
      z-index: 12;
      @media all and (max-width: $btLG) {
        margin-bottom: 15px;
      }
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 180px;
        max-width: 180px;
        height: 40px;
        background-color: $colorAzulBase;
        color: #fff;
        text-decoration: none;
        border-radius: 10px;
        cursor: pointer;
        @include ease-transition;
        /*border: 1px solid rgba($colorAzulOscuro, 0.5);*/
        padding: 0 20px;
        position: relative;
        &:hover {
          span {
            /*margin-left: 30%;
            background-color: $colorAzulBase;*/
            color: #fff;
          }
        }
        span {
          margin-left: 10px;
          text-transform: uppercase;
          font-family: $fontGibson;
          text-transform: uppercase;
          /*background-color: $colorAzulOscuro;
          color: $colorAzulBase;*/
          height: 100%;
          @include ease-transition;
          display: flex;
          /*justify-content: center;*/
          align-items: center;
          border-radius: 25px;
          font-size: 90%;
          /*padding: 0 10px;*/
          width: 100%;
          position: relative;
          z-index: 2;
          .arrow {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
  .imagen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    @media all and (max-width: $btLG) {
      width: 100%;
      height: 50vh;
      min-height: 50vh;
    }
    /*&::before {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 600px 100px 0 0;
      border-color: $colorGrisBase transparent transparent transparent;
      z-index: 2;
      @media all and (max-width: $btLG) {
        display: none;
      }
    }*/
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .firulete {
    position: absolute;
    z-index: 10;
    bottom: -5px;
    width: 100vw;
    height: 0.15 * 100vw;
    left: 0;
    @media all and (max-width: $btLG) {
      display: none;
    }
    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
