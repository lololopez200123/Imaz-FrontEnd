<template lang="pug">
  .wysiwyg
    .field
      label.label {{name | capitalize}} {{required ? '*' : ''}}
      .control.has-icons-right(:class="{'is-danger': invalidField}")
        textarea#editor(
          :name="name"
          :placeholder='name | capitalize'
          v-validate="(required ? 'required' : '')"
          v-model="field")
        span.icon.is-small.is-right(v-if="required && invalidField")
          font-awesome-icon(icon="exclamation-triangle")
      p.help.is-danger(v-if="required && invalidField") Este campo es obligatorio
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import files from "@/admin/services/files";

const MyUploadAdapter = files.createCustomUploadAdapter();

export default {
  inject: ["$validator"],
  props: ["name", "value", "fieldSetter", "invalidField", "required"],
  data() {
    return {
      field: this.value ? this.value : ""
    };
  },
  mounted() {
    function MyCustomUploadAdapterPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    }

    ClassicEditor.create(document.querySelector("#editor"), {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      removePlugins: ["MediaEmbed"]
    })
      .then(editor => {
        editor.model.document.on("change:data", () => {
          this.set(editor.getData());
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    set(content = false) {
      if (content) {
        this.field = content;
      }
      this.fieldSetter(this.name, this.field);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Styles/_config.scss";
.wysiwyg {
  .control {
    &.is-danger {
      @include sombra(0 0 0 1px #f00);
    }
  }
}
</style>
