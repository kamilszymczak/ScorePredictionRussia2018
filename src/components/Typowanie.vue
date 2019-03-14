<template>

  <div class="content-box">

  <div class="noMatches" v-if='noMatches'>W tej chwili nie ma meczy do typowania<br>Sprawdź ponownie pózniej</div>
  <div class="loading-bar" v-if='loading'></div>

  <div class="typoForm">

    <div class="alert" v-bind:class="{ 'alert-success': this.isSuccessful }" v-if="displayAlert" v-on:click="displayAlert = false">
      <div class="alertMsg">{{ alertMsg }}</div>
    </div>

    <div v-for="result in results" class="eachForm">

    <div class="typoTitle">{{result.date}}</div>

    <div class="typo">

      <div class="typoHalf">

        <div class="flag_country">
          <div class="flag"><img v-bind:src="getPic(result.one)" v-bind:alt="result.one" ></div>
          <div class="countryName">{{result.one}}</div>
        </div>

        <input type="number" v-model="result['input1']" class="inputBox" name="login" autocomplete="off" maxlength="2" v-on:keypress="isNumber()">

      </div>


      <div class="typoHalf">

        <div class="flag_country">
          <div class="flag"><img v-bind:src="getPic(result.two)" v-bind:alt="result.one" ></div>
          <div class="countryName">{{result.two}}</div>
        </div>

        <input type="number" v-model="result['input2']" class="inputBox" name="login" autocomplete="off" maxlength="2" v-on:keypress="isNumber()">

      </div>

    <input class="submit-button" v-on:click="insert(result['input1'], result['input2'], result.one, result.two)" type="submit" value="Zatwierdź" />

    </div>



</div>

  </div>


</div>

</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      results: [],
      result: [],
      displayAlert: false,
      alertMsg: '',
      isSuccessful: false,
      loading: false,
      noMatches: false
    }
  },

  created(){
    console.log("Page is Typowanie!");
    this.$eventHub.$emit('change-title', "Typowanie");
  },


  methods: {

    Alert: function(message, success) {
      this.isSuccessful = success;
      this.alertMsg = message;
      this.displayAlert = true;
      var self = this;
      setTimeout(function() {
        self.displayAlert = false;
      }, 4500);

    },

    getPic(res) {
      return res + '.png';
    },


    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
      } else {
        return true;
      }
    },

    insert: function(input1, input2, country1, country2) {

      var inputArray = new Array();
      inputArray[0] = input1;
      inputArray[1] = input2;
      var input = (inputArray.join(' - '));

      var countryArray = new Array();
      countryArray[0] = country1;
      countryArray[1] = country2;
      var country = (countryArray.join('-'));

      let params = new FormData();
      params.append('input', input );
      params.append('country', country );
      params.append('auth_id', sessionStorage.getItem("auth_id"));

      if(input1 >= 0 && input2 >= 0){

      axios.post('http://192.168.1.73:8080/api/insert.php', params)
        .then(response => {
          console.log(response);

          if (response.status === 200) {
            this.Alert("Typ zapisany poprawnie", true);
          }
          if (response.status === 204) {
            this.Alert("Błąd. Spróbuj ponownie", false);
          }
          if (response.status === 205) {
            this.Alert("Za pózno. Mecz prawdopodobnie za mniej niz 30 minut", false);
          }

        })
        .catch(function (error) {
          console.log(error);
          console.log("DB NOT UP!");
        });

      } else {
        this.Alert("Sprawdź wynik i spróbuj jeszcze raz", false);
      }



    },

    fetchResults: function () {
      this.loading = true;
      axios.get('http://192.168.1.73:8080/api/typowaniePanel.php').then((response) => {
        this.results = response.data,
        console.log(response);
        this.loading = false;
        if (response.status === 205) {
          console.log("NO MATCHES CURRENTLY");
          this.noMatches = true;
        }
      }, (error) => {
        console.log(error);
        this.loading = false;
      })
    }

  },

  mounted: function () {
    if(sessionStorage.getItem("auth_id")){
      this.fetchResults();
    }

  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.noMatches{
  font-weight: 500;
  font-size: 20px;
  color: #EA445B;
  padding-top: 40px;
}

.content-box{
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-bar {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 4px solid #ea445b;
  border-top-color: #ffffff;
  animation: spin 1s infinite linear;
  margin: 40px 0 0 0;
  display: inline-block;
}



.alert-success{
  background-color: #26B15E !important;

}

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
  margin-top: -156px;
  border-radius: 10px;
  z-index: 199;
}


.eachForm{
  margin-bottom: 30px;
  /* box-shadow: 0 0px 50px -2px rgba(27, 33, 58, .4); */

  box-shadow: 0 2px 43px -4px rgba(0,0,0,.19);
  border-radius: 5px;
}

.typoTitle {
  background-color: #F5F7FA;
  height: 40px;
  width: 554px;
  line-height: 43px;
  color: #434A54;
  font-weight: 500;
  letter-spacing: 0.6px;
  border-radius: 5px 5px 0 0;
}

.typo {
  height: 140px;
  width: 554px;
  background-color: #ffffff;
  border-radius: 0px 0px 5px 5px;
  box-sizing: border-box;
}



.flag_country{
  float: left;
  width: 213px;
  padding-top: 7px;
}

.typoHalf {
  width: 50%;
  height: 89px;
  display: block;
  float: left;
  border-bottom: 1px solid #F7F7F7;
}

.flag {
  height: 52px
}

.flag img {
  width: 50px;
}

.countryName{
  font-weight: 400;
}

.typoForm {
  text-align: center;
  width: 554px;
  margin: 0 auto;
  margin-top: 30px;
}

input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.typoForm input[type="number"] {
  height: 40px;
  width: 40px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #E5E5E5;
  color: #434A54;
  outline: none;
  margin-top: 23px;
  float: right;
  font-size: 26px;
}

.typoForm input[type="text"]:focus {
  border-color: #A1A1A1;

}

.typoForm input[type="submit"] {
  margin-top: 9px;
  width: 140px;
  height: 32px;
  background-color: #FFDE55;
  color: #2B292A;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.typoForm .submit-button:disabled {
  background-color: #BBBBBB;
  cursor: default;
}

.typoHalf:nth-child(2) .flag_country{
  float: right;
}

.typoHalf:nth-child(1) input{
  margin-right: 20px;
}

.typoHalf:nth-child(2) input{
  float: left;
  margin-left: 20px;
}


@media only screen and (max-width: 650px) {

  .typoForm {
    width: 100%;
  }

  .eachForm {
    margin-left: 10px;
    margin-right: 10px;
  }

  .typoTitle{
    width: 100%;
  }

  .typo{
    width: 100%;
  }

.flag_country {
    width: calc(100% - 62px);
}

}

@media only screen and (min-width: 650px) {
  .flag img {
    width: 52px;
  }


}




</style>
