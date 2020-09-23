<template>
  <div>
    <!-- SÓ O ADMIN PODE ABRIR -->
    <!-- <q-toggle
      toggle-indeterminate
      v-model="deviceState"
      checked-icon="fas fa-lock"
      indeterminate-icon="mdi-account-lock bg-red text-white rounded-borders"
      unchecked-icon="fas fa-unlock"
      color="red"
      size="xl"
      dense
      :keep-color="true"
      style="border-radius: 50px; background: red;"
    /> -->
    <!-- indeterminate-icon="mdi-account-lock bg-red text-white rounded-borders" -->
    <!-- toggle-indeterminate -->
    <q-btn
      color="secondary"
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'fas fa-moon' : 'fas fa-sun'"
    />
    <q-btn
      color="primary text-black"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
    />
    <q-toggle
      v-model="deviceState"
      checked-icon="fas fa-lock"
      unchecked-icon="fas fa-unlock"
      color="red"
      size="xl"
      dense
    />
    <q-toggle
      v-model="deviceStateAdmin"
      checked-icon="fas fa-user-lock"
      unchecked-icon="fas fa-user"
      color="red"
      size="xl"
      dense
    />
    <!-- dark -->
    <!-- style="border-radius: 50px; background: red;" -->
    <!-- :keep-color="true" -->
    {{deviceState}}
    <!-- label="oi" -->
    <!-- disable -->
    <!-- class="text-black" -->
    <Lock />
    <!-- <q-btn /> -->
    <!-- <UserProfile v-if="$store.state.user.user" /> -->
    <!-- <q-toolbar :class="$q.dark.isActive ? 'bg-black text-white': 'bg-white text-black'">
      <q-input
        dense
        standout
        v-model="treeFilter"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="treeFilter === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="treeFilter = ''"
          />
        </template>
      </q-input>
    </q-toolbar> -->
    <!-- <div class="examples"> -->
    <!-- <div class="example"> -->
    <!-- <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="text-blue"
    /> -->
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'
import UserProfile from '../../pages/user/UserProfile'
import Lock from './Lock'

export default {
  name: 'RightDrawer',
  components: {
    Tree,
    UserProfile,
    Lock
  },
  data () {
    return {
      deviceState: false,
      deviceStateAdmin: false,
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
      }
    }
  },
  computed: {
    isMenuVisible: {
      get () {
        return this.$store.state.leftDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('leftDrawer/isMenuVisible', val)
      }
    }
  },
  methods: {
    getTreeData () {
      const url = `${baseApiUrl}/categories/tree`
      return axios.get(url).then(res => res.data)
    },
    onNodeSelect (node) {
      this.$router.push({
        name: 'devicesByCategory',
        params: { id: node.id }
      })
    }
  }
  // mounted () {
  //   this.$refs.tree.$on('node:selected', this.onNodeSelect)
  // },
}
</script>

<style scoped>
.tree {
  color: blue;
}
.examples {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.example {
  flex-basis: 49%;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid #eee;
  margin-top: 5px;
}
</style>
