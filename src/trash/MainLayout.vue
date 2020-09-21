<template>
  <q-layout view="lHh Lpr lFf"
>
    <!-- :class="{'hide-menu': !isMenuVisible || !user}" -->
  <!-- <Header title="Your Teams - For Now, Forever"
    :hideToggle="!user"
    :hideUserDropdown="!user" /> -->
  <!-- <Menu v-if="user" /> -->
  <!-- <Loading v-if="validatingToken" /> -->
  <!-- <Content v-else /> -->
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
<!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above :width="250">
        <leftDrawer />
      </q-drawer>
    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <!-- <Loading v-if="validatingToken" /> -->
      <router-view />
    </q-page-container>
    <!-- <q-footer v-if="user" >

    </q-footer> -->
  </q-layout>
</template>

<script>
// export default {
//   name: 'MainLayout',
//   components: { EssentialLink },
//   data () {
//     return {
//       leftDrawerOpen: false,
//       essentialLinks: linksData
//     }
//   }
// }
import leftDrawer from '../components/template/leftDrawer'
import axios from 'axios'
import { baseApiUrl, userKey } from '../global'
import { mapState } from 'vuex'
// import Header from './components/template/Header'
// import Menu from './components/template/Menu'
// import Content from './components/template/Content'
// import Footer from './components/template/Footer'
// import Loading from '../components/template/Loading'

export default {
  name: 'MainLayout',
  components: {
    leftDrawer
    // Header
    // Menu,
    // Content,
    // Footer,
    // Loading
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
      leftDrawerOpen: false,
      validatingToken: true
    }
  }
  // methods: {
  //   async validateToken () {
  //     this.validatingToken = true

  //     const json = localStorage.getItem(userKey)
  //     const userData = JSON.parse(json)
  //     this.$store.commit('user/setUser', null)

  //     if (!userData) {
  //       this.validatingToken = false
  //       this.$router.routes.push({ name: 'auth' })
  //       return
  //     }

  //     const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

  //     if (res.data) {
  //       this.$store.commit('user/setUser', userData)

  //       // if (this.$mq === 'xs' || this.$mq === 'sm') {
  //       //   this.$store.commit('leftDrawer/toggleMenu', false)
  //       // }
  //     } else {
  //       localStorage.removeItem(userKey)
  //       this.$router.routes.push({ name: 'auth' })
  //     }

  //     this.validatingToken = false
  //   }
  // },
  // created () {
  //   this.validateToken()
  // }
}
</script>
