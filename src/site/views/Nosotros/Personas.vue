<template lang="pug">
  .personas
    Persona(v-for="(persona, index) in profesionales", :key="persona._id", :persona="persona")
</template>

<script>

  import Persona from './Persona';

  export default {
    components: {
      Persona
    },
    data() {
      return {
        profesionales: {}
      };
    },
    mounted() {
      this.$http({
        method: "GET",
        url: "/api/profesionales"
      }).then(
        ({ data }) => {
          this.profesionales = data;
        },
        error => {
          console.error(error);
        }
      );
    }
  };
</script>

<style lang="scss" scoped>
  @import "~Styles/_config.scss";
  .personas {
    width: 80%;
    margin: auto;
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    @media all and (max-width: $btLG) {
      width: 90vw;
    }
  }
</style>
