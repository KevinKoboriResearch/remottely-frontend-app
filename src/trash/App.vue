<template>
<div id="q-app"
>
  <!-- :class="{'hide-menu': !isMenuVisible || !user}" -->
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above :width="250">
      <!-- <leftDrawer /> -->
    </q-drawer>
    <!-- <q-page-container> -->
  <Header title="Your Teams - For Now, Forever"
    :hideToggle="!user"
    :hideUserDropdown="!user" />
  <!-- <Menu v-if="user" /> -->
  <!-- <Loading v-if="validatingToken" /> -->
  <!-- <Content v-else /> -->
  <router-view />
    <!-- </q-page-container> -->
  <Footer />
</q-layout>
</div>
  <!-- <router-view />
</div> -->
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from './global'
import { mapState } from 'vuex'
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
// import Loading from './components/template/Loading'
// import leftDrawer from './components/template/leftDrawer'

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Content,
    Footer
    // Loading,
    // leftDrawer
  },
  computed: {
    isMenuVisible: {
      get () {
        return this.$store.state.leftDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('leftDrawer/isMenuVisible', val)
      }
    },
    user: {
      get () {
        return this.$store.state.user.user
      },
      set (val) {
        this.$store.commit('user/setUser', val)
      }
    }
  },
  data () {
    return {
      validatingToken: true,
      leftDrawerOpen: false
    }
  },
  methods: {
    async validateToken () {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('user/setUser', null)

      if (!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if (res.data) {
        this.$store.commit('user/setUser', userData)

        if (this.$mq === 'xs' || this.$mq === 'sm') {
          this.$store.commit('toggleMenu', false)
        }
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    }
  },
  created () {
    this.validateToken()
  }
}
</script>

<style>
/* * {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
} */

/* #q-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
} */

/* #q-app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
} */
</style>
