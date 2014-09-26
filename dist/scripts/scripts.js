"use strict";angular.module("axisJSApp",["ngAnimate","ngResource","ngSanitize","ngGrid","ui"]),angular.module("axisJSApp").controller("MainCtrl",["$scope",function(a){a.inputs={},a.columns=[],a.chartData={},a.gridOptions={data:"chartData",plugins:[new ngGridFlexibleHeightPlugin]},a.config={data:{x:"",y:"",y2:"",columns:[["data1",30,200,100,400,150,250],["data2",50,20,10,40,15,25]],axes:{},groups:{},type:"",types:{data1:"line",data2:"line"},colors:{data1:"#78B8DF",data2:"#AFCBCE"}},axis:{x:{show:!0},y:{show:!0},y2:{show:!1}},point:{show:!1}},a.chartTypes=["line","step","area","area-step","scatter","bar","spline"],a.config.groups={},a.config.defaultColors=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],a.inputs.csvData="data1	data2\n30	50\n200	20\n100	10\n400	40\n150	15\n250	25",a.config.axis.x.show=!0,a.config.axis.y.show=!0,a.config.axis.y2.show=!1,a.config.axis.x.accuracy=0,a.config.axis.y.accuracy=0,a.config.axis.y2.accuracy=0,a.config.axis.x.prefix="",a.config.axis.y.prefix="",a.config.axis.y2.prefix="",a.config.axis.x.suffix="",a.config.axis.y.suffix="",a.config.axis.y2.suffix="",a.config.axis.x.tick={format:function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.x.type?a.config.axis.x.prefix+b.toFixed(a.config.axis.x.accuracy).toString()+a.config.axis.x.suffix:b}},a.config.axis.y.tick={format:function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.y.type?a.config.axis.y.prefix+b.toFixed(a.config.axis.y.accuracy).toString()+a.config.axis.y.suffix:b}},a.config.axis.y2.tick={format:function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.y2.type?a.config.axis.y2.prefix+b.toFixed(a.config.axis.y2.accuracy).toString()+a.config.axis.y2.suffix:b}},a.config.chartTitle="",a.config.chartCredit="",a.config.chartSource="",a.config.chartWidth=1e3,a.config.chartGlobalType="series",a.config.chartAccuracy=1,a.config.cms="undefined"!=typeof parent.tinymce?!0:!1,a.config.pie={label:{format:function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"}}},a.config.donut={label:{format:function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"}}},a.config.gauge={label:{format:function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"}}},a.updateData=function(){a.inputs.csvData&&(a.chartData=[],a.columns=[],a.config.data.columns=[],a.chartData=Papa.parse(a.inputs.csvData,{header:!0}).data,a.chartData.length>0&&(a.columns=Object.keys(a.chartData[0]),angular.forEach(a.columns,function(b){var c=[];c.push(b),angular.forEach(a.chartData,function(a){c.push(a[b])}),a.config.data.columns.push(c),"undefined"==typeof a.config.data.types[b]&&(a.config.data.types[b]="series"===a.config.chartGlobalType?"line":a.config.chartGlobalType)})))},a.validateCSV=function(a){var b=Papa.parse(a,{header:!0});return b.errors.length>0?!1:!0},a.setGlobalType=function(b){for(var c in a.config.data.types)a.config.data.types.hasOwnProperty(c)&&(a.config.data.types[c]="series"!==b?b:"line")},a.setGroups=function(){a.config.data.groups=[];for(var b in a.config.groups)a.config.groups.hasOwnProperty(b)&&("undefined"==typeof a.config.data.groups[a.config.groups[b]]&&(a.config.data.groups[a.config.groups[b]]=[]),a.config.data.groups[a.config.groups[b]].push(b))},a.updateData(),window.getConfig=function(){console.dir(a.config),window.chartConfig=a.config},"undefined"!=typeof parent.tinymce&&"undefined"!=typeof parent.tinymce.activeEditor.windowManager.getParams().axisJS&&(a.config=angular.fromJson(window.atob(parent.tinymce.activeEditor.windowManager.getParams().axisJS)),a.config.axis.x.tick.format=function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.x.type?a.config.axis.x.prefix+b.toFixed(a.config.axis.x.accuracy).toString()+a.config.axis.x.suffix:b},a.config.axis.y.tick.format=function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.y.type?a.config.axis.y.prefix+b.toFixed(a.config.axis.y.accuracy).toString()+a.config.axis.y.suffix:b},a.config.axis.y2.tick.format=function(b){return"series"===a.config.chartGlobalType&&"category"!==a.config.axis.y2.type?a.config.axis.y2.prefix+b.toFixed(a.config.axis.y2.accuracy).toString()+a.config.axis.y2.suffix:b},a.config.donut.label.format=function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"},a.config.pie.label.format=function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"},a.config.gauge.label.format=function(b,c){return(100*c).toFixed(a.config.chartAccuracy)+"%"},a.updateData())}]),angular.module("axisJSApp").directive("buildChart",function(){return{restrict:"A",link:function(a,b){function c(){var b,c,d,e,f=d3.select("svg"),g=f.attr("width");for(null!==f.select("text.titles")[0][0]?(b=f.select("text.titles"),c=b.select("tspan.chartTitle"),d=b.select("tspan.chartCredit"),e=b.select("tspan.chartSource")):(b=f.insert("text").attr("class","titles").attr("text-anchor","middle"),c=b.insert("tspan").attr("class","chartTitle"),d=b.insert("tspan").attr("class","chartCredit"),e=b.insert("tspan").attr("class","chartSource")),c.text(a.config.chartTitle).attr("font-size","32px"),d.text(a.config.chartCredit).attr("font-size","30px"),e.text(a.config.chartSource).attr({"font-size":"28px","font-style":"oblique"}),c.attr({dy:0,x:0}),d.attr({dy:32,x:0}),e.attr({dy:30,x:0});c.node().getComputedTextLength()>g||d.node().getComputedTextLength()>g||e.node().getComputedTextLength()>g;){var h=parseInt(c.attr("font-size").replace("px",""))-1,i=parseInt(d.attr("font-size").replace("px",""))-1,j=parseInt(e.attr("font-size").replace("px",""))-1;c.attr("font-size",h+"px"),d.attr("font-size",i+"px"),e.attr("font-size",j+"px"),d.attr({dy:h,x:0}),e.attr({dy:i,x:0})}b.attr("width",g).attr("transform","translate("+g/2+",350)"),f.attr("height",f.node().getBBox().height+"px")}function d(){e=c3.generate({bindto:"#"+b[0].id,data:{x:a.config.data.x,y:a.config.data.y,y2:a.config.data.y2,columns:a.config.data.columns,axes:a.config.data.axes,types:a.config.data.types,colors:a.config.data.colors,groups:a.config.data.groups},axis:a.config.axis,legend:a.config.legend,point:a.config.point,pie:a.config.pie,donut:a.config.donut,gauge:a.config.gauge}),c()}b.children("svg").attr("transform","scale(2)");var e;d(),a.$watch("config.data.columns",function(){d();for(var b in e.data.colors())"undefined"==typeof a.config.data.colors[b]&&(a.config.data.colors[b]=e.data.colors()[b])}),a.$watch("config.data.colors",function(){e.data.colors(a.config.data.colors)},!0),a.$watch("config.data.types",function(){d()},!0),a.$watch("config.axis",function(b){for(var c in b)if(b.hasOwnProperty(c)){if(b[c].hasOwnProperty("label")){var f={};f[c]=b[c].label,e.axis.labels(f)}(b[c].hasOwnProperty("show")||b[c].hasOwnProperty("max")||b[c].hasOwnProperty("min"))&&d(),(b[c].hasOwnProperty("prefix")||b[c].hasOwnProperty("suffix")||b[c].hasOwnProperty("accuracy"))&&(a.config.axis[c].prefix="undefined"==typeof b[c].prefix?"":b[c].prefix,a.config.axis[c].suffix="undefined"==typeof b[c].suffix?"":b[c].suffix,a.config.axis[c].accuracy="undefined"==typeof b[c].accuracy?0:b[c].accuracy)}},!0),a.$watchGroup(["config.data.x","config.data.y","config.data.y2"],function(b){b.forEach(function(b,c){var d=0===c?"x":1===c?"y":2===c?"y2":"";a.config.data.columns.forEach(function(c){for(var e=1;e<c.length;e++)if(isNaN(c[e])&&c[0]===b){a.config.axis[d].type="category",a.config.axis[d].tick=void 0;break}})}),d()}),a.$watchGroup(["config.chartTitle","config.chartCredit","config.chartSource","config.chartAccuracy"],function(){d()}),a.$watch("config.data.groups",function(){d()},!0)}}}),angular.module("axisJSApp").directive("exportChart",function(){return{restrict:"A",link:function(a,b,c){b.on("click",function(){switch(c.exportChart){case"cms":e(a.config.chartWidth);var b=a.config;b.axis.x.tick.format=b.axis.x.tick.format.toString(),b.axis.y.tick.format=b.axis.y.tick.format.toString(),b.axis.y2.tick.format=b.axis.y2.tick.format.toString(),b.pie.label.format=b.pie.label.format.toString(),b.donut.label.format=b.donut.label.format.toString(),b.gauge.label.format=b.gauge.label.format.toString(),parent.tinymce.activeEditor.insertContent('<div class="mceNonEditable"><img src="'+angular.element(".savePNG").attr("href")+"\" data-axisjs='"+window.btoa(angular.toJson(b))+'\' class="mceItem axisChart" /></div><br />'),parent.tinymce.activeEditor.windowManager.close();break;case"images":e(a.config.chartWidth)}});var d,e=function(b){angular.element("defs").remove(),f();var c=angular.element("#canvas").empty()[0];if(b){var d=b/angular.element("#chart").width();angular.element("#chart > svg").attr("transform","scale("+d+")"),c.width=angular.element("#chart > svg").width()*d,c.height=angular.element("#chart > svg").height()*d}else angular.element("#chart > svg").attr("transform","scale(2)"),c.width=2*angular.element("#chart > svg").width(),c.height=2*angular.element("#chart > svg").height();var e=c.getContext("2d"),g=document.getElementsByTagName("svg")[0],i=new XMLSerializer;g=i.serializeToString(g),e.drawSvg(g,0,0);for(var j=[],k=0;k<a.columns.length;k++)j.push(a.columns[k]);a.chartTitle&&j.unshift(a.chartTitle),j=j.join("-").replace(/[^\w\d]+/gi,"-"),angular.element(".savePNG").attr("href",c.toDataURL("png")).attr("download",function(){return j+"_axisJS.png"});var l=h(angular.element("#chart > svg")[0]);$(".saveSVG").attr("href","data:text/svg,"+l.source[0]).attr("download",function(){return j+"_axisJS.svg"})},f=function(){for(var a,b,c=0;c<=document.styleSheets.length-1;c++)document.styleSheets[c].href&&-1!==document.styleSheets[c].href.indexOf("c3.css")&&(a=void 0!==document.styleSheets[c].rules?document.styleSheets[c].rules:document.styleSheets[c].cssRules);if(null!==a&&void 0!==a){var e=function(){("hidden"===angular.element(this).css("visibility")||"0"===angular.element(this).css("opacity"))&&angular.element(this).css("display","none")};for(c=0;c<a.length;c++)1===a[c].type&&(b=a[c].selectorText,d=g(a[c]),angular.element("svg *").each(e),angular.element(b).not(".c3-chart path").css(d)),angular.element(".c3-chart path").filter(function(){return"none"===angular.element(this).css("fill")}).attr("fill","none"),angular.element(".c3-chart path").filter(function(){return"none"!==angular.element(this).css("fill")}).attr("fill",function(){return angular.element(this).css("fill")})}},g=function(a){var b,c=a.style,d={};for(b=0;b<c.length;b++)d[c[b]]=c[c[b]];return d},h=function(a){var b={xmlns:"http://www.w3.org/2000/xmlns/",xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"},c='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';a.setAttribute("version","1.1");var e=document.createElement("style");e.setAttribute("type","text/css"),a.removeAttribute("xmlns"),a.removeAttribute("xlink"),a.hasAttributeNS(b.xmlns,"xmlns")||a.setAttributeNS(b.xmlns,"xmlns",b.svg),a.hasAttributeNS(b.xmlns,"xmlns:xlink")||a.setAttributeNS(b.xmlns,"xmlns:xlink",b.xlink);var f=(new XMLSerializer).serializeToString(a).replace("</style>","<![CDATA["+d+"]]></style>");return f=f.replace(/\sfont-.*?: .*?;/gi,""),f=f.replace(/\sclip-.*?="url\(http:\/\/localhost:9000\/.*?\)"/gi,""),f=f.replace(/\stransform="scale\(2\)"/gi,""),f=f.replace(/<defs xmlns="http:\/\/www.w3.org\/1999\/xhtml">/gi,"<defs>"),{svg:a,source:[c+f]}}}}});