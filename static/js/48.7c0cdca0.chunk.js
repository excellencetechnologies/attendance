(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{1138:function(e,a,t){"use strict";t.r(a);var l=t(26),s=t(27),n=t(29),i=t(28),r=t(30),d=t(0),o=t.n(d),c=t(36),p=t(564),y=t(34),h=t(45),m=t(5),u=t(131),g=t(264),E=t(37),f=t(8),v=t(10),b=t(596),N=t.n(b),H=t(179),O=t(615),j=function(e){function a(){return Object(l.a)(this,a),Object(n.a)(this,Object(i.a)(a).apply(this,arguments))}return Object(r.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.holidayType,l=a.yearArray,s=o.a.createElement("img",{src:"./socialMediaIcons/holidays.svg",className:"w-40 img-circle m-x-md"}),n=o.a.createElement("tr",null,o.a.createElement("td",{className:"text-muted text-center",colSpan:4},o.a.createElement("h2",null,s," Loading Holidays...")));return void 0!==this.props.holidays&&0===v.size(this.props.holidays)?n=o.a.createElement("tr",null,o.a.createElement("td",{className:"text-muted text-center",colSpan:4},o.a.createElement("h2",null,s," No Holidays This Year."))):void 0!==this.props.holidays&&(this.props.holidays.sort(function(e,a){return new Date(e.date)-new Date(a.date)}),n=v.map(this.props.holidays,function(a,t){return o.a.createElement("tr",{key:t},o.a.createElement("td",null,a.month),o.a.createElement("td",null,a.date),o.a.createElement("td",null,a.dayOfWeek),o.a.createElement("td",null,a.name),o.a.createElement("td",null,a.type_text),e.props.isAdmin?o.a.createElement("td",null,o.a.createElement("button",{className:"md-btn md-raised m-b-sm danger",id:a.id,onClick:function(t){Object(h.a)("Are you sure ?","Do you want to delete this holiday ?","warning").then(function(t){t&&e.props.deleteHoliday(a.id)})},"aria-hidden":"true"},"Delete")):null)})),o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-5",style:{float:"left"}},o.a.createElement("div",{className:"col-md-3",style:Object(f.a)({paddingLeft:"1px"},"paddingLeft","1px")},o.a.createElement("select",{className:"form-control",ref:"year_holidays",onChange:function(a){e.props.handleYearChange(a)},value:this.props.state.yearSelected,style:{minHeight:"0"}},l&&l.map(function(e,a){return o.a.createElement("option",{key:a,value:e},e)})))),this.props.isAdmin?o.a.createElement("div",{className:"col-md-7",style:{float:"right"}},o.a.createElement("div",{className:"col-md-3",style:{paddingTop:"2px",paddingRight:"1px"}},o.a.createElement(N.a,{dateFormat:"YYYY-MM-DD",className:"form-control",onChange:function(a){e.props.handleDateChnage(a)},value:this.props.state.date})),o.a.createElement("div",{className:"col-md-3",style:{paddingLeft:"1px",paddingRight:"1px"}},o.a.createElement(O.a,{onchange:function(a){e.props.handleHolidayNameChnage(a)},value:this.props.state.holidayName,placeHolder:"Holiday Name",style:{minHeight:"0"}})),o.a.createElement("div",{className:"col-md-3",style:{paddingLeft:"1px",paddingRight:"1px"}},o.a.createElement("select",{className:"form-control",ref:"holiday_type",onChange:function(a){e.props.handleTypeChnage(a)},value:this.props.state.type,style:{minHeight:"0"}},t&&t.map(function(e,a){return o.a.createElement("option",{key:a,value:e.type},e.text)}))),o.a.createElement("div",{className:"col-md-3",style:{paddingTop:"2px",paddingLeft:"1px",paddingRight:"1px"}},o.a.createElement(H.a,{className:"col-xs-10 p-y-2 m-b-sm indigo",onClick:function(){return e.props.addHoliday()},label:"Add Holiday",style:{width:"100%"},disabled:""===this.props.state.date||""===this.props.state.holidayName||""===this.props.state.type}))):null),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("div",{className:"table-responsive box"},o.a.createElement("div",{className:"box-divider m-a-0"}),o.a.createElement("table",{className:"table table-striped"},o.a.createElement("thead",{className:"success"},o.a.createElement("tr",null,o.a.createElement("th",null,"Month"),o.a.createElement("th",null,"Date"),o.a.createElement("th",null,"Day"),o.a.createElement("th",null,"Holiday"),o.a.createElement("th",null,"Type"),this.props.isAdmin?o.a.createElement("th",null,"Actions"):null)),o.a.createElement("tbody",null,n))))))}}]),a}(o.a.Component),C=t(71),x=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(n.a)(this,Object(i.a)(a).call(this,e))).handleDateChnage=function(e){e&&t.setState({date:e,year:C(e).year()})},t.handleHolidayNameChnage=function(e){t.setState({holidayName:e.target.value})},t.handleTypeChnage=function(e){t.setState({type:e.target.value})},t.handleYearChange=function(e){t.setState({yearSelected:e.target.value}),t.props.requestHolidayList({year:e.target.value})},t.addHoliday=function(){t.props.requestAddHoliday({data:t.state,token:Object(E.c)()})},t.deleteHoliday=function(e){t.props.requestDeleteHoliday({id:e,token:Object(E.c)()})},t.props.isAlreadyLogin(),t.state={date:"",holidayName:"",type:"",year:"",yearSelected:""},t.year=[],t}return Object(r.a)(a,e),Object(s.a)(a,[{key:"componentWillMount",value:function(){this.props.requestHolidayList({year:(new Date).getYear()+1900}),this.props.resetReducer(),this.props.requestHolidayType({token:Object(E.c)()}),this.year=Object(E.d)(),this.setState({yearSelected:"".concat(this.year[3])})}},{key:"componentWillReceiveProps",value:function(e){var a=e.addHoliday,t=e.holidayType,l=e.deleteHoliday;t&&t.data&&t.data.holiday_type_list&&this.setState({type:"".concat(t.data.holiday_type_list[0].type)}),a.isError&&Object(h.b)("Error !",a.message,"error"),a.isSuccess&&(Object(h.b)("Success !",a.data.message,"success"),this.setState({date:"",holidayName:"",yearSelected:this.state.year}),this.props.requestHolidayList({year:this.state.year})),l.isError&&Object(h.b)("Error !",l.message,"error"),l.isSuccess&&(Object(h.b)("Success !",l.data.message,"success"),this.props.requestHolidayList({year:this.state.yearSelected}));var s=e.location,n=e.history,i=e.loggedUser,r=e.holidaysList,d=r.isError,o=r.message,c=Object(E.e)(s.pathname,i);c.status&&n.push(c.redirectTo),d&&Object(h.b)("Error !",o,"error"),e.holidayType&&e.holidayType.data&&e.holidayType.data.holiday_type_list&&this.setState({type:"".concat(e.holidayType.data.holiday_type_list[0].type)})}},{key:"render",value:function(){var e=this.props.holidaysList,a=e.isLoading,t=e.data;return o.a.createElement("div",null,o.a.createElement(u.a,this.props),o.a.createElement("div",{id:"content",className:"app-content box-shadow-z0",role:"main"},o.a.createElement(g.a,{pageTitle:"Holidays List",showLoading:a}),o.a.createElement("div",{className:"app-footer"}),o.a.createElement("div",{className:"app-body",id:"view"},o.a.createElement("div",{className:"padding"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-12"},o.a.createElement(j,{holidays:t.holidays,addHoliday:this.addHoliday,isAdmin:"Admin"===this.props.loggedUser.data.role,holidayType:this.props.holidayType.data.holiday_type_list,yearArray:this.year,handleDateChnage:this.handleDateChnage,handleHolidayNameChnage:this.handleHolidayNameChnage,handleTypeChnage:this.handleTypeChnage,handleYearChange:this.handleYearChange,deleteHoliday:this.deleteHoliday,state:this.state})))))))}}]),a}(o.a.Component);a.default=Object(p.a)(Object(c.b)(function(e){return{frontend:e.frontend.toJS(),loggedUser:e.logged_user.userLogin,holidaysList:e.holidaysList.holidaysList,addHoliday:e.holidaysList.addHolidays,deleteHoliday:e.holidaysList.deleteHolidays,holidayType:e.holidaysList.holidayType}},function(e){return Object(y.b)(m,e)})(x))},615:function(e,a,t){"use strict";var l=t(0),s=t.n(l);a.a=function(e){var a=e.className,t=e.ref,l=e.placeHolder,n=e.onchange,i=e.id,r=e.name,d=e.value,o=e.style,c="form-control "+a;return s.a.createElement("input",{type:"text",className:c,ref:t,placeholder:l,onChange:n,id:i,required:!0,name:r,value:d,style:o})}}}]);
//# sourceMappingURL=48.7c0cdca0.chunk.js.map