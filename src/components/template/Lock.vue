<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-btn-toggle
        v-model="model"
        spread
        no-caps
        toggle-color="primary"
        color="white"
        text-color="black"
        style="width:100%;"
        :options="options"
      />
      <q-btn-toggle
        v-model="model"
        spread
        no-caps
        toggle-color="primary"
        color="white"
        text-color="black"
        :options="options"
      />

      <!-- class="my-custom-toggle" -->
      <q-btn-toggle
        v-model="secondModel"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="primary text-black"
        color="black"
        text-color="primary"
        :options="[
          {label: 'Option 1', value: 'one'},
          {label: 'Option 2', value: 'two'}
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      model: 'one',
      secondModel: 'one',
      options: [
        { label: 'Option 1', value: 'one' },
        { label: 'Option 2', value: 'two' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
