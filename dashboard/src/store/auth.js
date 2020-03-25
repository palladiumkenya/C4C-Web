import axios from 'axios'

export default{
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    mutations: {},
    actions: {
        async signIn(_, credentials ) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');

            //console.log('submitted');
            axios.post('http://c4ctest.mhealthkenya.org/api/auth/login',{
                email: credentials.email,
                password: credentials.password
            }, headers)
            // .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error.message));
        }
    },
}
