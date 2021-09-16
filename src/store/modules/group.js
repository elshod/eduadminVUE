import axios from 'axios'
    
const group = {
    state: {
        groups: []
    },
    actions: {
        newgroup(context,payload){
            axios.post('http://localhost:3000/groups',payload).then(response => { context.commit('addgroup',response.data) })
        },
        allgroup(context){
            axios.get('http://localhost:3000/groups').then(response => { 
                context.commit('addgroups',response.data) 
            })
        },
        deletegroup(context,{index,id}){
            axios.delete('http://localhost:3000/groups/'+id).then(response => { 
                if (response.status == 200)
                    context.commit('delgroup',index) 
            })
        },
        updategroup(context,{index,group}){
            axios.put('http://localhost:3000/groups/'+group.id,group).then(response => {
                const obj = {
                    index:index,
                    group: response.data
                }
                context.commit('savegroup',obj)
            })
        }
    },
    getters: {
        groups(state){
            return state.groups
        },
        getCountGroups(state){
            return state.groups.length
        },
        getGroupsBySubject(state){
            return subject_id => {
                return state.groups.filter(group => {
                    return group.subject_id == subject_id
                })
            }
        },
        getgroup(state){
            return id => {
                let group = {}
                state.groups.find(worker => {
                    if (worker.id == id){
                        group = worker
                    }
                })
                return group
            }
        },
        searchgroup(state){
            return search => {
                return state.groups.filter(group => {
                    return group.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
            }
        }
    },
    mutations: {
        savegroup(state,{index,group}){
            state.groups[index] = group
        },
        delgroup(state,payload){
            state.groups.splice(payload)
        },
        addgroup(state,payload){
            state.groups.push(payload)
        },
        addgroups(state,payload){
            
            state.groups = payload
        }
    },
}


export default group