<template>
  <div class="user-admin q-pa-sm bg-deep-purple-9 square_rounded">
    <q-form
      v-show="showForm"
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
                  this will be your phone login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="user.phone"
            hint="phone - necessário pelo menos 4 caracteres"
            label-slot
            :rules="[ val => val && val.length >= 4 || 'Please type something']"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="mail"
                />
                Informe o phone do Usuário...
                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your phone login... for more info contact your teacher</q-tooltip>
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
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-key"
                />
                Informe a Senha do Usuário...

                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your phone login... for more info contact your teacher
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
                <q-icon
                  class="q-mr-xs"
                  color="deep-orange"
                  size="24px"
                  name="fa fa-key"
                />
                Confirme a Senha do Usuário...
                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                >
                  this will be your phone login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
      </div>

      <q-toggle
        v-model="user.admin"
        label="administrador?"
        checked-icon="fa fa-unlock"
        unchecked-icon="fa fa-lock"
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
      v-show="!showForm"
      :data="users"
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
              @click="loadUser(props.row), props.expand = !props.expand"
            >
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn
              v-if="props.row.admin == false"
              class="bg-red"
              flat
              @click="loadUser(props.row), remove()"
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
                    v-model="user.name"
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
                          this will be your phone login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="user.phone"
                    hint="phone - necessário pelo menos 4 caracteres"
                    label-slot
                    :rules="[ val => val && val.length >= 4 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="mail"
                        />
                        Informe o phone do Usuário...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your phone login... for more info contact your teacher</q-tooltip>
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
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="fa fa-key"
                        />
                        Informe a Senha do Usuário...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your phone login... for more info contact your teacher
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
                        <q-icon
                          class="q-mr-xs"
                          color="deep-orange"
                          size="24px"
                          name="fa fa-key"
                        />
                        Confirme a Senha do Usuário...

                        <q-tooltip
                          content-class="bg-grey-8"
                          anchor="top left"
                          self="bottom left"
                          :offset="[0, 8]"
                        >
                          this will be your phone login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- <q-toggle
                v-model="user.role"
                label="administrador?"
                checked-icon="fa fa-unlock"
                unchecked-icon="fa fa-lock"
              /> -->
              <!-- colocar um select com multiplos strings -->

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
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
  name: 'UserAdmin',
  data: function () {
    return {
      showForm: false,
      expand: false,
      user: {},
      users: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        {
          key: 'admin', label: 'Administrador', sortable: true,
          formatter: value => value ? 'Sim' : 'Não'
        },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    loadUsers () {
      const url = `${baseApiUrl}/users`
      axios.get(url).then(res => {
        this.users = res.data
      })
    },
    reset () {
      this.user = {}
      this.loadUsers()
    },
    save () {
      const method = this.user.id ? 'put' : 'post'
      const id = this.user.id ? `/${this.user.id}` : ''
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
          this.showForm = false
        })
        .catch(showError)
    },
    remove () {
      const id = this.user.id
      axios.delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadUser (user) {
      this.user = { ...user }
    }
  },
  mounted () {
    this.loadUsers()
  }
}
</script>

<style>
.square_rounded {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
