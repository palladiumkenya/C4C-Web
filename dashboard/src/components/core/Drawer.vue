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
        class="fill-height items"
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
        <div
          v-for="(link, i) in links"
          :key="i">
          <v-list-tile
            v-if="!link.subLinks"
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
          <v-list-group
            v-else
            :key="link.text"
            :active-class="color"
            class="v-list-item"
            avatar
            no-action
          >

            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ link.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :active-class="color"
              :key="sublink.text"
              class="v-list-item"
              avatar
            >
              <v-list-tile-action>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="sublink.text" />
            </v-list-tile>

          </v-list-group>
        </div>
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
        icon: 'mdi-account',
        text: 'Users',
        subLinks: [
          {
            text: 'Upload HCW',
            to: '/add-user',
            icon: 'mdi-account-plus'
          },
          {
            to: '/users-list',
            icon: 'mdi-account-box-multiple',
            text: 'View Users'
          }
        ]
      },
      {
        to: 'registration-reports',
        icon: '',
        text: 'Registration Reports'
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
  .items {
    overflow: auto;
  }
</style>
