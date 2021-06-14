<template lang="pug">
  .remove
    .section
      .title.is-3
        span Eliminar {{categoria.nombre}}
      .loading(v-if="Object.keys(categoria).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="deleteCategorias", novalidate, v-if="Object.keys(categoria).length > 0")
        span ¿Realmente desea eliminar {{categoria.nombre}}?
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
      categoria: {},
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
        url: `/api/categorias/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.categoria = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/categorias");
        }
      );
    } else {
      this.$router.replace("/categorias");
    }
  },
  methods: {
    deleteCategorias() {
      this.$http({
        method: "DELETE",
        url: `/api/categorias/${this.categoria._id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        () => {
          this.$router.replace(`/categorias`);
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
