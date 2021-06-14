<template lang="pug">
  .login
    .panel
      .panel-heading
        .title.is-3
          span Iniciar sesión
      .panel-block
        form.control(@submit.prevent="performLogin", novalidate)
          .field
            label.label Email
            .control.has-icons-left.has-icons-right
              input.input(
                name="email"
                type='email'
                placeholder='Email'
                v-model="user.email"
                v-validate="'required|email'"
                :class="{'is-danger': isFieldInvalid('email')}")
              span.icon.is-small.is-left
                font-awesome-icon(icon="envelope")
              span.icon.is-small.is-right(v-if="isFieldInvalid('email')")
                font-awesome-icon(icon="exclamation-triangle")
            p.help.is-danger(v-if="isFieldInvalid('email')") El email es inválido
          .field
            label.label Contraseña
            .control.has-icons-left.has-icons-right
              input.input(
                name="password"
                type='password'
                placeholder='Contraseña'
                v-model="user.password"
                v-validate="'required'"
                :class="{'is-danger': isFieldInvalid('password')}")
              span.icon.is-small.is-left
                font-awesome-icon(icon="key")
              span.icon.is-small.is-right(v-if="isFieldInvalid('password')")
                font-awesome-icon(icon="exclamation-triangle")
            p.help.is-danger(v-if="isFieldInvalid('password')") La contraseña es inválida
          .field.is-grouped.is-pulled-right.is-vertical-center
            .loading(v-if="sent")
              font-awesome-icon(icon="circle-notch", spin)
            .control
              input.button.is-success(
                type="submit"
                value="Iniciar sesión"
                :disabled="!validForm || sent")
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      sent: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("users", ["login"]),
    performLogin() {
      if (this.dirtyForm && this.validForm) {
        this.sent = true;
        this.login({
          email: this.user.email,
          password: this.user.password,
          callback: () => {
            this.sent = false;
            this.user = {
              email: "",
              password: ""
            };
          }
        });
      } else {
        this.$validator.validateAll();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.login {
  form {
    .loading {
      margin-right: 5px;
    }
  }
}
</style>
