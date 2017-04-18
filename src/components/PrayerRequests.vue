<template>
  <div class="prayer-requests">
    <ul>
      
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('')">Recent</a></li>
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('Health Needs')">Health Needs</a></li>
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('Cancer')">Cancer</a></li>
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('Spiritual')">Spiritual</a></li>
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('Ministry')">Ministry</a></li>
        <li><a href="javascript:void(0)" @click="filterItemsByCategory('Other')">Other</a></li>
      
    </ul>
    <table>
      <thead>
        <tr>
          <td>Type</td>
          <td>Person/Request</td>
          <td>Details</td>
          <td>Requested By</td>
          <td>Requested On</td>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading_items == false && items.length <=0">No items found</tr>
        <tr v-if="loading_items">Loading items...</tr>
        <tr v-if="loading_items == false" v-for="(item,index) in items">
          <td>{{ item.fields.Type }}</td>
          <td>{{ item.fields["Person/Request"] }}</td>
          <td>{{ item.fields["Details"] }}</td>
          <td>{{ item.fields["Requested_By"] }}</td>
          <td>{{ item.fields["Requested_On"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'

export default {
  name: 'prayer-requests',
  data:function(){
    return {
      app_id : 'appLd2CkLtxzKUMg8',
      app_key : 'keyRTLlrVS02vC3Vx',
      loading_items: false,
      items: []
    };
  },
  mounted:function(){    
    this.getList();
    this.getDateBeforeSevenDays();
  },
  filters:{
    moment: function(date){
      return moment(date).format('ddd, MMMM Do YY');
    }
  },
  methods:{
    getDateBeforeSevenDays:function(){
      var days = 7; 
      var date = new Date();
      var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));      
    },
    filterItemsByCategory:function(category){
      var url= '';
      if(category != ""){        
        url = 'https://api.airtable.com/v0/'+this.app_id+'/Requests?view=Grid%20view&api_key='+this.app_key+'&'+('filterByFormula=(AND( IS_AFTER({Requested_On},DATEADD(TODAY(),-7,"days")), Type="'+category+'"))'+'&sort%5B0%5D%5Bfield%5D=Person%2FRequest&sort%5B0%5D%5Bdirection%5D=asc');
      }
      this.getList(url);
    },
    getList:function(url){
      var _self = this;
      if(this.app_id != "" && this.app_key != ""){
        this.loading_items = true;
        if(!url){
          url = 'https://api.airtable.com/v0/'+this.app_id+'/Requests?view=Grid%20view&api_key='+this.app_key+'&'+'filterByFormula=(IS_AFTER({Requested_On},DATEADD(TODAY(),-7,"days")))';  
        }

        axios.get(url).then(function (response) {
          if(response.data.records){
            _self.items = response.data.records;
          }
          _self.loading_items = false;
        }).catch(function (error) {
          _self.loading_items = false;
        });
      }         
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
