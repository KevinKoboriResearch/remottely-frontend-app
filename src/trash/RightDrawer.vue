<template>
  <div>
    <UserProfile v-if="$store.state.user.user" />
    <q-toolbar :class="$q.dark.isActive ? 'bg-black text-white': 'bg-white text-black'">
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
    </q-toolbar>
    <!-- <div class="examples"> -->
    <!-- <div class="example"> -->
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="text-blue"
    />
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'
import UserProfile from '../../pages/user/UserProfile'

export default {
  components: {
    Tree,
    UserProfile
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
        name: 'articlesByCategory',
        params: { id: node.id }
      })
    }
  },
  mounted () {
    this.$refs.tree.$on('node:selected', this.onNodeSelect)
  },
  data () {
    return {
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
      }
    }
  }
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
