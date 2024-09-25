<template>
  <div class="hello">
    <p></p>
    <h1>Restoran</h1>
    <p></p>
    <div class="proba">
      <img class="slika" alt="logo" src="../assets/restaurant.jpg"/>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: "HelloWorld", props: {
    msg: String
  }
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
  font-family: Arial, sans-serif;
  font-size: 48px;
  color: #d2691e; /* Chocolate brown color */
  text-align: center;
  margin-bottom: 20px;
}

.proba {
  width: 1200px;
}

.slika {
  width: 1300px;
  position: static;
}
</style>