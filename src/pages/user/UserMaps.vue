<template>
  <q-page class="q-pa-sm">
    <div
      id="myMap"
      style="height: 85vh;"
    ></div>
  </q-page>
</template>

<script>
export default {
  name: "UserMaps",
  data () {
    return {
      mapData: ''
    }
  },
  mounted () {
    this.initMap();
  },
  methods: {
    initMap () {
      var myLatLng = { lat: -15.854374, lng: -47.859815 };

      this.mapData = new google.maps.Map(document.getElementById('myMap'), {
        center: myLatLng,
        zoom: 17
      })

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.mapData,
        title: 'Hello World!'
      });
    }
  }
}
</script>

<style scoped>
</style>
