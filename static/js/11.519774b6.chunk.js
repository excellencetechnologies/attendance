(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1092:function(e,t,a){"use strict";a.r(t);var s=a(25),l=a(26),n=a(29),r=a(27),i=a(28),c=a(12),o=a(0),d=a.n(o),m=a(36),p=a(1075),u=a(9),v=a.n(u),h=a(122),b=a(23),g=a(37),f=a(253),E=a(1),y=a.n(E),L=a(40),x=a.n(L),N=function(e){var t=e.listItems,a=e.selectedLeave,s=e.selectLeave,l=function(e){var t=x()("#leaveDetails").height();x()(window).width()>767&&e?(x()("#leavesList").addClass("in").css({height:t+"px"}),x()("#leavesList .scroll-leave-list").css({height:t+"px"})):x()(window).width()>767?(x()("#leavesList").addClass("in"),x()("#leavesList .scroll-leave-list").css({height:t+"px"})):x()("#leavesList").removeClass("in")};x()(document).ready(function(){x()("#leavesList").on("show.bs.collapse",function(){x()(".leave-list-collapse .expand-icon").text("expand_less")}),x()("#leavesList").on("hide.bs.collapse",function(){x()(".leave-list-collapse .expand-icon").text("expand_more")}),x()(window).on("resize",function(){l(!0)}),l(!1)});var n=v.a.map(t,function(e,t){var l="",n="";return"Approved"===e.status?l="green-A200":"Pending"===e.status?l="blue":"Rejected"===e.status&&(l="red-500"),e.id===a.id&&(n="yellow"),d.a.createElement("div",{key:t,id:"leaveList".concat(t),className:"list-item pointer m-b b-l b-l-2x b-".concat(l," ").concat(n),onClick:function(){return s(e.id)}},d.a.createElement("div",{className:"list-left"},d.a.createElement("span",{className:"w-40 avatar"},d.a.createElement("img",{src:e.user_profile_image,className:"img-circle"}))),d.a.createElement("div",{className:"list-body"},e.user_profile_name,d.a.createElement("small",{className:"block"},"Applied on : ",e.applied_on)))});return d.a.createElement("div",{className:"row-col"},d.a.createElement("div",{className:"text-center leave-list-collapse hidden-md hidden-sm hidden-lg","data-toggle":"collapse","data-target":"#leavesList"},d.a.createElement("h6",null,"List Leaves"),d.a.createElement("span",{className:"material-icons expand-icon"},"expand_more")),d.a.createElement("div",{id:"leavesList",className:"collapse"},d.a.createElement("div",{className:"list inset scroll scroll-leave-list"},n)))};N.PropTypes={listItems:y.a.array.isRequired,selectedLeave:y.a.shape({id:y.a.string.isRequired}).isRequired,selectLeave:y.a.func.isRequired};var _=N,j=a(101),O=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={messagetouser:"",notifyMsg:"Document Required Notification Sent",document_required:!0,messageByHr:"",edit:!1,editedComment:""},a.handleNotify=a.handleNotify.bind(Object(c.a)(Object(c.a)(a))),a.handleComment=a.handleComment.bind(Object(c.a)(Object(c.a)(a))),a.handleExtraDay=a.handleExtraDay.bind(Object(c.a)(Object(c.a)(a))),a.handleSave=a.handleSave.bind(Object(c.a)(Object(c.a)(a))),a.handleEdit=a.handleEdit.bind(Object(c.a)(Object(c.a)(a))),a.handleUpdate=a.handleUpdate.bind(Object(c.a)(Object(c.a)(a))),a.handleRevert=a.handleRevert.bind(Object(c.a)(Object(c.a)(a))),a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({messagetouser:"",edit:!1})}},{key:"handleRevert",value:function(){this.props.leaveRevertRequest(this.props.selectedLeave.id,Object(g.c)())}},{key:"handleSave",value:function(e){this.props.onAddDescription(this.props.selectedLeave.id,this.state.messageByHr,e),this.setState({edit:!1,messageByHr:""})}},{key:"handleUpdate",value:function(e){this.props.onAddDescription(this.props.selectedLeave.id,this.state.editedComment,e),this.setState({edit:!1,editedComment:""})}},{key:"handleExtraDay",value:function(e){this.props.onAddExtraDay(this.props.selectedLeave.id,Object(g.c)(),e)}},{key:"handleNotify",value:function(){this.props.onDocRequired(this.props.selectedLeave.id,"1","")}},{key:"handleComment",value:function(){this.props.onDocRequired(this.props.selectedLeave.id,"",this.state.messagetouser)}},{key:"handleEdit",value:function(){var e=this.props.selectedLeave.hr_comment;this.setState({edit:!0,editedComment:e})}},{key:"changeStatus",value:function(e,t){this.props.doLeaveStatusChange(e,t,this.state.messagetouser)}},{key:"_getChangeStatusButtons",value:function(e,t){var a=this,s="";return this.props.loggedUser.data.role===b.a.HR&&(s="none"),"Approved"===this.props.selectedLeave.status&&(s="none"),"Rejected"===this.props.selectedLeave.status&&(s="none"),u.map(["Approved","Pending","Rejected"],function(l,n){if(l==t);else{if("Approved"===l)return d.a.createElement(j.c,{key:n,style:{display:s},className:"indigo",onClick:function(){return a.changeStatus(e,l)},label:"Approve"});if("Pending"===l)return d.a.createElement(j.c,{key:n,style:{display:s},className:"blue",onClick:function(){return a.changeStatus(e,l)},label:"Mark Pending"});if("Rejected"===l)return d.a.createElement(j.b,{key:n,style:{display:s},className:"m-b-sm text-danger",onClick:function(){return a.changeStatus(e,l)},label:"Reject"})}})}},{key:"_getLastAppliedLeaves",value:function(e){var t=u.map(e,function(e,t){return d.a.createElement("div",{className:"sl-item b-info",key:t},d.a.createElement("div",{className:"sl-content"},d.a.createElement("div",{className:"sl-date text-muted"},"  Applied On  : ",e.applied_on),d.a.createElement("div",{className:"sl-date text-muted"},e.from_date," to ",e.to_date," / No of Days : ",e.no_of_days),d.a.createElement("div",null,e.status," - ",e.reason)))});return d.a.createElement("div",{className:"box-body"},d.a.createElement("div",{className:"streamline b-l m-l"},t))}},{key:"_notify",value:function(){if(!u.isUndefined(this.props.selectedLeave.doc_require)&&"0"!=this.props.selectedLeave.doc_require)return d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:"#c8e4c8",color:"#0d7b2a",borderRadius:"7px"}},d.a.createElement("label",{style:{fontWeight:"500"}},this.state.notifyMsg))}},{key:"render",value:function(){var e=this,t=(u.cloneDeep(this.constructor.styles),this._notify()),a=this._getChangeStatusButtons(this.props.selectedLeave.id,this.props.selectedLeave.status),s=(parseInt(this.props.keyval),this.props.selectedLeave.last_applied_leaves),l="";if("undefined"!==typeof s&&s.length>0){var n=this._getLastAppliedLeaves(this.props.selectedLeave.last_applied_leaves);l=d.a.createElement("div",null,d.a.createElement("hr",null),d.a.createElement("h5",null,"Leave history"),n)}var r="";this.props.loggedUser.data.role===b.a.ADMIN&&""===this.props.selectedLeave.hr_comment&&(r="none");var i="";this.props.loggedUser.data.role===b.a.ADMIN&&(i="none");var c="";this.props.loggedUser.data.role===b.a.HR&&(c="none");var o=this.props.selectedLeave.status;return"Pending"===this.props.selectedLeave.status&&"1"===this.props.selectedLeave.hr_approved&&(o="Approved By HR"),d.a.createElement("div",{className:"item"},d.a.createElement("div",{className:"item-bg"}),d.a.createElement("div",{className:"p-a-md"},d.a.createElement("div",{className:"row m-t"},d.a.createElement("div",{className:"col-xs-12 col-sm-4 leave-profile"},d.a.createElement("a",{href:"",className:"pull-left m-r-md"},d.a.createElement("span",{className:"avatar w-96"},d.a.createElement("img",{src:this.props.selectedLeave.user_profile_image}))),d.a.createElement("div",{className:"clear m-b"},d.a.createElement("h6",{className:"m-a-0 m-b-xs"},this.props.selectedLeave.user_profile_name),d.a.createElement("div",null,this.props.selectedLeave.user_profile_jobtitle)),d.a.createElement("hr",{className:"col-xs-12 hidden-sm hidden-md hidden-lg"})),d.a.createElement("div",{className:"col-xs-12 col-sm-8 leave-details"},d.a.createElement("div",null,"Status - ",d.a.createElement("i",null,d.a.createElement("b",null,o)),("Rejected"===this.props.selectedLeave.status||"Approved"===this.props.selectedLeave.status)&&d.a.createElement("div",{style:{margin:"5px 0"}},d.a.createElement(j.c,{style:{backgroundColor:"#ffff00"},onClick:this.handleRevert,label:"Revert to pending"}))),d.a.createElement("div",null,"Applied On ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.applied_on))),d.a.createElement("div",null,d.a.createElement("b",null,this.props.selectedLeave.from_date," To ",this.props.selectedLeave.to_date)),d.a.createElement("div",null,"No. of Days - ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.no_of_days))),""===this.props.selectedLeave.day_status?"":d.a.createElement("div",null,"Leave apply for - ",d.a.createElement("i",null,d.a.createElement("b",null,"1"===this.props.selectedLeave.day_status?"First Half":"Second Half"))),d.a.createElement("div",null,"Reason - ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.reason))),""!==this.props.selectedLeave.leave_type?d.a.createElement("div",null,"Leave Type - ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.leave_type))):null,""!==this.props.selectedLeave.late_reason?d.a.createElement("div",null,"Reason For Late Applying - ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.late_reason))):null,"0"!==this.props.selectedLeave.extra_day?d.a.createElement("div",null,"Extra Day Added - ",d.a.createElement("i",null,d.a.createElement("b",null,this.props.selectedLeave.extra_day))):null,"0"===this.props.selectedLeave.doc_require&&"2"!==this.props.selectedLeave.hr_approved&&"Approved"!==this.props.selectedLeave.status?d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",display:i}},d.a.createElement(j.c,{className:"indigo",onClick:this.handleNotify,label:"Notify Document Required"})):null,"0"===this.props.selectedLeave.hr_approved&&""!==this.props.selectedLeave.hr_comment?d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",display:i}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleSave("1")},label:"HR Approval"}),d.a.createElement(j.c,{className:"indigo",style:{marginLeft:"3px"},onClick:function(){e.handleSave("2")},label:"HR Rejected"})):null,"0"!==this.props.selectedLeave.hr_approved&&"2"!==this.props.selectedLeave.hr_approved?d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:"#c8e4c8",color:"#0d7b2a",borderRadius:"7px"}},d.a.createElement("label",{style:{fontWeight:"500"}},"Approved By HR")):null,"0"!==this.props.selectedLeave.hr_approved&&"1"!==this.props.selectedLeave.hr_approved?d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:"#c8e4c8",color:"#0d7b2a",borderRadius:"7px"}},d.a.createElement("label",{style:{fontWeight:"500"}},"Rejected By HR")):null,""===this.props.selectedLeave.doc_link&&"1"===this.props.selectedLeave.doc_require?t:null,""!==this.props.selectedLeave.doc_link?d.a.createElement("form",{method:"get",target:"_blank",action:this.props.selectedLeave.doc_link},d.a.createElement("div",{className:" text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",label:"View Document"}))):null,""===this.props.selectedLeave.late_reason&&"Rejected"!==this.props.selectedLeave?null:d.a.createElement("div",{className:"row m-0",style:{display:c}},d.a.createElement("div",{className:"col-sm-3 p-0 pt-5"},d.a.createElement("div",{className:" text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleExtraDay("0.5")},label:"Add Half Day"}))),d.a.createElement("div",{className:"col-sm-3 p-0"},d.a.createElement("div",{className:"text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleExtraDay("1")},label:"Add Full Day"}))),"0"===this.props.selectedLeave.extra_day?null:d.a.createElement("div",{className:"col-sm-4 p-0"},d.a.createElement("div",{className:"text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"red",onClick:function(){e.handleExtraDay("0")},label:"Remove Extra Day"})))),d.a.createElement("br",null),""===this.props.selectedLeave.comment?d.a.createElement("div",{style:{display:c}},d.a.createElement("input",{type:"text",className:"md-input",placeholder:"Enter message for employee",onChange:function(t){return e.setState({messagetouser:t.target.value})},value:this.state.messagetouser}),d.a.createElement("div",{className:"text-right",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:this.handleComment,label:"Comment"}))):d.a.createElement("div",null,d.a.createElement("b",null,"Comment"),d.a.createElement("br",null),d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",border:"1px dotted #514eff",width:"56%",padding:"11px 5px 5px",background:"rgb(191, 195, 245)",color:"rgb(64, 78, 247)",borderRadius:"7px"}},d.a.createElement("label",{style:{fontWeight:"500"}},this.props.selectedLeave.comment))),""===this.props.selectedLeave.hr_comment&&this.props.loggedUser.data.role===b.a.HR?d.a.createElement("div",null,d.a.createElement("b",null,"Write Entire Leave Details After Talking To Employee"),d.a.createElement("br",null),d.a.createElement("input",{type:"text",className:"md-input",onChange:function(t){return e.setState({messageByHr:t.target.value})},value:this.state.messageByHr}),d.a.createElement("div",{className:"text-right",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleSave("")},label:"Save"}))):null,d.a.createElement("div",null,d.a.createElement("div",null,this.props.loggedUser.data.role===b.a.HR&&""===this.props.selectedLeave.hr_comment?null:d.a.createElement("div",{style:{display:r}},d.a.createElement("b",null,"Description By HR"),d.a.createElement("br",null),d.a.createElement("div",{className:"text-left",style:{marginTop:"10px",border:"1px dotted #514eff",width:"56%",padding:"11px 5px 5px",background:"rgb(191, 195, 245)",color:"rgb(64, 78, 247)",borderRadius:"7px"}},d.a.createElement("label",{style:{fontWeight:"500"}},this.props.selectedLeave.hr_comment))),this.state.edit&&this.props.loggedUser.data.role===b.a.HR?d.a.createElement("div",null,d.a.createElement("input",{type:"text",className:"md-input",onChange:function(t){return e.setState({editedComment:t.target.value})},value:this.state.editedComment}),d.a.createElement("div",{className:"text-right",style:{marginTop:"10px"}})):null,""!==this.props.selectedLeave.hr_comment?d.a.createElement("div",{className:"row m-0",style:{display:i}},d.a.createElement("div",{className:"col-sm-3 p-0"},this.state.edit?d.a.createElement("div",{className:"text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleUpdate("")},label:"Save"})):d.a.createElement("div",{className:" text-left",style:{marginTop:"10px"}},d.a.createElement(j.c,{className:"indigo",onClick:function(){e.handleEdit()},label:"Edit"})))):null)),d.a.createElement("br",null),d.a.createElement("br",null),a,l))))}}]),t}(d.a.Component);O.styles={leaveDiv:{marginBottom:"10px"}};var k=O,R=function(e){var t=e.filterLeaveList,a=e.selectedTab;return e.userRole===b.a.ADMIN?d.a.createElement("div",{className:"row no-gutter m-b text-xs l-h-1x",id:"manage_leave_header"},d.a.createElement("div",{className:"col-xs-6 col-sm-4 text-center leaves-tab",onClick:function(){return t("PendingAdmin")}},d.a.createElement("div",{className:"top-bar "+("PendingAdmin"===a?"active-tab":"")}),d.a.createElement("div",{className:"p-a yellow-A200"},d.a.createElement("h4",null),d.a.createElement("div",{className:" text-u-c _600 text-sm"},"Pending"))),d.a.createElement("div",{className:"col-xs-6 col-sm-4 text-center leaves-tab",onClick:function(){return t("Approved")}},d.a.createElement("div",{className:"top-bar "+("Approved"===a?"active-tab":"")}),d.a.createElement("div",{className:"p-a green-A200"},d.a.createElement("h4",null),d.a.createElement("div",{className:" text-u-c _600 text-sm"},"Approved"))),d.a.createElement("div",{className:"col-xs-6 col-sm-4 text-center leaves-tab",onClick:function(){return t("Rejected")}},d.a.createElement("div",{className:"top-bar "+("Rejected"===a?"active-tab":"")}),d.a.createElement("div",{className:"p-a red-500"},d.a.createElement("h4",null),d.a.createElement("div",{className:"text-u-c _600 text-sm"},"Rejected")))):d.a.createElement("div",{className:"row no-gutter m-b text-xs l-h-1x",id:"leave_manage"},d.a.createElement("div",{className:"col-xs-4 text-center",onClick:function(){return t("Pending")}},d.a.createElement("div",{className:"top-bar "+("Pending"===a?"active-tab":"")}),d.a.createElement("div",{className:"p-a blue"},d.a.createElement("h4",null),d.a.createElement("div",{className:"text-u-c _600 text-sm"},"Pending Leave Requests"))),d.a.createElement("div",{className:"col-xs-3 text-center",onClick:function(){return t("ApprovedByHr")}},d.a.createElement("div",{className:"top-bar "+("ApprovedByHr"===a?"active-tab":"")}),d.a.createElement("div",{className:"p-a green-A200"},d.a.createElement("h4",null),d.a.createElement("div",{className:" text-u-c _600 text-sm"},"Approved By HR"))))};R.PropTypes={filterLeaveList:y.a.func.isRequired,selectedTab:y.a.string.isRequired,userRole:y.a.string.isRequired};var C=R,w=a(5),A=a(659),S=a(687),T=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).props.onIsAlreadyLogin(),a.state={loading:!0,selectedTab:"",leaveListItems:[],all_leaves:[],selectedLeave:{}},a.doLeaveStatusChange=a.doLeaveStatusChange.bind(Object(c.a)(Object(c.a)(a))),a.filterLeaveList=a.filterLeaveList.bind(Object(c.a)(Object(c.a)(a))),a.selectLeave=a.selectLeave.bind(Object(c.a)(Object(c.a)(a))),a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){this.props.onListLeaves(this.props.loggedUser.data.role)}},{key:"componentWillReceiveProps",value:function(e){var t=this,a="",s=e.location,l=e.loggedUser,n=Object(g.e)(s.pathname,l);if(n.status&&this.props.history.push(n.redirectTo),e.loggedUser.data.role===b.a.ADMIN||e.loggedUser.data.role===b.a.GUEST?a="PendingAdmin":e.loggedUser.data.role===b.a.HR&&(a="Pending"),!u.isEqual(e.listLeaves.all_leaves,this.state.all_leaves)){var r=localStorage.getItem("activeTab");u.isEmpty(r)||(a=r),this.setState({all_leaves:e.listLeaves.all_leaves,selectedTab:a},function(){t.filterLeaveList(a)})}}},{key:"doLeaveStatusChange",value:function(e,t,a){this.props.onChangeLeaveStatus(e,t,a)}},{key:"selectLeave",value:function(e){if(e!==this.state.selectedLeave.id){var t=u.find(this.state.leaveListItems,{id:e});this.setState({selectedLeave:t})}}},{key:"filterLeaveList",value:function(e){var t,a=this.state.all_leaves,s=(t="Pending"===e?u.filter(a,function(e){return"Pending"===e.status&&0===parseInt(e.hr_approved)}):"ApprovedByHr"===e?u.filter(a,function(e){return"Pending"===e.status&&1===parseInt(e.hr_approved)}):"PendingAdmin"===e?u.filter(a,function(e){return"Pending"===e.status&&(2===parseInt(e.hr_approved)||0===parseInt(e.hr_approved))}):u.filter(a,{status:e}))[0]||{};if(!u.isEmpty(this.state.selectedLeave)){var l=u.filter(t,{id:this.state.selectedLeave.id});u.size(l)>0&&(s=l[0])}this.setState({loading:!1,leaveListItems:t,selectedLeave:s,selectedTab:e}),localStorage.setItem("activeTab",e)}},{key:"render",value:function(){var e,t=u.cloneDeep(this.constructor.styles),a="";return""!==this.props.manageLeave.status_message&&(a=d.a.createElement("span",{className:"label label-lg primary pos-rlt m-r-xs"},d.a.createElement("b",{className:"arrow left b-primary"}),this.props.manageLeave.status_message)),this.state.loading||!u.isEmpty(this.state.selectedLeave)&&!u.isEmpty(this.state.leaveListItems)?this.state.loading||u.isEmpty(this.state.selectedLeave)||u.isEmpty(this.state.leaveListItems)?this.state.loading&&(e=d.a.createElement("div",{className:"row-col row-col-xs b-b",style:t.spinContainer},d.a.createElement("i",{className:"fa fa-spinner fa-pulse fa-3x",style:t.spiner,"aria-hidden":"true"}))):e=d.a.createElement("div",{className:"row no-gutter b-b",id:"manage_leave_data"},d.a.createElement("div",{className:"col-xs-12 col-sm-3 box b-r"},d.a.createElement(_,Object.assign({listItems:this.state.leaveListItems,selectedLeave:this.state.selectedLeave,selectLeave:this.selectLeave},this.props))),d.a.createElement("div",{id:"leaveDetails",className:"col-xs-12 col-sm-9 light bg b-r"},d.a.createElement(k,Object.assign({selectedLeave:this.state.selectedLeave,doLeaveStatusChange:this.doLeaveStatusChange},this.props)))):e=d.a.createElement("div",{className:"row-col row-col-xs b-b",id:"no_manage_leave",style:t.spinContainer},d.a.createElement("span",{className:"",style:t.spiner},"No data found")),d.a.createElement("div",null,d.a.createElement(h.a,this.props),d.a.createElement("div",{id:"content",className:"app-content box-shadow-z0",role:"main"},d.a.createElement(f.a,{pageTitle:"Manage Leaves"+a,showLoading:this.props.frontend.show_loading}),d.a.createElement("div",{className:"app-body",id:"view"},d.a.createElement("div",{className:"padding"},d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-12"},d.a.createElement(C,{filterLeaveList:this.filterLeaveList,selectedTab:this.state.selectedTab,userRole:this.props.loggedUser.data.role}))),e))))}}]),t}(d.a.Component);T.styles={spinContainer:{textAlign:"center",fontSize:"50px",color:"#808080"},spiner:{margin:"50px auto"}};var D=Object(m.b)(function(e){return{frontend:e.frontend.toJS(),loggedUser:e.logged_user.userLogin,listLeaves:e.listLeaves.toJS(),manageLeave:e.manageLeave.toJS()}},function(e){return{onIsAlreadyLogin:function(){return e(w.isAlreadyLogin())},onListLeaves:function(t){return e(A.a(t))},onAddDescription:function(t,a,s){return e(S.d(t,a,s))},onAddExtraDay:function(t,a,s){return e(S.e(t,a,s))},onChangeLeaveStatus:function(t,a,s){return e(S.a(t,a,s))},onDocRequired:function(t,a,s){return e(S.b(t,a,s))},leaveRevertRequest:function(t,a){return e(S.c(t,a))}}})(T),P=Object(p.a)(D);t.default=P},659:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var s=a(1115),l=(a(9),a(127),a(23),a(11)),n=a(2),r=a(31);function i(e){return Object(s.a)(n.pb)("Error Occurs !!")}function c(e){return function(e,t){return new Promise(function(t,a){e(Object(r.b)()),Object(l.b)("POST","",{action:"get_all_leaves"}).then(function(a){var l;e(Object(r.a)()),0==a.error?(e((l=a.data,Object(s.a)(n.qb)(l))),t()):e(i(a.data.message))},function(t){e(Object(r.a)()),e(i(t.data.message))})})}}},687:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return o}),a.d(t,"e",function(){return d}),a.d(t,"d",function(){return m}),a.d(t,"c",function(){return p});var s=a(1115),l=(a(9),a(127),a(23),a(11)),n=a(2),r=a(31),i=a(659);function c(e,t,a){return function(c,o){return new Promise(function(o,d){c(Object(r.b)()),function(e,t,a){return Object(l.b)("POST","",{action:"change_leave_status",leaveid:e,newstatus:t,messagetouser:a})}(e,t,a).then(function(e){var t;c(Object(r.a)()),0==e.error?(c((t=e.data.message,Object(s.a)(n.mb)(t))),c(i.a())):c(function(e){return Object(s.a)(n.lb)(e)}(e.data.message))},function(e){var t;c(Object(r.a)()),c((t="error occurs",Object(s.a)(n.kb)(t)))})})}}function o(e,t,a){return function(s,n){return new Promise(function(n,c){s(Object(r.b)()),function(e,t,a){return Object(l.b)("POST","",{action:"send_request_for_doc",leaveid:e,doc_request:t,comment:a})}(e,t,a).then(function(e){s(Object(r.a)()),0==e.error&&s(i.a())},function(e){s(i.a()),s(Object(r.a)())})})}}function d(e,t,a){return function(s,n){return new Promise(function(n,c){s(Object(r.b)()),function(e,t,a){return Object(l.b)("POST","",{action:"add_extra_leave_day",leaveid:e,token:t,extra_day:a})}(e,t,a).then(function(e){s(Object(r.a)()),0==e.error&&s(i.a())},function(e){s(i.a()),s(Object(r.a)())})})}}function m(e,t,a){return function(s,n){return new Promise(function(n,c){s(Object(r.b)()),function(e,t,a){return Object(l.b)("POST","",{action:"add_hr_comment",leaveid:e,hr_comment:t,hr_approve:a})}(e,t,a).then(function(e){n(e.data.leaveid),s(Object(r.a)()),0==e.error&&s(i.a())},function(e){s(i.a()),s(Object(r.a)())})})}}function p(e,t){return function(a,s){return new Promise(function(s,n){a(Object(r.b)()),function(e,t){return Object(l.b)("POST","",{action:"revert_leave_status",leaveid:e,token:t})}(e,t).then(function(e){s(e),a(Object(r.a)()),0==e.error&&a(i.a())},function(e){a(i.a()),a(Object(r.a)())})})}}}}]);
//# sourceMappingURL=11.519774b6.chunk.js.map