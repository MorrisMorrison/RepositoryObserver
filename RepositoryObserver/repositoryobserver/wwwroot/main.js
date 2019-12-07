(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-job/add-job.component.css":
/*!***********************************************!*\
  !*** ./src/app/add-job/add-job.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".addNotificationMain{\n    padding-bottom: 10px;\n}\n\n"

/***/ }),

/***/ "./src/app/add-job/add-job.component.html":
/*!************************************************!*\
  !*** ./src/app/add-job/add-job.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"addNotificationMain\" *ngIf=\"isAuthenticated\">\n  <div class=\"card border-0 mb-3\">\n    <div class=\"card-header ro-card-header\">\n      <span>\n        <i class=\"fa fa-bell\"></i>\n        <h5>Notify Me !</h5>\n      </span>\n      <a data-toggle=\"collapse\" href=\"#collapseAddNotification\" role=\"button\" aria-expanded=\"false\"\n        aria-controls=\"collapseAddNotification\">\n        <i class=\"fa fa-chevron-down \"></i>\n      </a>\n    </div>\n    <div class=\"card-body collapse show\" id=\"collapseAddNotification\">\n      <form name=\"notificationForm\" (ngSubmit)=\"createJob()\"\n        #notificationValidator=\"ngForm\">\n        <h5>Type</h5>\n        <p>You can choose between creating a scheduled job or a repository hook.</p>\n        <div class=\"row\">\n          <div class=\"col\">\n              <div class=\"form-group\" >\n            <input type=\"radio\" name=\"schedulerEnabled\" (change)=\"schedulerEnabledChanged()\"\n             [checked]=\"schedulerEnabled\">\n            Scheduled Job\n            </div>\n          </div>\n          <div class=\"col\">\n            <div class=\"form-group\">\n            <input type=\"radio\" name=\"schedulerEnabled\" [checked]=\"!schedulerEnabled\" (change)=\"schedulerEnabledChanged()\">\n          Repository Hook\n          </div>\n        </div>\n        </div>\n        <hr class=\"my-2\">\n        <h5 style=\"padding-top:10px;\">E-Mail Notification</h5>\n        <p>To get notified when vulnerable data was leaked in one of your repositories, simply subscribe with your\n          email down below.</p>\n        <div class=\"row\">\n          <div class=\"col\">\n            <div class=\"form-group\">\n              <label for=\"email\"><b>Email Address</b></label>\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">@</span>\n                </div>\n                <input class=\"form-control\" id=\"email\" name=\"email\" type=\"email\" [(ngModel)]=\"jobModel.email\"\n                  #email=\"ngModel\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\" required email>\n              </div>\n              <div *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n                <div class=\"text-danger\" *ngIf=\"email?.errors.required\"><small>Email is required</small></div>\n                <div class=\"text-danger\" *ngIf=\"email?.errors.email\"><small>Email must be a valid email address</small></div>\n              </div>\n              <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.\n              </small>\n            </div>\n          </div>\n          <div class=\"col\">\n            <label for=\"frequency\"><b>Frequency</b></label>\n            <select *ngIf=\"schedulerEnabled\" [(ngModel)]=\"jobModel.selectedFrequency\" class=\"form-control\" id=\"frequency\"\n              name=\"frequency\" required>\n              <option *ngFor=\"let frequency of jobModel.frequencies;\" [ngValue]=\"frequency\">{{frequency}}\n              </option>\n            </select>\n            <select *ngIf=\"!schedulerEnabled\" [(ngModel)]=\"jobModel.selectedFrequency\" class=\"form-control\" id=\"frequency\"\n            name=\"frequency\" disabled>\n            <option *ngFor=\"let frequency of jobModel.frequencies;\" [ngValue]=\"frequency\">{{frequency}}\n            </option>\n          </select>\n            <small id=\"frequencyHelp\" class=\"form-text text-muted\">In minutes.</small>\n          </div>\n        </div>\n        <div class=\"row\" style=\"padding-top:2%\">\n          <div class=\"col\">\n            <label for=\"searchKeywordToAdd\"><b>Add Search Keywords</b></label>\n            <div class=\"input-group\">\n              <input #searchKeywordToAdd=\"ngModel\" class=\"form-control\" type=\"text\" placeholder=\"Add Search Keyword\" id=\"searchKeywordToAdd\"\n                name=\"searchKeywordToAdd\" [(ngModel)]=\"jobModel.searchKeywordToAdd\">\n              <div class=\"input-group-append\">\n                <button  class=\"btn btn-success\" type=\"button\"\n                  (click)=\"addSearchKeyword(jobModel.searchKeywordToAdd)\">Add</button>\n              </div>\n            </div>\n          </div>\n          <div class=\"col\">\n            <label for=\"commonKeyword\"><b>Common Keywords</b></label>\n            <div *ngIf=\"jobModel.commonKeywords.length > 0; else showNoKeywordsYet\">\n              <span id=\"commonKeyword\" name=\"commonKeyword\"\n                *ngFor=\"let commonKeyword of jobModel.commonKeywords\">{{commonKeyword}}<button class=\"btn\"\n                  style=\"background-color:transparent\" (click)=\"addSearchKeyword(commonKeyword)\"><i\n                    class=\"fa fa-plus-circle\"></i></button></span>\n            </div>\n            <ng-template #showNoKeywordsYet>\n              <div>\n                <p>No Keywords added yet.</p>\n              </div>\n            </ng-template>\n          </div>\n        </div>\n        <div class=\"row\" style=\"padding-top: 2%\">\n          <div class=\"col\">\n            <div class=\"form-group\">\n              <label for=\"searchKeywords\"><b>SearchKeywords</b></label>\n              <div>\n              <div *ngIf=\"jobModel.searchKeywords.length == 0 && searchKeywordToAdd.touched\" class=\"text-danger\"><small>Search Keywords are required.</small></div>\n              <p *ngIf=\"jobModel.searchKeywords.length == 0 && !searchKeywordToAdd.touched\">No Search Keywords added yet.</p>\n            </div>\n              <ul name=\"searchKeywords\" id=\"searchKeywords\">\n                <li *ngFor=\"let searchKeyword of jobModel.searchKeywords\">{{searchKeyword}} <button class=\"btn\"\n                    style=\"background-color:transparent\" (click)=\"removeSearchKeyword(searchKeyword)\"><i\n                      class=\"fa fa-minus-circle\"></i></button></li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"col\">\n            <label for=\"repository\"><b>Repositories</b></label>\n            <div class=\"form-group\">\n              <div style=\"padding-top: 5px; padding-left:4%;\" *ngFor=\"let repository of jobModel.repositoryTos\"\n                class=\"form-check\">\n                <input type=\"checkbox\" name=\"repository\" id=\"repository\" class=\"form-check-input\" value=\"{{repository.name}}\"\n                  [(ngModel)]=\"repository.selected\">\n                {{repository.name}}\n              </div>\n            </div>\n            <div *ngIf=\"this.getSelectedRepositories().length < 1\">\n                <div class=\"text-danger\"><small>Selecting at least one Repository is required.</small></div>\n              </div>\n          </div>\n        </div>\n        <hr class=\"my-2\">\n        <div style=\"padding-top: 10px;\">\n        <h5>Mobile Notification</h5>\n        <div class=\"row\">\n          <div class=\"col\">\n            <div class=\"form-group\">\n              <label for=\"phoneNumber\"><b>Phone Number</b></label>\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">@</span>\n                </div>\n                <input class=\"form-control\" id=\"phoneNumber\" name=\"phoneNumber\" type=\"tel\" [(ngModel)]=\"jobModel.phoneNumber\"\n                       aria-describedby=\"phoneNumberHelp\" placeholder=\"Enter Phone Number\" >\n              </div>\n              <div *ngIf=\"!this.jobModel.phoneNumber  && (this.jobModel.whatsappNotificationEnabled || this.jobModel.smsNotificationEnabled)\">\n                  <div class=\"text-danger\"><small>Providing a Phone Number is required.</small></div>\n                </div>\n            </div>\n          </div>\n          <div class=\"col\">\n            <div style=\"display:flex; flex-direction:column;\">\n            <label><b>Type</b></label>\n              <div class=\"form-check form-check-inline\">\n                <input id=\"smsNotificationEnabled\" name=\"smsNotificationEnabled\" type=\"checkbox\" [(ngModel)]=\"jobModel.smsNotificationEnabled\"\n                       aria-describedby=\"smsNotificationEnabledHelp\">\n                <span style=\"padding-left:10px;\">SMS</span>\n              </div>\n              <div class=\"form-check form-check-inline\">\n                <input id=\"whatsappNotificationEnabled\" name=\"whatsappNotificationEnabled\" type=\"checkbox\" [(ngModel)]=\"jobModel.whatsappNotificationEnabled\"\n                        aria-describedby=\"whatsappNotificationEnabledHelp\">\n                <span style=\"padding-left:10px;\">WhatsApp</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\" style=\"padding-top:10px;\">\n          <button type=\"submit\" class=\"btn btn-success btn-lg\">Submit</button>\n        </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/add-job/add-job.component.ts":
/*!**********************************************!*\
  !*** ./src/app/add-job/add-job.component.ts ***!
  \**********************************************/
