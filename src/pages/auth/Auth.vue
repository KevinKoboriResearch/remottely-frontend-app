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
        style="background-color: #121212; position: absolute; top:15vh;"
        class="text-white"
        :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
      >
        <q-card-section>
          <!-- style="background-color: #00ff99" -->
          <q-avatar
            color="primary"
            size="90px"
            class="absolute-center shadow-10"
          >
            <img src="../../assets/logo/user-logo.png">
          </q-avatar>
        </q-card-section>
        <br>
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
              v-model="user.phone"
              prefix="+55"
              label="Número de celular"
              mask="(##) ##### - ####"
              unmasked-value
              autocomplete="nope"
              type="tel"
            />

            <q-input
              dense
              v-model="user.password"
              label="Senha"
              type="password"
            />

            <q-input
              dense
              v-model="user.confirmPassword"
              label="Confirme a sua senha"
              type="password"
              autocomplete="nope"
            />

            <q-input
              dense
              v-model="user.name"
              label="Nome completo"
            />

            <q-toggle
              v-model="terms"
              class="q-px-none q-mx-none"
              checked-icon="check"
              unchecked-icon="clear"
              :rules="[ val => val === true || 'senhas não conferem', ]"
              autocomplete="nope"
              label="Eu li e aceito os"
            />
            <!-- class="text-black q-px-none q-py-none" -->
            <q-btn
              class="q-mx-xs"
              padding="0px"
              style="padding-right: 5px; padding-left: 5px;"
              label="termos de uso"
              color="primary text-black"
              size="md"
              @click="card = true"
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
              <a
                class="text-primary"
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
        style="background-color: #121212; position: absolute; top:15vh;"
        class="text-white"
        :style="$q.screen.lt.sm?{'width': '80%'}: $q.screen.lt.md? {'width':'45%'} : {'width':'30%'}"
      >
        <q-card-section>
          <!-- style="background-color: #00ff99" -->
          <q-avatar
            color="primary"
            size="90px"
            class="absolute-center shadow-10"
          >
            <img src="../../assets/logo/user-logo.png">
          </q-avatar>
        </q-card-section>
        <br>
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
              v-model="user.phone"
              prefix="+55"
              label="Número de celular"
              mask="(##) ##### - ####"
              unmasked-value
              autocomplete="nope"
              type="tel"
            />

            <!-- <q-input
              filled
              v-model="phone"
              label="Phone"
              mask="(##) ##### - ####"
              fill-mask
              hint="Mask: (##) ##### - ####"
            /> -->

            <q-input
              dense
              v-model="user.password"
              label="Senha"
              type="password"
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
              <!-- style="color: #00ff99;" -->
              <a
                class="text-primary"
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
    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="../../assets/pages/auth/google-maps.png" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Nota média dos usuários
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              2500
              <q-icon name="mdi-account" />
            </div>
          </div>

          <q-rating
            v-model="stars"
            :max="5"
            size="32px"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Localizacão em tempo real
          </div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac efficitur sapien, non euismod dolor. Etiam non pharetra tortor. Aenean enim erat, porttitor a commodo ac, volutpat id sem. Donec eu vehicula nibh. Sed elementum vulputate turpis, sit amet ultricies nunc eleifend cursus. Aliquam scelerisque sem ante, a tristique odio gravida id. Curabitur condimentum et justo malesuada efficitur.

            Curabitur dapibus consequat massa a placerat. Pellentesque ullamcorper maximus purus eget imperdiet. Integer hendrerit eu arcu at pharetra. Vivamus at diam vel elit cursus convallis. Mauris vitae semper nibh. Phasellus ac tincidunt magna. Ut consectetur purus non faucibus finibus. Donec et erat nec tortor cursus fermentum ut et leo. Quisque vel metus leo. Curabitur mi purus, gravida id aliquet vel, accumsan eget nunc.

            Quisque mattis est sed tincidunt eleifend. Nunc efficitur erat vel elit dignissim, in tristique purus sollicitudin. Ut commodo semper tellus in vulputate. Suspendisse sit amet porttitor felis, non pretium ipsum. Aenean tristique sagittis arcu, eget ultricies nisi consectetur a. Proin congue vehicula libero, vel vehicula nulla dignissim sit amet. Maecenas congue gravida convallis. Morbi consectetur sed lectus in pretium. Donec at fringilla felis. Pellentesque congue cursus facilisis. Cras nec erat ac dolor lobortis vulputate quis non elit. Proin commodo volutpat lorem lacinia eleifend. Donec odio diam, placerat fermentum lectus ut, efficitur vulputate leo. Pellentesque in eleifend velit.

            Donec sodales nisl eu nisl aliquam convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eget ullamcorper metus, vel suscipit diam. Sed rutrum neque a libero hendrerit, quis ornare est scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultrices faucibus felis facilisis cursus. Cras et ante risus. Ut porttitor erat non felis interdum, ut dapibus augue pharetra. Sed mollis magna velit, et varius felis luctus vitae. Curabitur commodo auctor velit, vitae tristique nisi dignissim ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Nam faucibus, nibh eu maximus volutpat, nulla ex commodo ex, at iaculis urna est a dolor. Suspendisse potenti. Nunc ac purus sed est placerat facilisis ac vitae felis. Nullam a tortor sit amet ligula vestibulum sagittis quis et ipsum. Maecenas volutpat mauris et justo hendrerit porta. Sed nec orci in sapien luctus convallis. Nullam semper semper sem a gravida. Sed vel orci sollicitudin, finibus justo vitae, blandit orci. Pellentesque accumsan lorem dolor, in porta lorem vestibulum ut. Nulla facilisi. Praesent sit amet augue ac leo congue efficitur. Proin mollis facilisis elementum. Etiam eget tempus leo.

          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Divulgacão dos dados entre usuarios
          </div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac efficitur sapien, non euismod dolor. Etiam non pharetra tortor. Aenean enim erat, porttitor a commodo ac, volutpat id sem. Donec eu vehicula nibh. Sed elementum vulputate turpis, sit amet ultricies nunc eleifend cursus. Aliquam scelerisque sem ante, a tristique odio gravida id. Curabitur condimentum et justo malesuada efficitur.

            Curabitur dapibus consequat massa a placerat. Pellentesque ullamcorper maximus purus eget imperdiet. Integer hendrerit eu arcu at pharetra. Vivamus at diam vel elit cursus convallis. Mauris vitae semper nibh. Phasellus ac tincidunt magna. Ut consectetur purus non faucibus finibus. Donec et erat nec tortor cursus fermentum ut et leo. Quisque vel metus leo. Curabitur mi purus, gravida id aliquet vel, accumsan eget nunc.

            Quisque mattis est sed tincidunt eleifend. Nunc efficitur erat vel elit dignissim, in tristique purus sollicitudin. Ut commodo semper tellus in vulputate. Suspendisse sit amet porttitor felis, non pretium ipsum. Aenean tristique sagittis arcu, eget ultricies nisi consectetur a. Proin congue vehicula libero, vel vehicula nulla dignissim sit amet. Maecenas congue gravida convallis. Morbi consectetur sed lectus in pretium. Donec at fringilla felis. Pellentesque congue cursus facilisis. Cras nec erat ac dolor lobortis vulputate quis non elit. Proin commodo volutpat lorem lacinia eleifend. Donec odio diam, placerat fermentum lectus ut, efficitur vulputate leo. Pellentesque in eleifend velit.

            Donec sodales nisl eu nisl aliquam convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eget ullamcorper metus, vel suscipit diam. Sed rutrum neque a libero hendrerit, quis ornare est scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultrices faucibus felis facilisis cursus. Cras et ante risus. Ut porttitor erat non felis interdum, ut dapibus augue pharetra. Sed mollis magna velit, et varius felis luctus vitae. Curabitur commodo auctor velit, vitae tristique nisi dignissim ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Nam faucibus, nibh eu maximus volutpat, nulla ex commodo ex, at iaculis urna est a dolor. Suspendisse potenti. Nunc ac purus sed est placerat facilisis ac vitae felis. Nullam a tortor sit amet ligula vestibulum sagittis quis et ipsum. Maecenas volutpat mauris et justo hendrerit porta. Sed nec orci in sapien luctus convallis. Nullam semper semper sem a gravida. Sed vel orci sollicitudin, finibus justo vitae, blandit orci. Pellentesque accumsan lorem dolor, in porta lorem vestibulum ut. Nulla facilisi. Praesent sit amet augue ac leo congue efficitur. Proin mollis facilisis elementum. Etiam eget tempus leo.

          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          Eu li e aceito os termos de uso:
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Não"
            @click="terms = false"
          />
          <q-btn
            v-close-popup
            label="Sim"
            color="primary text-black"
            @click="terms = true"
          />
          <!-- icon="event" -->
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      stars: 4,
      card: false,
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
      this.card = true
      // this.$q.dialog({
      //   dark: true,
      //   title: 'Termos de uso',
      //   message: 'Você aceita os termos e condicoes de uso?',
      //   cancel: true,
      //   persistent: true
      // }).onOk(() => {
      //   this.terms = true
      // }).onCancel(() => {
      //   label: 'Termos de uso'
      // }).onDismiss(() => {
      // })
    },
    signIn () {
      // let phone = this.user.phone
      // this.user.phone = '+55' + phone
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/' })
        })
        .catch(showError)
      // this.user.phone = phone
    },
    signUp () {
      if (this.terms === true) {
        // let phone = this.user.phone
        // this.user.phone = '+55' + phone
        console.log(this.user)
        axios.post(`${baseApiUrl}/signup`, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            // console.log(this.user)
            // console.log(this.category)
            // this.addNew()
            this.showSignup = false
          })
          .catch(showError)
        // this.user.phone = phone
      } else {
        // this.dialogTerms()
        this.card = true
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
