<template lang="pug">
  .contacto
    .contenido
      FormContacto
      GmapMap(
        :center="mapCenter"
        :zoom="mapZoom"
        map-type-id="terrain"
        class="map-container"
        :options="mapOptions"
      )
        GmapMarker(
          :position="mapMarker"
          :clickable="true"
          :draggable="false"
          title="Estudio Imaz"
        )
          GmapInfoWindow(
            :options="{ content: 'Estudio Imaz<br />Entre Rios 154' }"
          )
    Footer
</template>

<script>
  import Footer from "@/site/components/General/Footer";
  import FormContacto from "@/site/components/General/FormContacto";

  export default {
    data() {
      return {
        mapZoom: 17,
        mapCenter: { lat: -38.9534451, lng: -68.0509923 },
        mapMarker: { lat: -38.953443, lng: -68.0509923 },
        mapOptions: {
          zoomControl: false,
          draggable: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }
      }
    },
    components: {
      Footer,
      FormContacto
    }
  };
</script>

<style lang="scss" scoped>
  @import "~Styles/_config.scss";

  .contacto {
    padding-top: 50px;
    @media all and (max-width: $btLG) {
      padding-top: 0;
    }
    .contenido {
      padding-left: 50px;
      margin-bottom: 100px;
      display: flex;
      @media all and (max-width: $btLG) {
        flex-direction: column;
        width: 100%;
        padding-left: 0;
      }
      .map-container {
        width: calc(50% + 25px);
        height: 400px;
        @media all and (max-width: $btLG) {
          width: 100%;
        }
      }
    }
  }
</style>