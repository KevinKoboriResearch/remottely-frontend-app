<template>
  <div :class="tableType == 'list' ? 'fit row wrap justify-center items-center content-center' : ''">
    <q-form
      v-show="showForm"
      class="q-gutter-md"
    >
      <div class="row">
        <q-separator />
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.name"
            label-slot
            lazy-rules
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
      </div>
      <VueEditor
        v-model="article.content"
        placeholder="Informe o Conteúdo do Artigo..."
      />
      <div class="row">
        <q-btn
          @click="save"
          label="Enviar"
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
      <br>
    </q-form>
    <q-toolbar
      class="row q-pa-sm"
      style="witdh: 100%;"
      :class="$q.dark.isActive ? 'text-white': 'text-black'"
    >
      <q-input
        v-if="!showForm"
        placeholder="pesquisar..."
        dense
        class="col-12 bg-pink"
        style="witdh: 100%;border-radius: 5px;"
        standout
        v-model="filter"
        input-class="text-right"
      >
        <template v-slot:append>
          <q-icon
            v-if="filter === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="filter = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <q-table
      v-if="tableType == 'list' && !showForm"
      :data="articles"
      :filter="filter"
      :pagination="pagination"
      row-key="name"
      style="min-width: 100%;"
    >
      <!-- :style="$q.screen.gt.xs ? 'min-width: 100%;' : 'max-width: 100%;'" -->
      <template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          Articles1
        </div>
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th-large"
          @click="tableType = 'gridImage'"
        />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th"
          @click="tableType = 'gridNotes'"
        />
        <q-space />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-plus"
          size="sm"
          flat
          dense
          @click="reset(),
          article.content = `<pre class=\'ql-syntax\' spellcheck=\'false\'>\nDigite aqui dentro o seu código fonte...</pre>`,
          showForm = !showForm"
        />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-adjust"
          size="sm"
          flat
          dense
          @click="$q.dark.toggle()"
        />
        <q-btn
          padding="none"
          class="q-pa-xs"
          size="sm"
          flat
          dense
          :icon="props.inFullscreen ? 'fas fa-compress' : 'fas fa-expand'"
          @click="props.toggleFullscreen"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <strong>
              {{ col.label == 'Name' ? '' : col.label }}
            </strong>
          </q-th>
          <q-th auto-width>
            <strong>
              EDITAR
            </strong>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td>
            <q-btn
              icon="edit"
              size="sm"
              flat
              dense
              @click="loadArticle(props.row), props.expand = !props.expand"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="loadArticle(props.row), confirmDelete()"
            />
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
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.name"
                    label-slot
                    lazy-rules
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
              </div>
              <vue-editor
                id="editor"
                v-model="article.content"
                placeholder="Informe o Conteúdo do Artigo..."
              />
              <div class="row">
                <q-btn
                  @click="save('edit')"
                  label="Salvar"
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
            </q-form>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="mdi-chevron-double-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="mdi-chevron-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="mdi-chevron-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="pagesNumber > 2"
          icon="mdi-chevron-double-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
    <q-table
      v-if="tableType == 'gridNotes' && !showForm"
      grid
      grid-header
      :data="articles"
      :pagination="pagination"
      :filter="filter"
      class="q-pa-sm"
      :class="$q.dark.isActive ? 'bg-grey-10 text-white' : 'bg-white text-black'"
    >
      <!-- show-header -->
      <!-- hide-header -->
      <!-- hide-pagination -->
      <template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          Articles2
        </div>
        <q-btn
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th-list"
          @click="tableType = 'list'"
        />
        <q-btn
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th-large"
          @click="tableType = 'gridImage'"
        />
        <q-space />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-plus"
          size="sm"
          flat
          dense
          @click="reset(),
          article.content = `<pre class=\'ql-syntax\' spellcheck=\'false\'>\nDigite aqui dentro o seu código fonte...</pre>`,
          showForm = !showForm"
        />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-adjust"
          size="sm"
          flat
          dense
          @click="$q.dark.toggle()"
        />
        <q-btn
          padding="none"
          class="q-pa-xs"
          size="sm"
          flat
          dense
          :icon="props.inFullscreen ? 'fas fa-compress' : 'fas fa-expand'"
          @click="props.toggleFullscreen"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <strong>
              {{ col.label == 'Name' ? '' : col.label }}
            </strong>
          </q-th>
          <q-th auto-width>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td>
            <q-btn
              icon="edit"
              size="sm"
              flat
              dense
              @click="loadArticle(props.row), props.expand = !props.expand"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="loadArticle(props.row), confirmDelete()"
            />
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
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.name"
                    label-slot
                    lazy-rules
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
              </div>
              <vue-editor
                id="editor"
                v-model="article.content"
                placeholder="Informe o Conteúdo do Artigo..."
              />
              <div class="row">
                <q-btn
                  @click="save('edit')"
                  label="Salvar"
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
            </q-form>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="mdi-chevron-double-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="mdi-chevron-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="mdi-chevron-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="pagesNumber > 2"
          icon="mdi-chevron-double-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
    <q-table
      v-if="tableType == 'gridImage' && !showForm"
      grid
      grid-header
      :data="articles"
      :pagination="pagination"
      :filter="filter"
      class="q-pa-sm"
      :class="$q.dark.isActive ? 'bg-grey-10 text-white' : 'bg-white text-black'"
    >
      <!-- hide-pagination -->
      <!-- hide-header -->
      <template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          Articles3
        </div>
        <q-btn
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th-list"
          @click="tableType = 'list'"
        />
        <q-btn
          padding="none"
          class="q-ml-md q-pa-xs"
          color="orange"
          flat
          icon="fas fa-th"
          @click="tableType = 'gridNotes'"
        />
        <q-space />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-plus"
          size="sm"
          flat
          dense
          @click="reset(),
          article.content = `<pre class=\'ql-syntax\' spellcheck=\'false\'>\nDigite aqui dentro o seu código fonte...</pre>`,
          showForm = !showForm"
        />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="fa fa-adjust"
          size="sm"
          flat
          dense
          @click="$q.dark.toggle()"
        />
        <q-btn
          padding="none"
          class="q-pa-xs"
          size="sm"
          flat
          dense
          :icon="props.inFullscreen ? 'fas fa-compress' : 'fas fa-expand'"
          @click="props.toggleFullscreen"
        />
      </template>
      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="">
            <q-card-section class="text-center">
              <img
                v-if="props.row.imageUrl"
                :src="props.row.imageUrl"
                style="min-height: 150px;"
              >
              <q-img
                v-else
                class="col-5"
                :src="require('../../assets/article/1.gif')"
                alt="Article"
              />
            </q-card-section>

            <q-card-section class="q-pt-none text-center ">
              <div class="text-h6  text-grey-8">
                {{props.row.name}}
              </div>
              <div class="text-caption text-capitalize text-grey-8">
                {{props.row.des}}
              </div>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn
                icon="edit"
                round
                dense
                class="bg-pink text-white"
                @click="loadArticle(props.row), props.expand = !props.expand"
              />
              <q-btn
                icon="delete"
                round
                dense
                class="bg-pink text-white"
                @click="loadArticle(props.row), confirmDelete()"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="mdi-chevron-double-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="mdi-chevron-left"
          color="orange"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="mdi-chevron-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="pagesNumber > 2"
          icon="mdi-chevron-double-right"
          color="orange"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
    <!-- </q-card> -->
    <!-- <div
      v-if="tableType == 'gridImage' && !showForm"
      class="row justify-center q-my-sm"
    >
      <q-pagination
        v-model="pagination.page"
        color="orange-10"
        :max="pagesNumber"
        size="md"
      />
    </div> -->
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
import { QSpinnerGears } from 'quasar'
import { VueEditor } from "vue2-editor"

export default {
  name: 'UserArticles',
  components: { VueEditor },
  data: function () {
    return {
      tableType: 'gridImage',
      showForm: false,
      article: {},
      articles: [],
      categories: [],
      user: {},
      defaultCodeEditor: 0,
      filter: '',
      show_filter: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: this.$q.screen.gt.xs ? 6 : 4 //this.tableType == 'gridImage' ? 8 :
      },
      paginationType: false,
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.articles.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    // this.pagination.rowsPerPage
  },
  methods: {
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
    reset () {
      this.article = {}
    },
    save (val) {
      this.article.userId = this.user.id
      const method = this.article.id ? 'put' : 'post'
      const id = this.article.id ? `/${this.article.id}` : ''
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess()
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
    loadUserArticles () {
      const url = `${baseApiUrl}/user/${this.user.id}/articles`
      axios.get(url).then(res => {
        this.articles = res.data
      })
    },
    loadCategories () {
      const url = `${baseApiUrl}/user/${this.user.id}/categories`
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, label: category.path }
        })
      })
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    }
  },
  mounted () {
    this.loadUser()
    this.loadCategories()
    this.loadUserArticles()
  }
}
</script>
