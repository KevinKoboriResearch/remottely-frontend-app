<template>
  <div>
    {{category}}
    <q-toolbar class="q-pa-sm">
      <!-- <q-input
        square
        dense
        standout
        v-model="treeFilter"
        :class="$q.dark.isActive ? 'bg-black' : 'bg-deep-purple-5'"
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
      </q-input> -->
      <q-input
        placeholder="pesquisar..."
        dense
        class="col-12 bg-pink"
        style="witdh: 100%;border-radius: 5px;"
        standout
        v-model="treeFilter"
        input-class="text-right"
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
    <q-btn
      dense
      flat
      size="15px"
      padding="none"
      @click.stop="addNew()"
      color="black"
      icon="fas fa-plus-square"
      class="q-mx-md q-mt-sm"
    >
    </q-btn>
    <Tree
      v-if="renderComponent"
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="tree"
    >
      <div slot-scope="{ node }">
        {{ node.text }}
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-pen-square"
          class="q-ml-sm text-primary"
          @click.stop="editNode(node)"
        />
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-minus-square"
          class="q-ml-sm text-primary"
          @click.stop="removeNode(node)"
        />
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-plus-square"
          class="q-ml-sm text-primary"
          @click.stop="addChildNode(node)"
        />
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-sticky-note"
          class="q-ml-sm text-primary"
          @click.stop="onNodeDevices(node)"
        />
      </div>
    </Tree>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
  name: 'LeftDrawerUser',
  components: { Tree },
  data () {
    return {
      user: {},
      minum: false,
      category: {},
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: {
          'text': 'name'
        },
        filter: { emptyText: 'Categoria não encontrada' }
      },
      renderComponent: true,
    }
  },
  methods: {
    reloadMinum () {
      if (this.minum == true) {
        location.reload()
      }
    },
    forceRerenderTree () {
      this.renderComponent = false
      this.$nextTick().then(() => {
        this.renderComponent = true
        this.treeData = this.getTreeData()
        this.minum = true
      });
    },
    editNode (node, e) {
      this.reloadMinum()
      node.startEditing()
    },
    removeNode (node) {
      axios.delete(`${baseApiUrl}/categories/${node.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.forceRerenderTree()
          location.reload()
        })
        .catch(showError)
    },
    addChildNode (node) {
      if (node.enabled()) {
        this.save(node, true)
      }
    },
    getTreeData () {
      this.loadUser()
      const url = `${baseApiUrl}/user/${this.user.id}/categories/tree`
      return axios.get(url).then(res => {
        return res.data
      })
    },
    onNodeSelect (node) {
      this.$router.push({
        name: 'devicesByCategory',
        params: { id: JSON.parse(node.id) }
      })
    },
    onNodeDevices (node) {
      this.$router.push({
        name: 'userDevicesByCategory',
        params: { id: JSON.parse(node.id) }
      })
    },
    makeid (length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    addNew () {
      this.category = {}
      this.category.name = this.user.name + ' movel ' + this.makeid(5)
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.forceRerenderTree()
          location.reload()
        })
        .catch(showError)
    },
    save (node, child = false) {
      this.category = {}
      if (!child) {
        this.category.id = node.id
        this.category.name = node.text
        this.category.parentId = node.parentId
      } else {
        this.category.name = this.user.name + ' ' + this.makeid(5)
        this.category.parentId = node.id
      }
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios.post(`${baseApiUrl}/categories`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // location.reload()
        })
        .catch(showError)

      setTimeout(function () {
        location.reload()
      }, 700)
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    }
  },
  mounted () {
    this.loadUser()
    this.$refs.tree.$on('node:clicked', (node) => {
      this.onNodeSelect(node)
    })
    this.$refs.tree.$on('node:editing:stop', (node) => {
      this.save(node, false)
    })
  }
}
</script>
