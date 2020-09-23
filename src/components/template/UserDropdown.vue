<template>
  <div class="q-mr-sm">
    <!-- dropdown-icon="fa fa-sort-amount-down-alt" -->
    <q-btn-dropdown
      @mouseover.native="menuOver = true"
      @mouseout.native="menuOver = false"
      v-model="menu"
      auto-close
      :label="user.name.length > 12 ? user.name.substring(0,10) + '...' : user.name"
      size="14px"
      dropdown-icon="mdi-menu-down"
      style="background-color: #ffffff11;"
      :content-style="{ backgroundColor: '#000000dd' }"
      color="transparent"
      toggle-color="yellow"
    >
      <q-list
        class="text-white q-mt-sm"
        @mouseover.native="listOver = true"
        @mouseout.native="listOver = false"
      >
        <q-item
          to="/admin"
          v-if="user.role == 'adminApp'"
        >
          <q-item-section>
            <q-item-label>Admin Pages</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/user/profile">
          <q-item-section>
            <q-item-label>Meu Perfil</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item to="/user/categories">
          <q-item-section>
            <q-item-label>Minhas categorias</q-item-label>
          </q-item-section>
        </q-item> -->
        <q-item to="/user/devices">
          <q-item-section>
            <q-item-label>Meus Dispositivos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          @click.prevent="logout()"
          clickable
        >
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { debounce } from 'quasar'
import { userKey } from '../../global'
// import Gravatar from 'vue-gravatar'

export default {
  name: 'UserDropDown',
  // components: { Gravatar },
  data () {
    return {
      menu: false,
      menuOver: false,
      listOver: false
    }
  },
  computed: {
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
    logout () {
      localStorage.removeItem(userKey)
      this.$store.commit('rightDrawer/toggleMenu', false)
      this.$store.commit('user/setUser', null)
      this.$store.commit('user/setFacebookUser', false)
      this.$router.push({ name: 'auth' })
    },
    debounceFunc: debounce(function () { this.checkMenu() }, 0),
    onItemClick () {
      console.log('Clicked on an Item')
    },
    checkMenu () {
      if (this.menuOver || this.listOver) {
        this.menu = true
      } else {
        this.menu = false
      }
    }
  },
  watch: {
    menuOver (val) {
      this.debounceFunc()
    },
    listOver (val) {
      this.debounceFunc()
    }
  }
}
</script>

<style>
</style>
