<template lang="pug">
  .new
    .section
      .title.is-3
        span Nuevo fallo novedoso
      form.control(@submit.prevent="saveFallo", novalidate)
        InputText(
          :fieldSetter="set"
          name="caratula"
          label="Caratula"
          :invalidField="isFieldInvalid('caratula')"
          required="true")
        InputText(
          :fieldSetter="set"
          name="expediente"
          label="Expediente"
          :invalidField="isFieldInvalid('expediente')"
          required="true")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(fallo.texto) === '' || isFieldInvalid('texto')"
          required="true")
        InputDate(
          :fieldSetter="set"
          name="pubdate"
          label="Fecha de publicación"
          :invalidField="isFieldInvalid('pubdate')"
          required="true")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm")
</template>

<script>
import { mapState } from "vuex";

import InputText from "@/admin/components/Forms/InputText";
import Wysiwyg from "@/admin/components/Forms/Wysiwyg";
import InputDate from "@/admin/components/Forms/InputDate";
import InputSubmit from "@/admin/components/Forms/InputSubmit";

export default {
  components: {
    InputText,
    Wysiwyg,
    InputDate,
    InputSubmit
  },
  data() {
    return {
      fallo: {
        caratula: "",
        expediente: "",
        texto: "",
        pubdate: ""
      },
      sent: false
    };
  },
  computed: {
    ...mapState("users", ["token", "csrf"])
  },
  methods: {
    set(name, value) {
      this.fallo[name] = value;
    },
    saveFallo() {
      this.sent = true;
      const self = this;
      const performSave = () => {
        self
          .$http({
            method: "POST",
            url: "/api/fallos",
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: self.fallo
          })
          .then(
            ({ status, data }) => {
              if (status === 201) {
                self.$router.replace(`/fallos/${data._id}`);
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
