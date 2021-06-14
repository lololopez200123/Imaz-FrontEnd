<template lang="pug">
  .new
    .section
      .title.is-3
        span Nuevo link de interés
      form.control(@submit.prevent="saveLink", novalidate)
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true")
        InputText(
          :fieldSetter="set"
          name="url"
          label="Url"
          :invalidField="isFieldInvalid('url')"
          required="true")
        ImageUploader(
          :fieldSetter="set"
          name="imagen"
          :invalidField="noImageUploaded"
          required="false")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm")
</template>

<script>
import { mapState } from "vuex";

import filesService from "@/admin/services/files";

import InputText from "@/admin/components/Forms/InputText";
import ImageUploader from "@/admin/components/Forms/ImageUploader";
import InputSubmit from "@/admin/components/Forms/InputSubmit";

export default {
  components: {
    InputText,
    ImageUploader,
    InputSubmit
  },
  data() {
    return {
      link: {
        titulo: "",
        url: "",
        imagen: ""
      },
      sent: false,
      noImageUploaded: false
    };
  },
  computed: {
    ...mapState("users", ["token", "csrf"])
  },
  methods: {
    set(name, value) {
      this.link[name] = value;
    },
    saveLink() {
      this.sent = true;
      const self = this;
      const performSave = () => {
        self
          .$http({
            method: "POST",
            url: "/api/links",
            headers: {
              Authorization: `Bearer ${self.token}`,
              "X-CSRF-TOKEN": self.csrf
            },
            body: {
              ...self.link,
              url: self.link.url.indexOf("http") >= 0 ? self.link.url : `http://${self.link.url}`
            }
          })
          .then(
            ({ status, data }) => {
              if (status === 201) {
                self.$router.replace(`/links/${data._id}`);
              }
            },
            error => {
              console.error(error);
              this.sent = false;
            }
          );
      };
      if (this.link.imagen.name) {
        filesService.uploadImages([this.link.imagen]).then(
          ({ data }) => {
            this.link.imagen = data[this.link.imagen.name];
            performSave();
          },
          error => {
            console.error(error);
            this.sent = false;
          }
        );
      } else {
        performSave();
      }
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
