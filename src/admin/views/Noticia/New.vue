<template lang="pug">
  .new
    .section
      .title.is-3
        span Nueva noticia
      form.control(@submit.prevent="saveNoticia", novalidate)
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true")
        RefSelect(
          :fieldSetter="set"
          name="categoria"
          plural="categorias"
          optionProp="nombre"
          :invalidField="noCategoriaSelected"
          required="true")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(noticia.texto) === '' || isFieldInvalid('texto')"
          required="true")
        InputText(
          :fieldSetter="set"
          name="diario"
          label="Publicado en"
          :invalidField="isFieldInvalid('diario')")
        InputSubmit(
          :sent="sent"
          :formInvalid="stripHtml(noticia.texto) === '' || !validForm")
</template>

<script>
import { mapState } from "vuex";

import InputText from "@/admin/components/Forms/InputText";
import RefSelect from "@/admin/components/Forms/RefSelect";
import Wysiwyg from "@/admin/components/Forms/Wysiwyg";
import InputSubmit from "@/admin/components/Forms/InputSubmit";

export default {
  components: {
    InputText,
    RefSelect,
    Wysiwyg,
    InputSubmit
  },
  data() {
    return {
      noticia: {
        titulo: "",
        categoria: "",
        texto: "",
        diario: ""
      },
      sent: false,
      noCategoriaSelected: false
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  methods: {
    set(name, value) {
      this.noticia[name] = value;
    },
    saveNoticia() {
      this.sent = true;
      const self = this;
      const performSave = () => {
        self
          .$http({
            method: "POST",
            url: "/api/noticias",
            headers: {
              Authorization: `Bearer ${self.token}`
            },
            body: self.noticia
          })
          .then(
            ({ status, data }) => {
              if (status === 201) {
                self.$router.replace(`/noticias/${data._id}`);
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
