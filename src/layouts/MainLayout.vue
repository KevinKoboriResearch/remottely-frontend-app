<template>
  <q-layout
    class="selectDisable"
    view="lHr LpR lFf"
    :style="$q.dark.isActive ? 'background: black;' : ''"
  >
    <!-- <div> -->
    <header id="header">
      <nav class="nav">
        <button
          class="toggle-menu"
          onclick="document.querySelector('.toggle-menu').classList.toggle('active');
          document.querySelector('#menu').classList.toggle('open');"
        >
          <span></span>
        </button>
      </nav>
    </header>

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

    <div
      id="menu"
      class=""
    >
      <nav class="main-nav">
        <ul>
          <li>
            <a href="#">
              About
            </a>
          </li>
          <li>
            <a href="#">
              Pricing
            </a>
          </li>

          <li>
            <a href="#">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <footer class="menu-footer">
        <nav class="footer-nav">
          <ul>
            <li>
              <a href="#">
                <i class="fa fa-twitter fa-fw"></i>
                Twitter
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-envelope fa-fw"></i>
                Subscribe
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
    <!-- </div> -->
  </q-layout>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "../global"
import { mapState } from "vuex"
import Loading from "../components/template/Loading"
import LeftDrawerAdmin from "../components/template/LeftDrawerAdmin"
import LeftDrawerUser from "../components/template/LeftDrawerUser"
import Menu from "../components/template/Menu"
import RightDrawer from "../components/template/RightDrawer"
import UserDropdown from '../components/template/UserDropdown'

export default {
  name: "MainLayout",
  components: {
    UserDropdown,
    Menu,
    Loading,
    LeftDrawerUser,
    LeftDrawerAdmin,
    RightDrawer
  },
  data () {
    return {
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
      // this.user = null
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
