<template>
  <div>
    <div
      ref="editor"
      style="text-align:left"
    ></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  data() {
    return {
      editor: null,
      info_: ""
    };
  },
  props: ["content"],
  watch: {
    content(newOne, oldOne) {
      this.editor.txt.html(newOne);
    }
  },

  methods: {},
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.info_ = html;
      this.$emit("on-change", this.info_);
    };

    this.editor.customConfig.uploadImgServer = "/upload";
    this.editor.create();
  }
};
</script>

<style scoped>

</style>
