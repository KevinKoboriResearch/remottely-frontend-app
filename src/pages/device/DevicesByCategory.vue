<template>
  <div>
    <PageTitle
      icon="fa fa-user"
      :main="category.name"
      sub="Categoria"
    />
    <!-- <q-btn
      flat
      color="primary"
      @click.stop="onNodeDevice()"
    >
      Editar Categoria
    </q-btn> -->
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
                <q-item-label class="text-white text-h6 text-weight-bolder">{{devices.length == 6 ? '6 ou +' : devices.length }}</q-item-label>
                <q-item-label>devices</q-item-label>
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
                  name="fas fa-users"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">17</q-item-label>
                <q-item-label>Usuarios</q-item-label>
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
                <q-item-label class="text-white text-h6 text-weight-bolder">1023</q-item-label>
                <q-item-label>Acões</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-toolbar :class="$q.dark.isActive ? 'text-white': 'text-black'">
      <q-input
        @change="getDevicesByCategory"
        placeholder="pesquise aqui os artigos desta categoria..."
        dense
        standout
        v-model="searchDevice"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchDevice === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchDevice = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <div class="fit row wrap justify-start items-start content-start">
      <div
        v-if="searchDevice === '' || device.name.includes(searchDevice) || device.nickname.includes(searchDevice)"
        class="q-pt-md q-px-md col-xs-12 col-sm-6 col-md-4"
        v-for="device in devices"
        :key="device.id"
      >
        <DeviceItem :device="device" />
      </div>
    </div>
    <div class="column justify-center items-center">
      <q-btn
        v-if="loadMore"
        class="bg-orange-14 text-black"
        label="Carregar Mais Dispositivos"
        @click="getDevicesByCategory"
      />
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from '../../global'
import axios from 'axios'
import PageTitle from '../../components/template/PageTitle'
import DeviceItem from './DeviceItem'

export default {
  name: 'DevicesByCategory',
  components: { PageTitle, DeviceItem },
  data () {
    return {
      searchDevice: '',
      searchDeviceAll: '',
      category: {},
      categories: [],
      countCategories: 0,
      count: 0,
      categoryYet: [],
      devices: [],
      page: 1,
      loadMore: false
    }
  },
  methods: {
    // onNodeDevice (id) {
    //   if (this.devices.length >= 0) {
    //     this.$router.push({
    //       name: 'userDeviceByCategory',
    //       params: { id: JSON.parse(this.devices[0].categoryId) }
    //     })
    //   }
    // },
    getCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    getDevicesByCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}/devices?page=${this.page}`
      axios(url).then(res => {
        this.devices = this.devices.concat(res.data)
        this.page++
        let remainder = this.devices.length % 6
        if (remainder == 0) {
          if (res.data.length === 0) {
            this.loadMore = false
          }
          else {
            this.loadMore = true
          }
        } else {
          this.loadMore = false
        }
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
      this.devices = []
      this.page = 1
      // this.loadMore = true

      this.getCategory()
      this.getDevicesByCategory()
      this.loadCategories()
    }
  },
  mounted () {
    this.category.id = this.$route.params.id
    this.getCategory()
    this.getDevicesByCategory()
    this.loadCategories()
  }
}
</script>
