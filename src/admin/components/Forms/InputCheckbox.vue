<template lang="pug">
  .input-checkbox
    .field
      label.checkbox
        input.checkbox(
          :name="name"
          type='checkbox'
          :placeholder='name | capitalize'
          v-model="field")
        span {{name | capitalize}}
</template>

<script>
export default {
  props: ["name", "value", "fieldSetter", "invalidField", "required"],
  data() {
    return {
      field: this.value ? this.value : ""
    };
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
.input-checkbox {
  .checkbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 0;
    span {
      margin-left: 7px;
      width: 100%;
      min-width: 100%;
      font-weight: bold;
    }
  }
}
</style>
