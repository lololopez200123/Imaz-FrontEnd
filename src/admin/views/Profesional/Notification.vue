<template lang="pug">
  .notification-wrapper
    .container.is-fullhd
      .notification.p-5(:class="type !== 'deleted' ? 'is-link':'is-danger'")
        .loading.py-4(v-if="type === 'loading'") 
          .columns.is-vcentered
            .column
              .text.has-text-centered La imagen se está cargando
        .saving(v-if="type === 'saving'")
          .columns.is-vcentered
            .column
              .text.has-text-centered Guardando documento
        .removing(v-if="type === 'deleting'")
          .columns.is-vcentered
            .column
              .text.has-text-centered Eliminando documento
        .saved(v-if="type === 'saved'")
          .columns.is-vcentered
            .column.has-text-centered
              .text Documento guardado correctamente
            .column.has-text-centered
              button.button.is-rounded.px-6(@click="onFinish()") Okey
        .deleted(v-if="type === 'deleted'")
          .columns.is-vcentered
            .column.has-text-centered
              .text Documento eliminado correctamente
            .column.has-text-centered
              button.button.is-rounded.px-6(@click="onFinish()") Okey
        .invalid(v-if="type === 'invalid'")
          .columns.is-vcentered
            .column.has-text-centered
              .text Todos los campos son obligatorios
            .column.has-text-centered
              button.button.is-rounded.px-6(@click="onCancel()") Okey
        .remove(v-if="type === 'delete'")
          .columns.is-vcentered.is-mobile.is-multiline
            .column.is-5-tablet.is-full-mobile
              .text.has-text-centered ¿Está seguro que quiere <u>eliminar</u> éste documento?
            .column.is-2-tablet.is-offset-1-tablet.is-half-mobile.has-text-centered-mobile
              button.button.is-rounded.px-6(@click="onDelete()") Okey
            .column.is-2-desktop.has-text-centered.is-half-mobile
              button.button.is-rounded.px-6(@click="onCancel()") Cancelar
        .save(v-if="type === 'save'") 
          .columns.is-vcentered.is-mobile.is-multiline
            .column.is-5-tablet.is-full-mobile
              .text.has-text-centered ¿Está seguro que quiere <u>guardar</u> éste documento?
            .column.is-2-tablet.is-offset-1-tablet.is-half-mobile.has-text-centered-mobile
              button.button.is-rounded.px-6(@click="onSubmit()") Okey
            .column.is-2-desktop.has-text-centered.is-half-mobile
              button.button.is-rounded.px-6(@click="onCancel()") Cancelar
</template>
<script>
  export default {
    props: ['type'],
    methods: {
      onCancel() {
        this.$emit('cancel');
      },
      onSubmit() {
        this.$emit('save');
      },
      onDelete() {
        this.$emit('delete');
      },
      onFinish() {
        this.$emit('finish');
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~Styles/_config.scss";
  .notification-wrapper {
    .container {
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      justify-content: center;
      position: fixed;
      top: 0;
      height: 100vh;
      width: 100%;
      z-index: 99;
      background-color: rgba(255,255,255,.3);
    }
    .column {
      font-family: $fontGibson;
      .text {
        text-transform: uppercase;
        font-weight: 600;
        color: #000;
        font-size: 20px;
      }
      .button {
        text-transform: uppercase;
        width: 140px;
        font-weight: 600;
        font-family: $fontGibson;
      }
    }
  }
</style>