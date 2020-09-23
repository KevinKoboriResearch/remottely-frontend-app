<template>
  <div class="device-by-id">
    <PageTitle
      icon="fa fa-file-o"
      :main="device.name"
      :sub="device.nickname"
    />
    <div class="fit row wrap justify-center items-center content-center">
      <q-form class="q-gutter-md">
        <div class="row">
          <q-separator />
          <div class="q-pa-sm col-xs-12 col-sm-6 col-md-6">
            <q-input
              standout
              color="white"
              v-model="device.name"
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
          <div class="q-pa-sm col-xs-12 col-sm-6 col-md-6">
            <q-input
              standout
              color="white"
              v-model="device.nickname"
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
          <div class="q-pa-sm col-xs-12 col-sm-6 col-md-6">
            <q-input
              standout
              color="white"
              v-model="device.image"
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
          <div class="q-pa-sm col-xs-12 col-sm-6 col-md-6">
            <q-select
              id="device-parentId"
              standout
              :options="categories"
              v-model="device.categoryId"
              map-options
              emit-value
            />
          </div>
        </div>
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
            label="Cancelar"
            type="cancel"
            color="primary"
            flat
            class="q-ml-sm"
            to="/dashboard"
          />
        </div>
        <br>
      </q-form>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/qtcreator_dark.css'
// import { baseApiUrl } from '../../global'
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
import PageTitle from '../../components/template/PageTitle'
// import { VueEditor } from "vue2-editor"

export default {
  name: 'DeviceById',
  components: { PageTitle },
  data: function () {
    return {
      device: {},
      user: {},
      categories: [],
      customToolbar: [
        []
      ],
    }
  },
  methods: {
    save () {
      this.device.userId = this.user.id
      const method = this.device.id ? 'put' : 'post'
      const id = this.device.id ? `/${this.device.id}` : ''
      axios[method](`${baseApiUrl}/devices${id}`, this.device)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    },
    loadDevice (device) {
      axios.get(`${baseApiUrl}/devices/${device.id}`)
        .then(res => this.device = res.data)
    },
    loadCategories () {
      const url = `${baseApiUrl}/user/${this.user.id}/categories`
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, label: category.path }
        })
      })
    },
  },
  mounted () {
    this.loadUser()
    this.loadDevice(this.$route.params)
    this.loadCategories()
  }
}
</script>

<style>
.device-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.device-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.device-content img {
  max-width: 100%;
}

.device-content :last-child {
  margin-bottom: 0px;
}
</style>
