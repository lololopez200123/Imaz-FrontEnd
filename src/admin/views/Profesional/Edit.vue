<template lang="pug">
  .edit
    Notification(v-if="notification.show", :type="notification.type", @save="submitForm()", @cancel="closeNotification()", @delete="deleteProfesional()", @finish="goToList()")
    .section.hero.is-light
    .section
      .columns
        .column.is-one-quarter.is-one-fifth-fullhd
          Sidebar
        .column
          .columns.is-flex.is-justify-content-center
            .column.is-two-thirds-desktop
              form.control(@submit.prevent="saveProfesional", novalidate, ref="form")
                .card.profesional.has-background-grey-lighter
                  .level.mt-5.px-6
                    .level-left
                      .level-item
                        ImgUpload(
                          :fieldSetter="set"
                          name="imagen1"
                          :invalidField="noImageUploaded"
                          text="Cargar imagen 1"
                          required="true")
                    .level-right
                      .level-item
                        ImgUpload(
                          :fieldSetter="set"
                          name="imagen2"
                          :invalidField="noImageUploaded"
                          text="Cargar imagen 2"
                          required="true")
                  .card-image.px-6.pb-3
                    span(@mouseover="hovered = true", @mouseout="hovered = false")
                      figure.image.is-square(v-show="!hovered")
                        img.imagen1-placeholder(
                          :alt="profesional.nombre"
                          :src="profesional.imagen1"
                          )
                        //-.remove-image(@click="removeImage('imagen1')", v-if="profesional.imagen1 && profesional.imagen1 !== originalImg['imagen1']")
                          font-awesome-icon(icon="times")
                      figure.image.is-square(v-show="hovered")
                        img.imagen2-placeholder(
                          :alt="profesional.nombre"
                          :src="profesional.imagen2"
                          )
                        //-.remove-image(@click="removeImage('imagen2')", v-if="profesional.imagen2 && profesional.imagen2 !== originalImg['image2']")
                          font-awesome-icon(icon="times")
                  .card-content
                    .content
                      .datos(v-if="Object.keys(profesional).length > 0")
                        .nombre
                          span 
                            InputText(
                              :fieldSetter="set"
                              name="nombre"
                              placeholder="Nombre y Apellido"
                              :invalidField="isFieldInvalid('nombre')"
                              required="true"
                              :value="profesional.nombre")
                        .profesion
                          span 
                            InputText(
                              :fieldSetter="set"
                              name="profesion"
                              placeholder="Puesto"
                              :invalidField="isFieldInvalid('profesion')"
                              required="true"
                              :value="profesional.profesion")
                        .email
                          span 
                            InputText(
                              :fieldSetter="set"
                              name="email"
                              :type="'email'"
                              placeholder="Email"
                              :invalidEmail="isEmailInvalid('email')"
                              required="true"
                              :value="profesional.email")
    .section.hero.is-light.bottom-section
      .columns
        .column.is-one-quarter.is-one-fifth-fullhd
        .column
          .columns.px-6.buttons
            .column.is-one-third.is-flex.is-justify-content-flex-start
              button.button.is-rounded.is-medium.is-white.is-danger.is-inverted(@click="onDeleteButton()")
                span.icon
                  i
                    font-awesome-icon(icon="trash-alt")
                span.text Eliminar
            .column.is-one-third.is-flex.is-justify-content-center
              button.button.is-rounded.is-medium.is-white.is-success.is-inverted(@click="goToList()")
                span.icon
                  i
                    font-awesome-icon(icon="undo-alt")
                span.text Volver
            .column.is-one-third.is-flex.is-justify-content-flex-end
              button.button.is-rounded.is-medium.is-dark.is-primary.is-inverted(@click="onSaveButton()")
                span.icon
                  i
                    font-awesome-icon(icon="save")
                span.text Guardar
