<template lang="pug">
  .index
    .section
      .level
        .level-left
          .title.is-3
            span Noticias
        .level-right
          router-link.button.is-warning(to="/noticias/new") Nueva noticia
      .section
        table.table.is-fullwidth.is-hoverable
          thead
            tr
              th
                span Titulo
              th
                span Editar
              th
                span Eliminar
          tbody
            tr.no-noticias(
              v-if="noticias.length === 0")
              td
                span No hay noticias todavía
            tr(
              v-for="noticia in noticias"
              :key="noticia._id")
              td
                router-link(:to="'/noticias/' + noticia._id") {{noticia.titulo}}
              td
                router-link.button.is-link(:to="'/noticias/' + noticia._id + '/edit'") Editar
              td
                router-link.button.is-danger(:to="'/noticias/' + noticia._id + '/delete'") Eliminar
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      noticias: []
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/noticias",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.noticias = data;
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
.index {
  table {
    thead {
      tr {
        th {
          &:first-of-type {
            width: 100%;
          }
        }
      }
    }
    tbody {
      tr {
        &.no-noticias {
          td {
            span {
              color: #999;
            }
          }
        }
        td {
          &:first-of-type {
            width: 100%;
            a {
              font-size: 120%;
              font-weight: bold;
              letter-spacing: 1px;
            }
          }
        }
      }
    }
  }
}
</style>
