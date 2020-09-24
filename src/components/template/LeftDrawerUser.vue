<template>
  <div>
    <q-card
      square
      flat
      class="bg-transparent q-pa-sm q-pt-md"
    >
      <q-card-section vertical>
        <div class="row content-center items-center justify-center">
          <q-btn
            @click="perfilPhoto = true"
            round
          >
            <q-avatar
              class="q-px-sm bg-primary"
              size="100px"
            >
              <!-- :src="dataUrl" -->
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <!-- <div class="justify-center"> -->
        <div class="row justify-center text-h6">
          {{$store.state.user.user.name}}
        </div>
        <div class="row justify-center text-subtitle2 q-mb-md">
          {{$store.state.user.user.phone}}

        </div>
        <!-- </div> -->
      </q-card-section>

      <q-separator
        color="primary"
        inset
      />
      <q-btn
        align="left"
        flat
        spread
        class="q-mb-md q-mt-lg"
        style="width:100%;"
        label="Histórico de acessos"
        to='/user/devices-history'
      />
      <!-- <q-btn
        align="left"
        flat
        spread
        class="q-mb-md"
        style="width:100%;"
        label="Configuracoes das chaves"
        to='/user/device-history'
      /> -->
      <q-btn
        align="left"
        flat
        spread
        class="q-mb-md"
        style="width:100%;"
        label="Notificacões"
        to='/user/notifications'
      />
      <!-- <q-btn
        align="left"
        flat
        spread
        class="q-mb-md"
        style="width:100%;"
        label="Usuários"
        to='/user/profile'
      /> -->
      <q-btn
        align="left"
        flat
        spread
        class="q-mb-md"
        style="width:100%;"
        label="Meu Perfil"
        to='/user/profile'
      />
      <q-btn
        align="left"
        flat
        spread
        class="q-mb-md"
        style="width:100%;"
        label="Contrate-nos aqui"
        to='/'
      />
    </q-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
