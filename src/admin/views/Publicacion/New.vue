<template lang="pug">
  .new
    .section
      .title.is-3
        span Nueva publicacion
      form.control(@submit.prevent="savePublicacion", novalidate)
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(publicacion.texto) === '' || isFieldInvalid('texto')"
          required="true")
        InputDate(
          :fieldSetter="set"
          name="pubdate"
          label="Fecha de publicación"
          :invalidField="isFieldInvalid('pubdate')"
          required="true")
        InputText(
          :fieldSetter="set"
          name="diario"
          label="Publicado en:"
          :invalidField="isFieldInvalid('diario')"
          required="false")
        InputText(
          :fieldSetter="set"
          name="autor"
          label="Autor"
          :invalidField="isFieldInvalid('autor')"
          required="false")
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
      publicacion: {
        titulo: "",
        texto: "",
        pubdate: "",
        diario: "",
        autor: ""
      },
      sent: false
    };
  },
  computed: {
    ...mapState("users", ["token", "csrf"])
  },
  methods: {
    set(name, value) {
      this.publicacion[name] = value;
    },
    savePublicacion() {
      this.sent = true;
      const self = this;
      const performSave = () => {
        self
          .$http({
            method: "POST",
            url: "/api/publicaciones",
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: self.publicacion
          })
          .then(
            ({ status, data }) => {
              if (status === 201) {
                self.$router.replace(`/publicaciones/${data._id}`);
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
