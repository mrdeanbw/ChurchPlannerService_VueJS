<template>
  <div class="sunday-evening-single">
    <span v-if="loading">Loading data...</span>
    <div class="page" v-if="item">
      <div class="half-page">
        <div class="header">
          <h1>PM Order of Service</h1>
          <h2>{{ item.fields.Date | moment }}</h2>
        </div><!--/header-->
        <div class="order">
          <ol>
            <li v-if="item.fields.Opening_Hymn"><strong>Hymn:</strong> {{ item.fields.Opening_Hymn ? item.fields.opening_hymn_number[0] + ', '+item.fields.opening_hymn_title[0] : '-' }}</li>
            <li><strong>Welcome &amp; Prayer</strong></li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Patch Singing'">{{ item.fields.extra_description[0] }}</li>
            </span>
            <li v-if="item.fields.chorus_name[0]"><strong>Chorus & Fellowship:</strong> {{item.fields.chorus_name[0]}}</li>
            <span v-if='item.fields.Special'>
            <li v-if="item.fields.special_position === 'Before Hymns'">
              <strong>Special: </strong>{{ item.fields.Special_song_name[0] }} by {{ item.fields.Special_singer[0] }}
            </li>
            </span>
            <li v-if="item.fields.Hymns" v-for="(hymn_item,index) in item.fields.Hymns">
              <strong>Hymn: </strong> {{ item.fields.Hymn_Number[index] }}, {{ item.fields.Hymn_Title[index] }}
            </li>
            <li class="announcements" v-if="item.fields.Announcements">
              <strong>Announcements:</strong>
              <br>
              <ul>
                <li v-for="(announcement_item,index) in item.fields.Announcements">
                  {{ item.fields.announcement_name[index] }}
                </li>
              </ul>
            </li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Missionary'">{{ item.fields.extra_description[0] }}</li>
            </span>
            <li class="offering"><strong>Offering</strong></li>
            <span v-if='item.fields.Special'>
            <li v-if="item.fields.special_position === 'Before Sermon'">
              <strong>Special: </strong>{{ item.fields.Special_song_name[0] }} by {{ item.fields.Special_singer[0] }}
            </li>
            </span>
            <li class="sermon" v-if="item.fields.Sermon">
              <strong>Sermon: </strong>
              <br>
              <em>{{item.fields.sermon_name[0]}}</em> <br>by {{item.fields.sermon_preacher[0]}}
            </li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Special Presentation'">{{ item.fields.extra_description[0] }}</li>
            </span>
          </ol>          
        </div><!--/order-->
        </div><!--/half-page-->
        <div class="half-page">
        <div class="header">
          <h1>PM Order of Service</h1>
          <h2>{{ item.fields.Date | moment }}</h2>
        </div><!--/header-->
        <div class="order">
          <ol>
            <li v-if="item.fields.Opening_Hymn"><strong>Hymn:</strong> {{ item.fields.Opening_Hymn ? item.fields.opening_hymn_number[0] + ', '+item.fields.opening_hymn_title[0] : '-' }}</li>
            <li><strong>Welcome &amp; Prayer</strong></li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Patch Singing'">{{ item.fields.extra_description[0] }}</li>
            </span>
            <li v-if="item.fields.chorus_name[0]"><strong>Chorus & Fellowship:</strong> {{item.fields.chorus_name[0]}}</li>
            <span v-if='item.fields.Special'>
            <li v-if="item.fields.special_position === 'Before Hymns'">
              <strong>Special: </strong>{{ item.fields.Special_song_name[0] }} by {{ item.fields.Special_singer[0] }}
            </li>
            </span>
            <li v-if="item.fields.Hymns" v-for="(hymn_item,index) in item.fields.Hymns">
              <strong>Hymn: </strong> {{ item.fields.Hymn_Number[index] }}, {{ item.fields.Hymn_Title[index] }}
            </li>
            <li class="announcements" v-if="item.fields.Announcements">
              <strong>Announcements:</strong>
              <br>
              <ul>
                <li v-for="(announcement_item,index) in item.fields.Announcements">
                  {{ item.fields.announcement_name[index] }}
                </li>
              </ul>
            </li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Missionary'">{{ item.fields.extra_description[0] }}</li>
            </span>
            <li class="offering"><strong>Offering</strong></li>
            <span v-if='item.fields.Special'>
            <li v-if="item.fields.special_position === 'Before Sermon'">
              <strong>Special: </strong>{{ item.fields.Special_song_name[0] }} by {{ item.fields.Special_singer[0] }}
            </li>
            </span>
            <li class="sermon" v-if="item.fields.Sermon">
              <strong>Sermon: </strong>
              <br>
              <em>{{item.fields.sermon_name[0]}}</em> <br>by {{item.fields.sermon_preacher[0]}}
            </li>
            <span v-if="item.fields.Extra">
            <li class="missionary" v-if="item.fields.extra_type[0] === 'Special Presentation'">{{ item.fields.extra_description[0] }}</li>
            </span>
          </ol>          
        </div><!--/order-->
        </div><!--/half-page-->
      </div><!--/page-->
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'sunday_evening_single',
  data:function(){
    return {
      id : '',
      item: null,
      app_id : '',
      app_key : '',
      loading: false
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
    getAppCredentials:function(){
      if(localStorage.getItem('app_id'))
        this.app_id = localStorage.getItem('app_id');
      if(localStorage.getItem('app_key'))
        this.app_key = localStorage.getItem('app_key');
    },
    getItem:function(){
      var _self = this;
      this.loading = true;
      if(this.app_id != "" && this.app_key != ""){
        axios.get('https://api.airtable.com/v0/'+this.app_id+'/Sunday_Evening/'+this.id+'?api_key='+this.app_key)
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
@charset "UTF-8";@import url(https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i);.page h1,.page h2{text-align:center;margin-top:0}.page h2,.page ol{font-style:italic}.page{width:11in;height:8.5in;padding:.25in;text-align:center;font-family:Lato,sans-serif;display:flex;justify-content:space-between}.half-page{width:4.75in}.page h1{font-size:20pt;weight:900;line-height:24pt;margin-bottom:0}.page h2{font-size:18pt;weight:400;line-height:100%}.page .header{border-bottom:1px solid #000;margin-bottom:.25in}.page ol{list-style-type:none;padding-left:0;margin:0;font-size:14pt;line-height:16pt;text-align:left}.page ol li{margin-bottom:.3in}.page ol li strong{font-style:normal;margin-right:.15in}.page ol li.offering{text-align:center}.page ol li.announcements,.page ol li.missionary,.page ol li.sermon{text-align:center;padding:.1in;background-color:#DADADA;border:1px solid #000}.page ol li.announcements strong,.page ol li.missionary strong,.page ol li.sermon strong{margin-right:0}.page ol li.announcements em,.page ol li.missionary em,.page ol li.sermon em{text-decoration:underline}.page ol li.announcements ul,.page ol li.missionary ul,.page ol li.sermon ul{list-style-type:none;margin-left:0;padding-left:0}.page ol li.announcements ul li:before,.page ol li.missionary ul li:before,.page ol li.sermon ul li:before{content:'•';margin-right:20px}.page ol li.announcements ul li ul,.page ol li.missionary ul li ul,.page ol li.sermon ul li ul{padding-left:31px;list-style:none}.page ol li.announcements ul li li:before,.page ol li.missionary ul li li:before,.page ol li.sermon ul li li:before{content:'—'}
</style>