/*! exports provided: AddJobComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddJobComponent", function() { return AddJobComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_job_job_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/job/job.service */ "./src/app/service/job/job.service.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/repositoryTO */ "./src/app/dto/repositoryTO.ts");
/* harmony import */ var _dto_jobTO__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dto/jobTO */ "./src/app/dto/jobTO.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _model_job_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/job-model */ "./src/app/model/job-model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddJobComponent = /** @class */ (function () {
    function AddJobComponent(githubAuthService, jobService, alertifyService) {
        this.githubAuthService = githubAuthService;
        this.jobService = jobService;
        this.alertifyService = alertifyService;
        this.jobModel = new _model_job_model__WEBPACK_IMPORTED_MODULE_6__["AddJobModel"]();
        this.jobCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.schedulerEnabled = true;
    }
    AddJobComponent.prototype.ngOnInit = function () {
    };
    AddJobComponent.prototype.ngOnChanges = function () {
        this.refreshData();
    };
    AddJobComponent.prototype.refreshData = function () {
        if (this.isAuthenticated) {
            this.getCurrentUserRepositories();
            this.getFrequencies();
            this.getCommonKeywords();
        }
    };
    AddJobComponent.prototype.getCurrentUserRepositories = function () {
        var _this = this;
        this.githubAuthService.getCurrentUsersRepositories().subscribe(function (repositories) {
            _this.jobModel.repositories = repositories;
            _this.jobModel.repositoryTos = [];
            _this.jobModel.repositories.forEach(function (repository) { return _this.jobModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_3__["RepositoryTO"](repository, false)); });
        });
    };
    AddJobComponent.prototype.getFrequencies = function () {
        var _this = this;
        this.jobService.getFrequencies().subscribe(function (frequencies) {
            _this.jobModel.frequencies = frequencies;
            _this.jobModel.selectedFrequency = _this.jobModel.frequencies[0];
        });
    };
    AddJobComponent.prototype.getCommonKeywords = function () {
        var _this = this;
        this.jobService.getCommonKeywords().subscribe(function (commonKeywords) { return _this.jobModel.commonKeywords = commonKeywords; });
    };
    AddJobComponent.prototype.createJob = function () {
        var _this = this;
        var job = new _dto_jobTO__WEBPACK_IMPORTED_MODULE_4__["AddJobTO"]();
        job.email = this.jobModel.email;
        job.frequency = this.jobModel.selectedFrequency;
        job.searchKeywords = this.jobModel.searchKeywords;
        job.emailNotificationEnabled = true;
        job.smsNotificationEnabled = this.jobModel.smsNotificationEnabled;
        job.whatsappNotificationEnabled = this.jobModel.whatsappNotificationEnabled;
        job.phoneNumber = this.jobModel.phoneNumber;
        job.schedulerEnabled = this.schedulerEnabled;
        var repositories = this.getSelectedRepositories();
        job.repositories = repositories;
        this.githubAuthService.getCurrentUser().subscribe(function (user) {
            job.username = user.username;
            _this.jobService.createJob(job).subscribe(function (response) {
                console.log(response.status);
                if (response.status === 200) {
                    _this.jobCreated.emit(true);
                    _this.alertifyService.success("Notification created.");
                }
                else if (response.status === 409) {
                    _this.alertifyService.warning("Notification already exists.");
                }
                else {
                    _this.alertifyService.error("An Error occurred.");
                }
                _this.clearFormData();
            });
        });
    };
    AddJobComponent.prototype.checkFormIsInvalid = function () {
        var formIsInvalid = (this.jobModel.email.length < 4 || this.jobModel.selectedFrequency == null || this.jobModel.searchKeywords.length < 1 || this.getSelectedRepositories().length < 1);
        if (formIsInvalid) {
            this.formIsInvalid = true;
            return true;
        }
        return false;
    };
    AddJobComponent.prototype.clearFormData = function () {
        this.jobModel.email = "";
        this.jobModel.selectedFrequency = this.jobModel.frequencies[0];
        this.jobModel.repositoryTos.forEach(function (repository) { return repository.selected = false; });
        this.jobModel.searchKeywords = [];
        this.jobModel.phoneNumber = "";
        this.jobModel.whatsappNotificationEnabled = false;
        this.jobModel.smsNotificationEnabled = false;
        this.jobModel.schedulerEnabled = false;
    };
    AddJobComponent.prototype.getSelectedRepositories = function () {
        var repositories = this.jobModel.repositoryTos.filter(function (repositoryTO) { return repositoryTO.selected; })
            .map(function (selectedRepository) { return selectedRepository.name; });
        return repositories;
    };
    AddJobComponent.prototype.addSearchKeyword = function (searchKeywordToAdd) {
        if (this.jobModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword == searchKeywordToAdd; }).length < 1) {
            this.jobModel.searchKeywords.push(searchKeywordToAdd);
            this.jobModel.searchKeywordToAdd = "";
        }
    };
    AddJobComponent.prototype.removeSearchKeyword = function (searchKeywordToDelete) {
        this.jobModel.searchKeywords = this.jobModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword != searchKeywordToDelete; });
    };
    AddJobComponent.prototype.schedulerEnabledChanged = function () {
        this.schedulerEnabled = !this.schedulerEnabled;
    };
    AddJobComponent.prototype.printModel = function () {
        console.log(this.jobModel);
        console.log(this.schedulerEnabled);
    };
    AddJobComponent.prototype.phoneNumberRequired = function () {
        return this.jobModel.phoneNumber.length < 1 && (this.jobModel.whatsappNotificationEnabled || this.jobModel.smsNotificationEnabled);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AddJobComponent.prototype, "username", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], AddJobComponent.prototype, "isAuthenticated", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddJobComponent.prototype, "jobCreated", void 0);
    AddJobComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-job',
            template: __webpack_require__(/*! ./add-job.component.html */ "./src/app/add-job/add-job.component.html"),
            styles: [__webpack_require__(/*! ./add-job.component.css */ "./src/app/add-job/add-job.component.css")]
        }),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_2__["GithubauthService"], _service_job_job_service__WEBPACK_IMPORTED_MODULE_1__["JobService"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], AddJobComponent);
    return AddJobComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media (max-width: 767px) {\n  /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\n  .body-content {\n    padding-top: 50px;\n    background-color:#f3f3f4;\n  }\n\n}\n\n\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'RepositoryNotifier';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nav-menu/nav-menu.component */ "./src/app/nav-menu/nav-menu.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./jobs/jobs.component */ "./src/app/jobs/jobs.component.ts");
/* harmony import */ var _add_job_add_job_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-job/add-job.component */ "./src/app/add-job/add-job.component.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _service_job_job_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./service/job/job.service */ "./src/app/service/job/job.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _edit_job_edit_job_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./edit-job/edit-job.component */ "./src/app/edit-job/edit-job.component.ts");
/* harmony import */ var _subscription_subscription_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./subscription/subscription.component */ "./src/app/subscription/subscription.component.ts");
/* harmony import */ var _payments_payments_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./payments/payments.component */ "./src/app/payments/payments.component.ts");
/* harmony import */ var _checkout_checkout_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./checkout/checkout.component */ "./src/app/checkout/checkout.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _service_contact_contact_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./service/contact/contact.service */ "./src/app/service/contact/contact.service.ts");
/* harmony import */ var _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./payment-details/payment-details.component */ "./src/app/payment-details/payment-details.component.ts");
/* harmony import */ var _faq_faq_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./faq/faq.component */ "./src/app/faq/faq.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/settings/settings.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var config = {
    onSameUrlNavigation: 'reload'
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_6__["NavMenuComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_8__["JobsComponent"],
                _add_job_add_job_component__WEBPACK_IMPORTED_MODULE_9__["AddJobComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"],
                _edit_job_edit_job_component__WEBPACK_IMPORTED_MODULE_15__["EditJobComponent"],
                _subscription_subscription_component__WEBPACK_IMPORTED_MODULE_16__["SubscriptionComponent"],
                _payments_payments_component__WEBPACK_IMPORTED_MODULE_17__["PaymentsComponent"],
                _checkout_checkout_component__WEBPACK_IMPORTED_MODULE_18__["CheckoutComponent"],
                _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__["ContactComponent"],
                _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_21__["PaymentDetailsComponent"],
                _faq_faq_component__WEBPACK_IMPORTED_MODULE_22__["FaqComponent"],
                _settings_settings_component__WEBPACK_IMPORTED_MODULE_23__["SettingsComponent"],
            ],
            exports: [],
            entryComponents: [_edit_job_edit_job_component__WEBPACK_IMPORTED_MODULE_15__["EditJobComponent"], _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_21__["PaymentDetailsComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"] },
                    { path: 'notifications', component: _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_8__["JobsComponent"] },
                    { path: 'payments', component: _payments_payments_component__WEBPACK_IMPORTED_MODULE_17__["PaymentsComponent"] },
                    { path: 'checkout', component: _checkout_checkout_component__WEBPACK_IMPORTED_MODULE_18__["CheckoutComponent"] },
                    { path: 'contact', component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__["ContactComponent"] },
                    { path: 'settings', component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_23__["SettingsComponent"] },
                    { path: 'faq', component: _faq_faq_component__WEBPACK_IMPORTED_MODULE_22__["FaqComponent"] },
                ], config)
            ],
            providers: [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_10__["GithubauthService"], _service_job_job_service__WEBPACK_IMPORTED_MODULE_12__["JobService"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_13__["AlertifyService"], _service_contact_contact_service__WEBPACK_IMPORTED_MODULE_20__["ContactService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/checkout/checkout.component.css":
/*!*************************************************!*\
  !*** ./src/app/checkout/checkout.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n    max-width: 960px;\n  }\n  \n  .lh-condensed { line-height: 1.25; }\n  \n  .paymentsMain{\n    padding-bottom: 20px;\n}\n  \n  .region{\n    padding-top: 30px;\n    padding-bottom: 10px;\n}"

/***/ }),

/***/ "./src/app/checkout/checkout.component.html":
/*!**************************************************!*\
  !*** ./src/app/checkout/checkout.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container card paymentsMain\">\n  <div class=\"py-5 text-center\">\n    <h2>Checkout</h2>\n    <p class=\"lead\">Please provide your billing address below.</p>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-4 order-md-2 mb-4\">\n      <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\n        <span class=\"text-muted\">Your order</span>\n        <span class=\"badge badge-secondary badge-pill\">1</span>\n      </h4>\n      <ul class=\"list-group mb-3\">\n        <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n          <div>\n            <h6 class=\"my-0\">Premium Plan Pro</h6>\n            <small class=\"text-muted\">Abonement</small>\n          </div>\n          <span class=\"text-muted\">€10</span>\n        </li>\n        <!-- <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n          <div>\n            <h6 class=\"my-0\">Second product</h6>\n            <small class=\"text-muted\">Brief description</small>\n          </div>\n          <span class=\"text-muted\">$8</span>\n        </li>\n        <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n          <div>\n            <h6 class=\"my-0\">Third item</h6>\n            <small class=\"text-muted\">Brief description</small>\n          </div>\n          <span class=\"text-muted\">$5</span>\n        </li>\n        <li class=\"list-group-item d-flex justify-content-between bg-light\">\n          <div class=\"text-success\">\n            <h6 class=\"my-0\">Promo code</h6>\n            <small>EXAMPLECODE</small>\n          </div>\n          <span class=\"text-success\">-$5</span>\n        </li> -->\n        <li class=\"list-group-item d-flex justify-content-between\">\n          <span>Total (EUR)</span>\n          <strong>€10</strong>\n        </li>\n      </ul>\n\n      <!-- <form class=\"card p-2\">\n        <div class=\"input-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Promo code\">\n          <div class=\"input-group-append\">\n            <button type=\"submit\" class=\"btn btn-secondary\">Redeem</button>\n          </div>\n        </div>\n      </form> -->\n    </div>\n    \n    <div class=\"col-md-8 order-md-1\">\n      <h4 class=\"mb-3\">Billing address</h4>\n      <form class=\"needs-validation\" novalidate>\n        <div class=\"row\">\n          <div class=\"col-md-6 mb-3\">\n            <label for=\"firstName\">First Name</label>\n            <input [(ngModel)]=\"billingAddress.firstName\" type=\"text\" class=\"form-control\" id=\"firstName\" name=\"firstName\" placeholder=\"\" value=\"{{billingAddress.firstName}}\" required>\n            <div class=\"invalid-feedback\">\n              Valid first name is required.\n            </div>\n          </div>\n          <div class=\"col-md-6 mb-3\">\n            <label for=\"lastName\">Last Name</label>\n            <input [(ngModel)]=\"billingAddress.lastName\" type=\"text\" class=\"form-control\" id=\"lastName\" name=\"lastName\" placeholder=\"\" value=\"{{billingAddress.lastName}}\" required>\n            <div class=\"invalid-feedback\">\n              Valid last name is required.\n            </div>\n          </div>\n        </div>\n\n        <div class=\"mb-3\">\n          <label for=\"email\">E-Mail</label>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\">@</span>\n            </div>\n            <input  [(ngModel)]=\"billingAddress.eMail\" type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" value=\"{{billingAddress.eMail}}\" placeholder=\"you@example.com\" required>\n            <div class=\"invalid-feedback\" style=\"width: 100%;\">\n              Please enter a valid email address for shipping updates.\n            </div>\n          </div>\n        </div>\n\n        <!-- <div class=\"mb-3\">\n          <label for=\"email\">Email <span class=\"text-muted\">(Optional)</span></label>\n          <input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"you@example.com\">\n          <div class=\"invalid-feedback\">\n            Please enter a valid email address for shipping updates.\n          </div>\n        </div> -->\n\n        <div class=\"mb-3\">\n          <label for=\"address\">Address</label>\n          <input  [(ngModel)]=\"billingAddress.address\" type=\"text\" class=\"form-control\" id=\"address\" name=\"address\" value=\"{{billingAddress.address}}\" placeholder=\"1234 Main St\" required>\n          <div class=\"invalid-feedback\">\n            Please enter your shipping address.\n          </div>\n        </div>\n\n        <div class=\"mb-3\">\n          <label for=\"address2\">Address 2 <span class=\"text-muted\">(Optional)</span></label>\n          <input  [(ngModel)]=\"billingAddress.addressAddition\" type=\"text\" class=\"form-control\" id=\"address2\" name=\"addressAddition\" value=\"{{billingAddress.addressAddition}}\" placeholder=\"Apartment or suite\">\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-5 mb-3\">\n            <label for=\"country\">Country</label>\n            <select  [(ngModel)]=\"billingAddress.country\" class=\"custom-select d-block w-100\" id=\"country\" name=\"country\" required>\n              <option value=\"{{billingAddress.country}}\">Choose...</option>\n              <option>Germany</option>\n            </select>\n            <div class=\"invalid-feedback\">\n              Please select a valid country.\n            </div>\n          </div>\n          <div class=\"col-md-4 mb-3\">\n            <label for=\"city\">City</label>\n            <input  [(ngModel)]=\"billingAddress.city\" type=\"text\" class=\"form-control\" id=\"city\" name=\"city\" value=\"{{billingAddress.city}}\" placeholder=\"\" required>\n            <div class=\"invalid-feedback\">\n              Please provide a valid state.\n            </div>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"zip\">Zip</label>\n            <input  [(ngModel)]=\"billingAddress.postalCode\" type=\"text\" class=\"form-control\" id=\"zip\" name=\"zip\" value=\"{{billingAddress.postalCode}}\" placeholder=\"\" required>\n            <div class=\"invalid-feedback\">\n              Zip code required.\n            </div>\n          </div>\n        </div>\n        <!-- <hr class=\"mb-4\"> -->\n        <!-- <div class=\"custom-control custom-checkbox\">\n          <input type=\"checkbox\" class=\"custom-control-input\" id=\"same-address\">\n          <label class=\"custom-control-label\" for=\"same-address\">Shipping address is the same as my billing address</label>\n        </div> -->\n        <!-- <div class=\"custom-control custom-checkbox\">\n          <input type=\"checkbox\" class=\"custom-control-input\" id=\"save-info\">\n          <label class=\"custom-control-label\" for=\"save-info\">Save this information for next time</label>\n        </div> -->\n        <!-- <hr class=\"mb-4\">\n\n        <h4 class=\"mb-3\">Payment</h4>\n\n        <div class=\"d-block my-3\">\n            <div class=\"custom-control custom-radio\">\n                <input id=\"paypal\" name=\"paymentMethod\" type=\"radio\" class=\"custom-control-input\" checked required>\n                <label class=\"custom-control-label\" for=\"paypal\">PayPal</label>\n              </div>\n          <div class=\"custom-control custom-radio\">\n            <input id=\"credit\" name=\"paymentMethod\" type=\"radio\" class=\"custom-control-input\" required disabled>\n            <label class=\"custom-control-label\" for=\"credit\">Credit card</label>\n          </div>\n          <div class=\"custom-control custom-radio\">\n            <input id=\"debit\" name=\"paymentMethod\" type=\"radio\" class=\"custom-control-input\" required disabled>\n            <label class=\"custom-control-label\" for=\"debit\">Debit card</label>\n          </div>\n        </div> -->\n        <!-- <div class=\"row\">\n          <div class=\"col-md-6 mb-3\">\n            <label for=\"cc-name\">Name on card</label>\n            <input type=\"text\" class=\"form-control\" id=\"cc-name\" placeholder=\"\" required>\n            <small class=\"text-muted\">Full name as displayed on card</small>\n            <div class=\"invalid-feedback\">\n              Name on card is required\n            </div>\n          </div>\n          <div class=\"col-md-6 mb-3\">\n            <label for=\"cc-number\">Credit card number</label>\n            <input type=\"text\" class=\"form-control\" id=\"cc-number\" placeholder=\"\" required>\n            <div class=\"invalid-feedback\">\n              Credit card number is required\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"cc-expiration\">Expiration</label>\n            <input type=\"text\" class=\"form-control\" id=\"cc-expiration\" placeholder=\"\" required>\n            <div class=\"invalid-feedback\">\n              Expiration date required\n            </div>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"cc-cvv\">CVV</label>\n            <input type=\"text\" class=\"form-control\" id=\"cc-cvv\" placeholder=\"\" required>\n            <div class=\"invalid-feedback\">\n              Security code required\n            </div>\n          </div>\n        </div> -->\n        <hr class=\"mb-4\">\n        <button class=\"btn btn-primary btn-lg btn-block\" (click)=\"checkout()\" type=\"button\"><i class=\"fa fa-paypal\"></i> Checkout</button>\n      </form>\n    </div>\n  </div>\n</div>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/checkout/checkout.component.ts":
/*!************************************************!*\
  !*** ./src/app/checkout/checkout.component.ts ***!
  \************************************************/
/*! exports provided: CheckoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutComponent", function() { return CheckoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/payment/payment.service */ "./src/app/service/payment/payment.service.ts");
/* harmony import */ var _model_billingaddress_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/billingaddress-model */ "./src/app/model/billingaddress-model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dto_subscriptionTO__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dto/subscriptionTO */ "./src/app/dto/subscriptionTO.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(githubAuthService, paymentService, document) {
        this.githubAuthService = githubAuthService;
        this.paymentService = paymentService;
        this.document = document;
        this.billingAddress = new _model_billingaddress_model__WEBPACK_IMPORTED_MODULE_3__["BillingAddressModel"]();
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    CheckoutComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (username) {
                    _this.username = username.username;
                });
            }
        });
    };
    CheckoutComponent.prototype.checkout = function () {
        var _this = this;
        var createAbonementTO = new _dto_subscriptionTO__WEBPACK_IMPORTED_MODULE_5__["CreateSusbcriptionTO"]();
        createAbonementTO.amount = 10;
        createAbonementTO.billingAddress = this.billingAddress;
        this.paymentService.createSubscription(createAbonementTO).subscribe(function (redirectUrl) {
            _this.document.location.href = redirectUrl;
        });
    };
    CheckoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkout',
            template: __webpack_require__(/*! ./checkout.component.html */ "./src/app/checkout/checkout.component.html"),
            styles: [__webpack_require__(/*! ./checkout.component.css */ "./src/app/checkout/checkout.component.css")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__["PaymentService"], Object])
    ], CheckoutComponent);
    return CheckoutComponent;
}());



