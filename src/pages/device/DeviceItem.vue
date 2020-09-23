<template>
  <q-card class="q-mb-md">
    <q-card-section horizontal>
      <q-img
        v-if="device.image"
        class="col-5"
        :src="device.image"
        style="min-height: 150px;"
        alt="Device"
      />
      <q-img
        v-else
        class="col-5"
        :src="require('../../assets/article/1.gif')"
        alt="Device"
      />
      <q-card-section class="q-pt-xs">
        <div class="text-overline text-orange">{{ device.categoryName }}
        </div>
        <div class="text-h6 q-mt-sm q-mb-xs">
          {{device.name}}
          <!-- {{ $mq === 'xs' ? (device.name.length > 17 ? device.name.substring(0,15) + '...' : device.name) : $mq === 'sm' ?
            (device.name.length > 13 ? device.name.substring(0,11) + '...' : device.name) : (device.name.length > 15 ? device.name.substring(0,13) + '...' : device.name)}} -->
        </div>
        <div class="text-caption text-grey">
          {{device.nickname}}
          <!-- {{ $mq === 'xs' ? (device.nickname.length > 28 ? device.nickname.substring(0,26) + '...' : device.nickname)
            : $mq === 'sm' ? device.nickname.substring(0,50)
            : device.nickname.substring(0,80)}} -->
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        color="primary"
        class="text-black q-mr-md"
        :to="{ name: 'deviceById', params: { id: device.id } }"
      >
        Editar
      </q-btn>
      <!-- <q-btn
        flat
        color="primary"
        @click.stop="onNodeDevices()"
      >
        editar
      </q-btn> -->
      <Lock />
      <!-- <q-btn
        flat
        color="primary"
        @click.stop="estado = !estado"
      >
        {{ estado | abrirFechar}}
      </q-btn> -->
    </q-card-actions>
  </q-card>
</template>

<script>
import Lock from './Lock'

export default {
  name: 'DeviceItem',
  props: ['device'],
  // filters: {
  //   abrirFechar (val) {
  //     if (val == false) {
  //       return 'fechado'
  //     } else {
  //       return 'aberto'
  //     }
  //   }
  // },
  components: { Lock },
  data () {
    return {
      estado: false,
      // descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    // onNodeDevices (id) {
    //   this.$router.push({
    //     name: 'userDevicesByCategory',
    //     params: { id: JSON.parse(this.device.categoryId) }
    //   })
    // }
  }
}
</script>

<style>
.device-item {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.device-item a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.device-item-info h2 {
  font-size: 1.7rem;
}

.device-item-image {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.device-item-image img {
  border-radius: 5px;
}

.device-item-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.device-item-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
