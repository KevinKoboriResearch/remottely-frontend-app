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
            v-model="device.name"
            label-slot
            lazy-rules
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="primary"
                  size="24px"
                  name="fas fa-door-closed"
                />&nbsp;&nbsp;Informe o nome fixo do dispositivo
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
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="primary"
                  size="24px"
                  name="fas fa-door-open"
                />&nbsp;&nbsp;Informe o nome fantasia do dispositivo
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <!-- <q-input
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
                  color="primary"
                  size="24px"
                  name="fas fa-file-image"
                />
                Insira aqui uma imagem
              </div>
            </template>
          </q-input> -->
          <q-uploader
            :url="baseApiUrl + '/user/' + user.id + '/upload-image'"
            :upload-factory="uploadFile"
            label="Carregar foto"
            color="primary"
            text-color="black"
            style="min-width: 100%"
          />
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
          label="Voltar"
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
        class="col-12 bg-primary"
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
      :data="devices"
      :filter="filter"
      :pagination="pagination"
      row-key="name"
      style="min-width: 100%;"
    >
      <!-- :style="$q.screen.gt.xs ? 'min-width: 100%;' : 'max-width: 100%;'" -->
      <template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          devices1
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
              @click="loadDevice(props.row), props.expand = !props.expand"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="loadDevice(props.row), confirmDelete()"
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
                    v-model="device.name"
                    label-slot
                    lazy-rules
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="primary"
                          size="24px"
                          name="fas fa-door-closed"
                        />&nbsp;&nbsp;Informe o nome fixo do dispositivo

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
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="primary"
                          size="24px"
                          name="fas fa-door-open"
                        />&nbsp;&nbsp;Informe o nome fantasia do dispositivo

                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
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
                          color="primary"
                          size="24px"
                          name="fas fa-file-image"
                        />
                        Informe a URL da Imagem...

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
              <div class="row">
                <q-btn
                  @click="save"
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
      :data="devices"
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
          devices2
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
              @click="loadDevice(props.row), props.expand = !props.expand"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="loadDevice(props.row), confirmDelete()"
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
                    v-model="device.name"
                    label-slot
                    lazy-rules
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="primary"
                          size="24px"
                          name="fas fa-door-open"
                        />&nbsp;&nbsp;Informe o nome fixo do dispositivo

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
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="primary"
                          size="24px"
                          name="fas fa-door-open"
                        />&nbsp;&nbsp;Informe o nome fantasia do dispositivo

                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
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
                          color="primary"
                          size="24px"
                          name="fas fa-door-open"
                        />
                        Informe a URL da Imagem...

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
              <div class="row">
                <q-btn
                  @click="save"
                  label="Salvar"
                  v-model="device.content"
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
      :data="devices"
      :pagination="pagination"
      :filter="filter"
      class="q-pa-sm"
      :class="$q.dark.isActive ? 'bg-grey-10 text-white' : 'bg-white text-black'"
    >
      <!-- hide-pagination -->
      <!-- hide-header -->
      <template v-slot:top="props">
        <div class="q-ml-xs text-h6">
          devices3
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
                v-if="props.row.image"
                :src="props.row.image"
                style="max-width: 200px;"
              >
              <q-img
                v-else
                class="col-5"
                :src="require('../../assets/article/1.gif')"
                style="max-width: 200px;"
                alt="device"
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
              <!-- <q-btn
                icon="edit"
                round
                dense
                class="bg-primary text-white"
                @click="loadDevice(props.row), props.expand = !props.expand"
              />
              <q-btn
                icon="delete"
                round
                dense
                class="bg-primary text-white"
                @click="loadDevice(props.row), confirmDelete()"
              /> -->
              <Lock />
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

import Lock from './Lock'
export default {
  name: 'UserDevices',
  components: { Lock },
  data: function () {
    return {
      baseApiUrl: baseApiUrl,
      tableType: 'list',
      showForm: false,
      device: {},
      devices: [],
      categories: [],
      user: {},
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
      return Math.ceil(this.devices.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    // this.pagination.rowsPerPage
  },
  methods: {
    uploadFile (file, updateProgress) {
      // console.log(file.name)
      // console.log(file.path)
      // console.log(file.size)
      // console.log(file.lastModified)
      // // this.device.userId = this.user.id
      const fd = new FormData()
      fd.append('image', file, file.name)
      axios.post(`baseApiUrl/user/${this.user.id}/upload-image`, fd)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // this.user = {}
        })
        .catch(showError)
    },
    confirmDelete () {
      this.$q.dialog({
        dark: true,
        title: 'Apagar',
        message: 'Tem certeza que deseja apagar este dispositivo?',
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
    save () {

      // console.log('oi')
      // console.log(this.device)
      // // console.log(this.user)
      // console.log('oi')
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
    loadDevice (device) {
      axios.get(`${baseApiUrl}/devices/${device.id}`)
        .then(res => this.device = res.data)
    },
    loadUserDevices () {
      const url = `${baseApiUrl}/user/${this.user.id}/devices`
      axios.get(url).then(res => {
        this.devices = res.data
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
    this.loadUserDevices()
  }
}
</script>
