<template>
  <div class="fit row wrap justify-center items-center content-center">
    <div
      class="q-pa-md"
      style="min-width: 300px; max-width: 300px;"
    >
      <q-card>
        {{user}}
        {{isConnected}}
        <!-- {{showSignup}} -->
        <div id="google-signin-button"></div>
        <facebook-login
          appId="623142018572569"
          @login="getUserData(true)"
          @logout="onLogout"
          @get-initial-status="getUserData"
          @sdk-loaded="sdkLoaded"
        >
        </facebook-login>
        <facebook-login
          appId="623142018572569"
          @login="getUserData(false)"
          @logout="onLogout"
          @get-initial-status="getUserData"
          @sdk-loaded="sdkLoaded"
        >
        </facebook-login>

        <q-form
              @submit="onSubmit"
      @reset="onReset"
          class="q-gutter-md"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <!-- style="min-width: 300px; max-width: 300px;" -->

          <q-input
            v-if="showSignup"
            filled
            v-model="user.name"
            label="Nome e sobrenome"
            lazy-rules
            :rules="[ val => val && val.length >= 7 && /\s/.test(val) || 'Insira o nome completo']"
          />

          <q-input
            filled
            v-model="user.email"
            label="Email"
            lazy-rules
            autocomplete="nope"
          />
          <!-- type="email"
          :rules="[ val => val && !/\s/.test(val) && !this.reg.test(val) || 'Insira um email válido']" -->

          <q-input
            filled
            v-model="user.password"
            label="Senha"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length >= 6 && !/\s/.test(val) || 'minimo 6 caracteres, sem espaços em branco...', ]"
          />

          <q-input
            v-if="showSignup"
            filled
            v-model="user.confirmPassword"
            label="Confirme a sua senha"
            type="password"
            lazy-rules
            :rules="[ val => user.password === user.confirmPassword || 'senhas não conferem', ]"
            autocomplete="nope"
          />
          <q-toggle
            v-if="showSignup"
            v-model="terms"
            label="I accept the license and terms"
            :rules="[ val => val === true || 'senhas não conferem', ]"
            autocomplete="nope"
          />

          <div>
            <q-btn
              v-if="showSignup"
              label="Registrar"
              type="submit"
              color="primary"
              @click="signUp()"
            />
            <q-btn
              v-else
              label="Entrar"
              type="submit"
              color="primary"
              @click="signIn()"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <div>
              <a
                href
                @click.prevent="showSignup = !showSignup"
              >
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
              </a>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
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
      showSignup: false,
      user: {},
      terms: false,
      FB: undefined,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
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
<style scoped>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
