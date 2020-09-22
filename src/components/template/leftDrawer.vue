<template>
  <div>
    {{getTreeData}}
    <q-toolbar :class="$q.dark.isActive ? 'bg-grey-10 text-white q-pa-sm': 'text-black q-pa-sm'">
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
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="tree"
    />
  </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
  name: 'LeftDrawer',
  components: { Tree },
  methods: {
    getTreeData () {
      const url = `${baseApiUrl}/categories/tree`
      return axios.get(url).then(res => res.data)
    },
    onNodeSelect (node) {
      this.$router.push({
        name: 'devicesByCategory',
        params: { id: JSON.parse(node.id) }
      })
    }
  },
  mounted () {
    this.$refs.tree.$on('node:clicked', this.onNodeSelect)
  },
  data () {
    return {
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        // editing: true,
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
      }
    }
  }
}
</script>

<style scoped>
</style>