/***/ }),

/***/ "./src/app/contact/contact.component.css":
/*!***********************************************!*\
  !*** ./src/app/contact/contact.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#contactForm{\n    padding-left:15%;\n    padding-right:15%;\n}"

/***/ }),

/***/ "./src/app/contact/contact.component.html":
/*!************************************************!*\
  !*** ./src/app/contact/contact.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container\">\n  <div class=\"card\">\n    <div class=\"card-header p-0\">\n      <div class=\"bg-primary text-white text-center py-2\">\n        <h3><i class=\"fa fa-envelope\"></i> Contact Us:</h3>\n        <p class=\"m-0\">We'll almost never answer.</p>\n      </div>\n    </div>\n    <div class=\"card-body\" id=\"contactForm\">\n\n      <div class=\"mb-3\">\n        <label>Name:</label>\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\" id=\"name-addon\"><i class=\"fa fa-user\"></i></span>\n          </div>\n          <input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Max Patternman\" aria-label=\"Name\"\n            aria-describedby=\"name-addon\" [(ngModel)]=\"contactModel.name\" #name=\"ngModel\" required name>\n        </div>\n        <div *ngIf=\"name.invalid && (name.dirty || name.touched)\">\n          <div class=\"text-danger\" *ngIf=\"name?.errors.required\"><small>Name is required</small></div>\n        </div>\n      </div>\n\n\n\n      <div class=\"mb-3\">\n\n        <label>E-Mail:</label>\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\" id=\"email-addon\"><i class=\"fa fa-envelope\"></i></span>\n          </div>\n          <input id=\"email\" name=\"email\" type=\"email\" class=\"form-control\" placeholder=\"maxpatternman@gmail.com\"\n            aria-label=\"E-Mail\" aria-describedby=\"email-addon\" [(ngModel)]=\"contactModel.email\" #email=\"ngModel\"\n            required email>\n\n        </div>\n        <div *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n          <div class=\"text-danger\" *ngIf=\"email?.errors.required\"><small>Email is required</small></div>\n          <div class=\"text-danger\" *ngIf=\"email?.errors.email\"><small>Email must be a valid email address</small></div>\n        </div>\n      </div>\n\n      <!-- <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.\n      </small> -->\n\n\n      <div class=\"mb-3\">\n\n        <label>Subject:</label>\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\" id=\"subject-addon\"><i class=\"fa fa-bolt\"></i></span>\n          </div>\n          <input id=\"subject\" name=\"subject\" type=\"text\" class=\"form-control\" placeholder=\"I hate this product\"\n            aria-label=\"Subject\" aria-describedby=\"subject-addon\" [(ngModel)]=\"contactModel.subject\" #subject=\"ngModel\"\n            required subject>\n        </div>\n        <div *ngIf=\"subject.invalid && (subject.dirty || subject.touched)\">\n          <div class=\"text-danger\" *ngIf=\"subject?.errors.required\"><small>Subject is required</small></div>\n        </div>\n\n\n      </div>\n\n\n      <div class=\"mb-3\">\n\n        <label>Your Message:</label>\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\" id=\"basic-addon1\"><i class=\"fa fa-pencil\"></i></span>\n          </div>\n          <textarea id=\"message\" name=\"message\" class=\"form-control\" rows=\"10\"\n            placeholder=\"Write your message down here ...\" [(ngModel)]=\"contactModel.message\" #message=\"ngModel\"\n            required message></textarea>\n        </div>\n\n        <div *ngIf=\"message.invalid && (message.dirty || message.touched)\">\n          <div class=\"text-danger\" *ngIf=\"message?.errors.required\"><small>Message is required</small></div>\n        </div>\n      </div>\n\n      <div class=\"text-center\">\n        <button class=\"btn btn-success btn-block py-2\" (click)=\"sendMessage()\">Submit</button>\n      </div>\n    </div>\n\n\n\n  </div>\n</div>\n\n<div class=\"container mt-3 mb-3\">\n  <div class=\"card\">\n    <div class=\"mb-4\">\n    </div>\n    <div class=\"row text-center\">\n      <div class=\"col-md-4\">\n        <a class=\"text-primary\" style=\"font-size:40px;\"><i class=\"fa fa-map-marker\"></i></a>\n        <p>Saarbridges, 66111,<br> Germoney</p>\n      </div>\n      <div class=\"col-md-4\">\n        <a class=\"text-primary\" style=\"font-size:40px;\"><i class=\"fa fa-phone\"></i></a>\n        <p>+ 01 234 567 159, <br> Mon - Tue, 15:00-15:00</p>\n      </div>\n      <div class=\"col-md-4\">\n        <a class=\"text-primary\" style=\"font-size:40px;\"><i class=\"fa fa-envelope\"></i></a>\n        <p>info@repositoryobserver.com <br> sale@repositoryobserver.com</p>\n      </div>\n    </div>\n  </div>\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/contact/contact.component.ts":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _service_contact_contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/contact/contact.service */ "./src/app/service/contact/contact.service.ts");
/* harmony import */ var _model_contact_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/contact-model */ "./src/app/model/contact-model.ts");
/* harmony import */ var _dto_contactTO__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dto/contactTO */ "./src/app/dto/contactTO.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var ContactComponent = /** @class */ (function () {
    function ContactComponent(contactService, githubAuthService, document, alertifyService) {
        this.contactService = contactService;
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.alertifyService = alertifyService;
        this.contactModel = new _model_contact_model__WEBPACK_IMPORTED_MODULE_4__["ContactModel"]();
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    ContactComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (username) {
                    _this.username = username.username;
                });
            }
        });
    };
    ContactComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.checkFormIsInvalid()) {
            this.alertifyService.error("Please provide all necessary information.");
            return;
        }
        var contactMessage = new _dto_contactTO__WEBPACK_IMPORTED_MODULE_5__["AddContactTO"]();
        contactMessage.name = this.contactModel.name;
        contactMessage.email = this.contactModel.email;
        contactMessage.subject = this.contactModel.subject;
        contactMessage.message = this.contactModel.message;
        this.contactService.addContact(contactMessage).subscribe(function (response) {
            console.log(response.status);
            if (response.status === 200) {
                _this.alertifyService.success("Message created.");
            }
            else {
                _this.alertifyService.error("An Error occurred.");
            }
            _this.clearFormData();
        });
    };
    ContactComponent.prototype.clearFormData = function () {
        this.contactModel.name = "";
        this.contactModel.email = "";
        this.contactModel.subject = "";
        this.contactModel.message = "";
    };
    ContactComponent.prototype.checkFormIsInvalid = function () {
        var formIsInvalid = (this.contactModel.email.length < 4 || this.contactModel.name.length < 4 || this.contactModel.subject.length < 4 || this.contactModel.message.length < 20);
        if (formIsInvalid) {
            this.formIsInvalid = true;
            return true;
        }
        return false;
    };
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/contact/contact.component.css")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_contact_contact_service__WEBPACK_IMPORTED_MODULE_3__["ContactService"],
            _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/dto/contactTO.ts":
/*!**********************************!*\
  !*** ./src/app/dto/contactTO.ts ***!
  \**********************************/
/*! exports provided: AddContactTO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContactTO", function() { return AddContactTO; });
var AddContactTO = /** @class */ (function () {
    function AddContactTO() {
    }
    return AddContactTO;
}());



/***/ }),

/***/ "./src/app/dto/jobTO.ts":
/*!******************************!*\
  !*** ./src/app/dto/jobTO.ts ***!
  \******************************/
/*! exports provided: AddJobTO, UpdateJobTO, GetJobTO, Job, DeleteJobTO, JobResultTO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddJobTO", function() { return AddJobTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateJobTO", function() { return UpdateJobTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetJobTO", function() { return GetJobTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Job", function() { return Job; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteJobTO", function() { return DeleteJobTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobResultTO", function() { return JobResultTO; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AddJobTO = /** @class */ (function () {
    function AddJobTO() {
    }
    return AddJobTO;
}());

var UpdateJobTO = /** @class */ (function () {
    function UpdateJobTO() {
    }
    return UpdateJobTO;
}());

var GetJobTO = /** @class */ (function (_super) {
    __extends(GetJobTO, _super);
    function GetJobTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetJobTO;
}(AddJobTO));

var Job = /** @class */ (function () {
    function Job(getJobTO, selected) {
        this.getJobTO = getJobTO;
        this.selected = selected;
    }
    return Job;
}());

var DeleteJobTO = /** @class */ (function () {
    function DeleteJobTO() {
    }
    return DeleteJobTO;
}());

var JobResultTO = /** @class */ (function () {
    function JobResultTO() {
    }
    return JobResultTO;
}());



/***/ }),

/***/ "./src/app/dto/repositoryTO.ts":
/*!*************************************!*\
  !*** ./src/app/dto/repositoryTO.ts ***!
  \*************************************/
/*! exports provided: RepositoryTO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepositoryTO", function() { return RepositoryTO; });
// https://stackoverflow.com/questions/34997128/angular-2-get-values-of-multiple-checked-checkboxes
var RepositoryTO = /** @class */ (function () {
    function RepositoryTO(name, selected) {
        this.name = name;
        this.selected = selected;
    }
    return RepositoryTO;
}());



/***/ }),

/***/ "./src/app/dto/subscriptionTO.ts":
/*!***************************************!*\
  !*** ./src/app/dto/subscriptionTO.ts ***!
  \***************************************/
/*! exports provided: Subscription, CreateSusbcriptionTO, PremiumPlan, Payment, BillingAddressTO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateSusbcriptionTO", function() { return CreateSusbcriptionTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PremiumPlan", function() { return PremiumPlan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Payment", function() { return Payment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingAddressTO", function() { return BillingAddressTO; });
var Subscription = /** @class */ (function () {
    function Subscription() {
    }
    return Subscription;
}());

var CreateSusbcriptionTO = /** @class */ (function () {
    function CreateSusbcriptionTO() {
    }
    return CreateSusbcriptionTO;
}());

var PremiumPlan = /** @class */ (function () {
    function PremiumPlan() {
    }
    return PremiumPlan;
}());

var Payment = /** @class */ (function () {
    function Payment() {
    }
    return Payment;
}());

var BillingAddressTO = /** @class */ (function () {
    function BillingAddressTO() {
    }
    return BillingAddressTO;
}());



/***/ }),

