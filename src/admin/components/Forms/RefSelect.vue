<template lang="pug">
  .ref-select
    .field
      label.label {{name | capitalize}} {{required ? '*' : ''}}
      .control.has-icons-right
        .select.is-fullwidth
          select(
            :name="name"
            v-model="field"
            :class="{'is-danger': invalidField}"
            @change="set")
            option(selected, disabled, value="") -- Seleccionar {{name | capitalize}} --
            option(
              v-for="item in items"
              :key="item._id"
              :value="item._id") {{item[optionProp]}}
        span.icon.is-small.is-right(v-if="required && invalidField")
          font-awesome-icon(icon="exclamation-triangle")
      p.help.is-danger(v-if="required && invalidField") Este campo es obligatorio
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["name", "plural", "value", "optionProp", "fieldSetter", "invalidField", "required"],
  data() {
    return {
      items: [],
      field: this.value ? this.value : ""
    };
  },
  computed: {
    ...mapState("users", ["token"])
  },
  mounted() {
    this.$http({
      method: "GET",
      url: `/api/${this.plural}`,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(
      ({ data }) => {
        this.items = data;
      },
      error => {
        console.error(error);
      }
    );
  },
  methods: {
    set() {
      this.fieldSetter(this.name, this.field);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.ref-select {
}
</style>
