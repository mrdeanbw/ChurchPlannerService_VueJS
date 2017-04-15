<template>
  <div class="login">
    <div class="form">
    <img src="/static/logo.svg" alt="" class="logo">
    <p class="intro">Enter your <strong>APP ID</strong> and <strong>API Key</strong> below. The browser will store this for you, but you'll have to enter them any time you switch computers or clear your browsing data <strong>so don't lose them.</strong></p>
    <div class="smallform">
      <label>API Key: </label><br>
      <input type="text" v-model="app_key" placeholder="Enter App Key" />
    </div>
    <div class="smallform">
      <label>App ID: </label><br>
      <input type="text" v-model="app_id" placeholder="Enter App ID" />
    </div>
    <button @click="save">Save &amp; Enter</button>
  </div>
  </div><!--/form-->
</template>

<script>
import Router from 'vue-router'
export default {
  name: 'login',
  data () {
    return {
      app_id : '',
      app_key : ''
    }
  },
  mounted:function(){
    if(localStorage.getItem('app_id'))
      this.app_id = localStorage.getItem('app_id');
    if(localStorage.getItem('app_key'))
      this.app_key = localStorage.getItem('app_key');
  },
  methods:{
    save:function(){
      if(this.app_id != "" && this.app_key != ""){
        localStorage.setItem('app_id',this.app_id);
        localStorage.setItem('app_key',this.app_key);
        alert("App details saved.");

        var router = new Router();
        router.push({ path: '/' })
      }
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  background-color: #3877E0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  }
.form {
  width: 340px;
  height: 340px;
  background-color: #ffffff;
  z-index: 1;
  border-radius: 30px;
  padding: 30px;
  font-family: Verdana, arial, sans-serif;
  color: #828C8E;
}
img.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.form p.intro {
  width: 340px;
  text-align: center;
  font-family: Verdana, arial, sans-serif;
  color: #828C8E;
} 

.form .smallform {
  width: 250px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}

.form .smallform input {
  width: 100%;
  height: 25px;
}

.form button {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 30px;
  min-width: 180px;
  font-size: 18px;
  background-color: #3877E0;
  color: #ffffff;
}
</style>
