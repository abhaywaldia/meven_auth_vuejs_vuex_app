<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Register</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
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
              <label for="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                v-model="name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                v-model="password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirm_password"
                name="confirm_password"
                v-model="confirm_password"
                class="form-control"
              />
            </div>
            <button class="btn btn-primary" type="submit">Register</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/login" class="card-link">Already have an account?</router-link>
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
            password: "",
            email: "",
            confirm_password: "",
            name: ""
        }
    },
    methods:{
      ...mapActions({
        register: 'register'
      }),
      registerUser(){
          let userObj = {
            username: this.username,
            password: this.password,
            confirm_password: this.confirm_password,
            email: this.email,
            name: this.name
          }
          this.register(userObj).then(res=>{
            if(res.data.success === true){
              this.$router.push('login')
            }
          }).catch(err=>{
            console.log(err)
          })
      }
    }
};
</script>
<style scoped>
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