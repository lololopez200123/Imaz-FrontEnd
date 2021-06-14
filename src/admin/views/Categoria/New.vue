<template lang="pug">
  .new
    .section
      .title.is-3
        span Nueva categoria
      form.control(@submit.prevent="saveCategoria", novalidate)
        InputText(
          :fieldSetter="set"
          name="nombre"
          label="Nombre"
          :invalidField="isFieldInvalid('nombre')"
          required="true")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm")
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
      categoria: {
        nombre: ""
      },
      sent: false
    };
  },
  computed: {
    ...mapState("users", ["token", "csrf"])
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
            method: "POST",
            url: "/api/categorias",
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: self.categoria
          })
          .then(
            ({ status, data }) => {
              if (status === 201) {
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
.new {
  padding-bottom: 40px;
}
</style>
