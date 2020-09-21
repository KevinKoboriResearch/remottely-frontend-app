<template>
  <div>
    <PageTitle
      icon="fa fa-user"
      :main="category.name"
      sub="Categoria"
    />
    <q-card class="bg-transparent no-shadow no-border q-pa-md">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #f37169"
              class="q-pa-none q-ml-xs "
            >
              <q-item-section
                side
                style="background-color: #f34636"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="fas fa-layer-group"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">
                  {{countCategories}}
                </q-item-label>
                Categories
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #5064b5"
              class="q-pa-none q-ml-xs"
            >
              <q-item-section
                side
                style="background-color: #3e51b5"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="far fa-newspaper"
                  color="white"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{articles.length == 6 ? '6' : articles.length }}</q-item-label>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #ea6a7f"
              class="q-pa-none q-ml-xs"
            >
              <q-item-section
                side
                style="background-color: #ea4b64"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="fab fa-google"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">50</q-item-label>
                <q-item-label>Connections</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #a270b1"
              class="q-pa-none q-ml-xs q-mr-xs"
            >
              <q-item-section
                side
                style="background-color: #9f52b1"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="bar_chart"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">1020</q-item-label>
                <q-item-label> Website Visits</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-toolbar :class="$q.dark.isActive ? 'text-white': 'text-black'">
      <q-input
        @change="getArticlesByCategory"
        placeholder="pesquise aqui os artigos desta categoria..."
        dense
        standout
        v-model="searchArticle"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchArticle === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchArticle = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <div class="fit row wrap justify-start items-start content-start">
      <div
        v-if="searchArticle === '' || article.name.includes(searchArticle) || article.description.includes(searchArticle)"
        class="q-pt-md q-px-md col-xs-12 col-sm-6 col-md-4"
        v-for="article in articles"
        :key="article.id"
      >
        <ArticleItem :article="article" />
      </div>
    </div>
    <div class="column justify-center items-center">
      <q-btn
        v-if="loadMore"
        class="bg-orange-14 text-black"
        label="Carregar Mais Artigos"
        @click="getArticlesByCategory"
      />
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from '../../global'
import axios from 'axios'
import PageTitle from '../../components/template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
  name: 'ArticlesByCategory',
  components: { PageTitle, ArticleItem },
  data () {
    return {
      searchArticle: '',
      searchArticleAll: '',
      category: {},
      categories: [],
      countCategories: 0,
      count: 0,
      categoryYet: [],
      articles: [],
      page: 1,
      loadMore: true
    }
  },
  methods: {
    getCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    getArticlesByCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
      axios(url).then(res => {
        this.articles = this.articles.concat(res.data)
        this.page++
        if (res.data.length === 0) this.loadMore = false
      })
    },
    countTree (cat) {
      for (let i = 0; i < cat[0].children.length; i++) {
        this.count++
        this.categoryYet = [cat[0].children[i]]
        this.countTree(this.categoryYet)
      }
    },
    loadCategories () {
      this.loadUser()
      const url = `${baseApiUrl}/user/${this.user.id}/categories/tree`
      axios.get(url).then(res => {
        this.categories = res.data
        console.log(this.categories)
        this.countTree(this.categories)
        this.countCategories = this.count
        this.count = 0
      })
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    },
  },
  watch: {
    $route (to) {
      this.category.id = to.params.id
      this.articles = []
      this.page = 1
      this.loadMore = true

      this.getCategory()
      this.getArticlesByCategory()
      this.loadCategories()
    }
  },
  mounted () {
    this.category.id = this.$route.params.id
    this.getCategory()
    this.getArticlesByCategory()
    this.loadCategories()
  }
}
</script>
