<template lang="pug">
  .sidebar
    p.buttons
      button.button.is-fullwidth(
        @click="onSelectAction('show')"
        :disabled="isDisabled('show')"
        :class="[isButtonActive('show'), isButtonFocused('show')]"
      )
        span.icon
          i
            font-awesome-icon(icon="eye")
        span.text Voy a visualizar
    p.buttons
      button.button.is-fullwidth(
        @click="onSelectAction('edit')"
        :disabled="isDisabled('edit')"
        :class="[isButtonActive('edit'), isButtonFocused('edit')]"
      )
        span.icon
          i
            font-awesome-icon(icon="pencil-alt") 
        span.text Voy a editar
    p.buttons
      router-link.button.is-fullwidth(
        to="/profesionales/new"
        tag="button"
        :disabled="isDisabled('new')"
        :class="[isButtonActive('new'), isButtonFocused('new')]"
      )
        span.icon
          i
            font-awesome-icon(icon="edit")
        span.text Voy a crear
</template>
<script>
  export default {
    data() {
      return {
        actionSelected: ''
      }
    },
    methods: {
      onSelectAction(event) {
        this.$emit('action', event);
        this.actionSelected = event;
      },
      isButtonActive(type) {
        if ((type === "edit" && (this.$route.path.includes('/edit') || this.actionSelected === type)) ||
          (type === "show" && ((!this.$route.path.includes('/edit') && this.$route.params.id) || this.actionSelected === type)) ||
          (type === "new" && this.$route.path.includes('/new')))
          return 'is-active';
      },
      isButtonFocused(type) {
        if ((type === "edit" && this.$route.path.includes('/edit')) || (type === "show" && !this.$route.path.includes('/edit') && this.$route.params.id) || (type === "new" && this.$route.path.includes('/new')))
          return 'is-focused';
      },
      isDisabled(type) {
        if (this.$route.path === '/profesionales')
          return false;
        if (type === 'edit' && !this.$route.path.includes('/edit'))
          return true;
        if (type === 'show' && (this.$route.path.includes('/edit') || !this.$route.params.id))
          return true;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~Styles/_config.scss";

  .sidebar {
    .button {
      .text {
        color: $colorAzulPastelMedio;
      }
    }
  }
</style>