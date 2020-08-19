<template>
  <div>
    <ul>
      <li v-for="artist in artists" :key="artist.id" @click="selectArtist(artist)" :class="{selected: artist._id === selectedArtist._id}">
        {{artist}}
      </li>
    </ul>
    <input v-model="name">
    <button v-on:click="addArtist()">Send</button>
    <button v-on:click="editArtist()" :disabled="!selectedArtist._id">Edit</button>
    <button v-on:click="removeArtist()" :disabled="!selectedArtist._id">Delete</button>
    <br>
    <div :class="{response: response}">
      {{response}}
    </div>
    
    <ul>
      <li v-for="equip in equips" :key="equip.id" @click="selectEquip(equip)" :class="{selected: equip._id === selectedEquip._id}">
        {{equip}}
      </li>
    </ul>
    <input v-model="equip_name">
    <button v-on:click="addEquip()">Send</button>
    <button v-on:click="editEquip()" :disabled="!selectedEquip._id">Edit</button>
    <button v-on:click="removeEquip()" :disabled="!selectedEquip._id">Delete</button>
    <button v-on:click="setEquip()" :disabled="!selectedEquip._id && !selectedArtist._id">Set equip</button>
    <br>
    <div :class="{response: equip_response}">
      {{equip_response}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      equip_name: '',
      response: '',
      equip_response: '',
      artists: [],
      equips: [],
      selectedArtist: {},
      selectedEquip: {}
    }
  },
  methods: {
    selectArtist (artist) {
      this.selectedArtist = artist
      this.name = artist.name
    },
    async removeArtist () {
      let res = await axios.delete(`http://localhost:3030/artists/${this.selectedArtist._id}`)
      this.response = res.data
      this.getArtists()
    },
    async getArtists () {
        const response = await axios.get('http://localhost:3030/artists')
        this.artists = response.data
    },
    async addArtist() {
      const object = {
        name: this.name,
      }
      const body = JSON.stringify(object)
      var res = await axios.post('http://localhost:3030/artists', body)
      this.response = res.data
      this.getArtists()
 },
 async editArtist() {
    const object = {
        name: this.name,
      }
      const body = JSON.stringify(object)
      var res = await axios.put(`http://localhost:3030/artists/${this.selectedArtist._id}`, body)
      this.response = res.data
      this.getEquip()
 },
 selectEquip (equip) {
      this.selectedEquip = equip
      this.equip_name = equip.name
    },
    async removeEquip () {
      let res = await axios.delete(`http://localhost:3030/equip/${this.selectedEquip._id}`)
      this.equip_response = res.data
      this.getEquip()
    },
    async getEquip () {
        const equip_response = await axios.get('http://localhost:3030/equip')
        this.equips = equip_response.data
    },
    async addEquip() {
      const object = {
        equip_name: this.equip_name,
      }
      const body = JSON.stringify(object)
      var res = await axios.post('http://localhost:3030/equip', body)
      this.equip_response = res.data
      this.getEquip()
 },
 async editEquip() {
    const object = {
        equip_name: this.equip_name,
      }
      const body = JSON.stringify(object)
      var res = await axios.put(`http://localhost:3030/equip/${this.selectedEquip._id}`, body)
      this.equip_response = res.data
      this.getEquip()
 },
 async setEquip() {
   var res = await axios.post(`http://localhost:3030/setequip/${this.selectedEquip._id}/${this.selectedArtist._id}`)
   this.getArtists()
   console.log(res)
 }
  },
  mounted() {
    this.getArtists()
    this.getEquip()
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li.selected {
  background: gray;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0px;
  padding: 10px;
  width: 100%;
  text-align: center;
}
.response {
  padding: 15px;
  background: #28a745;
}
</style>
