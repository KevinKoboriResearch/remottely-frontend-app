<template>
  <div class="home">

  </div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'
import Stat from './Stat'
// import axios from 'axios'
// import { baseApiUrl } from '@/global'

export default {
  name: 'Home',
  components: { PageTitle, Stat },
  data: function () {
    return {
      stat: {}
    }
  },
  methods: {
    getStats () {
      // axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    }
  },
  mounted () {
    this.getStats()
  }
}
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
