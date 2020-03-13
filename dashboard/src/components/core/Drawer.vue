<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Care For The Carer
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico',
    links: [
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/add-user',
        icon: 'mdi-account',
        text: 'Upload HCW'
      },
      {
        to: '/users-list',
        icon: 'mdi-account-box-multiple',
        text: 'View Users'
      },
      {
        to: '/exposures',
        icon: 'mdi-alert-circle-outline',
        text: 'Exposures'
      },
      {
        to: '/immunizations',
        icon: 'mdi-account-edit',
        text: 'Immunizations'
      },
      {
        to: '/broadcast',
        icon: 'mdi-account-switch',
        text: 'Broadcasts'
      },
      {
        to: '/add_device',
        icon: 'mdi-gamepad',
        text: 'Devices'
      },
      {
        to: '/resources',
        icon: 'mdi-arrow-down-bold-circle',
        text: 'Resources'
      },
      {
        to: '/logout',
        icon: 'mdi-clipboard-outline',
        text: 'Logout'
      }
    ]
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>
