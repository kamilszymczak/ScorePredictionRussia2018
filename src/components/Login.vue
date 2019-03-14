
<template>

  <component :is="currentComponent"></component>

</template>

<script>

import loginPage from '../components/loginPage.vue'
import registerPage from '../components/registerPage.vue'

export default {

  components: {
    'login-page': loginPage,
    'register-page': registerPage
  },

  data() {
    return {
      currentComponent: 'login-page'

    }
  },

  created(){
    console.log("Page is Login!");
    this.$eventHub.$emit('change-title', "Logowanie");
  },


  methods: {

    disableLoginWhenLoggedin: function() {

      if (this.$route.path === "/login" && sessionStorage.getItem('auth_id')) {
          this.$router.push('/')
          }
    }

  },


  mounted: function () {
    this.disableLoginWhenLoggedin()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li{
  background-color: orange;
}

.loginForm{
  text-align: center;
  margin-top: 30px;
}

.registerForm{
  text-align: center;
  margin-top: 30px;
}

label{
  display: block;
  padding-right: 140px;
  padding-bottom: 10px;
}

.inputBox{
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #D1D1D1;
  height: 29px;
  width: 178px;
  outline: none;
  padding-left: 5px;
  margin-bottom: 42px;
}


.submit-button{
  color: #fff;
  background-color: #EA445B;
  font-weight: 500;
  border-radius: 5px;
  border-style: solid;
  border-width: 0px;
  height: 33px;
  width: 178px;
  outline: none;
  padding-left: 5px;
  margin-bottom: 42px;
}

.singup{
  text-decoration: none;
}

.signup a{
  text-decoration: none;
}

.signup a:visited{
  color: inherit;
}

.signup a:link{
  color: inherit;
}

.signup span{
  color: #EA445B;
}

.red{
  color: #EA445B;
}

</style>
