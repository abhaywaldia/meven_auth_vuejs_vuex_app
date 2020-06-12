<template>
  <div>
    <h2>Login</h2>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
              <div class="card-body">
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="username">UserName</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              v-model="username"
              class="form-control"
            />
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" placeholder="Password" id="password" name="password" v-model="password" class="form-control">
          </div>
          <button class="btn btn-primary" type="submit">Login</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/register" class="card-link">Need account?</router-link>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            username: "",
            password: ""
        }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      loginUser(){
        let user = {
          username: this.username,
          password: this.password
        };
        this.login(user).then(res=>{
          if(res.data.success){
            this.$router.push('/profile')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
};
</script>
<style>
.card {
  width: 60%;
  border-radius: 0;
}
.btn{
    border-radius: 0;
}
.form-control{
    border-radius: 0;
}
</style>