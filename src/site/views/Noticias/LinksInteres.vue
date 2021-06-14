<template lang="pug">
  .links-de-interes
    .header-section
      Header(
        seccionActiva="links-de-interes")
    .lista-links
      a.link(
        :href="link.url"
        target="_blank"
        v-for="link in links"
        :key="link.id")
        .firulete-izq
        .content
          .imagen
            img(
              :src="link.imagen")
          .titulo
            span {{link.titulo}}
          .flecha-ir
            font-awesome-icon(icon="chevron-right")
</template>

<script>
import Header from "./Header";

export default {
  components: {
    Header
  },
  data() {
    return {
      links: ""
    };
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/links"
    }).then(
      ({ data }) => {
        this.links = data;
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.links-de-interes {
  width: 100%;
  .header-section {
    padding: 0 40px;
    @media all and (max-width: $btMD) {
      padding: 0 10px;
    }
  }
  .lista-links {
    width: 100%;
    margin-top: 50px;
    a.link {
      position: relative;
      width: 100%;
      height: auto;
      padding: 20px 85px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      position: relative;
      @include ease-transition(300ms);
      &::after {
        position: absolute;
        bottom: 0;
        content: "";
        width: 70%;
        left: 15%;
        height: 1px;
        display: block;
        background-color: #ccc;
      }
      &:hover {
        background: linear-gradient(to bottom, #eee, #e1e1e1);
        @include sombra(0 0 10px 0 #666);
        .content {
          .titulo {
            span {
              color: $colorAzulBase;
            }
          }
        }
      }
      .firulete-izq {
        position: absolute;
        left: 0;
        width: 150px;
        height: 150px;
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../../../assets/images/firulete-izq.png");
        @media all and (max-width: $btMidMD) {
          bottom: 0;
          width: 60px;
          height: 250px;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin-bottom: 30px;
        padding: 30px 0;
        @media all and (max-width: $btMD) {
          flex-direction: column;
          justify-content: center;
        }
        .imagen {
          @include minmaxwh(180px);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          @include sombra(3px 3px 6px 0 #333);
          border-radius: 50%;
          overflow: hidden;
          margin-left: 30px;
          @media all and (max-width: $btMD) {
            margin: 0;
            margin-bottom: 25px;
            @include minmaxwh(85px);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .titulo {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 30px;
          @include ease-transition;
          @media all and (max-width: $btMD) {
            padding: 0 15px;
            margin-bottom: 25px;
          }
          span {
            /*font-family: $fontMontserratExtraBold;*/
            font-family: $fontGibson;
            font-weight: 600;
            color: $colorAzulPastelOscuro2;
            font-size: 200%;
            @include ease-transition;
            @media all and (max-width: $btMD) {
              font-size: 120%;
            }
          }
        }
        .flecha-ir {
          @include minmaxwh(48px);
          display: flex;
          justify-content: center;
          align-items: center;
          @include sombra(3px 3px 6px 0 #333);
          border-radius: 50%;
          margin-right: 30px;
          margin-left: 180px - 30px - 48px;
          background-color: $colorAzulOscuro;
          @include ease-transition;
          @media all and (max-width: $btMD) {
            @include minmaxwh(45px);
            margin: 0;
          }
          svg {
            font-size: 200%;
            color: $colorAzulBase;
          }
        }
      }
    }
  }
}
</style>
