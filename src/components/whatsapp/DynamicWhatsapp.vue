
<template>
  <div>
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
    >
      <q-btn
        @click="open('bottom')"
        v-touch-pan.prevent.mouse="moveFab"
        :disable="draggingFab"
        class="shadow-0 text-white"
        padding="none"
        style="background-color:#000000bb; border-top-left-radius: 50px; border-top-right-radius: 50px;
        border-bottom-left-radius: 0px; border-bottom-right-radius: 50px;"
      >
        <!-- color="light-green-14" -->
        <!-- color="primary" -->
        <q-icon
          name="mdi-whatsapp"
          style="color: #00ff99;"
          size="50px"
        />
      </q-btn>
    </q-page-sticky>
    <q-dialog
      v-model="dialog"
      persistent
      :position="position"
    >
      <q-card
        style="min-width: 310px; min-height: 200px; border-top-left-radius: 7px;
        border-top-right-radius: 7px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
        class="bg-brown-2"
      >
        <q-card-section class="row q-pa-none bg-teal-9">
          <div
            @click="openInNewWindow()"
            class="q-px-md q-py-xs"
          >
            <div class="text-subtitle1 text-white text-weight-bold">Your Projects</div>
            <div class="text-white">+55 61 99342-4369</div>
          </div>
          <q-space />
          <div class="q-py-sm q-px-sm">
            <q-btn
              padding="none"
              icon="mdi-close"
              flat
              color="brown-1"
              size="md"
              class="q-pa-none"
              v-close-popup
            />
          </div>
        </q-card-section>
        <q-card-section class="row q-pb-xs q-pt-sm bg-brown-2">
          <q-space />
          <div
            style="background-color: #cdf5c9ff;border-top-left-radius: 10px; border-top-right-radius: 0px;
            border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
            :class="'q-px-sm q-py-xs text-black ' + shadowElevation"
            @click="openInNewWindow()"
            @mouseover="shadow = true"
            @mouseleave="shadow = false"
          >Olá!
            <q-icon
              loading
              name="mdi-check-all"
              color="light-blue-5"
              size="20px"
              class="q-pa-none q-pl-xs q-pr-none"
            />
          </div>
        </q-card-section>
        <q-card-section class="row q-pb-xs q-pt-xs bg-brown-2">
          <div
            style="background-color: #FFFFFF;border-top-left-radius: 0px; border-top-right-radius: 10px;
            border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
            :class="'q-px-sm q-py-xs text-black ' + shadowElevation2"
            @click="openInNewWindow()"
            @mouseover="shadow2 = true"
            @mouseleave="shadow2 = false"
          >Oi, Seja Bem vindo ao Your Projects!
          </div>
          <q-space />
        </q-card-section>
        <q-card-section class="row q-pb-xs q-pt-sm bg-brown-2">
          <q-space />
          <div
            style="background-color: #cdf5c9ff;border-top-left-radius: 10px; border-top-right-radius: 0px;
            border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
            :class="'q-px-sm q-py-xs text-black ' + shadowElevation"
            @click="openInNewWindow()"
            @mouseover="shadow = true"
            @mouseleave="shadow = false"
          >Tenho interesse em uma aplicação.
            <q-icon
              name="mdi-check-all"
              color="light-blue-5"
              size="20px"
              class="q-pa-none q-pl-xs q-pr-none"
            />
          </div>
        </q-card-section>
        <q-card-section class="row q-pb-xs q-pt-sm bg-brown-2">
          <div
            style="background-color: #FFFFFF;border-top-left-radius: 0px; border-top-right-radius: 10px;
          border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
            :class="'q-px-sm q-py-xs text-black ' + shadowElevation2"
            @click="openInNewWindow()"
            @mouseover="shadow2 = true"
            @mouseleave="shadow2 = false"
          >Como posso ajuda-lo?
          </div>
          <q-space />
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-toolbar class="bg-brown-2">
            <q-input
              @mouseover="shadow = true"
              @mouseleave="shadow = false"
              rounded
              dense
              v-model="text"
              standout="bg-teal-9"
              bg-color="teal-9"
              placeholder="Escreva algo..."
              style="width: 100%;"
            >
              <template v-slot:append>
                <q-icon
                  name="mdi-close-circle"
                  size="xs"
                  class="cursor-pointer"
                  @click="text = ''"
                />
              </template>
            </q-input>
            <q-btn
              round
              flat
              icon="mdi-send"
              color="teal-9"
              size="10px"
              class="q-pl-sm"
              @click="openInNewWindow()"
              v-close-popup
            />
          </q-toolbar>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DynamicWhatsapp',
  data: () => ({
    fab: false,
    menu: false,
    message: false,
    hints: true,
    phone: '5561993424369',
    textVal: '',
    apilink: '',
    dialog: false,
    position: 'top',
    shadowVal: false,
    shadowElevation: 'shadow-1',
    shadowVal2: false,
    shadowElevation2: 'shadow-1',
    fabPos: [5, 5],
    draggingFab: false
  }),
  watch: {
    text (val) {
      this.apilink = 'http://'
      this.apilink += this.isMobile() ? 'api' : 'web'
      this.apilink += '.whatsapp.com/send?phone=' + this.phone + '&text=' + encodeURI(this.text)
    }
  },
  created: function () {
    this.apilink = 'http://'
    this.apilink += this.isMobile() ? 'api' : 'web'
    this.apilink += '.whatsapp.com/send?phone=' + this.phone + '&text=' + encodeURI('Olá! Tenho interesse no desenvolvimento de uma aplicação.')
  },
  methods: {
    isMobile () {
      var check = false; // eslint-disable-line
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0.4))) check = true })(navigator.userAgent || navigator.vendor || window.opera) // eslint-disable-line
      return check
    },
    open (position) {
      this.position = position
      this.dialog = true
    },
    openInNewWindow: function () {
      if (!this.text.replace(/\s/g, '').length) {
        this.apilink = 'http://'
        this.apilink += this.isMobile() ? 'api' : 'web'
        this.apilink += '.whatsapp.com/send?phone=' + this.phone + '&text=' + encodeURI('Olá, Tenho interesse no desenvolvimento de uma aplicação.')
      }
      window.open(this.apilink)
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  },
  computed: {
    text: {
      get () {
        return this.textVal
      },
      set (val) {
        this.textVal = val
      }
    },
    shadow: {
      get () {
        return this.shadowVal
      },
      set (val) {
        this.shadowVal = val
        if (val === true) {
          this.shadowElevation = 'shadow-4'
        } else {
          this.shadowElevation = 'shadow-1'
        }
      }
    },
    shadow2: {
      get () {
        return this.shadowVal2
      },
      set (val) {
        this.shadowVal2 = val
        if (val === true) {
          this.shadowElevation2 = 'shadow-4'
        } else {
          this.shadowElevation2 = 'shadow-1'
        }
      }
    }
  }
}
</script>
