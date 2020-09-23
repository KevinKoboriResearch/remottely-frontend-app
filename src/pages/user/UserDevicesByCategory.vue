<template>
  <div>
    <!-- {{device}}
    {{devices}} -->
    <q-form
      v-show="showForm"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="device.name"
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
            v-model="device.nickname"
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
            v-model="device.imageUrl"
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
            id="device-parentId"
            standout
            :options="categories"
            v-model="device.categoryId"
            map-options
            emit-value
          />
        </div>
        <!-- user: {{user}}
        <br>
        device: {{device}}
        <br>
        devices: {{devices}}
        <br>
        categories: {{categories}} -->
        <!-- <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-select
            id="category-parentId"
            standout
            :options="users"
            v-model="device.userId"
            map-options
            emit-value
          />
        </div> -->
      </div>
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
      :data="devices"
      row-key="name"
      style="min-witdh: 100%;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn
              flat
              class="bg-green q-mr-sm"
              @click="reset(),
              device.content = `<pre class=\'ql-syntax\' spellcheck=\'false\'>\nDigite aqui dentro o seu código fonte...</pre>`,
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
              {{ col.label == 'Name' ? '' : col.label }}
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
              @click="getDevice(props.row), props.expand = !props.expand"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn
              class="bg-red"
              flat
              @click="getDevice(props.row), confirmDelete()"
            >
              <i class="fa fa-trash-alt"></i>
            </q-btn>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
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
                    v-model="device.name"
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
                    v-model="device.nickname"
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
                    v-model="device.imageUrl"
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
                    id="device-parentId"
                    standout
                    :options="categories"
                    v-model="device.categoryId"
                    map-options
                    emit-value
                  />
                </div>
              </div>
              <vue-editor
                id="editor"
                v-model="device.content"
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
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
import { QSpinnerGears } from 'quasar'
import { VueEditor } from "vue2-editor"

export default {
  name: 'UserDevicesByCategory',
  components: { VueEditor },
  data: function () {
    return {
      showForm: false,
      device: {},
      devices: [],
      category: {},
      categories: [],
      user: {},
      defaultCodeEditor: 0
    }
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
      this.device = {}
    },
    save (val) {
      this.device.userId = this.user.id
      const method = this.device.id ? 'put' : 'post'
      const id = this.device.id ? `/${this.device.id}` : ''
      axios[method](`${baseApiUrl}/devices${id}`, this.device)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
    remove () {
      const id = this.device.id
      axios.delete(`${baseApiUrl}/devices/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    getCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    getDevicesByCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}/devices`
      axios(url).then(res => {
        this.devices = res.data
        // .map(device => {
        //   return { id: device.id, name: device.name, : device.id }
        // })
        //  this.categories = res.data.map(category => {
        //   return { ...category, label: category.path, value: category.id }
        // })
        //this.devices.concat(res.data)
        // this.page++

        // if (res.data.length === 0) this.loadMore = false
      })
    },
    getDevice (device) {
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
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    }
  },
  watch: {
    $route (to) {
      this.category.id = to.params.id
      this.devices = []
      // this.page = 1
      // this.loadMore = true

      this.getCategory()
      this.getDevicesByCategory()
    }
  },
  mounted () {
    this.category.id = this.$route.params.id
    this.loadUser()
    this.getCategory()
    this.getDevicesByCategory()
  }
  // watch: {
  //   page () {
  //     this.getDevices()
  //   }
  // },
  // mounted () {
  //   this.loadUser()
  //   // this.loadUsers()
  //   this.loadCategories()
  //   this.getDevices()
  // }
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
