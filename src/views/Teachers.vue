<template>
  <div>
    <h1 class="text-center">O'qituvchilar</h1>
    <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-text-field label="O'qituvchini izlash" v-model='search'></v-text-field>
        <div class="teachers__list">
          <div class="teacher__box" v-for='(teacher, index) of filteredTeachers' :key='index'>
            <div class="teacher__name">{{teacher.name}}</div>
            <div class="teacher__phone">{{teacher.phone}}</div>
          </div>
        </div>
        </v-col>
    </v-row>
    <v-btn color="blue" dark fixed bottom right fab @click='dialog = !dialog'><v-icon>mdi-plus</v-icon></v-btn>
     <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Yangi o'qituvchi</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Ism sharifi"
                  required
                  v-model='teacher.name'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Telefon raqami"
                  required
                  v-model='teacher.phone'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  required
                  v-model='teacher.email'
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
            Yopish
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="add()"
          >
            Kiritish
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Yangi o'qituvchi tizimga kiritildi!

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
      teacher:{},
      snackbar:false,
    }
  },
  methods: {
    add(){
      this.$store.dispatch('newTeacher',this.teacher)
      this.teacher = {}
      this.dialog = false
      this.snackbar = true
    }
  },
  computed:{
    filteredTeachers(){
      return this.$store.getters.searchTeacher(this.search)
    },
    teachers(){
      return this.$store.getters.teachers
    }
  },
  created(){
    
  }
}
</script>

