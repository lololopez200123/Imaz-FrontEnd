<template lang="pug">
  .show
    Notification(v-if="notification.show", :type="notification.type", @cancel="closeNotification()", @delete="deleteProfesional()", @finish="goToList()")
    .section.hero.is-light
    .section
      .columns
        .column.is-one-quarter.is-one-fifth-fullhd
          Sidebar
        .column
          .columns.is-flex.is-justify-content-center
            .column.is-two-thirds-desktop
              .card.profesional.has-background-grey-lighter
                .level.mt-5.px-6
                  .level-left
                    .level-item
                  .level-right
                    .level-item
                      router-link.button(
                        :to="`/profesionales/${$route.params.id}/edit`"
                        tag="button"
                      ) Editar imagen
                .card-image.px-6.pb-3
                  span(@mouseover="hovered = true", @mouseout="hovered = false")
                    figure.image.is-square(v-show="!hovered")
                      img(
                        :src="profesional.imagen1"
                        :alt="profesional.nombre")
                    figure.image.is-square(v-show="hovered")
                      img(
                        :src="profesional.imagen2"
                        :alt="profesional.nombre")
                .card-content
                  .content
                    .level.px-5.mb-1.is-justify-content-flex-end
                      .level-right
                        .level-item
                          router-link.button(
                            :to="`/profesionales/${$route.params.id}/edit`"
                            tag="button"
                          ) Editar texto
                    .datos
                      .nombre
                        span {{ profesional.nombre }}                          
                      .profesion
                        span {{ profesional.profesion }}                          
                      .email
                        span {{ profesional.email }}                          
    .section.hero.is-light.bottom-section
      .columns
        .column.is-one-quarter.is-one-fifth-fullhd
        .column
          .columns.px-6.buttons
            .column.is-one-third.is-flex.is-justify-content-flex-start
              button.button.is-rounded.is-medium.is-white.is-danger.is-inverted(@click="onDeleteButton()")
                span.icon
                  i
                    font-awesome-icon(icon="trash-alt")
                span.text Eliminar
            .column.is-one-third.is-flex.is-justify-content-center
              button.button.is-rounded.is-medium.is-white.is-success.is-inverted(@click="goToList()")
                span.icon
                  i
                    font-awesome-icon(icon="undo-alt")
                span.text Volver
            .column.is-one-third.is-flex.is-justify-content-flex-end
              button.button.is-rounded.is-medium.is-dark.is-primary.is-inverted(disabled)
                span.icon
                  i
                    font-awesome-icon(icon="save")
                span.text Guardar
</template>
<script>
  import { mapState } from "vuex";

  import Sidebar from './Sidebar';
  import Notification from './Notification';

  export default {
    components: {
      Sidebar,
      Notification
    },
    data() {
      return {
        profesional: {},
        notification: { show: false, type: 'loading' },
        hovered: false
      };
    },
    computed: {
      ...mapState("users", ["token", "csrf"])
    },
    mounted() {
      if (this.$route.params.id) {
        this.notification = { show: true, type: 'loading' };
        this.$http({
          method: "GET",
          url: `/api/profesionales/${this.$route.params.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).then(
          ({ data }) => {
            this.profesional = data;
            this.notification = { show: false, type: 'loading' };
          },
          error => {
            console.error(error);
            this.$router.replace("/profesionales");
          }
        );
      } else {
        this.$router.replace("/profesionales");
      }
    },
    methods: {
      onDeleteButton() {
        this.showNotification('delete')
      },
      showNotification(type) {
        this.notification = { show: true, type: type };
      },
      closeNotification() {
        this.notification.show = false;
      },
      goToList() {
        this.$router.push('/profesionales');
      },
      deleteProfesional() {
        this.showNotification('deleting')
        this.$http({
          method: "DELETE",
          url: `/api/profesionales/${this.profesional._id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
            "X-CSRF-TOKEN": this.csrf
          }
        }).then(
          () => {
            this.showNotification('deleted')
            //this.$router.replace(`/profesionales`);
          },
          error => {
            this.closeNotification();
            console.error(error);
          }
        );
      },
    }
  };
</script>
<style lang="scss" scoped>
@import "~Styles/_config.scss";
.show {
  .profesional {
    .image {
      img {
        object-fit: cover;
      }
    }
    .datos {
      /*max-width: 60%;*/
      margin: 0 auto;
      > div {
        color: $colorAzulPastelMedio;
        font-family: $fontGibson;
        font-size: 22px;
        text-align: center;
      }
    }
  }
  .bottom-section {
    .buttons {
      .button {
        margin: 0;
        box-shadow: 0px 2px 6px 0px rgba(0,0,0,.4);
      }
      @media all and (max-width: $btMD) {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        .column {
          justify-content: center !important;
          .button {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>