</template>
<script>
  import { mapState } from "vuex";

  import Sidebar from "./Sidebar";
  import Notification from "./Notification";

  import filesService from "@/admin/services/files";

  import InputText from "@/admin/components/Forms/InputText";
  import ImgUpload from "./ImgUpload";

  export default {
    components: {
      Sidebar,
      Notification,
      InputText,
      ImgUpload
    },
    data() {
      return {
        profesional: {},
        notification: { show: false, type: 'loading' },
        sent: false,
        noImageUploaded: false,
        originalImg: { imagen1: '', imagen2: '' },
        hovered: false
      };
    },
    computed: {
      ...mapState("users", ["token", "csrf"]),
      isFormValid() {
        if (this.profesional.nombre && this.profesional.profesion && this.profesional.email && this.profesional.imagen1 && this.profesional.imagen2)
          return true;
        else
          return false;
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.notification = { show: true, type: 'loading' };
        this.$http({
          method: "GET",
          url: `/api/profesionales/${this.$route.params.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).then(
          ({ data }) => {
            this.profesional = data;
            this.originalImg = { imagen1: data.imagen1, imagen2: data.imagen2 };
            this.notification = { show: false, type: 'loading' };
          },
          error => {
            console.error(error);
            this.$router.replace("/profesionales");
          }
        );
      } else {
        this.$router.replace("/profesionales");
      }
    },
    methods: {
      set(name, value) {
        this.profesional[name] = value;
      },
      onSaveButton() {
        if (this.isFormValid)
          this.showNotification('save');
        else
          this.showNotification('invalid')
      },
      onDeleteButton() {
        this.showNotification('delete')
      },
      submitForm() {
        this.closeNotification();
        this.$refs.form.requestSubmit();
      },
      showNotification(type) {
        this.notification = { show: true, type: type };
      },
      closeNotification() {
        this.notification.show = false;
      },
      goToList() {
        this.$router.push('/profesionales');
      },
      saveProfesional() {
        this.sent = true;
        const self = this;
        this.showNotification('saving');
        const performSave = () => {
          self
            .$http({
              method: "PUT",
              url: `/api/profesionales/${this.profesional._id}`,
              headers: {
                Authorization: `Bearer ${self.token}`,
                "X-CSRF-TOKEN": self.csrf
              },
              body: {
                ...self.profesional
              }
            })
            .then(
              ({ status, data }) => {
                if (status === 200) {
                  this.showNotification('saved');
                  //self.$router.push('/profesionales');
                }
              },
              error => {
                console.error(error);
                this.closeNotification();
                this.sent = false;
              }
            );
        };
        if (this.profesional.imagen1.name && this.profesional.imagen2.name) {
          filesService.uploadImages([this.profesional.imagen1, this.profesional.imagen2]).then(
            ({ data }) => {
              this.profesional.imagen1 = data[this.profesional.imagen1.name];
              this.profesional.imagen2 = data[this.profesional.imagen2.name];
              performSave();
            },
            error => {
              console.error(error);
              this.sent = false;
            }
          );
        } else if (this.profesional.imagen1.name) {
          filesService.uploadImages([this.profesional.imagen1]).then(
            ({ data }) => {
              this.profesional.imagen1 = data[this.profesional.imagen1.name];
              performSave();
            },
            error => {
              console.error(error);
              this.sent = false;
            }
          );
        } else if (this.profesional.imagen2.name) {
          filesService.uploadImages([this.profesional.imagen2]).then(
            ({ data }) => {
              this.profesional.imagen2 = data[this.profesional.imagen2.name];
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
      },
      deleteProfesional() {
        this.showNotification('deleting')
        this.$http({
          method: "DELETE",
          url: `/api/profesionales/${this.profesional._id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
            "X-CSRF-TOKEN": this.csrf
          }
        }).then(
          () => {
            this.showNotification('deleted');
            //this.$router.replace(`/profesionales`);
          },
          error => {
            this.closeNotification();
            console.error(error);
          }
        );
      },
      removeImage(image) {
        this.set(image, this.originalImg[image]);
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.edit {
  .profesional {
    .image {
      img {
        object-fit: cover;
      }
      .remove-image {
        position: absolute;
        right: 10px;
        top: 3px;
        cursor: pointer;
        opacity: 0.5;
        @include ease-transition;
        &:hover {
          opacity: 1;
        }
        svg {
          color: #f00;
        }
      }
    }
    .datos {
      max-width: 60%;
      margin: 0 auto;
      > div {
        margin-bottom: 5px;
      }
      @media all and (max-width: $btSM) {
        max-width: 90%;
      }
    }
  }
  .bottom-section {
    .buttons {
      .button {
        margin: 0;
        box-shadow: 0px 2px 6px 0px rgba(0,0,0,.4);
      }
      @media all and (max-width: $btMD) {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        .column {
          justify-content: center !important;
          .button {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>
