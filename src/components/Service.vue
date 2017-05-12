<template>

  <div class="sunday-morning-single" id = "printableArea">
    <span v-if="loading">Loading data...</span>
    <div class="page" v-if="item">
      <div class="half-page" >
        <div class="header">
          <h1><span v-if="item.fields.Service_Type == 'Sunday AM'">AM</span><span v-if="item.fields.Service_Type == 'Sunday PM'">PM</span><span v-if="item.fields.Service_Type == 'Midweek'">Midweek</span> Order of Service</h1>
          <h2>{{ item.fields.Date | moment }}</h2>
        </div><!--/header-->
        <div class="order"  >
          <draggable class="dragarea source" @start="drag=true" @end="onEnd">
            <li v-if="item.fields.Chorus" v-for="(chrus_item,index) in item.fields.Chorus">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
              <img src="static/chorus.svg" alt=""><strong>Chorus:</strong> {{ item.fields.chorus_name[index] }} <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>

            <li><a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a><img src="static/welcome.svg" alt=""><strong>Welcome &amp; Prayer</strong><a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a></li>
            <li><a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a><img src="static/handshake.svg" alt="" class="handshake"><strong>Greeting &amp; Fellowship</strong><a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a></li>
            <li v-if="item.fields.Hymns" v-for="(hymn_item,index) in item.fields.Hymns">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
              <img src="static/hymnal.svg" alt=""><strong>Hymn:</strong>  {{ item.fields.Hymn_Number[index] }}, {{ item.fields.Hymn_Title[index] }}<a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>

            <li v-if="item.fields['Choir Song']">
              <span v-for="(choir_song_item,index) in item.fields['Choir Song']">
                <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
                <img src="static/choir.svg" alt=""> <strong>Choir Song: </strong>{{ item.fields.choir_song_name[index] }}
              </span>              
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            <!--
            <li v-else>
              <img src="static/choir.svg" alt=""> <strong>Choir Song: </strong>    
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            -->
            
            <li v-if="item.fields.Missionary_Name" v-for="single_item in item.fields.Missionary_Name">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
              <img src="static/missions.svg" alt=""><strong>Missionary Letter: </strong>{{ single_item }}<a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>

            <!-- Extra-->
            <li v-if='item.fields.Extra' class="missionary" v-for="(single_item,index) in item.fields.Extra">
              <img src="static/extra.svg" alt=""><span>{{ item.fields.extra_description[index] }}</span>
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            
            <li class="missionary"  v-if='item.fields.Special' v-for="(special_item,index) in item.fields.Special">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
              <img src="static/special.svg" alt=""><span>{{ item.fields.special_song_name[index] }} by {{ item.fields.Special_singer[index] }}</span>
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            
            <!-- /Extra-->
            <li class="announcements" v-if="item.fields.Announcements">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>                
              <img src="static/calendar.svg" alt=""><strong>Announcements:</strong>
              <br>
              <ul>
               <draggable class="" @start="drag=true" @end="onEnd">
                  <li v-for="(announcement_item,index) in item.fields.Announcements">
                      <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>                
                      {{ item.fields.announcement_name[index] }}<a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
                  </li>                  
                </draggable>
              </ul>
            </li>

            <li class="offering" v-if="item.fields.Offering">
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>
              <img src="static/offeratory.svg" alt=""><strong>Offering</strong>{{ item.fields.Offering_Musician[0] }} - <span v-if="item.fields.Offering_Song">{{ item.fields.Offering_Song[0] }}</span><a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>

            <li class="offering" v-else>
              <a v-if="isReorderMode" href="javascript:void(0)" ><img src="static/reorder_handle.svg" alt=""></a>                
              <img src="static/offeratory.svg" alt=""><strong>Offering</strong><a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            <li class="sermon" v-if="item.fields.Sermon"><a v-if="isReorderMode" href="javascript:void(0)" >
            <img src="static/reorder_handle.svg" alt=""></a><img src="static/sermon.svg" alt=""><strong>Sermon: </strong>
              <br>
              <em>{{ item.fields.sermon_name[0] }}</em> <br>by {{ item.fields.sermon_preacher[0] }}
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            <li class="sermon" v-else><img src="static/sermon.svg" alt=""><strong>Sermon: </strong>
              <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a>
            </li>
          </draggable>
        </div><!--/order-->
                
         <div style="margin-left: 320px; position: absolute; bottom: 50px;">
            <span><a href="javascript:void(0)"@click="handlePrintMode"><img style="width: 70px;position: absolute;bottom: 90px;margin-left: 175px;" src="static/print.svg" alt=""></a></span>
            <span><a v-if="isEditMode" href="javascript:void(0)"  @click="handleRemoveMode"><img class="imgBtn" src="static/Close_Mode.svg" alt=""></a></span>
            <span><a v-if="isEditMode" href="javascript:void(0)"  @click="handleReorderMode"><img class="imgBtn" src="static/Reorder_Mode.svg" alt=""></a></span>
            <span><a v-if="isEditMode" href="javascript:void(0)"  @click="$root.$emit('show::modal','modal1')"><img class="imgBtn" src="static/Add_mode.svg" alt=""></a></span>
            <span><a v-if="isEditMode" href="javascript:void(0)"  @click="handleMainMode" class="close"><img class="imgBtn" style="width : 70px" src="static/Main_mode.svg" alt=""></a></span>
            <span><a v-if="isMainMode" href="javascript:void(0)"  @click="handleEditMode"><img class="imgBtn" style="width : 70px; margin-left: 175px" src="static/Edit_Mode.svg" alt=""></a></span>
          </div>
          <div>

              <!-- <b-modal id="modal1" title="Add AN ITEM" style="" @ok="submit" @shown="clearName"> -->
              <b-modal id="modal1" title="">
                <!-- <form @submit.stop.prevent="submit">-->
                <form>
                  <Label style="font-size: 30px; margin-bottom: 25px;"><strong>Add AN ITEM</strong></Label>
                  
                  <!--<b-form-input type="text" placeholder="This is the item text" v-model="newItemName"></b-form-input>-->
                 
                  <div v-if="radioVal == 1">
                    <md-input-container>
                      <label> Hymn Number </label>
                      <md-input v-model="Hymn_Number" required></md-input>
                      </md-input-container>
                    <md-input-container>
                      <label> Hymn Title </label>
                      <md-input v-model="Hymn_Title" required></md-input>
                    </md-input-container>
                  </div>

                  <md-input-container v-if="radioVal == 2">
                    <label>Announcement Name</label>
                    <md-input v-model="announcement_name"></md-input>
                  </md-input-container>

                  <div v-if="radioVal == 3">
                    <md-input-container>
                    <label> Song </label>
                    <md-input v-model="songName" required></md-input>
                    </md-input-container>
                    <md-input-container>
                      <label> Singer </label>
                      <md-input v-model="singerName" required></md-input>
                    </md-input-container>
                  </div>
                  
                  <md-input-container v-if="radioVal == 4">
                    <label> Chorus </label>
                    <md-input v-model="chorus_name" required></md-input>
                  </md-input-container>

                  <Label style="font-size : 13px; margin-bottom: 25px; margin-top: 15px;"><strong>PICK AN ICON</strong></Label>
                  <div style="margin-left : 60px">
                      <span><img class="img_item" src="static/hymnal.svg" alt=""></span>
                      <span><img class="img_item" src="static/calendar.svg" alt=""></span>
                      <span><img class="img_item" src="static/song.svg" alt=""></span>
                      <span><img class="img_item" src="static/guitar.svg" alt=""></span>
                  </div>
                  <div>
                    <md-theme>
                        <md-radio style="margin-right : 60px;position: absolute;left: 103px;"  v-model="radioVal" id="my-test19" name="my-test-group6" md-value="1" class=""></md-radio>
                        <md-radio style="margin-right : 60px;position: absolute;left: 197px;"  v-model="radioVal" id="my-test20" name="my-test-group6" md-value="2" class=""></md-radio>
                        <md-radio style="margin-right : 60px;position: absolute;left: 292px;"  v-model="radioVal" id="my-test21" name="my-test-group6" md-value="3" class=""></md-radio>
                        <md-radio style="margin-right : 60px;position: absolute;left: 373px;"  v-model="radioVal" id="my-test22" name="my-test-group6" md-value="4" class=""></md-radio>
                    </md-theme>
                  </div>
                  <button style="margin-top: 50px;width: 200px;height: 55px;background-color: #e9513a;color : white" @click="handleAddItem">ADD ITEM</button>            
                </form>
              </b-modal>
            </div>  
        </div><!--/half-page-->
      <div class="half-page second-half">
        <div class="header">
          <h1><span v-if="item.fields.Service_Type == 'Sunday AM'">AM</span><span v-if="item.fields.Service_Type == 'Sunday PM'">PM</span><span v-if="item.fields.Service_Type == 'Midweek'">Midweek</span> Order of Service</h1>
          <h2>{{ item.fields.Date | moment }}</h2>
        </div><!--/header-->
        <div class="order">
          <div class="dragarea destination">
            <li v-if="item.fields.Chorus" v-for="(chrus_item,index) in item.fields.Chorus"><img src="static/chorus.svg" alt=""><strong>Chorus:</strong> {{ item.fields.chorus_name[index] }} <a href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li><img src="static/welcome.svg" alt=""><strong>Welcome &amp; Prayer</strong><a href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li><img src="static/handshake.svg" alt="" class="handshake"><strong>Greeting &amp; Fellowship</strong><a href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li v-if="item.fields.Hymns" v-for="(hymn_item,index) in item.fields.Hymns"><img src="static/hymnal.svg" alt=""><strong>Hymn:</strong>  {{ item.fields.Hymn_Number[index] }}, {{ item.fields.Hymn_Title[index] }}<a href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            
            <li v-if="item.fields['Choir Song']">
              <span v-for="(choir_song_item,index) in item.fields['Choir Song']">
                <img src="static/choir.svg" alt=""> <strong>Choir Song: </strong>{{ item.fields.choir_song_name[index] }}
              </span>              
            <a href="#" class="close"><img src="static/close.svg" alt=""></a>
            </li>
           

            <li v-if="item.fields.Missionary_Name" v-for="single_item in item.fields.Missionary_Name"><img src="static/missions.svg" alt=""><strong>Missionary Letter: </strong>{{ single_item }}<a href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li v-if='item.fields.Extra' class="missionary" v-for="(single_item,index) in item.fields.Extra">
              <img src="static/extra.svg" alt=""><span>{{ item.fields.extra_description[index] }}</span>
              <a href="#" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            <li class="missionary"  v-if='item.fields.Special' v-for="(special_item,index) in item.fields.Special">
                <img src="static/special.svg" alt=""><span>{{ item.fields.special_song_name[index] }} by {{ item.fields.Special_singer[index] }}</span>
              <a href="#" class="close"><img src="static/close.svg" alt=""></a>
            </li>
            <li class="announcements" v-if="item.fields.Announcements">
              <img src="static/calendar.svg" alt=""><strong>Announcements:</strong>
              <br>
              <ul>                
                <li v-for="(announcement_item,index) in item.fields.Announcements">{{ item.fields.announcement_name[index] }}<a v-if="isRemoveMode" href="#" class="close"><img src="static/close.svg" alt=""></a></li>                  
              </ul>
            </li>
            <li class="offering" v-if="item.fields.Offering"><img src="static/offeratory.svg" alt=""><strong>Offering</strong>{{ item.fields.Offering_Musician[0] }} - <span v-if="item.fields.Offering_Song">{{ item.fields.Offering_Song[0] }}</span><a v-if="isRemoveMode" href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li class="offering" v-else><img src="static/offeratory.svg" alt=""><strong>Offering</strong><a v-if="isRemoveMode" href="#" class="close"><img src="static/close.svg" alt=""></a></li>
            <li class="sermon" v-if="item.fields.Sermon"><img src="static/sermon.svg" alt=""><strong>Sermon: </strong>
              <br>
              <em>{{ item.fields.sermon_name[0] }}</em> <br>by {{ item.fields.sermon_preacher[0] }}
            <a v-if="isRemoveMode" href="javascript:void(0)" @click="removeElement($event)" class="close"><img src="static/close.svg" alt=""></a></li>
          </div>
        </div><!--/order-->
        </div><!--/half-page-->
      </div><!--/page-->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import draggable from 'vuedraggable'
