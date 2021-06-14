<template lang="pug">
  .show
    .panel-heading
      .title.is-3
        span {{publicacion.titulo}}
    .panel-block
      .attribute
        strong Texto:
        .content
          .html(v-html="publicacion.texto")
      .attribute
        strong Pubdate:
        .content
          .date {{moment.tz(publicacion.pubdate, 'America/Argentina/Mendoza').format('DD/MM/YYYY')}}
      .attribute
        strong Diario:
        .content
          span {{publicacion.diario}}
      .attribute
        strong Autor:
        .content
          span {{publicacion.autor}}
</template>

<script>
import moment from "moment-timezone";

export default {
  data() {
    return {
      moment,
      publicacion: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/publicaciones/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.publicacion = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/publicaciones");
        }
      );
    } else {
      this.$router.replace("/publicaciones");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.show {
  margin-bottom: 50px;
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
