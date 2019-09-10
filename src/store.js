import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	records: []
  },
  mutations: {
  	addRecord (state, data) {
  		state.records.push(data)
  	},
  	deleteRecord (state, id) {
  		state.records.splice(id, 1)
  	}
  },
  actions: {
  	addRecord ({ commit }, payload) {
  		commit('addRecord', payload);
  		localStorage.setItem('records',      
  		JSON.stringify(this.state.records));

	},
	deleteRecord ({ commit }, payload) {
		commit('deleteRecord', payload);
		localStorage.setItem('records',      
  		JSON.stringify(this.state.records));
	}
  }
})

