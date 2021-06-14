<template lang="pug">
  .banner-form-contacto
    .icono-texto
      p
        img(src="@/assets/images/Home/icono-covid.png", alt="COVID19")
        span Por razones de público conocimiento (COVID-19) nuestras oficinas permanecen cerradas. Cuidarnos es responsabilidad de todos. Estamos trabajando de manera On line.
    .call-to-action
      button(
        @click="gotoContacto") Ingrese su consulta aquí
</template>

<script>
import jQuery from "jquery";

export default {
  methods: {
    gotoContacto() {
      jQuery("html, body").animate(
        {
          scrollTop: document.querySelector("body .footer").offsetTop + 170
        },
        500
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.banner-form-contacto {
  margin-top: -50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #015196;
  color: #fff;
  font-family: $fontUbuntuM;
  padding: 4px 15px;
  @media all and (max-width: $btLG) {
    flex-direction: column;
    padding: 10px 15px;
  }
  .icono-texto {
    @media all and (max-width: $btMD) {
      text-align: center;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      img {
        width: 37px;
        height: 37px;
        object-fit: contain;
        margin-right: 7px;
      }
      span {
        margin-right: 7px;
        font-size: 13px;
        @media all and (max-width: $btMD) {
          margin: 0;
          margin-top: 6px;
        }
      }
    }
  }
  .call-to-action {
    @media all and (max-width: $btMD) {
      margin: 7px;
      margin-top: 11px;
    }
    button {
      min-width: 207px;
      background-color: #349cf5;
      border: 0;
      border-radius: 10px;
      text-transform: uppercase;
      text-decoration: underline;
      color: #fff;
      padding: 7px 15px;
      cursor: pointer;
      font-size: 13px;
      font-family: $fontUbuntuM;
      &:active {
        background-color: #007feb;
      }
    }
  }
}
</style>
