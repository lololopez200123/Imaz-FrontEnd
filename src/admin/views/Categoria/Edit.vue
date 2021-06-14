<template lang="pug">
  .edit
    .section
      .title.is-3
        span Editar {{categoria.nombre}}
      .loading(v-if="Object.keys(categoria).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="saveCategoria", novalidate, v-if="Object.keys(categoria).length > 0")
        InputText(
          :fieldSetter="set"
          name="nombre"
          label="nombre"
          :invalidField="isFieldInvalid('nombre')"
          required="true"
          :value="categoria.nombre")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm"
          value="Guardar")
</template>

<script>
import { mapState } from "vuex";

import InputText from "@/admin/components/Forms/InputText";
import InputSubmit from "@/admin/components/Forms/InputSubmit";

export default {
  components: {
    InputText,
    InputSubmit
  },
  data() {
    return {
      categoria: {},
      sent: false
    };
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
  computed: {
    ...mapState("users", ["token"])
  },
  methods: {
    set(name, value) {
      this.categoria[name] = value;
    },
    saveCategoria() {
      this.sent = true;
      const self = this;
      const performSave = () => {
        self
          .$http({
            method: "PUT",
            url: `/api/categorias/${this.categoria._id}`,
            headers: {
              Authorization: `Bearer ${self.token}`
            },
            body: self.categoria
          })
          .then(
            ({ status, data }) => {
              if (status === 200) {
                self.$router.replace(`/categorias/${data._id}`);
              }
            },
            error => {
              console.error(error);
              this.sent = false;
            }
          );
      };
      performSave();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.edit {
  padding-bottom: 40px;
}
</style>
