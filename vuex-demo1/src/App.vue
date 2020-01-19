<template>
  <div id="app">
   {{count}}<br />
   <button @click="$store.commit('increment',1)">count++</button>

  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>


