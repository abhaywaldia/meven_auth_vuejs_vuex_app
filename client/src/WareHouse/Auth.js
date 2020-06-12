import axios from 'axios'
import router from '../router'

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};

const getters = {
    // isLoggedIn: function(state){
    //     if(state.token != ''){
    //         return true
    //     }else{
    //         return false;
    //     }
    // }
    isLoggedIn: (state) => { return !!state.token },
    authState: (state) => { return state.status },
    user: (state) => { return state.user },
    error: (state) => { return state.error }
};
const actions = {
    //Login Action
    async login({ commit }, user) {
        try {
            commit('auth_request')
            let res = await axios.post('/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const userData = res.data.user;

                //Store the token into the local storage
                localStorage.setItem('token', token);

                //Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, userData);
            }
            return res;
        } catch (error) {
            commit('auth_error', error);
        }
    },

    //Register User
    async register({ commit }, user) {
        try {
            commit('register_request')
            let res = await axios.post('/api/users/register', user)
            if (res.data.success !== undefined) {
                commit('register_success')
            }
            return res;
        } catch (error) {
            commit('register_error', error)
        }
    },

    //Get the user profile
    async getProfile({ commit }) {
        commit('profile_request')
        let res = await axios.get('/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },

    //Logout User
    logout({ commit }) {
        localStorage.removeItem('token');
        commit('logout')
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login')
        return;
    }
};
const mutations = {
    auth_request(state) {
        state.status = 'loading'
        state.error = null
    },
    auth_success(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success'
        state.error = null
    },
    register_request(state) {
        state.status = 'loading'
        state.error = null
    },
    register_success(state) {
        state.status = 'success'
        state.error = null
    },
    profile_request(state) {
        state.status = 'loading'
        state.error = null
    },
    user_profile(state, user) {
        state.user = user
        state.error = null
    },
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
        state.error = null
    },
    auth_error(state, error) {
        state.error = error.response.data.msg
    },
    register_error(state, error) {
        state.error = error.response.data.msg
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}