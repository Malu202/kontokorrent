!function(){var t={1530:function(t,e,n){"use strict";var r=n(8710).charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9670:function(t,e,n){var r=n(111);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},1318:function(t,e,n){var r=n(5656),o=n(7466),a=n(1400),i=function(t){return function(e,n,i){var s,c=r(e),u=o(c.length),l=a(i,u);if(t&&n!=n){for(;u>l;)if((s=c[l++])!=s)return!0}else for(;u>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:i(!0),indexOf:i(!1)}},4326:function(t){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},9920:function(t,e,n){var r=n(6656),o=n(3887),a=n(1236),i=n(3070);t.exports=function(t,e){for(var n=o(e),s=i.f,c=a.f,u=0;u<n.length;u++){var l=n[u];r(t,l)||s(t,l,c(e,l))}}},8880:function(t,e,n){var r=n(9781),o=n(3070),a=n(9114);t.exports=r?function(t,e,n){return o.f(t,e,a(1,n))}:function(t,e,n){return t[e]=n,t}},9114:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},9781:function(t,e,n){var r=n(7293);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(t,e,n){var r=n(7854),o=n(111),a=r.document,i=o(a)&&o(a.createElement);t.exports=function(t){return i?a.createElement(t):{}}},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,e,n){var r=n(7854),o=n(1236).f,a=n(8880),i=n(1320),s=n(3505),c=n(9920),u=n(4705);t.exports=function(t,e){var n,l,f,h,d,p=t.target,g=t.global,w=t.stat;if(n=g?r:w?r[p]||s(p,{}):(r[p]||{}).prototype)for(l in e){if(h=e[l],f=t.noTargetGet?(d=o(n,l))&&d.value:n[l],!u(g?l:p+(w?".":"#")+l,t.forced)&&void 0!==f){if(typeof h==typeof f)continue;c(h,f)}(t.sham||f&&f.sham)&&a(h,"sham",!0),i(n,l,h,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},7007:function(t,e,n){"use strict";n(4916);var r=n(1320),o=n(7293),a=n(5112),i=n(2261),s=n(8880),c=a("species"),u=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l="$0"==="a".replace(/./,"$0"),f=a("replace"),h=!!/./[f]&&""===/./[f]("a","$0"),d=!o((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=a(t),g=!o((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),w=g&&!o((function(){var e=!1,n=/a/;return"split"===t&&((n={}).constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!g||!w||"replace"===t&&(!u||!l||h)||"split"===t&&!d){var y=/./[p],v=n(p,""[t],(function(t,e,n,r,o){return e.exec===i?g&&!o?{done:!0,value:y.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:h}),k=v[0],b=v[1];r(String.prototype,t,k),r(RegExp.prototype,p,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}f&&s(RegExp.prototype[p],"sham",!0)}},5005:function(t,e,n){var r=n(857),o=n(7854),a=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?a(r[t])||a(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},7854:function(t,e,n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||Function("return this")()},6656:function(t){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},3501:function(t){t.exports={}},4664:function(t,e,n){var r=n(9781),o=n(7293),a=n(317);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,e,n){var r=n(7293),o=n(4326),a="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?a.call(t,""):Object(t)}:Object},2788:function(t,e,n){var r=n(5465),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},9909:function(t,e,n){var r,o,a,i=n(8536),s=n(7854),c=n(111),u=n(8880),l=n(6656),f=n(5465),h=n(6200),d=n(3501),p=s.WeakMap;if(i){var g=f.state||(f.state=new p),w=g.get,y=g.has,v=g.set;r=function(t,e){return e.facade=t,v.call(g,t,e),e},o=function(t){return w.call(g,t)||{}},a=function(t){return y.call(g,t)}}else{var k=h("state");d[k]=!0,r=function(t,e){return e.facade=t,u(t,k,e),e},o=function(t){return l(t,k)?t[k]:{}},a=function(t){return l(t,k)}}t.exports={set:r,get:o,has:a,enforce:function(t){return a(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!c(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},4705:function(t,e,n){var r=n(7293),o=/#|\.prototype\./,a=function(t,e){var n=s[i(t)];return n==u||n!=c&&("function"==typeof e?r(e):!!e)},i=a.normalize=function(t){return String(t).replace(o,".").toLowerCase()},s=a.data={},c=a.NATIVE="N",u=a.POLYFILL="P";t.exports=a},111:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},1913:function(t){t.exports=!1},133:function(t,e,n){var r=n(7293);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},8536:function(t,e,n){var r=n(7854),o=n(2788),a=r.WeakMap;t.exports="function"==typeof a&&/native code/.test(o(a))},3070:function(t,e,n){var r=n(9781),o=n(4664),a=n(9670),i=n(7593),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(a(t),e=i(e,!0),a(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},1236:function(t,e,n){var r=n(9781),o=n(5296),a=n(9114),i=n(5656),s=n(7593),c=n(6656),u=n(4664),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=i(t),e=s(e,!0),u)try{return l(t,e)}catch(t){}if(c(t,e))return a(!o.f.call(t,e),t[e])}},8006:function(t,e,n){var r=n(6324),o=n(748).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},5181:function(t,e){e.f=Object.getOwnPropertySymbols},6324:function(t,e,n){var r=n(6656),o=n(5656),a=n(1318).indexOf,i=n(3501);t.exports=function(t,e){var n,s=o(t),c=0,u=[];for(n in s)!r(i,n)&&r(s,n)&&u.push(n);for(;e.length>c;)r(s,n=e[c++])&&(~a(u,n)||u.push(n));return u}},5296:function(t,e){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,o=r&&!n.call({1:2},1);e.f=o?function(t){var e=r(this,t);return!!e&&e.enumerable}:n},3887:function(t,e,n){var r=n(5005),o=n(8006),a=n(5181),i=n(9670);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(i(t)),n=a.f;return n?e.concat(n(t)):e}},857:function(t,e,n){var r=n(7854);t.exports=r},1320:function(t,e,n){var r=n(7854),o=n(8880),a=n(6656),i=n(3505),s=n(2788),c=n(9909),u=c.get,l=c.enforce,f=String(String).split("String");(t.exports=function(t,e,n,s){var c,u=!!s&&!!s.unsafe,h=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof e||a(n,"name")||o(n,"name",e),(c=l(n)).source||(c.source=f.join("string"==typeof e?e:""))),t!==r?(u?!d&&t[e]&&(h=!0):delete t[e],h?t[e]=n:o(t,e,n)):h?t[e]=n:i(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||s(this)}))},7651:function(t,e,n){var r=n(4326),o=n(2261);t.exports=function(t,e){var n=t.exec;if("function"==typeof n){var a=n.call(t,e);if("object"!=typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},2261:function(t,e,n){"use strict";var r,o,a=n(7066),i=n(2999),s=RegExp.prototype.exec,c=String.prototype.replace,u=s,l=(r=/a/,o=/b*/g,s.call(r,"a"),s.call(o,"a"),0!==r.lastIndex||0!==o.lastIndex),f=i.UNSUPPORTED_Y||i.BROKEN_CARET,h=void 0!==/()??/.exec("")[1];(l||h||f)&&(u=function(t){var e,n,r,o,i=this,u=f&&i.sticky,d=a.call(i),p=i.source,g=0,w=t;return u&&(-1===(d=d.replace("y","")).indexOf("g")&&(d+="g"),w=String(t).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==t[i.lastIndex-1])&&(p="(?: "+p+")",w=" "+w,g++),n=new RegExp("^(?:"+p+")",d)),h&&(n=new RegExp("^"+p+"$(?!\\s)",d)),l&&(e=i.lastIndex),r=s.call(u?n:i,w),u?r?(r.input=r.input.slice(g),r[0]=r[0].slice(g),r.index=i.lastIndex,i.lastIndex+=r[0].length):i.lastIndex=0:l&&r&&(i.lastIndex=i.global?r.index+r[0].length:e),h&&r&&r.length>1&&c.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)})),r}),t.exports=u},7066:function(t,e,n){"use strict";var r=n(9670);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},2999:function(t,e,n){"use strict";var r=n(7293);function o(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},4488:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},3505:function(t,e,n){var r=n(7854),o=n(8880);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},6200:function(t,e,n){var r=n(2309),o=n(9711),a=r("keys");t.exports=function(t){return a[t]||(a[t]=o(t))}},5465:function(t,e,n){var r=n(7854),o=n(3505),a="__core-js_shared__",i=r[a]||o(a,{});t.exports=i},2309:function(t,e,n){var r=n(1913),o=n(5465);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.8.1",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},8710:function(t,e,n){var r=n(9958),o=n(4488),a=function(t){return function(e,n){var a,i,s=String(o(e)),c=r(n),u=s.length;return c<0||c>=u?t?"":void 0:(a=s.charCodeAt(c))<55296||a>56319||c+1===u||(i=s.charCodeAt(c+1))<56320||i>57343?t?s.charAt(c):a:t?s.slice(c,c+2):i-56320+(a-55296<<10)+65536}};t.exports={codeAt:a(!1),charAt:a(!0)}},1400:function(t,e,n){var r=n(9958),o=Math.max,a=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):a(n,e)}},5656:function(t,e,n){var r=n(8361),o=n(4488);t.exports=function(t){return r(o(t))}},9958:function(t){var e=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:e)(t)}},7466:function(t,e,n){var r=n(9958),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},7908:function(t,e,n){var r=n(4488);t.exports=function(t){return Object(r(t))}},7593:function(t,e,n){var r=n(111);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},9711:function(t){var e=0,n=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++e+n).toString(36)}},3307:function(t,e,n){var r=n(133);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},5112:function(t,e,n){var r=n(7854),o=n(2309),a=n(6656),i=n(9711),s=n(133),c=n(3307),u=o("wks"),l=r.Symbol,f=c?l:l&&l.withoutSetter||i;t.exports=function(t){return a(u,t)||(s&&a(l,t)?u[t]=l[t]:u[t]=f("Symbol."+t)),u[t]}},4916:function(t,e,n){"use strict";var r=n(2109),o=n(2261);r({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},5306:function(t,e,n){"use strict";var r=n(7007),o=n(9670),a=n(7908),i=n(7466),s=n(9958),c=n(4488),u=n(1530),l=n(7651),f=Math.max,h=Math.min,d=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g;r("replace",2,(function(t,e,n,r){var w=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,y=r.REPLACE_KEEPS_$0,v=w?"$":"$0";return[function(n,r){var o=c(this),a=null==n?void 0:n[t];return void 0!==a?a.call(n,o,r):e.call(String(o),n,r)},function(t,r){if(!w&&y||"string"==typeof r&&-1===r.indexOf(v)){var a=n(e,t,this,r);if(a.done)return a.value}var c=o(t),d=String(this),p="function"==typeof r;p||(r=String(r));var g=c.global;if(g){var b=c.unicode;c.lastIndex=0}for(var m=[];;){var I=l(c,d);if(null===I)break;if(m.push(I),!g)break;""===String(I[0])&&(c.lastIndex=u(d,i(c.lastIndex),b))}for(var x,A="",z=0,S=0;S<m.length;S++){I=m[S];for(var E=String(I[0]),j=f(h(s(I.index),d.length),0),O=[],T=1;T<I.length;T++)O.push(void 0===(x=I[T])?x:String(x));var B=I.groups;if(p){var P=[E].concat(O,j,d);void 0!==B&&P.push(B);var $=String(r.apply(void 0,P))}else $=k(E,d,j,O,B,r);j>=z&&(A+=d.slice(z,j)+$,z=j+E.length)}return A+d.slice(z)}];function k(t,n,r,o,i,s){var c=r+t.length,u=o.length,l=g;return void 0!==i&&(i=a(i),l=p),e.call(s,l,(function(e,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":s=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return e;if(l>u){var f=d(l/10);return 0===f?e:f<=u?void 0===o[f-1]?a.charAt(1):o[f-1]+a.charAt(1):e}s=o[l-1]}return void 0===s?"":s}))}}))}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";async function t(t,e,n){let r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)};return n&&(r.headers=Object.assign(Object.assign({},r.headers),{Authorization:`Bearer ${n}`})),await fetch(t,r)}var e;!function(t){t.google="google",t.anonym="anonym"}(e||(e={}));class r{constructor(t){this.networkError=t}}class o{}class a{}let i;i="https://kontokorrent.azurewebsites.net";const s="https://kontokorrent.azurewebsites.net";class c{}class u{}class l{}const f=s;class h{constructor(t){this.accountInfoStore=t}async neuerBenutzer(e,n){try{return(await t(`${f}/api/v2/accounts`,{id:e,secret:n})).ok?{success:!0}:{success:!1}}catch(t){return{success:!1}}}async getUserInfo(){let t=await fetch(`${f}/api/v2/userinfo`,{headers:await this.getAuthHeader()});return await t.json()}async getAuthHeader(){return{Authorization:`Bearer ${await this.getAccessToken()}`}}async kontokorrentHinzufuegen(t,e){let n="";n=t?`oeffentlicherName=${encodeURIComponent(t)}`:`einladungsCode=${encodeURIComponent(e)}`;let r=await this.getAuthHeader(),o=await fetch(`${f}/api/v2/kontokorrents?${n}`,{method:"PUT",headers:r});return 404==o.status?null:await o.json()}async kontokorrentsAuflisten(){let t=await fetch(`${f}/api/v2/kontokorrents`,{headers:await this.getAuthHeader()});if(!t.ok)throw new a;return await t.json()}async neuerKontokorrent(e){let n=await t(`${f}/api/v2/kontokorrents`,e,await this.getAccessToken());return 422==n.status?{success:!1,exists:!0}:n.ok?{success:!0}:{success:!1}}async getAktionen(t,e){let n=e?`?ab=${e}`:"",r=await fetch(`${f}/api/v2/kontokorrents/${t}/aktionen${n}`,{headers:await this.getAuthHeader()});if(404==r.status)return{success:!1,notfound:!0};if(r.ok){let t=await r.json();return{success:!0,aktionen:this.mapAktionen(t)}}}mapAktionen(t){for(let e of t)e.bezahlung&&(e.bezahlung.zeitpunkt=new Date(e.bezahlung.zeitpunkt));return t}async neueBezahlung(t,e){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.hinzufuegenaktion+json",Authorization:`Bearer ${await this.getAccessToken()}`},body:JSON.stringify(e)},r=await fetch(`${f}/api/v2/kontokorrents/${t}/aktionen`,n);if(r.ok){let t=await r.json();return this.mapAktionen([t])[0]}throw new c}async bezahlungLoeschen(t,e){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.loeschenaktion+json",Authorization:`Bearer ${await this.getAccessToken()}`},body:JSON.stringify({id:e})},r=await fetch(`${f}/api/v2/kontokorrents/${t}/aktionen`,n);if(r.ok){let t=await r.json();return this.mapAktionen([t])[0]}throw new l}async bezahlungBearbeiten(t,e){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.bearbeitenaktion+json",Authorization:`Bearer ${await this.getAccessToken()}`},body:JSON.stringify(e)},r=await fetch(`${f}/api/v2/kontokorrents/${t}/aktionen`,n);if(r.ok){let t=await r.json();return this.mapAktionen([t])[0]}throw new u}async getAccessToken(){let n=await this.accountInfoStore.get();if(null==n)throw new Error("Keine Account Information gespeichert.");if(n.type==e.anonym){let e,o=await this.accountInfoStore.getAccessToken("anonymous");if(null!=o){let{token:t,expires:e}=JSON.parse(o.value);if(t&&e&&e>=+new Date)return t}try{let o=await t(`${f}/api/v2/token`,{id:n.id,secret:n.secret});if(!o.ok)throw new r(!1);e=await o.json()}catch(t){throw new r(!0)}return await this.accountInfoStore.updateAccessTokenIfNewer("anonymous",JSON.stringify(e),null==o?void 0:o.timestamp),e.token}throw n.type==e.google?new o:new Error(`Account Typ ${n.type} unbekannt`)}}class d{constructor(t){this.db=t}async set(t){await this.db.setAccountInfo(t)}async get(){return await this.db.getAccountInfo()}async clear(){await this.db.clearAccountInfo()}async getAccessToken(t){return await this.db.getAccessToken(t)}async updateAccessTokenIfNewer(t,e,n){return await this.db.updateAccessTokenIfNewer(t,e,n)}}let p,g;n(5306);const w=new WeakMap,y=new WeakMap,v=new WeakMap,k=new WeakMap,b=new WeakMap;let m={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return y.get(t);if("objectStoreNames"===e)return t.objectStoreNames||v.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return x(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function I(t){return"function"==typeof t?(e=t)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(g||(g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(A(this),t),x(w.get(this))}:function(...t){return x(e.apply(A(this),t))}:function(t,...n){const r=e.call(A(this),t,...n);return v.set(r,t.sort?t.sort():[t]),x(r)}:(t instanceof IDBTransaction&&function(t){if(y.has(t))return;const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{e(),r()},a=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)}));y.set(t,e)}(t),n=t,(p||(p=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>n instanceof t))?new Proxy(t,m):t);var e,n}function x(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{e(x(t.result)),r()},a=()=>{n(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",a)}));return e.then((e=>{e instanceof IDBCursor&&w.set(e,t)})).catch((()=>{})),b.set(e,t),e}(t);if(k.has(t))return k.get(t);const e=I(t);return e!==t&&(k.set(t,e),b.set(e,t)),e}const A=t=>b.get(t),z=["get","getKey","getAll","getAllKeys","count"],S=["put","add","delete","clear"],E=new Map;function j(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(E.get(e))return E.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,o=S.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!z.includes(n))return;const a=async function(t,...e){const a=this.transaction(t,o?"readwrite":"readonly");let i=a.store;r&&(i=i.index(e.shift()));const s=await i[n](...e);return o&&await a.done,s};return E.set(e,a),a}var O;O=m,m={...O,get:(t,e,n)=>j(t,e)||O.get(t,e,n),has:(t,e)=>!!j(t,e)||O.has(t,e)};const T="KontokorrentsStore",B="AppStateStore",P="AktionenStore",$="NeueBezahlungenStore";class N{async withInitialized(t){let e=await function(t,e,{blocked:n,upgrade:r,blocking:o,terminated:a}={}){const i=indexedDB.open(t,e),s=x(i);return r&&i.addEventListener("upgradeneeded",(t=>{r(x(i.result),t.oldVersion,t.newVersion,x(i.transaction))})),n&&i.addEventListener("blocked",(()=>n())),s.then((t=>{a&&t.addEventListener("close",(()=>a())),o&&t.addEventListener("versionchange",(()=>o()))})).catch((()=>{})),s}("kontokorrent-db",5,{upgrade(t,e,n){e<1&&t.createObjectStore(T,{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName"),e<2&&t.createObjectStore(B,{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null}),e<3&&t.createObjectStore(P,{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId"),e<5&&(t.objectStoreNames.contains($)&&t.deleteObjectStore($),t.createObjectStore($,{keyPath:"id"}).createIndex("kontokorrentId","kontokorrentId"))}});try{return await t(e)}finally{e.close()}}async getKontokorrents(){return await this.withInitialized((async t=>{return e=await t.getAll(T),n=t=>t.name,e.sort(((t,e)=>n(t).toLowerCase().localeCompare(n(e).toLowerCase())));var e,n}))}async addAktionen(t,e){if(!e.length)return;let n=e.map((e=>Object.assign(Object.assign({},e),{kontokorrentId:t})));return await this.withInitialized((e=>{const r=A(e);return new Promise(((e,o)=>{const a=r.transaction(P,"readwrite");a.onerror=t=>{console.error("addAktionen failed",t,a.error),o(a.error)},a.oncomplete=()=>{e()};for(let e of n){let n=a.objectStore(P).add(e);n.onerror=r=>{"ConstraintError"==n.error.name?(console.log(`Aktion ${e.laufendeNummer} für Kontokorrent ${t} bereits gespeichert.`,r,n.error),r.preventDefault(),r.stopPropagation()):console.error(`Aktion ${e.laufendeNummer} für Kontokorrent ${t} konnte nicht gespeichert werden.`,r,n.error)}}}))}))}async getZuletztGesehenerKontokorrentId(){return await this.withInitialized((async t=>{let e=await t.get(B,0);if(e.zuletztGesehenerKontokorrentId)return e.zuletztGesehenerKontokorrentId;{let t=await await this.getKontokorrents();return t.length?t[0].id:null}}))}async setZuletztGesehenerKontokorrentId(t){return await this.withInitialized((async e=>{let n=await e.get(B,0);n.zuletztGesehenerKontokorrentId=t,await e.put(B,n)}))}async setKontokorrents(t){return await this.withInitialized((async e=>{let n=await e.getAll(T);for(let r of n.filter((e=>!t.some((t=>e.id===t.id)))))await e.delete(T,r.id);let r=[];for(let o of t){let t=n.find((t=>t.id==o.id));t||r.push(o.id);let a=Object.assign(Object.assign({},t),{name:o.name,personen:o.personen,id:o.id,oeffentlicherName:o.oeffentlicherName});await e.put(T,a)}return r}))}async addKontokorrent(t){return await this.withInitialized((async e=>{await e.get(T,t.id)||await e.add(T,t)}))}async getKontokorrent(t){return await this.withInitialized((async e=>await e.get(T,t)))}async getPerOeffentlichName(t){return await this.withInitialized((async e=>await e.getFromIndex(T,"oeffentlicherName",t)))}async getAktionen(t){return await this.withInitialized((async e=>await e.getAllFromIndex(P,"kontokorrentId",t)))}async clear(){return await this.withInitialized((async t=>{await t.clear(P),await t.clear(T),await t.put(B,{id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null})}))}async getAccessToken(t){return await this.withInitialized((async e=>((await e.get(B,0)).accesstokens||[]).find((e=>e.type===t))))}async updateAccessTokenIfNewer(t,e,n){return await this.withInitialized((async r=>{const o=r.transaction(B,"readwrite",{durability:"strict"});let a=await o.store.get(0);a.accesstokens||(a.accesstokens=[]);let i=a.accesstokens.find((e=>e.type===t));if(i){if(i.timestamp!=n)return console.error(`The accesstoken of type ${t} was already updated since reading.`),await o.done,!1;i.value=e,i.timestamp++}else a.accesstokens.push({timestamp:1,type:t,value:e});return await o.store.put(a),await o.done,!0}))}async setAccountInfo(t){return await this.withInitialized((async e=>{const n=e.transaction(B,"readwrite");let r=await n.store.get(0);r.accountinfo=t,await n.store.put(r),await n.done}))}async getAccountInfo(){return await this.withInitialized((async t=>{const e=t.transaction(B,"readonly");let n=await e.store.get(0);return null==n?void 0:n.accountinfo}))}async clearAccountInfo(){return await this.withInitialized((async t=>{const e=t.transaction(B,"readwrite");let n=await e.store.get(0);n.accountinfo=null,n.accesstokens=[],await e.store.put(n),await e.done}))}async getZwischengespeicherteBezahlungen(){return await this.withInitialized((async t=>await t.getAll($)))}async getBezahlungAktion(t,e){return await this.withInitialized((async n=>{var r=n.getAllFromIndex(P,"kontokorrentId",t);return(await r).find((t=>t.bezahlung&&t.bezahlung.id==e))}))}async getBearbeitungsStatus(t,e){return await this.withInitialized((async n=>{let r=await n.getAllFromIndex(P,"kontokorrentId",t),o=r.find((t=>t.bezahlung&&t.bezahlung.id==e));return o?null!=r.find((t=>t.bearbeiteteBezahlungId==e))?{aktion:o,status:2}:null!=r.find((t=>t.geloeschteBezahlungId==e))?{aktion:o,status:3}:{aktion:o,status:4}:(await n.getAllFromIndex($,"kontokorrentId",t)).find((t=>t.id==e))?{aktion:null,status:1}:{aktion:null,status:0}}))}async getZwischengespeicherteBezahlungenForKontokorrent(t){return await this.withInitialized((async e=>await e.getAllFromIndex($,"kontokorrentId",t)))}async bezahlungZwischenspeichern(t){return await this.withInitialized((async e=>{e.add($,t)}))}async zwischengespeicherteBezahlungErledigt(t){await this.withInitialized((async e=>{e.delete($,t)}))}}class D{constructor(t,e){this.apiClient=t,this.db=e}async bezahlungAnlegen(t,e){let n=await this.apiClient.neueBezahlung(t,e);return this.db.addAktionen(t,[n]),n}async bezahlungBearbeiten(t,e){let n=await this.apiClient.bezahlungBearbeiten(t,e);return this.db.addAktionen(t,[n]),n}async bezahlungLoeschen(t,e){let n=await this.apiClient.bezahlungLoeschen(t,e);return this.db.addAktionen(t,[n]),n}}class C{constructor(t,e){this.kontokorrentId=t,this.bezahlungId=e,this.type=25}}class L{constructor(t,e){this.kontokorrentId=t,this.bezahlungId=e,this.type=26}}let R={code:"code-3358b1e9649dba3cbd1732bde6c5c316722dac48",asset:"asset-v1",webfont:"webfont"};async function K(t){const e=await self.clients.matchAll();for(const n of e)n.postMessage({type:"statedispatch",msg:t})}self.addEventListener("install",(function(t){let e=[{'revision':null,'url':'/v2/03b04fd5d322707a1c92.bundle.js'},{'revision':null,'url':'/v2/18016ad6c20d8b98cbed.bundle.js'},{'revision':null,'url':'/v2/220.8c5b220bf6f482881a90.css'},{'revision':null,'url':'/v2/2e384b4be0d8dd92f0a5.bundle.js'},{'revision':null,'url':'/v2/37d31356754f9375c485.bundle.js'},{'revision':null,'url':'/v2/443.9ac55577324a9d8770ee.css'},{'revision':null,'url':'/v2/493.505ccf4a800e1bfdffd6.css'},{'revision':null,'url':'/v2/4dac6b29fa73b28bbebf.bundle.js'},{'revision':null,'url':'/v2/4ecb940578583eee0f86.bundle.js'},{'revision':null,'url':'/v2/575.e256e36af4cdca485fe4.css'},{'revision':null,'url':'/v2/57ab50f3e041c05b6385.bundle.js'},{'revision':null,'url':'/v2/581.235039f640690a82cbb1.css'},{'revision':null,'url':'/v2/635.806c079fde03ae5e3fe0.css'},{'revision':null,'url':'/v2/697.1978569dbeabf274902f.css'},{'revision':null,'url':'/v2/7ed920b106fc209236b0.bundle.js'},{'revision':null,'url':'/v2/7ef16d73f3031403fb0a.bundle.js'},{'revision':null,'url':'/v2/880cc96352bad64137e9.bundle.js'},{'revision':null,'url':'/v2/938.a52825de2d65447b7fb8.css'},{'revision':null,'url':'/v2/bb42d4052bd9b4c81a9c.bundle.js'},{'revision':null,'url':'/v2/c078ef1dee43c5c4a1ac.bundle.js'},{'revision':null,'url':'/v2/cd9ec37f33e37a6460d3.bundle.js'},{'revision':null,'url':'/v2/eaec552c6841364e2f3d.bundle.js'},{'revision':'3a57114c3ee13bc721c2d0415b49cc6a','url':'/v2/favicons/android-chrome-192x192.png'},{'revision':'ed824703c3c9876c64c2431f643a9874','url':'/v2/favicons/android-chrome-512x512.png'},{'revision':'c6d41b85647148e1957cef99b4906ea9','url':'/v2/favicons/apple-touch-icon.png'},{'revision':'dd5464d9de3e53bfb4dd122f57acba9e','url':'/v2/favicons/browserconfig.xml'},{'revision':'ac90a4af152a3faa919137053a51ef59','url':'/v2/favicons/favicon-16x16.png'},{'revision':'d215721a665ba9d25238477b9022f4a2','url':'/v2/favicons/favicon-32x32.png'},{'revision':'ecf16b928d22f9f9904b6fe5098f9818','url':'/v2/favicons/favicon.ico'},{'revision':'b95dc058d8d8aab47821b20aa12efc87','url':'/v2/favicons/mstile-144x144.png'},{'revision':'7b4269725276411f8f2317464308e535','url':'/v2/favicons/mstile-150x150.png'},{'revision':'bcd915cfb20f6dc9a1d9e6ec57f771bf','url':'/v2/favicons/mstile-310x150.png'},{'revision':'a6282f67b088fec98fdb90a08e9b8c11','url':'/v2/favicons/mstile-310x310.png'},{'revision':'a551b4b2f361416feaa1dfdc67ba18be','url':'/v2/favicons/mstile-70x70.png'},{'revision':'82aeb37c560455a1565fbf71310aa90b','url':'/v2/favicons/safari-pinned-tab.svg'},{'revision':null,'url':'/v2/index.3300620b5806e76bbea4.css'},{'revision':'a08d9730043326173e53bc316095535b','url':'/v2/licenses.txt'},{'revision':'a664676a71c86b7074c5bbabc68b16b8','url':'/v2/site.webmanifest'}].reduce(((t,e)=>(e.url.indexOf("favicons/")>-1?t.asset.push(e.url):t.code.push(e.url),t)),{asset:[],code:[]}),n=[{name:R.code,assets:[...e.code,"index.html"]},{name:R.asset,assets:e.asset},{name:R.webfont,assets:["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"]}];t.waitUntil((async()=>{let t=n.map((async t=>{let e=await caches.open(t.name);await e.addAll(t.assets)}));await Promise.all(t)})())})),self.addEventListener("activate",(t=>{t.waitUntil((async()=>{let t=await caches.keys(),e=Object.values(R),n=t.filter((t=>e.indexOf(t)<0)).map((async t=>{await caches.delete(t)}));await Promise.all(n)})())})),self.addEventListener("fetch",(function(t){if("navigate"!==t.request.mode)t.respondWith(caches.match(t.request).then((function(e){return e||(["https://fonts.gstatic.com","https://fonts.googleapis.com"].some((e=>t.request.url.startsWith(e)))&&t.waitUntil((async()=>{(await caches.open(R.webfont)).add(t.request)})()),fetch(t.request))})));else{if("GET"!==t.request.method)return;t.respondWith(caches.match("index.html",{cacheName:R.code}).then((e=>e||fetch(t.request))))}}));class _{constructor(t,e){this.db=t,this.neueBezahlungenService=e}async zwischengespeicherteZahlungenAnlegen(){let t=await this.db.getZwischengespeicherteBezahlungen();for(let e of t){await K(new C(e.kontokorrentId,e.id));try{let t=await this.neueBezahlungenService.bezahlungAnlegen(e.kontokorrentId,e);await this.db.zwischengespeicherteBezahlungErledigt(t.bezahlung.id),await K(new L(e.kontokorrentId,e.id))}catch(t){null!=await this.db.getBezahlungAktion(e.kontokorrentId,e.id)?await this.db.zwischengespeicherteBezahlungErledigt(e.id):console.error("Fehler beim Anlegen der Zahlung",t)}}}}self.addEventListener("sync",(function(t){"NeueBezahlungBackgroundSync"==t.tag&&t.waitUntil((async()=>{let t=new N,e=new d(t),n=new h(e),r=new D(n,t),o=new _(t,r);await o.zwischengespeicherteZahlungenAnlegen()})())}))}()}();
//# sourceMappingURL=sw.js.map