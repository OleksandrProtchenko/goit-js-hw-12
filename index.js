import{a as g,S as M,i as f}from"./assets/vendor--6n4cVRZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const v="https://pixabay.com/api",$="54656491-d198bfb98120e598fae018f1a",w=15;g.defaults.baseURL=v;async function L(r,e){return(await g({url:v,method:"get",params:{key:$,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:w}})).data}const b=document.querySelector(".gallery"),y=document.querySelector(".js-gallery-btn"),q=document.querySelector(".loader");let h=null;function S(r){const e=r.map(({webformatURL:s,largeImageURL:c,tags:t,likes:o,views:i,comments:x,downloads:B})=>`
            <li class="list-item">
                <a href="${c}"><img src="${s}" alt="${t}" /></a>
                <div class="list-content">
                    <div>
                        <h2 class="likes">Likes</h2>
                        <p class="count-likes">${o}</p>
                    </div>
                    <div>
                        <h2 class="views">Views</h2>
                        <p class="count-views">${i}</p>
                    </div>
                    <div>
                        <h2 class="comments">Comments</h2>
                        <p class="count-comments">${x}</p>
                    </div>
                    <div>
                        <h2 class="downloads">Downloads</h2>
                        <p class="count-downloads">${B}</p>
                    </div>
                </div>
            </li>
        `).join("");b.insertAdjacentHTML("beforeend",e),h?h.refresh():h=new M(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}function P(){b.innerHTML=""}function E(){q.style.display="inline-block"}function a(){q.style.display="none"}function D(){y.classList.remove("shown")}function u(){y.classList.add("shown")}const m=document.querySelector(".form");m.addEventListener("submit",O);y.addEventListener("click",j);let l="",n=1,p=0;a();async function O(r){r.preventDefault(),n=1,u(),P(),l=new FormData(m).get("search-text").trim();try{if(l===""){k();return}E();const{hits:e,totalHits:s}=await L(l,n);if(p=Math.ceil(s/w),!e||e.length===0){C();return}S(e),n<p&&D()}catch(e){u(),console.log(e.message),d("Sorry, there are no images matching your search query. Please try again!","error")}finally{m.reset(),a()}}async function j(){try{E(),n+=1;const{hits:r}=await L(l,n);n===p&&(d("We're sorry, but you've reached the end of search results.","info"),u()),S(r),R()}catch(r){console.log(r)}finally{a()}}function d(r,e="error"){switch(f.settings({position:"topRight",maxWidth:"432px",messageColor:"#ffffff"}),e){case"error":f.error({message:r});break;case"info":f.info({message:r});break}}function k(){d("Please enter a search query!","error"),u(),a(),P()}function C(){d("Sorry, there are no images matching your search query. Please try again!","error"),a()}function R(){const e=document.querySelector(".gallery").firstElementChild;if(!e)return;const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
