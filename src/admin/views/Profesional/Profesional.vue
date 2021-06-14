<template lang="pug">
  .profesional(
    @click="goTo(profesional._id)"
    :class="actionLink ? 'clickable':'none'"
    )
    .card
      .card-image
        figure.image.is-square
          img(
            :alt="profesional.nombre"
            :src="hovered?profesional.imagen2:profesional.imagen1"
            @mouseover="hovered = true"
            @mouseout="hovered = false"
            )
          span.hidden(
            :style="'background-image: url('+ profesional.imagen2 +')'"
          )
      .card-content
        .content
          .datos
            .nombre
              span {{profesional.nombre}}
            .profesion
              span {{profesional.profesion}}
            .email
              span {{ profesional.email }}
</template>
<script>
  export default {
    data() {
      return {
        hovered: false
      }
    },
    props: ["profesional", "actionLink"],
    methods: {
      goTo(id) {
        if (this.actionLink !== '') {
          if (this.actionLink === "edit") {
            this.$router.push(`/profesionales/${id}/edit`)
          } else if (this.actionLink === "show") {
            this.$router.push(`/profesionales/${id}`)
          }
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  @import "~Styles/_config.scss";

  .profesional {
    &.clickable {
      cursor: pointer;
    }
    .image {
      img {
        object-fit: cover;
      }
      .hidden {
        width: 0;
        height: 0;
        visibility: hidden;
      }    
    }
    .content {
      .datos {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        width: 100%;
        background-color: #fff;
        * {
          color: $colorAzulPastelMedio;
        }
        .profesion {
        }
        .nombre {
        }
        .email {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>