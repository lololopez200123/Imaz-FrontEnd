<template lang="pug">
  .input-date
    .field
      label.label {{label}} {{required ? '*' : ''}}
      .control.has-icons-right
        input.input(
          :name="name"
          type='date'
          :placeholder='name | capitalize'
          v-validate="(required ? 'required' : '')"
          v-model="field"
          :class="{'is-danger': invalidField}"
          @input="set")
        span.icon.is-small.is-right(v-if="required && invalidField")
          font-awesome-icon(icon="exclamation-triangle")
      p.help.is-danger(v-if="required && invalidField") Este campo es obligatorio
</template>

<script>
import moment from "moment";

export default {
  inject: ["$validator"],
  props: ["name", "label", "value", "fieldSetter", "invalidField", "required"],
  data() {
    return {
      moment,
      field: this.value ? moment(this.value).format("YYYY-MM-DD") : ""
    };
  },
  methods: {
    set() {
      this.fieldSetter(this.name, new Date(this.field));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.input-date {
}
</style>
