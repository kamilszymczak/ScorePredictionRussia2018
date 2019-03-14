<template>
<div class="content-box">

  <div class="loading-bar" v-if='loading'></div>

  <div class="table" v-if='!loading'>
    <table>
      <thead>
        <tr>
          <th width="70px">Miejsce</th>
          <th width="200px">Nazwa</th>
          <th width="35px">Pkt.</th>
        </tr>
      </thead>


      <template v-for="(result, index) in results">
  <tr v-on:click="userDetails(result, index)">
    <td>{{getPlace(index, result.points)}}</td>
    <td>{{result.username}}</td>
    <td>{{result.points}}</td>
    </tr>



<div v-bind:id="index" v-if="show[index]">
  <div class="modal">

    <div class="modal-content">

      <div class="heading-content">

        <!-- <div class="model-heading">Wyniki</div> -->
        <div class="close-button" v-on:click="closeModel()"></div>

<div class="table-heading">

        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="70px">Miejsce</th>
                <th width="200px">Nazwa</th>
                <th width="35px">Pkt.</th>
              </tr>
            </thead>
            <tr>
              <td>{{index}}</td>
              <td>{{results[index].username}}</td>
              <td>{{results[index].points}}</td>
            </tr>
          </table>

        </div>
  </div>
      </div>
      <!-- END OF heading-content -->

      <div class="loading-bar" v-if='cardLoading'></div>

      <div class="main-content" v-if="!cardLoading">

          <div class="card-heading">&nbsp;</div>
          <div class="card-heading">Faktycznie</div>

          <template v-for="(detail, index) in detailsCoutries">
              <div class="card">
                <div class="row">
                  <img v-bind:src="detail.one+ '.png'" v-tooltip="getTooltip(detail.one)">
                  <div class="score" :class="{'green' : details[currentIndex][index].userResult == detail.realResult  }">{{ details[currentIndex][index].userResult }}</div>
                  <img v-bind:src="detail.two+ '.png'" v-tooltip="getTooltip(detail.two)">
                </div>
              </div>

                <div class="real">
                  <div class="row">
                    <div class="score">{{ detail.realResult }}</div>
                  </div>
                </div>

          </template>


  </div>


</div>
<!-- END OF MODEL-CONENT -->

<div class="behind-modal"></div>

</div>
<!-- END OF MODEL -->

</div>
</template>


  </table>

  </div>



</div>

</template>


<script>
import axios from 'axios'

export default {
  name: 'app',

  data: function() {
    return {
      results: [],
      show: [],
      currentIndex: -1,
      details: [],
      detailsCoutries: [],
      loading: false,
      cardLoading: false
    }
  },

  created() {
    this.$eventHub.$emit('change-title', "Wyniki");
  },



  methods: {

    fetchResults: function() {
      this.loading = true;
      axios.get('http://192.168.1.73:8080/api/display.php').then((response) => {
        this.results = response.data
        this.fetchStaticDetails(); //After table fetches fetch static details
        this.loading = false;
      }, (error) => {
        console.log(error)
        this.loading = false;
      })
    },

    fetchDetails: function(username, index) {
      let params = new FormData();
      params.append('username', username);
      this.cardLoading = true;
      this.showModel(index);

      axios.post('http://192.168.1.73:8080/api/fetchTest.php', params).then((response) => {
        this.details[index] = response.data;
        //this.showModel(index);
        this.cardLoading = false;
      }, (error) => {
        console.log(error);
        this.cardLoading = false;
      })



    },

    fetchStaticDetails: function() {
      axios.get('http://192.168.1.73:8080/api/staticDetails.php').then((response) => {
        this.detailsCoutries = response.data
      }, (error) => {
        console.log(error)
      })
    },

    getPlace: function(index, points) {
      let prevPoints

      if (points == this.prevPoints) {
        return index
      } else {
        this.prevPoints = points;
        return index + 1
      }

    },

    getTooltip(country) {

      switch (country) {
        case "ARG":
          return 'Argentyna';
        case "AUS":
          return 'Australia';
        case "BEL":
          return 'Belgia';
        case "BRA":
          return 'Brazilia';
        case "COL":
          return 'Kolumbia';
        case "CRC":
          return 'Kostaryka';
        case "CRO":
          return 'Chorwacja';
        case "DEN":
          return 'Dania';
        case "EGY":
          return 'Egipt';
        case "ENG":
          return 'Anglia';
        case "ESP":
          return 'Hiszpania';
        case "FRA":
          return 'Francja';
        case "GER":
          return 'Niemcy';
        case "IRN":
          return 'Iran';
        case "ISL":
          return 'Islandia';
        case "JPN":
          return 'Japonia';
        case "KOR":
          return 'Korea Południowa';
        case "KSA":
          return 'Arabia Saudyjska';
        case "MAR":
          return 'Maroko';
        case "MEX":
          return 'Meksyk';
        case "NGA":
          return 'Nigeria';
        case "PAN":
          return 'Panama';
        case "PER":
          return 'Peru';
        case "POL":
          return 'Polska';
        case "POR":
          return 'Portugalia';
        case "RUS":
          return 'Rosja';
        case "SEN":
          return 'Senegal';
        case "SRB":
          return 'Serbia';
        case "SUI":
          return 'Szwajcaria';
        case "SWE":
          return 'Szwecja';
        case "TUN":
          return 'Tunezja';
        case "URU":
          return 'Urugwaj';
      }


    },

    userDetails: function(result, index) {

      this.currentIndex = index;

      if (!this.details[index]) {
        this.fetchDetails(result.username, index);
      } else {
        this.showModel(index);
      }


    },

    showModel: function(index) {

      this.$set(this.show, index, true);
      document.body.style.overflowY = 'hidden';

      // if(this.details[index]){
      //   this.$set(this.show, index, true);
      //   document.body.style.overflowY = 'hidden';
      //   //document.body.style.marginRight = '17px';
      // }


    },

    closeModel: function() {
      this.$set(this.show, this.currentIndex, false);
      document.body.style.overflowY = 'scroll';
      //document.body.style.marginRight = '0px';
    }

  },


  mounted: function() {
    this.fetchResults();
  }
}
</script>



