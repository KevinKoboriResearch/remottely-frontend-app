<template>
  <div class="admin-pages">
    <!-- {{$store.state.adminPages.tab}} -->
    <!-- <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs"> -->
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        narrow-indicator
        active-color="orange"
      >
        <q-tab
          name="devices"
          label="Artigos"
        />
        <q-tab
          name="categories"
          label="Categorias"
        />
        <q-tab
          name="users"
          label="Usuários"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          class="noScroll"
          style="min-height: 410px"
          name="devices"
        >
          <DeviceAdmin />
        </q-tab-panel>

        <q-tab-panel
          class="noScroll"
          style="min-height: 410px"
          name="categories"
        >
          <CategoryAdmin />
        </q-tab-panel>

        <q-tab-panel
          class="noScroll"
          style="min-height: 410px"
          name="users"
        >
          <UserAdmin />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <DeviceAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card> -->
    <!-- </div> -->
  </div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle'
import DeviceAdmin from './DeviceAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
  name: 'AdminPages',
  components: { PageTitle, DeviceAdmin, CategoryAdmin, UserAdmin },
  data () {
    return {
      // tab: 'devices'
    }
  },
  computed: {
    tab: {
      get () {
        return this.$store.state.adminPages.tab
      },
      set (val) {
        this.$store.commit('adminPages/changeAdminTab', val)
      }
    }
  }
}
</script>

<style>
.noScroll::-webkit-scrollbar {
  width: 0px;
}
</style>
