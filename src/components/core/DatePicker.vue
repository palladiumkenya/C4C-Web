<template>
  <v-daterange v-model="range" color="green lighten-1"></v-daterange>
</template>
<script>
import VuetifyDaterangePicker from "vuetify-daterange-picker";
import { VDaterange } from "vuetify-daterange-picker"
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
export default {

  data() {
    return {
      range: {}
    }
  }
}
</script>