<template>

  <v-daterange v-model="range"/>
</template>
<script>
import { VDaterange } from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'
export default {
  components: { VDaterange },
  data () {
    return {
      range: {}
    }
  }
}
</script>
