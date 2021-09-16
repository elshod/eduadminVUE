<template>
  <v-row class="mt-6" justify='space-between'>
      <v-col cols='12' md='6'>
        <div class="pt-6 pupil__box">
            <div class="pupil__label">Ism:</div>
            <div class="pupil__value">{{pupil.name}}</div>
            <div class="pupil__label">Familya:</div>
            <div class="pupil__value">{{pupil.lname}}</div>
            <div class="pupil__label">Telefon raqami:</div>
            <div class="pupil__value">{{pupil.phone}}</div>
            <div class="pupil__label">Manzili:</div>
            <div class="pupil__value">{{pupil.adress}}</div>
            <div class="pupil__label">Topshiradigan oliy o’quv yurti:</div>
            <div class="pupil__value">{{pupil.univer}}</div>
            <div class="pupil__label">Ota-onasi ism-familiyasi:</div>
            <div class="pupil__value">{{pupil.parent}}</div>
            <div class="pupil__label">Ota-ona telefon raqami:</div>
            <div class="pupil__value">{{pupil.parentphone}}</div>
            <v-btn color='success' @click='dialog = !dialog'>Fan qo'shish</v-btn>
        </div>
      </v-col>
      <v-col cols='12' md='5'>
          
        <v-data-table
            :headers="headers"
            :items="lessons"
            class="elevation-1"
            >
            <template v-slot:item.subject_id="{item}">
                {{ getSubject(item.subject_id) }}
            </template>
            <template v-slot:item.btns="{item}">
                <v-btn @click='del(item.id)' color='error'>
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
      </v-col>
      <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Fan qo'shish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="subjects"
                  item-text='subject'
                  item-value='id'
                  label="Fanni tanlang"
                  required
                  v-model='subject_id'
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="groups"
                  item-text='num'
                  item-value='id'
                  label="Guruhni tanlang"
                  v-model='group_id'
                  required
                ></v-select>
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
            Saqlash
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
export default {
    data() {
        return {
            id: this.$router.currentRoute.params['id'],
            pupil:{},
            headers: [
                {text:'Fan nomi',value:'subject_id'},
                {text:'Guruh raqami', value:'group_id'},
                {text:'',value:'btns'}
            ],
            lesson: {},
            dialog:false,
            subject_id:-1,
            group_id:-1
        }
    },
    computed: {
        subjects(){
            return this.$store.getters.subject
        },
        groups(){
            return this.$store.getters.getGroupsBySubject(this.subject_id)
        },
        lessons(){
            return this.$store.getters.getLessonsById(this.id)
        }
    },
    methods: {
        del(id){
            if (confirm('Qaroringiz qat`iymi?')){
                this.$store.dispatch('deletelesson',id)
            }
        },
        getSubject(id){
            let n = ''
            this.subjects.find(subject => {
                if (subject.id == id) n = subject.subject
            })
            return n
        },
        gotolist(){
            this.$router.push('/pupils')
        },
        add(){
            const lesson = {
                pupil_id:+this.id,
                subject_id: this.subject_id,
                group_id: this.group_id 
            }
            this.$store.dispatch('newlesson',lesson)
            this.subject_id = 0
            this.group_id = 0
            this.dialog = false
        }
    },
    created(){
        this.$store.dispatch('alllesson',this.id)
        this.pupil = this.$store.getters.getpupil(this.id)
    }
}
</script>

<style lang="scss">
    .pupil {
        &__label {
            color: #898989;
            font-size: 12px;
        }
        &__value {
            font-size: 20px;
            margin-bottom: 7px;
        }
    }
</style>