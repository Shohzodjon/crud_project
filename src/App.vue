<script>
import TodoCardVue from './components/TodoCard.vue'
import { RouterView } from 'vue-router'
export default {
  components: {
    TodoCardVue
  }
}
</script>

<template>
  <section>
    <div class="container">
      <todo-card-vue />
    </div>
  </section>
</template>
<style scoped></style>
