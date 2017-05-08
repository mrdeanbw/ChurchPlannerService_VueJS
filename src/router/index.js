import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import List from '@/components/List'
import SundayMorningSingle from '@/components/Service'


Vue.use(Router)

export default new Router({
  routes: [
    { 
		path: '/login', 
		name: 'login',
		component: Login
	},
	{ 
		path: '/', 
		component: List,
		beforeEnter: (to, from, next) => {
			console.log("in");
			var app_id = localStorage.getItem('app_id');
			var app_key = localStorage.getItem('app_key');
			if( !(app_id  && app_key) ){
				next('/login');
			}else{
				next();
			}				
		}
	},
	{ 
		path: '/sunday-morning/single/:id', 
		name:'sunday-morning-single', 
		component: SundayMorningSingle,
		beforeEnter: (to, from, next) => {
			var app_id = localStorage.getItem('app_id');
			var app_key = localStorage.getItem('app_key');
			if( !(app_id  && app_key) ){
				next('/login');
			}else{
				next();
			}				
		}
	}
  ]
})
