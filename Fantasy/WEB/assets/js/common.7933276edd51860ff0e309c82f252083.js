function initAppDownloadLinks(e,t,n,o){$(e).on("keyup",function(){var e=$(this).val();isNaN(e)&&$(this).val(e.slice(0,e.length-1))}),$(e).parent().find(".js-send-sms").click(function(){var a=$(e),i=a.val();if(isNaN(i)||10!=$(e).val().length)return a.parent().addClass("error"),!1;var r=Number(getLocalStorage(n))||0;if(r>4)return showAlert("You have crossed SMS limit. Please try after some time.","error"),!1;setLocalStorage(n,++r,1);$.ajax({url:TB.APIPrefix+"v2/app/link",type:"POST",data:{mobile:"91"+i,app:t},dataType:"json"}).done(function(e){e.success?(a.parent().removeClass("error").addClass("success"),showAlert("SMS with link to download "+o+" app has been sent to "+i,"success","small",1e4)):a.parent().removeClass("success").addClass("error")})})}function hasHorizontalScrollBar(e){var t=e.scrollWidth,n=e.offsetWidth;return t>n}function showAlert(e,t,n,o){t||(t="error"),n||(n="small");var a="error"==t?"alert-danger":"warning"==t?"alert-warning":"alert-success",i="small"==n?"size-sm":"size-lg";$(".js-notify-panel-box").prepend('<div class="alert alert-dismissible '+i+" "+a+' "><button type="button" class="close"><i class="tb-icon tb-clear"></i></button>'+e+"</div>");var r=$(".js-notify-panel-box .alert").eq(0);$(".js-notify-panel-box .alert .close").click(function(){$(this).closest(".alert").slideUp(200,function(){$(this).remove()})}),"number"==typeof o&&setTimeout(function(){r.slideUp(200,function(){$(this).remove()})},o)}function uiEventsHelper(){$(".js-prevent-default").on("click",function(e){e.preventDefault()}),$(".js-stop-propagation").on("click",function(e){e.stopPropagation()})}function initScrollToAnchorHref(){$('a[href*="#"]:not([href="#"]), .js-scroll-to').not("a[data-toggle]").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash),t=$(this).attr("data-offset-top");t="undefined"!=typeof t?t:0,e=e.length?e:$("[name="+this.hash.slice(1)+"]");var n=e.offset().top-(getAnnBannerHeight()+52)-t;if(e.length)return $("html,body").animate({scrollTop:n},500),!1}})}function getAnnBannerHeight(){return($("#js-scholarship-banner").outerHeight()||0)+($(".js-app-promotion-banner").outerHeight()||0)}function identifyUserForTBAnalytics(){var e="we_ls";return $("#sid")&&""==$("#sid").val()?(setLocalStorage(e,"sent",-1),TBAnalytics.hooks.logout(),!0):void(""==getLocalStorage(e)&&(setLocalStorage(e,"sent",.5),TBAnalytics.hooks.login($("#sid").val()),TBAnalytics.hooks.setUserAttribute({name:$("#stuname").val()||"",email:$("#email").val()||"",mobile:$("#mobile").val()||"",dob:"",createdOn:$("#created_on").val()||""})))}function initTourPopover(e,t,n,o,a){if(!e.length)return!1;if(""!==getLocalStorage(t))return!1;e.addClass("tour-visible"),e.append('<div class="tb-popover '+n+'"><button class="btn cancel-po"><i class="tb-icon tb-clear"></i></button><div class="po-content text-left">'+o+"</div></div>");var i=e.find(".tb-popover .cancel-po");i.on("click",function(){e.removeClass("tour-visible"),$(this).parents(".tb-popover").remove(),setLocalStorage(t,"viewed",a)})}function shallShowAppBanner(){var e=getLocalStorage("showAppPromotionBanner");return""==e}function hideAppBanner(e){e.remove(),setLocalStorage("showAppPromotionBanner",!1,10),$(document).trigger("closed.tb.app-promotion-banner")}function initAppPromotionOnAndroid(e,t){return!!e.length&&(shallShowAppBanner()&&/Android/i.test(navigator.userAgent)&&!IS_REMOVE_APP_BANNER?(e.show(function(){$(document).trigger("shown.tb.app-promotion-banner")}),void t.on("click",function(){hideAppBanner(e),setHeaderMarginTop()})):(hideAppBanner(e),setHeaderMarginTop(),!1))}function initHorizontalScroll(){var e=$(".js-scroll-btn");e&&e.length?e.click(function(){var e=$(this).attr("data-scroll"),t=$(this).siblings(".js-scroll-element"),n=t.children(":first-child").outerWidth(!0),o=t.innerWidth(),a=t[0].scrollWidth,i=Math.floor(o/n),r=i*n,s=t.scrollLeft();"left"==e&&(s-=r,t.animate({scrollLeft:s},250*i)),"right"==e&&(s+=r,t.animate({scrollLeft:s},250*i)),s<=0?t.siblings(".js-scroll-btn.left").fadeOut():t.siblings(".js-scroll-btn.left").fadeIn(),s+o>=a?t.siblings(".js-scroll-btn.right").fadeOut():t.siblings(".js-scroll-btn.right").fadeIn()}):setTimeout(function(){initHorizontalScroll()},1e3)}function initPromoModal(e){var t="tb_promo_modal",n=getLocalStorage(t);""==n?e.addClass("in"):e.removeClass("in"),e.find(".js-close-ad").on("click",function(){e.removeClass("in"),setLocalStorage(t,!0,1)})}function padZero(e){return e<10?"0"+e:e}function scrollToSpecificElement(e,t,n,o){var a=$(e),i=t||0,r=n||400,s=o||"linear";$("html, body").animate({scrollTop:a.offset().top-i},r,s)}function scrollToLoc(e){e=e||0;var t=getURLParameterValue("loc");if(""==t)return!1;var n;t="#"+t,$(t).length?(clearTimeout(n),scrollToSpecificElement(t,e+getAnnBannerHeight())):n=setTimeout(function(){scrollToLoc(e)},1e3)}function checkMSIEVersion(){var e=window.navigator.userAgent,t=e.indexOf("MSIE");if(t>0||navigator.userAgent.match(/Trident.*rv\:11\./)){parseInt(e.substring(t+5,e.indexOf(".",t)));alert("For best user experience Testbook recommends using Google Chrome, Firefox or Safari. ")}return!1}function setLocalStorage(e,t,n){if(!localStorage)return setCookie(e,t,n);var o=function(e,t){return e instanceof Date||(e=new Date),new Date(e.getTime()+1e3*t)},a=o(new Date,24*n*3600).getTime();return t=t+"_"+a,localStorage&&localStorage.setItem(e,t)}function getLocalStorage(e,t){if(!localStorage)return getCookie(e);var n=function(){for(var e=function(e){return!isNaN(new Date(e).getTime())},t=localStorage&&Object.keys(localStorage),n="",o=(new Date).getTime(),a=0;a<t.length;a++)n=getLocalStorage(t[a],"validity"),n=e(Number(n))?new Date(Number(n)).getTime():"",n&&n<=o&&removeLocalStorage(t[a])};"validity"!=t&&n();var o=localStorage&&localStorage.getItem(e)||"";return"validity"==t?o.substring(o.lastIndexOf("_")+1):o.substring(0,o.lastIndexOf("_"))||""}function removeLocalStorage(e){return localStorage?void localStorage.removeItem(e):setCookie(e,"",-1)}function setCookie(e,t,n){if("undefined"===n)document.cookie=e+"="+t;else{var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var a="expires="+o.toUTCString()+"; path=/";document.cookie=e+"="+t+"; "+a}}function getCookie(e){for(var t,n,o=document.cookie.split(";"),a=0;a<o.length;a++)if(t=o[a],n=o[a].split("="),n[0].trim()==e)return n[1]&&n[1].trim()||"";return""}function forceSessionRefresh(e){setCookie("tb_refresh",1,1),e||(removeLocalStorage(TB.KEY_STUD_INFO),removeLocalStorage(TB.KEY_SID),getCookie(TB_TOKEN)&&TB.RepopulateStudentInStorage())}function escapeTilde(e){return e.split("~").join("\\~")}function showLoader(e){e||(e="Loading. Please Wait.");var t=$("#showLoading");t.length||$("body").append('<div id="showLoading" class="modal" style="display:none;background-color:rgba(26,26,26,0.9);z-index: 1060;"><div class="modal-dialog"><div class="modal-content" style="max-width: 300px;margin: auto;"><div class="modal-body text-center"><img style="height: 90px;" src="//testbook.com/assets/img/utility/loader.gif"><h4 class="text-center space font-weight-normal">Loading...</h4></div></div></div></div></div>'),$("#showLoading h4").html(e),$("#showLoading").show()}function hideLoader(){$("#showLoading").hide()}function showError(e){var t=$("#showError");t.length||($("body").append('<div id="showError" class="modal" style="display:none;background-color:rgba(26,26,26,0.9);"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><h4 class="text-center">Error</h4><p class="js-msg"></p></div><div class="modal-footer"><button type="button" class="btn js-close mar-t0 btn-primary">Ok</button></div></div></div></div>'),$("#showError .js-close").click(hideError)),$("#showError .js-msg").html(e),$("#showError ").fadeIn()}function hideError(){$("#showError").hide()}function injectTBSignupIframe(){return'<iframe name="onBoardingIframeName" id="onBoardingIframe" class="w-100 '+ONBOARDING_IFRAME_JS_CLASS_NAME+'" src="" style="position: relative;" frameborder="0"></iframe>'}function delayExecution(e,t){delayExPromise&&clearTimeout(delayExPromise),delayExPromise=window.setTimeout(e,t)}function openOnBoardingModal(){delayExecution(function(){$(".js-inject-iframe-loader").removeClass("hidden"),$("#tbSignUpModal").modal("show")},0)}function onBoardingModalClose(){$("."+ONBOARDING_IFRAME_JS_CLASS_NAME).attr("src","about:blank")}function setIframeUrl(e){$("."+ONBOARDING_IFRAME_JS_CLASS_NAME).attr("src",e),$("."+ONBOARDING_IFRAME_JS_CLASS_NAME).on("load",function(){$(".js-inject-iframe-loader")&&$(".js-inject-iframe-loader").addClass("hidden")})}function downloadJSAtOnload(){if("no"!=$("#loadDefer").val()){var e=void 0==$("#CDNURL").val()?"":$("#CDNURL").val();downloadJSAtOnloadHelper(e+"/js/defer.b0a0f827ae780e5363ac4a8fa45a8f26.js");$("#sid").val()}}function downloadJSAtOnloadHelper(e){var t=document.createElement("script");t.src=e,document.body.appendChild(t)}function initLazyloadImages(){"function"==typeof LazyLoad&&new LazyLoad({elements_selector:".js-lazy-load-img",threshold:400,skip_invisible:!1})}function initServiceWorker(){"serviceWorker"in navigator&&navigator.serviceWorker.register(window.location.origin+"/assets/js/service-worker.js").then(function(e){console.log("Service Worker registration successful with scope: ",e.scope)})["catch"](function(e){console.log("Service Worker registration failed: ",e)})}function getURLParameterValue(e){if(location.search){for(var t=decodeURI(location.search).substring(1).split("&"),n=0;n<t.length;n++){for(var o=t[n].split("="),a="",i=1;i<o.length;i++)a+=o[i],i<o.length-1&&(a+="=");if(o[0]==e)return a}return""}return""}function removeURLParameter(e,t){var n=e.split("?");if(n.length>=2){for(var o=encodeURIComponent(t)+"=",a=n[1].split(/[&;]/g),i=a.length;i-- >0;)a[i].lastIndexOf(o,0)!==-1&&a.splice(i,1);return e=n[0]+(a.length>0?"?"+a.join("&"):"")}return e}function isLoggedIn(){var e=getCookie(TB_TOKEN);return Boolean(e)}function constructOnBoardingUrl(e,t){e=e||{};var n="/login?tile="+(t?"login":"signup")+"&modal=true&base_url="+encodeURIComponent(window.location.pathname);for(var o in e)e.hasOwnProperty(o)&&(n+="&"+o+"="+encodeURIComponent(e[o]));return n}function openSignUpSignInModal(e,t){if(isLoggedIn())$(document).trigger("logged-in",[{key:e.redirect_url||""}]);else{var n=constructOnBoardingUrl(e,t);setIframeUrl(n),openOnBoardingModal()}}function openIframeInModal(e,t){t&&(e+=e.split("?").length>1?"&redirect_url="+t:"?redirect_url="+t),setIframeUrl(e),openOnBoardingModal()}function initOnboardingModalEvents(){$(".js-inject-iframe")&&($(".js-tb-on-boarding")&&$(".js-tb-on-boarding").length||$(".js-inject-iframe").append(injectTBSignupIframe())),$("."+SIGN_IN_ANCHOR_CLASS_NAME).click(function(e){var t=$("."+SIGN_IN_ANCHOR_CLASS_NAME).attr(ATTR_RED_URL),n={};return n[REDIRECT_URL_KEY]=t,openSignUpSignInModal(n,!0),!1}),$("."+SIGN_UP_ANCHOR_CLASS_NAME).click(function(e){var t=$("."+SIGN_UP_ANCHOR_CLASS_NAME).attr(ATTR_RED_URL),n={};return n[REDIRECT_URL_KEY]=t,openSignUpSignInModal(n,!1),!1}),$("."+EXTRA_ANCHOR_CLASS_NAME).click(function(e){var t=$(this),n=t.attr(ATTR_RED_URL),o=t.attr("href");return openIframeInModal(o,n),!1}),$(document).bind("logged-in",function(e,t){t.key?window.location.href=t.key:window.location.reload()})}function setHeaderMarginTop(){var e=$("#js-scholarship-banner").innerHeight()||0,t=$(".js-app-promotion-banner").innerHeight()||0,n=e||t;$(".js-banner-height-offset, .js-tb-container").css("margin-top",n)}function makeVideosResponsive(){for(var e=document.getElementsByTagName("iframe"),t=0;t<e.length;t++){var n=e[t],o=/youtube.com|player.vimeo.com/;if(n.src.search(o)>0){var a=n.height/n.width*100;n.style.position="absolute",n.style.top="0",n.style.left="0",n.width="100%",n.height="100%";var i=document.createElement("div");i.className="fluid-vids",i.style.width="100%",i.style.position="relative",i.style.paddingTop=a+"%";var r=n.parentNode;r.insertBefore(i,n),i.appendChild(n)}}}function pad(e,t){for(var n="";n.length<t-1&&e<Math.pow(10,t-n.length-1);)n+="0";return n+e.toString()}function ISODateString(e){e=e?e:new Date;var t=e.getTimezoneOffset();return pad(e.getFullYear(),4)+"-"+pad(e.getMonth()+1,2)+"-"+pad(e.getDate(),2)+"T"+pad(e.getHours(),2)+":"+pad(e.getMinutes(),2)+":"+pad(e.getSeconds(),2)+(t>0?"-":"+")+pad(Math.floor(Math.abs(t)/60),2)+":"+pad(Math.abs(t)%60,2)}function getDaysDiff(e,t){e=setHoursToZero(e),t=setHoursToZero(t);var n=e.getTime()-t.getTime();return n/MS_IN_ONE_DAY}function isServerTimeNull(e){return e.indexOf("0001-01-01 00:00:00")==-1}function getDuplicateObject(e){if(!e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e);var t=new e.constructor;for(var n in e)e.hasOwnProperty(n)&&(t[n]=this.getDuplicateObject(e[n]));return t}function getRoundedFloat(e,t){t||0==t||(t=2);var n=Math.pow(10,t);return Math.round(e*n)/n||0}function validateArr(e){return e&&e.length?e:[]}function isElementInViewport(e){"function"==typeof jQuery&&e instanceof jQuery&&(e=e[0]);var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}function scrollToBottom(e,t){void 0===t&&(t=1e3),void 0===e?$("html, body").animate({scrollTop:$(document).height()-$(window).height()},t,"swing"):$(e).animate({scrollTop:document.querySelector(e).scrollHeight-document.querySelector(e).offsetHeight},t,"swing")}function scrollToTop(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=0),void 0===e&&(e="html, body"),$(e).animate({scrollTop:0+n},t,"swing")}function hexToRgb(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,n,o){return t+t+n+n+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}function getCustomMap(e,t,n,o){var a={};e=e?e:[];for(var i=0;i<e.length;i++)if(e[i][t]){var r="string"==typeof e[i][t]?e[i][t].toLowerCase():e[i][t];a[r]=o?e[i]:e[i][n]}return a}function postNetworkCallHelper(e,t,n,o){$.ajax({url:e,type:"POST",data:t,dataType:"json",success:function(e){e&&e.success?n(e):(o&&o(e),console.log(e))},error:function(e){console.log(e)}})}function changeCurrentCourse(e,t,n){var o=TB.APIPrefix+"v2/students/me/currentcourse",a={auth_code:e,course:t};postNetworkCallHelper(o,a,n)}function enrollIntoCourse(e,t,n){var o=TB.APIPrefix+"v2/students/me/enroll",a={auth_code:e,courses:t};postNetworkCallHelper(o,a,n)}function debounce(e,t,n){var o;return function(){var a=this,i=arguments,r=function(){o=null,n||e.apply(a,i)},s=n&&!o;clearTimeout(o),o=setTimeout(r,t),s&&e.apply(a,i)}}function throttle(e,t,n){var o,a,i,r=null,s=0;n||(n={});var c=function(){s=n.leading===!1?0:Date.now(),r=null,i=e.apply(o,a),r||(o=a=null)};return function(){var l=Date.now();s||n.leading!==!1||(s=l);var u=t-(l-s);return o=this,a=arguments,u<=0||u>t?(r&&(clearTimeout(r),r=null),s=l,i=e.apply(o,a),r||(o=a=null)):r||n.trailing===!1||(r=setTimeout(c,u)),i}}function callSetWebNotifications(){"webengage"in window?(clearTimeout(notificationWebengageTimeout),setWebNotifications()):notificationAttemptCount<5&&(notificationAttemptCount+=1,notificationWebengageTimeout=setTimeout(function(){callSetWebNotifications()},1e4))}function setWebNotifications(){var e="isWebNotificationAllowed",t=getCookie(e),n=$("#webNotificationAlert");if("Notification"in window&&!USERAGENT.isSafari){var o=Notification.permission;if("denied"===o||"granted"===o)return!1;t||"default"!==o||(n.modal(),n.find(".js-deny-permission").on("click",function(){setCookie(e,!0),n.modal("hide")}),n.find(".js-allow-permission").on("click",function(){setCookie(e,!0);var t=TBAnalytics.gtm.events.webNotification;t.pagePath=window.location.pathname,TBAnalytics.gtm.pushToDataLayer(t),n.modal("hide")}))}else console.log("This browser does not support desktop notification")}var TB=TB||{};TB.taskQueue=new Array,TB.APIPrefix=document.getElementById("go-api-server")&&document.getElementById("go-api-server").value;var ON_BOARDING_MODAL_ID="#onBoardingIframe",COURSE_IDS_KEY="courseIds",REDIRECT_URL_KEY="redirect_url",TB_TOKEN="tb_token",SIGN_UP_ANCHOR_CLASS_NAME="js-tb-signup-anchor",SIGN_IN_ANCHOR_CLASS_NAME="js-tb-signin-anchor",EXTRA_ANCHOR_CLASS_NAME="js-tb-extra-anchor",ATTR_RED_URL="data-redirect-url",ONBOARDING_IFRAME_JS_CLASS_NAME="js-tb-on-boarding",REF_DATE_STR="1970/1/1",isMobile=!1,dataLayer=dataLayer||[],MS_IN_ONE_DAY=864e5,IS_REMOVE_APP_BANNER=document.getElementById("removeAppBanner")&&Number(document.getElementById("removeAppBanner").value)||!1,IS_REMOVE_LT_BANNER=document.getElementById("removeLTBanner")&&Number(document.getElementById("removeLTBanner").value)||!1,MOBILE_SUCCESSFULLY_VERIFIED="MOBILE_VERIFIED_SUCCESSFULLY",LANG_ENGLISH="en",LANG_HINDI="hn";TB.isOpenInModal=$("#isOpenInModal")&&$("#isOpenInModal").val()||!1;var screenSize={xs:480,sm:768,md:992,lg:1200},$tbContainer=$(".js-tb-container"),USERAGENT={isSafari:!1},enumTBEvents={annBannerAll:"loaded.tb.announcement-banner closed.tb.announcement-banner closed.tb.app-promotion-banner shown.tb.app-promotion-banner toggled.tb.announcement-banner"},LS={currentQuizInfo:{key:"currentQuizInfo",value:{servesOn:"",course:"",exam:[""],category:"",page:""}}};!function(){function e(e){var t=e.attr("rel");$(".js-tab-apps button").removeClass("active"),$('.js-tab-apps button[rel="'+t+'"]').addClass("active"),$(".js-app-content ").fadeOut(200),$('.js-app-content[data-active-app="'+t+'"]').delay(200).fadeIn(200)}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(isMobile=!0,$("body").addClass("is-mobile")),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&(USERAGENT.isSafari=!0);var t=$(".collapse-toggle > .collapse-arrow");if(t.each(function(e,t){var n=$(t);n.click(function(){n.parent().toggleClass("open")})}),$(document).on("click",".tb-accordion .tba-item .head",function(){var e=$(this),t=e.parent(),n=t.find(".content"),o=n.outerHeight();n.css({"margin-top":-o}),t.hasClass("selected")?n.css({"margin-top":-o}):n.css({"margin-top":0}),t.toggleClass("selected")}),$(".tab-content-tb").hide(),$(document).on("click",".tab-head > li",function(){var e=$(this),t=e.attr("rel"),n=$("#"+t);n.parent().children(".tab-content-tb").hide(),n.fadeIn(),e.parent().children().removeClass("active"),e.addClass("active")}),$(".tab-head>li.active").click(),$(".accordion > li:eq(0) a").addClass("active").next().slideDown(),$(document).on("click",".accordion-head",function(e){var t=$(this).closest("li").find(".accordion-content");$(this).closest(".accordion").find(".accordion-content").not(t).slideUp(),$(this).hasClass("active")?$(this).removeClass("active"):($(this).closest(".accordion").find(".accordion-head.active").removeClass("active"),$(this).addClass("active")),t.stop(!1,!0).slideToggle(),e.preventDefault()}),$("body").hasClass("is-mobile")){var n=$('.js-password-state[data-toggle="password-type"]');n.each(function(e,t){var n=$(t);n.toggleClass("watching"),n.siblings("input").attr("type",function(e,t){return"text"==t?"password":"text"})})}$(document).on("click",'.js-password-state[data-toggle="password-type"]',function(){$(this).toggleClass("watching"),$(this).siblings("input").attr("type",function(e,t){return"text"==t?"password":"text"})});var o=setInterval(function(){if($(".js-tab-apps").length>1){var t=$(".js-tab-apps .active").next();$(".js-tab-apps button:last-child").hasClass("active")&&(t=$(".js-tab-apps button:first-child")),e(t)}},6e3);$(".js-tab-apps button").click(function(){e($(this)),window.clearInterval(o)}),$("#mobileForAppLink, #mobileForCaAppLink").focus(function(){window.clearInterval(o)}),initAppDownloadLinks("#mobileForAppLink","tb","tb_app_link_count","Testbook"),initAppDownloadLinks("#mobileForCaAppLink","ca","ca_app_link_count","Current Affairs")}();var Utils={slideToggle:function(e){$("#"+e).slideToggle()},toggle:function(e){$("#"+e).toggle()},acceptOnlyNumber:function(e){$("#"+e).on("keyup",function(){var e=$(this),t=e.val();isNaN(t)&&e.val(t.slice(0,t.length-1))})},limitOnLength:function(e,t){$("#"+e).on("keyup",function(){var e=$(this),t=e.val();t.length>10&&e.val(t.slice(0,10))})}};jQuery.fn.hasScrollBar=function(e){return"vertical"==e?this.get(0).scrollHeight>this.innerHeight():"horizontal"==e&&this.get(0).scrollWidth>this.innerWidth()},$(document).ready(function(){var e=$("#sid")&&$("#sid").val()||-1;alterHeader(),setHeaderMarginTop(),makeVideosResponsive(),initHorizontalScroll(),initScrollToAnchorHref(),initTourPopover($("#headerCourseSelector").parent(),"highlightCourseDropdown"+e,"bottom","Click to change your course",365),initPromoModal($("#js-promo-modal")),initAppPromotionOnAndroid($(".js-app-promotion-banner"),$(".js-app-promotion-banner .js-close-app-promotion")),identifyUserForTBAnalytics(),initOnboardingModalEvents(),uiEventsHelper()}),checkMSIEVersion();var delayExPromise;$(window).on("load",function(){downloadJSAtOnload(),initLazyloadImages(),initServiceWorker()}),TB.taskQueuePop=function(e){try{e()}catch(t){console.log("Unable to run from task q "),console.log(t)}},TB.taskQueuePush=function(e,t){"done"==TB.taskQueue[t]?TB.taskQueuePop(e):(void 0==TB.taskQueue[t]&&(TB.taskQueue[t]=new Array),TB.taskQueue[t].push(e))},TB.taskQueueProcess=function(e){if(void 0!=TB.taskQueue[e])for(var t;t=TB.taskQueue[e].shift();)TB.taskQueuePop(t);TB.taskQueue[e]="done"},TB.API_DEFAULT_ERROR_MESSAGE="Unable to reach Testbook servers. Please make sure you are connected to the internet and try again. It might be a temporary network problem so please wait and retry, if you continue to face this issue mail us at support@testbook.com",function(e,t,n){var o,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src="//connect.facebook.net/en_US/sdk.js",a.parentNode.insertBefore(o,a))}(document,"script","facebook-jssdk"),window.fbAsyncInit=function(){FB.init({appId:"637142706346206",cookie:!0,xfbml:!0,version:"v2.8"}),TB.taskQueueProcess("FB")};var TBAnalytics={hooks:{event:function(e,t,n,o){TBAnalytics.ga.event(e,t,n,o)},testPageView:function(e,t,n,o,a){TBAnalytics.cio.event("test",{tid:e,time:Math.floor(Date.now()/1e3)}),TBAnalytics.ga.pageView(o,a),TBAnalytics.mixpanel.event("Test Started",{course:t,title:n})},testPageNavEvent:function(e,t,n,o,a){TBAnalytics.ga.event("button","click","Test "+e+" navigation",1)},testSubmitted:function(e,t,n,o){TBAnalytics.ga.event("button","click","Test "+e+"submit",1),TBAnalytics.mixpanel.event("Test Submitted",{course:t,title:n,responses:o}),TBAnalytics.mixpanel.increment("Questions",o)},testPaused:function(e,t,n,o){TBAnalytics.ga.event("button","click","Test "+e+"pause",1)},testResumed:function(e,t,n,o){TBAnalytics.ga.event("button","click","Test "+e+"resume",1)},testAborted:function(e,t,n,o){TBAnalytics.mixpanel.event("Test Aborted",{course:t,title:n,responses:o})},testTimeOver:function(e,t,n,o){TBAnalytics.ga.event("button","click","Test "+e+"time over",1),TBAnalytics.mixpanel.event("Test Submitted",{course:t,title:n,responses:o}),TBAnalytics.mixpanel.increment("Questions",o)},analysisPageView:function(e,t,n){TBAnalytics.cio.event("analysis",{tid:e,time:Math.floor(Date.now()/1e3)})},solutionsPageView:function(e,t,n,o,a){TBAnalytics.cio.event("solution",{tid:e,time:Math.floor(Date.now()/1e3)}),TBAnalytics.ga.pageView(o,a)},solutionsPageNavEvent:function(e,t,n){TBAnalytics.ga.event("button","click","Solutions "+e+" navigation",1)},feedbackPageView:function(e,t,n){TBAnalytics.ga.pageView(t,n)},login:function(e){TBAnalytics.webengage.login(e)},logout:function(){TBAnalytics.webengage.logout()},setUserAttribute:function(e){TBAnalytics.webengage.setUserAttribute(e)},addToCart:function(e){TBAnalytics.ga.addToCart(e)},removeFromCart:function(e){TBAnalytics.ga.removeFromCart(e)},checkoutStart:function(){TBAnalytics.ga.checkoutStart()},checkoutEnd:function(e,t,n){TBAnalytics.ga.checkoutEnd(e,t,n)}},webengage:{taskKey:"webengage",preProcess:function(){},postProcess:function(e){TB.taskQueuePush(e,this.taskKey)},event:function(e,t){var n=function(){TBAnalytics.webengage.preProcess()};this.postProcess(n)},login:function(e){var t=function(){TBAnalytics.webengage.preProcess(),webengage.user.identify(e)};this.postProcess(t)},logout:function(){var e=function(){TBAnalytics.webengage.preProcess(),webengage.user.logout()};this.postProcess(e)},setUserAttribute:function(e){var t=function(){TBAnalytics.webengage.preProcess(),e&&e.name&&webengage.user.setAttribute("we_first_name",e.name),e&&e.email&&webengage.user.setAttribute("we_email",e.email),e&&e.dob&&webengage.user.setAttribute("we_birth_date",e.dob),e&&e.mobile&&webengage.user.setAttribute("we_phone",e.mobile),e&&e.createdOn&&webengage.user.setAttribute("created_on",e.createdOn)};this.postProcess(t)}},mixpanel:{taskKey:"mixpanel",preProcess:function(){},postProcess:function(e){TB.taskQueuePush(e,this.taskKey)},event:function(e,t){var n=function(){TBAnalytics.mixpanel.preProcess(),mixpanel.track(e,t)};this.postProcess(n)},increment:function(e,t){var n=function(){TBAnalytics.mixpanel.preProcess(),mixpanel.people.increment(e,t)};this.postProcess(n)},append:function(e){var t=function(){TBAnalytics.mixpanel.preProcess(),mixpanel.people.append(e)};this.postProcess(t)},union:function(e){var t=function(){TBAnalytics.mixpanel.preProcess(),mixpanel.people.union(e)};this.postProcess(t)},paid:function(e){var t=function(){TBAnalytics.mixpanel.preProcess(),mixpanel.people.track_charge(e,{$time:new Date})};this.postProcess(t)}},ga:{taskKey:"GA",preProcess:function(){ga("require","ec")},postProcess:function(e){TB.taskQueuePush(e,this.taskKey)},event:function(e,t,n,o){var a=function(){ga("send","event",e,t,n,o)};this.postProcess(a)},pageView:function(e,t){var n=function(){ga("set",{page:e,title:t}),ga("send","pageview")};this.postProcess(n)},addToCart:function(e){var t=function(){TBAnalytics.ga.preProcess(),ga("ec:addProduct",{id:e.pid,name:e.title,price:e.cost,category:$("#cur-course-title").val(),quantity:1}),ga("ec:setAction","add"),ga("send","event","button","click","addToCart"),console.log("en. ecomm add")};this.postProcess(t)},removeFromCart:function(e){var t=function(){TBAnalytics.ga.preProcess(),ga("ec:addProduct",{id:e.pid,name:e.title,price:e.cost,category:e.course,quantity:1}),ga("ec:setAction","remove"),ga("send","event","button","click","removeFromCart"),console.log("en. ecomm remove")};this.postProcess(t)},checkoutStart:function(){var e=function(){TBAnalytics.ga.preProcess(),ga("ec:setAction","checkout",{step:1,option:"Payu"}),ga("send","event","ecommerce","checkout","checkout1"),console.log("en. ecomm chckout1")};this.postProcess(e)},checkoutEnd:function(e,t,n){var o=function(){TBAnalytics.ga.preProcess(),ga("ec:setAction","purchase",{id:e,affiliation:"",revenue:t,tax:"0",shipping:"0",coupon:n}),ga("send","event","ecommerce","transaction","complete"),ga("ec:setAction","checkout",{step:2}),ga("send","event","ecommerce","checkout","checkout2"),console.log("en. ecomm chckout2")};this.postProcess(o)}},cio:{taskKey:"CIO",preProcess:function(){},postProcess:function(e){TB.taskQueuePush(e,this.taskKey)},event:function(e,t){var n=function(){TBAnalytics.cio.preProcess(),_cio.track(e,t)};this.postProcess(n)}},gtm:{events:{pincode:{event:"pincode_updated",pin:""},category:{event:"category_updated",category:""},interestedExams:{event:"interested_exams_updated",exams:[]},degrees:{event:"degrees_updated",degrees:[]},dob:{event:"dob_updated",birthday:""},deactivate:{event:"account_deactivated"},onboardingFlowStages:{onLoginSignup:{event:"login_or_signup_modal_1",pageurl:""},onOTP:{event:"otp_modal_2"},onEnrollment:{event:"enrollment_modal_3",isOTPVerified:!1},onCollectInfo:{event:"collect_info_modal_4"},onProcessComplete:{event:"onboarding_success_5",success:!1,userInfo:{}}},webNotification:{event:"show_webpush_prompt",pagePath:""},signOut:{event:"signOut"},pageReady:{event:"page_ready"},testStart:{event:"test_start",testName:"",testId:"",testCourse:"",isLive:!1,isQuiz:!1,lang:"","interface":""},testSubmitManual:{event:"test_submit_manual"},testSubmitAuto:{event:"test_submit_auto"},resumedChapterPractice:{event:"resumed_a_chapter",chapterID:"",chapterName:"",course:"",subject:"",language:""},testBulletinPlayed:{testID:"",event:"c_testBulletinVideo_played"},testBulletinClosed:{duration:0,testID:"",event:"c_testBulletinVideo_closed"},quizStarted:{event:"quiz_start",info:{testID:"",testName:"",course:"",subject:"",exam:"",page:"",isLoggedIn:"",servesOnDate:"",language:""}},quizSubmitted:{event:"quiz_submit",info:{testID:"",testName:"",course:"",subject:"",exam:"",page:"",isLoggedIn:"",servesOnDate:"",method:""}},quizAnalysis:{event:"quiz_analysis",info:{course:"",testID:"",testName:"",subject:"",exam:"",servesOnDate:"",language:"",percentile:""}}},pushToDataLayer:function(e){dataLayer.push(e)}}},alterHeader=throttle(function(){var e=($(".tb-landing-banner").innerHeight()||0)-($(".banner-stats").innerHeight()||0)-52,t=$(window).scrollTop();t>=e?$(".tb-main-header").removeClass("on-banner"):$(".tb-main-header").addClass("on-banner")},100),prettyDate=function(e){return e=e?new Date(e):new Date,padZero(e.getDate())+"/"+padZero(parseInt(e.getMonth())+1)+"/"+e.getFullYear()},setHoursToZero=function(e){var t=new Date(e);return new Date(t.setHours(0,0,0,0))},getDuplicateArray=function(e){e=this.validateArr(e);for(var t=[],n=0;n<e.length;n++)t.push(this.getDuplicateObject(e[n]));return t},getMapToArray=function(e,t){var n=[];for(var o in e)e.hasOwnProperty(o)&&t&&(e[o][t]=o,n.push(e[o]));return n},getSpecificKeyArrFromArrayOfObjects=function(e,t){for(var n={},o=0;o<e.length;o++)e[o][t]&&(n[e[o][t]]=o);return Object.keys(n)},sortFunction=function(e,t,n,o){var a=function(e,a){return n=typeof e[t],"string"!=n&&e[t]<a[t]||"string"==n&&e[t].toLowerCase()<a[t].toLowerCase()?"asc"==o?-1:1:"string"!=n&&e[t]>a[t]||"string"==n&&e[t].toLowerCase()>a[t].toLowerCase()?"asc"==o?1:-1:0};return e.sort(a)},setLocalStorageOnLiveTestAdd=function(e){var t=function(t){if(t.data){var n=t.data._id||-1;if(!getLocalStorage("liveTest"+n+"-"+e)&&n!=-1&&document.getElementById("js-test-tiles"))for(var o=document.getElementById("js-test-tiles").getElementsByClassName("each-lt-details"),a=0;a<o.length;a++)o[a].getAttribute("data-tid")==e&&(setLocalStorage("liveTest"+n+"-"+e,"added",14),o[a].getElementsByClassName("goto-course-btn")[0].classList.contains("hidden")||(o[a].getElementsByClassName("goto-course-btn")[0].className+=" hidden"))}};TB.GetStudentFromStorage(t)};$(document).on("loaded.tb.announcement-banner",function(){$(".js-app-promotion-banner")&&($(".js-app-promotion-banner").remove(),setHeaderMarginTop(),$(document).trigger("closed.tb.app-promotion-banner"))});var bannerInfo={};"true"!=getURLParameterValue("modal")&&document.getElementById("top-header")&&!IS_REMOVE_LT_BANNER&&!function(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState&&200==e.status&&e.responseText){var t=JSON.parse(e.responseText);if(t&&t.success&&t.data.title&&t.data.title.items&&(t.data.title.items.length||t.data.title.text)){bannerInfo=t.data;var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="/js/announcement.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}}},e.open("GET",TB.APIPrefix+"v2/announcements?X-Tb-Client=web,1.1.0&client=web",!0),e.send(null)}();var isValidDate=function(e){var t=new Date(e).getTime(),n=new Date(REF_DATE_STR).getTime();return n<t},infiniteScrollTimer,isScrollAvailable=function(e,t,n){var o=function(){clearTimeout(infiniteScrollTimer),infiniteScrollTimer=setTimeout(a,n)},a=function(){var n=$("body").height()||0,o=$(window).height()||0,a=$(document).scrollTop()||0,i=n-(o+a),r=Math.floor(o*e/100);i<=r&&t()},i=function(){o()};i()};$(window).on("scroll",function(){alterHeader()});var notificationWebengageTimeout,notificationAttemptCount=0;!function(){var e=TB||{},t=function(){return""!=getCookie(TB_TOKEN)},n=!1,o=.25,a="tb_student_data",i="tb_student_id",r="just_logged_out",s="refresh_student_ls",c=function(e){
e._id&&(setLocalStorage(i,JSON.stringify(e._id),o),setLocalStorage(a,JSON.stringify(e),o))},l=function(t){t.data?c(t.data):showAlert("Problem in loading data. Please check internet connection","error","sm",3e3),e.taskQueueProcess("stuDetail")},u=function(t,o,a){n=!0;var i="web,1.2",r="X-Tb-Client",s="_id,email,name,meta,gender,lang,bio,dob,username,mobile,mobileVerified,cur_exam,enrollments,specificExams,image,sub,createdOn,streaks,referral,referrer,coinsExpensed,cashbacks,college_details,calang,cart,preferences,cobrandingInfo,location,confirm,tblang,coinsExpensedBackup",c=e.APIPrefix+"v2/students/me?auth_code="+t+"&fields="+s+"&"+r+"="+i;$.ajax({url:c,type:"GET",success:function(e){n=!1,e&&e.success?o(e):a?a(e):showAlert(e&&e.message||"Connection Error","error","sm",3e3)},error:function(e){n=!1,showAlert("Connection Error","error","sm",3e3)}})},d=function(){var e={},t=$("#course_info").val()||"[]",n=JSON.parse(t),o=function(){return{parent:{id:"",name:"",url:""},url:"",name:"",isUpcoming:"",isFreezed:""}},a=function(t){if(t.hasOwnProperty("specificExams"))for(var n=0;n<t.specificExams.length;n++){var a=o();a.parent.id=t.id,a.parent.name=t.abbr,a.parent.url=t.URL,a.url=t.specificExams[n].URL,a.name=t.specificExams[n].text,a.isUpcoming=!!t.specificExams[n].isUpcoming,a.isFreezed=!!t.specificExams[n].isFreezed,e[t.specificExams[n].id]=a}};return n.forEach(function(e){if(e.isGroup)for(var t=0;t<e.courses.length;t++)a(e.courses[t]);else a(e)}),e},g=function(){var e=getCookie(TB_TOKEN);!e||getLocalStorage(i)&&!getCookie(s)?e||(removeLocalStorage(a),removeLocalStorage(i)):(u(e,l),setCookie(s,1,-1))},p=function(){var e={},t=getLocalStorage(a);return t?e.data=JSON.parse(getLocalStorage(a)):e.message="Student Info not present",e},f=function(t){var o={},a=function(e){c(e.data),t(p())},r=function(){showAlert("Connection error","error","sm",3e3)};if(getCookie(TB_TOKEN))if(getLocalStorage(i))t(p());else if(n){var s=function(){t(p())};e.taskQueuePush(s,"stuDetail")}else u(getCookie(TB_TOKEN),a,r);else o.message="logged out state",t(o)},m=function(e,t){var n=function(t){c(t.data),e&&e(t)};u(getCookie(TB_TOKEN),n,t)},v=function(e){if(getCookie(TB_TOKEN)&&getLocalStorage(a)&&e.id){var t=JSON.parse(getLocalStorage(a));t.currentCourse&&(t.currentCourse=e),setLocalStorage(a,JSON.stringify(t),o)}else getCookie(TB_TOKEN)&&!getLocalStorage(a)&&m()},h=function(e){if(getCookie(TB_TOKEN)&&getLocalStorage(a)){var t=JSON.parse(getLocalStorage(a));t.location&&(t.location=e),setLocalStorage(a,JSON.stringify(t),o)}else getCookie(TB_TOKEN)&&!getLocalStorage(a)&&m()},b=function(){if(t()){var e=function(e){if(e.data){e=e.data;var t="",n="";e.name&&(e.name.trim().indexOf(" ")!=-1?(t=e.name.trim().substr(0,e.name.trim().indexOf(" ")),n=e.name.trim().substr(e.name.trim().indexOf(" ")+1)):(t=e.name.trim(),n=""));var o=e.mobileVerified?e.mobileVerified:e.mobile?e.mobile:"",a=!!e.mobileVerified,i=!!(e.confirm&&e.confirm.email&&e.confirm.email.status),r=!!e.referrer&&!!e.referrer.sid,s=!(!e.cobrandingInfo||!e.cobrandingInfo.validTill)&&new Date(e.cobrandingInfo.validTill).getTime()>=(new Date).getTime();e.currentCourse&&(e.currentCourse.abbr=e.currentCourse.name,delete e.currentCourse.name);var c={sid:e._id,fname:t,lname:n,email:e.email||"",createdOn:e.createdOn||"",createdOnUnix:Math.round(new Date(e.createdOn).getTime()/1e3)||"",mobile:o,isMailConfirmed:i,isReferred:r,isMobileConfirmed:a,currentCourse:e.currentCourse||"",registeredCourses:e.enrollments||[],isOCRMStudent:s};TBAnalytics.gtm.pushToDataLayer(c),TBAnalytics.gtm.pushToDataLayer(TBAnalytics.gtm.events.pageReady)}};f(e)}else TBAnalytics.gtm.pushToDataLayer({sid:-1}),TBAnalytics.gtm.pushToDataLayer(TBAnalytics.gtm.events.pageReady);getCookie(r)&&(dataLayer&&TBAnalytics.gtm.pushToDataLayer(TBAnalytics.gtm.events.signOut),setCookie(r,"true",0))},T=function(){e.KEY_STUD_INFO=a,e.KEY_SID=i,e.GetStudentFromStorage=f,e.RepopulateStudentInStorage=m,e.UpdateCurrentCourseInStorage=v,e.UpdateStudentLocationInLS=h,e.mapExamIDToInfo=d(),g(),b()};T()}();