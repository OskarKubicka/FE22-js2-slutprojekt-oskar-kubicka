function e(e,t,s,n){Object.defineProperty(e,t,{get:s,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},n={},o=t.parcelRequire3a97;null==o&&((o=function(e){if(e in s)return s[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return s[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequire3a97=o),o.register("bD3Co",(function(t,s){var n,o;e(t.exports,"register",(()=>n),(e=>n=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var a={};n=function(e){for(var t=Object.keys(e),s=0;s<t.length;s++)a[t[s]]=e[t[s]]},o=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("bD3Co").register(JSON.parse('{"4k6MD":"profile.26f1e5a9.js","98rEQ":"Asset2.531f19a3.png","1bQjt":"Asset3.9c3a8e9d.png","ST812":"Asset4.faead686.png"}'));const a=document.createElement("img");var r;r=new URL("../"+o("bD3Co").resolve("98rEQ"),import.meta.url).toString();const i=new URL(r);a.src=i.href;const l=document.createElement("img");var c;c=new URL("../"+o("bD3Co").resolve("1bQjt"),import.meta.url).toString();const u=new URL(c);l.src=u.href;const d=document.createElement("img");var p;p=new URL("../"+o("bD3Co").resolve("ST812"),import.meta.url).toString();const f=new URL(p);d.src=f.href;const m=document.querySelector("#list-of-users"),h=document.querySelector("#my-profile"),b=document.querySelector("#status-form"),y=document.querySelector("#delete"),g=document.querySelector("#log-out"),w=document.querySelector("#title"),j=document.querySelector("#comments");function k(e){e.splice(e.indexOf(null),1),async function(e){const t={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json;charset=UTF-8"}},s=await fetch("https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json",t);await s.json()}(e)}(async function(){const e=await fetch("https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()})().then((function(e){e.forEach(((t,s)=>{const{username:n,url:o,status:r,counter:i}=t;if(m){const r=document.createElement("div");if(m.append(r),n==localStorage.getItem("user")&&h){r.style.display="none";const c=document.createElement("h1");if(c.innerText="Välkommen "+n,w&&(w.append(c),"url-1"==o&&w.append(a),"url-2"==o&&w.append(l),"url-3"==o&&w.append(d)),Object.keys(t.status).length>0&&i)for(let e=0;e<Object.keys(t.status).length;e++)if(0!=e){const s=document.createElement("p");s.innerText=t.status[e]+" Likes: "+i[e],s.style.padding="20px",j&&j.append(s)}b&&b.addEventListener("submit",(e=>{e.preventDefault();const n=e.target;if(""!=n[0].value){const e=n[0].value;let o={},a={};if(i){if(Object.keys(t.status).length>0){let s=Object.keys(t.status).length;o[s]=e,a[s]=0;for(let e=0;e<Object.keys(t.status).length;e++)o[e]=t.status[e],a[e]=i[e]}else o[0]=e;a[0]=i[0]}!async function(e,t){const s=`https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${t}/status.json`,n={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json;charset=UTF-8"}},o=await fetch(s,n);await o.json()}(o,s),setTimeout((()=>{!async function(e,t){const s=`https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${t}/counter.json`,n={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json;charset=UTF-8"}},o=await fetch(s,n);await o.json()}(a,s)}),600),setTimeout((()=>{n[0].value="",location.reload()}),1e3)}})),y&&y.addEventListener("click",(()=>{async function t(e){const t=`https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${e}.json`,s=await fetch(t,{method:"DELETE",headers:{"Content-type":"application/json;charset=UTF-8"}});await s.json()}if(1==e.length){let e={users:""};t(s),setTimeout((()=>{!async function(){const t={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json;charset=UTF-8"}},s=await fetch("https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/.json",t);await s.json()}()}),1e3),setTimeout((()=>{location.reload(),window.location.assign("../index.html")}),2e3)}else s==e.length-1?(t(s),setTimeout((()=>{location.reload(),window.location.assign("../index.html")}),500)):(t(s),setTimeout((()=>{(async function(){const e="https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json",t=await fetch(e),s=await t.json();return s})().then(k),setTimeout((()=>{location.reload(),window.location.assign("../index.html")}),500)}),500))}))}r.addEventListener("click",(()=>{localStorage.setItem("differentUser",n),window.location.assign("./userpage.html")}));const c=document.createElement("h1");c.innerText=n,r.append(c),r.style.backgroundColor="hsla(30, 80%, 50%, 1)",r.style.borderRadius="10px",r.style.textAlign="center",r.style.padding="8px 11px",r.style.fontFamily="Rationale, sans-serif;",r.style.margin="10px",r.style.fontSize="x-small",r.style.border="#b2501d solid 15px",r.onmouseover=function(){r.style.cursor="pointer"}}}))})),g&&g.addEventListener("click",(()=>{localStorage.setItem("user",""),window.location.assign("../index.html")}));
//# sourceMappingURL=profile.26f1e5a9.js.map