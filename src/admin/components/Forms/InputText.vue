<template lang="pug">
  .input-text
    .field
      label.label(v-if="label") {{label}} {{required ? '*' : ''}}
      .control.has-icons-right
        input.input(
          :name="name"
          :type='type ? type:"text"'
          :placeholder='(placeholder? placeholder: name) | capitalize'
          v-validate="(required ? 'required' : '')"
          v-model="field"
          :class="{'is-danger': invalidField || invalidEmail}"
          @input="set")
        span.icon.is-small.is-right(v-if="required && (invalidField || invalidEmail)")
          font-awesome-icon(icon="exclamation-triangle")
      p.help.is-danger(v-if="required && (invalidField || (invalidEmail && value === ''))") Este campo es obligatorio
      p.help.is-danger(v-if="required && invalidEmail && value !== ''") El email no es correcto
</template>

<script>
  export default {
    inject: ["$validator"],
    props: ["name", "label", "value", "type", "placeholder", "fieldSetter", "invalidField", "invalidEmail", "required"],
    data() {
      return {
        field: this.value ? this.value : ""
      };
    },
    methods: {
      set() {
        this.fieldSetter(this.name, this.field);
      }
    },
  };
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.input-text {
}
</style>
