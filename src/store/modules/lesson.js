import axios from 'axios'
    
const lesson = {
    state: {
        lesson: []
    },
    actions: {
        newlesson(context,payload){
            axios.post('http://localhost:3000/lessons',payload).then(response => { context.commit('addlesson',response.data) })
        },
        alllesson(context,payload){
            axios.get('http://localhost:3000/lessons?pupil_id='+payload).then(response => { 
                context.commit('addlessons',response.data) 
            })
        },
        deletelesson(context,payload){
            axios.delete('http://localhost:3000/lessons/'+payload).then(response => { 
                if (response.status == 200)
                    context.commit('dellesson',payload) 
            })
        },
        updatelesson(context,{index,lesson}){
            axios.put('http://localhost:3000/lessons/'+lesson.id,lesson).then(response => {
                const obj = {
                    index:index,
                    lesson: response.data
                }
                context.commit('savelesson',obj)
            })
        }
    },
    getters: {
        lesson(state){
            return state.lesson
        },
        getLessonsById(state){
            return pupil_id => {
                return state.lesson.filter(les => {
                    return les.pupil_id == pupil_id
                })
            }
        },
        getlesson(state){
            return id => {
                let lesson = {}
                state.lesson.find(worker => {
                    if (worker.id == id){
                        lesson = worker
                    }
                })
                return lesson
            }
        },
        searchlesson(state){
            return search => {
                return state.lesson.filter(lesson => {
                    return lesson.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
            }
        }
    },
    mutations: {
        savelesson(state,{index,lesson}){
            state.lesson[index] = lesson
        },
        dellesson(state,payload){
            let index = state.lesson.map(x => {
                return x.id;
              }).indexOf(payload);
            state.lesson.splice(index,1)
        },
        addlesson(state,payload){
            state.lesson.push(payload)
        },
        addlessons(state,payload){
            
            state.lesson = payload
        }
    },
}


export default lesson