<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <Errors v-if="error" :msg="error"/>
      <router-view/>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar"
import Errors from "@/components/Errors"
import {mapGetters} from 'vuex'
export default {
    components: {
      NavBar,
      Errors
    },
    computed:{
      ...mapGetters(["error"])
    }
}
</script>
<style>
.card{
  border-radius: 0px;
}
</style>
