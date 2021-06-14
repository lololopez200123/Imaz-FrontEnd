<template lang="pug">
  .index
    Notification(v-if="notification.show")
    .section.hero.is-light
    .section
      .columns
        .column.is-one-quarter.is-one-fifth-fullhd
          Sidebar(@action="onActionSelect")
        .column
          .columns.is-multiline(v-if="profesionales.length")
            .column.is-half.is-one-third-desktop.is-one-quarter-widescreen(
              v-for="(profesional, index) in profesionales"
              :key="index"
              )
              Profesional(
                :profesional="profesional"
                :actionLink="accion")
          .loading(v-else)
            font-awesome-icon(icon="circle-notch", spin)

</template>
<script>
  import { mapState } from "vuex";
  import Sidebar from "./Sidebar";
  import Profesional from "./Profesional";
  import Notification from "./Notification";

  export default {
    components: {
      Sidebar,
      Profesional,
      Notification
    },
    data() {
      return {
        profesionales: [],
        notification: { show: false },
        accion: ''
      };
    },
    computed: {
      ...mapState("users", ["token"])
    },
    mounted() {
      this.$http({
        method: "GET",
        url: "/api/profesionales",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.profesionales = data;
        },
        error => {
          console.error(error);
        }
      );
    },
    methods: {
      onActionSelect(value) {
        this.accion = value;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~Styles/_config.scss";
  .index {

  }
</style>
