<template>
    <div>
        <h1 class="text-center">Guruhlar</h1>
        <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="Guruhni izlash" v-model='search'></v-text-field>
            </v-col>
        </v-row>
        <v-btn color="blue" dark fixed bottom right fab @click='dialog = !dialog'>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Yangi guruh</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :items="subjects"
                                    item-text="subject"
                                    item-value="id"
                                    label="Fan nomi"
                                    v-model='group.subject_id'
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Guruh raqami" required v-model='group.num'></v-text-field>
                                
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="teachers"
                                    item-text='name'
                                    item-value='id'
                                    v-model='group.teacher_id'
                                    label="O'qituvchini tanlang"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Yopish
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="add()">
                        Kiritish
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
            :headers="headers"
            :items="groups"
            :items-per-page="5"
            class="elevation-1"
            >
                <template v-slot:item.subject_id="{item}">
                    {{ getSubject(item.subject_id) }}
                </template>
                <template v-slot:item.teacher_id="{item}">
                    {{ getTeacher(item.teacher_id) }}
                </template>
            </v-data-table>
        <v-snackbar v-model="snackbar" :timeout="2000">
      Yangi guruh tizimga kiritildi!

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
                headers: [
                { text: 'Fan nomi', value: 'subject_id' },
                { text: 'Guruh raqami', value: 'num' },
                { text: 'O`qituvchi', value: 'teacher_id' },
                ],
                dialog:false,
                group: {},
                search:'',
                snackbar:false,
                 
            }
        },
        methods: {
            del(index) {
                const obj = {
                    index: index,
                    id: this.groups[index].id
                }
                this.$store.dispatch('deletegroup', obj)
            },
            add() {
                this.$store.dispatch('newgroup', this.group)
                this.group= {}
                this.snackbar = true
                this.dialog = false
            },
            getSubject(id){
                let n = ''
                this.subjects.find(subject => {
                    if (subject.id == id) n = subject.subject
                })
                return n
            },
            getTeacher(id){
                let n = ''
                this.teachers.find(teacher => {
                    if (teacher.id == id) n = teacher.name
                })
                return n
            }
        },
        computed: {
            groups() {
                return this.$store.getters.groups
            },
            subjects(){
                return this.$store.getters.subject
            },
            teachers(){
                return this.$store.getters.teachers
            }
        },
        created() {
            this.$store.dispatch('allgroup')
        }

    }
</script>

<style>

</style>