/***/ "./src/app/edit-job/edit-job.component.css":
/*!*************************************************!*\
  !*** ./src/app/edit-job/edit-job.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-job/edit-job.component.html":
/*!**************************************************!*\
  !*** ./src/app/edit-job/edit-job.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title\" id=\"modal-basic-title\">Edit Notification</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form>\n    <div class=\"form-group\">\n      <label for=\"email\"><b>Email address</b></label>\n      <input class=\"form-control\" id=\"email\" name=\"email\" type=\"email\" [(ngModel)]=\"jobModel.email\" aria-describedby=\"emailHelp\"\n        placeholder=\"EMail\" value=\"{{jobModel.email}}\">\n      <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.\n      </small>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"repository\"><b>Repositories</b></label>\n      <div style=\"padding-top: 5px; padding-left:4%;\" *ngFor=\"let repository of jobModel.repositoryTos\" class=\"form-check\">\n        <input type=\"checkbox\" name=\"repository\" class=\"form-check-input\" value=\"{{repository.name}}\"\n          [(ngModel)]=\"repository.selected\" [ngModelOptions]=\"{standalone: true}\">\n        {{repository.name}}\n      </div>\n    </div>\n    <label for=\"searchKeywordToAdd\"><b>Add Search Keywords</b></label>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Add Search Keyword\" id=\"searchKeywordToAdd\"\n          name=\"searchKeywordToAdd\" [(ngModel)]=\"jobModel.searchKeywordToAdd\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-success\" type=\"button\" (click)=\"addSearchKeyword(jobModel.searchKeywordToAdd)\">Add</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"searchKeywords\"><b>SearchKeywords</b></label>\n      <p *ngIf=\"jobModel.searchKeywords == null\">No Search Keywords added yet.</p>\n      <ul name=\"searchKeywords\" id=\"searchKeywords\">\n        <li *ngFor=\"let searchKeyword of jobModel.searchKeywords\">{{searchKeyword}} <button class=\"btn\"\n            style=\"background-color:transparent\" (click)=\"removeSearchKeyword(searchKeyword)\"><i\n              class=\"fa fa-minus-circle\" style=\"color:black\"></i></button></li>\n      </ul>\n    </div>\n    <fieldset disabled>\n      <div class=\"form-group\">\n        <label for=\"frequency\"><b>Frequency</b></label>\n        <select [(ngModel)]=\"selectedJob.getJobTO.frequency\" class=\"form-control\" id=\"frequency\"\n          name=\"frequency\">\n          <option *ngFor=\"let frequency of jobModel.frequencies;\" [ngValue]=\"frequency\">{{frequency}}</option>\n        </select>\n        <small id=\"frequencyHelp\" class=\"form-text text-muted\">In minutes.</small>\n      </div>\n    </fieldset>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" ngbAutofocus class=\"btn btn-outline-dark\" (click)=\"saveJob()\">Save</button>\n</div>"

/***/ }),

/***/ "./src/app/edit-job/edit-job.component.ts":
/*!************************************************!*\
  !*** ./src/app/edit-job/edit-job.component.ts ***!
  \************************************************/
/*! exports provided: EditJobComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditJobComponent", function() { return EditJobComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/repositoryTO */ "./src/app/dto/repositoryTO.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _dto_jobTO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/jobTO */ "./src/app/dto/jobTO.ts");
/* harmony import */ var _service_job_job_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/job/job.service */ "./src/app/service/job/job.service.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _model_job_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/job-model */ "./src/app/model/job-model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditJobComponent = /** @class */ (function () {
    function EditJobComponent(jobService, githubAuthService, alertifyService, activeModal) {
        this.jobService = jobService;
        this.githubAuthService = githubAuthService;
        this.alertifyService = alertifyService;
        this.activeModal = activeModal;
        this.jobModel = new _model_job_model__WEBPACK_IMPORTED_MODULE_7__["AddJobModel"]();
    }
    EditJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCurrentUserRepositories();
        this.getFrequencies();
        this.getCommonKeywords();
        this.selectedJob.getJobTO.searchKeywords.forEach(function (searchKeyword) { return _this.jobModel.searchKeywords.push(searchKeyword); });
        this.jobModel.email = this.selectedJob.getJobTO.email;
    };
    EditJobComponent.prototype.getCurrentUserRepositories = function () {
        var _this = this;
        this.githubAuthService.getCurrentUsersRepositories().subscribe(function (repositories) {
            _this.jobModel.repositoryTos = [];
            repositories.forEach(function (repository) {
                if (_this.selectedJob.getJobTO.repositories.some(function (x) { return x === repository; })) {
                    _this.jobModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__["RepositoryTO"](repository, true));
                }
                else {
                    _this.jobModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__["RepositoryTO"](repository, false));
                }
            });
        });
    };
    EditJobComponent.prototype.uncheckUserRepositories = function () {
        this.jobModel.repositoryTos.forEach(function (repository) {
            repository.selected = false;
        });
    };
    EditJobComponent.prototype.getFrequencies = function () {
        var _this = this;
        this.jobService.getFrequencies().subscribe(function (frequencies) {
            _this.jobModel.frequencies = frequencies;
            _this.jobModel.selectedFrequency = _this.jobModel.frequencies[0];
        });
    };
    EditJobComponent.prototype.getCommonKeywords = function () {
        var _this = this;
        this.jobService.getCommonKeywords().subscribe(function (commonKeywords) { return _this.jobModel.commonKeywords = commonKeywords; });
    };
    EditJobComponent.prototype.addSearchKeyword = function (searchKeywordToAdd) {
        if (this.jobModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword == searchKeywordToAdd; }).length < 1) {
            this.jobModel.searchKeywords.push(searchKeywordToAdd);
            this.jobModel.searchKeywordToAdd = "";
        }
    };
    EditJobComponent.prototype.removeSearchKeyword = function (searchKeywordToDelete) {
        this.jobModel.searchKeywords = this.jobModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword != searchKeywordToDelete; });
    };
    EditJobComponent.prototype.saveJob = function () {
        var _this = this;
        this.alertifyService.confirm("Save Changes?", "Do you want to save the changes you made to your notification?", function () {
            var job = new _dto_jobTO__WEBPACK_IMPORTED_MODULE_3__["AddJobTO"]();
            job.email = _this.jobModel.email;
            job.username = _this.username;
            job.searchKeywords = _this.jobModel.searchKeywords;
            job.frequency = _this.selectedJob.getJobTO.frequency;
            job.repositories = _this.getSelectedRepositories();
            _this.jobService.updateJob(job).subscribe(function (result) {
                if (result.status == 200) {
                    _this.selectedJob.getJobTO.repositories = job.repositories;
                    _this.selectedJob.getJobTO.email = job.email;
                    _this.selectedJob.getJobTO.searchKeywords = job.searchKeywords;
                    _this.alertifyService.success("Notification updated.");
                }
                else {
                    _this.alertifyService.error("An error occured.");
                }
                _this.activeModal.close();
            });
        });
    };
    EditJobComponent.prototype.getSelectedRepositories = function () {
        var selectedRepositories = [];
        selectedRepositories = this.jobModel.repositoryTos.filter(function (repository) { return repository.selected === true; }).map(function (repository) { return repository.name; });
        return selectedRepositories;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _dto_jobTO__WEBPACK_IMPORTED_MODULE_3__["Job"])
    ], EditJobComponent.prototype, "selectedJob", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], EditJobComponent.prototype, "username", void 0);
    EditJobComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-job',
            template: __webpack_require__(/*! ./edit-job.component.html */ "./src/app/edit-job/edit-job.component.html"),
            styles: [__webpack_require__(/*! ./edit-job.component.css */ "./src/app/edit-job/edit-job.component.css")]
        }),
        __metadata("design:paramtypes", [_service_job_job_service__WEBPACK_IMPORTED_MODULE_4__["JobService"],
            _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_5__["GithubauthService"],
            _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"]])
    ], EditJobComponent);
    return EditJobComponent;
}());



/***/ }),

/***/ "./src/app/faq/faq.component.css":
/*!***************************************!*\
  !*** ./src/app/faq/faq.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".question{\n    display: flex;\n    flex-direction: column ;\n}\n\n.faq-main{\n    padding-bottom: 20px;\n}"

/***/ }),

/***/ "./src/app/faq/faq.component.html":
/*!****************************************!*\
  !*** ./src/app/faq/faq.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container faq-main\">\n  <div class=\"card\">\n    <div class=\"card-body\">\n      <div class=\"card-title\">\n\n        <div class=\"col-md-8 offset-md-2\">\n\n\n        <h1 class =\"mb-3\"><strong>F</strong>requently <strong>A</strong>sked <strong>Q</strong>uestions</h1>\n          \n        <hr>\n\n      <div class=\"mt-3 question\">\n        <h3>1. What is this all about?</h3>\n        <p class=\"ml-1\">This service helps you not leaking any vulnerable information when pushing to public repos.</p>\n      </div>\n      <div class=\"question\">\n        <h3>2. How does it work?</h3>\n        <p class=\"ml-1\">The service either scans your repositories every x minutes or it creates a repositoryhook and checks your repository every time any changes happen.\n          When one of the specied keywords is found, a notification gets sent to you either via E-Mail, WhatsApp or SMS.\n          Mobile messages are sent using Twilio.\n        </p>\n      </div>\n      <div class=\"question\">\n        <h3>3. Why does the app need permissions for GitHub?</h3>\n        <p class=\"ml-1\">Creating webhooks for repositories is only possible with full access to the account.\n          Creating scheduled jobs only uses the public GitHub API and therefore is possible without full access.\n        </p>\n      </div>\n      <div class=\"question\">\n        <h3>4. Why is this shit so slow?</h3>\n        <p class=\"ml-1\">It is hosted on a free heroku dyno.</p>\n      </div>\n      <div class=\"question\">\n          <h3>5. Are you going to collect my data?</h3>\n          <p class=\"ml-1\">Yes.<br>You can get a full dump of your data on the <a [routerLink]='[\"/settings\"]'>settings</a> page.</p>\n        </div>\n\n    </div>\n  \n  </div></div>\n  </div>\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/faq/faq.component.ts":
/*!**************************************!*\
  !*** ./src/app/faq/faq.component.ts ***!
  \**************************************/
/*! exports provided: FaqComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqComponent", function() { return FaqComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqComponent = /** @class */ (function () {
    function FaqComponent(githubAuthService) {
        this.githubAuthService = githubAuthService;
    }
    FaqComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    FaqComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (username) {
                    _this.username = username.username;
                });
            }
        });
    };
    FaqComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-faq',
            template: __webpack_require__(/*! ./faq.component.html */ "./src/app/faq/faq.component.html"),
            styles: [__webpack_require__(/*! ./faq.component.css */ "./src/app/faq/faq.component.css")]
        }),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"]])
    ], FaqComponent);
    return FaqComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    /* Set the fixed height of the footer here */\n    height: 60px;\n    line-height: 60px; /* Vertically center the text there */\n  }"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer bg-primary text-white\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-2\">\n        <a [routerLink]='[\"/faq\"]' style=\"margin-left:1%;\">FAQ</a>\n        <a [routerLink]='[\"/contact\"]' style=\"margin-left:5%;\">Contact</a>\n      </div>\n      <div class=\"col-7\">\n      </div>\n      <div class=\"col-3\" style=\"display: flex;align-items: center;\">\n        <div class=\"input-group\">\n          <input type=\"number\" min=\"1\" step=\"any\" class=\"form-control\" [(ngModel)]=\"amount\" placeholder=\"0\">\n          <div class=\"input-group-append\">\n            <span class=\"input-group-text\">€</span>\n          </div>\n          <div class=\"input-group-append\">\n            <button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"createDonation()\"><i class=\"fa fa-paypal\"></i> Donate</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</footer>"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/payment/payment.service */ "./src/app/service/payment/payment.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var FooterComponent = /** @class */ (function () {
    function FooterComponent(paymentService, document) {
        this.paymentService = paymentService;
        this.document = document;
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.createDonation = function () {
        var _this = this;
        this.paymentService.createPayment(this.amount).subscribe(function (redirectUrl) {
            _this.document.location.href = redirectUrl;
        });
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_payment_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"], Object])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".homeMain{\n    padding-bottom: 20px;\n}\n.region{\n    padding-top: 30px;\n}\n.rnCard{\n    background-color: #c9c9c9;\n  }"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container homeMain\">\n    <div class=\"region\">\n    <div class=\"jumbotron bg-primary text-white\" style=\"margin-bottom: -5px\">\n        <h1 class=\"display-4\" *ngIf=\"isAuthenticated; else showNotAnonymousGreeting\">Hello, {{username}}!</h1>\n        <ng-template #showNotAnonymousGreeting>\n            <h1>Hello, there!</h1>\n        </ng-template>\n        <p class=\"lead\">Welcome to RepositoryObserver, a simple service to observe your github repositories.</p>\n        <hr class=\"my-4 bg-white\">\n        <!-- <p>RepositoryObserver was built using:</p>\n        <ul>\n            <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a\n                    href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side\n                code\n            </li>\n            <li><a href='https://angular.io/'>Angular</a> and <a href='http://www.typescriptlang.org/'>TypeScript</a>\n                for\n                client-side code\n            </li>\n            <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>\n            <li><a href='http://font-awesome.com/'>Font Awesome</a> for icons</li>\n        </ul> -->\n                        <p>\n                            <strong>RepositoryObserver</strong> offers a service to <code>observe</code> your\n                            <code>repositories</code> for\n                            accidentally leaked <code>vulnerable data</code> like passwords or api-keys.<br>\n                            Simply authenticate with your Github account and select the <code>repositories</code> you\n                            want to be\n                            observed.<br>\n                            The service allows you to specify search keywords and select the frequency of a search process.\n                        </p>\n            <button style=\"margin-bottom:-3%;\" *ngIf=\"!isAuthenticated\" type=\"button\" class=\"btn btn-success btn-lg\" (click)=\"login()\"><i class=\"fa fa-github\"></i> Sign Up</button>\n                        \n        <div>\n        </div>\n    </div>\n</div>\n    <div class=\"region\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <div class=\"card border-0 mb-3 h-100\" >\n                    <div class=\"card-body bg-success text-white\">\n                        <h2 class=\"card-title\">RepositoryObserver</h2>\n                        <p class=\"card-text\">\n                            <strong>RepositoryObserver</strong> offers a service to observe your\n                            <code>repositories</code> for\n                            accidentally leaked <code>passwords</code>.<br>\n                            Simply authenticate with your Github account and select the <code>repositories</code> you\n                            want to be\n                            observed.<br>\n                            You can choose a frequency at which the scans are started:\n                        </p>\n                        <ul>\n                            <li>15 minutes</li>\n                            <li>30 minutes</li>\n                            <li>1 hour</li>\n                            <li>3 hours</li>\n                            <li>12 hours</li>\n                            <li>1 day</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-sm-6\">\n                <div class=\"card border-0 mb-3 h-100\">\n                    <div class=\"card-body bg-primary text-white\">\n                        <h2 class=\"card-title\">Inspect SourceCode</h2>\n                        <p class=\"card-text\">This project is open source and its source code can be reviewed <a\n                                href=\"https://github.com/MorrisMorrison/RepositoryObserver\">here</a></p>\n                        <p>The Application stores only the username and repository names and accesses them through\n                            Github's public API.\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"region\">\n            <app-subscription></app-subscription>\n        </div>\n    \n\n    <!-- <div class=\"region\">\n        <app-add-notification [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-add-notification>\n    </div> -->\n\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_job_add_job_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../add-job/add-job.component */ "./src/app/add-job/add-job.component.ts");
/* harmony import */ var _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../nav-menu/nav-menu.component */ "./src/app/nav-menu/nav-menu.component.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var HomeComponent = /** @class */ (function () {
    function HomeComponent(githubAuthService, document, baseUrl, alertifyService) {
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.baseUrl = baseUrl;
        this.alertifyService = alertifyService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    HomeComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (username) {
                    _this.username = username.username;
                });
            }
        });
    };
    HomeComponent.prototype.login = function () {
        this.document.location.href = this.baseUrl + "api/auth/login";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_4__["NavMenuComponent"]),
        __metadata("design:type", _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_4__["NavMenuComponent"])
    ], HomeComponent.prototype, "navMenuComponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_add_job_add_job_component__WEBPACK_IMPORTED_MODULE_3__["AddJobComponent"]),
        __metadata("design:type", _add_job_add_job_component__WEBPACK_IMPORTED_MODULE_3__["AddJobComponent"])
    ], HomeComponent.prototype, "addJobComponent", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])), __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, String, _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/jobs/jobs.component.css":
