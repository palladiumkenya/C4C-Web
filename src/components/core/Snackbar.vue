<template>
    <v-snackbar
    top
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true">
        
      {{ snackbar.text }}
        
    <v-icon size="16" @click="closeSnackbar"> mdi-close-circle </v-icon>    
   
    </v-snackbar>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
    computed: {
       snackbar() {
           return this.$store.state.snackbar
       }
    },
    
    methods: {
        ...mapMutations(["closeSnackbar"])
    }   
}
</script>    
       