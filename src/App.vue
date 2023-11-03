<script setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <img src="./assets/rira.svg" alt="Rira" width="100" /><br />
  <h1>Hi, link to task pages:</h1>
  <router-link to="/one"><b>Go to task one</b></router-link> -----
  <router-link to="/two"><b>Go to task two</b></router-link>

  <ModalsContainer />
  <router-view></router-view>
</template>

<style scoped>
hr {
  border-color: #000;
  margin: 4rem 0 2rem;
}
a {
  font-size: 2rem;
}
</style>
