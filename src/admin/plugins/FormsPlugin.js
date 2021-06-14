export default {
  install(Vue) {
    Vue.mixin({
      computed: {
        dirtyForm() {
          return Object.keys(this.fields).some(field => this.fields[field].dirty);
        },
        validForm() {
          return Object.keys(this.fields).every(field => this.fields[field].valid);
        }
      },
      methods: {
        stripHtml(html) {
          return (
            !html ||
            html
              .replace(/<(?:.|\n)*?>/gm, " ")
              .replace(/&.*;/gm, " ")
              .trim()
          );
        },
        isFieldInvalid(field) {
          return this.fields[field]
            ? this.fields[field].validated &&
                (this.fields[field].dirty || this.fields[field].touched) &&
                !this.fields[field].valid
            : true;
        },
        isEmailInvalid(email) {
          return this.fields[email]
            ? this.fields[email].validated &&
            (this.fields[email].dirty || this.fields[email].touched) &&
            !this.fields[email].valid
            : true;
        }
      }
    });
  }
};
