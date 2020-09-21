<template>
  <div class="q-pa-sm">
    <!-- {{user}} -->
    <q-btn
      @click.prevent="right = !right"
      class="q-mb-sm"
    >voltar
    </q-btn>
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
          label="Editar Perfil"
          color="primary"
          @click="toolbar = true"
        />
        <q-separator />
        <!-- {{user.id+ 'oi'}} -->
        <q-btn
          class="q-mt-sm"
          v-if="user.admin === false"
          @click.prevent="confirmDelete()"
          flat
        >Apagar Conta</q-btn>
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
      </q-card>
    </q-dialog>
    <br>
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
      </div>
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
      separator="cell"
      v-show="!showForm"
      :data="articles"
      row-key="name"
      style="min-witdh: 100%;"
    >
      <template v-slot:top="props">
        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:header="props">
        <!-- <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        /> -->
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn
              flat
              class="bg-green q-mr-sm"
              to="/user/articles"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn>
          </q-th>
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
          <!-- <q-th>
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </q-th> -->
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <!-- <q-btn
              class="bg-yellow q-mr-sm"
              flat
              @click="loadArticle(props.row), props.expand = !props.expand"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn> -->
            <!-- <q-btn
              class="bg-red"
              flat
              @click="loadArticle(props.row), confirmDelete()"
            >
              <i class="fa fa-trash-alt"></i>
            </q-btn> -->
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value.toString().length > 10 ? col.value.toString().substring(0,10) + '...'
              : col.value.toString().substring(0,10) + '' }}
            <!-- {{ user.name.substring(0,10)+"..." }} -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
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
            return { id: article.id, name: article.name }
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
    logout () {
      localStorage.removeItem(userKey)
      this.$store.commit('user/setUser', null)
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
