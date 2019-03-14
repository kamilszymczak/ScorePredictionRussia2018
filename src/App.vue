<template>
<div id="app">

  <div class="title">

    <div class="text">{{ title }}</div>

    <div class="logout" v-on:click="logout()" v-show="loggedin" v-if="this.$route.path !== '/faq'">
      <input class="logoutBtn" type="button" value="Wyloguj" />
    </div>


    <router-link to="/" v-if="this.$route.path == '/faq'">
      <div class="back-button"><i class="arrow left"></i> Wróć</div>
    </router-link>




  </div>

  <div class="nav" v-if="this.$route.path !== '/faq'">
    <ul>

      <router-link tag="li" to="/" :class="[$route.path === '/login' ? 'router-link-exact-active' : 'null']">
        <a>Typowanie</a>
      </router-link>

      <router-link tag="li" to="/wyniki">
        <a>Wyniki</a>
      </router-link>

    </ul>
  </div>

<div class="page-wrap">
  <router-view />
</div>

<router-link to="/faq">
<footer class="site-footer" v-if="this.$route.path !== '/faq'">Pomoc / FAQ</footer>
</router-link>

</div>

</template>

<script>

export default {

  data: function() {
    return {
      title: "Logowanie",
      loggedin: false

    }
  },

  created() {
    this.$eventHub.$on('change-title', this.changeName);
    this.$eventHub.$on('loggedin-status', this.loggedinStatus);
    if(sessionStorage.getItem('auth_id')){
      this.loggedin = true;
    }
  },


  mounted() {
    this.route();
  },


  methods: {

    changeName(title) {
      // name will be automatically transported to the parameter.
      this.title = title;
    },

    loggedinStatus(status) {
      this.loggedin = status;
    },




    route() {
      if (this.$route.path === "/" && sessionStorage.getItem('auth_id') == null) {
        console.log("PATH IS LOGIN");
        this.$router.push('/login')
        this.title = "Logowanie"
      }


    },

    logout(){
      console.log("LOGOUT PRESSED!");
      sessionStorage.removeItem('auth_id');
      this.$eventHub.$emit('loggedin-status', false);
      this.$router.push('/login')


    }


  }


}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

body {
  margin: 0;
  font-family: Roboto;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
  height: 100vh;
}

#app{
  height: 100%;
}

.page-wrap{
  min-height: calc(100% - 132px);
}

form{
  overflow: auto;
  padding-bottom: 100px;
}

.content-box{
  overflow: auto;
  padding-bottom: 100px;
}

.site-footer{
  color: #a7a7a7;
  text-align: center;
  position: relative;
  height: 30px;
  margin-top: -30px;
  line-height: 30px;
  font-size: 15px;
  clear: both;
  text-decoration: none;
}

a{
  text-decoration: none;
}

.site-footer:link {
    text-decoration: none;
}

.site-footer:visited {
    text-decoration: none;
}

.site-footer:hover{
  color: #434A54;
}

::selection {
  background: #ffb7b7; /* WebKit/Blink Browsers */
}
::-moz-selection {
  background: #ffb7b7; /* Gecko Browsers */
}






.tooltip {
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 5px;
  padding: 5px 10px 4px;
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
}
.tooltip[x-placement^=top] {
  margin-bottom: 5px;
}
.tooltip[x-placement^=top] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}



.tooltip[aria-hidden=true] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden=false] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}


</style>



<style scoped>

i {
    border: solid #007AFF;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6px;
}


.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.back-button{
  position: relative;
  float: right;
  padding-right: 30px;
  margin-top: 22px;
  color: #007AFF;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  display: inline-table;
}

.nav {
  margin-top: 30px;
}

.nav ul {
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
}

.nav li {
  width: 178px;
  border-bottom: none;
  height: 29px;
  line-height: 30px;
  font-size: 12px;
  display: inline-block;
  margin-right: 0px;
  background-color: #ffff;
  border-style: solid;

  border-color: #EA4459;
  box-sizing: content-box;


}

.nav a {
  text-decoration: none;
  color: #EA445B;
  display: block;
  font-weight: 500;
}

.nav a.active {
  color: #ffff;
  cursor: default;
}

.title {
  height: 65px;
  border-bottom: solid 1px #EEEEEE;
}

.text {
  padding-left: 21px;
  font-size: 34px;
  font-weight: 700;
  display: inline-table;
  padding-top: 17px;
}

.logout {
  display: inline-table;
  float: right;
  line-height: 65px;
  padding-right: 22px;
}

.logoutBtn {
  background-color: #ffffff;
  color: #707070;
  padding: 5px 10px;

  /* line-height: 27px;
  padding: 0;
  width: 70px;
  height: 27px; */

  border: 1px solid #707070;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

li:first-child {
  border-width: 1px 0 1px 1px;
  border-radius: 5px 0 0 5px;
}


li:last-child {
  border-width: 1px 1px 1px 0;
  border-radius: 0 5px 5px 0;
}


li.router-link-exact-active {
  background-color: #EA445B;
}



.router-link-exact-active a {
  color: #ffffff;
}


li.active {
  background-color: #EA445B;
}

li.active a {
  color: #ffffff;
}


@media only screen and (max-width: 450px) {

  .nav {
    padding-left: 15px;
    padding-right: 15px;
  }

  .nav li {
    width: 49%;
  }






}
</style>
