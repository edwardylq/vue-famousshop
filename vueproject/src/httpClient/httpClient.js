import axios from 'axios';
const baseUrl="http://10.3.136.98:8080";
// const baseUrl="http://localhost:8080";
import router from '../router/index.js';
export default {
    get(_url,_params){
        var url=_url &&_url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve,reject)=>{
            axios({
                url:url,
                method:'get',
                params:_params||{},
                headers:{Authorization:window.sessionStorage.getItem('litoken')}
            }).then(res=>{
                if(!res.data.status && res.data.error =='unauthorized'){
                    router.push('/login');
                    return false;
                }
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    post(_url,_params){
        var url=_url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve,reject)=>{
            axios({
                url:url,
                method:'post',
                data:_params || {},
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: window.sessionStorage.getItem('litoken')
                },
                transformRequest:[ function (data){
                    let ret='';
                    for(let it in data){
                         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                }]
            }).then(res=>{
                // console.log(res);
                if(!res.data.status && res.data.error =='unauthorized'){
                   router.push('/login');
                   return false; 
                }
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        })
    } 
}

