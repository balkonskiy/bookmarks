!function(t){function e(t,e,a,n){for(var r="",s=0,i=a.length;i>s;s++)r+=n(a[s],e);return"<tr>"+r+"</tr>"}function a(t,e){var a=t.attributeWriter(e),n="<td";return(t.hidden||t.textAlign)&&(n+=' style="',t.hidden&&(n+="display: none;"),t.textAlign&&(n+="text-align: "+t.textAlign+";"),n+='"'),t.cssClass&&(n+=' class="'+t.cssClass+'"'),n+">"+a+"</td>"}function n(t){return t[this.id]}function r(e){return t(e).html()}function s(e,a){this.update=function(){var n="",r=a.table.columns,s=a.writers._rowWriter,i=a.writers._cellWriter;e.$element.trigger("dynatable:beforeUpdate",n);for(var o=0,d=a.dataset.records.length;d>o;o++){var l=a.dataset.records[o],u=s(o,l,r,i);n+=u}if(a.features.recordCount&&t("#dynatable-record-count-"+e.element.id).replaceWith(e.recordsCount.create()),a.features.paginate&&(t("#dynatable-pagination-links-"+e.element.id).replaceWith(e.paginationLinks.create()),a.features.perPageSelect&&t("#dynatable-per-page-"+e.element.id).val(parseInt(a.dataset.perPage))),a.features.sort&&r){e.sortsHeaders.removeAllArrows();for(var o=0,d=r.length;d>o;o++){var c=r[o],p=x.allMatch(a.dataset.sorts,c.sorts,function(t,e){return e in t}),h=a.dataset.sorts[c.sorts[0]];p&&e.$element.find('[data-dynatable-column="'+c.id+'"]').find(".dynatable-sort-header").each(function(){1==h?e.sortsHeaders.appendArrowUp(t(this)):e.sortsHeaders.appendArrowDown(t(this))})}}if(a.inputs.queries||a.features.search){var f=a.inputs.queries||t();a.features.search&&(f=f.add("#dynatable-query-search-"+e.element.id)),f.each(function(){var e=t(this),n=a.dataset.queries[e.data("dynatable-query")];e.val(n||"")})}e.$element.find(a.table.bodyRowSelector).remove(),e.$element.append(n),e.$element.trigger("dynatable:afterUpdate",n)}}function i(e,a){var n=this;this.initOnLoad=function(){return e.$element.is("table")},this.init=function(){a.table.columns=[],this.getFromTable()},this.getFromTable=function(){var r=e.$element.find(a.table.headRowSelector).children("th,td");return r.length?void r.each(function(e){n.add(t(this),e,!0)}):t.error("Couldn't find any columns headers in '"+a.table.headRowSelector+" th,td'. If your header row is different, specify the selector in the table: headRowSelector option.")},this.add=function(n,r,s,i){var o=a.table.columns,d=n.text(),l=n.data("dynatable-column")||x.normalizeText(d,a.table.defaultColumnIdStyle),u=n.data("dynatable-sorts"),c=u?t.map(u.split(","),function(e){return t.trim(e)}):[l];if(l||(this.generate(n),l=n.data("dynatable-column")),o.splice(r,0,{index:r,label:d,id:l,attributeWriter:a.writers[l]||a.writers._attributeWriter,attributeReader:a.readers[l]||a.readers._attributeReader,sorts:c,hidden:"none"===n.css("display"),textAlign:a.table.copyHeaderAlignment&&n.css("text-align"),cssClass:a.table.copyHeaderClass&&n.attr("class")}),n.attr("data-dynatable-column",l).addClass("dynatable-head"),a.table.headRowClass&&n.addClass(a.table.headRowClass),!s){var p=r+1,h=e.$element.find(a.table.headRowSelector).children("th:nth-child("+p+"),td:nth-child("+p+")").first(),f=o.slice(r+1,o.length);if(h.length?h.before(n):e.$element.find(a.table.headRowSelector).append(n),e.sortsHeaders.attachOne(n.get()),f.length)for(var g=0,m=f.length;m>g;g++)f[g].index+=1;i||e.dom.update()}return w},this.remove=function(t){{var n=a.table.columns;n.length}if("number"==typeof t){var r=n[t];this.removeFromTable(r.id),this.removeFromArray(t)}else for(var s=n.length-1;s>=0;s--){var r=n[s];r.id===t&&(this.removeFromTable(t),this.removeFromArray(s))}e.dom.update()},this.removeFromTable=function(t){e.$element.find(a.table.headRowSelector).children('[data-dynatable-column="'+t+'"]').first().remove()},this.removeFromArray=function(t){var e,n=a.table.columns;n.splice(t,1),e=n.slice(t,n.length);for(var r=0,s=e.length;s>r;r++)e[r].index-=1},this.generate=function(e){var a=void 0===e?t("<th></th>"):e;return this.attachGeneratedAttributes(a)},this.attachGeneratedAttributes=function(t){var n=e.$element.find(a.table.headRowSelector).children("th[data-dynatable-generated]").length;return t.attr("data-dynatable-column","dynatable-generated-"+n).attr("data-dynatable-no-sort","true").attr("data-dynatable-generated",n)}}function o(e,a){this.initOnLoad=function(){return!a.dataset.ajax},this.init=function(){null===a.dataset.records&&(a.dataset.records=this.getFromTable(),a.dataset.queryRecordCount||(a.dataset.queryRecordCount=this.count()),a.dataset.totalRecordCount||(a.dataset.totalRecordCount=a.dataset.queryRecordCount)),a.dataset.originalRecords=t.extend(!0,[],a.dataset.records)},this.updateFromJson=function(t){var e;if("_root"===a.params.records?e=t:a.params.records in t&&(e=t[a.params.records]),a.params.record)for(var n=e.length-1,r=0;n>r;r++)e[r]=e[r][a.params.record];a.params.queryRecordCount in t&&(a.dataset.queryRecordCount=t[a.params.queryRecordCount]),a.params.totalRecordCount in t&&(a.dataset.totalRecordCount=t[a.params.totalRecordCount]),a.dataset.records=e},this.sort=function(){var n=[].sort,r=a.dataset.sorts,s=a.dataset.sortsKeys,i=a.dataset.sortTypes,o=function(a,n){var o;if(t.isEmptyObject(r))o=e.sorts.functions.originalPlacement(a,n);else for(var d=0,l=s.length;l>d;d++){var u=s[d],c=r[u],p=i[u]||e.sorts.guessType(a,n,u);if(o=e.sorts.functions[p](a,n,u,c),0!==o)break}return o};return n.call(a.dataset.records,o)},this.paginate=function(){var t=this.pageBounds(),e=t[0],n=t[1];a.dataset.records=a.dataset.records.slice(e,n)},this.resetOriginal=function(){a.dataset.records=a.dataset.originalRecords||[]},this.pageBounds=function(){var t=a.dataset.page||1,e=(t-1)*a.dataset.perPage,n=Math.min(e+a.dataset.perPage,a.dataset.queryRecordCount);return[e,n]},this.getFromTable=function(){var n=[],r=a.table.columns,s=e.$element.find(a.table.bodyRowSelector);return s.each(function(s){var i={};i["dynatable-original-index"]=s,t(this).find("th,td").each(function(a){void 0===r[a]&&e.domColumns.add(e.domColumns.generate(),r.length,!1,!0);var n=r[a].attributeReader(this,i),s=r[a].id;"string"==typeof n&&n.match(/\s*\<.+\>/)&&(i["dynatable-sortable-text"]||(i["dynatable-sortable-text"]={}),i["dynatable-sortable-text"][s]=t.trim(t("<div></div>").html(n).text())),i[s]=n}),"function"==typeof a.readers._rowReader&&a.readers._rowReader(s,this,i),n.push(i)}),n},this.count=function(){return a.dataset.records.length}}function d(e,a){this.initOnLoad=function(){return a.features.recordCount},this.init=function(){this.attach()},this.create=function(){var t="",n="",r={elementId:e.element.id,recordsShown:e.records.count(),recordsQueryCount:a.dataset.queryRecordCount,recordsTotal:a.dataset.totalRecordCount,collectionName:"_root"===a.params.records?"records":a.params.records,text:a.inputs.recordCountText};if(a.features.paginate)if(r.recordsShown<r.recordsQueryCount){var s=e.records.pageBounds();r.pageLowerBound=s[0]+1,r.pageUpperBound=s[1],t=a.inputs.recordCountPageBoundTemplate}else r.recordsShown===r.recordsQueryCount&&(t=a.inputs.recordCountPageUnboundedTemplate);return r.recordsQueryCount<r.recordsTotal&&(n=a.inputs.recordCountFilteredTemplate),r.pageTemplate=x.template(t,r),r.filteredTemplate=x.template(n,r),r.totalTemplate=x.template(a.inputs.recordCountTotalTemplate,r),r.textTemplate=x.template(a.inputs.recordCountTextTemplate,r),x.template(a.inputs.recordCountTemplate,r)},this.attach=function(){var n=a.inputs.recordCountTarget?t(a.inputs.recordCountTarget):e.$element;n[a.inputs.recordCountPlacement](this.create())}}function l(e,a){this.init=function(){this.attach()},this.create=function(){var n=t("<div></div>",{html:"<span>"+a.inputs.processingText+"</span>",id:"dynatable-processing-"+e.element.id,"class":"dynatable-processing",style:"position: absolute; display: none;"});return n},this.position=function(){var a=t("#dynatable-processing-"+e.element.id),n=a.children("span"),r=n.outerHeight(),s=n.outerWidth(),i=e.$element,o=i.offset(),d=i.outerHeight(),l=i.outerWidth();return a.offset({left:o.left,top:o.top}).width(l).height(d),n.offset({left:o.left+(l-s)/2,top:o.top+(d-r)/2}),a},this.attach=function(){e.$element.before(this.create())},this.show=function(){t("#dynatable-processing-"+e.element.id).show(),this.position()},this.hide=function(){t("#dynatable-processing-"+e.element.id).hide()}}function u(e,a){this.initOnLoad=function(){return a.features.pushState&&history.pushState},this.init=function(){window.onpopstate=function(t){t.state&&t.state.dynatable&&e.state.pop(t)}},this.push=function(n){var r,s,i,o,d,l,u=window.location.search,c=!(window.history.state&&window.history.state.dynatable),p=c?"replaceState":"pushState";u&&/^\?/.test(u)&&(u=u.substring(1)),t.extend(r,n),i=x.refreshQueryString(u,n,a),i&&(i="?"+i),o=window.location.hash,s=window.location.pathname,e.$element.trigger("dynatable:push",n),l={dynatable:{dataset:a.dataset}},c||(l.dynatable.scrollTop=t(window).scrollTop()),d=JSON.stringify(l),l.dynatable.dataset.perPageOptions=t.makeArray(l.dynatable.dataset.perPageOptions);try{window.history[p](l,"Dynatable state",s+i+o)}catch(h){l.dynatable.dataset.records=null,window.history[p](l,"Dynatable state",s+i+o)}},this.pop=function(n){var r=n.state.dynatable;a.dataset=r.dataset,r.scrollTop&&t(window).scrollTop(r.scrollTop),r.dataset.records?e.dom.update():e.process(!0)}}function c(e,a){this.initOnLoad=function(){return a.features.sort},this.init=function(){var t=window.location.search.match(new RegExp(a.params.sorts+"[^&=]*=[^&]*","g"));t&&(a.dataset.sorts=x.deserialize(t)[a.params.sorts]),a.dataset.sortsKeys.length||(a.dataset.sortsKeys=x.keysFromObject(a.dataset.sorts))},this.add=function(n,r){var s=a.dataset.sortsKeys,i=t.inArray(n,s);return a.dataset.sorts[n]=r,e.$element.trigger("dynatable:sorts:added",[n,r]),-1===i&&s.push(n),w},this.remove=function(n){var r=a.dataset.sortsKeys,s=t.inArray(n,r);return delete a.dataset.sorts[n],e.$element.trigger("dynatable:sorts:removed",n),-1!==s&&r.splice(s,1),w},this.clear=function(){a.dataset.sorts={},a.dataset.sortsKeys.length=0,e.$element.trigger("dynatable:sorts:cleared")},this.guessType=function(t,e,a){var n={string:"string",number:"number","boolean":"number",object:"number"},r=t[a]?typeof t[a]:typeof e[a],s=n[r]||"number";return s},this.functions={number:function(t,e,a,n){return t[a]===e[a]?0:n>0?t[a]-e[a]:e[a]-t[a]},string:function(t,e,a,n){var r,s=t["dynatable-sortable-text"]&&t["dynatable-sortable-text"][a]?t["dynatable-sortable-text"][a]:t[a],i=e["dynatable-sortable-text"]&&e["dynatable-sortable-text"][a]?e["dynatable-sortable-text"][a]:e[a];return s=s.toLowerCase(),i=i.toLowerCase(),r=s===i?0:n>0?s>i:i>s,r===!1?-1:r-0},originalPlacement:function(t,e){return t["dynatable-original-index"]-e["dynatable-original-index"]}}}function p(e,a){var n=this;this.initOnLoad=function(){return a.features.sort},this.init=function(){this.attach()},this.create=function(r){var s=t(r),i=t("<a></a>",{"class":"dynatable-sort-header",href:"#",html:s.html()}),o=s.data("dynatable-column"),d=x.findObjectInArray(a.table.columns,{id:o});return i.bind("click",function(t){n.toggleSort(t,i,d),e.process(),t.preventDefault()}),this.sortedByColumn(i,d)&&(1==this.sortedByColumnValue(d)?this.appendArrowUp(i):this.appendArrowDown(i)),i},this.removeAll=function(){e.$element.find(a.table.headRowSelector).children("th,td").each(function(){n.removeAllArrows(),n.removeOne(this)})},this.removeOne=function(e){var a=t(e),n=a.find(".dynatable-sort-header");if(n.length){var r=n.html();n.remove(),a.html(a.html()+r)}},this.attach=function(){e.$element.find(a.table.headRowSelector).children("th,td").each(function(){n.attachOne(this)})},this.attachOne=function(e){var a=t(e);a.data("dynatable-no-sort")||a.html(this.create(e))},this.appendArrowUp=function(t){this.removeArrow(t),t.append("<span class='dynatable-arrow'> &#9650;</span>")},this.appendArrowDown=function(t){this.removeArrow(t),t.append("<span class='dynatable-arrow'> &#9660;</span>")},this.removeArrow=function(t){t.find(".dynatable-arrow").remove()},this.removeAllArrows=function(){e.$element.find(".dynatable-arrow").remove()},this.toggleSort=function(t,n,r){var s=this.sortedByColumn(n,r),i=this.sortedByColumnValue(r);if(a.inputs.multisort&&x.anyMatch(t,a.inputs.multisort,function(e,a){return t[a]})||(this.removeAllArrows(),e.sorts.clear()),s)if(1==i){for(var o=0,d=r.sorts.length;d>o;o++)e.sorts.add(r.sorts[o],-1);this.appendArrowDown(n)}else{for(var o=0,d=r.sorts.length;d>o;o++)e.sorts.remove(r.sorts[o]);this.removeArrow(n)}else{for(var o=0,d=r.sorts.length;d>o;o++)e.sorts.add(r.sorts[o],1);this.appendArrowUp(n)}},this.sortedByColumn=function(t,e){return x.allMatch(a.dataset.sorts,e.sorts,function(t,e){return e in t})},this.sortedByColumnValue=function(t){return a.dataset.sorts[t.sorts[0]]}}function h(e,a){var n=this;this.initOnLoad=function(){return a.inputs.queries||a.features.search},this.init=function(){var t=window.location.search.match(new RegExp(a.params.queries+"[^&=]*=[^&]*","g"));a.dataset.queries=t?x.deserialize(t)[a.params.queries]:{},""===a.dataset.queries&&(a.dataset.queries={}),a.inputs.queries&&this.setupInputs()},this.add=function(t,n){return a.features.paginate&&(a.dataset.page=1),a.dataset.queries[t]=n,e.$element.trigger("dynatable:queries:added",[t,n]),w},this.remove=function(t){return delete a.dataset.queries[t],e.$element.trigger("dynatable:queries:removed",t),w},this.run=function(){for(query in a.dataset.queries)if(a.dataset.queries.hasOwnProperty(query)){var r=a.dataset.queries[query];if(void 0===n.functions[query]){var s=x.findObjectInArray(a.table.columns,{id:query});if(!s){t.error("Query named '"+query+"' called, but not defined in queries.functions");continue}n.functions[query]=function(t,e){return t[query]==e}}a.dataset.records=t.map(a.dataset.records,function(t){return n.functions[query](t,r)?t:null})}a.dataset.queryRecordCount=e.records.count()},this.runSearch=function(n){var r=t.extend({},a.dataset.queries);n?this.add("search",n):this.remove("search"),x.objectsEqual(a.dataset.queries,r)||e.process()},this.setupInputs=function(){a.inputs.queries.each(function(){var r=t(this),s=r.data("dynatable-query-event")||a.inputs.queryEvent,i=r.data("dynatable-query")||r.attr("name")||this.id,o=function(r){var s=t(this).val();return""===s&&(s=void 0),s===a.dataset.queries[i]?!1:(s?n.add(i,s):n.remove(i),e.process(),void r.preventDefault())};r.attr("data-dynatable-query",i).bind(s,o).bind("keypress",function(t){13==t.which&&o.call(this,t)}),a.dataset.queries[i]&&r.val(decodeURIComponent(a.dataset.queries[i]))})},this.functions={search:function(t,e){var a=!1;for(attr in t)if(t.hasOwnProperty(attr)){var n=t[attr];if("string"==typeof n&&-1!==n.toLowerCase().indexOf(e.toLowerCase())){a=!0;break}}else;return a}}}function f(e,a){this.initOnLoad=function(){return a.features.search},this.init=function(){this.attach()},this.create=function(){var n=t("<input />",{type:"search",id:"dynatable-query-search-"+e.element.id,"data-dynatable-query":"search",value:a.dataset.queries.search}),r=t("<span></span>",{id:"dynatable-search-"+e.element.id,"class":"dynatable-search",text:a.inputs.searchText}).append(n);return n.bind(a.inputs.queryEvent,function(){e.queries.runSearch(t(this).val())}).bind("keypress",function(a){13==a.which&&(e.queries.runSearch(t(this).val()),a.preventDefault())}),r},this.attach=function(){var n=a.inputs.searchTarget?t(a.inputs.searchTarget):e.$element;n[a.inputs.searchPlacement](this.create())}}function g(t,e){this.initOnLoad=function(){return e.features.paginate},this.init=function(){var t=window.location.search.match(new RegExp(e.params.page+"=([^&]*)"));this.set(t&&e.features.pushState?t[1]:1)},this.set=function(a){var n=parseInt(a,10);e.dataset.page=n,t.$element.trigger("dynatable:page:set",n)}}function m(e,a){var n=this;this.initOnLoad=function(){return a.features.paginate},this.init=function(){var t=window.location.search.match(new RegExp(a.params.perPage+"=([^&]*)"));t&&a.features.pushState?this.set(t[1],!0):this.set(a.dataset.perPageDefault,!0),a.features.perPageSelect&&this.attach()},this.create=function(){for(var r=t("<select>",{id:"dynatable-per-page-"+e.element.id,"class":"dynatable-per-page-select"}),s=0,i=a.dataset.perPageOptions.length;i>s;s++){var o=a.dataset.perPageOptions[s],d=a.dataset.perPage==o?'selected="selected"':"";r.append('<option value="'+o+'" '+d+">"+o+"</option>")}return r.bind("change",function(){n.set(t(this).val()),e.process()}),t("<span />",{"class":"dynatable-per-page"}).append("<span class='dynatable-per-page-label'>"+a.inputs.perPageText+"</span>").append(r)},this.attach=function(){var n=a.inputs.perPageTarget?t(a.inputs.perPageTarget):e.$element;n[a.inputs.perPagePlacement](this.create())},this.set=function(t,n){var r=parseInt(t);n||e.paginationPage.set(1),a.dataset.perPage=r,e.$element.trigger("dynatable:perPage:set",r)}}function y(e,a){this.initOnLoad=function(){return a.features.paginate},this.init=function(){this.attach()},this.create=function(){var n='<ul id="dynatable-pagination-links-'+e.element.id+'" class="'+a.inputs.paginationClass+'">',r=a.inputs.paginationLinkClass,s=a.inputs.paginationActiveClass,i=a.inputs.paginationDisabledClass,o=Math.ceil(a.dataset.queryRecordCount/a.dataset.perPage),d=a.dataset.page,l=[a.inputs.paginationGap[0],a.dataset.page-a.inputs.paginationGap[1],a.dataset.page+a.inputs.paginationGap[2],o+1-a.inputs.paginationGap[3]];n+="<li><span>"+a.inputs.pageText+"</span></li>";for(var u=1;o>=u;u++)if(!(u>l[0]&&u<l[1]||u>l[2]&&u<l[3])){var c,p,h=e.paginationLinks.buildLink(u,u,r,d==u,s);if(c=t.inArray(u,l),p=l[c+1],c>0&&1!==u&&p&&p>u+1){var f='<li><span class="dynatable-page-break">&hellip;</span></li>';h=2>c?f+h:h+f}if(a.inputs.paginationPrev&&1===u){var g=e.paginationLinks.buildLink(d-1,a.inputs.paginationPrev,r+" "+a.inputs.paginationPrevClass,1===d,i);h=g+h}if(a.inputs.paginationNext&&u===o){var m=e.paginationLinks.buildLink(d+1,a.inputs.paginationNext,r+" "+a.inputs.paginationNextClass,d===o,i);h+=m}n+=h}n+="</ul>";var y="#dynatable-pagination-links-"+e.element.id+" a."+r+":not(."+s+",."+i+")";return t(document).undelegate(y,"click.dynatable"),t(document).delegate(y,"click.dynatable",function(n){$this=t(this),$this.closest(a.inputs.paginationClass).find("."+s).removeClass(s),$this.addClass(s),e.paginationPage.set($this.data("dynatable-page")),e.process(),n.preventDefault()}),n},this.buildLink=function(t,e,a,n,r){var s="<a data-dynatable-page="+t+' class="'+a,i="<li";return n&&(s+=" "+r,i+=' class="'+r+'"'),s+='">'+e+"</a>",i+=">"+s+"</li>"},this.attach=function(){var n=a.inputs.paginationLinkTarget?t(a.inputs.paginationLinkTarget):e.$element;n[a.inputs.paginationLinkPlacement](e.paginationLinks.create())}}var b,v,w,C,x,P,T,e,a,n,r,q={dom:s,domColumns:i,records:o,recordsCount:d,processingIndicator:l,state:u,sorts:c,sortsHeaders:p,queries:h,inputsSearch:f,paginationPage:g,paginationPerPage:m,paginationLinks:y};b={features:{paginate:!0,sort:!0,pushState:!0,search:!0,recordCount:!0,perPageSelect:!0},table:{defaultColumnIdStyle:"camelCase",columns:null,headRowSelector:"thead tr",bodyRowSelector:"tbody tr",headRowClass:null,copyHeaderAlignment:!0,copyHeaderClass:!1},inputs:{queries:null,sorts:null,multisort:["ctrlKey","shiftKey","metaKey"],page:null,queryEvent:"blur change",recordCountTarget:null,recordCountPlacement:"after",paginationLinkTarget:null,paginationLinkPlacement:"after",paginationClass:"dynatable-pagination-links",paginationLinkClass:"dynatable-page-link",paginationPrevClass:"dynatable-page-prev",paginationNextClass:"dynatable-page-next",paginationActiveClass:"dynatable-active-page",paginationDisabledClass:"dynatable-disabled-page",paginationPrev:"Previous",paginationNext:"Next",paginationGap:[1,2,2,1],searchTarget:null,searchPlacement:"before",searchText:"Search: ",perPageTarget:null,perPagePlacement:"before",perPageText:"Show: ",pageText:"Pages: ",recordCountPageBoundTemplate:"{pageLowerBound} to {pageUpperBound} of",recordCountPageUnboundedTemplate:"{recordsShown} of",recordCountTotalTemplate:"{recordsQueryCount} {collectionName}",recordCountFilteredTemplate:" (filtered from {recordsTotal} total records)",recordCountText:"Showing",recordCountTextTemplate:"{text} {pageTemplate} {totalTemplate} {filteredTemplate}",recordCountTemplate:'<span id="dynatable-record-count-{elementId}" class="dynatable-record-count">{textTemplate}</span>',processingText:"Processing..."},dataset:{ajax:!1,ajaxUrl:null,ajaxCache:null,ajaxOnLoad:!1,ajaxMethod:"GET",ajaxDataType:"json",totalRecordCount:null,queries:{},queryRecordCount:null,page:null,perPageDefault:10,perPageOptions:[10,20,50,100],sorts:{},sortsKeys:[],sortTypes:{},records:null},writers:{_rowWriter:e,_cellWriter:a,_attributeWriter:n},readers:{_rowReader:null,_attributeReader:r},params:{dynatable:"dynatable",queries:"queries",sorts:"sorts",page:"page",perPage:"perPage",offset:"offset",records:"records",record:null,queryRecordCount:"queryRecordCount",totalRecordCount:"totalRecordCount"}},w={init:function(e,a){return this.settings=v(a),this.element=e,this.$element=t(e),P.call(this),this},process:function(t){T.call(this,t)}},v=function(e){var a=t.extend(!0,{},b,e);return e&&(e.inputs&&(e.inputs.multisort&&(a.inputs.multisort=e.inputs.multisort),e.inputs.paginationGap&&(a.inputs.paginationGap=e.inputs.paginationGap)),e.dataset&&e.dataset.perPageOptions&&(a.dataset.perPageOptions=e.dataset.perPageOptions)),a},P=function(){this.$element.trigger("dynatable:preinit",this);for(model in q)if(q.hasOwnProperty(model)){var e=this[model]=new q[model](this,this.settings);e.initOnLoad()&&e.init()}this.$element.trigger("dynatable:init",this),(!this.settings.dataset.ajax||this.settings.dataset.ajax&&this.settings.dataset.ajaxOnLoad||this.settings.features.paginate||this.settings.features.sort&&!t.isEmptyObject(this.settings.dataset.sorts))&&this.process()},T=function(e){var a={};if(this.$element.trigger("dynatable:beforeProcess",a),t.isEmptyObject(this.settings.dataset.queries)||(a[this.settings.params.queries]=this.settings.dataset.queries),this.processingIndicator.show(),this.settings.features.sort&&!t.isEmptyObject(this.settings.dataset.sorts)&&(a[this.settings.params.sorts]=this.settings.dataset.sorts),this.settings.features.paginate&&this.settings.dataset.page){var n=this.settings.dataset.page,r=this.settings.dataset.perPage;a[this.settings.params.page]=n,a[this.settings.params.perPage]=r,a[this.settings.params.offset]=(n-1)*r}if(this.settings.dataset.ajaxData&&t.extend(a,this.settings.dataset.ajaxData),this.settings.dataset.ajax){var s=this,i={type:s.settings.dataset.ajaxMethod,dataType:s.settings.dataset.ajaxDataType,data:a,error:function(t,e){s.$element.trigger("dynatable:ajax:error",{xhr:t,error:e})},success:function(t){s.$element.trigger("dynatable:ajax:success",t),s.records.updateFromJson(t),s.dom.update(),!e&&s.state.initOnLoad()&&s.state.push(a)},complete:function(){s.processingIndicator.hide()}};i.url=this.settings.dataset.ajaxUrl?this.settings.dataset.ajaxUrl:x.refreshQueryString(window.location.href,{},this.settings),null!==this.settings.dataset.ajaxCache&&(i.cache=this.settings.dataset.ajaxCache),t.ajax(i)}else this.records.resetOriginal(),this.queries.run(),this.settings.features.sort&&this.records.sort(),this.settings.features.paginate&&this.records.paginate(),this.dom.update(),this.processingIndicator.hide(),!e&&this.state.initOnLoad()&&this.state.push(a);this.$element.addClass("dynatable-loaded"),this.$element.trigger("dynatable:afterProcess",a)},C={initOnLoad:function(){return!0},init:function(){}};for(model in q)if(q.hasOwnProperty(model)){var O=q[model];O.prototype=C}x=w.utility={normalizeText:function(t,e){return t=this.textTransform[e](t)},textTransform:{trimDash:function(t){return t.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"-")},camelCase:function(t){return t=this.trimDash(t),t.replace(/(\-[a-zA-Z])/g,function(t){return t.toUpperCase().replace("-","")}).replace(/([A-Z])([A-Z]+)/g,function(t,e,a){return e+a.toLowerCase()}).replace(/^[A-Z]/,function(t){return t.toLowerCase()})},dashed:function(t){return t=this.trimDash(t),this.lowercase(t)},underscore:function(t){return t=this.trimDash(t),this.lowercase(t.replace(/(-)/g,"_"))},lowercase:function(t){return t.replace(/([A-Z])/g,function(t){return t.toLowerCase()})}},deserialize:function(e){if(!e)return{};"object"==typeof e&&(e=e.join("&"));for(var a={},n=e.split("&"),r=0;r<n.length;r++){var s,i,o=n[r].split("="),d=decodeURIComponent(o[0]);if(o[1]){for(s=decodeURIComponent(o[1].replace(/\+/g," "));i=d.match(/([^&=]+)\[([^&=]+)\]$/);){var l=s;d=i[1],s={},"]["==i[2].substr(i[2].length-2)?s[i[2].substr(0,i[2].length-2)]=[l]:s[i[2]]=l}"undefined"==typeof a[d]?a[d]="[]"!=d.substr(d.length-2)?s:[s]:"string"==typeof a[d]?a[d]=s:"object"==typeof a[d]?a[d]=t.extend({},a[d],s):a[d].push(s)}}return a},refreshQueryString:function(e,a,n){{var r,s=this,i=e.split("?");i.shift()}r=this.deserialize(e);for(p in n.params)if(n.params.hasOwnProperty(p)){var o=n.params[p];if(!n.features.sort&&"sorts"==p||!n.features.paginate&&s.anyMatch(p,["page","perPage","offset"],function(t,e){return t==e}))continue;if(("page"===p||"offset"===p)&&1===a.page){r[o]&&delete r[o];continue}if("perPage"===p&&a[o]==n.dataset.perPageDefault){r[o]&&delete r[o];continue}if("queries"==p&&a[o]){var d=n.inputs.queries||[],l=t.makeArray(d.map(function(){return t(this).attr("name")}));n.features.search&&l.push("search");for(var u=0,c=l.length;c>u;u++){var p=l[u];a[o][p]?("undefined"==typeof r[o]&&(r[o]={}),r[o][p]=a[o][p]):r&&r[o]&&r[o][p]&&delete r[o][p]}continue}a[o]?r[o]=a[o]:delete r[o]}return t.param(r)},keysFromObject:function(t){var e=[];for(var a in t)e.push(a);return e},findObjectInArray:function(t,e){for(var a,n=this,r=0,s=t.length;s>r;r++){var i=t[r];if(n.allMatch(i,e,function(t,e,a){return t[e]==a})){a=i;break}}return a},allMatch:function(e,a,n){var r=!0,s=t.isArray(a);return t.each(a,function(t,a){var i=s?n(e,a):n(e,t,a);return i?void 0:r=!1}),r},anyMatch:function(e,a,n){var r=!1,s=t.isArray(a);return t.each(a,function(t,a){var i=s?n(e,a):n(e,t,a);return i?(r=!0,!1):void 0}),r},objectsEqual:function(t,e){for(attr in t)if(t.hasOwnProperty(attr)&&(!e.hasOwnProperty(attr)||t[attr]!==e[attr]))return!1;for(attr in e)if(e.hasOwnProperty(attr)&&!t.hasOwnProperty(attr))return!1;return!0},randomHash:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},template:function(t,e){return t.replace(/{(\w*)}/g,function(t,a){return e.hasOwnProperty(a)?e[a]:""})}},"function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),t.dynatableSetup=function(t){b=v(t)},t.dynatable=function(e){t.fn.dynatable=function(a){return this.each(function(){t.data(this,"dynatable")||t.data(this,"dynatable",Object.create(e).init(this,a))})}},t.dynatable(w)}(jQuery);