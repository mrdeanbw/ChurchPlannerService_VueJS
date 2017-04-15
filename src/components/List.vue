<template>
<div class="list">
<div class="lists">
  <div class="sunday-morning">
  <img src="/static/logo.svg" alt="" class="logo">
    <h3>Sunday Morning</h3>
    <span v-if="loading_morning_items">Loading items...</span>
    <ul v-if="sunday_morning_items.length > 0 ">      
      <li v-for="item in sunday_morning_items">                    
        <router-link :to="{name:'sunday-morning-single',params:{'id':item.id}}">{{ item.fields.Date | moment }}</router-link>
      </li>
    </ul>
    <h3>Sunday Evening</h3>
    <span v-if="loading_evening_items">Loading items...</span>
    <ul v-if="sunday_evening_items.length > 0 ">      
      <li v-for="item in sunday_evening_items">                    
        <router-link :to="{name:'sunday-evening-single',params:{'id':item.id}}">{{ item.fields.Date | moment }}</router-link>
      </li>
    </ul>
    <h3>Midweek</h3>
    <span v-if="loading_midweek_items">Loading items...</span>
    <ul v-if="midweek_items.length > 0 ">      
      <li v-for="item in midweek_items">                    
        <router-link :to="{name:'midweek-single',params:{'id':item.id}}">{{ item.fields.Date | moment }}</router-link>
      </li>
    </ul>
  </div>
  </div><!--/lists-->
  <div class="customized">
    <h3>Need Something Customized?</h3>
    <p>If you want something other than the default look or order, I will customize this for your needs (for my normal hourly fee). <br> <br> Just send me an email at <a href="mailto:pastorryanhayden@gmail.com">pastorryanhayden@gmail.com</a></p>
  </div>
  </div><!--/list-->
  
</template>

<script>
import axios from 'axios';
import moment from 'moment'
export default {
  name: 'sunday_morning',
  data:function(){
    return {
      sunday_morning_items: [],
      sunday_evening_items: [],
      midweek_items: [],
      loading_morning_items: false,
      loading_evening_items: false,
      loading_midweek_items: false,
      app_id : '',
      app_key : '',
    };
  },
  mounted:function(){
    this.getAppCredentials();
    this.getList();
  },
  filters:{
    moment: function(date){
      return moment(date).format('ddd, MMMM Do YY');
    }
  },
  methods:{
    getAppCredentials:function(){
      if(localStorage.getItem('app_id'))
        this.app_id = localStorage.getItem('app_id');
      if(localStorage.getItem('app_key'))
        this.app_key = localStorage.getItem('app_key');
    },
    getList:function(){
      var _self = this;
      if(this.app_id != "" && this.app_key != ""){
        this.loading_morning_items = true;
        axios.get('https://api.airtable.com/v0/'+this.app_id+'/Sunday_Morning?&view=services&api_key='+this.app_key)
        .then(function (response) {
          if(response.data.records){
            _self.sunday_morning_items = response.data.records;
          }
          _self.loading_morning_items = false;
        })
        .catch(function (error) {
          _self.loading_morning_items = false;
        });

        this.loading_evening_items = true;
        axios.get('https://api.airtable.com/v0/'+this.app_id+'/Sunday_Evening?&view=Grid%20view&api_key='+this.app_key)
        .then(function (response) {
          if(response.data.records){
            _self.sunday_evening_items = response.data.records;
          }
          _self.loading_evening_items = false;
        })
        .catch(function (error) {
          _self.loading_evening_items = false;
        });

        this.loading_midweek_items = true;
        axios.get('https://api.airtable.com/v0/'+this.app_id+'/Midweek?&view=Grid%20view&api_key='+this.app_key)
        .then(function (response) {
          if(response.data.records){
            _self.midweek_items = response.data.records;
          }
          _self.loading_midweek_items = false;
        })
        .catch(function (error) {
          _self.loading_midweek_items = false;
        });
      }         
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  background-color: #3877E0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 100px;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  min-height: 600vh;
  }
.lists, .customized {
  width: 340px;
  background-color: #ffffff;
  z-index: 1;
  border-radius: 30px;
  padding: 30px;
  font-family: Verdana, arial, sans-serif;
  color: #828C8E;
  margin-bottom: 50px;
}
img.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
h3 {
  color: #3877E0;
  text-align: center;
}
ul {
  background-color: #E3E3E3;
  padding: 20px;
}
li {
  margin-left: 20px;
}
</style>
