import axios from 'axios';
import Vue from 'vue'


export default {
    signIn (username, password) {
        var authenticationRequest = {username: username, password: password}
        return axios.post('/api/auth/signin', authenticationRequest)
        .then(response => {
            if (response && response.data) {
                Vue.prototype.$snotify.success('hello')
                return response.data;

            }
        })
    },

    refresh (refreshToken) {
        var request = {refreshToken: refreshToken}
        return axios.post('/api/auth/refresh', request)
        .then(response => {
            if (response && response.data) return response.data;
        })
    },

    logout () {
        return axios.post('/api/auth/logout')
        .then(response => {
            if (response && response.data) return response.data;
        })
    },


}

