import axios from 'axios'
    
const teacher = {
    state: {
        teachers: []
    },
    actions: {
        newTeacher(context,payload){
            axios.post('http://localhost:3000/teachers',payload).then(response => { context.commit('addTeacher',response.data) })
        },
        allTeacher(context){
            axios.get('http://localhost:3000/teachers').then(response => { 
                context.commit('addTeachers',response.data) 
            })
        },
        deleteTeacher(context,{index,id}){
            axios.delete('http://localhost:3000/teachers/'+id).then(response => { 
                if (response.status == 200)
                    context.commit('delTeacher',index) 
            })
        },
        updateTeacher(context,{index,teacher}){
            axios.put('http://localhost:3000/teachers/'+teacher.id,teacher).then(response => {
                const obj = {
                    index:index,
                    teacher: response.data
                }
                context.commit('saveTeacher',obj)
            })
        }
    },
    getters: {
        teachers(state){
            return state.teachers
        },
        getCountTeachers(state){
            return state.teachers.length
        },
        getTeacher(state){
            return id => {
                let teacher = {}
                state.teachers.find(worker => {
                    if (worker.id == id){
                        teacher = worker
                    }
                })
                return teacher
            }
        },
        searchTeacher(state){
            return search => {
                return state.teachers.filter(teacher => {
                    return teacher.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
            }
        }
    },
    mutations: {
        saveTeacher(state,{index,teacher}){
            state.teachers[index] = teacher
        },
        delTeacher(state,payload){
            state.teachers.splice(payload)
        },
        addTeacher(state,payload){
            state.teachers.push(payload)
        },
        addTeachers(state,payload){
            
            state.teachers = payload
        }
    },
}


export default teacher