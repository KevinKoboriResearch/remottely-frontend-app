<template>
  <div>
    <!-- {{categories}} -->
    <q-toolbar class="q-pa-sm">
      <!-- <q-toolbar
        dense
        class="bg-orange q-pa-sm"
      > -->
      <!-- :class="$q.dark.isActive ? 'bg-grey-10 text-white': 'text-black'" -->
      <!-- <q-input
        standout="bg-teal text-white"
        class="bg-orange"
        v-model="text"
        label="Custom standout"
      /> -->
      <!-- bg-color="green" -->
      <q-input
        square
        dense
        standout
        :class="$q.dark.isActive ? 'bg-black' : 'bg-grey-3'"
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
      <!-- </q-toolbar> -->
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
      <!-- <i class="fas fa-plus-square"></i> -->
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
          class="q-ml-sm text-orange-10"
          @click.stop="editNode(node)"
        />
        <!-- style="color: #f34636;" -->
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-minus-square"
          class="q-ml-sm text-orange-10"
          @click.stop="removeNode(node)"
        />
        <!-- style="color: #f34636;" -->
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-plus-square"
          class="q-ml-sm text-orange-10"
          @click.stop="addChildNode(node)"
        />
        <!-- style="color: #f34636;" -->
        <q-btn
          flat
          dense
          size="10px"
          padding="none"
          icon="fas fa-sticky-note"
          class="q-ml-sm text-orange-10"
          @click.stop="onNodeArticles(node)"
        />
        <!-- style="color: #f34636;" -->
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
      // nodeData: null,
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        // data: { 'text': 'name' },
        propertyNames: {
          'text': 'name'
          // 'userId': 'userId'
        }, //, 'userId': 'userId'
        filter: { emptyText: 'Categoria não encontrada' }
        // fetchData: (node) => {
        //   return treeData[node.id - 1].userId
        // },
      },
      renderComponent: true,
    }
  },
  methods: {
    // userEditable (id) {
    //   let userAcessible = false
    //   // console.log(this.treeData)
    //   for (let i = 0; i < this.treeData.length; i++) {
    //     // if (this.treeData[i].id == id && this.treeData[i].userId == user.id) {
    //     userAcessible = true
    //     // console.log(userAcessible)
    //     // }
    //   }
    //   return userAcessible
    //   // const compareId = treeData.filter(td => {
    //   //   td.userId == this.user.id
    //   // })
    //   // if (compareId == node.id)
    //   // console.log(node)
    // },
    reloadMinum2 () {
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
      this.reloadMinum2()
      node.startEditing()
    },
    removeNode (node) {
      axios.delete(`${baseApiUrl}/categories/${node.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.forceRerenderTree()
          // location.reload()
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
        name: 'articlesByCategory',
        params: { id: JSON.parse(node.id) }
      })
    },
    onNodeArticles (node) {
      this.$router.push({
        name: 'userArticlesByCategory',
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
    // loadCategory (node) {
    //   const category = {}
    //   const url = `${baseApiUrl}/categories${node.id}`
    //   axios.get(url).then(res => {
    //     category = res.data.map(category => {
    //       return { id: category.id, name: category.name, parentId: category.parentId }
    //     })
    //   })
    //   return category
    // },
    addNew () {
      this.category = {}
      this.category.name = this.user.name + ' ' + this.makeid(5)
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.forceRerenderTree()
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
