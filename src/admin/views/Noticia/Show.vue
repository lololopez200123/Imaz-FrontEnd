<template lang="pug">
  .show
    .panel-heading
      .title.is-3
        span {{noticia.titulo}}
    .panel-block
      .attribute
        strong Categoria:
        .content(v-if="noticia.categoria")
          router-link.ref(:to="'/categorias/' + noticia.categoria._id") {{noticia.categoria.nombre}}
      .attribute
        strong Texto:
        .content
          .html(v-html="noticia.texto")
      .attribute
        strong Diario:
        .content
          span {{noticia.diario}}
</template>

<script>
export default {
  data() {
    return {
      noticia: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/noticias/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.noticia = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/noticias");
        }
      );
    } else {
      this.$router.replace("/noticias");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.show {
  .panel-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    min-height: 30px;
    padding: 0;
    .attribute {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
      }
      strong {
        width: 200px;
        min-width: 200px;
        height: 100%;
        background-color: #eee;
        padding: 15px;
      }
    }
    .content {
      padding: 15px;
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
