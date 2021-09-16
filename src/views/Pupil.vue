<template>
  <div>
    <h1 class="text-center">O'quvchilar</h1>
    <v-card>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="O`quvchilarni izlash"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="pupils"
            :items-per-page="15"
            :search="search"
            class="elevation-1">
            <template v-slot:item.btns="{item}">
                <router-link tag='button' :to="'/pupil/'+item.id">
                    <v-icon color="blue darken-2">
                        mdi-eye-outline
                    </v-icon>
                </router-link>
            </template>
        </v-data-table>
    </v-card>
    <v-btn color="blue" dark fixed bottom right fab @click='dialog = !dialog'><v-icon>mdi-plus</v-icon></v-btn>
     <v-dialog
      v-model="dialog"
      max-width="800px"
    >
      <v-card>
        <div class="pt-5 text-h5 text-center">Yangi o'quvchi</div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md='4'>
                <v-text-field
                  label="Ismi"
                  required
                  v-model='pupil.name'
                ></v-text-field>
              </v-col>
              <v-col cols="12" md='4'>
                <v-text-field
                  label="Familiyasi"
                  required
                  v-model='pupil.lname'
                ></v-text-field>
              </v-col>
              <v-col cols="12" md='4'>
                <v-text-field
                  label="Telefon raqam"
                  required
                  v-model='pupil.phone'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Manzil"
                  required
                  v-model='pupil.adress'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Topshiradigan oliy o’quv yurti:"
                  required
                  v-model='pupil.univer'
                ></v-text-field>
              </v-col>
              <v-col cols="12" md='6'>
                <v-text-field
                  label="Ota-onasi ism-familiyasi:"
                  required
                  v-model='pupil.parent'
                ></v-text-field>
              </v-col>
              <v-col cols="12" md='6'>
                <v-text-field
                  label="Ota-ona telefon raqami:"
                  required
                  v-model='pupil.parentphone'
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Orqaga qaytish
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="add()"
          >
            Saqlash
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Yangi o'quvchi tizimga kiritildi!

      <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Yopish
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search:'',
      dialog:false,
      pupil:{},
      snackbar:false,
      headers: [
        { text: 'Ismi', value: 'name' },
        { text: 'Familiyasi', value: 'lname' },
        { text: 'Telefon raqami', value: 'phone' },
        { text: 'Yashash manzili', value: 'adress' },
        { text: '', value: 'btns' },
    ],
    }
  },
  methods: {
    add(){
      this.$store.dispatch('newpupil',this.pupil)
      this.pupil = {}
      this.dialog = false
      this.snackbar = true
    }
  },
  computed:{
    filteredpupils(){
      return this.$store.getters.searchpupil(this.search)
    },
    pupils(){
      return this.$store.getters.pupils
    }
  },
  created(){
    
  }
}
</script>

