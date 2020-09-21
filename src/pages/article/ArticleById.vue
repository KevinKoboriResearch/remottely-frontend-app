<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-file-o"
      :main="article.name"
      :sub="article.description"
    />
    <!-- <div class="article-content" v-html="article.content"></div> -->
    <!-- class="bg-white" -->
    <vue-editor
      class="article-content"
      v-model="article.content"
      :editor-toolbar="customToolbar"
      disabled
    />
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/qtcreator_dark.css'
import { baseApiUrl } from '../../global'
import axios from 'axios'
import PageTitle from '../../components/template/PageTitle'
import { VueEditor } from "vue2-editor"

export default {
  name: 'ArticleById',
  components: { PageTitle, VueEditor },
  data: function () {
    return {
      article: {},
      customToolbar: [
        []
      ],
    }
  },
  mounted () {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`
    axios.get(url).then(res => this.article = res.data)
  },
  updated () {
    document.querySelectorAll('.article-content pre.ql-syntax').forEach((block) => {
      hljs.highlightBlock(block);
    })
  }
}
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.article-content img {
  max-width: 100%;
}

.article-content :last-child {
  margin-bottom: 0px;
}
</style>
