<template lang="pug">
  .show
    .panel-heading
      .title.is-3
        span {{link.titulo}}
    .panel-block
      .attribute
        strong Url:
        .content
          span {{link.url}}
      .attribute
        strong Imagen:
        .content
          img(:src="link.imagen")
</template>

<script>
export default {
  data() {
    return {
      link: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/links/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.link = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/links");
        }
      );
    } else {
      this.$router.replace("/links");
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
