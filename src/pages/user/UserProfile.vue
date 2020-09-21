<template>
  <div class="q-pa-xs">
    <!-- {{user}} -->
    <div class="fit row no-wrap justify-between items-start content-start">
      <q-toolbar class="q-mb-xs bg-pink text-white shadow-2 rounded-borders">
        <!-- style="max-height: 2px;" -->
        <!-- icon="close" -->
        <q-btn
          label="Sair"
          padding="none"
          class="q-pa-xs q-mr-sm"
          size="md"
          flat
          dense
          @click.prevent="right = !right"
        />
        <q-space />
        <q-btn
          round
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
          @click="$q.fullscreen.toggle()"
          :icon="inFullscreen ? 'fas fa-compress' : 'fas fa-expand'"
        />
        <!-- :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" -->
      </q-toolbar>
      <!-- v-if="!props.inFullscreen" -->
      <!-- <div class="col-auto">
      </div>
       <div class="col-auto">
      </div>
       <div class="col-auto">
      </div>
       <div class="col-auto">
      </div> -->
      <!-- <div class="col-auto">
        <q-btn
          dense
          @click.prevent="right = !right"
          class="bg-white text-black q-mb-sm"
        >fechar
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn-dropdown
          dense
          @click="$q.dark.toggle()"
          :label="$q.dark.isActive ? 'Modo Escuro': 'Modo Claro'"
          dropdown-icon="fa fa-adjust"
          class="bg-white text-black q-mb-sm q-ml-sm"
        />
      </div>
      <div class="col-auto">
        <q-btn
          dense
          color="orange"
          class="q-mb-sm q-ml-sm"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />
      </div>
      <div class="col-auto">
        <q-btn
          dense
          color="orange"
          class="q-mb-sm q-ml-sm"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />
      </div> -->
    </div>
    <!-- @mouseover.native="menuOver = true"
      @mouseout.native="menuOver = false" -->
    <!-- <q-space/> -->
    <!-- </q-btn-dropdown> -->
    <!-- <q-btn
      dense
      color="orange"
      class="q-mb-sm q-ml-sm"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
    /> -->
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar> -->
          <q-btn
            @click="perfilPhoto = true"
            round
          >
            <q-avatar size="40px">
              <!-- <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> -->
              <img :src="dataUrl">
            </q-avatar>
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-item-label>Manuzera</q-item-label>
          <q-item-label caption>Formacao: medicina veterinaria</q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section>
        <div class="text-h6">Empresa: Your Pets</div>
        <div class="text-subtitle2">Cargo: Veterianria , assistente cirurgica</div>
      </q-card-section>
      <q-separator />

      <q-card-actions vertical>
        <q-btn
          label="Editar"
          color="primary"
          @click="toolbar = true"
        />
        <!-- <q-separator /> -->
        <!-- {{user.id+ 'oi'}} -->
        <!-- v-if="user.admin === false" -->
        <q-btn
          class="q-mt-sm"
          color="primary"
          @click.prevent="logout()"
          flat
        >Sair</q-btn>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="perfilPhoto">
      <q-card style="max-width: 250px;">
        <div>
          <img
            class="q-pa-sm"
            style="width: 100%"
            :src="dataUrl"
          />
        </div>
        <q-toolbar>
          <q-btn
            flat
            dense
            label="apagar"
          />
          <q-space />
          <q-btn
            flat
            dense
            label="voltar"
            v-close-popup
          />
        </q-toolbar>

        <input
          type="file"
          @change="onFileSelected"
        >
        <q-btn @click="onUpload">upload</q-btn>
        <!-- :filter="filterFiles" -->
        <q-uploader
          :url="baseApiUrl + '/user/' + user.id + '/upload-image'"
          :upload-factory="uploadFile"
          label="Carregar foto"
          color="amber"
          text-color="black"
          style="max-width: 250px"
        />
        <!-- no-thumbnails -->
      </q-card>
    </q-dialog>
    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Quasar</span> Framework</q-toolbar-title>

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />
        </q-toolbar>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
        <div class="row justify-center bg-red q-ma-xs rounded-borders">
          <q-btn
            square
            @click.prevent="confirmDelete()"
            flat
            style="min-width: 100%;"
          >Apagar Conta</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-table
      separator="cell"
      v-show="!showForm"
      :data="articles"
      row-key="name"
      style="min-witdh: 100%;"
      class="q-mt-xs"
      :pagination.sync="pagination"
      hide-pagination
    >
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
      </template><template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          Articles1
        </div>
        <q-space />
        <q-btn
          v-if="!props.inFullscreen"
          padding="none"
          class="q-pa-xs q-mr-sm"
          icon="edit"
          size="sm"
          flat
          dense
          to="/user/articles"
          @click="$store.commit('rightDrawer/toggleMenu', val)"
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
            auto-width
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
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value.toString().length > 10 ? col.value.toString().substring(0,10) + '...'
              : col.value.toString().substring(0,10) + '' }}
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
    <div class="row justify-center q-mt-xs rounded-borders">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="lg"
      />
    </div>
    <!-- <q-btn
        class="bg-black q-mt-xs"
        color="
      red"
        @click.prevent="confirmDelete()"
        flat
        style="min-width: 100%;"
      >Apagar Conta</q-btn> -->
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
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 8
      },
      baseApiUrl: baseApiUrl,
      showForm: false,
      article: {},
      articles: [],
      categories: [],
      toolbar: false,
      perfilPhoto: false,
      user: {},
      defaultCodeEditor: 0,
      selectedFile: null
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.articles.length / this.pagination.rowsPerPage)
    },
    right: {
      get () {
        return this.$store.state.rightDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('rightDrawer/toggleMenu', val)
      }
    },
    dataUrl () {
      // 'data:image/jpeg;base64,' + this.hexToBase64(this.user.image)
      // return this.user.image.getAsBinary()
      // return btoa(this.user.image)
      // return 'data:image/jpeg;base64,' + this.user.image.data
      return 'data:image/jpeg;base64,' + btoa(this.user.image)
      // return 'data:image/jpeg;base64,' + btoa(
      //   new Uint8Array(this.user.image)
      //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
      // );
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.post(`${baseApiUrl}/user/${this.user.id}/upload-image`, fd, {
        onUploadProgress: uploadEvent => {
          console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100 + '%'))
        }
      })
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
    hexToBase64 (val) {
      return btoa(String.fromCharCode.apply(null, val.toString().replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))) /* eslint-disable no-alert */
    },
    filterFiles (files) {
      const MAX_FILE_SIZE = 5 * 1024 * 1024 /* =3M */
      // returns an Array containing allowed files
      return files.filter((file) => {
        return file.size <= MAX_FILE_SIZE
      })
    },
    uploadFile (file, updateProgress) {
      // console.log(file.name)
      // console.log(file.path)
      // console.log(file.size)
      // console.log(file.lastModified)
      // // this.article.userId = this.user.id
      const fd = new FormData()
      fd.append('image', file, file.name)
      axios.post(`baseApiUrl/user/${this.user.id}/upload-image`, fd)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.user = {}
        })
        .catch(showError)
    },
    async getSignedUrl (file) {
      const contentType = file.type // To send the correct Content-Type
      const fileName = file.name // If you want to use this value to calculate the S3 Key.
      const response = await api.getSignedUrl({ fileName, contentType }) // Your api call to a sever that calculates the signed url.
      return response.data.url
    },
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
      const url = `${baseApiUrl}/user/${this.user.id}/articles`
      axios.get(url)
        // .then(res => {
        //   this.articles = res.data
        // })
        .then(res => {
          this.articles = res.data.map(article => {
            return { name: article.name, description: article.description }
          })
        })
    },
    reset () {
      this.article = {}
      this.loadArticles()
    },
    save () {
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
      const id = this.user.id
      axios.delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.reset()
          this.logout()
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
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
      // const id = this.user.id
      // axios.get(`${baseApiUrl}/users/${id}`)
      //   .then(res => {
      //     this.user = res.data
      //   })
    },
    // remove () {
    //   const id = this.user.id
    //   axios.delete(`${baseApiUrl}/users/${id}`)
    //     .then(() => {
    //       this.$toasted.global.defaultSuccess()
    //       this.reset()
    //     })
    //     .catch(showError)
    // },
    // logout () {
    //   localStorage.removeItem(userKey)
    //   this.$store.commit('user/setUser', null)
    //   this.$router.push({ name: 'auth' })
    // },
    logout () {
      localStorage.removeItem(userKey)
      this.$store.commit('rightDrawer/toggleMenu', false)
      this.$store.commit('user/setUser', null)
      this.$store.commit('user/setFacebookUser', false)
      this.$router.push({ name: 'auth' })
    },
  },
  watch: {
    page () {
      this.loadArticles()
    }
  },
  mounted () {
    this.loadUser()
    this.loadCategories()
    this.loadArticles(this.user)
  }
}
</script>