/*!*****************************************!*\
  !*** ./src/app/jobs/jobs.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".notificationsMain{\n    padding-top: 10px;\n    padding-bottom: 20px;\n}\n\n.button-group{\n    display:flex; justify-content:flex-end;\n}"

/***/ }),

/***/ "./src/app/jobs/jobs.component.html":
/*!******************************************!*\
  !*** ./src/app/jobs/jobs.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container jobsMain\">\n    <div class=\"card border-0\">\n        <div class=\"card-header ro-card-header\">\n            <span>\n                <i class=\"fa fa-th-list\"></i>\n                <h5>My Notifications</h5>\n            </span>\n            <a data-toggle=\"collapse\" href=\"#isCollapsedJobs\" role=\"button\" aria-expanded=\"false\"\n                aria-controls=\"isCollapsedJobs\">\n                <i class=\"fa fa-chevron-down \"></i>\n            </a>\n        </div>\n        <div class=\"card-body collapse show\" id=\"isCollapsedJobs\">\n            <p class=\"card-text\">You can only have one NotificationTask per Frequency, so your maximum number of tasks\n                equals the maximum number\n                of\n                frequencies available.</p>\n            <div *ngIf=\"jobs.length < 1\">\n                <p class=\"text-info\">You haven't created any jobs yet.</p>\n            </div>\n            <div *ngIf=\"jobs.length > 0\">\n                <table class=\"table table-sm table-hover\">\n                    <caption class=\"text-secondary\"> See results below by clicking on a row.</caption>\n                    <thead class=\"thead bg-success text-white\">\n                        <tr>\n                            <th scope=\"col\">Select</th>\n                            <th scope=\"col\">#</th>\n                            <th scope=\"col\">EMail</th>\n                            <th scope=\"col\">Frequency</th>\n                            <th scope=\"col\">Repositories</th>\n                            <th scope=\"col\">Search Keywords</th>\n                            <th scope=\"col\">Last Executed</th>\n                            <th scope=\"col\">Status</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let job of jobs; let i = index\" [attr.data-index]=\"i\"\n                            (click)=\"getJobResults(job.getJobTO.frequency)\">\n                            <td>\n                                <input id=\"test\" name=\"{{job.getJobTO.id}}\" type=\"checkbox\"\n                                    value=\"{{job.getJobTO.id}}\" [(ngModel)]=\"job.selected\">\n                                <label for=\"test\"></label>\n                            </td>\n                            <td scope=\"row\">{{i+1}}</td>\n                            <td>{{job.getJobTO.email}}</td>\n                            <td>{{job.getJobTO.frequency}} minutes</td>\n                            <td>\n                                <ul>\n                                    <li *ngFor=\"let repository of job.getJobTO.repositories\">\n                                        {{repository}}</li>\n                                </ul>\n                            </td>\n                            <td>\n                                <ul>\n                                    <li *ngFor=\"let searchKeyword of job.getJobTO.searchKeywords\">\n                                        {{searchKeyword}}</li>\n                                </ul>\n                            </td>\n                            <td *ngIf=\"job.getJobTO.status != 'INIT'; else showNever\">\n                                {{job.getJobTO.lastExecutedAt | date:'dd.MM.yyyy HH:mm'}}</td>\n                            <ng-template #showNever>\n                                <td>Never</td>\n                            </ng-template>\n                            <td>{{job.getJobTO.status}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <button style=\"margin-right: 1%; width:10%;\" type=\"button\" class=\"btn btn-success\"\n                    (click)=\"editJob()\">Edit</button>\n                <button type=\"button\" style=\"width:10%;\" (click)=\"deleteJobs()\"\n                    class=\"btn btn-info\">Delete</button>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"jobs.length > 0\" class=\"region\">\n        <div class=\"card border-0\">\n            <div class=\"card-header ro-card-header\">\n                <span>\n                    <i class=\"fa fa-columns\"></i>\n                    <h5>Results</h5>\n                </span>\n                <a data-toggle=\"collapse\" href=\"#collapseResults\" role=\"button\" aria-expanded=\"false\"\n                    aria-controls=\"collapseResults\">\n                    <i class=\"fa fa-chevron-down \"></i>\n                </a>\n            </div>\n            <div class=\"card-body collapse show\" id=\"collapseResults\">\n                <p class=\"card-text\">All results for a selected Task are provided below.\n                </p>\n                <div *ngIf=\"jobResultTos === null\">\n                    <p class=\"text-info\">No results found for the selected NotificationTask.</p>\n                </div>\n                <table style=\"table-layout: fixed; width:100%\" *ngIf=\"jobResultTos.length > 0\" id=\"resultTable\"\n                    class=\"table table-sm table-hover\">\n                    <caption class=\"text-secondary\"> See details by clicking on a row.</caption>\n                    <thead class=\"thead table-success\">\n                        <tr>\n                            <th scope=\"col\">#</th>\n                            <th scope=\"col\">RepositoryName</th>\n                            <th scope=\"col\">Name</th>\n                            <th scope=\"col\">Path</th>\n                            <th scope=\"col\">Url</th>\n                            <th scope=\"col\">CreatedAt</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr (click)=\"collapseControl[key] = !collapseControl[key]\"\n                            [attr.aria-expanded]=\"!collapseControl[key]\" aria-controls=\"key\"\n                            *ngFor=\"let key of keys; let i = index\" [attr.data-index]=\"i\">\n                            <td>#</td>\n                            <td>{{jobResults[key][0].repositoryName}}</td>\n                            <td>{{jobResults[key][0].name}}</td>\n                            <td>{{jobResults[key][0].path}}</td>\n                            <td><a href=\"{{jobResults[key][0].url}}\">Go to GitHub</a></td>\n                            <td>{{jobResults[key][0].createdAt | date:'dd.MM.yyyy HH:mm'}}</td>\n                        </tr>\n                        <ng-template ngFor let-key [ngForOf]=\"keys\" let-keyIndex=\"index\">\n                            <ng-template ngFor let-result [ngForOf]=\"jobResults[key]\" let-resultIndex=\"index\">\n                                <tr [ngbCollapse]=\"collapseControl[key]\">\n                                    <td>{{resultIndex+1}}</td>\n                                    <td>{{result.repositoryName}}</td>\n                                    <td>{{result.name}}</td>\n                                    <td>{{result.path}}</td>\n                                    <td><a href=\"{{result.url}}\">Go to GitHub</a></td>\n                                    <td>{{result.createdAt | date:'dd.MM.yyyy HH:mm'}}</td>\n                                </tr>\n                            </ng-template>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"region\">\n        <app-add-job [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"\n            (jobCreated)=\"jobCreated($event)\"></app-add-job>\n    </div>\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/jobs/jobs.component.ts":
/*!****************************************!*\
  !*** ./src/app/jobs/jobs.component.ts ***!
  \****************************************/
/*! exports provided: JobsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobsComponent", function() { return JobsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_job_job_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/job/job.service */ "./src/app/service/job/job.service.ts");
/* harmony import */ var _dto_jobTO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dto/jobTO */ "./src/app/dto/jobTO.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _edit_job_edit_job_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../edit-job/edit-job.component */ "./src/app/edit-job/edit-job.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var JobsComponent = /** @class */ (function () {
    function JobsComponent(jobService, githubAuthService, alertifyService, modalService) {
        this.jobService = jobService;
        this.githubAuthService = githubAuthService;
        this.alertifyService = alertifyService;
        this.modalService = modalService;
        this.jobs = [];
        this.jobResults = {};
        this.jobTos = [];
        this.keys = [];
        this.jobResultTos = [];
        this.collapseControl = {};
        this.isCollapsedJobs = false;
    }
    JobsComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    JobsComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (currentUser) {
                    _this.username = currentUser.username;
                });
                _this.initData();
            }
        });
    };
    JobsComponent.prototype.initData = function () {
        this.getAllJobs();
    };
    JobsComponent.prototype.getAllJobs = function () {
        var _this = this;
        this.jobService.getJobs().subscribe(function (jobTos) {
            _this.jobTos = jobTos;
            _this.jobTos.forEach(function (jobTO) {
                _this.jobs.push(new _dto_jobTO__WEBPACK_IMPORTED_MODULE_2__["Job"](jobTO, false));
            });
            if (_this.jobs.length >= 1) {
                _this.getJobResults(_this.jobs[0].getJobTO.frequency);
            }
        });
    };
    JobsComponent.prototype.getJobResults = function (frequency) {
        var _this = this;
        this.jobService.getJobResults(frequency).subscribe(function (jobResultsTos) {
            _this.jobResultTos = jobResultsTos;
            if (_this.jobResultTos == null) {
                _this.jobResultTos = [];
            }
            _this.jobResultTos.forEach(function (resultTO) {
                if (_this.jobResults[resultTO.name + "|" + resultTO.path] == null || _this.jobResults[resultTO.name + "|" + resultTO.path].length < 1) {
                    var results = [];
                    results.push(resultTO);
                    _this.jobResults[resultTO.name + "|" + resultTO.path] = results;
                    _this.keys.push(resultTO.name + "|" + resultTO.path);
                    _this.collapseControl[resultTO.name + "|" + resultTO.path] = true;
                }
                else {
                    _this.jobResults[resultTO.name + "|" + resultTO.path].push(resultTO);
                }
            });
            console.log(_this.keys);
        });
    };
    JobsComponent.prototype.deleteJobs = function () {
        var _this = this;
        this.alertifyService.confirm("Delete Notification", "Are you sure you want to delete this notification?", function () {
            var selectedJobs = _this.getSelectedJobs();
            selectedJobs.forEach(function (selectedJob) {
                _this.jobService.deleteJob(selectedJob.getJobTO.frequency).subscribe(function (result) {
                    if (result.status == 200) {
                        _this.jobs.splice(_this.jobs.indexOf(selectedJob));
                        _this.alertifyService.success("Notification deleted.");
                    }
                    else {
                        _this.alertifyService.error("An error occured.");
                    }
                });
            });
        });
    };
    JobsComponent.prototype.editJob = function () {
        // const modalRef = this.modalService.open(EditJobComponent, { size: 'lg' });
        var modalRef = this.modalService.open(_edit_job_edit_job_component__WEBPACK_IMPORTED_MODULE_6__["EditJobComponent"]);
        modalRef.componentInstance.selectedJob = this.getSelectedJob();
        modalRef.componentInstance.username = this.username;
    };
    JobsComponent.prototype.getSelectedJobs = function () {
        return this.jobs.filter(function (notification) { return notification.selected == true; });
    };
    JobsComponent.prototype.getSelectedJob = function () {
        var selectedJobs = this.getSelectedJobs();
        if (selectedJobs != null) {
            this.selectedJob = selectedJobs[0];
            return this.selectedJob;
        }
    };
    JobsComponent.prototype.jobCreated = function (jobCreated) {
        if (jobCreated == true) {
            this.jobs = [];
            this.getAllJobs();
        }
    };
    JobsComponent.prototype.uncheckJobs = function () {
        this.jobs.forEach(function (job) {
            job.selected = false;
        });
    };
    JobsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jobs',
            template: __webpack_require__(/*! ./jobs.component.html */ "./src/app/jobs/jobs.component.html"),
            styles: [__webpack_require__(/*! ./jobs.component.css */ "./src/app/jobs/jobs.component.css")],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]]
        }),
        __metadata("design:paramtypes", [_service_job_job_service__WEBPACK_IMPORTED_MODULE_1__["JobService"],
            _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_3__["GithubauthService"],
            _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]])
    ], JobsComponent);
    return JobsComponent;
}());



