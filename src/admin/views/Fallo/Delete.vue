<template lang="pug">
  .remove
    .section
      .title.is-3
        span Eliminar {{fallo.caratula}}
      .loading(v-if="Object.keys(fallo).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="deleteFallos", novalidate, v-if="Object.keys(fallo).length > 0")
        span ¿Realmente desea eliminar {{fallo.caratula}}?
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
      fallo: {},
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
        url: `/api/fallos/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.fallo = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/fallos");
        }
      );
    } else {
      this.$router.replace("/fallos");
    }
  },
  methods: {
    deleteFallos() {
      this.$http({
        method: "DELETE",
        url: `/api/fallos/${this.fallo._id}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "X-CSRF-TOKEN": this.csrf
        }
      }).then(
        () => {
          this.$router.replace(`/fallos`);
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
