(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1105:function(e,n,t){"use strict";t.r(n);var r=t(25),a=t(26),i=t(29),o=t(27),c=t(28),s=t(12),d=t(0),u=t.n(d),m=t(36),f=t(1073),l=t(123),p=t(23),_=t(37),y=t(592),b=t(254),j=t(9),g=t.n(j),O=function(e){function n(e){var t;return Object(r.a)(this,n),(t=Object(i.a)(this,Object(o.a)(n).call(this,e))).state={user_id:"",open:!1,doc_type:""},t}return Object(c.a)(n,e),Object(a.a)(n,[{key:"render",value:function(){var e=g.a.cloneDeep(this.constructor.styles);return u.a.createElement("div",null,u.a.createElement("div",null,u.a.createElement("form",{action:p.a.upload_attendance_url,method:"POST",encType:"multipart/form-data"},u.a.createElement("div",{className:"form-group"},u.a.createElement("input",{type:"hidden",name:"token",value:Object(_.c)()}),u.a.createElement("div",{style:e.file},u.a.createElement("input",{type:"file",name:"image",required:!0})),u.a.createElement("input",{type:"submit",name:"submit",value:"Upload",className:"col-xs-12 md-btn md-raised indigo"})))))}}]),n}(u.a.Component);O.styles={file:{padding:"20px",border:"1px solid rgba(128, 128, 128, 0.32)",marginBottom:"12px",borderRadius:"5px"}};var P=t(5),h=t(169),v=t(565),w=t(606),T=function(e){function n(e){var t;return Object(r.a)(this,n),(t=Object(i.a)(this,Object(o.a)(n).call(this,e))).props.onIsAlreadyLogin(),t.state={},t.handleSubmit=t.handleSubmit.bind(Object(s.a)(Object(s.a)(t))),t}return Object(c.a)(n,e),Object(a.a)(n,[{key:"componentWillMount",value:function(){this.props.onUsersList()}},{key:"componentWillReceiveProps",value:function(e){window.scrollTo(0,0);var n=Object(_.e)(this.props.location.pathname,e.loggedUser);n.status&&this.props.history.push(n.redirectTo)}},{key:"handleSubmit",value:function(){window.open(p.a.upload_attendance_url)}},{key:"handleOpenIframe",value:function(){this.setState({openIframe:!0})}},{key:"handleCloseIframe",value:function(){this.setState({openIframe:!1})}},{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(y.a,{message:this.props.manageUsers.status_message}),u.a.createElement(l.a,this.props),u.a.createElement("div",{id:"content",className:"app-content box-shadow-z0",role:"main"},u.a.createElement(b.a,{pageTitle:"UPLOAD ATTENDANCE SHEET",showLoading:this.props.frontend.show_loading}),u.a.createElement("div",{className:"app-body",id:"view"},u.a.createElement("div",{className:"padding"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-10 p"},u.a.createElement("input",{type:"button",onClick:this.handleSubmit,name:"submit",value:"CLICK TO UPLOAD ATTENDANCE",className:"col-xs-4 md-btn md-raised indigo"})))))))}}]),n}(u.a.Component);var k=Object(m.b)(function(e){return{frontend:e.frontend.toJS(),managePayslips:e.managePayslips.toJS(),loggedUser:e.logged_user.userLogin,usersList:e.usersList.toJS(),manageUsers:e.manageUsers.toJS()}},function(e){return{onIsAlreadyLogin:function(){return e(P.isAlreadyLogin())},onUsersList:function(){return e(h.c())},onUserProfileDetails:function(n,t){return e(v.i(n,t))},onUpdateUserBankDetails:function(e){},onUpdateUserProfileDetails:function(n){return e(v.j(n))},onAddNewEmployee:function(n){return e(v.a(n))},onUpdatedocuments:function(e){},onChangeEmployeeStatus:function(n,t){return e(v.c(n,t))},onGetUserDocument:function(n){return e(v.h(n))},onDeleteDocument:function(n){return e(v.e(n))},onUserManagePayslipsData:function(n){return e(w.e(n))}}})(T),E=Object(f.a)(k);n.default=E},565:function(e,n,t){"use strict";t.d(n,"i",function(){return m}),t.d(n,"j",function(){return l}),t.d(n,"a",function(){return _}),t.d(n,"h",function(){return b}),t.d(n,"e",function(){return j}),t.d(n,"c",function(){return g}),t.d(n,"g",function(){return h}),t.d(n,"d",function(){return v}),t.d(n,"b",function(){return T}),t.d(n,"f",function(){return E});var r=t(1112),a=t(9),i=t(573),o=t.n(i),c=t(11),s=t(31),d=t(2),u=t(67);function m(e,n){return function(t,a){return new Promise(function(a,i){t(Object(s.b)()),function(e){return Object(c.b)("POST","",{action:"get_user_profile_detail_by_id",user_id:e})}(e).then(function(e){var a;t(Object(s.a)()),0==e.error?t(function(e,n){return{type:d.Ac,payload:e,username:n}}(e.data,n)):t((a=e.data.message,Object(r.a)(d.l)(a)))},function(e){var n;t(Object(s.a)()),t((n="error occurs!!!",Object(r.a)(d.eb)(n)))})})}}function f(e){return Object(r.a)(d.Z)(e)}function l(e){return function(n,t){var a="",i="",o="",l="",p="",_="",y="",b="",j="",g="",O="",P="",h="",v="",w="",T="",k=e.send_slack_msg,E=e.slack_msg,S="",U="",A="",D="";if("undefined"!==typeof e.user_id&&(a=e.user_id),"undefined"!==typeof e.name&&(i=e.name),"undefined"!==typeof e.jobtitle&&(o=e.jobtitle),"undefined"!==typeof e.team&&(l=e.team),"undefined"!==typeof e.dateofjoining&&null!=e.dateofjoining&&(p=e.dateofjoining),"undefined"!==typeof e.training_month&&null!=e.training_month&&(D=e.training_month),"undefined"!==typeof e.work_email&&(_=e.work_email),"undefined"!==typeof e.other_email&&(y=e.other_email),"undefined"!==typeof e.gender&&(b=e.gender),"undefined"!==typeof e.dob&&null!=e.dob){var N=new Date(e.dob);N&&(j=u(N).format("YYYY-MM-DD"))}return"undefined"!==typeof e.marital_status&&(g=e.marital_status),"undefined"!==typeof e.address1&&(O=e.address1),"undefined"!==typeof e.address2&&(P=e.address2),"undefined"!==typeof e.emergency_ph1&&(h=e.emergency_ph1),"undefined"!==typeof e.emergency_ph2&&(v=e.emergency_ph2),"undefined"!==typeof e.blood_group&&(w=e.blood_group),"undefined"!==typeof e.medical_condition&&(T=e.medical_condition),"undefined"!==typeof e.training_completion_date&&null!=e.training_completion_date&&(S=e.training_completion_date),"undefined"!==typeof e.termination_date&&null!=e.termination_date&&(U=e.termination_date),"undefined"!==typeof e.holding_comments&&(A=e.holding_comments),""===a.trim()?Promise.reject("User id is empty"):""===i.trim()?Promise.reject("Name is empty"):""===o.trim()?Promise.reject("Jobtitle is empty"):""===p.trim()?Promise.reject("Joining date is empty"):""===_.trim()?Promise.reject("Work email is empty"):""===y.trim()?Promise.reject("Personal email is empty"):""===b.trim()?Promise.reject("Gender is empty"):""===j.trim()?Promise.reject("Date of birth is empty"):""===g.trim()?Promise.reject("Marital status not selected"):""===O.trim()?Promise.reject("Current address is empty"):""===P.trim()?Promise.reject("Permanent address is empty"):""===h.trim()?Promise.reject("Emmergency contact 1 is empty"):""===v.trim()?Promise.reject("Emmergency contact 2 is empty"):""===w.trim()?Promise.reject("Blood group not selected"):""===T.trim()?Promise.reject("Any medical conditions is empty"):""===D.trim()?Promise.reject("Training month is Empty"):new Promise(function(e,t){n(Object(s.b)()),function(e,n,t,r,a,i,o,s,d,u,m,f,l,p,_,y,b,j,g,O,P,h){return Object(c.b)("POST","",{action:"update_user_profile_detail_by_id",user_id:e,marital_status:u,name:n,jobtitle:t,team:r,dateofjoining:a,work_email:i,other_email:o,gender:s,dob:d,permanent_address:f,current_address:m,emergency_ph1:l,emergency_ph2:p,blood_group:_,medical_condition:y,training_completion_date:b,termination_date:j,training_month:O,holding_comments:g,send_slack_msg:P,slack_msg:h})}(a,i,o,l,p,_,y,b,j,g,O,P,h,v,w,T,S,U,A,D,k,E).then(function(e){var i;n(Object(s.a)()),0==e.error?(n(m(a)),n((i=e.data.message,Object(r.a)(d.vc)(i)))):(n(f(e.data.message)),t(e.data))},function(e){n(Object(s.a)()),n(f("error occurs!!!"))})})}}function p(e){return Object(r.a)(d.p)(e)}function _(e){return function(n,t){var a="",i="",o="",u="",m="",f="",l="",_="";return"undefined"===typeof e.dateofjoining||""==e.dateofjoining?Promise.reject("Date of Joining is empty"):(a=e.dateofjoining,"undefined"===typeof e.name||""==e.name?Promise.reject("Name is empty"):(i=e.name,"undefined"===typeof e.jobtitle||""==e.jobtitle?Promise.reject("Job Title is empty"):(o=e.jobtitle,"undefined"===typeof e.gender||""==e.gender?Promise.reject("Gender is empty"):(u=e.gender,"undefined"===typeof e.dob||""==e.dob?Promise.reject("Date of birth is empty"):(m=e.dob,"undefined"===typeof e.gender||""==e.gender?Promise.reject("Gender is empty"):(u=e.gender,"undefined"===typeof e.username||""==e.username?Promise.reject("Username is empty"):(f=e.username,"undefined"===typeof e.training_month||""==e.training_month?Promise.reject("training month is empty"):(l=e.training_month,"undefined"===typeof e.workemail||""==e.workemail?Promise.reject("Work email is empty"):(_=e.workemail,new Promise(function(e,t){n(Object(s.b)()),function(e,n,t,r,a,i,o,s){return Object(c.b)("POST","",{action:"add_new_employee",dateofjoining:e,name:n,jobtitle:t,gender:r,dob:a,username:i,training_month:o,workemail:s})}(a,i,o,u,m,f,l,_).then(function(a){var i;n(Object(s.a)()),0==a.error?(n((i=a.data,Object(r.a)(d.Db)(i))),e(a.data)):(n(p(a.data.message)),t(a.data.message))},function(e){n(Object(s.a)()),n(p("error occurs!!!")),t("error occurs!!!")})}))))))))))}}function y(e){return Object(r.a)(d.bb)(e)}function b(e){return function(n,t){return new Promise(function(t,a){n(Object(s.b)()),function(e){return Object(c.b)("POST","",{action:"get_user_document_by_id",user_id:e})}(e).then(function(e){var t;n(Object(s.a)()),0==e.error?n((t=e.data,Object(r.a)(d.xc)(t))):n(y(e.data.message))},function(e){n(Object(s.a)()),n(y("error occurs!!!"))})})}}function j(e){return function(n,t){return new Promise(function(t,r){n(Object(s.b)()),function(e){return Object(c.b)("POST","",{action:"delete_user_document",id:e})}(e).then(function(e){n(Object(s.a)()),0==e.error?t(e.data.message):r(e.data.message)},function(e){n(Object(s.a)()),r("error occurs!!")})})}}function g(e,n){return function(t,r){return new Promise(function(t,r){(function(e,n){return Object(c.b)("POST","",{action:"change_employee_status",user_id:e,status:n})})(e,n).then(function(e){0===e.error?t("User disabled"):r(e.data.message)},function(e){r("error occurs!!")})})}}function O(e){return Object(r.a)(d.ec)(e)}function P(e){return Object(r.a)(d.K)(e)}o()(function(e,n,t){return Object(c.b)("POST","",{action:"get_employee_life_cycle",userid:e}).then(function(e){0==e.error?n(O(e.data)):n(P())})},1);function h(e){return function(n,t){return new Promise(function(t,r){(function(e){return Object(c.b)("POST","",{action:"get_employee_life_cycle",userid:e})})(e).then(function(e){0==e.error?(t(e.message),n(O(e.data))):(r(e.data.message),n(P(e.data.message)))},function(e){r("error occurs!!")})})}}function v(e,n){return function(t,a){return new Promise(function(a,i){(function(e,n){return Object(c.b)("POST","",{action:"update_employee_life_cycle",userid:e,stepid:n})})(e,n).then(function(e){var n;0==e.error?a(e.data.message):(i(e.data.message),t((n=e.data.message,Object(r.a)(d.J)(n))))},function(e){i("error occurs!!")})})}}function w(e){return Object(r.a)(d.r)(e)}function T(e){return function(n,t){var a="",i="",o="",u="",m="",f="",l="",p="";return"undefined"!==typeof e.user_id&&(a=e.user_id),"undefined"!==typeof e.signature&&(p=e.signature),"undefined"!==typeof e.permanent_address&&(i=e.permanent_address),"undefined"!==typeof e.emergency_ph1&&(o=e.emergency_ph1),"undefined"!==typeof e.emergency_ph2&&(u=e.emergency_ph2),"undefined"!==typeof e.blood_group&&(m=e.blood_group),"undefined"!==typeof e.medical_condition&&(f=e.medical_condition),"undefined"!==typeof e.holding_comments&&(l=e.holding_comments),""===a.trim()?Promise.reject("User id is empty"):""===p.trim()?Promise.reject("signature is empty"):""===i.trim()?Promise.reject("Permanent address is empty"):""===o.trim()?Promise.reject("Emmergency contact 1 is empty"):""===u.trim()?Promise.reject("Emmergency contact 2 is empty"):""===m.trim()?Promise.reject("Blood group not selected"):""===f.trim()?Promise.reject("Any medical conditions is empty"):new Promise(function(e,t){n(Object(s.b)()),function(e,n,t,r,a,i,o,s){return Object(c.b)("POST","",{action:"update_user_profile_detail_by_id",user_id:e,permanent_address:n,emergency_ph1:t,emergency_ph2:r,blood_group:a,medical_condition:i,holding_comments:o,signature:s})}(a,i,o,u,m,f,l,p).then(function(t){var a;n(Object(s.a)()),0==t.error?(e(t.data),n((a=t.data,Object(r.a)(d.Fb)(a)))):n(w(t.data))},function(e){n(Object(s.a)()),n(w("error occurs!!!"))})})}}function k(e){return Object(r.a)(d.Be)(e)}function E(){return function(e,n){return new Promise(function(n,t){e(Object(s.b)()),Object(c.b)("POST","",{action:"get_enabled_users_brief_details"}).then(function(t){var i;0==t.error?(n(t.data),e(k(t.data)),t.data.length&&e(function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(r,i){return new Promise(function(i,o){var d=n[t].user_Id;r(Object(s.b)()),function(e){return Object(c.b)("POST","",{action:"get_user_salary_info_by_id",user_id:e})}(d).then(function(i){if("undefined"!==typeof i.data&&"undefined"!==typeof i.data.salary_details&&i.data.salary_details.length>0){i.data;var o=a.orderBy(i.data.salary_details,["date"],["desc"]);n[t].current_salary=o[0].test&&o[0].test.total_salary,r(k(n))}r(Object(s.a)()),n.length>++t&&r(e(n,t))},function(a){r(Object(s.a)()),n.length>++t&&r(e(n,t))})})}}(t.data))):e((i=t.data,Object(r.a)(d.Qc)(i))),e(Object(s.a)())},function(n){console.log("error",n),e(Object(s.a)())})})}}},592:function(e,n,t){"use strict";var r=t(0),a=t.n(r),i=t(1),o=t.n(i),c=t(9),s=t.n(c),d=t(590),u=t.n(d),m=function(e){var n=e.message,t=(e.handleRequestClose,!1),r="";return s.a.isEmpty(n)||(t=!0,r=n),a.a.createElement(u.a,{open:t,message:r,autoHideDuration:4e3})};m.PropTypes={message:o.a.string.isRequired},n.a=m},606:function(e,n,t){"use strict";t.d(n,"e",function(){return d}),t.d(n,"f",function(){return u}),t.d(n,"a",function(){return m}),t.d(n,"b",function(){return l}),t.d(n,"c",function(){return _}),t.d(n,"g",function(){return b}),t.d(n,"d",function(){return g});var r=t(1112),a=(t(9),t(23),t(11)),i=t(31),o=t(2);function c(e){return Object(r.a)(o.yc)(e)}function s(e){return Object(r.a)(o.cb)(e)}function d(e){return function(n,t){return new Promise(function(t,r){n(Object(i.b)()),function(e){return Object(a.b)("POST","",{action:"get_user_manage_payslips_data",user_id:e})}(e).then(function(e){if(n(Object(i.a)()),"undefined"!==typeof e.data){var t=e.data;n(c(t))}else n(c([]))},function(e){n(Object(i.a)()),n(s([]))})})}}function u(e,n,t){return function(r,o){return new Promise(function(o,d){r(Object(i.b)()),function(e,n,t){return Object(a.b)("POST","",{action:"get_user_manage_payslips_data",user_id:e,year:n,month:t})}(e,n,t).then(function(e){if(r(Object(i.a)()),"undefined"!==typeof e.data){var n=e.data;r(c(n))}else r(c([]))},function(e){r(Object(i.a)()),r(s([]))})})}}function m(e,n,t){return function(r,o){return new Promise(function(o,s){r(Object(i.b)()),function(e,n,t){return Object(a.b)("POST","",{action:"get_user_manage_payslips_data",user_id:e,extra_arrear:n,arrear_for_month:t})}(e,n,t).then(function(e){if(r(Object(i.a)()),"undefined"!==typeof e.data){var n=e.data;r(c(n))}else r(c([]))},function(e){r(Object(i.a)())})})}}function f(e){return Object(r.a)(o.B)(e)}function l(e){return function(n,t){var c="",s="",d="",u="",m="",l="",p="",_="",y="",b="",j="",g="",O="",P="",h="",v="",w="",T="",k="",E="",S="",U="",A="",D="",N="",C="",L="",I="",J="",R="",x="",B="",M="";return"undefined"===typeof e.user_id||""==e.user_id?Promise.reject("User Id is empty"):(c=e.user_id,"undefined"===typeof e.name||""==e.name?Promise.reject("Name is empty"):(u=e.name,"undefined"===typeof e.year||""==e.year?Promise.reject("Year is empty"):(s=e.year,"undefined"===typeof e.month||""==e.month?Promise.reject("Month is empty"):(d=e.month,"undefined"===typeof e.designation||""==e.designation?Promise.reject("Designation is empty"):(m=e.designation,"undefined"===typeof e.joining_date||""==e.joining_date?Promise.reject("Joining date is empty"):(l=e.joining_date,"undefined"===typeof e.total_working_days||""===e.total_working_days?Promise.reject("Total working days is empty"):(p=e.total_working_days,"undefined"===typeof e.days_present||""===e.days_present?Promise.reject("Days present is empty"):(_=e.days_present,"undefined"===typeof e.paid_leaves||""===e.paid_leaves?Promise.reject("Paid leaves is empty"):(y=e.paid_leaves,"undefined"===typeof e.unpaid_leaves||""===e.unpaid_leaves?Promise.reject("Unpaid leaves is empty"):(b=e.unpaid_leaves,"undefined"===typeof e.total_leave_taken||""===e.total_leave_taken?Promise.reject("Total leave taken is empty"):(j=e.total_leave_taken,"undefined"===typeof e.allocated_leaves||""===e.allocated_leaves?Promise.reject("Allocated leaves is empty"):(g=e.allocated_leaves,"undefined"===typeof e.leave_balance||""===e.leave_balance?Promise.reject("Leave balance is empty"):(O=e.leave_balance,"undefined"===typeof e.final_leave_balance||""===e.final_leave_balance?Promise.reject("Final leave balance is empty"):(P=e.final_leave_balance,"undefined"===typeof e.basic||""===e.basic?Promise.reject("Basic is empty"):(h=e.basic,"undefined"===typeof e.epf||""===e.epf?Promise.reject("EPF is empty"):(v=e.epf,"undefined"===typeof e.hra||""===e.hra?Promise.reject("HRA is empty"):(w=e.hra,"undefined"===typeof e.loan||""===e.loan?Promise.reject("Loan is empty"):(T=e.loan,"undefined"===typeof e.conveyance||""===e.conveyance?Promise.reject("Conveyance is empty"):(k=e.conveyance,"undefined"===typeof e.advance||""===e.advance?Promise.reject("Advance is empty"):(E=e.advance,"undefined"===typeof e.medical_allowance||""===e.medical_allowance?Promise.reject("Medical allowance is empty"):(S=e.medical_allowance,"undefined"===typeof e.misc_deduction||""===e.misc_deduction?Promise.reject("Holding is empty"):(U=e.misc_deduction,"undefined"===typeof e.misc_deduction_2||""===e.misc_deduction_2?Promise.reject("Misc deduction  is empty"):(A=e.misc_deduction_2,"undefined"===typeof e.special_allowance||""===e.special_allowance?Promise.reject("Special allowance is empty"):(D=e.special_allowance,"undefined"===typeof e.tds||""===e.tds?Promise.reject("TDS is empty"):(N=e.tds,"undefined"===typeof e.arrear||""===e.arrear?Promise.reject("Advance is empty"):(C=e.arrear,"undefined"===typeof e.bonus||""===e.bonus?Promise.reject("Bonus is empty"):(L=e.bonus,"undefined"===typeof e.total_earning||""===e.total_earning?Promise.reject("Total earning is empty"):(I=e.total_earning,"undefined"===typeof e.total_deduction||""===e.total_deduction?Promise.reject("Total deduction is empty"):(J=e.total_deduction,"undefined"===typeof e.net_salary||""===e.net_salary?Promise.reject("Net salary is empty"):(R=e.net_salary,"undefined"!==typeof e.send_email_only&&(x=e.send_email_only),"undefined"!==typeof e.send_slack_message&&(B=e.send_slack_message),"undefined"!==typeof e.key&&(M=e.key),new Promise(function(e,t){n(Object(i.b)()),function(e,n,t,r,i,o,c,s,d,u,m,f,l,p,_,y,b,j,g,O,P,h,v,w,T,k,E,S,U,A,D,N,C){var L={action:"create_employee_salary_slip",user_id:e,year:n,month:t,name:r,designation:i,joining_date:o,total_working_days:c,days_present:s,paid_leaves:d,unpaid_leaves:u,total_leave_taken:m,allocated_leaves:f,leave_balance:l,final_leave_balance:p,basic:_,epf:y,hra:b,loan:j,conveyance:g,advance:O,medical_allowance:P,misc_deduction:h,misc_deduction_2:v,tds:T,arrear:k,bonus:E,total_earning:S,total_deduction:U,net_salary:A,send_email:D,send_slack_msg:N};return 1==C?L.special_allowance=w:2==C&&(L.loyalty_bonus=w),Object(a.b)("POST","",L)}(c,s,d,u,m,l,p,_,y,b,j,g,O,P,h,v,w,T,k,E,S,U,A,D,N,C,L,I,J,R,x,B,M).then(function(a){var c;n(Object(i.a)()),0==a.error?(n((c=a.data,Object(r.a)(o.Pb)(c))),e("Payslip generated!!")):(n(f(a.data.message)),t(a.data.message))},function(e){console.log("Tell Arun error occurs on Action - create_user_payslip"),n(Object(i.a)()),n(f("error occurs!!")),t("error occurs!!")})})))))))))))))))))))))))))))))))}}function p(e){return Object(r.a)(o.I)(e)}function _(e){return function(n,t){return new Promise(function(t,r){n(Object(i.b)()),function(e){return Object(a.b)("POST","",{action:"send_payslips_to_employees",payslip_ids:e})}(e).then(function(e){n(Object(i.a)()),"undefined"!==typeof e.error&&0==e.error?(n(c(e.data.message)),t(e.data.message)):(n(p("error occurs!!")),r("error occurs!!"))},function(e){n(Object(i.a)()),n(p("error occurs!!")),r("error occurs!!")})})}}function y(e){return Object(r.a)(o.Q)(e)}function b(e){return function(n,t){return new Promise(function(t,c){n(Object(i.b)()),function(e){return Object(a.b)("POST","",{action:"save_google_payslip_drive_access_token",google_access_token:e})}(e).then(function(e){if(n(Object(i.a)()),"undefined"!==typeof e.error&&0==e.error){var a=e.data.message;n((s=a,Object(r.a)(o.mc)(s))),t(a)}else n(y("error occurs!!")),c("error occurs!!");var s},function(e){n(Object(i.a)()),n(y("error occurs!!")),c("error occurs!!")})})}}function j(e){return Object(r.a)("ACTION_ERROR_GET_TRANSFER")(e)}function g(e){return function(n,t){return 0==e.length?Promise.reject("No user selected"):new Promise(function(t,o){n(Object(i.b)()),function(e){return Object(a.b)("POST","",{action:"get_users_bankaccount_no",user_id:e})}(e).then(function(e){var a;n(Object(i.a)()),0==e.error?(n((a=e.data,Object(r.a)("ACTION_SUCCESS_GET_TRANSFER")(a))),t(e.data)):(n(j(e.data.message)),o(e.data.message))},function(e){n(Object(i.a)()),n(j("error occurs!!")),o("error occurs!!")})})}}}}]);
//# sourceMappingURL=23.0307e35e.chunk.js.map