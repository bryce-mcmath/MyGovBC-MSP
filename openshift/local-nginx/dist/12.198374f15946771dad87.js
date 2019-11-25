(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{u0EV:function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),o=function(){},t=e("pMnS"),r=e("kL22"),a=e("ueff"),i=e("lOTE"),d=e("GBPT"),s=e("RbdH"),c=e("osU9"),p=e("gIcY"),m=e("on5W"),g=e("Imk+"),f=e("CTJ9"),h=e("rA0h"),C=e("Ip0R"),v=e("mrSG"),b=e("hErN"),y=e("Pzz5"),M=e("Gi3i"),S=e("A+Vm"),A=e("AytR"),N=e("iXKo"),R=e("t/Na"),I=e("sWYD"),P=e("F/XL"),k=function(l){function n(n){var e=l.call(this,n)||this;return e.http=n,e._headers=new R.h,e.ISO8601DateFormat="yyyy-MM-dd",e}return Object(v.__extends)(n,l),n.prototype.sendAclRequest=function(l){var n=A.a.appConstants.apiBaseUrl+A.a.appConstants.aclContextPath+l.uuid;return this._headers=new R.h({"Content-Type":"application/json","Response-Type":"application/json","X-Authorization":"Bearer "+l.authorizationToken}),this.post(n,{requesterPHN:l.accountHolderPhn.replace(/ /g,""),requesterBirthdate:Object(I.a)(l.accountHolderDob,this.ISO8601DateFormat),requesterPostalCode:l.postalCode.toUpperCase().replace(/ /g,""),letterSelection:l.enrolmentMembership,specificPHN:l.enrolmentMembership!==S.a.SpecificMember?"":l.specificMemberPhn.replace(/ /g,""),aclTransactionId:l.uuid})},n.prototype.sendSpaEnvServer=function(l){return this._headers=new R.h({SPA_ENV_NAME:l}),this.post(A.a.appConstants.envServerBaseUrl,null)},n.prototype.handleError=function(l){return console.log("handleError",JSON.stringify(l)),l.error instanceof ErrorEvent?console.error("MspMaintenanceService error: ",l.error.message):console.error("MspMaintenanceService Backend returned error code: "+l.status+".  Error body: "+l.error),Object(P.a)(l)},n.ngInjectableDef=u.defineInjectable({factory:function(){return new n(u.inject(R.c))},token:n,providedIn:"root"}),n}(c.b),q=e("/yVi"),T=e("sdC+"),O=e("0/gg"),_=function(l){function n(n,e,u,o,t,r){var a=l.call(this,n)||this;return a.router=n,a.header=e,a.dataService=u,a.logService=o,a.aclApiService=t,a.cd=r,a.loading=!1,a.captchaApiBaseUrl=A.a.appConstants.captchaApiBaseUrl,a.showCaptcha=!1,a.accountHolderInput="AccountHolderPhn",a.specificMemberInput="SpecificMember",a.radioBtnLabels=[{label:"Myself only",value:S.a.MyselfOnly},{label:"All members on my Medical Services Plan Account",value:S.a.AllMembers},{label:"One specific member on my Medical Services Plan Account",value:S.a.SpecificMember}],a.errorMessage={duplicate:"This PHN was already used for another family member. Please provide the PHN that is listed on the family member's BC Services Card."},a.dobErrorMsg={invalidRange:"An applicant must be 16 years or older."},a.dobEndRange=Object(T.a)(Object(O.a)(),16),a.header.setTitle("Account Confirmation Request"),a}return Object(v.__extends)(n,l),Object.defineProperty(n.prototype,"application",{get:function(){return this.dataService.application},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isSpecificMember",{get:function(){return this.application.enrolmentMembership===S.a.SpecificMember},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"accountHolderPhn",{get:function(){return this.application.accountHolderPhn?this.application.accountHolderPhn:null},set:function(l){this.application.accountHolderPhn=l},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"postalCode",{get:function(){return this.application.postalCode?this.application.postalCode:null},set:function(l){this.application.postalCode=l},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"accountHolderDob",{get:function(){return this.application.accountHolderDob},set:function(l){this.application.accountHolderDob=l},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"enrolmentMembership",{get:function(){return this.application.enrolmentMembership},set:function(l){l===S.a.SpecificMember&&(this.showCaptcha=!1),this.application.enrolmentMembership=l},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"specificMemberPhn",{get:function(){return this.application.specificMemberPhn?this.application.specificMemberPhn:null},set:function(l){this.application.specificMemberPhn=l},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.logService.log({name:"ACL - Loaded Page",url:this.router.url},"ACL - Loaded Page")},n.prototype.ngAfterViewInit=function(){var l=this;this.dataService.application.infoCollectionAgreement||this.mspConsentModal.showFullSizeView(),this.form&&(this._subscription=this.form.valueChanges.pipe(Object(M.a)(100)).subscribe(function(){l.isSpecificMember||(l.application.specificMemberPhn="",l.triggerValidation(l.accountHolderInput)),!l.showCaptcha&&l.form.valid&&l.application.infoCollectionAgreement&&(l.showCaptcha=!0),l.dataService.saveApplication()}))},n.prototype.ngOnDestroy=function(){this._subscription.unsubscribe()},n.prototype.acceptAgreement=function(l){this.dataService.application.infoCollectionAgreement=l,this.dataService.saveApplication()},n.prototype.triggerValidation=function(l){var n=this,e=this.form.controls[l];e&&setTimeout(function(){e.updateValueAndValidity(),n.cd.detectChanges()},0)},n.prototype.continue=function(){var l=this;this.form.valid&&this.application.authorizationToken?(this.logService.log({name:"ACL application submitting request"},"ACL : Submission Request"),this.loading=!0,this.aclApiService.sendAclRequest(this.dataService.application).subscribe(function(n){var e=n;if(e.referenceNumber&&"Y"===e.dberrorCode&&"Y"===e.rapidResponse)return l.loading=!1,l.dataService.removeApplication(),l.logService.log({name:"ACL - Received refNo ",confirmationNumber:e.referenceNumber},"ACL - Submission Response Success"),void l.navigate(q.a.CONFIRMATION.fullpath,{confirmationNum:e.referenceNumber,status:c.e.SUCCESS});l.logService.log({name:"ACL - RAPID/DB Error",confirmationNumber:l.application.uuid},"ACL - Submission Response Error"+JSON.stringify(e)),l.aclApiService.sendSpaEnvServer('{"SPA_ENV_ACL_'+e.rapidResponse+'":""}').subscribe(function(n){if(l.loading=!1,n instanceof R.f)return l.logService.log({name:"account-letter - SPA Env System Error",url:l.router.url},"account-letter - SPA Env Rapid Response Error"+n.message),void l.navigate(q.a.CONFIRMATION.fullpath,{status:c.e.ERROR,message:n.message});l.application.regenUUID(),l.application.authorizationToken=null,l.dataService.saveApplication();var e=Object.keys(n)[0];l.navigate(q.a.CONFIRMATION.fullpath,{status:c.e.ERROR,message:n[e]})})},function(n){l.loading=!1;var e="This error occurred because the system encountered an unanticipated situation which forced it to stop.";n instanceof R.f&&(l.application.regenUUID(),l.application.authorizationToken=null,l.dataService.saveApplication(),l.logService.log({name:"ACL - System Error",confirmationNumber:l.application.uuid},"ACL - Submission Response Error"+n.message),e="Try to submit your MSP Account Confirmation request again."),l.navigate(q.a.CONFIRMATION.fullpath,{status:c.e.ERROR,message:e})})):this.markAllInputsTouched()},n}(c.a),V=e("ZYCi"),L=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function D(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,16,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Specific Member Information"])),(l()(),u["\u0275eld"](3,0,null,null,1,"p",[["class","border-bottom"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Please provide additional information for the specific member. "])),(l()(),u["\u0275eld"](5,0,null,null,11,"common-page-section",[["layout","tips"]],null,null,null,s.Y,s.y)),u["\u0275did"](6,114688,null,0,c.kb,[],{layout:[0,"layout"]},null),(l()(),u["\u0275eld"](7,0,null,0,9,"div",[["class","form-group col-sm-6 pl-0"]],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,8,"common-phn",[["commonDuplicateCheck",""],["name","SpecificMember"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"blur"]],function(l,n,e){var u=!0,o=l.component;return"ngModelChange"===n&&(u=!1!==(o.specificMemberPhn=e)&&u),"blur"===n&&(u=!1!==o.triggerValidation(o.accountHolderInput)&&u),u},s.K,s.k)),u["\u0275did"](9,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275did"](10,16384,null,0,c.U,[],{dupList:[0,"dupList"]},null),u["\u0275pad"](11,1),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l,n){return[l,n]},[p.RequiredValidator,c.U]),u["\u0275did"](13,671744,null,0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](15,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](16,114688,null,0,c.K,[[6,p.NgControl]],{errorMessage:[0,"errorMessage"]},{blur:"blur"})],function(l,n){var e=n.component;l(n,6,0,"tips"),l(n,9,0,""),l(n,10,0,l(n,11,0,e.accountHolderPhn)),l(n,13,0,"SpecificMember",e.specificMemberPhn),l(n,16,0,e.errorMessage)},function(l,n){l(n,8,0,u["\u0275nov"](n,9).required?"":null,u["\u0275nov"](n,15).ngClassUntouched,u["\u0275nov"](n,15).ngClassTouched,u["\u0275nov"](n,15).ngClassPristine,u["\u0275nov"](n,15).ngClassDirty,u["\u0275nov"](n,15).ngClassValid,u["\u0275nov"](n,15).ngClassInvalid,u["\u0275nov"](n,15).ngClassPending)})}function w(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,7,"div",[["class","pt-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,6,"common-captcha",[["name","Captcha"],["ngModel",""],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"onValidToken"]],function(l,n,e){var u=!0;return"onValidToken"===n&&(u=!1!==(l.component.application.authorizationToken=e)&&u),u},m.b,m.a)),u["\u0275did"](2,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l){return[l]},[p.RequiredValidator]),u["\u0275did"](4,671744,null,0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},null),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](6,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](7,4833280,null,0,g.b,[g.c,u.ChangeDetectorRef,u.NgZone,[6,p.NgControl]],{apiBaseUrl:[0,"apiBaseUrl"],nonce:[1,"nonce"]},{onValidToken:"onValidToken"})],function(l,n){var e=n.component;l(n,2,0,""),l(n,4,0,"Captcha",""),l(n,7,0,e.captchaApiBaseUrl,e.application.uuid)},function(l,n){l(n,1,0,u["\u0275nov"](n,2).required?"":null,u["\u0275nov"](n,6).ngClassUntouched,u["\u0275nov"](n,6).ngClassTouched,u["\u0275nov"](n,6).ngClassPristine,u["\u0275nov"](n,6).ngClassDirty,u["\u0275nov"](n,6).ngClassValid,u["\u0275nov"](n,6).ngClassInvalid,u["\u0275nov"](n,6).ngClassPending)})}function E(l){return u["\u0275vid"](0,[u["\u0275qud"](402653184,1,{form:0}),u["\u0275qud"](402653184,2,{mspConsentModal:0}),(l()(),u["\u0275eld"](2,0,null,null,1,"msp-consent-modal",[],null,[[null,"onClose"],[null,"accept"]],function(l,n,e){var o=!0,t=l.component;return"onClose"===n&&(o=!1!==u["\u0275nov"](l,28).focus()&&o),"accept"===n&&(o=!1!==t.acceptAgreement(e)&&o),o},f.b,f.a)),u["\u0275did"](3,49152,[[2,4],["mspConsentModal",4]],0,h.a,[],{consentProcessName:[0,"consentProcessName"]},{accept:"accept"}),(l()(),u["\u0275eld"](4,0,null,null,56,"common-page-framework",[["layout","blank"]],null,null,null,s.S,s.s)),u["\u0275did"](5,114688,null,0,c.bb,[],{layout:[0,"layout"]},null),(l()(),u["\u0275eld"](6,0,null,0,54,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,e){var o=!0;return"submit"===n&&(o=!1!==u["\u0275nov"](l,8).onSubmit(e)&&o),"reset"===n&&(o=!1!==u["\u0275nov"](l,8).onReset()&&o),o},null,null)),u["\u0275did"](7,16384,null,0,p["\u0275angular_packages_forms_forms_bg"],[],null,null),u["\u0275did"](8,4210688,[[1,4],["formRef",4]],0,p.NgForm,[[8,null],[8,null]],null,null),u["\u0275prd"](2048,null,p.ControlContainer,null,[p.NgForm]),u["\u0275did"](10,16384,null,0,p.NgControlStatusGroup,[[4,p.ControlContainer]],null,null),(l()(),u["\u0275eld"](11,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Request Medical Service Plan Account Confirmation Letter"])),(l()(),u["\u0275eld"](13,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Use this online form to request a Medical Services Plan Account Confirmation letter that will verify enrolment status for one or more individuals on an account. "])),(l()(),u["\u0275eld"](15,0,null,null,1,"p",[["class","border-bottom"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Please allow two to three weeks for delivery. "])),(l()(),u["\u0275eld"](17,0,null,null,1,"h2",[["class","border-bottom"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Your Information"])),(l()(),u["\u0275eld"](19,0,null,null,37,"common-page-section",[["layout","tips"]],null,null,null,s.Y,s.y)),u["\u0275did"](20,114688,null,0,c.kb,[],{layout:[0,"layout"]},null),(l()(),u["\u0275eld"](21,0,null,0,27,"div",[["class","col-sm-6 pl-0"]],null,null,null,null,null)),(l()(),u["\u0275eld"](22,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,8,"common-phn",[["commonDuplicateCheck",""],["name","AccountHolderPhn"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"blur"]],function(l,n,e){var u=!0,o=l.component;return"ngModelChange"===n&&(u=!1!==(o.accountHolderPhn=e)&&u),"blur"===n&&(u=!1!==o.triggerValidation(o.specificMemberInput)&&u),u},s.K,s.k)),u["\u0275did"](24,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275did"](25,16384,null,0,c.U,[],{dupList:[0,"dupList"]},null),u["\u0275pad"](26,1),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l,n){return[l,n]},[p.RequiredValidator,c.U]),u["\u0275did"](28,671744,[["AccountHolder_Phn",4]],0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](30,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](31,114688,null,0,c.K,[[6,p.NgControl]],{errorMessage:[0,"errorMessage"]},{blur:"blur"}),(l()(),u["\u0275eld"](32,0,null,null,7,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](33,0,null,null,6,"common-date",[["label","Birthdate"],["name","AccountHolderDob"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.accountHolderDob=e)&&u),u},s.U,s.u)),u["\u0275did"](34,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l){return[l]},[p.RequiredValidator]),u["\u0275did"](36,671744,null,0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](38,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](39,638976,null,0,c.eb,[[6,p.NgControl]],{label:[0,"label"],errorMessage:[1,"errorMessage"],dateRangeEnd:[2,"dateRangeEnd"]},null),(l()(),u["\u0275eld"](40,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](41,0,null,null,7,"common-postal-code",[["commonValidatePostalcode",""],["name","AccountHolderPC"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.postalCode=e)&&u),u},s.X,s.x)),u["\u0275did"](42,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275did"](43,16384,null,0,c.Y,[],null,null),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l,n){return[l,n]},[p.RequiredValidator,c.Y]),u["\u0275did"](45,671744,null,0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](47,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](48,114688,null,0,c.jb,[[6,p.NgControl]],null,null),(l()(),u["\u0275eld"](49,0,null,0,7,"div",[["class","form-group pt-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](50,0,null,null,6,"common-radio",[["display","table-row-group"],["label","Whose Medical Services Plan enrolment information should be included in the Account Confirmation Letter?"],["name","EnrolmentMembership"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var u=!0;return"ngModelChange"===n&&(u=!1!==(l.component.enrolmentMembership=e)&&u),u},s.I,s.i)),u["\u0275did"](51,16384,null,0,p.RequiredValidator,[],{required:[0,"required"]},null),u["\u0275prd"](1024,null,p.NG_VALIDATORS,function(l){return[l]},[p.RequiredValidator]),u["\u0275did"](53,671744,null,0,p.NgModel,[[2,p.ControlContainer],[6,p.NG_VALIDATORS],[8,null],[8,null]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),u["\u0275did"](55,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),u["\u0275did"](56,114688,null,0,c.H,[[6,p.NgControl]],{label:[0,"label"],radioLabels:[1,"radioLabels"],display:[2,"display"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,D)),u["\u0275did"](58,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,w)),u["\u0275did"](60,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](61,0,null,null,2,"common-form-action-bar",[["submitLabel","Request Confirmation"],["widthOption","extra-width-mobile-only"]],null,[[null,"btnClick"]],function(l,n,e){var u=!0;return"btnClick"===n&&(u=!1!==l.component.continue()&&u),u},s.R,s.r)),u["\u0275prd"](14336,null,p.ControlContainer,null,[p.NgForm]),u["\u0275did"](63,114688,null,0,c.ab,[],{submitLabel:[0,"submitLabel"],isLoading:[1,"isLoading"],defaultColor:[2,"defaultColor"]},{btnClick:"btnClick"})],function(l,n){var e=n.component;l(n,3,0,"MSP"),l(n,5,0,"blank"),l(n,20,0,"tips"),l(n,24,0,""),l(n,25,0,l(n,26,0,e.specificMemberPhn)),l(n,28,0,"AccountHolderPhn",e.accountHolderPhn),l(n,31,0,e.errorMessage),l(n,34,0,""),l(n,36,0,"AccountHolderDob",e.accountHolderDob),l(n,39,0,"Birthdate",e.dobErrorMsg,e.dobEndRange),l(n,42,0,""),l(n,45,0,"AccountHolderPC",e.postalCode),l(n,48,0),l(n,51,0,""),l(n,53,0,"EnrolmentMembership",e.enrolmentMembership),l(n,56,0,"Whose Medical Services Plan enrolment information should be included in the Account Confirmation Letter?",e.radioBtnLabels,"table-row-group"),l(n,58,0,e.isSpecificMember),l(n,60,0,e.showCaptcha),l(n,63,0,"Request Confirmation",e.loading,!1)},function(l,n){l(n,6,0,u["\u0275nov"](n,10).ngClassUntouched,u["\u0275nov"](n,10).ngClassTouched,u["\u0275nov"](n,10).ngClassPristine,u["\u0275nov"](n,10).ngClassDirty,u["\u0275nov"](n,10).ngClassValid,u["\u0275nov"](n,10).ngClassInvalid,u["\u0275nov"](n,10).ngClassPending),l(n,23,0,u["\u0275nov"](n,24).required?"":null,u["\u0275nov"](n,30).ngClassUntouched,u["\u0275nov"](n,30).ngClassTouched,u["\u0275nov"](n,30).ngClassPristine,u["\u0275nov"](n,30).ngClassDirty,u["\u0275nov"](n,30).ngClassValid,u["\u0275nov"](n,30).ngClassInvalid,u["\u0275nov"](n,30).ngClassPending),l(n,33,0,u["\u0275nov"](n,34).required?"":null,u["\u0275nov"](n,38).ngClassUntouched,u["\u0275nov"](n,38).ngClassTouched,u["\u0275nov"](n,38).ngClassPristine,u["\u0275nov"](n,38).ngClassDirty,u["\u0275nov"](n,38).ngClassValid,u["\u0275nov"](n,38).ngClassInvalid,u["\u0275nov"](n,38).ngClassPending),l(n,41,0,u["\u0275nov"](n,42).required?"":null,u["\u0275nov"](n,47).ngClassUntouched,u["\u0275nov"](n,47).ngClassTouched,u["\u0275nov"](n,47).ngClassPristine,u["\u0275nov"](n,47).ngClassDirty,u["\u0275nov"](n,47).ngClassValid,u["\u0275nov"](n,47).ngClassInvalid,u["\u0275nov"](n,47).ngClassPending),l(n,50,0,u["\u0275nov"](n,51).required?"":null,u["\u0275nov"](n,55).ngClassUntouched,u["\u0275nov"](n,55).ngClassTouched,u["\u0275nov"](n,55).ngClassPristine,u["\u0275nov"](n,55).ngClassDirty,u["\u0275nov"](n,55).ngClassValid,u["\u0275nov"](n,55).ngClassInvalid,u["\u0275nov"](n,55).ngClassPending)})}var H=u["\u0275ccf"]("msp-request-letter",_,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"msp-request-letter",[],null,null,null,E,L)),u["\u0275did"](1,4440064,null,0,_,[V.m,b.a,y.a,N.a,k,u.ChangeDetectorRef],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),U=function(){function l(l){this.route=l,this.status=c.e.ERROR,this.links=A.a.links}return l.prototype.ngOnInit=function(){var l=this;this._subscription=this.route.queryParams.subscribe(function(n){n.status&&(l.status=n.status),n.confirmationNum&&(l.confirmationNum=n.confirmationNum),n.message&&(l.message=n.message,l.message=l.message.replace("HIBC",'<a href="'+l.links.HIBC+'" target="blank">Health Insurance BC</a>'),l.message=l.message.replace("ACBC",'<a href="'+l.links.ACBC+'" target="blank">Change of Address Service</a>'))})},l.prototype.ngOnDestroy=function(){this._subscription.unsubscribe()},Object.defineProperty(l.prototype,"isSucess",{get:function(){return this.status===c.e.SUCCESS},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"dateStamp",{get:function(){return Object(I.a)(new Date,"MMMM dd, yyyy")},enumerable:!0,configurable:!0}),l}(),B=u["\u0275crt"]({encapsulation:0,styles:[[".icon--message[_ngcontent-%COMP%]{font-size:1.5rem!important;padding-top:.25rem}"]],data:{}});function F(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"a",[["onclick","window.print();return false;"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"strong",[["class","float-right"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Print "])),(l()(),u["\u0275eld"](3,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-print fa-lg pointer"]],null,null,null,null,null))],null,null)}function j(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["message",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"p",[["class","icon--message"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Success"])),(l()(),u["\u0275eld"](3,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[""," - Reference # ",""]))],null,function(l,n){var e=n.component;l(n,4,0,e.dateStamp,e.confirmationNum?e.confirmationNum:"N/A")})}function G(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" We are mailing you a letter to confirm your MSP enrolment status. Please wait two to three weeks for delivery. "]))],null,null)}function Y(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" If you have not received your confirmation letter in three weeks, please contact "])),(l()(),u["\u0275eld"](2,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Health Insurance BC"])),(l()(),u["\u0275ted"](-1,null,[" and be ready to provide the Reference Number above. "]))],null,function(l,n){l(n,2,0,u["\u0275inlineInterpolate"](1,"",n.component.links.HIBC,""))})}function z(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null))],null,function(l,n){l(n,0,0,n.component.message)})}function x(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["message",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"p",[["class","icon--message"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Error"])),(l()(),u["\u0275and"](16777216,null,null,1,null,z)),u["\u0275did"](4,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null)],function(l,n){l(n,4,0,n.component.message,u["\u0275nov"](n.parent,38))},null)}function X(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,6,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" The postal code you entered does not match Medical Services Plan records for your account. Please update your address by using the "])),(l()(),u["\u0275eld"](2,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Change of Address Service "])),(l()(),u["\u0275ted"](-1,null,[" or by contacting "])),(l()(),u["\u0275eld"](5,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Health Insurance B.C."]))],null,function(l,n){var e=n.component;l(n,2,0,u["\u0275inlineInterpolate"](1,"",e.links.BCSC_UPDATE,"")),l(n,5,0,u["\u0275inlineInterpolate"](1,"",e.links.HIBC,""))})}function K(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,36,"common-page-framework",[["layout","blank"]],null,null,null,s.S,s.s)),u["\u0275did"](1,114688,null,0,c.bb,[],{layout:[0,"layout"]},null),(l()(),u["\u0275eld"](2,0,null,0,34,"common-confirm-template",[],null,null,null,s.P,s.p)),u["\u0275did"](3,49152,null,0,c.S,[],{displayIcon:[0,"displayIcon"]},null),(l()(),u["\u0275eld"](4,0,null,0,6,"div",[["confirmationTitle",""]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,F)),u["\u0275did"](6,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](7,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Confirmation Message"])),(l()(),u["\u0275eld"](9,0,null,null,1,"p",[["class","border-bottom"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" It is important to keep your reference number - write it down, or print this page for your records. "])),(l()(),u["\u0275and"](16777216,null,2,1,null,j)),u["\u0275did"](12,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),u["\u0275eld"](13,0,null,1,23,"div",[["AdditionalInfo",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,1,"h2",[["class","border-bottom"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Important"])),(l()(),u["\u0275eld"](16,0,null,null,16,"div",[["class","pb-4"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,G)),u["\u0275did"](18,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](19,0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,Y)),u["\u0275did"](21,16384,null,0,C.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](22,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" BC residents must fulfill their MSP obligations under the "])),(l()(),u["\u0275eld"](24,0,null,null,1,"i",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Medicare Protection Act"])),(l()(),u["\u0275eld"](26,0,null,null,6,"ul",[["style","list-style-type:circle"]],null,null,null,null,null)),(l()(),u["\u0275eld"](27,0,null,null,1,"li",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Update your MSP account due to address changes or changes in family structure. "])),(l()(),u["\u0275eld"](29,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Health Insurance BC and the Ministry of Health offer easy online services to update your MSP account. Visit "])),(l()(),u["\u0275eld"](31,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Managing Your MSP Account."])),(l()(),u["\u0275ted"](-1,null,[" More information available on "])),(l()(),u["\u0275eld"](34,0,null,null,1,"a",[["target","blank"]],[[8,"href",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Frequently Asked Questions"])),(l()(),u["\u0275ted"](-1,null,[". "])),(l()(),u["\u0275and"](0,[["IconErrMsg",2]],null,0,null,x)),(l()(),u["\u0275and"](0,[["DefaultMessage",2]],null,0,null,X))],function(l,n){var e=n.component;l(n,1,0,"blank"),l(n,3,0,e.status),l(n,6,0,e.isSucess),l(n,12,0,e.isSucess,u["\u0275nov"](n,37)),l(n,18,0,e.isSucess),l(n,21,0,e.isSucess)},function(l,n){var e=n.component;l(n,31,0,u["\u0275inlineInterpolate"](1,"",e.links.MGMT_MSP_ACCOUNT,"")),l(n,34,0,u["\u0275inlineInterpolate"](1,"",e.links.FAQ,""))})}var W=u["\u0275ccf"]("msp-acl-confirmation",U,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"msp-acl-confirmation",[],null,null,null,K,B)),u["\u0275did"](1,245760,null,0,U,[V.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),J=e("H0gW"),Q=e("4obl"),Z=e("S7LP"),$=e("6aHO"),ll=e("008C"),nl=e("uihz"),el=e("jkFC"),ul=e("6bkY"),ol=e("Fq6B"),tl=e("UVXo"),rl=e("QpxQ"),al=e("FLOw"),il=e("aZVl"),dl=e("+1h7"),sl=e("R8yP"),cl=function(){};e.d(n,"RequestAclModuleNgFactory",function(){return pl});var pl=u["\u0275cmf"](o,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[t.a,r.a,a.a,i.a,d.a,H,W]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,C.o,C.n,[u.LOCALE_ID,[2,C.y]]),u["\u0275mpd"](4608,p["\u0275angular_packages_forms_forms_i"],p["\u0275angular_packages_forms_forms_i"],[]),u["\u0275mpd"](4608,J.a,J.a,[]),u["\u0275mpd"](4608,Q.a,Q.a,[]),u["\u0275mpd"](4608,Z.a,Z.a,[]),u["\u0275mpd"](4608,$.a,$.a,[u.ComponentFactoryResolver,u.NgZone,u.Injector,Z.a,u.ApplicationRef]),u["\u0275mpd"](4608,ll.a,ll.a,[u.RendererFactory2,$.a]),u["\u0275mpd"](4608,nl.a,nl.a,[]),u["\u0275mpd"](4608,p.NgForm,p.NgForm,[[6,p.NG_VALIDATORS],[6,p.NG_ASYNC_VALIDATORS]]),u["\u0275mpd"](4608,R.l,R.r,[C.e,u.PLATFORM_ID,R.p]),u["\u0275mpd"](4608,R.s,R.s,[R.l,R.q]),u["\u0275mpd"](5120,R.a,function(l){return[l]},[R.s]),u["\u0275mpd"](4608,R.o,R.o,[]),u["\u0275mpd"](6144,R.m,null,[R.o]),u["\u0275mpd"](4608,R.k,R.k,[R.m]),u["\u0275mpd"](6144,R.b,null,[R.k]),u["\u0275mpd"](4608,R.g,R.n,[R.b,u.Injector]),u["\u0275mpd"](4608,R.c,R.c,[R.g]),u["\u0275mpd"](4608,g.c,g.c,[R.c]),u["\u0275mpd"](1073742336,C.c,C.c,[]),u["\u0275mpd"](1073742336,p["\u0275angular_packages_forms_forms_bb"],p["\u0275angular_packages_forms_forms_bb"],[]),u["\u0275mpd"](1073742336,p.FormsModule,p.FormsModule,[]),u["\u0275mpd"](1073742336,el.a,el.a,[]),u["\u0275mpd"](1073742336,V.p,V.p,[[2,V.v],[2,V.m]]),u["\u0275mpd"](1073742336,ul.a,ul.a,[]),u["\u0275mpd"](1073742336,ol.a,ol.a,[]),u["\u0275mpd"](1073742336,tl.TextMaskModule,tl.TextMaskModule,[]),u["\u0275mpd"](1073742336,rl.c,rl.c,[]),u["\u0275mpd"](1073742336,al.a,al.a,[]),u["\u0275mpd"](1073742336,il.a,il.a,[]),u["\u0275mpd"](1073742336,dl.a,dl.a,[]),u["\u0275mpd"](1073742336,c.u,c.u,[]),u["\u0275mpd"](1073742336,R.e,R.e,[]),u["\u0275mpd"](1073742336,R.d,R.d,[]),u["\u0275mpd"](1073742336,g.a,g.a,[]),u["\u0275mpd"](1073742336,sl.a,sl.a,[]),u["\u0275mpd"](1073742336,cl,cl,[]),u["\u0275mpd"](1073742336,o,o,[]),u["\u0275mpd"](256,rl.d,rl.e,[]),u["\u0275mpd"](256,R.p,"XSRF-TOKEN",[]),u["\u0275mpd"](256,R.q,"X-XSRF-TOKEN",[]),u["\u0275mpd"](1024,V.k,function(){return[[{path:"",redirectTo:"request-acl",pathMatch:"full"},{path:"request-acl",component:_},{path:"confirmation",component:U}]]},[])])})}}]);