(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1109:function(e,t,a){"use strict";a.r(t);var s=a(25),n=a(26),c=a(29),r=a(27),i=a(28),o=a(0),l=a.n(o),u=a(36),d=a(34),p=a(1075),m=a(122),h=a(253),y=a(37),b=a(12),v=a(1),f=a.n(v),g=a(9),E=a.n(g),j=a(694),O=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(r.a)(t).call(this,e))).state={errClass:"hidden",errMsg:""},a.hideError=a.hideError.bind(Object(b.a)(Object(b.a)(a))),a.updateReadStatus=a.updateReadStatus.bind(Object(b.a)(Object(b.a)(a))),a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"hideError",value:function(e){e.preventDefault(),this.setState({errClass:"hidden",errMsg:""})}},{key:"updateReadStatus",value:function(e,t){var a=[];E.a.map(this.props.policyDocuments.data,function(e,t){0!==e.read&&a.push(e.name)}),a.push(e.name),this.props.onUpdateReadStatus(a)}},{key:"render",value:function(){var e=this,t=E.a.map(this.props.policyDocuments.data,function(t,a){var s=t.name.replace(/ /g,""),n=t.read?" is-read-document":" is-not-read-document";return l.a.createElement("div",{key:a,id:s,className:"m-y-sm policyDocumentsList clear"+n},l.a.createElement("h5",null,t.name),l.a.createElement("a",{href:t.link,target:"_blank",onClick:function(){return e.updateReadStatus(t)}},t.link))});return l.a.createElement("div",{className:"app-body",id:"view"},l.a.createElement("div",{className:"col-sm-12"},l.a.createElement(j.a,{className:this.state.errClass,message:this.state.errMsg,onClick:this.hideError})),l.a.createElement("div",{className:"col-xs-12"},l.a.createElement("div",{className:"policyDocumentsList m-t-md clear"},l.a.createElement("h4",null,"Policy Documents List"),l.a.createElement("small",{className:"text-danger"},l.a.createElement("i",null,"(Please read & accept all the policy documents to get access to this site. Incase of issues contact HR)"))),t))}}]),t}(l.a.Component);O.PropTypes={policyDocuments:f.a.array.isRequired,onUpdateReadStatus:f.a.func.isRequired};var k=O,D=a(5),R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(r.a)(t).call(this,e))).props.isAlreadyLogin(),a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"componentWillMount",value:function(){this.props.requestUserPolicyDocument()}},{key:"componentWillReceiveProps",value:function(e){var t=Object(y.e)(this.props.location.pathname,e.loggedUser);t.status&&"/policy_documents"!==t.redirectTo&&this.props.history.push(t.redirectTo)}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(m.a,this.props),l.a.createElement("div",{id:"content",className:"app-content box-shadow-z0",role:"main"},l.a.createElement(h.a,{pageTitle:"Policy Documents",showLoading:this.props.policyDocuments.isLoading}),l.a.createElement(k,{policyDocuments:this.props.policyDocuments,onUpdateReadStatus:this.props.requestUpdateReadStatus})))}}]),t}(l.a.Component);t.default=Object(p.a)(Object(u.b)(function(e){return{loggedUser:e.logged_user.userLogin,policyDocuments:e.policyDocuments.policyDocument}},function(e){return Object(d.b)(D,e)})(R))},694:function(e,t,a){"use strict";var s=a(0),n=a.n(s),c=a(1),r=a.n(c),i=function(e){var t=e.message,a=e.style,s=e.className,c=e.onClick,r="alert "+(s||"hidden");return n.a.createElement("div",{className:r,style:a},n.a.createElement("a",{href:"#",className:"close",onClick:c,"aria-label":"close"},"\xd7"),n.a.createElement("span",null,t))};i.PropTypes={message:r.a.string.isRequired,className:r.a.string.isRequired,style:r.a.object,onClick:r.a.func.isRequired},t.a=i}}]);
//# sourceMappingURL=16.70723c5b.chunk.js.map