<template lang="pug">
  .anuncios
    .card-carousel-wrapper
      .card-carousel--nav__left(
        @click="moveCarousel(-1)"
        :disabled="atHeadOfList"
      )
        font-awesome-icon(icon="chevron-left")
      .card-carousel
        .card-carousel--overflow-container
          .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
            .card-carousel--card(v-for="story in stories", :key="story.id")
              img(:src="story.media_url", v-if="story.media_type === 'IMAGE' || story.media_type === 'CAROUSEL_ALBUM'")
              video(:src="story.media_url", v-else-if="story.media_type === 'VIDEO'", controls)
      .card-carousel--nav__right(
        @click="moveCarousel(1)"
        :disabled="atEndOfList"
      )
        font-awesome-icon(icon="chevron-right")
</template>

<script>
  export default {
    data() {
      return {
        stories: [],
        currentOffset: 0,
        windowSize: 4,
        paginationFactor: 320,
        windowWidth: 0,
        token: "IGQVJXd0d4TmpNVW1mcXFleGx1TnVMX09qMndKQkxIZAFRPMUZARUzY2dDRIcUM1NUJDai1lcWZAMMFJWVXBEZAW8zTDB5bUZAKUm16SUw5SmdlY1gtSVl2U1FfdDItYm1XaGpHcU94Q1NrTnQ4TVdvWmVxYwZDZD"
      };
    },
    mounted() {
      this.$http({
        method: "GET",
        url: "https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=" + this.token
      }).then(
        ({ data }) => {
          this.stories = data.data;
        },
        error => {
          console.error(error);
        }
      );
      this.$nextTick(function () {
        window.addEventListener('resize', this.getWindowWidth);

        this.getWindowWidth()
      });
    },
    computed: {
      atEndOfList() {
        return this.currentOffset <= (this.paginationFactor * -1) * (this.stories.length - this.windowSize);
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
        else if (this.windowWidth < 992) // $btLG
          this.windowSize = 2;
        else if (this.windowWidth <= 1199) // $btXL
          this.windowSize = 3;
        else
          this.windowSize = 4;
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    }
  };
</script>

<style lang="scss" scoped>

  @import "~Styles/_config.scss";

  .anuncios {
  
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
        width: 620px;
      }

      @media all and (min-width: $btLG) {
        width: 940px;
      }

      @media all and (min-width: $btXL) {
        width: 1260px;
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
      display: flex;
      transition: transform 150ms ease-out;
      transform: translatex(0px);
 
      .card-carousel--card {
        margin: 0 10px;
        cursor: pointer;
        background-color: #fff;
        z-index: 3;
    
        &:first-child {
          margin-left: 0;
        }
    
        &:last-child {
          margin-right: 0;
        }
    
        img {
          vertical-align: bottom;
          transition: opacity 150ms linear;
          user-select: none;
          width: 300px;
          height: 300px;
          &:hover {
            opacity: 0.8;
          }
        }
        video {
          vertical-align: bottom;
          transition: opacity 150ms linear;
          user-select: none;
          width: 300px;
          height: 300px;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