/***/ }),

/***/ "./src/app/model/billingaddress-model.ts":
/*!***********************************************!*\
  !*** ./src/app/model/billingaddress-model.ts ***!
  \***********************************************/
/*! exports provided: BillingAddressModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingAddressModel", function() { return BillingAddressModel; });
var BillingAddressModel = /** @class */ (function () {
    function BillingAddressModel() {
    }
    return BillingAddressModel;
}());



/***/ }),

/***/ "./src/app/model/contact-model.ts":
/*!****************************************!*\
  !*** ./src/app/model/contact-model.ts ***!
  \****************************************/
/*! exports provided: ContactModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactModel", function() { return ContactModel; });
var ContactModel = /** @class */ (function () {
    function ContactModel() {
        this.name = "";
        this.email = "";
        this.subject = "";
        this.message = "";
    }
    return ContactModel;
}());



/***/ }),

/***/ "./src/app/model/job-model.ts":
/*!************************************!*\
  !*** ./src/app/model/job-model.ts ***!
  \************************************/
/*! exports provided: AddJobModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddJobModel", function() { return AddJobModel; });
var AddJobModel = /** @class */ (function () {
    function AddJobModel() {
        this.repositories = [];
        this.repositoryTos = [];
        this.frequencies = [];
        this.commonKeywords = [];
        this.searchKeywords = [];
        this.whatsappNotificationEnabled = false;
        this.emailNotificationEnabled = false;
        this.phoneNumber = "";
        this.schedulerEnabled = true;
    }
    return AddJobModel;
}());



/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.css":
/*!*************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a.navbar-brand {\n  white-space: normal;\n  text-align: center;\n  word-break: break-all;\n}\n\nhtml {\n  font-size: 14px;\n}\n\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.box-shadow {\n  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);\n}\n"

/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.html":
/*!**************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\n  <nav class='navbar navbar-expand-sm navbar-toggleable-sm bg-primary box-shadow mb-3'>\n    <div class=\"container\">\n      <a class=\"navbar-brand text-white\" [routerLink]='[\"/\"]'><i class=\"fa fa-search\"></i> RepositoryObserver</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" aria-label=\"Toggle navigation\"\n        [attr.aria-expanded]=\"isExpanded\" (click)=\"toggle()\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse\" [ngClass]='{\"show\": isExpanded}'>\n        <ul class=\"navbar-nav flex-grow\">\n          <li class=\"nav-item\" [routerLinkActive]='[\"link-active\"]' [routerLinkActiveOptions]='{ exact: true }'>\n            <a class=\"nav-link text-white\" [routerLink]='[\"/\"]'><i class=\"fa fa-home\"></i> Home</a>\n          </li>\n          <li *ngIf=\"isAuthenticated\" class=\"nav-item\" [routerLinkActive]='[\"link-active\"]'>\n            <a class=\"nav-link text-white\" [routerLink]='[\"/notifications\"]'><i class=\"fa fa-th-list\"></i> My Notifications</a>\n          </li>\n          <li *ngIf=\"!isAuthenticated\" class=\"nav-item\">\n            <button class=\"btn btn-link\" (click)=\"login()\"><i class=\"fa fa-github\"></i> Sign In</button>\n          </li>\n          <li *ngIf=\"isAuthenticated\"  class=\"nav-item dropdown\">\n            <a class=\"nav-link dropdown-toggle\"  href=\"\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              <i class=\"fa fa-github\"></i> {{username}}\n            </a>\n            <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n              <a class=\"btn btn-link\" [routerLink]='[\"/payments\"]'><i class=\"fa fa-dollar\"></i> Payments</a>\n              <a class=\"btn btn-link\" [routerLink]='[\"/settings\"]'><i class=\"fa fa-cog\"></i> Settings</a>\n              <div class=\"dropdown-divider\"></div>\n              <button class=\"btn btn-link\" (click)=\"logout()\"><i class=\"fa fa-sign-out\"></i> Logout</button>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</header>\n\n"

/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.ts":
/*!************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.ts ***!
  \************************************************/
/*! exports provided: NavMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavMenuComponent", function() { return NavMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(githubAuthService, document, router, alertifyService, baseUrl) {
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.router = router;
        this.alertifyService = alertifyService;
        this.baseUrl = baseUrl;
        this.isExpanded = false;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    };
    NavMenuComponent.prototype.collapse = function () {
        this.isExpanded = false;
    };
    NavMenuComponent.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    NavMenuComponent.prototype.logout = function () {
        var _this = this;
        this.githubAuthService.logout().subscribe(function (response) {
            _this.router.navigate(['home']);
            _this.alertifyService.success("Logged out.");
        });
    };
    NavMenuComponent.prototype.login = function () {
        this.document.location.href = this.baseUrl + "api/auth/login";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], NavMenuComponent.prototype, "isAuthenticated", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NavMenuComponent.prototype, "username", void 0);
    NavMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nav-menu',
            template: __webpack_require__(/*! ./nav-menu.component.html */ "./src/app/nav-menu/nav-menu.component.html"),
            styles: [__webpack_require__(/*! ./nav-menu.component.css */ "./src/app/nav-menu/nav-menu.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])), __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"], String])
    ], NavMenuComponent);
    return NavMenuComponent;
}());



/***/ }),

/***/ "./src/app/payment-details/payment-details.component.css":
/*!***************************************************************!*\
  !*** ./src/app/payment-details/payment-details.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".payment-details-item{\n    display:flex;\n    flex-direction: column;\n}"

/***/ }),

/***/ "./src/app/payment-details/payment-details.component.html":
/*!****************************************************************!*\
  !*** ./src/app/payment-details/payment-details.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title\" id=\"modal-basic-title\"><i class=\"fa fa-info\"></i><span class=\"ml-1\">View Payment</span></h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12 order-md-1\">\n        <h4 class=\"mb-3\"><i class=\"fa fa-dollar\"></i> General</h4>\n        <div class=\"row\">\n            <div class=\"col-md-4 mb-3 payment-details-item\">\n                <span>Payment Type</span>\n                <span><i class=\"fa fa-paypal\"></i> {{payment.paymentType}}</span>\n              </div>\n              <div class=\"col-md-4 mb-3 payment-details-item\">\n                  <span>Amount</span>\n                  <span>{{payment.amount}} €</span>\n                </div>\n              <div class=\"col-md-4 mb-3 payment-details-item\">\n                <span>Date</span>\n                <span>{{payment.paymentDate | date:'dd.MM.yyyy HH:mm'}}</span>\n              </div>\n          </div>\n      </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-md-12 order-md-1\">\n        <h4 class=\"mb-3\"><i class=\"fa fa-address-card\"></i> Billing Address</h4>\n        <div class=\"row\">\n          <div class=\"col-md-6 mb-3 payment-details-item\">\n            <span>First Name</span>\n            <span>{{payment.billingAddress.firstName}}</span>\n          </div>\n          <div class=\"col-md-6 mb-3 payment-details-item\">\n            <span >Last Name</span>\n            <span>{{payment.billingAddress.lastName}}</span>\n          </div>\n        </div>\n        <div class=\"row\">\n\n          <div class=\"col mb-3 payment-details-item\">\n            <span>E-Mail</span>\n            <span id=\"email\">{{payment.billingAddress.eMail}}</span>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col mb-3 payment-details-item\">\n            <span >Address </span>\n            <span>{{payment.billingAddress.address}}</span>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col mb-3 payment-details-item\">\n            <span >Address 2</span>\n            <span>{{payment.billingAddress.addressAddition}}</span>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-4 mb-3 payment-details-item\">\n            <span >Country</span>\n            <span>{{payment.billingAddress.country}}</span>\n          </div>\n          <div class=\"col-md-4 mb-3 payment-details-item\">\n            <span >City</span>\n            <span>{{payment.billingAddress.city}}</span>\n          </div>\n          <div class=\"col-md-4 mb-3 payment-details-item\">\n            <span >Zip</span>\n            <span>{{payment.billingAddress.postalCode}}</span>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" ngbAutofocus class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Ok click')\">Go\n    Back</button>\n</div>"

/***/ }),

/***/ "./src/app/payment-details/payment-details.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/payment-details/payment-details.component.ts ***!
  \**************************************************************/
/*! exports provided: PaymentDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentDetailsComponent", function() { return PaymentDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dto_subscriptionTO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/subscriptionTO */ "./src/app/dto/subscriptionTO.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentDetailsComponent = /** @class */ (function () {
    function PaymentDetailsComponent(activeModal) {
        this.activeModal = activeModal;
    }
    PaymentDetailsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _dto_subscriptionTO__WEBPACK_IMPORTED_MODULE_1__["Payment"])
    ], PaymentDetailsComponent.prototype, "payment", void 0);
    PaymentDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payment-details',
            template: __webpack_require__(/*! ./payment-details.component.html */ "./src/app/payment-details/payment-details.component.html"),
            styles: [__webpack_require__(/*! ./payment-details.component.css */ "./src/app/payment-details/payment-details.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"]])
    ], PaymentDetailsComponent);
    return PaymentDetailsComponent;
}());



/***/ }),

/***/ "./src/app/payments/payments.component.css":
/*!*************************************************!*\
  !*** ./src/app/payments/payments.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".paymentsMain{\n    padding-bottom: 20px;\n}\n.region{\n    padding-top: 20px;\n    padding-bottom: 10px;\n}\n.order-card {\n    color: #fff;\n}\n.bg-c-blue {\n    background: linear-gradient(45deg,#4099ff,#73b4ff);\n}\n.bg-c-green {\n    background: linear-gradient(45deg,#2ed8b6,#59e0c5);\n}\n.bg-c-yellow {\n    background: linear-gradient(45deg,#FFB64D,#ffcb80);\n}\n.bg-c-pink {\n    background: linear-gradient(45deg,#FF5370,#ff869a);\n}\n.card .card-block {\n    padding: 25px;\n}\n.order-card i {\n    font-size: 26px;\n}\n.order-card:hover{\n    -webkit-filter: brightness(120%);\n            filter: brightness(120%)\n}\n.f-left {\n    float: left;\n}\n.f-right {\n    float: right;\n}\n    \n"

/***/ }),

