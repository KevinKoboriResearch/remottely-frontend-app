<template>
  <q-layout :view="user ? 'hHh LpR lFf' : 'hHh LpR lff'">
    <q-header
      v-if="!validatingToken"
      elevated
      class="selectDisable bg-black text-white"
      height-hint="98"
    >
      <q-toolbar>
        <!-- {{$store.state.user.isConnectedFacebook}} -->
        <q-btn
          v-if="user"
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />
        <!-- {{$store.state.leftDrawer.isMenuVisible}}
        {{$store.state.rightDrawer.isMenuVisible}} -->
        <q-toolbar-title class="q-pt-sm">
          <img
            v-if="!user"
            @click="$q.dark.toggle()"
            src="../assets/logo/your-design-trans-white.png"
            height="22"
          >
          <img
            v-if="user"
            @click="$q.dark.toggle()"
            src="../assets/logo/your.png"
            height="25"
            class
          >
        </q-toolbar-title>

        <UserDropdown v-if="user && !right" />

        <q-btn
          v-if="!user"
          dense
          flat
          icon="fa fa-user"
          to="auth"
        />
        <q-btn
          v-else
          dense
          flat
          size="12px"
          class="q-py-xs q-px-sm"
          icon="fa fa-user-cog"
          @click="right = !right"
        />
      </q-toolbar>

      <q-tabs v-if="!user">
        <q-space />
        <q-route-tab
          label="Início"
          to="/"
        />
        <q-route-tab
          label="Sobre"
          to="/about"
        />
        <q-route-tab
          label="Serviços"
          to="/services"
        />
        <q-route-tab
          label="Dúvidas"
          to="/doubts"
        />
      </q-tabs>
    </q-header>

    <!-- :show-if-above="!validatingToken" -->
    <q-drawer
      v-if="user"
      v-model="left"
      side="left"
      show-if-above
      elevated
      content-class="bg-white"
    >
      <LeftDrawerAdmin v-if="user.admin" />
      <LeftDrawer v-if="user && !user.admin" />
    </q-drawer>

    <q-drawer
      v-if="user"
      v-model="right"
      side="right"
      elevated
      show-if-above
      content-class="bg-white"
    >
      <RightDrawer v-if="user" />
    </q-drawer>

    <q-page-container>
      <Loading v-if="validatingToken" />
      <router-view
        class="q-py-md q-px-md"
        v-else
      />
    </q-page-container>

    <q-footer
      v-if="!validatingToken"
      elevated
      class="bg-deep-purple-8"
    >
      <q-toolbar>
        <img
          v-if="!user"
          src="../assets/logo/your.png"
          height="25"
          class
        >
        <q-toolbar-title v-if="!user">
          Your Projects
        </q-toolbar-title>
        <q-space />
        <q-tabs v-if="user">
          <q-space />
          <q-route-tab
            label="Início"
            to="/"
          />
          <q-route-tab
            label="Sobre"
            to="/about"
          />
          <q-route-tab
            label="Serviços"
            to="/services"
          />
          <q-route-tab
            label="Dúvidas"
            to="/doubts"
          />
        </q-tabs>
        <q-space v-if="user && !$q.screen.gt.xs" />
      </q-toolbar>
    </q-footer>

  </q-layout>
  <!-- <q-layout>
    <div id="q-app" :class="{'hide-menu': !isMenuVisible || !user}">
      <Header title="Cod3r - Base de Conhecimento"
        :hideToggle="!user"
        :hideUserDropdown="!user" />
      <leftDrawer v-if="user" />
      <Loading v-if="validatingToken" />
      <Content v-else />
      <Footer />
    </div>
  </q-layout> -->
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "../global"
import { mapState } from "vuex"
// import Header from "../components/template/Header"
// import Menu from "../components/template/Menu"
// import Content from "../components/template/Content"
// import Footer from "../components/template/Footer"
import Loading from "../components/template/Loading"
import LeftDrawer from "../components/template/LeftDrawer"
import LeftDrawerAdmin from "../components/template/LeftDrawerAdmin"
import RightDrawer from "../components/template/RightDrawer"
import UserDropdown from '../components/template/UserDropdown'
// import Btn from '../components/template/Btn'

export default {
  name: "App",
  components: {
    UserDropdown,
    // Btn,
    // Menu,
    // Content,
    // Footer,
    Loading,
    LeftDrawer,
    LeftDrawerAdmin,
    RightDrawer
  },
  data () {
    return {
      // left: false,
      // right: false,
      validatingToken: true
    }
  },
  computed: {
    right: {
      get () {
        return this.$store.state.rightDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('rightDrawer/toggleMenu', val)
      }
    },
    left: {
      get () {
        return this.$store.state.leftDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('leftDrawer/toggleMenu', val)
      }
    },
    // isMenuVisible: {
    //   get () {
    //     return this.$store.state.leftDrawer.isMenuVisible
    //   },
    //   set (val) {
    //     this.$store.commit('leftDrawer/toggleMenu', val)
    //   }
    // },
    user: {
      get () {
        return this.$store.state.user.user
      },
      set (val) {
        this.$store.commit('user/setUser', val)
      }
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
          this.$store.commit('leftDrawer/toggleMenu', false)
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
body::-webkit-scrollbar {
  width: 0px;
}

.selectDisable {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.drawer-bg {
  background-color: white;
}

/* * {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#q-app {
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
}

#q-app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
} */
</style>
