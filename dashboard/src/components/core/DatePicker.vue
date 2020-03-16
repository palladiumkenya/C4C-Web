<template>
<<<<<<< HEAD
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4">
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="event"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"/>
      </v-menu>
    </v-col>
    <v-spacer/>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  })
}
</script>
=======
 <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
     <v-flex
        md6
        lg2
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
        <v-divider class="mt-2"></v-divider>
      </template>
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
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
        lg2
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
        <v-divider class="mt-2"></v-divider>
      </template>
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
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
        lg2
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
        <v-divider class="mt-2"></v-divider>
      </template>
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
        <v-list-item disabled>
          <v-list-item-avatar color="grey lighten-3">
            <v-icon>mdi-food-apple</v-icon>
          </v-list-item-avatar>

        </v-list-item>
      </template>
    </v-select>
      </material-card>
    </v-flex>


      <!-- DatePickers -->

       <template>
       <v-flex
        md3
        lg3
      >
    <material-card

     >

      <template>
  <v-daterange v-model="range"></v-daterange>
</template>

    </material-card>
       </v-flex>


   </template>

    </v-layout>
  </v-container>

</template>

<script>
 import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
    components: { DateRangePicker },
    data: ()=> ({


      fruits: [
        'Apples',
        'Apricots',
        'Avocado',
        'Bananas',
        'Blueberries',
        'Blackberries',

      ],
      selectedFruits: [],

      return:{
      range: {}
    }
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
      },

    },


    methods: {
        //for dates


      toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectedFruits = []
          } else {
            this.selectedFruits = this.fruits.slice()
          }
        })
      },
    },
  }
</script>
>>>>>>> 6844d6324d5fe3a9f82f1d5fd34a0daa2031f064
