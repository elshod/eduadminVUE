<template>
  <v-app id="inspire">

    <v-app-bar app color='blue' >
      <v-app-bar-nav-icon color='white' @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class='white--text'>eduAdmin</v-toolbar-title>
    </v-app-bar>

    

    <v-main>
      <v-container>
        <v-navigation-drawer
          v-model="drawer" 
          app>
          <v-list
            dense
            nav>
            <v-list-item
              v-for="item in menus"
              :key="item.title"
              :to='item.link'
              link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: null,
    menus: [
          { title: 'Bosh sahifa', icon: 'mdi-view-dashboard', link: '/' },
          { title: 'O`qituvchilar', icon: 'mdi-briefcase-account', link: '/teachers' },
          { title: 'Guruhlar', icon: 'mdi-account-group', link: '/groups' },
          { title: 'Fanlar', icon: 'mdi-clipboard-list', link: '/subjects' },
          { title: 'O`quvchilar', icon: 'mdi-account', link: '/pupils' },
        ],
  }),
  created(){
    this.$store.dispatch('allTeacher')
    this.$store.dispatch('allsubject')
    this.$store.dispatch('allpupil')
    this.$store.dispatch('allgroup')
    
  }
};
</script>

<style lang="scss">
  .teacher {
    &__box {
      display: flex;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px #118AB2;
      border-radius: 12px;
      align-items: center;
      padding: 22px 34px;
      margin-bottom: 20px;
      &:hover {
        background-color: #118AB2;
        color: #fff;
        cursor: pointer;
        .teacher__name {
          color: #fff;
        }
      }
    }
    &__name {
      font-size: 18px;
      line-height: 27px;
      color: #000000;
      margin-right: 20px;
    }
  }
</style>