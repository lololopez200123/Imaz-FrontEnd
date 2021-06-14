<template lang="pug">
  .footer
    .firulete-wrapper
      .firulete-izq
    .contenido
      .column.nosotros
        h2.title(@click="isClosed.includes('nosotros') ? isClosed.splice(isClosed.indexOf('nosotros'), 1) : isClosed.push('nosotros')") Nosotros
          span.caret
            font-awesome-icon(:icon="isClosed.includes('nosotros') && isMobile?'chevron-right':'chevron-down'")
        hr.linea
        .inner(:class="{'is-closed': isClosed.includes('nosotros')}")
          p Estudio
          p Valores
          p Misión y Visión
      .column.servicios
        h2.title(@click="isClosed.includes('servicios') ? isClosed.splice(isClosed.indexOf('servicios'), 1) : isClosed.push('servicios')") Servicios
          span.caret 
            font-awesome-icon(:icon="isClosed.includes('servicios') && isMobile?'chevron-right':'chevron-down'")
        hr.linea
        .inner(:class="{'is-closed': isClosed.includes('servicios')}")
          p Derecho Civil
          p Siniestros Viales
          p Daños y Perjuicios
          p Derecho de seguros 
          p Derecho laboral
          p Accidentes Laborales
          p Despidos
      .column.contacto
        h2.title(@click="isClosed.includes('contacto') ? isClosed.splice(isClosed.indexOf('contacto'), 1) : isClosed.push('contacto')") Contacto
          span.caret 
            font-awesome-icon(:icon="isClosed.includes('contacto') && isMobile?'chevron-right':'chevron-down'")
        hr.linea
        .inner(:class="{'is-closed': isClosed.includes('contacto')}")
          p Tel. +54 299 - 4823288
          p Tel. +54 299 - 6278944
          p Wap. +54 299 - 4219330
      .column.ubicacion
        h2.title(@click="isClosed.includes('ubicacion') ? isClosed.splice(isClosed.indexOf('ubicacion'), 1) : isClosed.push('ubicacion')") Ubicación
          span.caret 
            font-awesome-icon(:icon="isClosed.includes('ubicacion') && isMobile?'chevron-right':'chevron-down'")
        hr.linea
        .inner(:class="{'is-closed': isClosed.includes('ubicacion')}")
          p Entre Ríos 154. Neuquén
          p Patagonia Argentina.
    .firulete-der
</template>

<script>

export default {
  data() {
    return {
      isClosed: [],
      isMobile: window.matchMedia(`all and (max-width: 800px)`).matches || window.matchMedia(`all and (max-height: 576px) and (orientation : landscape)`).matches
    };
  },
  mounted() {
    if (this.isMobile) {
      this.isClosed.push('nosotros','contacto','ubicacion','servicios')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.footer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: $colorAzulBase;
  font-family: $fontGibson;
  @media all and (max-width: $btLG) {
    margin-top: 20px;
  }
  .firulete-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    .firulete-izq {
      position: absolute;
      left: 0;
      bottom: -30px;
      width: 150px;
      height: 95%;
      background-position: left;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("../../../assets/images/firulete-izq.png");
      @media all and (max-width: $btMidMD) {
        bottom: 0;
        width: 60px;
        height: 250px;
      }
    }
  }
  .contenido {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 50px 75px;
    height: 400px;
    width: 95%;
    margin-bottom: 40px;
    z-index: 2;
    @media all and (max-width: $btMidMD),
    (max-height: $btSM) and (orientation: landscape) {
      height: auto;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      padding-left: 50px;
    }
    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
      color: white;
      padding: 0 7.5px;
      .title {
        text-transform: uppercase;
        font-weight: 300;
        margin-bottom: 0;
        position: relative;
      }
      .caret {
        position: absolute;
        right: 12%;
      }
      .linea {
        width: 90%;
        margin: 0.5em 0;
        border: 1px solid #fff;
        border-bottom: 0;
      }
      .inner {
        overflow: hidden;
        max-height: 400px;
        @include ease-transition(500ms);
        p {
          font-size: 20px;
          font-weight: 300;
        }
        &.is-closed {
          @media all and (max-width: $btMidMD), 
          (max-height: $btSM) and (orientation: landscape) {
            max-height: 0;
            @include ease-transition(200ms);
          }
        }
      }
    }
  }
  .firulete-der {
    position: absolute;
    right: 0;
    top: -130px;
    width: 150px;
    height: 120%;
    background-position: right;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("../../../assets/images/firulete-der.png");
    @media all and (max-width: $btMidMD) {
      bottom: 0;
      width: 60px;
      height: 250px;
    }
  }
}
</style>
