<template>
  <q-page class="bg-black">
    <!-- <q-page
    class="selectDisable"
    style="background:linear-gradient( 180deg, #16434d 0%, #c1f4ff 100%)"
  >
    <q-header class="bg-transparent">
      <q-toolbar v-scrollanimation>
        <q-space />

        <div>
          <img
            style="margin-top: 8px;"
            class="q-px-sm"
            to="/"
            src="../../assets/logo/remottely.png"
            height="22"
          >
          <q-tooltip v-if="$q.screen.gt.xs">theme</q-tooltip>
        </div>

        <q-space />
      </q-toolbar>
    </q-header> -->
    <div class="fit row wrap justify-center items-center content-center">
      <q-card
        v-if="showSignup"
        style="background-color: #333; position: absolute; top:19vh;"
        class="text-white"
        :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
      >
        <q-card-section>
          <q-avatar
            style="background-color: #00ff99"
            size="90px"
            class="absolute-center shadow-10"
          >
            <img src="../../assets/logo/user-logo.png">
          </q-avatar>
        </q-card-section>
        <br>
        <q-card-section>
          <q-form
            class="q-gutter-md"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
          >

            <q-input
              dense
              v-model="user.email"
              label="Email"
              lazy-rules
              autocomplete="nope"
              type="email"
            />

            <q-input
              dense
              v-model="user.password"
              label="Senha"
              type="password"
              lazy-rules
            />

            <q-input
              dense
              v-model="user.confirmPassword"
              label="Confirme a sua senha"
              type="password"
              lazy-rules
              autocomplete="nope"
            />

            <q-input
              dense
              v-model="user.name"
              label="Nome e sobrenome"
              lazy-rules
            />

            <q-toggle
              v-model="terms"
              label="I accept the license and terms"
              :rules="[ val => val === true || 'senhas não conferem', ]"
              autocomplete="nope"
            />
            <q-card-actions align="right">
              <q-btn
                label="Limpar"
                type="reset"
                color="white"
                flat
                class="q-ml-sm"
                @click="user = {}"
              />
              <q-btn
                label="Registrar"
                type="submit"
                color="black"
                @click="signUp()"
              />
            </q-card-actions>
            <q-card-actions
              vertical
              align="center"
            >Já tem cadastro?
              <!-- class="text-" -->
              <a
                style="color: #00ff99;"
                href
                @click.prevent="showSignup = !showSignup"
              >
                <span> Acesse o Login!</span>
              </a>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
      <q-card
        v-else
        style="background-color: #333; position: absolute; top:19vh;"
        class="text-white"
        :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
      >
        <q-card-section>
          <q-avatar
            style="background-color: #00ff99"
            size="90px"
            class="absolute-center shadow-10"
          >
            <img src="../../assets/logo/user-logo.png">
          </q-avatar>
        </q-card-section>
        <br>
        <q-card-section>
          <q-form
            class="q-gutter-md"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
          >

            <q-input
              dense
              v-model="user.email"
              label="Email"
              lazy-rules
              autocomplete="nope"
              type="email"
            />

            <q-input
              dense
              v-model="user.password"
              label="Senha"
              type="password"
              lazy-rules
            />

            <q-card-actions align="right">
              <q-btn
                label="Limpar"
                type="reset"
                color="white"
                flat
                class="q-ml-sm"
                @click="user = {}"
              />
              <q-btn
                label="Entrar"
                type="submit"
                color="black"
                @click="signIn()"
              />
            </q-card-actions>
            <q-card-actions
              vertical
              align="center"
            >Não tem cadastro?
              <a
                style="color: #00ff99;"
                href
                @click.prevent="showSignup=!showSignup"
              >
                <span> Registre-se aqui!</span>
              </a>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <!-- <q-page-sticky
      position="bottom-left"
      :offset="[10, 10]"
    >
      <q-btn
        class="text-black"
        label="voltar"
        to="/about"
      />
    </q-page-sticky>
  </q-page> -->
  </q-page>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'

export default {
  name: 'Auth',
  data () {
    return {
      // category: {},
      showSignup: false,
      user: {},
      terms: false,
      re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  // computed: {
  //   isConnected: {
  //     get () {
  //       return this.$store.state.user.isConnectedFacebook
  //     },
  //     set (val) {
  //       this.$store.commit('user/setFacebookUser', val)
  //     }
  //   }
  // },
  methods: {
    dialogTerms () {
      this.$q.dialog({
        dark: true,
        title: 'Apagar',
        message: 'Você aceita os termos e condicoes de uso?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.terms = true
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    signIn () {
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/' })
        })
        .catch(showError)
    },
    signUp () {
      if (this.terms === true) {
        axios.post(`${baseApiUrl}/signup`, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            // console.log(this.user)
            // console.log(this.category)
            // this.addNew()
            this.showSignup = false
          })
          .catch(showError)
      } else {
        this.dialogTerms()
      }
    },
    // makeid (length) {
    //   var result = '';
    //   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //   var charactersLength = characters.length;
    //   for (var i = 0; i < length; i++) {
    //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //   }
    //   return result;
    // },
    // addNew () {
    //   this.category = {}
    //   this.category.name = ' movel '
    //   this.category.userId = 18
    //   const method = 'post'
    //   const id = ''
    //   axios[method](`${baseApiUrl}/categories${id}`, this.category)
    //     .then(() => {
    //       this.$toasted.global.defaultSuccess()
    //       // this.forceRerenderTree()
    //     })
    //     .catch(showError)
    // }
    // addNew () {
    //   // axios.post(`${baseApiUrl}/signin`, this.user)
    //   //   .then(res => {
    //   //     this.user = JSON.stringify(res.data)
    //   //     console.log(this.user.id)
    //   // this.$store.commit('user/setUser', res.data)
    //   // localStorage.setItem(userKey, JSON.stringify(res.data))
    //   // this.$router.push({ path: '/' })
    //   this.category.id = null
    //   this.category.name = ' movel '
    //   this.category.userId = 18//this.user.id
    //   this.category.parentid = null
    //   // const method = this.category.id ? 'put' : 'post'
    //   // const id = this.category.id ? `/${this.category.id}` : ''
    //   axios.post(`${baseApiUrl}/categories`, this.category)
    //     .then(() => {
    //       this.$toasted.global.defaultSuccess()
    //     })
    //     .catch(showError)
    //   // })
    // },
  }
}
</script>
