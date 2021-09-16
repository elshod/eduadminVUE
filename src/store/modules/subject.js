import axios from 'axios'
    
const subject = {
    state: {
        subject: []
    },
    actions: {
        newsubject(context,payload){
            axios.post('http://localhost:3000/subjects',payload).then(response => { context.commit('addsubject',response.data) })
        },
        allsubject(context){
            axios.get('http://localhost:3000/subjects').then(response => { 
                context.commit('addsubjects',response.data) 
            })
        },
        deletesubject(context,{index,id}){
            axios.delete('http://localhost:3000/subjects/'+id).then(response => { 
                if (response.status == 200)
                    context.commit('delsubject',index) 
            })
        },
        updatesubject(context,{index,subject}){
            axios.put('http://localhost:3000/subjects/'+subject.id,subject).then(response => {
                const obj = {
                    index:index,
                    subject: response.data
                }
                context.commit('savesubject',obj)
            })
        }
    },
    getters: {
        subject(state){
            return state.subject
        },
        getCountSubjects(state){
            return state.subject.length
        },
        getsubject(state){
            return id => {
                let subject = {}
                state.subject.find(worker => {
                    if (worker.id == id){
                        subject = worker
                    }
                })
                return subject
            }
        },
        searchsubject(state){
            return search => {
                return state.subject.filter(subject => {
                    return subject.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
            }
        }
    },
    mutations: {
        savesubject(state,{index,subject}){
            state.subject[index] = subject
        },
        delsubject(state,payload){
            state.subject.splice(payload,1)
        },
        addsubject(state,payload){
            state.subject.push(payload)
        },
        addsubjects(state,payload){
            
            state.subject = payload
        }
    },
}


export default subject