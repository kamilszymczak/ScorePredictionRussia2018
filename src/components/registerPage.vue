<template>
<form @submit.prevent="onRegister">

  <div class="alert" v-if="displayAlert" v-on:click="displayAlert = false">
    <div class="alertMsg">{{ alertMsg }}</div>
  </div>

  <div class="registerForm">

    <div class="input">
      <label for="login">Login</label>
      <input type="text" v-model="login" v-bind:class="{ error: hasError.login }" class="inputBox" name="login" autocomplete="off" maxlength="25">
      <span>{{msg.login}}</span>
    </div>

    <div class="input">
      <label for="password">Hasło</label>
      <input type="password" v-model="password" v-bind:class="{ error: hasError.password }" class="inputBox" name="password" autocomplete="off">
      <span>{{msg.password}}</span>
    </div>

    <div class="input">
      <label for="confirmPassword">Powtórz Hasło</label>
      <input type="password" v-model="confirmPassword" v-bind:class="{ error: hasError.confirmPassword }" class="inputBox" name="confirmpassword" autocomplete="off">
      <span>{{msg.confirmPassword}}</span>
    </div>

    <input class="submit-button" type="submit" :disabled='disableSubmitBtn' value="Zarejestruj" />


    <div class="signup">
      <a class="signup" v-on:click="$parent.currentComponent = 'login-page'" href="#">Masz już konto? <span class="red">Zaloguj się</span></a>
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
      confirmPassword: '',
      component: 'registration-page',
      msg: [],
      disableSubmitBtn: true,
      hasError: [],
      displayAlert: false,
      alertMsg: ''
    }
  },

  watch: {

    login(value) {
      this.login = value;
      this.checkLogin(value);
      this.check();
    },

    password(value) {
      this.password = value;
      this.checkPassword(value);
      this.checkConfirmPassword();
      this.check();

    },

    confirmPassword() {
      this.checkConfirmPassword();
      this.check();

    }

  },

  methods: {

    check: function() {

      if (this.hasError['login'] == false && this.hasError['password'] == false && this.hasError['confirmPassword'] == false && this.login.length > 4 && this.password.length > 5 && this.confirmPassword.length > 5) {
        console.log("TTH");
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }

    },

    checkLogin: function(value) {

      if (/^[0-9a-zA-Z]+$/.test(value)) {
        this.msg['login'] = '';
        this.hasError['login'] = false;
      } else if (!/^[0-9a-zA-Z]+$/.test(value) && value == '') {
        this.msg['login'] = '';
        this.hasError['login'] = false;
      } else {
        this.msg['login'] = 'Login może zawierać tylko litery i liczby';
        this.hasError['login'] = true;
      }


    },

    checkPassword: function(value) {

      if (this.password.length >= 1 && this.password.length < 6 && this.password.length != 0) {
        this.msg['password'] = 'Hasło musi mieć przynajmniej 6 znaków';
        this.hasError['password'] = true;
      } else {
        this.msg['password'] = '';
        this.hasError['password'] = false;
      }


    },

    checkConfirmPassword: function() {

      if (this.confirmPassword == this.password) {
        console.log("Match <3");
        this.hasError['confirmPassword'] = false;
      } else {
        this.hasError['confirmPassword'] = true;
      }

    },

    Alert: function() {
      this.alertMsg = "Nazwa użytkownika już istnieję";
      this.displayAlert = true;
      var self = this;
      setTimeout(function() {
        self.displayAlert = false;
      }, 4500);

    },



    onRegister() {
      this.register();
    },

    register: function() {
      let self = this;
      let params = new FormData();
      params.append('username', this.login);
      params.append('password', this.password);

      axios.post('http://localhost:8080/api/register.php', params).then(function(response) {
          console.log(response);
          if (response.status === 200) {
            sessionStorage.setItem("auth_id", response.data);
            self.$eventHub.$emit('loggedin-status', true);
            self.$router.push({
              name: 'typowanie'
            });
          }
          if (response.status === 204) {
            self.Alert();
          }
        })
        .catch((error) => {
          console.log(error);
          this.formErrors = error;
        });
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


.registerForm {
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
  padding-left: 5px; //margin-bottom: 42px;
}

.input {
  height: 105px;
}

.input span {
  display: block;
  padding-top: 5px;
  color: #EC4E4E;
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

.red {
  color: #EA445B;
}

.error {
  border-color: #EA445B;
}
</style>
