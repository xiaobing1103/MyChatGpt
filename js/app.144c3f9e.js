(function(e){function t(t){for(var c,r,l=t[0],s=t[1],i=t[2],u=0,p=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(c in s)Object.prototype.hasOwnProperty.call(s,c)&&(e[c]=s[c]);d&&d(t);while(p.length)p.shift()();return n.push.apply(n,i||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],c=!0,r=1;r<a.length;r++){var s=a[r];0!==o[s]&&(c=!1)}c&&(n.splice(t--,1),e=l(l.s=a[0]))}return e}var c={},o={app:0},n=[];function r(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"6cbc2603"}[e]+".js"}function l(t){if(c[t])return c[t].exports;var a=c[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(e){var t=[],a=o[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,c){a=o[e]=[t,c]}));t.push(a[2]=c);var n,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=r(e);var i=new Error;n=function(t){s.onerror=s.onload=null,clearTimeout(u);var a=o[e];if(0!==a){if(a){var c=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+c+": "+n+")",i.name="ChunkLoadError",i.type=c,i.request=n,a[1](i)}o[e]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:s})}),12e4);s.onerror=s.onload=n,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=c,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)l.d(a,c,function(t){return e[t]}.bind(null,c));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var d=i;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"01f0":function(e,t,a){e.exports=a.p+"img/user.56638538.webp"},"0bb6":function(e,t,a){"use strict";a("3a44")},"2c2e":function(e,t,a){"use strict";a("3cab")},"3a44":function(e,t,a){},"3cab":function(e,t,a){},b059:function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),o=(a("3c65"),a("14d9"),a("01f0")),n=a.n(o),r=a("cf05"),l=a.n(r),s=a("90b1"),i=a("cee4"),u=a("7c5c");const d={id:"chatgpt"},p=Object(c["createElementVNode"])("div",{class:"chatgpt-header grid-content bg-purple-dark"}," 二姨的chatgpt ",-1),b={class:"main"},v={class:"view"},f=Object(c["createElementVNode"])("p",{class:"view-text"},"chatgpt基于3.5模型",-1),m=Object(c["createElementVNode"])("div",{class:"view-content"},[Object(c["createElementVNode"])("span",{style:{"font-size":"30px"}},"🤖"),Object(c["createTextVNode"])(" 请问你想要问我什么： ")],-1),j={class:"img"},g={key:0,class:"img-result",src:n.a,alt:"You"},h={key:1,class:"img-result",src:l.a,alt:"chatgpt"},O=["innerHTML"],k={class:"send-Button"},w={class:"before-view"},y=Object(c["createElementVNode"])("p",{class:"before-viewchat"},"上次的聊天",-1),N={class:"before-viewchat-title"},E={class:"img"},V={key:0,class:"img-result",src:n.a,alt:"You"},B={key:1,class:"img-result",src:l.a,alt:"chatgpt"},_=["innerHTML"];var x=Object(c["defineComponent"])({__name:"App",setup(e){const t=Object(c["ref"])(""),a=Object(c["ref"])(2),o=Object(c["ref"])(-1),n=(Object(c["ref"])(!0),Object(c["ref"])(!0),window.localStorage.getItem("message-data")),r=Object(c["reactive"])(n?JSON.parse(n):[]),l=Object(c["reactive"])(n?JSON.parse(n):[]);console.log(l);const x=()=>{""!=t.value&&""!=t.value.trim()&&(-1==o.value&&(r.unshift({name:"",contents:[]}),o.value=0),r[o.value].contents.push({role:"user",content:t.value}),C())};async function C(){const e=s["a"].service({lock:!0,text:"人工智障正在请求数据中",background:"rgba(0, 0, 0, 0.7)"});function n(e,t){console.log(e),r[o.value].contents.push({role:"assistant",content:t||e.data.choices[0].message.content}),window.localStorage.setItem("message-data",JSON.stringify(r))}await Object(i["a"])({method:"post",url:"https://node.fatshady.cn/cors",timeout:6e5,data:{method:"POST",url:"https://api.openai.com/v1/chat/completions",data:{model:"gpt-3.5-turbo",messages:r[o.value].contents},timeout:6e4,headers:{Authorization:"Bearer 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"}}}).then(a=>{if(400==a.data.status)throw a.data;t.value="",n(a.data),e.close()}).catch(a=>{e.close(),t.value="",n(null,`网络请求错误，请联系站长排查！错误内容：\`\`\`${JSON.stringify(a.msg)}\`\`\``)}),Object(c["watch"])(()=>t.value,()=>{const e=t.value.split("\n").length;a.value=24*e})}return(e,n)=>{const s=Object(c["resolveComponent"])("el-col"),i=Object(c["resolveComponent"])("el-row"),C=Object(c["resolveComponent"])("el-header"),S=Object(c["resolveComponent"])("el-card"),T=Object(c["resolveComponent"])("el-input"),L=Object(c["resolveComponent"])("el-button"),P=Object(c["resolveComponent"])("el-container");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",d,[Object(c["createVNode"])(P,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(P,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(C,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(i,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(s,null,{default:Object(c["withCtx"])(()=>[p]),_:1})]),_:1})]),_:1}),Object(c["createElementVNode"])("section",b,[Object(c["createElementVNode"])("section",v,[f,Object(c["createElementVNode"])("div",null,[m,r[o.value]?(Object(c["openBlock"])(),Object(c["createBlock"])(S,{key:0,class:"box-card"},{default:Object(c["withCtx"])(()=>[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(r[o.value].contents,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"result-content",key:t},[Object(c["createElementVNode"])("div",j,["user"==e.role?(Object(c["openBlock"])(),Object(c["createElementBlock"])("img",g)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("img",h))]),Object(c["createElementVNode"])("div",{class:"content",innerHTML:Object(c["unref"])(u["marked"]).parse(e.content)},null,8,O)]))),128))]),_:1})):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("div",k,[Object(c["createVNode"])(T,{modelValue:t.value,"onUpdate:modelValue":n[0]||(n[0]=e=>t.value=e),rows:a.value,placeholder:"请输入内容",type:"textarea"},null,8,["modelValue","rows"]),Object(c["createVNode"])(L,{type:"primary",onClick:x},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("发送")]),_:1})])])]),Object(c["createElementVNode"])("section",w,[y,null!==l&&void 0!==l&&l.length?(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],{key:0},Object(c["renderList"])(l,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:t},[Object(c["createVNode"])(S,{class:"box-card"},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",N," 这个是你"+Object(c["toDisplayString"])(0==t?"上次":`上${t+1}次`)+"与人工智障的聊天记录哦 ",1),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(l[t].contents,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"result-content",key:t},[Object(c["createElementVNode"])("div",E,["user"==e.role?(Object(c["openBlock"])(),Object(c["createElementBlock"])("img",V)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("img",B))]),Object(c["createElementVNode"])("div",{class:"content",innerHTML:Object(c["unref"])(u["marked"]).parse(e.content)},null,8,_)]))),128))]),_:2},1024)]))),128)):Object(c["createCommentVNode"])("",!0)])])]),_:1})]),_:1})])}}});a("0bb6");const C=x;var S=C,T=a("9483");Object(T["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var L=a("6605");const P={class:"home"},A=Object(c["createElementVNode"])("img",{alt:"Vue logo",src:l.a},null,-1);function F(e,t,a,o,n,r){const l=Object(c["resolveComponent"])("HelloWorld");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",P,[A,Object(c["createVNode"])(l,{msg:"Welcome to Your Vue.js + TypeScript App"})])}var H=a("9ab4"),M=a("ce1f");const J={class:"hello"},I=Object(c["createStaticVNode"])('<p data-v-52e4ef9c> For a guide and recipes on how to configure / customize this project,<br data-v-52e4ef9c> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>vue-cli documentation</a>. </p><h3 data-v-52e4ef9c>Installed CLI Plugins</h3><ul data-v-52e4ef9c><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-52e4ef9c>babel</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener" data-v-52e4ef9c>pwa</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener" data-v-52e4ef9c>router</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener" data-v-52e4ef9c>vuex</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-52e4ef9c>eslint</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener" data-v-52e4ef9c>typescript</a></li></ul><h3 data-v-52e4ef9c>Essential Links</h3><ul data-v-52e4ef9c><li data-v-52e4ef9c><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>Core Docs</a></li><li data-v-52e4ef9c><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>Forum</a></li><li data-v-52e4ef9c><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>Community Chat</a></li><li data-v-52e4ef9c><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-52e4ef9c>Twitter</a></li><li data-v-52e4ef9c><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>News</a></li></ul><h3 data-v-52e4ef9c>Ecosystem</h3><ul data-v-52e4ef9c><li data-v-52e4ef9c><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>vue-router</a></li><li data-v-52e4ef9c><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>vuex</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-52e4ef9c>vue-devtools</a></li><li data-v-52e4ef9c><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-52e4ef9c>vue-loader</a></li><li data-v-52e4ef9c><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-52e4ef9c>awesome-vue</a></li></ul>',7);function q(e,t,a,o,n,r){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",J,[Object(c["createElementVNode"])("h1",null,Object(c["toDisplayString"])(e.msg),1),I])}let z=class extends M["b"]{};z=Object(H["a"])([Object(M["a"])({props:{msg:String}})],z);var W=z,D=(a("2c2e"),a("d959")),R=a.n(D);const Y=R()(W,[["render",q],["__scopeId","data-v-52e4ef9c"]]);var $=Y;let U=class extends M["b"]{};U=Object(H["a"])([Object(M["a"])({components:{HelloWorld:$}})],U);var G=U;const K=R()(G,[["render",F]]);var Q=K;const X=[{path:"/",name:"Home",component:Q},{path:"/about",name:"About",component:()=>a.e("about").then(a.bind(null,"f820"))}],Z=Object(L["a"])({history:Object(L["b"])("/"),routes:X});var ee=Z,te=a("5502"),ae=Object(te["a"])({state:{cacheClients:[]},mutations:{},actions:{},modules:{}}),ce=(a("b059"),a("c3a1")),oe=(a("7437"),a("f6f2"));const ne=Object(c["createApp"])(S);for(const[re,le]of Object.entries(oe))ne.component(re,le);ne.use(ae).use(ee).use(ce["a"]).mount("#app")},cf05:function(e,t,a){e.exports=a.p+"img/logo.d52a7c4a.png"}});