//import modal from '@/components/Modal'
//import modal from '@/components/Modal_new'
//import {modal} from 'bootstrap-vue/lib/components'
import $ from "jquery"
import AddressModal from './AddressModal.vue'
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {bAlert, bBtn, modal} from 'bootstrap-vue/lib/components'
import 'vue-material/dist/vue-material.css'
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)
export default {
  components: {
      draggable,
      bAlert,
      bBtn
  },
  name: 'sunday_morning_single',
  data:function(){
    return {
      id : '',
      item: null,
      app_id : '',
      app_key : '',
      loading: false,
      isRemoveMode : false,
      isReorderMode : false,
      isAddMode : false,
      isEditMode : false,
      isMainMode : true,
      showModal: false,
      addressModalVisible: true,
      radioVal: 0 ,
      newItemName : '',
      chorus_name : '',
      songName : '',
      singerName : '', 
      Hymn_Number : '',
      Hymn_Title : '',
      announcement_name : '',
    };
  },
  mounted:function(){
    this.id = this.$route.params.id;
    this.getAppCredentials();
    this.getItem();
  },
  filters:{
    moment: function(date){
      return moment(date).format('dddd, MMMM Do, YYYY');
      }
  },
  methods:{
    onEnd:function(event){
      $(".dragarea.destination").html($(".dragarea.source").html());
    },
    copyToDestination:function(){
      $(".dragarea.destination").html($(".dragarea.source").html());
    },
    removeElement:function(event){
      $(event.target).closest('li').remove();
      this.copyToDestination();
    },
    getAppCredentials:function(){
      if(localStorage.getItem('app_id'))
        this.app_id = localStorage.getItem('app_id');
      if(localStorage.getItem('app_key'))
        this.app_key = localStorage.getItem('app_key');
    },
    handlePrintMode : function(){
      //window.print();
      this.printDiv('printableArea');
    },
    printDiv : function(divName){
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
},
    handleRemoveMode:function(){
      this.isRemoveMode = !this.isRemoveMode
    },
    handleReorderMode:function(){
      this.isReorderMode = !this.isReorderMode
    },
    handleEditMode:function(){
      this.isMainMode = false;
      this.isEditMode = true;
    },
    handleMainMode:function(){
      this.isMainMode = !this.isMainMode;
      this.isEditMode = false;
      this.isReorderMode = false; 
      this.isRemoveMode = false;
    },
    updateAddMode:function(){
      this.showModal = !this.showModal;
    },
    handleAddItem: function(){
      if (this.radioVal == 0 || this.loading == true) return ;
      console.warn(this.radioVal, this.newItemName);
      var temp_item = {}
      Object.assign(temp_item, this.item);
      switch (this.radioVal) {
        case "1":
            temp_item.fields.Hymns.push(this.Hymn_Number);
            temp_item.fields.Hymn_Number.push(this.Hymn_Number);
            temp_item.fields.Hymn_Title.push(this.Hymn_Title);
            Object.assign(this.item, temp_item);
            this.Hymn_Number = '';
            this.Hymn_Title = '';
            break;
        case "2":
            temp_item.fields.Announcements.push(this.announcement_name);
            temp_item.fields.announcement_name.push(this.announcement_name);
            Object.assign(this.item, temp_item);
            this.announcement_name = '';
            break;
        case "3":
            temp_item.fields.Special.push(this.songName);
            temp_item.fields.special_song_name.push(this.songName);
            temp_item.fields.Special_singer.push(this.singerName);
            Object.assign(this.item, temp_item);
            this.songName = '';
            this.singerName = '';
            break;
        case "4":
            if (this.chorus_name == '') return ;        
            temp_item.fields.chorus_name.push(this.chorus_name);
            temp_item.fields.Chorus.push(this.chorus_name);
            Object.assign(this.item, temp_item);
            this.chorus_name = '';
            this.Chorus = '';
            break;
        default:
          return 0;
      }
      
    },
    getItem:function(){
      var _self = this;
      this.loading = true;
      if(this.app_id != "" && this.app_key != ""){
        axios.get('https://api.airtable.com/v0/'+this.app_id+'/Services/'+this.id+'?api_key='+this.app_key)
          .then(function (response) {
            _self.item = response.data;
            _self.loading = false;
          })
          .catch(function (error) {
            console.log(error);
            _self.loading = false;
          });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@charset "UTF-8";
@import url(https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i);
img.calendar {
  width: 30px;
  margin-right: 5px;
}
.page h1,
.page h2 {
    text-align: center;
    margin-top: 0
}
.page h2,
.page .dragarea {
    font-style: italic
}
.page {
/*    width: 11in;
    height: 8.5in;
    padding: .25in;*/
    padding: 30px;
    text-align: center;
    font-family: Lato, sans-serif;
    display: flex;
    justify-content: center
}
.half-page {
    width: 4.75in
}
.page h1 {
    font-size: 20pt;
    weight: 900;
    line-height: 24pt;
    margin-bottom: 0
}
.page h2 {
    font-size: 18pt;
    weight: 400;
    line-height: 100%
}
.page .header {
    border-bottom: 1px solid #000;
    margin-bottom: .25in
}
.page .dragarea {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    font-size: 14pt;
    line-height: 16pt;
    text-align: left
}
.page .dragarea li {
    margin-bottom: .2in;
    position: relative;
}
.page .dragarea li a.close {
  position: absolute;
    top: 0;
    right: 0;
}
.page .dragarea li a.close {
    position: absolute;
    top: 0;
    right: 0;
}
.page .dragarea li img{
    /*width: 20px;*/
    height: 22px;
    margin-right: 5px;
}
.page .dragarea li strong {
    font-style: normal;
    margin-right: .15in
}
.page .dragarea li.offering {
    text-align: center
}
.page .dragarea li.announcements,
.page .dragarea li.missionary,
.page .dragarea li.sermon {
    text-align: center;
    padding: .1in;
    background-color: #DADADA;
    border: 1px solid #000
}
.page .dragarea li.announcements strong,
.page .dragarea li.missionary strong,
.page .dragarea li.sermon strong {
    margin-right: 0
}
.page .dragarea li.announcements em,
.page .dragarea li.missionary em,
.page .dragarea li.sermon em {
    text-decoration: underline
}
.page .dragarea li.announcements ul,
.page .dragarea li.missionary ul,
.page .dragarea li.sermon ul {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0
}
.page .dragarea li.announcements ul li:before,
.page .dragarea li.missionary ul li:before,
.page .dragarea li.sermon ul li:before {
    margin-right: 20px
}
.page .dragarea li.announcements ul li ul,
.page .dragarea li.missionary ul li ul,
.page .dragarea li.sermon ul li ul {
    padding-left: 31px;
    list-style: none
}
.page .dragarea li.announcements ul li li:before,
.page .dragarea li.missionary ul li li:before,
.page .dragarea li.sermon ul li li:before {
    content: '—'
}
.second-half {
  display: none;
}

.imgBtn{
  width : 55px;
}
.img_item{
  width : 35px;
  margin-right : 55px
}

.md-radio-margin{
  margin-right : 40px
}
@media only screen and (max-width: 740px) {
   .page .dragarea li a.close {
    display: none;
}
}
@media print {
  .page {
    width: 11in;
    height: 8.5in;
    padding: .25in;
    text-align: center;
    font-family: Lato, sans-serif;
    display: flex;
    justify-content: space-between
}
  .page .dragarea li a.close {
    display: none;
}
.second-half {
  display: block;
}
}
</style>
