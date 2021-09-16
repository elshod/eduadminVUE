import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import teacher from './modules/teacher.js'
import subject from './modules/subject.js'
import group from './modules/group.js'
import pupil from './modules/pupil.js'
import lesson from './modules/lesson'
export default new Vuex.Store({
  modules: {
    teacher,
    lesson,
    subject,
    group,
    pupil
  }
})
