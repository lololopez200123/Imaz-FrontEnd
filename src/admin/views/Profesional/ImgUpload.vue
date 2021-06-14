<template lang="pug">
  .image-uploader
    .field
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
              span.file-label {{ btnLabel }}
        span.icon.is-small.is-right(v-if="required && invalidField")
          font-awesome-icon(icon="exclamation-triangle")
        p.help.is-danger(v-if="required && invalidField") Este campo es obligatorio
</template>
<script>
    export default {
      props: ["name", "value", "fieldSetter", "invalidField", "required", "text"],
      data() {
        return {    
          field: this.value ? this.value : "",
          btnLabel: this.text ? this.text : "Cargar imagen"
        };
      },
      methods: {
        set(ev) {
          [this.field] = [...ev.target.files];
          this.fieldSetter(this.name, this.field);
          if (ev.target.files[0] && ev.target.files[0].type.indexOf("image") >= 0) {
            const fr = new FileReader();
            fr.onload = function process() {
              const img = document.querySelector(ev.target.getAttribute("data-img-target"));
              img.src = fr.result;
            };
            fr.readAsDataURL(ev.target.files[0]);
          }
        },
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
    }
  }
}
</style>