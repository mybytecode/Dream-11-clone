var TB=TB||{};!function(){function e(e,n){function s(e){if(window){var r=e+"-practice",o=window.location.href||"",t=o.split("//").length&&o.split("//")[1]||"";window.location.search&&(t=t.split("?")[0]);var n=t.split("/");n.splice(0,1);var s=n[0],a=d+"-practice",i="";s===d?(n[0]=e,i="/"+n.join("/"),window.location.href=i):s===a?(i="/"+r,window.location.href=i):window.location.reload()}}function a(e){showLoader("Changing Course. Please wait.");var r=function(r){forceSessionRefresh(!0);var o={id:e.id||"",name:e.name||""};TB.UpdateCurrentCourseInStorage(o),s(e.url)},o=function(e){e?showAlert(e.message||"Something went wrong, Please contact at support@testbook.com","error","large",5e3):showAlert("Please check your internet connection or contact at support@testbook.com","error","large",5e3),hideLoader()},t={course:e.id};n.setCurrentCourse(t,r,o)}var i="/tb-money",c={},u=$("#sid")&&$("#sid").val()||-1,l=Object.prototype.hasOwnProperty;this.tbCourseArr=JSON.parse($("#course_info")&&$("#course_info").val()||"[]"),this.showStuCourseDropdown=!0;var d=document.getElementById("curCourseURL")&&document.getElementById("curCourseURL").value||"";this.stuObj={isShowCoBrandingLogo:!1,coBrandingLogoSrc:"",currentCourseObj:{},enrollmentsArr:[],profilePic:"",isLoggedIn:isLoggedIn()||!1,tbMoney:0},this.updateCurrentCourse=function(e){return a(e),!1};var g={},f=this,h=function(e){var r={id:e,name:g[e]&&g[e].abbr||"",url:g[e]&&g[e].URL||""};return r},p=function(e,r){for(var o=0;o<e.length;o++)if(e[o].course&&e[o].course.id==r)return o;return-1};e.$on(r,function(e,r){r&&(f.stuObj.currentCourseObj=h(r.courseId||""))}),e.$on(t,function(e,r){r&&(f.showStuCourseDropdown=!1)}),e.$on(o,function(e,r){if(r)if(r.isEnrolled){var o={course:h(r.courseId||"")};Object.keys(o).length&&f.stuObj.enrollmentsArr.push(o)}else{var t=p(f.stuObj.enrollmentsArr,r.courseId||"");t!==-1&&f.stuObj.enrollmentsArr.splice(t,1)}});var b=function(e){for(var r={},o=0;o<e.length;o++)if(e[o].isGroup)for(var t=0;t<e[o].courses.length;t++)r[e[o].courses[t].id]=e[o].courses[t];else r[e[o].id]=e[o];return r},O=function(e){for(var r=[],o=0;o<e.length;o++)g[e[o].course.id]&&(e[o].course.url=g[e[o].course.id].URL,e[o].course.hasOwnProperty("isInactive")&&e[o].course.isInactive||r.push(e[o]));return r};this.isShowNav=function(e){return e!==i||this.stuObj&&0!==this.stuObj.tbMoney};var m=function(){var e=function(e){if(e.hasOwnProperty("message"))showAlert(e.message||"Something went wrong please contact at support@testbook.com","error","small",5e3);else{c=e.data||{};var r=l.call(c,"streaks")&&l.call(c.streaks,"practise")&&l.call(c.streaks.practise,"coins"),o=l.call(c,"streaks")&&l.call(c.streaks,"questions")&&l.call(c.streaks.questions,"coins");l.call(c,"cobrandingInfo")&&c.cobrandingInfo.logo&&(f.stuObj.coBrandingLogoSrc=c.cobrandingInfo.logo,f.stuObj.isShowCoBrandingLogo=!0),l.call(c,"currentCourse")&&c.currentCourse.id&&(f.stuObj.currentCourseObj=c.currentCourse),l.call(c,"image")&&c.image&&(f.stuObj.profilePic=c.image),l.call(c,"enrollments")&&c.enrollments.length&&(f.stuObj.enrollmentsArr=O(c.enrollments)),l.call(c,"referral")&&l.call(c.referral,"coins")&&(f.stuObj.tbMoney+=c.referral.coins),r&&(f.stuObj.tbMoney+=c.streaks.practise.coins),o&&(f.stuObj.tbMoney+=c.streaks.questions.coins),l.call(c,"coinsExpensed")&&(f.stuObj.tbMoney-=c.coinsExpensed),l.call(c,"referral")&&(f.stuObj.referral=c.referral)}};g=b(f.tbCourseArr),"-1"!=u&&TB.GetStudentFromStorage(e)};angular.element(document).ready(function(){$(".js-group-one, #js-header-options-sidebar .course-btn").click(function(e){e.stopPropagation(),e.preventDefault(),$(this).toggleClass("active"),$(this).parent().children("ul").slideToggle()})}),m()}var r="COURSE_CHANGED",o="COURSE_ENROLLED_DE_ENROLLED",t="REMOVE_STU_COURSE_DROPDOWN",n=angular.module("tbHeaderApp",["Testbook"]);n.controller("headerCtrl",["$scope","TB",e])}();
var TB=TB||{};!function(){function e(){return{restrict:"E",scope:{},controller:["$scope","TB",t],templateUrl:"/views/partials/components/subfooter-seo.html"}}function t(e,t){var o=function(){return{anchorTag:"",link:""}},n=function(){return{title:"",links:[]}},s=function(){return{id:"",URL:"",type:"",name:"",sections:[],SEO:{title:"",description:"",keywords:[],URL:"",rel:[]}}},r="absent",i=window.location.host+window.location.pathname,a="ls_seo",c={};e.isSubFooterPresent=!1,e.subFooterSections=[];var l=function(e){for(var t=[],s=0;s<e.length;s++){var r=n();r.title=e[s].title||"";for(var i=0;i<e[s].links.length;i++){var a=o();a.link=e[s].links[i].link||"",a.anchorTag=e[s].links[i].anchorTag||"",r.links.push(a)}t.push(r)}return t},u=function(){var o=function(t){if(t.data.hasOwnProperty("id")&&""!==t.data.id){t=t.data;var o=s();o.id=t.id,o.URL=t.URL||"",o.type=t.pageType||"",o.name=t.name||"",o.sections=l(t.sections||[]),e.subFooterSections=o.sections,e.subFooterSections.length&&(e.isSubFooterPresent=!0),c[i]=o,setLocalStorage(a,JSON.stringify(c),.5)}},n=function(e){e&&e.message&&e.message.indexOf("SEO does not exists")!==-1&&(c[i]=r,setLocalStorage(a,JSON.stringify(c),.5))};if(c=JSON.parse(getLocalStorage(a)||"{}"),c.hasOwnProperty(i))c.PAGE_URL!==r?(e.subFooterSections=c[i].sections||[],e.subFooterSections.length&&(e.isSubFooterPresent=!0)):c.PAGE_URL===r&&(e.isSubFooterPresent=!1);else{var u={url:i,fields:"URL,name,pageType,sections"};t.getPageSEO(u,o,n)}};u()}var o=angular.module("SEO",["Testbook"]);o.directive("subFooter",e)}();
!function(){angular.module("newsApp",["tbHeaderApp","SEO"])}();