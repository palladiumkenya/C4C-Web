<template>
     <v-container
    fill-height
    fluid
    grid-list-xl
  >{{form}}
    <form @submit.prevent="submit">
        <div>
            <label for="email">
                Email
            </label>

            <input type="email" name="email" id="email" v-model="form.email">

            <label for="password">
                Password
            </label>

            <input type="password" name="password" id="password" v-model="form.password">

            <div>
                <button type="submit">
                    Login
                </button>
            </div>
        </div>
    </form>
     </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "login",
        components: {

        },
        data () {
          return{
              form: {
                  email: '',
                  password: '',
              }
          }
        },
        methods: {
            async submit() {
                //console.log('submitted');
                let response = axios.post('http://c4ctest.mhealthkenya.org/api/auth/login', this.form)
                console.log(response.data);
            }
        }
    }
</script>

<style scoped>

</style>
