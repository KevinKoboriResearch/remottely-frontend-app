<template>
  <div class="article-admin">
    <q-form
      v-show="showForm"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.name"
            label-slot
            hint="Nome - necessário pelo menos 2 caracteres"
            lazy-rules
            :rules="[ val => val && val.length >= 2 || 'Please type something']"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-user-tie"
                />
                Informe o Nome do Artigo...

                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.description"
            label-slot
            hint="Nome - necessário pelo menos 4 caracteres"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-user-tie"
                />
                Informe a Descrição do Artigo...

                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.imageUrl"
            label-slot
            hint="Nome - necessário pelo menos 4 caracteres"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-user-tie"
                />
                Informe a URL da Imagem...

                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-select
            id="article-parentId"
            standout
            :options="categories"
            v-model="article.categoryId"
            map-options
            emit-value
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          {{article.userId}}
          <q-select
            id="category-parentId"
            standout
            :options="users"
            v-model="article.userId"
            map-options
            emit-value
          />
        </div>
      </div>
      <!-- @focus="onEditorFocus" -->
      <VueEditor
        v-model="article.content"
        placeholder="Informe o Conteúdo do Artigo..."
      />
      <div class="row">
        <q-btn
          @click="save"
          label="Submit"
          type="submit"
          color="primary"
        />
        <q-btn
          @click="reset"
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-space />
        <q-btn
          @click="showForm = false"
          label="Cancelar"
          type="cancel"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <hr>
    </q-form>
    <q-table
      v-show="!showForm"
      :data="articles"
      row-key="name"
      separator="cell"
      style="min-witdh: 100%;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn
              flat
              class="bg-green q-mr-sm"
              @click="reset(),
              article.content = `<pre class=\'ql-syntax\' spellcheck=\'false\'>\nDigite aqui dentro o seu código fonte...</pre>`,
              showForm = !showForm"
            >
              <i class="fa fa-user-plus"></i>
            </q-btn>
          </q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <strong>
              {{ col.label }}
            </strong>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-btn
              class="bg-yellow q-mr-sm"
              flat
              @click="loadArticle(props.row), props.expand = !props.expand"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn
              class="bg-red"
              flat
              @click="loadArticle(props.row), confirmDelete()"
            >
              <i class="fa fa-trash-alt"></i>
            </q-btn>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <div v-if="col.name == 'description'">
              {{  col.value.length > 50 ? col.value.substring(0,10)+'...' : col.value }}
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
        <q-tr
          v-show="props.expand"
          :props="props"
        >
          <q-td colspan="100%">
            <q-form
              v-show="!showForm"
              class="q-gutter-md"
            >
              <!-- <button @click="focusEditor">Focus Editor</button> -->
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.name"
                    label-slot
                    hint="Nome - necessário pelo menos 2 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 2 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="fa fa-user-tie"
                        />
                        Informe o Nome do Artigo...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.description"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="fa fa-user-tie"
                        />
                        Informe a Descrição do Artigo...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.imageUrl"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="fa fa-user-tie"
                        />
                        Informe a URL da Imagem...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-select
                    id="article-parentId"
                    standout
                    :options="categories"
                    v-model="article.categoryId"
                    map-options
                    emit-value
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-select
                    id="category-parentId"
                    standout
                    :options="users"
                    v-model="article.userId"
                    map-options
                    emit-value
                  />
                </div>
              </div>
              <!-- :editor-toolbar="customToolbar" -->
              <!-- :editorOptions="editorSettings" ref="editor"-->
              <!-- :editorOptions="editorSettings"
                v-model="article.content"
                @focus="onEditorFocus"
                @blur="onEditorBlur" -->
              <!-- {{article}} -->
              <!-- @selection-change="onSelectionChange" -->
              <!-- {{article}} -->
              <!-- <button @click="setEditorContent">Set Editor Content</button> -->
              <!-- @selection-change="onSelectionChange"
                @blur="onEditorBlur" -->
              <!-- @focus="onEditorFocus" -->
              <vue-editor
                id="editor"
                v-model="article.content"
                placeholder="Informe o Conteúdo do Artigo..."
              />
              <div class="row">
                <q-btn
                  @click="save('edit')"
                  label="Submit"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  @click="reset"
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
                <q-space />
                <q-btn
                  @click="showForm = false, props.expand = !props.expand"
                  label="Cancelar"
                  type="cancel"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
              <hr>
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
import { QSpinnerGears } from 'quasar'
import { VueEditor } from "vue2-editor"
// import { Quill } from "quill"
// import { ImageDrop } from "../../../node_modules/quill-image-drop-module/image-drop.min.js"
// import ImageResize from "quill-image-resize-module'
// import Quill from 'quill'
// let ImageResize = ImageResizename
// import * as QuillNamespace from 'quill'
// let Quill = QuillNamespace
// import  ImageResize  from 'quill-image-resize-module'
// import 'quill-image-resize-module'

