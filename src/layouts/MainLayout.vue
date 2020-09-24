<template>
  <q-layout
    class="selectDisable"
    view="lHr LpR lFf"
    :style="$q.dark.isActive ? 'background: black;' : ''"
  >
    <q-header
      v-if="!validatingToken"
      height-hint="98"
      style="background-color: #000000"
    >
      <q-toolbar v-scrollanimation>
        <q-btn
          square
          dense
          flat
          icon="menu"
          @click="left = !left"
        >
          <q-tooltip v-if="$q.screen.gt.xs">CATEGORIAS</q-tooltip>
        </q-btn>

        <q-space />

        <div @click="$router.push('/user/maps')">
          <img
            style="margin-top: 8px;"
            class="q-px-sm"
            src="../assets/logo/remottely-dark.png"
            height="22"
          >
        </div>

        <q-space />

        <q-btn
          v-scrollanimation
          :size="right ? '17px' : '10px'"
          dense
          flat
          :padding="right ? 'none' : ''"
          :class="right ? '' : 'q-pa-xs'"
          :icon="right ? 'mdi-close' : 'fa fa-user-cog'"
          @click="right = !right"
        >
          <q-tooltip v-if="$q.screen.gt.xs">USER</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!validatingToken"
      :show-if-above="$route.fullPath != '/auth'"
      v-model="left"
      side="left"
    >
      <!-- content-class="q-pa-md bg-grey-10" -->
      <LeftDrawerUser />
      <!-- <LeftDrawerAdmin v-else-if="user.role == 'manager'" /> -->
      <!-- <LeftDrawerAdmin v-else-if="user.role == 'admin'" /> -->
    </q-drawer>

    <q-drawer
      v-if="!validatingToken"
      v-model="right"
      side="right"
    >
      <!-- content-class="bg-white" -->
      <RightDrawer />
    </q-drawer>

    <q-page-container>
      <Loading
        v-scrollanimation
        v-if="validatingToken"
      />
      <div v-else>
        <router-view
          v-scrollanimation
          class="q-pa-md"
        />
      </div>
    </q-page-container>

    <q-footer
      v-if="!validatingToken"
      class="bg-black text-white"
    >
      <q-tabs v-scrollanimation>
        <q-space v-if="$q.screen.gt.xs" />
        <q-route-tab
          label="Chaves"
          to="/user/devices"
        />
        <q-route-tab
          label="Eventos"
          to="/user/events"
        />
      </q-tabs>
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
// import whatsapp from '../components/whatsapp/Dynamicwhatsapp'
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
    RightDrawer
    // whatsapp
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
