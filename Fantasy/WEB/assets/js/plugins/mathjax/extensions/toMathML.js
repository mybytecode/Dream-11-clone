/*
 *  /MathJax/extensions/toMathML.js
 *
 *  Copyright (c) 2009-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js",function(){var c="2.7.4";var a=MathJax.ElementJax.mml,b=MathJax.Hub.config.menuSettings;a.mbase.Augment({toMathML:function(l){var h=(this.inferred&&this.parent.inferRow);if(l==null){l=""}var f=this.type,e=this.toMathMLattributes();if(f==="mspace"){return l+"<"+f+e+" />"}var k=[],j=(this.isToken?"":l+(h?"":"  "));for(var g=0,d=this.data.length;g<d;g++){if(this.data[g]){k.push(this.data[g].toMathML(j))}else{if(!this.isToken&&!this.isChars){k.push(j+"<mrow />")}}}if(this.isToken||this.isChars){return l+"<"+f+e+">"+k.join("")+"</"+f+">"}if(h){return k.join("\n")}if(k.length===0||(k.length===1&&k[0]==="")){return l+"<"+f+e+" />"}return l+"<"+f+e+">\n"+k.join("\n")+"\n"+l+"</"+f+">"},toMathMLattributes:function(){var j=(this.type==="mstyle"?a.math.prototype.defaults:this.defaults);var h=(this.attrNames||a.copyAttributeNames),g=a.skipAttributes,l=a.copyAttributes;var e=[];if(this.type==="math"&&(!this.attr||!("xmlns" in this.attr))){e.push('xmlns="http://www.w3.org/1998/Math/MathML"')}if(!this.attrNames){for(var k in j){if(!g[k]&&!l[k]&&j.hasOwnProperty(k)){if(this[k]!=null&&this[k]!==j[k]){if(this.Get(k,null,1)!==this[k]){e.push(k+'="'+this.toMathMLattribute(this[k])+'"')}}}}}for(var f=0,d=h.length;f<d;f++){if(l[h[f]]===1&&!j.hasOwnProperty(h[f])){continue}value=(this.attr||{})[h[f]];if(value==null){value=this[h[f]]}if(value!=null){e.push(h[f]+'="'+this.toMathMLquote(value)+'"')}}this.toMathMLclass(e);if(e.length){return" "+e.join(" ")}else{return""}},toMathMLclass:function(d){var f=[];if(this["class"]){f.push(this["class"])}if(this.isa(a.TeXAtom)&&b.texHints){var e=["ORD","OP","BIN","REL","OPEN","CLOSE","PUNCT","INNER","VCENTER"][this.texClass];if(e){f.push("MJX-TeXAtom-"+e);if(e==="OP"&&!this.movablelimits){f.push("MJX-fixedlimits")}}}if(this.mathvariant&&this.toMathMLvariants[this.mathvariant]){f.push("MJX"+this.mathvariant)}if(this.variantForm){f.push("MJX-variant")}if(f.length){d.unshift('class="'+this.toMathMLquote(f.join(" "))+'"')}},toMathMLattribute:function(d){if(typeof(d)==="string"&&d.replace(/ /g,"").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)){return(RegExp.$2||"")+((1/18)*RegExp.$3).toFixed(3).replace(/\.?0+$/,"")+"em"}else{if(this.toMathMLvariants[d]){return this.toMathMLvariants[d]}}return this.toMathMLquote(d)},toMathMLvariants:{"-tex-caligraphic":a.VARIANT.SCRIPT,"-tex-caligraphic-bold":a.VARIANT.BOLDSCRIPT,"-tex-oldstyle":a.VARIANT.NORMAL,"-tex-oldstyle-bold":a.VARIANT.BOLD,"-tex-mathit":a.VARIANT.ITALIC},toMathMLquote:function(f){f=String(f).split("");for(var g=0,d=f.length;g<d;g++){var k=f[g].charCodeAt(0);if(k<=55295||57344<=k){if(k>126||(k<32&&k!==10&&k!==13&&k!==9)){f[g]="&#x"+k.toString(16).toUpperCase()+";"}else{var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[f[g]];if(j){f[g]=j}}}else{if(g+1<d){var h=f[g+1].charCodeAt(0);var e=(((k-55296)<<10)+(h-56320)+65536);f[g]="&#x"+e.toString(16).toUpperCase()+";";f[g+1]="";g++}else{f[g]=""}}}return f.join("")}});a.math.Augment({toMathML:function(d,e){var g;if(d==null){d=""}if(e&&e.originalText&&b.semantics){g=MathJax.InputJax[e.inputJax].annotationEncoding}var n=(this.data[0]&&this.data[0].data.length>1);var p=this.type,k=this.toMathMLattributes();var j=[],o=d+(g?"  "+(n?"  ":""):"")+"  ";for(var h=0,f=this.data.length;h<f;h++){if(this.data[h]){j.push(this.data[h].toMathML(o))}else{j.push(o+"<mrow />")}}if(j.length===0||(j.length===1&&j[0]==="")){if(!g){return"<"+p+k+" />"}j.push(o+"<mrow />")}if(g){if(n){j.unshift(d+"    <mrow>");j.push(d+"    </mrow>")}j.unshift(d+"  <semantics>");var l=e.originalText.replace(/[&<>]/g,function(i){return{">":"&gt;","<":"&lt;","&":"&amp;"}[i]});j.push(d+'    <annotation encoding="'+this.toMathMLquote(g)+'">'+l+"</annotation>");j.push(d+"  </semantics>")}return d+"<"+p+k+">\n"+j.join("\n")+"\n"+d+"</"+p+">"}});a.msubsup.Augment({toMathML:function(j){var f=this.type;if(this.data[this.sup]==null){f="msub"}if(this.data[this.sub]==null){f="msup"}var e=this.toMathMLattributes();delete this.data[0].inferred;var h=[];for(var g=0,d=this.data.length;g<d;g++){if(this.data[g]){h.push(this.data[g].toMathML(j+"  "))}}return j+"<"+f+e+">\n"+h.join("\n")+"\n"+j+"</"+f+">"}});a.munderover.Augment({toMathML:function(k){var f=this.type;var j=this.data[this.base];if(j&&j.isa(a.TeXAtom)&&j.movablelimits&&!j.Get("displaystyle")){type="msubsup";if(this.data[this.under]==null){f="msup"}if(this.data[this.over]==null){f="msub"}}else{if(this.data[this.under]==null){f="mover"}if(this.data[this.over]==null){f="munder"}}var e=this.toMathMLattributes();delete this.data[0].inferred;var h=[];for(var g=0,d=this.data.length;g<d;g++){if(this.data[g]){h.push(this.data[g].toMathML(k+"  "))}}return k+"<"+f+e+">\n"+h.join("\n")+"\n"+k+"</"+f+">"}});a.TeXAtom.Augment({toMathML:function(e){var d=this.toMathMLattributes();if(!d&&this.data[0].data.length===1){return e.substr(2)+this.data[0].toMathML(e)}return e+"<mrow"+d+">\n"+this.data[0].toMathML(e+"  ")+"\n"+e+"</mrow>"}});a.chars.Augment({toMathML:function(d){return(d||"")+this.toMathMLquote(this.toString())}});a.entity.Augment({toMathML:function(d){return(d||"")+"&"+this.toMathMLquote(this.data[0])+";<!-- "+this.toString()+" -->"}});a.xml.Augment({toMathML:function(d){return(d||"")+this.toString()}});MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function(){a.TeXmathchoice.Augment({toMathML:function(d){return this.Core().toMathML(d)}})});MathJax.Hub.Startup.signal.Post("toMathML Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