/***/ "./src/app/payments/payments.component.html":
/*!**************************************************!*\
  !*** ./src/app/payments/payments.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container paymentsMain\">\n    <div class=\"region\">\n        <div class=\"card border-0\">\n            <div class=\"card-header ro-card-header\">\n                <span>\n                    <i class=\"fa fa-credit-card\"></i>\n                    <h5>My Premium Plan</h5>\n                </span>\n                <a data-toggle=\"collapse\" href=\"#collapsePremiumPlan\" role=\"button\" aria-expanded=\"false\"\n                    aria-controls=\"collapsePremiumPlan\">\n                    <i class=\"fa fa-chevron-down \"></i>\n                </a>\n            </div>\n            <div class=\"card-body collapse show\" id=\"collapsePremiumPlan\">\n                <div class=\"row\" *ngIf=\"subscription != null\">\n                    <!-- https://www.bootdey.com/snippets/view/Gradients-dashboard-cards#css -->\n                    <div class=\"col-md-4 col-xl-4\">\n                        <div class=\"card bg-primary order-card\">\n                            <div class=\"card-block\">\n                                <h6 class=\"m-b-20\">PremiumPlan</h6>\n                                <h2 class=\"text-right\"><i\n                                        class=\"fa fa-star f-left\"></i><span>{{subscription.premiumPlan.name}}</span>\n                                </h2>\n                                <p class=\"m-b-0\">Payment Method<span\n                                        class=\"f-right\">{{subscription.premiumPlan.payments[0].paymentType}}</span></p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-4 col-xl-4\">\n                        <div class=\"card bg-info order-card\">\n                            <div class=\"card-block\">\n                                <h6 class=\"m-b-20\">Last Payed</h6>\n                                <h2 class=\"text-right\"><i\n                                        class=\"fa fa-calendar f-left\"></i><span>{{subscription.premiumPlan.buyingDate | date:'dd.MM.yyyy'}}</span>\n                                </h2>\n                                <p class=\"m-b-0\">Buying Date<span\n                                        class=\"f-right\">{{subscription.premiumPlan.buyingDate | date:'dd.MM.yyyy'}}</span>\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-4 col-xl-4\">\n                        <div *ngIf=\"subscription.active\"\n                            class=\"card bg-success mb-3 order-card\">\n                            <div  class=\"card-block\">\n                                <h6 class=\"m-b-20\">Status</h6>\n                                <h2 class=\"text-right\"><i class=\"fa fa-check f-left\"></i><span>Active</span></h2>\n                                <p class=\"m-b-0\">Expires<span class=\"f-right\">12 months</span></p>\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"!subscription.active\" class=\"card bg-danger order-card\">\n                            <div class=\"card-block\">\n                                <h6 class=\"m-b-20\">Status</h6>\n                                <h2 class=\"text-right\"><i class=\"fa fa-times f-left\"></i><span>Inactive</span></h2>\n                                <p class=\"m-b-0\">Expires<span class=\"f-right\">Expired</span></p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"subscription == null\">\n                    <p class=\"text-info\">You haven't bought any premium plans yet.</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"subscription != null\" class=\"region\">\n        <div class=\"card border-0\">\n            <div class=\"card-header ro-card-header\">\n                <span>\n\n                    <i class=\"fa fa-dollar\"></i>\n                    <h5 style=\"margin-bottom:-0.4%;\">My Payments</h5>\n                </span>\n                <a data-toggle=\"collapse\" href=\"#collapsePayments\" role=\"button\" aria-expanded=\"false\"\n                    aria-controls=\"collapsePayments\">\n                    <i class=\"fa fa-chevron-down \"></i>\n                </a>\n            </div>\n            <div class=\"card-body collapse show\" id=\"collapsePayments\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n\n                        <div class=\"media  pt-3\"\n                            *ngFor=\"let payment of subscription.premiumPlan.payments; let i = index\"\n                            [attr.data-index]=\"i\">\n                            <!-- <svg class=\"bd-placeholder-img mr-2 rounded\" width=\"32\" height=\"32\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\" aria-label=\"Placeholder: 32x32\"><title>Placeholder</title><rect width=\"100%\" height=\"100%\" fill=\"#007bff\"></rect><text x=\"50%\" y=\"50%\" fill=\"#007bff\" dy=\".3em\">32x32</text></svg> -->\n                            <span class=\"mr-2\" width=\"32\" height=\"32\"><i class=\"fa fa-paypal\"></i></span>\n                            <div class=\"media-body pb-3 mb-0 lh-125 border-bottom border-gray\">\n                                <div class=\"text-muted d-flex justify-content-between align-items-center w-100\">\n                                    <strong class=\"text-gray-dark\">{{payment.paymentType}}</strong>\n                                    <a id=\"payment_dropdown_{{i}}\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n                                        aria-expanded=\"false\"><i class=\"fa fa-ellipsis-v\"></i></a>\n                                    <div class=\"dropdown-menu\">\n                                        <!-- <a class=\"dropdown-item\" href=\"#\" (click)=\"deletePayment(payment)\"><i class=\"fa fa-trash\" ></i> <span style=\"padding-left:10%\">Delete</span></a> -->\n                                        <a class=\"dropdown-item\" (click)=\"viewPaymentDetails(payment)\"><i\n                                                class=\"fa fa-info-circle\"></i><span\n                                                style=\"padding-left:10%\">Details</span></a>\n                                        <a class=\"dropdown-item\" [routerLink]='[\"/contact\"]' style=\"color:black\"><i\n                                                class=\"fa fa-question\"></i><span\n                                                style=\"padding-left:10%\">Support</span></a>\n                                    </div>\n                                </div>\n                                <div class=\" text-muted d-flex justify-content-between align-items-center w-100\">\n                                    <span class=\"d-block\">{{payment.amount}} €</span>\n                                    <span class=\"d-block\">{{payment.paymentDate | date:'dd.MM.yyyy HH:mm'}}</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"region\">\n        <div class=\"card border-0\">\n            <div class=\"card-header ro-card-header\">\n                <span>\n                    <i class=\"fa fa-heart\"></i>\n                    <h5>My Donations</h5>\n\n                </span>\n                <a data-toggle=\"collapse\" href=\"#collapseDonations\" role=\"button\" aria-expanded=\"false\"\n                    aria-controls=\"collapseDonations\">\n                    <i class=\"fa fa-chevron-down \"></i>\n                </a>\n            </div>\n            <div class=\"card-body collapse show\" id=\"collapseDonations\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <div class=\"media  pt-3 data-row\" *ngFor=\"let donation of donations; let i = index\"\n                            [attr.data-index]=\"i\">\n                            <!-- <svg class=\"bd-placeholder-img mr-2 rounded\" width=\"32\" height=\"32\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\" aria-label=\"Placeholder: 32x32\"><title>Placeholder</title><rect width=\"100%\" height=\"100%\" fill=\"#007bff\"></rect><text x=\"50%\" y=\"50%\" fill=\"#007bff\" dy=\".3em\">32x32</text></svg> -->\n                            <span class=\"mr-2\" width=\"32\" height=\"32\"><i class=\"fa fa-paypal\"></i></span>\n                            <div class=\"media-body pb-3 mb-0 lh-125 border-bottom border-gray\">\n                                <div class=\"text-muted d-flex justify-content-between align-items-center w-100\">\n                                    <strong class=\"text-gray-dark\">{{donation.paymentType}}</strong>\n                                    <a id=\"donation_dropdown_{{i}}\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n                                        aria-expanded=\"false\"><i class=\"fa fa-ellipsis-v\"></i></a>\n                                    <div class=\"dropdown-menu\">\n                                        <!-- <a class=\"dropdown-item\" href=\"#\" (click)=\"deletePayment(payment)\"><i class=\"fa fa-trash\" ></i> <span style=\"padding-left:10%\">Delete</span></a> -->\n                                        <a class=\"dropdown-item\" [routerLink]='[\"/contact\"]' style=\"color:black\"><i\n                                                class=\"fa fa-question\"></i><span\n                                                style=\"padding-left:10%\">Support</span></a>\n                                    </div>\n                                </div>\n                                <div class=\" text-muted d-flex justify-content-between align-items-center w-100\">\n                                    <span class=\"d-block\">{{donation.amount}} €</span>\n                                    <span class=\"d-block\">{{donation.createdAt | date:'dd.MM.yyyy HH:mm'}}</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"donations.length < 1\">\n                    <p class=\"text-primary\">You haven't created any donations yet.</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/payments/payments.component.ts":
/*!************************************************!*\
  !*** ./src/app/payments/payments.component.ts ***!
  \************************************************/
/*! exports provided: PaymentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsComponent", function() { return PaymentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/payment/payment.service */ "./src/app/service/payment/payment.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../payment-details/payment-details.component */ "./src/app/payment-details/payment-details.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(githubAuthService, paymentService, modalService, document) {
        this.githubAuthService = githubAuthService;
        this.paymentService = paymentService;
        this.modalService = modalService;
        this.donations = [];
        this.changeText = {
            changeText: false
        };
    }
    PaymentsComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    PaymentsComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (currentUser) {
                    _this.username = currentUser.username;
                });
                _this.getAllPayments();
            }
        });
    };
    PaymentsComponent.prototype.getAllPayments = function () {
        var _this = this;
        this.paymentService.getAllSubscriptions().subscribe(function (subscription) {
            _this.subscription = subscription;
        });
        this.paymentService.getAllDonations().subscribe(function (donations) {
            _this.donations = donations;
        });
    };
    PaymentsComponent.prototype.viewPaymentDetails = function (payment) {
        var modalRef = this.modalService.open(_payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_5__["PaymentDetailsComponent"]);
        modalRef.componentInstance.payment = payment;
    };
    PaymentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payments',
            template: __webpack_require__(/*! ./payments.component.html */ "./src/app/payments/payments.component.html"),
            styles: [__webpack_require__(/*! ./payments.component.css */ "./src/app/payments/payments.component.css")],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__["PaymentService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"], Object])
    ], PaymentsComponent);
    return PaymentsComponent;
}());



/***/ }),

/***/ "./src/app/service/alertify/alertify.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/alertify/alertify.service.ts ***!
  \******************************************************/
/*! exports provided: AlertifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertifyService", function() { return AlertifyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertifyService = /** @class */ (function () {
    function AlertifyService() {
    }
    AlertifyService.prototype.confirm = function (title, message, okCallback) {
        alertify.confirm(message, title, function (e) {
            if (e) {
                okCallback();
            }
            else {
            }
        }, function (e) {
        });
    };
    AlertifyService.prototype.success = function (message) {
        alertify.success(message);
    };
    AlertifyService.prototype.error = function (message) {
        alertify.error(message);
    };
    AlertifyService.prototype.warning = function (message) {
        alertify.warning(message);
    };
    AlertifyService.prototype.message = function (message) {
        alertify.message(message);
    };
    AlertifyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AlertifyService);
    return AlertifyService;
}());



/***/ }),

/***/ "./src/app/service/contact/contact.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/contact/contact.service.ts ***!
  \****************************************************/
/*! exports provided: ContactService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactService", function() { return ContactService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ContactService = /** @class */ (function () {
    function ContactService(http, baseUrl) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }
    ContactService.prototype.addContact = function (contact) {
        return this.httpClient.post(this.baseUrl + "api/contact/createcontact", contact, { observe: 'response' });
    };
    ContactService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
    ], ContactService);
    return ContactService;
}());



/***/ }),

/***/ "./src/app/service/githubauth/githubauth.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/service/githubauth/githubauth.service.ts ***!
  \**********************************************************/
/*! exports provided: GithubauthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GithubauthService", function() { return GithubauthService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding" })
};
// const headers = new HttpHeaders({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"});
var GithubauthService = /** @class */ (function () {
    // public headers = new HttpHeaders({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"});
    function GithubauthService(http, baseUrl) {
        this.apiUrl = "api/auth/login";
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }
    GithubauthService.prototype.login = function () {
        return this.httpClient.get(this.baseUrl + this.apiUrl, { observe: 'response', responseType: 'text' });
    };
    GithubauthService.prototype.logout = function () {
        return this.httpClient.get(this.baseUrl + "api/auth/logout", { observe: 'response' });
    };
    GithubauthService.prototype.isAuthenticated = function () {
        return this.httpClient.get(this.baseUrl + "api/auth/isauthenticated", { observe: 'response' });
    };
    GithubauthService.prototype.alreadyCreated = function () {
        return this.httpClient.get(this.baseUrl + "api/auth/alreadycreated", { observe: 'response' });
    };
    GithubauthService.prototype.getCurrentUser = function () {
        return this.httpClient.get(this.baseUrl + "api/auth/getcurrentuser");
    };
    GithubauthService.prototype.getCurrentUsersRepositories = function () {
        return this.httpClient.get(this.baseUrl + "api/auth/getcurrentusersrepositories");
    };
    GithubauthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], String])
    ], GithubauthService);
    return GithubauthService;
}());



/***/ }),

/***/ "./src/app/service/job/job.service.ts":
/*!********************************************!*\
  !*** ./src/app/service/job/job.service.ts ***!
  \********************************************/
/*! exports provided: JobService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobService", function() { return JobService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var JobService = /** @class */ (function () {
    function JobService(http, baseUrl) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }
    JobService.prototype.getFrequencies = function () {
        return this.httpClient.get(this.baseUrl + "api/frequency/getfrequencies");
    };
    JobService.prototype.createJob = function (job) {
        return this.httpClient.post(this.baseUrl + "api/job/createjob", job, { observe: 'response' });
    };
    JobService.prototype.getJobs = function () {
        return this.httpClient.get(this.baseUrl + "api/job/getalljobs");
    };
    JobService.prototype.deleteJob = function (frequency) {
        return this.httpClient.delete(this.baseUrl + "api/job/deletejob?frequency=" + frequency, { observe: 'response' });
    };
    JobService.prototype.getCommonKeywords = function () {
        return this.httpClient.get(this.baseUrl + "api/job/getcommonkeywords");
    };
    JobService.prototype.updateJob = function (job) {
        return this.httpClient.put(this.baseUrl + "api/job/updatejob", job, { observe: 'response' });
    };
    JobService.prototype.getJobResults = function (frequency) {
        return this.httpClient.get(this.baseUrl + "api/job/getjobresults?frequency=" + frequency);
    };
    JobService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
    ], JobService);
    return JobService;
}());



/***/ }),

/***/ "./src/app/service/payment/payment.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/payment/payment.service.ts ***!
  \****************************************************/
/*! exports provided: PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var PaymentService = /** @class */ (function () {
    function PaymentService(http, baseUrl) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }
    PaymentService.prototype.createPayment = function (amount) {
        return this.httpClient.post(this.baseUrl + "api/payment/createpayment", amount, { responseType: 'text' });
    };
    PaymentService.prototype.createSubscription = function (createSubscriptionTO) {
        return this.httpClient.post(this.baseUrl + "api/payment/createsubscription", createSubscriptionTO, { responseType: 'text' });
    };
    PaymentService.prototype.getSubscription = function () {
        return this.httpClient.get(this.baseUrl + "api/payment/getsubscription");
    };
    PaymentService.prototype.getAllSubscriptions = function () {
        return this.httpClient.get(this.baseUrl + "api/payment/getallsubscriptions");
    };
    PaymentService.prototype.getAllDonations = function () {
        return this.httpClient.get(this.baseUrl + "api/payment/getalldonations");
    };
    PaymentService.prototype.cancelSubscription = function () {
        return this.httpClient.put(this.baseUrl + "api/payment/cancelsubscription", "", { observe: 'response' });
    };
    PaymentService.prototype.updateBillingAddress = function (billingAddressTO) {
        return this.httpClient.put(this.baseUrl + "api/payment/updatebillingaddress", billingAddressTO, { observe: 'response' });
    };
    PaymentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
    ], PaymentService);
    return PaymentService;
}());



/***/ }),

/***/ "./src/app/settings/settings.component.css":
/*!*************************************************!*\
  !*** ./src/app/settings/settings.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".settings-main{\n    padding-bottom: 20px;\n}"

/***/ }),

