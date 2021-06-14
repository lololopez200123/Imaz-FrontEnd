<template lang="pug">
  .edit
    .section
      .title.is-3
        span Editar {{fallo.caratula}}
      .loading(v-if="Object.keys(fallo).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="saveFallo", novalidate, v-if="Object.keys(fallo).length > 0")
        InputText(
          :fieldSetter="set"
          name="caratula"
          label="Carátula"
          :invalidField="isFieldInvalid('caratula')"
          required="true"
          :value="fallo.caratula")
        InputText(
          :fieldSetter="set"
          name="expediente"
          label="Expediente"
          :invalidField="isFieldInvalid('expediente')"
          required="true"
          :value="fallo.expediente")
        Wysiwyg(
          :fieldSetter="set"
          name="texto"
          :invalidField="stripHtml(fallo.texto) === '' || isFieldInvalid('texto')"
          required="true"
          :value="fallo.texto")
        InputDate(
          :fieldSetter="set"
          name="pubdate"
          label="Fecha de publicación"
          :invalidField="isFieldInvalid('pubdate')"
          required="true"
          :value="fallo.pubdate")
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
      fallo: {},
      sent: false
    };
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
            method: "PUT",
            url: `/api/fallos/${this.fallo._id}`,
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: self.fallo
          })
          .then(
            ({ status, data }) => {
              if (status === 200) {
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
.edit {
  padding-bottom: 40px;
}
</style>
