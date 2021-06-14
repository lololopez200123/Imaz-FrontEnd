<template lang="pug">
  .index
    .section
      .level
        .level-left
          .title.is-3
            span Categorias
        .level-right
          router-link.button.is-warning(to="/categorias/new") Nueva categoria
      .section
        table.table.is-fullwidth.is-hoverable
          thead
            tr
              th
                span nombre
              th
                span Editar
              th
                span Eliminar
          tbody
            tr.no-categorias(
              v-if="categorias.length === 0")
              td
                span No hay categorias todavía
            tr(
              v-for="categoria in categorias"
              :key="categoria._id")
              td
                router-link(:to="'/categorias/' + categoria._id") {{categoria.nombre}}
              td
                router-link.button.is-link(:to="'/categorias/' + categoria._id + '/edit'") Editar
              td
                router-link.button.is-danger(:to="'/categorias/' + categoria._id + '/delete'") Eliminar
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      categorias: []
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/categorias",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.categorias = data;
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
        &.no-categorias {
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
