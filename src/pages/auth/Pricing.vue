<template>
  <div class="selectDisable fit row wrap justify-center items-center content-center">
    <!-- {{$route.fullPath}} -->
    <!-- position: absolute; top:6vh; -->
    <q-card
      v-if="showSignup"
      style="background-color: #c1f4ff55;"
      class="text-black"
      :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
    >
      <q-card-section>
        <q-avatar
          style="background-color: #c1f4ffaa"
          size="90px"
          class="absolute-center shadow-10"
        >
          <img src="../../assets/logo/user-logo.png">
        </q-avatar>
      </q-card-section>
      <!-- <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">
            Registro
          </div>
        </div>
      </q-card-section> -->
      <q-card-section>
        <q-form
              @submit="onSubmit"
      @reset="onReset"
          class="q-gutter-md"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-input
            dense
            color="black"
            v-model="user.name"
            label="Nome e sobrenome"
            lazy-rules
          />
            <!-- :rules="[ val => val && val.length >= 7 && /\s/.test(val) || 'Insira o nome completo']" -->

          <q-input
            dense
            color="black"
            v-model="user.email"
            label="Email"
            lazy-rules
            autocomplete="nope"
            type="email"
          />
          <!-- :rules="[ val => val && !/\s/.test(val) && !this.test(String(val).toLowerCase()) || 'Insira um email válido']" -->
          <!-- :rules="[ val => val && !/\s/.test(val) && !this.reg.test(val) || 'Insira um email válido']" -->

          <q-input
            dense
            color="black"
            v-model="user.password"
            label="Senha"
            type="password"
            lazy-rules
          />
            <!-- :rules="[ val => val && val.length >= 6 && !/\s/.test(val) || 'minimo 6 caracteres, sem espaços em branco...', ]" -->

          <q-input
            dense
            color="black"
            v-model="user.confirmPassword"
            label="Confirme a sua senha"
            type="password"
            lazy-rules
            autocomplete="nope"
          />
            <!-- :rules="[ val => user.password === user.confirmPassword || 'senhas não conferem', ]" -->
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
              color="primary"
              flat
              class="q-ml-sm"
              @click="user = {}"
            />
            <q-btn
              label="Registrar"
              type="submit"
              color="primary"
              @click="signUp()"
            />
          </q-card-actions>
          <q-card-actions
            vertical
            align="center"
          >Já tem cadastro?
            <a
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
      style="background-color: #c1f4ff55; position: absolute; top:19vh;"
      class="text-black"
      :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
    >
      <q-card-section>
        <q-avatar
          style="background-color: #c1f4ffaa"
          size="90px"
          class="absolute-center shadow-10"
        >
          <img src="../../assets/logo/user-logo.png">
        </q-avatar>
      </q-card-section>
      <!-- <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">
            Log in
          </div>
        </div>
      </q-card-section> -->
      <q-card-section>
        <q-form
              @submit="onSubmit"
      @reset="onReset"
          class="q-gutter-md"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-input
            dense
            color="black"
            v-model="user.email"
            label="Email"
            lazy-rules
            autocomplete="nope"
            type="email"
          />

          <q-input
            dense
            color="black"
            v-model="user.password"
            label="Senha"
            type="password"
            lazy-rules
          />
          <!-- :rules="[ val => val && val.length >= 6 && !/\s/.test(val) || 'minimo 6 caracteres, sem espaços em branco...', ]" -->
          <q-card-actions align="right">
            <q-btn
              label="Limpar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="user = {}"
            />
            <q-btn
              label="Entrar"
              type="submit"
              color="primary"
              @click="signIn()"
            />
          </q-card-actions>
          <q-card-actions
            vertical
            align="center"
          >Não tem cadastro?
            <a
              class="text-white"
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
</template>

<script>
//   name: "Pricing",
//   data () {
//     return {
//       year: (new Date()).getFullYear(),
//       username: 'Pratik',
//       password: '12345'
//     }
//   }
// }
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: 'Auth',
  components: {
    facebookLogin
  },
  data () {
    return {
      // year: (new Date()).getFullYear(),
      showSignup: false,
      user: {},
      terms: false,
      FB: undefined,
      // reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  computed: {
    isConnected: {
      get () {
        return this.$store.state.user.isConnectedFacebook
      },
      set (val) {
        this.$store.commit('user/setFacebookUser', val)
      }
    }
  },
  methods: {
    //google
    onSignIn (user) {
      const profile = user.getBasicProfile()
    },
    //facebook
    getUserData (val) {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          this.user.name = user.name;
          this.user.email = user.email;
          this.user.password = user.id;
          this.user.confirmPassword = user.id;
          this.user.image = user.picture.data.url;
          this.isConnected = true
          if (val === true) {
            axios.post(`${baseApiUrl}/signin`, this.user)
              .then(res => {
                this.$store.commit('user/setUser', res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                this.$router.push({ path: '/' })
              })
              .catch(showError)
          } else {
            axios.post(`${baseApiUrl}/signup`, this.user)
              .then(() => {
                this.$toasted.global.defaultSuccess()
                this.showSignup = false
              })
              .catch(showError)
          }
        }
      )
    },
    sdkLoaded (payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin (val) {
      this.getUserData(val)
      // this.getUserData()
      // if (val === 'signIn') {
      //   this.signIn()
      // } else {
      //   this.dialogTerms()
      //   this.signUp()
      // }
    },
    onLogout () {
      this.isConnected = false;
    },
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
            this.showSignup = false
          })
          .catch(showError)
      } else {
        this.dialogTerms()
      }
    }
  },
  mounted () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
}
</script>
