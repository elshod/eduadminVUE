<template>
  <div>
    <v-row>
      <v-col cols='12' md='3'> 
        <v-card class="mx-auto" color="blue">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4 white--text">
                O'qituvchilar
              </div>
              <v-list-item-title class="text-h5 mb-1 white--text">
                {{teachers}} ta
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
            <v-icon large color='white'>
              mdi-account-tie
            </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols='12' md='3'> 
        <v-card class="mx-auto" color="blue">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4 white--text">
                Guruhlar
              </div>
              <v-list-item-title class="text-h5 mb-1 white--text">
                {{groups}} ta
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
            <v-icon large color='white'>
              mdi-account-multiple
            </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols='12' md='3'> 
        <v-card class="mx-auto" color="blue">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4 white--text">
                Fanlar
              </div>
              <v-list-item-title class="text-h5 mb-1 white--text">
                {{subjects}} ta
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
            <v-icon large color='white'>
              mdi-clipboard-list
            </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols='12' md='3'> 
        <v-card class="mx-auto" color="blue">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4 white--text">
                O'quvchilar
              </div>
              <v-list-item-title class="text-h5 mb-1 white--text">
                {{pupils}} ta
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
            <v-icon large color='white'>
              mdi-account
            </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>


  export default {
    name: 'Home',
    computed:{
      teachers(){
        return this.$store.getters.getCountTeachers
      },
      groups(){
        return this.$store.getters.getCountGroups
      },
      subjects(){
        return this.$store.getters.getCountSubjects
      },
      pupils(){
        return this.$store.getters.getCountPupils
      },
    }
  }
</script>
