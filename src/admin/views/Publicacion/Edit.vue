<template lang="pug">
  .edit
    .section
      .title.is-3
        span Editar {{publicacion.titulo}}
      .loading(v-if="Object.keys(publicacion).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="savePublicacion", novalidate, v-if="Object.keys(publicacion).length > 0")
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true"
          :value="publicacion.titulo")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(publicacion.texto) === '' || isFieldInvalid('texto')"
          required="true"
          :value="publicacion.texto")
        InputDate(
          :fieldSetter="set"
          name="pubdate"
          label="Fecha de publicación"
          :invalidField="isFieldInvalid('pubdate')"
          required="true"
          :value="publicacion.pubdate")
        InputText(
          :fieldSetter="set"
          name="diario"
          label="Publicado en:"
          :invalidField="isFieldInvalid('diario')"
          required="false"
          :value="publicacion.diario")
        InputText(
          :fieldSetter="set"
          name="autor"
          label="Autor"
          :invalidField="isFieldInvalid('autor')"
          required="false"
          :value="publicacion.autor")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm"
          value="Guardar")
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
      publicacion: {},
      sent: false
    };
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
            method: "PUT",
            url: `/api/publicaciones/${this.publicacion._id}`,
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: self.publicacion
          })
          .then(
            ({ status, data }) => {
              if (status === 200) {
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
.edit {
  padding-bottom: 40px;
}
</style>
