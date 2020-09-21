<template>
  <div class="fit row wrap justify-center items-center content-center">
    <div
      class="q-pa-md"
      style="max-width: 400px"
    >
      {{user}}

      <!-- @submit="onSubmit"
        @reset="onReset" -->
      <!-- <div id="google-signin-button"></div> -->
      <!-- <div id="google-signin-button"></div> -->

      <!-- <facebook-login
          class="button"
          appId="326022817735322"
          @login="getUserData"
          @logout="onLogout"
          @get-initial-status="getUserData"
        >
        </facebook-login> -->

      <!-- class="button" -->
      signup
      <!-- @login="signUp('facebook')" -->
      <!-- <facebook-login
        appId="623142018572569"
        @login="signUp('facebook')"
        @logout="onLogout"
        @get-initial-status="getUserData"
        @sdk-loaded="sdkLoaded"
      >
      </facebook-login> -->
      <!-- login -->
      <facebook-login
        appId="623142018572569"
        @login="onLogin"
        @logout="onLogout"
        @get-initial-status="getUserData"
        @sdk-loaded="sdkLoaded"
      >
      </facebook-login>
      <div v-if="isConnected">
        <h1>My Facebook Information</h1>
        <div>
          <!-- <div class="list-item"> -->
          <img :src="user.image">
          <!-- </div> -->
          <!-- <div class="list-item"> -->
          <p>{{user.name}}</p>
          <!-- </div> -->
          <!-- <div class="list-item"> -->
          <p>{{user.email}}</p>
          <!-- </div> -->
          <!-- <div class="list-item"> -->
          <p>{{user.password}}</p>
          <!-- </div> -->
        </div>
      </div>
      <!-- <q-form class="q-gutter-md">

        <q-input
          filled
          v-model="user.name"
          label="Nome e sobrenome"
          lazy-rules
          :rules="[ val => val && val.length >= 7 && /\s/.test(val) || 'Insira o nome completo']"
        />

        <q-input
          filled
          type="number"
          v-model="user.age"
          label="Your age *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Insira apenas números',
          val => val > 0 && val < 100 || 'Insira uma idade real'
        ]"
        />

        <q-input
          filled
          v-model="user.email"
          label="Email"
          type="email"
          lazy-rules
          :rules="[ val => val && val.length >= 7 && /\s/.test(val) || 'Insira um email válido']"
        />

        <q-input
          filled
          v-model="user.password"
          label="Senha"
          type="password"
          lazy-rules
          :rules="[ val => val && val.length >= 6 && !/\s/.test(val) || 'minimo 6 caracteres, sem espaços em branco...', ]"
        />

        <q-input
          filled
          v-model="user.confirmPassword"
          label="Confirme a sua senha"
          type="password"
          lazy-rules
          :rules="[ val => user.password === user.confirmPassword || 'senhas não conferem', ]"
        />
        <q-toggle
          v-model="terms"
          label="I accept the license and terms"
          :rules="[ val => val === true || 'senhas não conferem', ]"
        />

        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            @click="signup()"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form> -->

    </div>

    <!-- <div class="auth-content">
      <div class="auth-modal">
        <img
          src="../../assets/favicon.png"
          width="200"
          alt="Logo"
        />
        <hr>
        <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

        <input
          v-if="showSignup"
          v-model="user.name"
          type="text"
          placeholder="Nome"
        >
        <input
          v-model="user.email"
          name="email"
          type="text"
          placeholder="E-mail"
        >
        <input
          v-model="user.password"
          name="password"
          type="password"
          placeholder="Senha"
        >
        <input
          v-if="showSignup"
          v-model="user.confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
        >

        <button
          v-if="showSignup"
          @click="signup"
        >Registrar</button>
        <button
          v-else
          @click="signin"
        >Entrar</button>

        <a
          href
          @click.prevent="showSignup = !showSignup"
        >
          <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
          <span v-else>Não tem cadastro? Registre-se aqui!</span>
        </a>
      </div>
    </div> -->
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
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',
      FB: undefined
    }
  },
  methods: {
    onSignIn (user) {
      const profile = user.getBasicProfile()
    },
    getUserData () {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          // this.personalID = user.id;
          // this.email = user.email;
          // this.name = user.name;
          // this.picture = user.picture.data.url;
          this.user.email = user.email;
          this.user.name = user.name;
          this.user.password = user.id;
          this.user.confirmPassword = user.id;
          this.user.image = user.picture.data.url;
        }
      )
      return this.user
    },
    sdkLoaded (payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin () {
      // this.isConnected = true
      // this.getUserData()
      // if (val === 'signIn') {
      //   this.terms = true
      //   this.signIn('facebook')
      // } else if (val === 'signUp') {
      //   this.terms = true
      this.isConnected = true
      this.getUserData()
      this.signUp()
      // }
    },
    onLogout () {
      this.isConnected = false;
    },
    dialogTerms () {
      this.$q.dialog({
        dark: true,
        title: 'Apagar',
        message: 'É preciso aceitar os termos',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.terms = true
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    signIn (val) {
      // if (val === 'google') {
      //   //google
      // } else if (val === 'facebook') {
      //   // this.isConnected = true
      //   // this.getUserData()
      //   axios.post(`${baseApiUrl}/signin`, this.getUserData())
      //     .then(res => {
      //       this.$store.commit('user/setUser', res.data)
      //       localStorage.setItem(userKey, JSON.stringify(res.data))
      //       this.$router.push({ path: '/' })
      //     })
      //     .catch(showError)
      // } else {
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/' })
        })
        .catch(showError)
      // }
    },
    signUp (val) {
      // // this.terms = true
      // // if (this.terms === true) {
      // if (val === 'google') {
      //   //google
      // } else if (val === 'facebook') {
      //   // this.isConnected = true
      //   // this.getUserData()
      //   console.log('signup facebook')
      //   axios.post(`${baseApiUrl}/signup`, this.getUserData())
      //     .then(() => {
      //       this.$toasted.global.defaultSuccess()
      //       this.user = {}
      //       this.showSignup = false
      //     })
      //     .catch(showError)
      // } else {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.user = {}
          this.showSignup = false
        })
        .catch(showError)
      // }
      // } else {
      //   this.dialogTerms()
      // }
    }
  },
  mounted () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
}
</script>
