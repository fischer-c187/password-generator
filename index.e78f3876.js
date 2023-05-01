const GENERATE_PASSWORD={symbols:{element:document.querySelectorAll(".setting__checked-option")[3],condition:new RegExp("\\W"),value:1},uppercase:{element:document.querySelectorAll(".setting__checked-option")[0],condition:new RegExp("[A-Z]"),value:.5},lowercase:{element:document.querySelectorAll(".setting__checked-option")[1],condition:new RegExp("[a-z]"),value:.5},digit:{element:document.querySelectorAll(".setting__checked-option")[2],condition:new RegExp("\\d"),value:1}},CHARACTERS=[];for(let e=33;e<127;e++)CHARACTERS.push(String.fromCharCode(e));function copyPasswordToClipBoard(){const e=document.querySelector(".password__text");e&&navigator.clipboard.writeText(e.innerText)}function animationSuccesMessage(){const e=document.querySelector(".password__succes");e&&(e.style.display="block",setTimeout((()=>{e.classList.toggle("show")}),10),setTimeout((()=>{e.classList.toggle("show")}),2e3))}function setProgressColorInRange(){const e=document.querySelector(".green-range");if(e){const t=Number(e?.min),n=Number(e?.max),r=100*Number(e?.value)/(n-t);e.style.background=`linear-gradient(90deg, rgba(164,255,175,1) ${r-.3}%, rgba(24,23,31,1) ${r-.3}%)`}}function setValueRange(){const e=document.querySelector(".green-range"),t=e?e.value:"",n=document.querySelector(".setting__length-value");n&&(n.innerText=t)}function generateValidCharsArray(){let e=[];return Object.values(GENERATE_PASSWORD).forEach((t=>{t.element.checked&&(e=e.concat(CHARACTERS.filter((e=>t.condition.test(e)))))})),e}function generateRandomPassword(e,t){return t.length?Array(e).fill("").map((()=>t[Math.floor(Math.random()*t.length)])).join(""):""}function evaluateStrengthPassword(e){if(!e.length)return 0;let t=e.length>=10?1:0;return Object.values(GENERATE_PASSWORD).forEach((n=>{n.condition.test(e)&&(t+=n.value)})),t}function resetStrengthIcon(){const e=document.querySelector(".strength__text");e&&(e.innerHTML=""),document.querySelectorAll(".strength__icon").forEach((e=>{e.setAttribute("class","strength__icon")}))}function displayStrengthPassword(e){resetStrengthIcon();const t=document.querySelector(".strength__text");if(!t)throw new Error("Error: element '.stength__text' does not exist");const n=Array.from(document.querySelectorAll(".strength__icon"));let r="strength__icon";0===e?t.innerHTML="":e>=4?(t.innerHTML="strong",r="strength__icon--strong"):e>=3?(t.innerHTML="medium",r="strength__icon--medium"):e>=2?(t.innerHTML="weak",r="strength__icon--weak"):e>=0&&(t.innerHTML="too weak",r="strength__icon--too-weak");const o=1.5===e?1:e;for(let e=0;e<o;e++)n[e].classList.add(r)}function main(){const e=document.querySelector(".green-range"),t=document.querySelector(".password__text");if(!e)throw new Error("Error: element '.green-range' does not exist");if(!t)throw new Error("Error: element '.password__text' does not exist");document.querySelector(".password__copy-icon")?.addEventListener("click",(()=>{copyPasswordToClipBoard(),animationSuccesMessage()})),setProgressColorInRange(),setValueRange(),e.addEventListener("input",(()=>{setProgressColorInRange(),setValueRange()})),document.querySelector(".setting__submit")?.addEventListener("click",(n=>{n.preventDefault();const r=e?Number(e.value):0;t.innerText=generateRandomPassword(r,generateValidCharsArray()),displayStrengthPassword(evaluateStrengthPassword(t.innerText))}))}main();
//# sourceMappingURL=index.e78f3876.js.map
