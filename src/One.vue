<script setup>
import UserList from "./components/MyList.vue";
import PostList from "./components/MyList.vue";
</script>

<template>
  <UserList api="https://jsonplaceholder.typicode.com/users"
            search-api="https://jsonplaceholder.typicode.com/users?name_like="
            :headers="['name', 'username', 'email', 'phone', 'website']"
            title="Users" />

  <hr />

  <PostList api="https://jsonplaceholder.typicode.com/posts"
            search-api="https://jsonplaceholder.typicode.com/posts?title_like="
            :headers="['title', 'body']"
            title="Posts"
            :perPage="10" />
</template>

<style scoped>
hr {
  border-color: #000;
  margin: 4rem 0 2rem;
}
</style>
