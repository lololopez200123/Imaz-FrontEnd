<template lang="pug">
  .header
    .fondo
    .contenido
      p El estudio jurídico “IMAZ & ASOCIADOS” fue fundado por el Dr. JOSÉ FRANCISCO IMAZ en el año 1984, en la ciudad de Neuquén. En sus comienzos, se especializó en derecho laboral y la defensa de los trabajadores.
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.header {
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media all and (max-width: $btMD) {
    // min-height: 100vh;
    height: auto;
    // padding: 15px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  .fondo {
    display: block;
    width: 60%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../../assets/images/Nosotros/registro.jpg");
    @media all and (max-width: $btMD) {
      height: 0.55 * 100vw;
      width: 100%;
    }
  }
  .contenido {
    background-color: #1f1f1f;
    height: 100%;
    width: 40%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 1080px) {
      width: 60%;
    }
    @media all and (max-width: $btMD) {
      width: 100%;
      padding: 10px;
      text-align: center;
    }
    p {
      max-width: 300px;
      color: #fff;
      /*font-family: $fontMontserratRegular;*/
      font-family: $fontGibson;
      font-size: 150%;
      line-height: 1.5;
      white-space: pre-line;
      @media all and (max-width: $btMD) {
        font-size: 115%;
      }
    }
  }
}
</style>
