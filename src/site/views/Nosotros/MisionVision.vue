<template lang="pug">
  .mision-vision
    .titulo
      span
        | Nuestra
        | misión y visión
    .tarjetas
      .tarjeta
        .titulo
          span Misión
        .texto
          p Somos un equipo de profesionales altamente capacitados, con vasta experiencia y trayectoria en la región norpatagónica. Comprometidos en brindar soluciones jurídicas integrales, nos especializamos en materia de daños y perjuicios, teniendo como eje una relación de confianza con nuestros clientes.
      .tarjeta
        .titulo
          span Visión
        .texto
          p Ser un estudio jurídico líder en la región norpatagónica, dentro del ámbito de nuestra especialidad. Aspiramos a destacarnos por nuestra eficiencia, compromiso y calidad humana, así como por fomentar el desarrollo personal y profesional de nuestra gente.
    .firulete
      img(src="@/assets/images/Nosotros/firulete.png")
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.mision-vision {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0 75px;
  position: relative;
  @media all and (max-width: $btMD) {
    padding: 25px;
    margin-top: 60px;
  }
  & > .titulo {
    text-align: center;
    margin-bottom: 60px;
    span {
      white-space: pre-line;
      /*font-family: $fontMontserratRegular;*/
      font-family: $fontGibson;
      text-transform: uppercase;
      color: $colorAzulOscuro;
      font-size: 300%;
      @media all and (max-width: $btMD) {
        font-size: 200%;
      }
    }
  }
  .tarjetas {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 2;
    @media all and (max-width: $btMD) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .tarjeta {
      width: 48.5%;
      height: auto;
      min-height: 800px;
      display: f8lex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 60px 40px;
      @include sombra(20px 20px 20px 0 rgba(#000, 0.15));
      border-radius: 150px;
      border: 1px solid rgba(#ccc, 0.3);
      background-color: #fff;
      @media all and (max-width: $btMD) {
        width: 100%;
        border-radius: 50px;
        @include sombra(10px 10px 10px 0 rgba(#000, 0.15));
        margin-bottom: 25px;
        height: auto;
        min-height: 0;
      }
      .titulo {
        margin-bottom: 50px;
        @media all and (max-width: $btMD) {
          margin-bottom: 25px;
        }
        span {
          white-space: pre-line;
          /*font-family: $fontMontserratRegular;*/
          font-family: $fontGibson;
          color: $colorAzulOscuro;
          font-size: 300%;
          @media all and (max-width: $btMD) {
            font-size: 200%;
          }
        }
      }
      .texto {
        p {
          margin: 0;
          color: $colorAzulPastelOscuro;
          /*font-family: $fontMontserratRegular;*/
          font-family: $fontGibson;
          font-size: 190%;
          line-height: 2;
          @media all and (max-width: 1200px) {
            line-height: 1.5;
            font-size: 180%;
          }
          @media all and (max-width: $btLG) {
            font-size: 150%;
          }
          @media all and (max-width: $btMD) {
            font-size: 120%;
            line-height: 1.5;
          }
        }
      }
    }
  }
  .firulete {
    position: absolute;
    bottom: -150px;
    z-index: 1;
    width: 65%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: $btMD) {
      bottom: -50px;
      height: 200px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
