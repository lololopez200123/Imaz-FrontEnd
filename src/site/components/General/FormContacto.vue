<template lang="pug">
  .form-contacto
    .titulo
      span Estamos para ayudarte.
      span Escriba su consulta.
    form(
      @submit.prevent="sendMail"
      novalidate)
      .fila
        .campo
          input(
            placeholder="Nombre"
            type="text"
            v-model="nombre"
            name="nombre"
            tabindex="1"
            v-validate="'required'")
        .campo
          input(
            placeholder="Teléfono"
            type="text"
            v-model="telefono"
            name="telefono"
            tabindex="3"
            v-validate="'required|numeric'")
      .fila
        .campo
          input(
            placeholder="Apellido"
            type="text"
            v-model="apellido"
            name="apellido"
            tabindex="2"
            v-validate="'required'")
        .campo
          input(
            placeholder="Mail"
            type="text"
            v-model="email"
            name="email"
            tabindex="4"
            v-validate="'required|email'")
      .campo
        textarea(
          placeholder="Escriba su consulta"
          v-model="mensaje"
          name="mensaje"
          tabindex="5"
          v-validate="'required'")
      .subm
        button(
          tabindex="6"
          v-if="!(enviado && respuestaCorrecta)"
          type="submit"
          :disabled="!validForm || sent")
          span(v-if="!sent") Enviar
            i.arrow
              font-awesome-icon(icon="arrow-right")
          .loading(v-if="sent")
            font-awesome-icon(icon="circle-notch", spin)
      .respuesta
        span(v-if="enviado && respuestaCorrecta") Hemos recibido tu mensaje correctamente, nos contactaremos a la brevedad.
        span(v-if="enviado && !respuestaCorrecta") Ocurrió un error al enviar el mensaje, por favor intentalo nuevamente más tarde.
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      mensaje: "",
      sent: false,
      error: "",
      enviado: false,
      respuestaCorrecta: false
    };
  },
  methods: {
    async sendMail() {
      if (this.dirtyForm && this.validForm) {
        this.sent = true;
        this.enviado = false;
        this.respuestaCorrecta = true;
        try {
          const { status } = await this.$http({
            method: "POST",
            url: "/api/mailing/contacto",
            body: {
              nombre: this.nombre,
              apellido: this.apellido,
              email: this.email,
              telefono: this.telefono,
              mensaje: this.mensaje
            }
          });
          if (status === 200) {
            this.sent = false;
            this.enviado = true;
            this.respuestaCorrecta = true;
          }
        } catch (error) {
          this.sent = false;
          this.enviado = true;
          this.respuestaCorrecta = false;
          console.error(error);
        }
      } else {
        this.$validator.validateAll();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.form-contacto {
  position: relative;
  z-index: 9;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  flex-direction: column;
  width: calc(50% - 25px);
  /*font-family: $fontNunitoSemiBold;*/
  font-family: $fontGibson;
  font-size: 125%;
  font-weight: bold;
  padding: 0 25px;
  /*min-width: 300px;
  max-width: 450px;*/
  @media all and (max-width: $btLG) {
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
  .titulo {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    flex-direction: column;
    margin-bottom: 25px;
    span {
      /*color: #44708f;*/
      font-size: 54px;
      @media all and (max-width: $btLG) {
        font-size: 36px;
      }
      @media all and (max-width: $btSM) {
        font-size: 24px;
      }
    }
  }
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .campo {
      width: 100%;
      input,
      textarea {
        /*font-family: $fontNunitoSemiBold;*/
        font-family: $fontGibson;
        /*font-size: 75%;
        font-weight: bold;*/
        font-size: 16px;
        padding: 10px 15px;
        width: 100%;
        border-radius: 5px;
        border: 0;
        color: #44708f;
        @include ease-transition;
        @include sombra(0 0 6px 0 rgba(#000, 0.1));
        &[aria-invalid="true"] {
          @include sombra(0 0 6px 1px rgba(red, 0.3));
        }
        @media all and (max-width: $btLG) {
          margin-bottom: 10px;
        }
      }
      textarea {
        /*padding: 10px 15px;*/
        resize: none;
        min-height: 100px;
        margin-bottom: 25px;
      }
    }
    .fila {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      @media all and (max-width: $btLG) {
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0;
      }
      .campo {
        width: 49%;
        &:first-child {
          margin-right: 15px;
        }
        &:last-child {
          margin-left: 15px;
        }
        @media all and (max-width: $btLG) {
          width: 100%;
          margin: 0 !important;
        }
      }
    }
  }

  .subm {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    button {
      width: 200px;
      border: 0;
      border-radius: 10px;
      color: #fff;
      background-color: #349cf5;
      height: 40px;
      text-transform: uppercase;
      font-size: 75%;
      position: relative;
      text-align: left;
      padding: 0 20px;
      /*font-family: $fontMontserratBold;*/
      font-family: $fontGibson;
      @include ease-transition;
      cursor: pointer;
      .arrow {
        position: absolute;
        right: 20px;
      }
      &:disabled {
        // background-color: #bfe2ff;
        // color: #349CF5;
        // color: #fff;
        // background-color: #349cf5;
        // @include grayscale(0.7);
        // opacity: 0.7;
        cursor: not-allowed;
      }
      &:active:not(:disabled) {
        background-color: #007feb;
      }
      @media all and (max-width: $btSM) {
        width: 100%;
      }
      .loading {
        svg {
          color: #fff;
        }
      }
    }
  }
  .respuesta {
    margin-top: 7px;
    line-height: 0.7;
    min-height: 25px;
    span {
      font-size: 60%;
      color: #444;
    }
  }
}
</style>
