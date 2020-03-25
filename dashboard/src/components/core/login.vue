git<template>
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
    import {mapActions} from 'vuex'
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
            ...mapActions({
                signIn: 'auth/signIn'
            }
            ),
            submit() {
                this.signIn(this.form)
                .then(()=>this.$router.push(this.$route.query.redirect || '/'))
                .catch(()=>{
                    console.log('failed')
                })
            }
        }
    }
</script>

<style scoped>

</style>
