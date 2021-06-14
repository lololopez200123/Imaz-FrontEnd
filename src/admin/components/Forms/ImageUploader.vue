<template lang="pug">
  .image-uploader
    .field
      label.label {{name | capitalize}} {{required ? '*' : ''}}
      .control.has-icons-right
        .file
          label.file-label
            input.file-input(
              type='file'
              :name='name'
              accept="image/*"
              @change="set"
              :data-img-target="'.' + name + '-placeholder'")
            span.file-cta
              span.file-icon
                font-awesome-icon(icon="upload")
              span.file-label Seleccionar {{name}}
            span.file-name {{field && field.name ? field.name : 'Nombre del archivo'}}
          .image(v-if="field")
            img(
              :class="name + '-placeholder'"
              :src="this.field ? this.field : ''")
            .remove-image(@click="removeImage")
              font-awesome-icon(icon="times")
        span.icon.is-small.is-right(v-if="required && invalidField")
          font-awesome-icon(icon="exclamation-triangle")
        p.help.is-danger(v-if="required && invalidField") Este campo es obligatorio
</template>

<script>
export default {
  props: ["name", "value", "fieldSetter", "invalidField", "required"],
  data() {
    return {
      field: this.value ? this.value : ""
    };
  },
  methods: {
    set(ev) {
      [this.field] = [...ev.target.files];
      this.fieldSetter(this.name, this.field);
      if (ev.target.files[0].type.indexOf("image") >= 0) {
        const fr = new FileReader();
        fr.onload = function process() {
          const img = document.querySelector(ev.target.getAttribute("data-img-target"));
          img.src = fr.result;
        };
        fr.readAsDataURL(ev.target.files[0]);
      }
    },
    removeImage() {
      this.field = "";
      this.fieldSetter(this.name, "");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.image-uploader {
  .file {
    display: flex;
    justify-content: space-between;
    .image {
      border: 1px solid #ccc;
      padding: 7px;
      width: 50%;
      height: 250px;
      margin-left: 10px;
      position: relative;
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
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
  }
}
</style>
