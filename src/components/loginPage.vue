<template>
<form @submit.prevent="onLogin">

  <div class="alert" v-if="displayAlert" v-on:click="displayAlert = false">
    <div class="alertMsg">{{ alertMsg }}</div>
  </div>

  <div class="loginForm">

    <div class="input">
      <label for="fname">Login</label>
      <input type="text" id="login" v-model="login" class="inputBox" name="login" autocomplete="off">
    </div>

    <div class="input">
      <label for="fname">Hasło</label>
      <input type="password" id="password" v-model="password" class="inputBox" name="password" autocomplete="off">
    </div>

    <input class="submit-button" type="submit" :disabled='disableSubmitBtn' value="Zaloguj" />


    <div class="signup">
      <a class="signup" v-on:click="$parent.currentComponent = 'register-page'" href="#">Nie masz jeszcze konta? <span class="red">Zarejestruj się</span></a>
    </div>

  </div>

</form>
</template>




<script>
import axios from 'axios'

export default {

  data() {
    return {
      login: '',
      password: '',
      component: 'login-page',
      disableSubmitBtn: true,
      displayAlert: false,
      alertMsg: ''
    }
  },


  watch: {

    login(value) {
      this.login = value;
      this.check();
    },

    password(value) {
      this.password = value;
      this.check();

    }

  },



  methods: {

    check: function() {

      if (this.login != '' && this.password != '') {
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }

    },

    Alert: function() {
      this.alertMsg = "Nazwa użytkownika i hasło nie zgadzają się";
      this.displayAlert = true;
      var self = this;
      setTimeout(function() {self.displayAlert = false; }, 4000);

    },

    fetchResults: function() {
      let params = new FormData();
      params.append('username', this.login);
      params.append('password', this.password);

      axios.post('http://192.168.1.73:8080/api/login.php', params)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            sessionStorage.setItem("loggedin", true);
            sessionStorage.setItem("auth_id", response.data);
            console.log("Logging in!...");
            this.$eventHub.$emit('loggedin-status', true);
            this.$router.push({
              path: '/'
            });

          }
          if (response.status === 204) {
            console.log("BUUU YOU HAVE NOT WORKED!");
            this.Alert();
          }


        })
        .catch(function(error) {
          console.log(error);
          console.log("DB NOT UP!");
        });
    },

    onLogin() {
      this.fetchResults();
    }



  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  padding: 20px;
  background-color: #EA445B;
  color: white;
  /* margin-bottom: 15px; */
  text-align: center;
  position: fixed;
  z-index: 98;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
  /* margin-top: -156px; */
  margin-top: -126px;
  border-radius: 10px;
  z-index: 199;
}


li {
  background-color: orange;
}

.loginForm {
  text-align: center;
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
}

label {
  display: block;
  text-align: left;
  padding-left: 60px;
  padding-bottom: 10px;
}


.inputBox {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #D1D1D1;
  height: 29px;
  width: 178px;
  outline: none;
  padding-left: 5px;
}

.input {
  height: 105px;
}


.submit-button {
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
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #BBBBBB;
  cursor: default;
}

.singup {
  text-decoration: none;
}

.signup a {
  text-decoration: none;
}

.signup a:visited {
  color: inherit;
}

.signup a:link {
  color: inherit;
}

.signup span {
  color: #EA445B;
}
</style>
