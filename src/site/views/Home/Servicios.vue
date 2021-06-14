<template lang="pug">
  .servicios
    .card-carousel-wrapper
      .card-carousel--nav__left(
        @click="moveCarousel(-1 * paginationOffset)"
        :disabled="atHeadOfList"
      )
        font-awesome-icon(icon="chevron-left")
      .card-carousel
        .card-carousel--overflow-container
          .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
            .card-carousel--card(v-for="(service, i) in services", :key="i")
              a(href="/home")
              span {{service}}
      .card-carousel--nav__right(
        @click="moveCarousel(1 * paginationOffset)"
        :disabled="atEndOfList"
      )
        font-awesome-icon(icon="chevron-right")
</template>

<script>
  export default {
    data() {
      return {
        services: [
          'Derecho civil', 'Siniestros Viales', 'Daños y Perjuicios', 'Derecho de seguros', 'Derecho laboral', 'Accidentes laborales', 'Despidos'
        ],
        currentOffset: 0,
        windowSize: 4,
        paginationFactor: 340,
        paginationOffset: 1,
        windowWidth: 0,
      };
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('resize', this.getWindowWidth);

        this.getWindowWidth()
      });
    },
    computed: {
      atEndOfList() {
        return this.currentOffset <= (this.paginationFactor * -1) * (this.services.length - this.windowSize);
      },
      atHeadOfList() {
        return this.currentOffset === 0;
      },
    },
    methods: {
      moveCarousel(direction) {
        if (direction >= 1 && !this.atEndOfList) {
          this.currentOffset -= (this.paginationFactor * direction);
        } else if (direction < 0 && !this.atHeadOfList) {
          this.currentOffset += (this.paginationFactor * (direction * -1));
        }
      },
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;

        if (this.windowWidth < 768) // $btMD
          this.windowSize = 1;
        else if (this.windowWidth <= 1199) { // $btXL
          this.windowSize = 2;
          this.paginationOffset = 1;
        } else if (this.windowWidth < 1400) { // $btXXL
          this.windowSize = 3;
          this.paginationOffset = 2;
        } else {
          this.windowSize = 4;
          this.paginationOffset = 3;
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    }
  };
</script>

<style lang="scss" scoped>
  @import "~Styles/_config.scss";
  .servicios {
    width: 100%;
    height: 100%;
    margin: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 30px;
    @include sombra(0 0 5px 0 #777);
    text-align: center;
    @media all and (max-width: $btLG) {
      padding: 60px 15px 15px;
      width: 95%;
      margin: 30px auto 20px;
    }

    .card-carousel-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0 40px;
    }

    .card-carousel {
      display: flex;
      justify-content: center;
      width: 300px;

      @media all and (min-width: $btMD) {
        width: 640px;
      }

      /*@media all and (min-width: $btLG) {
        width: 980px;
      }*/

      @media all and (min-width: $btXL) {
        /*width: 1200px;*/
        width: 980px;
      }
      
      @media all and (min-width: $btXXL) {
        width: 1320px;
      }


      &--overflow-container {
        overflow: hidden;
      }
  
      &--nav__left,
      &--nav__right {
        display: inline-block;
        position: absolute;
        top: 65px;
        right: 10%;
        font-size: 24px;
        cursor: pointer;
        transition: transform 150ms linear;
        z-index: 1;
        &[disabled] {
          opacity: 0.2;
          border-color: black;
        }
      }
  
      &--nav__left {
        margin-right: 50px;
        &:active {
          transform: scale(0.9);
        }
      }
  
      &--nav__right {
        margin-right: 20px;
        &:active {
          transform: scale(0.9);
        }
      }
    }

    .card-carousel-cards {
      display: inline-flex;
      transition: transform 150ms ease-out;
      transform: translatex(0px);
 
      .card-carousel--card {
        margin: 0 20px;
        cursor: pointer;
        background-color: $colorAzulPastelOscuro2;
        font-family: $fontGibson;
        font-size: 24px;
        color: #fff;
        z-index: 3;
        border-radius: 20px;
        padding: 45px 15px;
        width: 300px;
        
        &:first-child {
          margin-left: 0;
        }
    
        &:last-child {
          margin-right: 0;
        }
    
        span {
          vertical-align: bottom;
          transition: opacity 150ms linear;
          user-select: none;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
