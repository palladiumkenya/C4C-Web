<template>
  <v-app>
    <div
      v-if="this.$route.path !== '/login'">
      <core-toolbar />

      <core-drawer />
    </div>
    <core-view />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  created: function() {
    // Create a cache when component/app is created
    this.cachedFormData = this.formDataForComparison();
    
    document.addEventListener('beforeunload', this.handlerClose);
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
      
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/signout'
    }),
    handlerClose: function() {
      this.logoutAction().then(() => {
      this.$router.replace({
        name: 'login'
      })
      })
      localStorage.removeItem('token');
    }
  }
}

</script>

<style lang="scss">
@import 'styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
