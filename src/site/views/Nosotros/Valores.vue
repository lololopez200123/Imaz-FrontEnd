<template lang="pug">
  .valores
    .cuerpo
      .titulo
        span Valores
      .primer-valor
        span
          | Somos un GRUPO HUMANO que se relaciona a través de vínculos positivos y saludables, que requieren de camaradería, sinceridad y autocritica.
        //- .imagen
          img
      .lista-valores
        .valor(
          v-for="valor in valores")
          .texto(v-html="valor")
      //- .imagen
        img
    .firulete
      img(src="@/assets/images/Nosotros/firulete.png")
    .logo
      a(href="/")
        img(src="@/assets/images/logo.png")
</template>

<script>
const valores = [
  "Ubicamos al <strong>CLIENTE COMO NUESTRA PRIORIDAD</strong><br />dentro de los límites sociales de la ética y el respeto.",
  "Valoramos el <u><strong>TALENTO</strong></u>, entendiendo éste como<br />la sumatoria de la capacidad profesional,<br />el compromiso con la tarea y la autocritica.",
  "<u><strong>SELECCIONAMOS LOS CASOS</strong></u> en los que actuamos<br />profesionalmente en base a nuestro criterio ético y comercial.",
  "Nos organizamos a través de una<br /><u><strong>ESTRUCTURA JERARQUICA</strong></u> que aceptamos y respetamos.",
  "Valoramos la <u><strong>DIVERSIDAD</strong></u> como vehículo<br />de enriquecimiento personal y profesional.",
  "El pilar básico de nuestra forma de vincularnos es el <u><strong>RESPETO</strong></u>,<br />llegando a éste a través de la escucha y la aceptación de otro diferente.",
  "Nuestra forma de <u><strong>RESOLVER LOS CONFLICTOS</strong></u> es<br />a través del <u><strong>SINCERAMIENTO</strong></u> y del <u><strong>DIALOGO</strong></u>.",
  "Nos <u><strong>COMPROMETEMOS</strong></u> con la profesión, con nuestro<br />trabajo y con los valores que construimos en conjunto."
];

export default {
  data() {
    return {
      valores
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.valores {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cuerpo {
    margin: auto;
    width: 85%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
    @include sombra(10px 40px 30px 0 rgba(#000, 0.4));
    border-radius: 150px;
    border: 1px solid rgba(#ccc, 0.3);
    background-color: #fff;
    position: relative;
    z-index: 2;
    margin-top: 100px;
    padding: 100px;
    padding-top: 70px;
    padding-bottom: 20px;
    @media all and (max-width: $btMD) {
      padding: 20px;
      border-radius: 50px;
    }
    & > .titulo {
      margin-bottom: 30px;
      span {
        white-space: pre-line;
        /*font-family: $fontMontserratBold;*/
        font-family: $fontGibson;
        font-weight: 600;
        color: #2161a1;
        font-size: 350%;
        @media all and (max-width: $btMD) {
          font-size: 200%;
        }
      }
    }
    .imagen {
      width: 100%;
      height: 300px;
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 50px 0;
      @media all and (max-width: $btMD) {
        height: 200px;
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .primer-valor {
      width: 100%;
      span {
        /*font-family: $fontMontserratRegular;*/
        font-family: $fontGibson;
        color: #225fa2;
        font-size: 180%;
        white-space: pre-line;
        line-height: 2;
        @media all and (max-width: $btMD) {
          font-size: 135%;
          line-height: 1.5;
        }
      }
    }
    .lista-valores {
      margin-bottom: 180px;
      @media all and (max-width: $btMD) {
        margin-bottom: 80px;
      }
      .valor {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &::before {
          content: "";
          @include minmaxwh(25px);
          background-color: #b4d2ee;
          display: block;
          border-radius: 50%;
          margin: 40px 0;
          @media all and (max-width: $btMD) {
            margin: 25px 0;
            @include minmaxwh(20px);
          }
        }
        .texto {
          /*font-family: $fontMontserratRegular;*/
          font-family: $fontGibson;
          color: #225fa2;
          font-size: 180%;
          white-space: pre-line;
          line-height: 2;
          @media all and (max-width: $btMD) {
            font-size: 135%;
            line-height: 1.5;
          }
        }
      }
    }
  }
  .firulete {
    position: relative;
    z-index: 1;
    width: 65%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -150px;
    margin-bottom: 50px;
    @media all and (max-width: $btMD) {
      margin-bottom: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .logo {
    position: relative;
    z-index: 2;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    @media all and (max-width: $btMD) {
      margin: 0;
      width: 65%;
    }
    a {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