// Quill.register('modules/imageResize', ImageResize)

// Quill.register("modules/imageDrop", ImageDrop);
// Quill.register("modules/imageResize", ImageResize)

export default {
  name: 'ArticleAdmin',
  components: { VueEditor },
  data: function () {
    return {
      showForm: false,
      article: {},
      articles: [],
      categories: [],
      users: [],
      defaultCodeEditor: 0
      // fields: [
      //   { key: 'id', label: 'Código', sortable: true },
      //   { key: 'name', label: 'Nome', sortable: true },
      //   { key: 'description', label: 'Descrição', sortable: true },
      //   { key: 'actions', label: 'Ações' }
      // ],
      // customToolbar: [
      // ["bold", "italic", "underline"],
      // [{ list: "ordered" }, { list: "bullet" }],
      // ["image", "code-block"]
      // ],
      // customModulesForEditor: [
      //   { alias: "imageDrop", module: ImageDrop }
      // { alias: "imageResize", module: ImageResize }
      // ],
      // editorSettings: {
      //   modules: {
      //     // imageDrop: true
      //     imageResize: {
      //       displayStyles: {
      //           backgroundColor: 'black',
      //           border: 'none',
      //           color: white
      //           // other camelCase styles for size display
      //       }
      //     }
      //   }
      // }
    }
  },
  methods: {
    // onEditorBlur(quill) {
    //   console.log("editor blur!", quill);
    //   // this.article.content = "<pre class=\"ql-syntax\" spellcheck=\"false\">\n</pre>"
    //   this.showLoading()
    // },

    // onEditorFocus(quill) {
    //   this.defaultCodeEditor ++
    //   // console.log(this.article.content)
    //   // console.log(this.defaultCodeEditor)
    //   if (this.defaultCodeEditor === 1 && !this.article.content !== null) {
    //     // console.log("editor focus!", quill);
    //     this.article.content = "<pre class=\"ql-syntax\" spellcheck=\"false\">\n</pre>"
    //     // this.showLoading()
    //   }
    // },

    // onSelectionChange(range) {
    //   console.log("selection change!", range);
    //   // this.article.content = "<pre class=\"ql-syntax\" spellcheck=\"false\">\n</pre>"
    //   this.showLoading()
    // },
    // showLoading () {
    //   this.$q.loading.show({
    //     message: 'Enviando...'
    //   })

    //   this.timer = setTimeout(() => {
    //     this.$q.loading.show({
    //       spinner: QSpinnerGears,
    //       spinnerColor: 'white',
    //       messageColor: 'white',
    //       backgroundColor: 'deep-purple-6',
    //       message: 'Inserindo no Banco de Dados...'
    //     })

    //     this.timer = setTimeout(() => {
    //       this.$q.loading.hide()
    //       this.timer = void 0
    //     }, 500)
    //   }, 500)
    // },
    // focusEditor() {
    //   this.$refs.editor.quill.focus();
    // },
    confirmDelete () {
      this.$q.dialog({
        dark: true,
        title: 'Apagar',
        message: 'Tem certeza que quer apagar este artigo?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.remove()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    loadArticles () {
      const url = `${baseApiUrl}/articles?page=${this.page}`
      axios.get(url).then(res => {
        this.articles = res.data
      })
    },
    reset () {
      this.article = {}
      // this.loadArticles()
    },
    save (val) {
      const method = this.article.id ? 'put' : 'post'
      const id = this.article.id ? `/${this.article.id}` : ''
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.showLoading()
          if (val !== 'edit') {
            this.reset()
          }
        })
        .catch(showError)
    },
    remove () {
      const id = this.article.id
      axios.delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadArticle (article) {
      axios.get(`${baseApiUrl}/articles/${article.id}`)
        .then(res => this.article = res.data)
    },
    loadCategories () {
      const url = `${baseApiUrl}/categories`
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, label: category.path }
        })
      })
    },
    loadUsers () {
      const url = `${baseApiUrl}/users`
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, label: `${user.name} - ${user.email}` }
        })
      })
    }
  },
  watch: {
    page () {
      this.loadArticles()
    }
  },
  mounted () {
    this.loadUsers()
    this.loadCategories()
    this.loadArticles()
  }
  // beforeDestroy () {
  //   if (this.timer !== void 0) {
  //     clearTimeout(this.timer)
  //     this.$q.loading.hide()
  //   }
  // }
}
</script>

<style lang="css">
/* @import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
@import "~vue2-editor/dist/vue2-editor.css"; */
</style>
