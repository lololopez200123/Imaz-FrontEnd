<template lang="pug">
  .index
    .section
      .level
        .level-left
          .title.is-3
            span Links de interés
        .level-right
          router-link.button.is-warning(to="/links/new") Nuevo link de interés
      .section
        table.table.is-fullwidth.is-hoverable
          thead
            tr
              th
                span Título
              th
                span Editar
              th
                span Eliminar
          tbody
            tr.no-links(
              v-if="links.length === 0")
              td
                span No hay links todavía
            tr(
              v-for="link in links"
              :key="link._id")
              td
                router-link(:to="'/links/' + link._id") {{link.titulo}}
              td
                router-link.button.is-link(:to="'/links/' + link._id + '/edit'") Editar
              td
                router-link.button.is-danger(:to="'/links/' + link._id + '/delete'") Eliminar
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      links: []
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/links",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.links = data;
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
        &.no-links {
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
