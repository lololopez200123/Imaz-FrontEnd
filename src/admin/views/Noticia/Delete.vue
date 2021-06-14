<template lang="pug">
  .remove
    .section
      .title.is-3
        span Eliminar {{noticia.titulo}}
      .loading(v-if="Object.keys(noticia).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="deleteNoticias", novalidate, v-if="Object.keys(noticia).length > 0")
        span ¿Realmente desea eliminar {{noticia.titulo}}?
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
      noticia: {},
      sent: false
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/noticias/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.noticia = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/noticias");
        }
      );
    } else {
      this.$router.replace("/noticias");
    }
  },
  methods: {
    deleteNoticias() {
      this.$http({
        method: "DELETE",
        url: `/api/noticias/${this.noticia._id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        () => {
          this.$router.replace(`/noticias`);
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
