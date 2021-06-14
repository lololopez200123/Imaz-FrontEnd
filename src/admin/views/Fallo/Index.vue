<template lang="pug">
  .index
    .section
      .level
        .level-left
          .title.is-3
            span Fallos novedosos
        .level-right
          router-link.button.is-warning(to="/fallos/new") Nuevo fallo novedoso
      .section
        table.table.is-fullwidth.is-hoverable
          thead
            tr
              th
                span Carátula
              th
                span Editar
              th
                span Eliminar
          tbody
            tr.no-fallos(
              v-if="fallos.length === 0")
              td
                span No hay fallos todavía
            tr(
              v-for="fallo in fallos"
              :key="fallo._id")
              td
                router-link(:to="'/fallos/' + fallo._id") {{fallo.caratula}}
              td
                router-link.button.is-link(:to="'/fallos/' + fallo._id + '/edit'") Editar
              td
                router-link.button.is-danger(:to="'/fallos/' + fallo._id + '/delete'") Eliminar
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fallos: []
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "/api/fallos",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.fallos = data;
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
        &.no-fallos {
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
