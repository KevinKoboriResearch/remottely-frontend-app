<template>
  <div class="category-admin">
    <!-- {{categories}}
    {{category}} -->
    <!-- {{user}} -->
    <q-form
      v-show="showForm"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="category.name"
            label-slot
            clearable
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <!-- hint="Nome - necessário pelo menos 4 caracteres" -->
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-user-tie"
                />
                Informe o Nome do Usuário...

                <!-- <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                  this will be your email login... for more info contact your teacher
                </q-tooltip> -->
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-select
            id="category-parentId"
            standout
            :options="categories"
            v-model="category.parentId"
            map-options
            emit-value
          />
        </div>
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
          label="Voltar"
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
      :data="tableCategories"
      row-key="name"
      separator="cell"
      style="min-witdh: 100%;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn
              flat
              class="bg-green q-mr-sm"
              @click="reset(), props.expand = !props.expand, showForm = !showForm"
            >
              <i class="fa fa-user-plus"></i>
            </q-btn>
            <q-btn
              flat
              class="bg-yellow q-mr-sm"
              @click="$router.go(), $store.commit('adminPages/changeAdminTab', 'categories')"
            >
              <i class="fa fa-sync-alt"></i>
            </q-btn>
          </q-th>
          <q-th
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
          <q-td>
            <q-btn
              class="bg-yellow q-mr-sm"
              flat
              @click="loadCategory(props.row), props.expand = !props.expand"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn
              class="bg-red"
              flat
              @click="loadCategory(props.row), confirmDelete()"
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
            <q-form class="q-gutter-md">
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="category.name"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 4 || 'Please type something']"
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
                        Informe o Nome do Usuário...

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
                    id="category-parentId"
                    standout
                    :options="categories"
                    v-model="category.parentId"
                    map-options
                    emit-value
                  />
                </div>
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
                  @click="props.expand = false"
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
    </q-table>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
import { QSpinnerGears } from 'quasar'

export default {
  name: 'UserCategories',
  data () {
    return {
      user: {},
      showForm: false,
      category: {},
      categories: [],
      tableCategories: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
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
    // loadCategories () {
    //   const url = `${baseApiUrl}/categories`
    //   axios.get(url).then(res => {
    //     this.tableCategories = res.data.map(category => {
    //       return { id: category.id, name: category.name, path: category.path }
    //     })
    //     this.categories = res.data.map(category => {
    //       return { ...category, label: category.path, value: category.id }
    //     })
    //   })
    // },
    loadCategories () {
      // const json = localStorage.getItem(userKey)
      // const user = JSON.parse(json)
      const url = `${baseApiUrl}/user/${this.user.id}/categories`
      // const id = this.user.id
      axios.get(url).then(res => {
        // this.categories = res.data
        this.tableCategories = res.data.map(category => {
          return { id: category.id, name: category.name, path: category.path }
        })
        this.categories = res.data.map(category => {
          return { ...category, label: category.path, value: category.id }
        })
      })
    },
    reset () {
      this.category = {}
      // this.loadCategories()
    },
    save () {
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // window.location.reload()
          // this.$store.commit('adminPages/changeAdminTab', 'categories')
          // this.reset()
          // this.loadCategories()
        })
        .catch(showError)
    },
    remove () {
      const id = this.category.id
      axios.delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadCategory (category) {
      this.category = { ...category }
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    }
  },
  mounted () {
    this.loadUser()
    this.loadCategories()
    this.loadCategory()
  }
}
</script>
