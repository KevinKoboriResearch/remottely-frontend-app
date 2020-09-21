<template>
  <div class="category-admin">
    <b-form>
      <!-- {{count}}
      {{limit}} -->
      <input id="category-id" type="hidden" v-model="category.id" />
        <b-form-group label="Nome:" label-for="category-name">
          <b-form-input id="category-name" type="text"
            v-model="category.name" required
            :readonly="mode === 'remove'"
            placeholder="Informe o Nome da Categoria..." />
        </b-form-group>
        <b-form-group label="Categoria Pai:" label-for="category-parentId">
          <b-form-select
            id="category-parentId"
            :options="categories" v-model="category.parentId" />
          <b-form-input
            id="category-parentId" type="text"
            v-model="category.path"
            readonly />
        </b-form-group>
        <b-button variant="primary" v-if="mode === 'save'"
          @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'"
          @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <q-form
      v-show="showForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
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
                <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                  Informe o Nome do Usuário...

                <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
         <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <!-- v-model="category.path"
          :options="categories" -->
        <q-select
          label="Standout"
          standout
          :options="categories"
          v-model="category.parentId"
        />
        {{category.parentId}}
         </div>
      </div>
<!--
      <q-toggle v-model="user.admin" label="administrador?" checked-icon="fa fa-unlock" unchecked-icon="fa fa-lock" />

      <div class="row">
        <q-btn @click="save" label="Submit" type="submit" color="primary"/>
        <q-btn @click="reset" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-space/>
        <q-btn @click="showForm = false" label="Cancelar" type="cancel" color="primary" flat class="q-ml-sm" />
      </div> -->
    </q-form>
    <hr>
    <b-table hover striped :items="categories" :fields="fields">
      <!-- <div class="bg-red q-pa-xl"></div> -->
      <q-btn>oi</q-btn>
      <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
      </b-button>
      <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
      </b-button>
    </b-table>
    <!-- <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" /> -->
    <!-- <q-table
      v-show="!showForm"
      :data="users"
      row-key="name"
      style="min-witdh: 100%;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn flat class="bg-green q-mr-sm" @click="reset(), props.expand = !props.expand, showForm = !showForm">
              <i class="fa fa-user-plus"></i>
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
            <q-btn class="bg-yellow q-mr-sm" flat v-show="!showForm" @click="loadUser(props.row), props.expand = !props.expand">
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn class="bg-red" flat v-show="!showForm" @click="loadUser(props.row), remove()">
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
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="user.name"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 4 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                        Informe o Nome do Usuário...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
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
                    v-model="user.email"
                    hint="Email - necessário pelo menos 4 caracteres"
                    label-slot
                    :rules="[ val => val && val.length >= 4 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="mail" />
                        Informe o Email do Usuário...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                          this will be your email login... for more info contact your teacher</q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="user.password"
                    label-slot
                    hint="Senha - necessário pelo menos 6 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 6 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-key" />
                        Informe a Senha do Usuário...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
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
                    v-model="user.confirmPassword"
                    label-slot
                    hint="Reinsira a senha - necessário pelo menos 6 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 4|| 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-key" />
                        Confirme a Senha do Usuário...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
              </div>

              <q-toggle v-model="user.admin" label="administrador?" checked-icon="fa fa-unlock" unchecked-icon="fa fa-lock" />

              <div class="row">
                <q-btn @click="save" label="Submit" type="submit" color="primary"/>
                <q-btn @click="reset" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                <q-space/>
                <q-btn @click="showForm = false" label="Cancelar" type="cancel" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table> -->
  </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
  name: 'CategoryAdmin',
  data () {
    return {
      // options: [
      //   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      // ],
      // logLevels: [
      //   {
      //     id: 0,
      //     level: 'Information'
      //   },
      //   {
      //     id: 1,
      //     level: 'Warnings and Errors'
      //   }
      // ],
      showForm: true,
      mode: 'save',
      category: {},
      categories: [],
      limit: 0,
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  // computed: {
  //   status: {
  //     get () { return this.$store.state.search.status },
  //     set (value) { this.$store.commit('setStatus', value) }
  //   }
  // },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`
      axios.get(url).then(res => {
        // this.categories = res.data
        // this.categories = res.data.data.map(category => {
          this.categories = res.data.map(category => {
            return { ...category, value: category.id, text: category.path }
        })
        // this.count = res.data.count
        // this.limit = res.data.limit
      })
    },
    reset() {
      this.mode = 'save'
      this.category = {}
      this.loadCategories()
    },
    save() {
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.category.id
      axios.delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
        })
        .catch(showError)
    },
    loadCategory(category, mode = 'save') {
      this.mode = mode
      // this.category = { ...category }
      this.category = {
        id: category.id,
        name: category.name,
        parentaId: category.parentId
      }
    }
  },
  mounted() {
    this.loadCategories()
  }
}
</script>

<style>

</style>
