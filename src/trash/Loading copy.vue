<template>
  <div class="parent">
    <img class="child" src="../../assets/red.gif" alt="Loading">
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
/* .loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .loading{
  display: flex;
  justify-content: center;
  align-items: center;
} */
.parent{
  background-color: rgb(0, 0, 0);
  display: flex;
  min-height: 82vh;
}
.child{
  margin: auto;
}

/* .parent{
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100vw;
}
.child{
  justify-self: center;
  align-self: center;
} */
</style>
