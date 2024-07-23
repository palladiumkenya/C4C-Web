<template>
  <v-footer
    v-if="this.$route.path !== '/login'"
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>

    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://kenyahmis.org/"
        target="_blank">KenyaHMIS</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/' },
      { name: 'About Us', Link: 'https://kenyahmis.org/about-us/' },
      { name: 'Publication', Link: 'https://kenyahmis.org/resources/' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
