<template>
  <div>
    <q-toolbar
      v-if="!exit"
      :class="$q.dark.isActive ? 'text-white': 'text-black'"
    >
      <q-input
        @change="getArticles"
        placeholder="pesquise aqui todos artigos..."
        dense
        standout
        v-model="searchAllArticles"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchAllArticles === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchAllArticles = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <!-- v-if="exit" -->
    <q-btn
      @change="getArticlesExit"
      @click="exit = !exit"
    >
      sair {{exit}}
    </q-btn>
    <q-toolbar
      v-if="exit"
      :class="$q.dark.isActive ? 'text-white': 'text-black'"
    >
      <q-input
        @change="getArticlesByCategory"
        placeholder="pesquise aqui os artigos desta categoria..."
        dense
        standout
        v-model="searchArticles"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchArticles === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchArticles = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <!-- <q-toolbar
      dense
      :class="$q.dark.isActive ? 'bg-secondary text-white': 'bg-secondary text-black'"
    >

      <q-btn-toggle
        dense
        v-model="searchOption"
        flat
        toggle-color="yellow"
        class="q-pr-sm"
        :options="[
          {label: 'Here', value: 'one'},
          {label: 'All', value: 'three'}
        ]"
      />
      <q-space />
      <q-input
        v-if="searchOption == 'one'"
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
      <q-input
        v-else
        @change="getArticles"
        placeholder="pesquise aqui todos artigos..."
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
    </q-toolbar> -->
    <PageTitle
      icon="fa fa-folder-o"
      :main="category.name"
      sub="Categoria"
    />
    <!-- <q-toolbar
      v-if="exit"
      :class="$q.dark.isActive ? 'text-white': 'text-black'"
    >
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
    </q-toolbar> -->
    <div class="fit row wrap justify-start items-start content-start">
      <div
        class="q-pt-md q-px-md col-xs-12 col-sm-6 col-md-4"
        v-for="article in articles"
        :key="article.id"
      >
        <!-- v-if="searchArticles === '' || article.name.includes(searchArticles) || article.description.includes(searchArticles) ||
        searchAllArticles === '' || article.name.includes(searchAllArticles) || article.description.includes(searchAllArticles)" -->
        <ArticleItem :article="article" />
      </div>
    </div>
    <div class="column justify-center items-center">
      <q-btn
        v-if="loadMore"
        class="bg-orange-14"
        label="Carregar Mais Artigos"
        @click="getArticlesByCategory"
      />
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import axios from 'axios'
import PageTitle from '../../components/template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
  name: 'ArticlesByCategory',
  components: { PageTitle, ArticleItem },
  data () {
    return {
      searchArticles: '',
      searchAllArticles: '',
      category: {},
      articles: [],
      page: 1,
      loadMore: true,
      searchOption: 'one',
      exit: true
      // treeOptions: {
      //   propertyNames: { 'text': 'name' },
      //   filter: { emptyText: 'Categoria não encontrada' }
      // }
    }
  },
  methods: {
    getCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    getArticlesExit () {
      if (this.exit == true) {
        this.getArticles()
      } else {
        this.getArticlesByCategory()
      }
    },
    getArticlesByCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
      axios(url).then(res => {
        this.articles = this.articles.concat(res.data)
        this.page++

        if (res.data.length === 0) this.loadMore = false
      })
    },
    getArticles () {
      const url = `${baseApiUrl}/articles?page=${this.page}`
      axios.get(url).then(res => {
        this.articles = res.data
      })
    }
  },
  watch: {
    $route (to) {
      this.category.id = to.params.id
      this.articles = []
      this.page = 1
      this.loadMore = true

      this.getCategory()
      this.getArticlesByCategory()
    }
  },
  mounted () {
    this.category.id = this.$route.params.id
    this.getCategory()
    this.getArticlesByCategory()
  }
}
</script>

<style>
/* .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    } */

/* .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    } */
</style>
