<template lang="pug">
  .show
    .panel-heading
      .title.is-3
        span {{fallo.caratula}}
    .panel-block
      .attribute
        strong Expediente:
        .content
          span {{fallo.expediente}}
      .attribute
        strong Texto:
        .content
          .html(v-html="fallo.texto")
      .attribute
        strong Pubdate:
        .content
          .date {{moment.tz(fallo.pubdate, 'America/Argentina/Mendoza').format('DD/MM/YYYY')}}
</template>

<script>
import moment from "moment-timezone";

export default {
  data() {
    return {
      moment,
      fallo: {}
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http({
        method: "GET",
        url: `/api/fallos/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(
        ({ data }) => {
          this.fallo = data;
        },
        error => {
          console.error(error);
          this.$router.replace("/fallos");
        }
      );
    } else {
      this.$router.replace("/fallos");
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
