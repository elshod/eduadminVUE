<template>
  <div>
      <h1 class="text-center">Fanlar</h1>
        <v-row justify="center">
            <v-col
            cols="12"
            sm="6"
            md="4"
            >
            <v-text-field label="Yangi fan nomini kiriting" v-model='subjectName'></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" md="1">
                <v-btn color="blue white--text" @click='add()'>Qo'shish</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="4">
                <div class="teachers__list">
                    <div class="teacher__box" v-for='(subject, index) of subjects' :key='index' @click='del(index)'>
                        <div class="teacher__name">{{subject.subject}}</div>
                    </div>
                </div>
            </v-col>
        </v-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            subjectName: ''
        }
    },
    methods: {
        del(index){
            const obj = {
                index: index,
                id: this.subjects[index].id
            }
            this.$store.dispatch('deletesubject',obj)
        },
        add(){
            const s = {
                subject: this.subjectName
            }
            this.$store.dispatch('newsubject',s)
            this.subjectName = ''
        }
    },
    computed:{
        subjects(){
            return this.$store.getters.subject
        }
    },

}
</script>

<style>

</style>