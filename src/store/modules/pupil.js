import axios from 'axios'
    
const pupil = {
    state: {
        pupils: []
    },
    actions: {
        newpupil(context,payload){
            axios.post('http://localhost:3000/pupils',payload).then(response => { context.commit('addpupil',response.data) })
        },
        allpupil(context){
            axios.get('http://localhost:3000/pupils').then(response => { 
                context.commit('addpupils',response.data) 
            })
        },
        deletepupil(context,{index,id}){
            axios.delete('http://localhost:3000/pupils/'+id).then(response => { 
                if (response.status == 200)
                    context.commit('delpupil',index) 
            })
        },
        updatepupil(context,{index,pupil}){
            axios.put('http://localhost:3000/pupils/'+pupil.id,pupil).then(response => {
                const obj = {
                    index:index,
                    pupil: response.data
                }
                context.commit('savepupil',obj)
            })
        }
    },
    getters: {
        pupils(state){
            return state.pupils
        },
        getCountPupils(state){
            return state.pupils.length
        },
        getpupil(state){
            return id => {
                let pupil = {}
                state.pupils.find(worker => {
                    if (worker.id == id){
                        pupil = worker
                        console.log(pupil)
                    }
                })
                return pupil
            }
        },
        searchpupil(state){
            return search => {
                return state.pupils.filter(pupil => {
                    return pupil.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
            }
        }
    },
    mutations: {
        savepupil(state,{index,pupil}){
            state.pupils[index] = pupil
        },
        delpupil(state,payload){
            state.pupils.splice(payload)
        },
        addpupil(state,payload){
            state.pupils.push(payload)
        },
        addpupils(state,payload){
            state.pupils = payload
        }
    },
}


export default pupil