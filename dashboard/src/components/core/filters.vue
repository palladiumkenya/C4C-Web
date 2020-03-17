<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md6
        lg3
      >
        <material-card

        >
          <v-select
            v-model="selectedFruits"
            :items="fruits"
            label="Cadre"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"/>
            </template>
            <template v-slot:append-item>
              <v-divider class="mb-2"/>
              <v-list-item disabled>
                <v-list-item-avatar color="grey lighten-3">
                  <v-icon>mdi-food-apple</v-icon>
                </v-list-item-avatar>

              </v-list-item>
            </template>
          </v-select>
        </material-card>
      </v-flex>

      <!-- second select -->

      <v-flex
        md6
        lg3
      >
        <material-card

        >
          <v-select
            v-model="selectedFruits"
            :items="fruits"
            label="Gender"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"/>
            </template>
            <template v-slot:append-item>
              <v-divider class="mb-2"/>
              <v-list-item disabled>
                <v-list-item-avatar color="grey lighten-3">
                  <v-icon>mdi-food-apple</v-icon>
                </v-list-item-avatar>

              </v-list-item>
            </template>
          </v-select>
        </material-card>
      </v-flex>

      <!-- third select -->
      <v-flex
        md6
        lg3
      >
        <material-card

        >
          <v-select
            v-model="selectedFruits"
            :items="fruits"
            label="Age Group"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"/>
            </template>
            <template v-slot:append-item>
              <v-divider class="mb-2"/>
              <v-list-item disabled>
                <v-list-item-avatar color="grey lighten-3">
                  <v-icon>mdi-food-apple</v-icon>
                </v-list-item-avatar>

              </v-list-item>
            </template>
          </v-select>
        </material-card>
      </v-flex>

      <!-- Fourth select -->

    </v-layout>
  </v-container>

</template>

<template>

  <v-btn block
      :loading="loading2"
      :disabled="loading2"
      color="success"
      @click="loader = 'loading2'"
    >
      Filter
      <template v-slot:loader>

      </template>
    </v-btn>

</template>

<script>
export default {
  data: () => ({

    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

    loader: null,
    loading3: false,

    fruits: [
      'Apples',
      'Apricots',
      'Avocado',
      'Bananas',
      'Blueberries',
      'Blackberries'

    ],
    selectedFruits: []
  }),

  computed: {
    likesAllFruit () {
      return this.selectedFruits.length === this.fruits.length
    },
    likesSomeFruit () {
      return this.selectedFruits.length > 0 && !this.likesAllFruit
    },
    icon () {
      if (this.likesAllFruit) return 'mdi-close-box'
      if (this.likesSomeFruit) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },

  methods: {
    toggle () {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = []
        } else {
          this.selectedFruits = this.fruits.slice()
        }
      })
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
