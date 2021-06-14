<template lang="pug">
  .remove
    .section
      .title.is-3
        span Eliminar {{publicacion.titulo}}
      .loading(v-if="Object.keys(publicacion).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="deletePublicaciones", novalidate, v-if="Object.keys(publicacion).length > 0")
        span ¿Realmente desea eliminar {{publicacion.titulo}}?
        .botones
          .button.go-back.is-danger(@click="$router.go(-1)") Cancelar
          InputSubmit(
            :sent="sent"
            value="Eliminar"
            :noAclaracion="true")
</template>

<script>
import { mapState } from "vuex";

import InputSubmit from "@/admin/components/Forms/InputSubmit";

export default {
  components: {
    InputSubmit
  },
  data() {
    return {
      publicacion: {},
      sent: false
    };
  },
  computed: {
    ...mapState("users", ["token", "csrf"])
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/publicaciones/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.publicacion = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/publicaciones");
        }
      );
    } else {
      this.$router.replace("/publicaciones");
    }
  },
  methods: {
    deletePublicaciones() {
      this.$http({
        method: "DELETE",
        url: `/api/publicaciones/${this.publicacion._id}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "X-CSRF-TOKEN": this.csrf
        }
      }).then(
        () => {
          this.$router.replace(`/publicaciones`);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.remove {
  padding-bottom: 40px;
  form {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .botones {
      display: flex;
      .go-back {
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
