<template lang="pug">
  .index
    .section
      .level
        .level-left
          .title.is-3
            span Publicaciones
        .level-right
          router-link.button.is-warning(to="/publicaciones/new") Nueva publicacion
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
            tr.no-publicaciones(
              v-if="publicaciones.length === 0")
              td
                span No hay publicaciones todavía
            tr(
              v-for="publicacion in publicaciones"
              :key="publicacion._id")
              td
                router-link(:to="'/publicaciones/' + publicacion._id") {{publicacion.titulo}}
              td
                router-link.button.is-link(:to="'/publicaciones/' + publicacion._id + '/edit'") Editar
              td
                router-link.button.is-danger(:to="'/publicaciones/' + publicacion._id + '/delete'") Eliminar
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      publicaciones: []
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/publicaciones",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.publicaciones = data;
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
        &.no-publicaciones {
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
