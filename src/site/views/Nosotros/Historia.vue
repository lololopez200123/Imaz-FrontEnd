<template lang="pug">
  .historia
    //- .texto-imagen
    //-   .texto
    p(v-if="v === 1")
      | Hoy, somos la segunda generación de abogados a cargo de la firma.
      | La excelencia en la asistencia integral de nuestros clientes, fundamentalmente en derecho de daños y perjuicios, nos ha posicionado como una de las firmas más prestigiosas de la región.
    //-   .imagen
    //-     img(src="@/assets/images/Nosotros/historia1.jpg")
    //- .texto-imagen
    //-   .texto
    p(v-if="v === 2") La confianza depositada por nuestros clientes a lo largo de todos estos años, es el resultado de la eficiencia del trabajo, la permanente capacitación de los abogados y la calidad humana de las personas que integramos este equipo.
      //- .imagen
      //-   img(src="@/assets/images/Nosotros/historia2.jpg")
</template>

<script>
export default {
  props: ["v"]
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.historia {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 100px;
  text-align: center;
  @media all and (max-width: $btMD) {
    padding: 20px;
  }
  p {
    max-width: 50vw;
    min-width: 300px;
    margin: 0;
    color: $colorAzulPastelOscuro;
    /*font-family: $fontMontserratRegular;*/
    font-family: $fontGibson;
    font-size: 180%;
    line-height: 2;
    white-space: pre-line;
    @media all and (max-width: 1080px) {
      line-height: 1.5;
      font-size: 175%;
    }
    @media all and (max-width: $btMD) {
      line-height: 1.5;
      font-size: 135%;
    }
  }
}
</style>
