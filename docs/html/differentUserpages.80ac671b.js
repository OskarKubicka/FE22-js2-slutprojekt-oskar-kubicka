function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire3a97;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequire3a97=o),o.register("bD3Co",(function(t,n){var r,o;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var s={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)s[t[n]]=e[t[n]]},o=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("bD3Co").register(JSON.parse('{"ddg8Y":"differentUserpages.80ac671b.js","98rEQ":"Asset2.531f19a3.png","1bQjt":"Asset3.9c3a8e9d.png","ST812":"Asset4.faead686.png"}'));const s=document.createElement("img");var a;a=new URL("../"+o("bD3Co").resolve("98rEQ"),import.meta.url).toString();const c=new URL(a);s.src=c.href;const i=document.createElement("img");var l;l=new URL("../"+o("bD3Co").resolve("1bQjt"),import.meta.url).toString();const d=new URL(l);i.src=d.href;const u=document.createElement("img");var f;f=new URL("../"+o("bD3Co").resolve("ST812"),import.meta.url).toString();const p=new URL(f);async function m(e,t,n){const r=`https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/counter.json`,o={method:"PATCH",body:JSON.stringify({[t]:n+1}),headers:{"Content-type":"application/json; charset=UTF-8"}};await fetch(r,o)}u.src=p.href;const g=document.createElement("img"),h=new URL(a);g.src=h.href;const b=document.createElement("img"),w=new URL(l);b.src=w.href;const E=document.createElement("img"),v=new URL(f);E.src=v.href;const y=document.querySelector("#title-user"),S=document.querySelector("#background"),L=document.querySelector("#show-user"),U=document.querySelector("#show-list");(async function(){const e=await fetch("https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()})().then((function(e){e.forEach(((e,t)=>{const{username:n,url:r,counter:o}=e;if(U&&o){const s=document.createElement("div");if(U.append(s),n==localStorage.getItem("differentUser")&&y&&L){s.style.display="none";const a=document.createElement("h1");a.innerText=n,"url-1"==r?y.append(g):"url-2"==r?y.append(b):"url-3"==r&&y.append(E),y.append(a),function(e,t,n,r){if(Object.keys(e.status).length>0)for(let o=0;o<Object.keys(e.status).length;o++)if(0!=o){const s=document.createElement("p");s.innerText=e.status[o]+". Likes: "+t[o];const a=document.createElement("button");s.append(a),a.innerHTML="Like",a.addEventListener("click",(()=>{console.log(t[o]),m(r,o,t[o]).then((function(){location.reload()}))})),n.append(s),n.style.height="100vh"}}(e,o,L,t)}!function(e,t){e.addEventListener("click",(()=>{localStorage.setItem("differentUser",t),window.location.assign("./differentUserpages.html")}));const n=document.createElement("h1");if(n.innerText=t,t!=localStorage.getItem("user"))e.append(n);else{const e=document.createElement("div");S&&S.append(e),n.innerText="Hem",n.style.fontSize="large",e.append(n),e.setAttribute("id","home"),e.addEventListener("click",(()=>{window.location.assign("./profile.html")}))}}(s,n)}}))}));
//# sourceMappingURL=differentUserpages.80ac671b.js.map