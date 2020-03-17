yarn

<!-- Filter button -->

<template>

  <v-btn
    :loading="loading2"
    :disabled="loading2"
    block
    color="success"
    @click="loader = 'loading2'"
  >
    Filter
    <template v-slot:loader/>
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
