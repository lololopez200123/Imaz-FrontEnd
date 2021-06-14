<template lang="pug">
  .edit
    .section
      .title.is-3
        span Editar {{noticia.titulo}}
      .loading(v-if="Object.keys(noticia).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="saveNoticia", novalidate, v-if="Object.keys(noticia).length > 0")
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true"
          :value="noticia.titulo")
        RefSelect(
          :fieldSetter="set"
          name="categoria"
          plural="categorias"
          optionProp="nombre"
          :invalidField="noCategoriaSelected"
          required="true"
          :value="noticia.categoria")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(noticia.texto) === '' || isFieldInvalid('texto')"
          required="true"
          :value="noticia.texto")
        InputText(
          :fieldSetter="set"
          name="diario"
          label="Publicado en"
          :invalidField="isFieldInvalid('diario')"
          :value="noticia.diario")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm"
          value="Guardar")
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
      noticia: {},
      sent: false,
      noCategoriaSelected: false
    };
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
          this.noticia = { ...data, categoria: data.categoria._id };
          // this.noticia.categoria = this.noticia.categoria._id;
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
            method: "PUT",
            url: `/api/noticias/${this.noticia._id}`,
            headers: {
              Authorization: `Bearer ${self.token}`
            },
            body: self.noticia
          })
          .then(
            ({ status, data }) => {
              if (status === 200) {
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
.edit {
  padding-bottom: 40px;
}
</style>
