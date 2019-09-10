<template>
  <div id="app">
    <img class="logo" alt="logo" src="./assets/logo.png">
    <h1>Phonebook</h1>
    <input class="search" id="search" type="text"  v-model="query" @keyup="filter" placeholder="Search for names..">
    <div class="wrapper">
      <p><h2>Add contact</h2></p>
      <form  id="newcontact" v-on:submit.prevent="addPhone" >
        <p v-if="errors.length">
          <b>Please write correctly:</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
        <label for="name">Name</label>
        <input id="name" v-model="contact.name" type="text" name="name">
        <label for="phone">Phone</label>
        <input id="phone" v-model="contact.phone" type="text" name="phone" min="0" placeholder="Only numbers" >
        <input id="newcontact" type="submit" value="Add">
      </form>
    </div>
    <div id="contacts" v-for="(record, index) in records">
      <div class="list" v-if="record.visible">
        <p> {{record.name}} : {{record.phone}} </p> 
        <button :id=index @click="deletePhone"> Delete </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'app',
  data() {
    return {
      query: '',
      errors: [],
      contact: {
        name: null,
        phone: null,
        visible: true,
      }      
    }
  },
  computed: {
    records () {
      return store.state.records
    },
  },
  methods: {
    filter () {
      var filter = this.query.toUpperCase();
      this.records.reduce(function(t, cv) {
        if (cv.name.toUpperCase().indexOf(filter) > -1) {
              cv.visible = true;
          } else {
              cv.visible = false;
          }
      }, 0) 
    },
    addPhone (e) {
      if (this.contact.name && this.contact.phone) {
        store.dispatch('addRecord', this.contact);
        this.errors = [];
        this.contact = {name: null,
                        phone: null,
                        visible: true,};
        return true;
      }
      this.errors = [];
      if (!this.name) {
        this.errors.push('Enter name.');
      }
      if (!this.phone) {
        this.errors.push('Enter phone.');
      }
      e.preventDefault();
    },
    deletePhone (e) {
      store.dispatch('deleteRecord', e.target.id);
    }
  },
  mounted() {
    if (localStorage.records) {
      let records = JSON.parse(localStorage.getItem('records'));
      records.reduce(function(t, cv) {
        store.dispatch('addRecord', cv)
      },0)   
    }  
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logo {
  width: 10em;
  height: 10em;
}
.list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list > button {
  margin-left: 1em;
  width: 5em;
  height: 1em
}
</style>



