<template lang="pug">
  .edit
    .section
      .title.is-3
        span Editar {{link.titulo}}
      .loading(v-if="Object.keys(link).length === 0")
        font-awesome-icon(icon="circle-notch", spin)
      form.control(@submit.prevent="saveLink", novalidate, v-if="Object.keys(link).length > 0")
        InputText(
          :fieldSetter="set"
          name="titulo"
          label="Título"
          :invalidField="isFieldInvalid('titulo')"
          required="true"
          :value="link.titulo")
        InputText(
          :fieldSetter="set"
          name="url"
          label="Url"
          :invalidField="isFieldInvalid('url')"
          required="true"
          :value="link.url")
        ImageUploader(
          :fieldSetter="set"
          name="imagen"
          :invalidField="noImageUploaded"
          required="false"
          :value="link.imagen")
        InputSubmit(
          :sent="sent"
          :formInvalid="!validForm"
          value="Guardar")
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
      link: {},
      sent: false,
      noImageUploaded: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/links/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.link = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/links");
        }
      );
    } else {
      this.$router.replace("/links");
    }
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
            method: "PUT",
            url: `/api/links/${this.link._id}`,
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
              if (status === 200) {
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
.edit {
  padding-bottom: 40px;
}
</style>
