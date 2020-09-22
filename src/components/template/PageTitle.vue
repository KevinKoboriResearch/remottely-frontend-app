<template>
  <div class="q-pa-none q-ma-none">
    <div class="row">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-overline">
            {{ sub }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </div>
    <div class="text-h3 q-mt-sm">
      <i
        v-if="icon"
        :class="icon"
      ></i> {{ main }}
    </div>
    <!-- <h1><i
        v-if="icon"
        :class="icon"
      ></i> {{ main }}</h1> -->
    <hr>
  </div>
  <!-- <div class="page-title">
    <div class="row q-pa-none q-ma-none">
      <h2>{{ sub }}</h2>
      <q-space />
      <q-btn
        label="Pesquisar Todos os Artigos"
        to="/devices"
      />
    </div>
    <h1><i
        v-if="icon"
        :class="icon"
      ></i> {{ main }}</h1>
    <hr>
  </div> -->
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'main', 'sub']
}
</script>

<style>
/* .page-title h1 {
  margin: 0px;
}

.page-title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
} */
</style>