<style scoped>
.content-box {
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

.modal-content .loading-bar {
  margin: 15px 0 0 0;
}


body {
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* ABOVE LINE TO HIDE SCROLLLBAR IN IE AND EDGE */
  overflow: -moz-scrollbars-none;
}

.table {
  margin-top: 40px;
  width: 100%;
}

table {
  text-align: center;
  border-collapse: collapse;
  width: 410px;
  margin: 0 auto;
}

td,
th {
  text-align: center;
  padding: 8px;
}

th {
  background-color: #EA445B;
  color: #ffffff;
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 500;
  text-align: center;
}

td {
  font-weight: 400;
  text-align: center;
  padding-top: 9px;
  padding-bottom: 9px;
}

th:nth-child(1) {
  border-radius: 5px 0px 0px 5px;
}

th:nth-last-child(1) {
  border-radius: 0px 5px 5px 0px;

}

tr:hover {
  color: #8B8B8B;
  cursor: pointer;
}















.modal {
  display: block;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.2);
}

.modal .modal-content {

  background-color: #fefefe;
  margin: 20px auto 25px auto;
  padding-bottom: 8px;
  width: 458px;
  min-height: 160px;
  border-radius: 5px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
}


.modal .modal-content .heading-content {
  background-color: #F5F7FA;
  border-radius: 5px 5px 0 0;
  height: 105px;
  width: 100%;
  display: inline-block;
  position: relative;
}

.modal .modal-content .heading-content .table-heading {
  background-color: orange;
  background-color: #EA445B;
  height: 63px;
  width: 100%;
  display: inline-block;
  position: relative;
  border-radius: 5px 5px 0 0;
}

.heading-content .model-heading {
  position: absolute;
  float: left;
  z-index: 999;
  color: #ffffff;
  font-size: 21px;
  font-weight: 500;
  padding-left: 10px;
  padding-top: 6px;
}

.heading-content .close-button {
  position: absolute;
  right: 0;
  width: 23px;
  height: 23px;
  cursor: pointer;
  float: right;
  z-index: 999;
  padding-top: 8px;
  padding-right: 8px;
}


.close-button:hover {
  opacity: 1;
}

.close-button:before,
.close-button:after {
  position: absolute;
  left: 9px;
  content: ' ';
  height: 23px;
  width: 4px;
  background-color: #ffffff;
  border-radius: 10px;
}

.close-button:before {
  transform: rotate(45deg);
}

.close-button:after {
  transform: rotate(-45deg);
}


.modal .modal-content .heading-content .table {
  margin-top: 26px;
}

.modal tr {
  color: #434A54;
}

.modal td {
  padding-top: 12px;
  line-height: 26px;
}

.main-content {
  display: inline-block;
}


.main-content .card-heading {
  font-weight: 500;
  padding-bottom: 4px;
  float: left;
  text-align: center;
  padding: 8px 0 4px 0;
}

.main-content .card-heading:nth-child(1) {
  width: 68%;
}

.main-content .card-heading:nth-child(2) {
  width: 32%;
}

.main-content .row img {
  image-rendering: -moz-crisp-edges;
  width: 58px;
  float: left;
}

.main-content .real {
  float: right;
  /* height: 58px; */
}


.main-content img:first-child {
  margin-left: 28px;
  float: left;

}

.main-content img:last-child {
  margin-right: 28px;
  float: right;
}

.main-content .row .score {
  border-radius: 5px;
  color: #434A54;
  background-color: #F5F7FA;
  font-weight: 500;
  display: inline-block;
  margin: 0 auto;
  margin-top: 13px;
  font-size: 18px;
  line-height: 33px;
  height: 32px;
  width: 80px;
}

.main-content .real {
  float: left;
  width: 32%;
}

.main-content .real .score {
  margin: 0 11px;
  margin-top: 13px;

}

.main-content .row {
  line-height: 25px;
  float: left;
  width: 100%;
  text-align: center;
}


.main-content .card {
  width: 68%;
  float: left;
  border-right: 1px solid #EEEEEE;
  box-sizing: border-box;
}







.green {
  background-color: #88D875 !important;
  color: #ffffff !important;
}

@media only screen and (max-width: 458px) {
  table {
    width: 94%;

  }

  /* .modal{
  height: 180%;
} */
  .behind-modal {
    width: 100%;
    height: 180%;
    position: fixed;
    background-color: #ffffff;
  }

  .modal .modal-content {
    box-shadow: none;
    width: 100%;
    /* height: calc(100% - 8px); */
    margin: 0;
  }

  .main-content img:first-child {
    margin-left: 14px;
  }

  .main-content img:last-child {
    margin-right: 14px;
  }

  .main-content .row img {
    /* width: 58px; */
    width: 48px;
  }

  .main-content .row .score {
    margin-top: 8px;
  }


}


@media only screen and (max-width: 330px) {

  .main-content img:first-child {
    margin-left: 4%;
  }

  .main-content img:last-child {
    margin-right: 4%;
  }



}
</style>