/***/ "./src/app/settings/settings.component.html":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n\n<div class=\"container settings-main\">\n\n\n  <div class=\"card\">\n    <div class=\"card-body\">\n      <div class=\"card-title\">\n        <h1 class=\"mb-3\">Settings</h1>\n      </div>\n      <hr>\n      <div class=\"row\">\n        <!-- nav -->\n        <div class=\"col-md-3\">\n          <div class=\"list-group\">\n            <a *ngIf=\"accountViewActive\" class=\"list-group-item list-group-item-action active text-white\"\n              (click)=\"accountViewActive=true\">\n              Account\n            </a>\n            <a *ngIf=\"!accountViewActive\" class=\"list-group-item list-group-item-action\"\n              (click)=\"accountViewActive=true\">\n              Account\n            </a>\n            <a *ngIf=\"!accountViewActive\" class=\"list-group-item list-group-item-action active text-white\"\n              (click)=\"accountViewActive=false\">Subscription</a>\n            <a *ngIf=\"accountViewActive\" class=\"list-group-item list-group-item-action\"\n              (click)=\"accountViewActive=false\">Subscription</a>\n          </div>\n        </div>\n\n        <!-- content -->\n        <div class=\"col-md-9\">\n          <div *ngIf=\"accountViewActive\">\n            <div class=\"row\">\n              <div class=\"col-md-6 mb-3\">\n                  <span>Connect to another GitHub account</span>\n              </div>\n              <div class=\"col-md-6 mb-3\">\n                  <button class=\"ml-3 btn btn-primary\">\n                      Connect\n                    </button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <span>Get data dump</span>\n                </div>\n                <div class=\"col-md-6\">\n                    <button class=\"ml-3 btn btn-secondary\">\n                        Download\n                      </button>\n                  </div>\n            </div>\n            \n\n\n          </div>\n          <div *ngIf=\"!accountViewActive\">\n              <h4 class=\"mb-3\">Susbcription</h4>\n            <div class=\"row\">\n              <div class=\"col-md-6 mb-3\">\n                <span><strong>Cancel Subscription</strong></span>\n              </div>\n              <div class =\"col-md-6 mb-3\">\n                <button class=\"btn btn-danger\" (click)=\"cancelSubscription()\">Cancel</button>\n              </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-6 mb-3\">\n                  <span><strong>Change Payment Method</strong></span>\n                </div>\n                <div class =\"col-md-6 mb-3\">\n                  <button class=\"btn btn-warning\">Change</button>\n                </div>\n              </div>\n            <hr>\n\n            <div class=\"row\">\n              <div class=\"col-md-12 order-md-1\">\n                <h4 class=\"mb-3\">Billing Address</h4>\n                <form class=\"needs-validation\" novalidate>\n                  <div class=\"row\">\n                    <div class=\"col-md-6 mb-3\">\n                      <label for=\"firstName\">First Name</label>\n                      <input [(ngModel)]=\"subscription.billingAddress.firstName\" type=\"text\" class=\"form-control\"\n                        id=\"firstName\" name=\"firstName\" placeholder=\"\" value=\"{{subscription.billingAddress.firstName}}\"\n                        required>\n                      <div class=\"invalid-feedback\">\n                        Valid first name is required.\n                      </div>\n                    </div>\n                    <div class=\"col-md-6 mb-3\">\n                      <label for=\"lastName\">Last Name</label>\n                      <input [(ngModel)]=\"subscription.billingAddress.lastName\" type=\"text\" class=\"form-control\"\n                        id=\"lastName\" name=\"lastName\" placeholder=\"\" value=\"{{subscription.billingAddress.lastName}}\"\n                        required>\n                      <div class=\"invalid-feedback\">\n                        Valid last name is required.\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"mb-3\">\n                    <label for=\"email\">E-Mail</label>\n                    <div class=\"input-group\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\">@</span>\n                      </div>\n                      <input [(ngModel)]=\"subscription.billingAddress.eMail\" type=\"email\" class=\"form-control\"\n                        id=\"email\" name=\"email\" value=\"{{subscription.billingAddress.eMail}}\"\n                        placeholder=\"you@example.com\" required>\n                      <div class=\"invalid-feedback\" style=\"width: 100%;\">\n                        Please enter a valid email address for shipping updates.\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"mb-3\">\n                    <label for=\"address\">Address</label>\n                    <input [(ngModel)]=\"subscription.billingAddress.address\" type=\"text\" class=\"form-control\"\n                      id=\"address\" name=\"address\" value=\"{{subscription.billingAddress.address}}\"\n                      placeholder=\"1234 Main St\" required>\n                    <div class=\"invalid-feedback\">\n                      Please enter your shipping address.\n                    </div>\n                  </div>\n\n                  <div class=\"mb-3\">\n                    <label for=\"address2\">Address 2 <span class=\"text-muted\">(Optional)</span></label>\n                    <input [(ngModel)]=\"subscription.billingAddress.addressAddition\" type=\"text\" class=\"form-control\"\n                      id=\"address2\" name=\"addressAddition\" value=\"{{subscription.billingAddress.addressAddition}}\"\n                      placeholder=\"Apartment or suite\">\n                  </div>\n\n                  <div class=\"row\">\n                    <div class=\"col-md-4 mb-3\">\n                      <label for=\"country\">Country</label>\n                      <select [(ngModel)]=\"subscription.billingAddress.country\" class=\"custom-select d-block w-100\"\n                        id=\"country\" name=\"country\" required>\n                        <option value=\"{{subscription.billingAddress.country}}\">Choose...</option>\n                        <option>Germany</option>\n                      </select>\n                      <div class=\"invalid-feedback\">\n                        Please select a valid country.\n                      </div>\n                    </div>\n                    <div class=\"col-md-4 mb-3\">\n                      <label for=\"state\">City</label>\n                      <input [(ngModel)]=\"subscription.billingAddress.city\" type=\"text\" class=\"form-control\" id=\"city\"\n                        name=\"city\" value=\"{{subscription.billingAddress.city}}\" placeholder=\"\" required>\n                      <div class=\"invalid-feedback\">\n                        Please provide a valid state.\n                      </div>\n                    </div>\n                    <div class=\"col-md-4 mb-3\">\n                      <label for=\"zip\">Zip</label>\n                      <input [(ngModel)]=\"subscription.billingAddress.postalCode\" type=\"text\" class=\"form-control\"\n                        id=\"zip\" name=\"zip\" value=\"{{subscription.billingAddress.postalCode}}\" placeholder=\"\" required>\n                      <div class=\"invalid-feedback\">\n                        Zip code required.\n                      </div>\n                    </div>\n\n\n                  </div>\n                  <hr class=\"mb-4\">\n\n                  <div class=\"row\" style=\"display:flex; flex-direction: column; align-items:center;\">\n                    <button class=\"btn btn-primary btn-lg btn-block\" style=\"width:80%;\" (click)=\"save()\" type=\"button\"><i\n                        class=\"fa fa-save\"></i> <span class=\"ml-3\">Save</span></button>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/payment/payment.service */ "./src/app/service/payment/payment.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(paymentService, githubAuthService, alertifySerivce) {
        this.paymentService = paymentService;
        this.githubAuthService = githubAuthService;
        this.alertifySerivce = alertifySerivce;
        this.accountViewActive = true;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    SettingsComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (username) {
                    _this.username = username.username;
                });
                _this.getAllPayments();
            }
        });
    };
    SettingsComponent.prototype.getAllPayments = function () {
        var _this = this;
        this.paymentService.getAllSubscriptions().subscribe(function (subscription) {
            _this.subscription = subscription;
        });
    };
    SettingsComponent.prototype.cancelSubscription = function () {
        var _this = this;
        this.alertifySerivce.confirm("Cancel Subscription?", "Do you really want to cancel your subscription?", function () {
            _this.paymentService.cancelSubscription().subscribe(function (response) {
                if (response.status == 200) {
                    _this.alertifySerivce.success("Subscription successfully cancelled.");
                }
                else {
                    _this.alertifySerivce.error("An error occurred. Please contact our support team if this error persists.");
                }
            });
        });
    };
    SettingsComponent.prototype.save = function () {
        var _this = this;
        console.log(this.subscription.billingAddress);
        this.paymentService.updateBillingAddress(this.subscription.billingAddress).subscribe(function (response) {
            if (response.status == 200) {
                _this.alertifySerivce.success("Billing Address successfully updated.");
                _this.getAllPayments();
            }
            else {
                _this.alertifySerivce.error("An error occurred. Please contact our support team if this error persists.");
            }
        });
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [_service_payment_payment_service__WEBPACK_IMPORTED_MODULE_2__["PaymentService"], _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/subscription/subscription.component.css":
/*!*********************************************************!*\
  !*** ./src/app/subscription/subscription.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".subscriptionMain{\n    padding-bottom: 10px;\n}"

/***/ }),

/***/ "./src/app/subscription/subscription.component.html":
/*!**********************************************************!*\
  !*** ./src/app/subscription/subscription.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"subscriptionMain\">\n  <div class=\"card border-0 mb-3\">\n    <div class=\"card-body\">\n      <h1 class=\"card-title\">Subscriptions</h1>\n      <p>All non free subscriptions lead to a sandbox paypal account, no real product is sold.</p>\n      <div class=\"card-deck mb-3 text-center\">\n        <div class=\"card mb-4 shadow-sm\">\n          <div class=\"card-header\">\n            <h4 class=\"my-0 font-weight-normal\">Free</h4>\n          </div>\n          <div class=\"card-body\">\n            <h1 class=\"card-title pricing-card-title\">$0 <small class=\"text-muted\">/ mo</small></h1>\n            <ul class=\"list-unstyled mt-3 mb-4\">\n              <li>1 user only</li>\n              <li>1 notification per frequency</li>\n              <li>Email support</li>\n              <li>Nothing else</li>\n              <li></li>\n            </ul>\n            <button type=\"button\" class=\"btn btn-lg btn-block btn-outline-success\" (click)=\"login()\">Sign up for\n              free</button>\n          </div>\n        </div>\n        <div class=\"card mb-4 shadow-sm\">\n          <div class=\"card-header\">\n            <h4 class=\"my-0 font-weight-normal\">Pro</h4>\n          </div>\n          <div class=\"card-body\">\n            <h1 class=\"card-title pricing-card-title\">$1 <small class=\"text-muted\">/ mo</small></h1>\n            <ul class=\"list-unstyled mt-3 mb-4\">\n              <li>3 users included</li>\n              <li>2 notifications per frequency</li>\n              <li>Priority email support</li>\n              <li>Help center access</li>\n            </ul>\n            <button type=\"button\" class=\"btn btn-lg btn-block btn-primary\" [routerLink]='[\"/checkout\"]'><i\n                class=\"fa fa-paypal\"></i> Buy now</button>\n\n          </div>\n        </div>\n        <div class=\"card mb-4 shadow-sm\">\n          <div class=\"card-header\">\n            <h4 class=\"my-0 font-weight-normal\">Enterprise</h4>\n          </div>\n          <div class=\"card-body\">\n            <h1 class=\"card-title pricing-card-title\">$2 <small class=\"text-muted\">/ mo</small></h1>\n            <ul class=\"list-unstyled mt-3 mb-4\">\n              <li>unlimited users</li>\n              <li>unlimited notifications</li>\n              <li>Phone and email support</li>\n              <li>Help center access</li>\n            </ul>\n            <button type=\"button\" class=\"btn btn-lg btn-block btn-success\" [routerLink]='[\"/contact\"]'><i\n                class=\"fa fa-file-contract\"></i> Contact us</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/subscription/subscription.component.ts":
/*!********************************************************!*\
  !*** ./src/app/subscription/subscription.component.ts ***!
  \********************************************************/
/*! exports provided: SubscriptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionComponent", function() { return SubscriptionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/payment/payment.service */ "./src/app/service/payment/payment.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SubscriptionComponent = /** @class */ (function () {
    function SubscriptionComponent(githubAuthService, document, alertifyService, paymentService, baseUrl) {
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.alertifyService = alertifyService;
        this.paymentService = paymentService;
        this.baseUrl = baseUrl;
        this.proSubscriptionPrice = 1;
        this.businessSubscriptionPrice = 2;
    }
    SubscriptionComponent.prototype.ngOnInit = function () {
    };
    SubscriptionComponent.prototype.login = function () {
        this.document.location.href = this.baseUrl + "api/auth/login";
    };
    SubscriptionComponent.prototype.createProSubscription = function () {
        this.createSubscription(this.proSubscriptionPrice);
    };
    SubscriptionComponent.prototype.createBusinessSubscription = function () {
        this.createSubscription(this.businessSubscriptionPrice);
    };
    SubscriptionComponent.prototype.createSubscription = function (amount) {
        // this.paymentService.createSubscription(amount).subscribe(redirectUrl => {
        //   this.document.location.href = redirectUrl;
        // })
    };
    SubscriptionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subscription',
            template: __webpack_require__(/*! ./subscription.component.html */ "./src/app/subscription/subscription.component.html"),
            styles: [__webpack_require__(/*! ./subscription.component.css */ "./src/app/subscription/subscription.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"],
            _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_4__["PaymentService"], String])
    ], SubscriptionComponent);
    return SubscriptionComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: getBaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseUrl", function() { return getBaseUrl; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
var providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])(providers).bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/morrismorrison/Development/Projects/NET/RepositoryObserver/RepositoryObserver/RepositoryObserver/ClientApp/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map