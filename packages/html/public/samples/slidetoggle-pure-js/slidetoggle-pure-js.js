(()=>{"use strict";document.addEventListener('DOMContentLoaded',(function(){Element.prototype.slideDownUp=function(t,e){if(this.style.height)return this.style.height='',this.parentNode.style.height=parseInt(this.parentNode.style.height)-this.scrollHeight-e+'px',void(this.classList.contains('active')&&this.classList.remove('active'));t&&this.classList.add('active'),this.parentNode.classList.contains('active')?(this.parentNode.style.height=parseInt(this.parentNode.style.height)+this.scrollHeight+e+'px',this.style.height=this.scrollHeight+'px'):this.style.height=this.scrollHeight+'px'},[...document.querySelectorAll('.mobile-menu-toggler')].forEach((t=>{t.addEventListener('click',(function(){t.classList.toggle('active'),t.parentNode.nextElementSibling.slideDownUp('active',25)}))}))}))})();