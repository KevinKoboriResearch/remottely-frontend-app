<template>
  <div>
    <div class="examples">
      <div class="example">
        <div class="example-description">
          <input
            type="text"
            placeholder="Type to filter..."
            v-model="filter"
            class="filter-field"
          >
        </div>
        <div class="example-tree">
          <Tree
            :data="data"
            :options="opts"
            :filter="filter"
            ref="tree"
          >
            <!-- @node:checked="" -->
            <div
              slot-scope="{ node }"
              class="node-container"
            >
              <div class="node-text">{{ node.text }}</div>
              <div class="node-controls">
                <a
                  href="#"
                  @click.stop="editNode(node)"
                >Edit</a>
                <a
                  href="#"
                  @click.stop="removeNode(node)"
                >Remove</a>
                <a
                  href="#"
                  @click.stop="addChildNode(node)"
                >Add child</a>
              </div>
            </div>
          </Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
  components: { Tree },
  data: () => ({
    data: getData(),//getData(),//this.getTreeData(),
    filter: null,
    opts: {
      // minFetchDelay: 1000,
      fetchData: (node) => {
        return Promise.resolve(data[node.id - 1])
      },
      // checkbox: true
    }
  }),

  filters: {
    time (time) {
      return +time
    }
  },

  mounted () {
    this.$refs.tree.$on('node:editing:start', (node) => {
      console.log('Start editing: ' + node.text)
    })

    this.$refs.tree.$on('node:editing:stop', (node, isTextChanged) => {
      console.log('Stop editing: ' + node.text + ', ' + isTextChanged)
    })
  },

  methods: {
    getTreeData () {
      const url = `${baseApiUrl}/categories/tree`
      return axios.get(url).then(res => {
        return res.data.map(data => {
          return { text: data.path }
        })
      })
    },
    editNode (node, e) {
      node.startEditing()
    },

    removeNode (node) {
      if (confirm('Are you sure?')) {
        node.remove()
      }
    },

    addChildNode (node) {
      if (node.enabled()) {
        node.append('New Node')
      }
    },

    initEventViewer (event) {
      const events = this.events
      debugger;
      return function (node, newNode) {
        let nodeText = '-'
        let targetNode = newNode && newNode.text ? newNode : node

        if (targetNode && targetNode.text) {
          nodeText = targetNode.text
        }

        events.push(
          Object.assign(
            {},
            event,
            { time: new Date, nodeText, id: key++ }
          )
        )

        console.log(event, arguments)
      }
    }
  }
}

function getData () {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve([
        {
          "text": "Part II: Advanced JavaScript", "children": [
            {
              "text": "The DOM and jQuery", "children": [
                { "text": "Selecting DOM Elements" },
                {
                  "text": "Using jQuery to Work with the DOM Tree", "children": [
                    { "text": "Loading jQuery on Your HTML Page" },
                    { "text": "Replacing the Heading Text Using jQuery" }
                  ]
                },
                { "text": "Creating New Elements with jQuery" },
                { "text": "Animating Elements with jQuery" },
                { "text": "Chaining jQuery Animations" },
                { "text": "What You Learned" }
              ]
            },
            { "text": "Interactive Programming" },
            { "text": "Find the Buried Treasure!" },
            { "text": "Object-Oriented Programming" }
          ]
        },
        {
          "text": "Part I: Fundamentals",
          "isBatch": true,
          "id": 2
        },
        {
          "text": "Data Types and Variables",
          "isBatch": true,
          "id": 3
        }
      ])
    }, 100)
  })
}
</script>

