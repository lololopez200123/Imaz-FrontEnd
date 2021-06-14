
<template lang="pug">
  <div class="elfsight-app-a4716019-740b-4f48-aa77-a60a1036bdb7 chat-app"></div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://apps.elfsight.com/p/platform.js",
    };
  },
   mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://apps.elfsight.com/p/platform.js')
      document.head.appendChild(recaptchaScript)
    }
};
</script>

<style lang="css">
 #portal-a4716019-740b-4f48-aa77-a60a1036bdb7 > div > div.Window__WindowComponent-sc-17wvysh-1.exIXPt > div:nth-child(5){
   display: none!important
 }
 .chat-app{
   display:inline;
 }
</style>