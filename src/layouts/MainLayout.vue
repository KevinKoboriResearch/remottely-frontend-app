<template>
  <q-layout
    class="selectDisable"
    :view="user ? 'lHr LpR lFf' : 'hHh LpR lff'"
    :style="$q.dark.isActive ? 'background: black;' : ''"
  >
    <!-- :style="$q.dark.isActive ? 'background:linear-gradient( 180deg, #212121 0%, #00ff99 100%)' : 'background:linear-gradient( 180deg, #00ff99 0%, #212121 100%)'" -->
    <!-- :style="$q.dark.isActive ? 'background:white' : 'background:black'" -->
    <!-- c1f4ff -->
    <!-- 16434d -->
    <q-header
      v-if="!validatingToken"
      height-hint="98"
      class="selectDisable text-white"
      style="background-color: #000000"
    >
      <q-toolbar v-scrollanimation>
        <q-btn
          v-if="user"
          square
          dense
          flat
          icon="menu"
          @click="left = !left"
        >
          <q-tooltip v-if="$q.screen.gt.xs">CATEGORIAS</q-tooltip>
        </q-btn>

        <q-space />

        <div @click="!user ? $router.push('/') : $router.push('/user/user-map-marker')">
          <img
            style="margin-top: 8px;"
            class="q-px-sm"
            src="../assets/logo/remottely.png"
            height="22"
          >
        </div>

        <!-- <q-tooltip v-if="$q.screen.gt.xs">theme</q-tooltip> -->
        <q-space />

        <!-- <q-space v-if="!user && $q.screen.lt.sm" /> -->

        <!-- <q-space /> -->
        <!-- color="secondary" -->
        <!-- v-if="user.role == 'adminApp'" -->
        <!-- <UserDropdown v-scrollanimation /> -->
        <!-- <q-btn
          else
          flat
          to="/user/profile"
          icon-right="mdi-account"
        /> -->
        <!-- :label="user.name" -->

        <!-- <q-btn
          v-if="!user"
          dense
          flat
          icon="fa fa-user"
          to="auth"
        /> -->

        <q-btn
          v-scrollanimation
          :size="right ? '17px' : '10px'"
          v-if="user"
          dense
          flat
          :padding="right ? 'none' : ''"
          :class="right ? '' : 'q-pa-xs'"
          :icon="right ? 'mdi-close' : 'fa fa-user-cog'"
          @click="right = !right"
        >
          <q-tooltip v-if="$q.screen.gt.xs">USER</q-tooltip>
        </q-btn>
        <!-- <q-btn
          v-if="user"
          square
          dense
          flat
          icon="menu"
          @click="right = !right"
        >
          <q-tooltip v-if="$q.screen.gt.xs">menu</q-tooltip>
        </q-btn> -->
        <!-- <q-btn
          v-if="user"
          round
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-adjust"
          size="sm"
          flat
          dense
          @click="$q.dark.toggle()"
        /> -->
      </q-toolbar>

      <q-tabs
        v-scrollanimation
        v-if="!user && $route.fullPath != '/auth'"
      >
        <q-space v-if="$q.screen.gt.xs" />
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
        <!-- <q-route-tab
          label="Dúvidas"
          to="/doubts"
        /> -->
        <!-- icon="account" -->
        <q-route-tab
          label="Login"
          to="/auth"
        />

      </q-tabs>
    </q-header>

    <!-- show-if-above -->
    <q-drawer
      v-if="!validatingToken && user"
      :show-if-above="$route.fullPath != '/auth'"
      v-model="left"
      side="left"
      content-class="bg-white"
    >
      <LeftDrawerUser />
      <!-- <LeftDrawerUser v-if="user.role == 'tester'" /> -->
      <!-- v-if="user.role == 'tester'" -->
      <!-- <LeftDrawerAdminLocal v-if="user.role == 'adminLocal'" /> -->
      <!-- <LeftDrawerAdmin v-else-if="user.role == 'adminApp'" /> -->
      <!-- <LeftDrawer v-else-if="user.role == 'viewer'" /> -->
    </q-drawer>

    <q-drawer
      v-if="!validatingToken && user"
      v-model="right"
      side="right"
      content-class="bg-white"
    >
      <RightDrawer v-if="user" />
    </q-drawer>

    <q-page-container>
      <Loading
        v-scrollanimation
        v-if="validatingToken"
      />
      <div v-else>
        <!-- {{user}} -->
        <router-view
          v-scrollanimation
          class="q-pa-md"
        />
      </div>
    </q-page-container>
    <whatsapp v-if="$route.fullPath != '/auth'" />

    <q-footer
      v-if="!validatingToken && user"
      class="selectDisable bg-black text-white"
    >
      <q-tabs v-scrollanimation>
        <q-space v-if="$q.screen.gt.xs" />
        <q-route-tab
          label="Vinculos"
          to="/connections"
        />
        <q-route-tab
          label="Dashboard"
          to="/dashboard"
        />
        <!-- <a href="http://localhost:8081/#/">
        <q-route-tab
          label="site"
        >
        </q-route-tab>
        </a> -->
        <q-route-tab
          label="Devices"
          to="/user/devices"
        />
        <q-route-tab
          label="perfil"
          to="/user/profile"
        />
      </q-tabs>
      <!-- <q-tabs
        v-scrollanimation
        v-if="!user && $route.fullPath == '/auth'"
      >
        <q-space v-if="$q.screen.gt.xs" />
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
          label="Login"
          to="/auth"
        />

      </q-tabs> -->
    </q-footer>

  </q-layout>
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
// import LeftDrawer from "../components/template/LeftDrawer"
import LeftDrawerAdmin from "../components/template/LeftDrawerAdmin"
import LeftDrawerUser from "../components/template/LeftDrawerUser"
import RightDrawer from "../components/template/RightDrawer"
import UserDropdown from '../components/template/UserDropdown'
import whatsapp from '../components/whatsapp/Dynamicwhatsapp'
// import Btn from '../components/template/Btn'

export default {
  name: "MainLayout",
  components: {
    UserDropdown,
    // Btn,
    // Menu,
    // Content,
    // Footer,
    Loading,
    // LeftDrawer,
    LeftDrawerUser,
    LeftDrawerAdmin,
    RightDrawer,
    whatsapp
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
      this.user = null
      // this.$store.commit('user/setUser', null)

      if (!userData) {
        this.validatingToken = false
        // this.$router.push({ name: 'auth' })
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
    // console.log(this.user)
  }
}
</script>

<style scoped>
.before-enter {
  opacity: 0;
  filter: blur(5px);
  transition: all 1s ease-out;
}

.enter {
  opacity: 1;
  filter: blur(0px);
}
</style>

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

/* .drawer-bg {
  background-color: white;
} */
</style>
