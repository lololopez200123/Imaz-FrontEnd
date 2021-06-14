<template lang="pug">
  .show
    .panel-heading
      .title.is-3
        span {{categoria.nombre}}
    .panel-block
</template>

<script>
export default {
  data() {
    return {
      categoria: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/categorias/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.categoria = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/categorias");
        }
      );
    } else {
      this.$router.replace("/categorias");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.show {
  .panel-block {
    .attribute {
      margin-right: 7px;
    }
    .content {
      .html {
        white-space: pre-line;
      }
      img {
        object-fit: contain;
        max-height: 250px;
        max-width: 250px;
      }
    }
  }
}
</style>
