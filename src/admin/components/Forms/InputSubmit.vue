<template lang="pug">
  .input-submit
    .aclaracion(v-if="aclaracion")
      small (los campos marcados con un * son obligatorios)
    .field.submit.is-grouped.is-pulled-right.is-vertical-center
      .loading(v-if="sent")
        font-awesome-icon(icon="circle-notch", spin)
      .control
        input.button.is-success(
          type="submit"
          :value="this.value ? this.value : 'Crear'"
          :disabled="formInvalid || sent")
</template>

<script>
export default {
  props: ["formInvalid", "noAclaracion", "value", "sent"],
  data() {
    return {
      aclaracion: !this.noAclaracion
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.input-submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .aclaracion {
    small {
      color: #444;
      font-style: italic;
    }
  }
  .submit {
    .loading {
      margin-right: 7px;
    }
  }
}
</style>
