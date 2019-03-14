<template>

<div class="faq-container">

<div class="help-row">
  <div class="help-q">Witaj! Fajnie że tu trafiłeś</div>
  <div class="help-a">Tutaj możesz wytypować każdy mecz w Mistrzostwach Świata Piłki Nożnej 2018. Zarejestruj lub zaloguj się i zacznij typować mecze
    <p>Wynik meczu można wytypować najpóźniej na godzinę przed rozpoczęciem</p></div>
</div>


<div class="help-row">
  <div class="help-q">Jak działa punktacja?</div>
  <div class="help-a">Za każdy poprawnie wytypowany mecz dostaniesz 3 pkt.<br>Za iwylączne wytypowanie zwycięzcy dostaniesz 1 pkt.</div>
</div>


<div class="help-row">
  <div class="help-q">Do kiedy mogę wytypować mecz?</div>
  <div class="help-a">Mecz można wytypować do 30 minut przed rozpoczeciem</div>
</div>

<div class="help-row">
  <div class="help-q">Czy moge zmienić swoje typy?</div>
  <div class="help-a">Oczywiscie, zmień wynik i klikni zatwierć</div>
</div>

<div class="help-row">
  <div class="help-q">Nie ma meczu xxx-xxx, dlaczego?</div>
  <div class="help-a">Mecz jest dostępny do wytypowania około 48 godzin przed rozpoczęciem</div>
</div>

<div class="help-row">
  <div class="help-q">W wynikach nie ma meczu xxx-xxx?</div>
  <div class="help-a">Mecz pojawi się w wynikach po zakonczeniu meczu, jezeli go tam nie ma sprawdz za chwilę czytaj. jeszcze nie wprowadziłem wyniku do systemu :P</div>
</div>

</div>


</template>

<script>

export default {
  name: 'app',

  created() {
    this.$eventHub.$emit('change-title', "Pomoc");
  }

}

</script>


<style>


.faq-container{
  padding-top: 40px;
  max-width: 425px;
  margin: 0 auto;
}

.help-row{
  padding-bottom: 25px;
  padding: 0 10px 25px 10px;
}

.help-q{
  font-weight: 500;
  color: #EA445B;
  padding-bottom: 10px;
  letter-spacing: 0.3px;
}

.help-a{
  font-weight: 400;
  color: #424242;
}

.help-a > p {
  margin: 14px 0 0 0;
}


</style>
