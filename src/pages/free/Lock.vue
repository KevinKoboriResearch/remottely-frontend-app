<template>
  <div>
    <label
      v-if="deviceState"
      class="switch"
    >
      <input
        type="checkbox"
        checked
        @click.stop="card=true"
      >
      <span>
        <em></em>
        <strong></strong>
      </span>
    </label>
    <label
      v-else
      class="switch"
    >
      <input type="checkbox">
      <span>
        <em></em>
        <strong></strong>
      </span>
    </label>
    <!-- <q-btn
      class="bg-black"
      @click="deviceState = !deviceState"
      label="testando"
    ></q-btn> -->
    <q-dialog v-model="card">
      <q-card
        class=""
        style="background: #000000cc"
      >
        <UserMapsDialog />
        <!-- <q-img src="../../assets/pages/auth/google-maps.png" /> -->

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h5 ellipsis">
              Muito Longe
            </div>
            <div class="col-auto text-grey text-h5 q-pt-md row no-wrap items-center">
              2500
              <br>
              metros
              <!-- <q-icon name="mdi-account" /> -->
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h6">
            Voce está acima da distancia permitida, insira a senha do aplicativo ou receba um sms para confirmacão de abertura.
          </div>
          <q-input
            dense
            label="Senha"
            type="password"
          />
        </q-card-section>
        <!-- v-model="user.password" -->
        <q-separator />

        <!-- Desejo receber um SMS: -->
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Voltar"
            @click="terms = false"
          />
          <q-btn
            v-close-popup
            label="Senha"
            color="primary text-black"
            @click="terms = true"
          />
          <q-btn
            v-close-popup
            label="Desejo receber um SMS"
            color="primary text-black"
            @click="prompt"
          />
          <!-- icon="event" -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import UserMapsDialog from '../user/UserMapsDialog'

export default {
  components: {
    UserMapsDialog
  },
  data () {
    return {
      deviceState: true,
      card: false,
    }
  },
  methods: {
    prompt () {
      this.$q.dialog({
        title: 'Código enviado para o número: ' + this.$store.state.user.user.phone,
        // message: 'Voce está acima da distancia permitida, insira a senha do aplicativo ou receba um sms para confirmacão de abertura.',
        message: 'Insira o código enviado para seu celular.',
        prompt: {
          model: '',
          isValid: val => val.length > 2, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
      })
    }
  }
}
</script>

<style scoped>
.switch {
  height: 24px;
  display: block;
  position: relative;
  cursor: pointer;
}
.switch input {
  display: none;
}
.switch input + span {
  padding-left: 50px;
  min-height: 24px;
  line-height: 24px;
  display: block;
  color: #fff;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.switch input + span:before,
.switch input + span:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 12px;
}
.switch input + span:before {
  top: 0;
  left: 0;
  width: 42px;
  height: 24px;
  background: #e4ecfa;
  transition: all 0.3s ease;
}
.switch input + span:after {
  width: 18px;
  height: 18px;
  background: #fff;
  top: 3px;
  left: 3px;
  box-shadow: 0 1px 3px rgba(18, 22, 33, 0.1);
  transition: all 0.45s ease;
}
.switch input + span em {
  width: 8px;
  height: 7px;
  background: #99a3ba;
  position: absolute;
  left: 8px;
  bottom: 7px;
  border-radius: 2px;
  display: block;
  z-index: 1;
  transition: all 0.45s ease;
}
.switch input + span em:before {
  content: "";
  width: 2px;
  height: 2px;
  border-radius: 1px;
  background: #fff;
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin: -1px 0 0 -1px;
}
.switch input + span em:after {
  content: "";
  display: block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #99a3ba;
  border-bottom: 0;
  width: 6px;
  height: 4px;
  left: 1px;
  bottom: 6px;
  position: absolute;
  z-index: 1;
  transform-origin: 0 100%;
  transition: all 0.45s ease;
  transform: rotate(-35deg) translate(0, 1px);
}
.switch input + span strong {
  font-weight: normal;
  position: relative;
  display: block;
  top: 1px;
}
.switch input + span strong:before,
.switch input + span strong:after {
  font-size: 14px;
  font-weight: 500;
  display: block;
  font-family: "Mukta Malar", Arial;
  -webkit-backface-visibility: hidden;
}
.switch input + span strong:before {
  content: "Aberto";
  transition: all 0.3s ease 0.2s;
}
.switch input + span strong:after {
  content: "Fechado";
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  transition: all 0.3s ease;
  transform: translate(2px, 0);
}
.switch input:checked + span:before {
  /* background: rgba(86, 40, 238, 0.35); */
  background: #9900ff;
}
.switch input:checked + span:after {
  background: #fff;
  transform: translate(18px, 0);
}
.switch input:checked + span em {
  transform: translate(18px, 0);
  background: #9900ff;
}
.switch input:checked + span em:after {
  border-color: #9900ff;
  transform: rotate(0deg) translate(0, 0);
}
.switch input:checked + span strong:before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translate(-2px, 0);
}
.switch input:checked + span strong:after {
  opacity: 1;
  visibility: visible;
  transform: translate(0, 0);
  transition: all 0.3s ease 0.2s;
}
</style>
