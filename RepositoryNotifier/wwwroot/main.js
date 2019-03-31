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

/***/ "./src/app/abonement/abonement.component.css":
/*!***************************************************!*\
  !*** ./src/app/abonement/abonement.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".abonementMain{\r\n    padding-bottom: 10px;\r\n}"

/***/ }),

/***/ "./src/app/abonement/abonement.component.html":
/*!****************************************************!*\
  !*** ./src/app/abonement/abonement.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"abonementMain\">\n  <div class=\"container\">\n    <div style=\"padding-bottom:10px\">\n      <h2 >Abonements</h2>\n      <p>All provided Abonements are just simple PayPal donations to learn interacting with the PayPal API.</p>\n    </div>\n    <div class=\"card-deck mb-3 text-center\">\n      <div class=\"card mb-4 shadow-sm\">\n        <div class=\"card-header\">\n          <h4 class=\"my-0 font-weight-normal\">Free</h4>\n        </div>\n        <div class=\"card-body\">\n          <h1 class=\"card-title pricing-card-title\">$0 <small class=\"text-muted\">/ mo</small></h1>\n          <ul class=\"list-unstyled mt-3 mb-4\">\n            <li>1 user only</li>\n            <li>1 notification per frequency</li>\n            <li>Email support</li>\n          </ul>\n          <button type=\"button\" class=\"btn btn-lg btn-block btn-outline-primary\" (click)=\"login()\">Sign up for free</button>\n        </div>\n      </div>\n      <div class=\"card mb-4 shadow-sm\">\n        <div class=\"card-header\">\n          <h4 class=\"my-0 font-weight-normal\">Pro</h4>\n        </div>\n        <div class=\"card-body\">\n          <h1 class=\"card-title pricing-card-title\">$1 <small class=\"text-muted\">/ mo</small></h1>\n          <ul class=\"list-unstyled mt-3 mb-4\">\n            <li>3 users included</li>\n            <li>2 notifications per frequency</li>\n            <li>Priority email support</li>\n            <li>Help center access</li>\n          </ul>\n          <button type=\"button\" class=\"btn btn-lg btn-block btn-primary\" (click)=\"createProAbo()\">Get started</button>\n        </div>\n      </div>\n      <div class=\"card mb-4 shadow-sm\">\n        <div class=\"card-header\">\n          <h4 class=\"my-0 font-weight-normal\">Enterprise</h4>\n        </div>\n        <div class=\"card-body\">\n          <h1 class=\"card-title pricing-card-title\">$2 <small class=\"text-muted\">/ mo</small></h1>\n          <ul class=\"list-unstyled mt-3 mb-4\">\n            <li>unlimited users</li>\n            <li>unlimited notifications</li>\n            <li>Phone and email support</li>\n            <li>Help center access</li>\n          </ul>\n          <button type=\"button\" class=\"btn btn-lg btn-block btn-primary\" (click)=\"createBusinessAbo()\">Contact us</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/abonement/abonement.component.ts":
/*!**************************************************!*\
  !*** ./src/app/abonement/abonement.component.ts ***!
  \**************************************************/
/*! exports provided: AbonementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbonementComponent", function() { return AbonementComponent; });
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





var AbonementComponent = /** @class */ (function () {
    function AbonementComponent(githubAuthService, document, alertifyService, paymentService) {
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.alertifyService = alertifyService;
        this.paymentService = paymentService;
        this.proAboPrice = 1;
        this.businessAboPrice = 2;
    }
    AbonementComponent.prototype.ngOnInit = function () {
    };
    AbonementComponent.prototype.login = function () {
        var _this = this;
        this.githubAuthService.login().subscribe(function (response) {
            _this.document.location.href = response.url;
            _this.alertifyService.success("Logged in.");
        });
    };
    AbonementComponent.prototype.createProAbo = function () {
        this.createPayment(this.proAboPrice);
    };
    AbonementComponent.prototype.createBusinessAbo = function () {
        this.createPayment(this.businessAboPrice);
    };
    AbonementComponent.prototype.createPayment = function (amount) {
        var _this = this;
        this.paymentService.createPayment(amount).subscribe(function (redirectUrl) {
            _this.document.location.href = redirectUrl;
        });
    };
    AbonementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-abonement',
            template: __webpack_require__(/*! ./abonement.component.html */ "./src/app/abonement/abonement.component.html"),
            styles: [__webpack_require__(/*! ./abonement.component.css */ "./src/app/abonement/abonement.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"],
            _service_payment_payment_service__WEBPACK_IMPORTED_MODULE_4__["PaymentService"]])
    ], AbonementComponent);
    return AbonementComponent;
}());



/***/ }),

/***/ "./src/app/add-notification/add-notification.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/add-notification/add-notification.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".addNotificationMain{\r\n    padding-bottom: 10px;\r\n}"

/***/ }),

/***/ "./src/app/add-notification/add-notification.component.html":
/*!******************************************************************!*\
  !*** ./src/app/add-notification/add-notification.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"addNotificationMain\" *ngIf=\"isAuthenticated\">\n  <div class=\"card text-white bg-primary mb-3\">\n    <div class=\"card-body\">\n      <h2 class=\"card-title\">Notify me!</h2>\n      <p>To get notified when a password is found in one of your specified repositories simply subscribe with your\n        email down below.</p>\n      <!-- <div *ngIf=\"success\" class=\"alert alert-success\" role=\"alert\">\n        Your notification has successfully been created.\n      </div>\n      <div *ngIf=\"alreadyCreated\" class=\"alert alert-warning\" role=\"alert\">\n        You already created a notification for this frequency.\n      </div>\n      <div *ngIf=\"formIsInvalid\" class=\"alert alert-warning\" role=\"alert\">\n        The information you provided are invalid. Please check again.\n      </div> -->\n      <form name=\"notificationForm\" (ngSubmit)=\"notificationValidator.form.valid && createNotification()\" #notificationValidator=\"ngForm\">\n        <!-- <h5 class=\"card-subtitle\">Enter your Email:</h5> -->\n        <!-- <div class=\"form-group\"> -->\n        <div class=\"row\">\n          <div class=\"col\">\n            <div class=\"form-group\">\n              <label for=\"email\"><b>Email address</b></label>\n              <input class=\"form-control\" id=\"email\" name=\"email\" type=\"email\" [(ngModel)]=\"notificationModel.email\"\n                #emailValidatior=\"ngModel\" [ngClass]=\"{ 'is-invalid': notificationValidator.submitted && emailValidation?.invalid }\"\n                aria-describedby=\"emailHelp\" placeholder=\"Enter email\" required email>\n              <div *ngIf=\"notificationValidator.submitted && emailValidatior.invalid\" class=\"invalid-feedback\">\n                <div *ngIf=\"emailValidatior?.errors.required\">Email is required</div>\n                <div *ngIf=\"emailValidatior?.errors.email\">Email must be a valid email address</div>\n              </div>\n              <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.\n              </small>\n            </div>\n          </div>\n          <div class=\"col\">\n            <label for=\"frequency\"><b>Frequency</b></label>\n            <select  [(ngModel)]=\"notificationModel.selectedFrequency\" class=\"form-control\" id=\"frequency\" name=\"frequency\" #frequencyValidator=\"ngModel\" [ngClass]=\"{ 'is-invalid': notificationValidator.submitted && frequencyValidator?.invalid }\" required>  \n              <option *ngFor=\"let frequency of notificationModel.frequencies;\" [ngValue]=\"frequency\">{{frequency}}</option>\n            </select>\n            <div *ngIf=\"notificationValidator.submitted && frequencyValidator.invalid\" class=\"invalid-feedback\">\n                <div *ngIf=\"frequencyValidator?.errors.required\">Frequency is required</div>\n              </div>\n            <small id=\"frequencyHelp\" class=\"form-text text-muted\">In minutes.</small>\n          </div>\n        </div>\n        <!-- </div> -->\n        <div class=\"row\" style=\"padding-top:2%\">\n          <div class=\"col\">\n            <!-- <h6 class=\"card-subtitle\">Add Search Keywords:</h6> -->\n            <label for=\"searchKeywordToAdd\"><b>Add Search Keywords</b></label>\n            <div class=\"input-group\">\n              <input class=\"form-control\" type=\"text\" placeholder=\"Add Search Keyword\" id=\"searchKeywordToAdd\"\n                name=\"searchKeywordToAdd\" [(ngModel)]=\"notificationModel.searchKeywordToAdd\">\n              <div class=\"input-group-append\">\n                <button class=\"btn btn-success\" type=\"button\"\n                  (click)=\"addSearchKeyword(notificationModel.searchKeywordToAdd)\">Add</button>\n              </div>\n            </div>\n          </div>\n          <div class=\"col\">\n            <!-- <h6 class=\"card-subtitle\">Common keywords:</h6> -->\n            <label for=\"commonKeyword\"><b>Common keywords</b></label>\n            <div *ngIf=\"notificationModel.commonKeywords.length > 0; else showNoKeywordsYet\">\n              <span name=\"commonKeyword\" *ngFor=\"let commonKeyword of notificationModel.commonKeywords\">{{commonKeyword}}<button\n                  class=\"btn\" style=\"background-color:transparent\" (click)=\"addSearchKeyword(commonKeyword)\"><i\n                    class=\"fa fa-plus-circle\" style=\"color:white\"></i></button></span>\n            </div>\n            <ng-template #showNoKeywordsYet>\n              <div>\n                <p>No Keywords added yet.</p>\n              </div>\n            </ng-template>\n          </div>\n        </div>\n        <div class=\"row\" style=\"padding-top: 2%\">\n          <div class=\"col\">\n            <!-- <h6 class=\"card-subtitle\">Search Keywords:</h6> -->\n            <div class=\"form-group\">\n              <label for=\"searchKeywords\"><b>SearchKeywords</b></label>\n              <p *ngIf=\"notificationModel.searchKeywords.length == 0\">No Search Keywords added yet.</p>\n              <ul name=\"searchKeywords\" id=\"searchKeywords\">\n                <li *ngFor=\"let searchKeyword of notificationModel.searchKeywords\">{{searchKeyword}} <button class=\"btn\"\n                    style=\"background-color:transparent\" (click)=\"removeSearchKeyword(searchKeyword)\"><i\n                      class=\"fa fa-minus-circle\" style=\"color:white\"></i></button></li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"col\">\n            <label for=\"repository\"><b>Repositories</b></label>\n\n            <div class=\"form-group\">\n              <!-- <h5 class=\"card-subtitle\">Select Repositories:</h5> -->\n              <div style=\"padding-top: 5px; padding-left:4%;\" *ngFor=\"let repository of notificationModel.repositoryTos\"\n                class=\"form-check\">\n                <input type=\"checkbox\" name=\"repository\" class=\"form-check-input\" value=\"{{repository.name}}\"\n                  [(ngModel)]=\"repository.selected\">\n                {{repository.name}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <button type=\"submit\" class=\"btn btn-success\">Submit</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/add-notification/add-notification.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/add-notification/add-notification.component.ts ***!
  \****************************************************************/
/*! exports provided: AddNotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNotificationComponent", function() { return AddNotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/taskscheduler/taskscheduler.service */ "./src/app/service/taskscheduler/taskscheduler.service.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/repositoryTO */ "./src/app/dto/repositoryTO.ts");
/* harmony import */ var _dto_notificationTO__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dto/notificationTO */ "./src/app/dto/notificationTO.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _model_notification_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/notification-model */ "./src/app/model/notification-model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddNotificationComponent = /** @class */ (function () {
    function AddNotificationComponent(githubAuthService, taskschedulerService, alertifyService) {
        this.githubAuthService = githubAuthService;
        this.taskschedulerService = taskschedulerService;
        this.alertifyService = alertifyService;
        // public repositories: string[];
        // public repositoryTos: RepositoryTO[] = [];
        // public frequencies: number[];
        // public selectedFrequency: number;
        // public email: string;
        // public searchKeywords: string[] = [];
        // public searchKeywordToAdd: string;
        // public commonKeywords: string[] = [];
        this.notificationModel = new _model_notification_model__WEBPACK_IMPORTED_MODULE_6__["NotificationModel"]();
        this.notificationCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    AddNotificationComponent.prototype.ngOnInit = function () {
    };
    AddNotificationComponent.prototype.ngOnChanges = function () {
        this.refreshData();
    };
    AddNotificationComponent.prototype.refreshData = function () {
        if (this.isAuthenticated) {
            this.getCurrentUserRepositories();
            this.getFrequencies();
            this.getCommonKeywords();
        }
    };
    AddNotificationComponent.prototype.getCurrentUserRepositories = function () {
        var _this = this;
        this.githubAuthService.getCurrentUsersRepositories().subscribe(function (repositories) {
            _this.notificationModel.repositories = repositories;
            _this.notificationModel.repositoryTos = [];
            _this.notificationModel.repositories.forEach(function (repository) { return _this.notificationModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_3__["RepositoryTO"](repository, false)); });
        });
    };
    AddNotificationComponent.prototype.getFrequencies = function () {
        var _this = this;
        this.taskschedulerService.getFrequencies().subscribe(function (frequencies) {
            _this.notificationModel.frequencies = frequencies;
            _this.notificationModel.selectedFrequency = _this.notificationModel.frequencies[0];
        });
    };
    AddNotificationComponent.prototype.getCommonKeywords = function () {
        var _this = this;
        this.taskschedulerService.getCommonKeywords().subscribe(function (commonKeywords) { return _this.notificationModel.commonKeywords = commonKeywords; });
    };
    AddNotificationComponent.prototype.createNotification = function () {
        var _this = this;
        var notification = new _dto_notificationTO__WEBPACK_IMPORTED_MODULE_4__["AddNotificationTO"]();
        notification.email = this.notificationModel.email;
        notification.frequency = this.notificationModel.selectedFrequency;
        notification.searchKeywords = this.notificationModel.searchKeywords;
        var repositories = this.getSelectedRepositories();
        notification.repositories = repositories;
        this.githubAuthService.getCurrentUser().subscribe(function (user) {
            notification.username = user.username;
            _this.taskschedulerService.createNotification(notification).subscribe(function (response) {
                if (response.status === 201) {
                    _this.notificationCreated.emit(true);
                    _this.alertifyService.success("Notification created.");
                }
                else if (response.status === 409) {
                    _this.alertifyService.error("Notification already exists.");
                }
                _this.clearFormData();
            });
        });
    };
    AddNotificationComponent.prototype.checkFormIsInvalid = function () {
        var formIsInvalid = (this.notificationModel.email.length < 4 || this.notificationModel.selectedFrequency == null || this.notificationModel.searchKeywords.length < 1 || this.getSelectedRepositories().length < 1);
        if (formIsInvalid) {
            this.formIsInvalid = true;
            return true;
        }
        return false;
    };
    AddNotificationComponent.prototype.clearFormData = function () {
        this.notificationModel.email = "";
        this.notificationModel.selectedFrequency = this.notificationModel.frequencies[0];
        this.notificationModel.repositoryTos.forEach(function (repository) { return repository.selected = false; });
        this.notificationModel.searchKeywords = [];
    };
    AddNotificationComponent.prototype.getSelectedRepositories = function () {
        var repositories = this.notificationModel.repositoryTos.filter(function (repositoryTO) { return repositoryTO.selected; })
            .map(function (selectedRepository) { return selectedRepository.name; });
        return repositories;
    };
    AddNotificationComponent.prototype.addSearchKeyword = function (searchKeywordToAdd) {
        if (this.notificationModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword == searchKeywordToAdd; }).length < 1) {
            this.notificationModel.searchKeywords.push(searchKeywordToAdd);
            this.notificationModel.searchKeywordToAdd = "";
        }
    };
    AddNotificationComponent.prototype.removeSearchKeyword = function (searchKeywordToDelete) {
        this.notificationModel.searchKeywords = this.notificationModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword != searchKeywordToDelete; });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AddNotificationComponent.prototype, "username", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], AddNotificationComponent.prototype, "isAuthenticated", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddNotificationComponent.prototype, "notificationCreated", void 0);
    AddNotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-notification',
            template: __webpack_require__(/*! ./add-notification.component.html */ "./src/app/add-notification/add-notification.component.html"),
            styles: [__webpack_require__(/*! ./add-notification.component.css */ "./src/app/add-notification/add-notification.component.css")]
        }),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_2__["GithubauthService"], _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_1__["TaskschedulerService"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], AddNotificationComponent);
    return AddNotificationComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media (max-width: 767px) {\n  /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\n  .body-content {\n    padding-top: 50px;\n  }\n\n}\n\n\n"

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
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notifications/notifications.component */ "./src/app/notifications/notifications.component.ts");
/* harmony import */ var _add_notification_add_notification_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-notification/add-notification.component */ "./src/app/add-notification/add-notification.component.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./service/taskscheduler/taskscheduler.service */ "./src/app/service/taskscheduler/taskscheduler.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _edit_notification_edit_notification_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./edit-notification/edit-notification.component */ "./src/app/edit-notification/edit-notification.component.ts");
/* harmony import */ var _abonement_abonement_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./abonement/abonement.component */ "./src/app/abonement/abonement.component.ts");
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
                _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__["NotificationsComponent"],
                _add_notification_add_notification_component__WEBPACK_IMPORTED_MODULE_9__["AddNotificationComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"],
                _edit_notification_edit_notification_component__WEBPACK_IMPORTED_MODULE_15__["EditNotificationComponent"],
                _abonement_abonement_component__WEBPACK_IMPORTED_MODULE_16__["AbonementComponent"],
            ],
            exports: [],
            entryComponents: [_edit_notification_edit_notification_component__WEBPACK_IMPORTED_MODULE_15__["EditNotificationComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'ng-cli-universal' }),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"] },
                    { path: 'notifications', component: _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__["NotificationsComponent"] },
                ], config)
            ],
            providers: [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_10__["GithubauthService"], _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_12__["TaskschedulerService"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_13__["AlertifyService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dto/notificationTO.ts":
/*!***************************************!*\
  !*** ./src/app/dto/notificationTO.ts ***!
  \***************************************/
/*! exports provided: AddNotificationTO, UpdateNotificationTO, GetNotificationTO, Notification, DeleteNotificationTO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNotificationTO", function() { return AddNotificationTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateNotificationTO", function() { return UpdateNotificationTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetNotificationTO", function() { return GetNotificationTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return Notification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteNotificationTO", function() { return DeleteNotificationTO; });
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
var AddNotificationTO = /** @class */ (function () {
    function AddNotificationTO() {
    }
    return AddNotificationTO;
}());

var UpdateNotificationTO = /** @class */ (function () {
    function UpdateNotificationTO() {
    }
    return UpdateNotificationTO;
}());

var GetNotificationTO = /** @class */ (function (_super) {
    __extends(GetNotificationTO, _super);
    function GetNotificationTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetNotificationTO;
}(AddNotificationTO));

var Notification = /** @class */ (function () {
    function Notification(getNotificationTO, selected) {
        this.getNotificationTO = getNotificationTO;
        this.selected = selected;
    }
    return Notification;
}());

var DeleteNotificationTO = /** @class */ (function () {
    function DeleteNotificationTO() {
    }
    return DeleteNotificationTO;
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

/***/ "./src/app/edit-notification/edit-notification.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/edit-notification/edit-notification.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-notification/edit-notification.component.html":
/*!********************************************************************!*\
  !*** ./src/app/edit-notification/edit-notification.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title\" id=\"modal-basic-title\">Edit Notification</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form>\n    <div class=\"form-group\">\n      <label for=\"email\"><b>Email address</b></label>\n      <input class=\"form-control\" id=\"email\" name=\"email\" type=\"email\" [(ngModel)]=\"notificationModel.email\" aria-describedby=\"emailHelp\"\n        placeholder=\"EMail\" value=\"{{notificationModel.email}}\">\n      <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.\n      </small>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"repository\"><b>Repositories</b></label>\n      <div style=\"padding-top: 5px; padding-left:4%;\" *ngFor=\"let repository of notificationModel.repositoryTos\" class=\"form-check\">\n        <input type=\"checkbox\" name=\"repository\" class=\"form-check-input\" value=\"{{repository.name}}\"\n          [(ngModel)]=\"repository.selected\" [ngModelOptions]=\"{standalone: true}\">\n        {{repository.name}}\n      </div>\n    </div>\n    <label for=\"searchKeywordToAdd\"><b>Add Search Keywords</b></label>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Add Search Keyword\" id=\"searchKeywordToAdd\"\n          name=\"searchKeywordToAdd\" [(ngModel)]=\"notificationModel.searchKeywordToAdd\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-success\" type=\"button\" (click)=\"addSearchKeyword(notificationModel.searchKeywordToAdd)\">Add</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"searchKeywords\"><b>SearchKeywords</b></label>\n      <p *ngIf=\"notificationModel.searchKeywords.length == 0\">No Search Keywords added yet.</p>\n      <ul name=\"searchKeywords\" id=\"searchKeywords\">\n        <li *ngFor=\"let searchKeyword of notificationModel.searchKeywords\">{{searchKeyword}} <button class=\"btn\"\n            style=\"background-color:transparent\" (click)=\"removeSearchKeyword(searchKeyword)\"><i\n              class=\"fa fa-minus-circle\" style=\"color:black\"></i></button></li>\n      </ul>\n    </div>\n    <fieldset disabled>\n      <div class=\"form-group\">\n        <label for=\"frequency\"><b>Frequency</b></label>\n        <select [(ngModel)]=\"selectedNotification.getNotificationTO.frequency\" class=\"form-control\" id=\"frequency\"\n          name=\"frequency\">\n          <option *ngFor=\"let frequency of notificationModel.frequencies;\" [ngValue]=\"frequency\">{{frequency}}</option>\n        </select>\n        <small id=\"frequencyHelp\" class=\"form-text text-muted\">In minutes.</small>\n      </div>\n    </fieldset>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"saveNotification()\">Save</button>\n</div>"

/***/ }),

/***/ "./src/app/edit-notification/edit-notification.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/edit-notification/edit-notification.component.ts ***!
  \******************************************************************/
/*! exports provided: EditNotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditNotificationComponent", function() { return EditNotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/repositoryTO */ "./src/app/dto/repositoryTO.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _dto_notificationTO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/notificationTO */ "./src/app/dto/notificationTO.ts");
/* harmony import */ var _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/taskscheduler/taskscheduler.service */ "./src/app/service/taskscheduler/taskscheduler.service.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _model_notification_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/notification-model */ "./src/app/model/notification-model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditNotificationComponent = /** @class */ (function () {
    function EditNotificationComponent(taskSchedulerService, githubAuthService, alertifyService, activeModal) {
        this.taskSchedulerService = taskSchedulerService;
        this.githubAuthService = githubAuthService;
        this.alertifyService = alertifyService;
        this.activeModal = activeModal;
        this.notificationModel = new _model_notification_model__WEBPACK_IMPORTED_MODULE_7__["NotificationModel"]();
    }
    EditNotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCurrentUserRepositories();
        this.getFrequencies();
        this.getCommonKeywords();
        this.selectedNotification.getNotificationTO.searchKeywords.forEach(function (searchKeyword) { return _this.notificationModel.searchKeywords.push(searchKeyword); });
        this.notificationModel.email = this.selectedNotification.getNotificationTO.email;
    };
    EditNotificationComponent.prototype.getCurrentUserRepositories = function () {
        var _this = this;
        this.githubAuthService.getCurrentUsersRepositories().subscribe(function (repositories) {
            _this.notificationModel.repositoryTos = [];
            repositories.forEach(function (repository) {
                if (_this.selectedNotification.getNotificationTO.repositories.some(function (x) { return x === repository; })) {
                    _this.notificationModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__["RepositoryTO"](repository, true));
                }
                else {
                    _this.notificationModel.repositoryTos.push(new _dto_repositoryTO__WEBPACK_IMPORTED_MODULE_1__["RepositoryTO"](repository, false));
                }
            });
        });
    };
    EditNotificationComponent.prototype.uncheckUserRepositories = function () {
        this.notificationModel.repositoryTos.forEach(function (repository) {
            repository.selected = false;
        });
    };
    EditNotificationComponent.prototype.getFrequencies = function () {
        var _this = this;
        this.taskSchedulerService.getFrequencies().subscribe(function (frequencies) {
            _this.notificationModel.frequencies = frequencies;
            _this.notificationModel.selectedFrequency = _this.notificationModel.frequencies[0];
        });
    };
    EditNotificationComponent.prototype.getCommonKeywords = function () {
        var _this = this;
        this.taskSchedulerService.getCommonKeywords().subscribe(function (commonKeywords) { return _this.notificationModel.commonKeywords = commonKeywords; });
    };
    EditNotificationComponent.prototype.addSearchKeyword = function (searchKeywordToAdd) {
        if (this.notificationModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword == searchKeywordToAdd; }).length < 1) {
            this.notificationModel.searchKeywords.push(searchKeywordToAdd);
            this.notificationModel.searchKeywordToAdd = "";
        }
    };
    EditNotificationComponent.prototype.removeSearchKeyword = function (searchKeywordToDelete) {
        this.notificationModel.searchKeywords = this.notificationModel.searchKeywords.filter(function (searchKeyword) { return searchKeyword != searchKeywordToDelete; });
    };
    EditNotificationComponent.prototype.saveNotification = function () {
        var _this = this;
        this.alertifyService.confirm("Save Changes?", "Do you want to save the changes you made to your notification?", function () {
            var notification = new _dto_notificationTO__WEBPACK_IMPORTED_MODULE_3__["AddNotificationTO"]();
            notification.email = _this.notificationModel.email;
            notification.username = _this.username;
            notification.searchKeywords = _this.notificationModel.searchKeywords;
            notification.frequency = _this.selectedNotification.getNotificationTO.frequency;
            notification.repositories = _this.getSelectedRepositories();
            _this.taskSchedulerService.updateNotification(notification).subscribe(function (result) {
                _this.alertifyService.success("Notification updated.");
                _this.selectedNotification.getNotificationTO.repositories = notification.repositories;
                _this.selectedNotification.getNotificationTO.email = notification.email;
                _this.selectedNotification.getNotificationTO.searchKeywords = notification.searchKeywords;
                _this.activeModal.close();
            });
        });
    };
    EditNotificationComponent.prototype.getSelectedRepositories = function () {
        var selectedRepositories = [];
        selectedRepositories = this.notificationModel.repositoryTos.filter(function (repository) { return repository.selected === true; }).map(function (repository) { return repository.name; });
        return selectedRepositories;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _dto_notificationTO__WEBPACK_IMPORTED_MODULE_3__["Notification"])
    ], EditNotificationComponent.prototype, "selectedNotification", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], EditNotificationComponent.prototype, "username", void 0);
    EditNotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-notification',
            template: __webpack_require__(/*! ./edit-notification.component.html */ "./src/app/edit-notification/edit-notification.component.html"),
            styles: [__webpack_require__(/*! ./edit-notification.component.css */ "./src/app/edit-notification/edit-notification.component.css")]
        }),
        __metadata("design:paramtypes", [_service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_4__["TaskschedulerService"],
            _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_5__["GithubauthService"],
            _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"]])
    ], EditNotificationComponent);
    return EditNotificationComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    /* Set the fixed height of the footer here */\r\n    height: 60px;\r\n    line-height: 60px; /* Vertically center the text there */\r\n  }"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer bg-primary text-white\">\n  <div class=\"container\">\n    <a href=\"#\" style=\"margin-left:1%;\">Help</a>\n  </div>\n</footer>"

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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
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

module.exports = ".homeMain{\r\n    padding-top: 20px;\r\n    padding-bottom: 20px;\r\n}\r\n.region{\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n}\r\n.rnCard{\r\n    background-color: #c9c9c9;\r\n  }"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container homeMain\">\n    <div class=\"jumbotron bg-primary text-white\">\n        <h1 class=\"display-4\" *ngIf=\"isAuthenticated; else showNotAnonymousGreeting\">Hello, {{username}}!</h1>\n        <ng-template #showNotAnonymousGreeting>\n            <h1>Hello, there!</h1>\n        </ng-template>\n        <p class=\"lead\">Welcome to RepositoryObserver, a simple service to observe your repositories.</p>\n        <hr class=\"my-4\">\n        <p>RepositoryObserver was built using:</p>\n        <ul>\n            <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a\n                    href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side\n                code\n            </li>\n            <li><a href='https://angular.io/'>Angular</a> and <a href='http://www.typescriptlang.org/'>TypeScript</a>\n                for\n                client-side code\n            </li>\n            <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>\n            <li><a href='http://font-awesome.com/'>Font Awesome</a> for icons</li>\n        </ul>\n    </div>\n    <div class=\"region\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <div class=\"card text-white bg-success mb-3 h-100\" >\n                    <div class=\"card-body\">\n                        <h2 class=\"card-title\">RepositoryObserver</h2>\n                        <p class=\"card-text\">\n                            <strong>RepositoryObserver</strong> offers a service to observe your\n                            <code>repositories</code> for\n                            accidentally leaked <code>passwords</code>.<br>\n                            Simply authenticate with your Github account and select the <code>repositories</code> you\n                            want to be\n                            observed.<br>\n                            You can also select a frequency at which the scans are started:\n                        </p>\n                        <ul>\n                            <li>15 minutes</li>\n                            <li>30 minutes</li>\n                            <li>1 hour</li>\n                            <li>3 hours</li>\n                            <li>12 hours</li>\n                            <li>1 day</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-sm-6\">\n                <div class=\"card text-white bg-primary mb-3 h-100\">\n                    <div class=\"card-body\">\n                        <h2 class=\"card-title\">Inspect SourceCode</h2>\n                        <p class=\"card-text\">This project is open source and its source code can be reviewed <a\n                                href=\"https://github.com/MorrisMorrison/scrapi\">here</a></p>\n                        <p>The Application stores only the username and repository names and accesses them through\n                            Github's public API.\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div *ngIf=\"isAuthenticated\" class=\"region\">\n            <app-abonement></app-abonement>\n        </div>\n    \n\n    <div class=\"region\">\n        <app-add-notification [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-add-notification>\n    </div>\n\n\n    <div *ngIf=\"!isAuthenticated\">\n        <h2>Sign Up</h2>\n        <p>\n            By signing up you will be redirected to Github and you need to authenticate with your credentials.\n        </p>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"login()\"><i class=\"fa fa-github\"></i> Sign Up</button>\n    </div>\n</div>\n<app-footer>"

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
/* harmony import */ var _add_notification_add_notification_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../add-notification/add-notification.component */ "./src/app/add-notification/add-notification.component.ts");
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
    function HomeComponent(githubAuthService, document, alertifyService) {
        this.githubAuthService = githubAuthService;
        this.document = document;
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
        var _this = this;
        this.githubAuthService.login().subscribe(function (response) {
            _this.document.location.href = response.url;
            _this.alertifyService.success("Logged in.");
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_4__["NavMenuComponent"]),
        __metadata("design:type", _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_4__["NavMenuComponent"])
    ], HomeComponent.prototype, "navMenuComponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_add_notification_add_notification_component__WEBPACK_IMPORTED_MODULE_3__["AddNotificationComponent"]),
        __metadata("design:type", _add_notification_add_notification_component__WEBPACK_IMPORTED_MODULE_3__["AddNotificationComponent"])
    ], HomeComponent.prototype, "addNotificationComponent", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/model/notification-model.ts":
/*!*********************************************!*\
  !*** ./src/app/model/notification-model.ts ***!
  \*********************************************/
/*! exports provided: NotificationModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModel", function() { return NotificationModel; });
var NotificationModel = /** @class */ (function () {
    function NotificationModel() {
        this.repositories = [];
        this.repositoryTos = [];
        this.frequencies = [];
        this.commonKeywords = [];
        this.searchKeywords = [];
    }
    return NotificationModel;
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

module.exports = "<header>\n  <nav class='navbar navbar-expand-sm navbar-toggleable-sm bg-primary box-shadow mb-3'>\n    <div class=\"container\">\n      <a class=\"navbar-brand text-white\" [routerLink]='[\"/\"]'><i class=\"fa fa-search\"></i> RepositoryObserver</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" aria-label=\"Toggle navigation\"\n        [attr.aria-expanded]=\"isExpanded\" (click)=\"toggle()\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse\" [ngClass]='{\"show\": isExpanded}'>\n        <ul class=\"navbar-nav flex-grow\">\n          <li class=\"nav-item\" [routerLinkActive]='[\"link-active\"]' [routerLinkActiveOptions]='{ exact: true }'>\n            <a class=\"nav-link text-white\" [routerLink]='[\"/\"]'><i class=\"fa fa-home\"></i> Home</a>\n          </li>\n          <li *ngIf=\"isAuthenticated\" class=\"nav-item\" [routerLinkActive]='[\"link-active\"]'>\n            <a class=\"nav-link text-white\" [routerLink]='[\"/notifications\"]'><i class=\"fa fa-th-list\"></i> My Notifications</a>\n          </li>\n          <li *ngIf=\"isAuthenticated\" class=\"nav-item\">\n            <a class=\"nav-link text-white\" [routerLink]='[\"/fetch-data\"]'><i class=\"fa fa-github\"></i> Hello {{username}}</a>\n          </li>\n          <li *ngIf=\"isAuthenticated\" class=\"nav-item\">\n            <button class=\"btn btn-link\" (click)=\"logout()\"><i class=\"fa fa-sign-out\"></i> Logout</button>\n          </li>\n          <li *ngIf=\"!isAuthenticated\" class=\"nav-item\">\n            <button class=\"btn btn-link\" (click)=\"login()\"><i class=\"fa fa-github\"></i> Sign In</button>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</header>\n\n"

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
    function NavMenuComponent(githubAuthService, document, router, alertifyService) {
        this.githubAuthService = githubAuthService;
        this.document = document;
        this.router = router;
        this.alertifyService = alertifyService;
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
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_1__["GithubauthService"], Object, _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], NavMenuComponent);
    return NavMenuComponent;
}());



/***/ }),

/***/ "./src/app/notifications/notifications.component.css":
/*!***********************************************************!*\
  !*** ./src/app/notifications/notifications.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".notificationsMain{\r\n    padding-top: 10px;\r\n    padding-bottom: 20px;\r\n}\r\n.region{\r\n    padding-top: 30px;\r\n    padding-bottom: 10px;\r\n}"

/***/ }),

/***/ "./src/app/notifications/notifications.component.html":
/*!************************************************************!*\
  !*** ./src/app/notifications/notifications.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav-menu [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"></app-nav-menu>\n<div class=\"container notificationsMain\">\n    <div class=\"card text-white bg-primary\">\n        <div class=\"card-body\">\n            <h1 class=\"card-title\" style=\"padding-top:10px; padding-bottom:10px;\">My Notifications:</h1>\n            <p class=\"card-text\">You can only have only NotificationTask per Frequency, so your maximum number of tasks\n                equals the maximum number\n                of\n                frequencies available.</p>\n            <div *ngIf=\"notifications.length < 1\">\n                <p class=\"text-info\">You haven't created any notifications yet.</p>\n            </div>\n            <div *ngIf=\"notifications.length > 0\">\n                <table class=\"table table-striped\">\n                    <thead class=\"thead table-success\">\n                        <tr>\n                            <th scope=\"col\">Select</th>\n                            <th scope=\"col\">#</th>\n                            <th scope=\"col\">EMail</th>\n                            <th scope=\"col\">Frequency</th>\n                            <th scope=\"col\">Repositories</th>\n                            <th scope=\"col\">Search Keywords</th>\n                            <th scope=\"col\">Last Executed</th>\n                            <th scope=\"col\">Status</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr class=\"table-light\" *ngFor=\"let notification of notifications; let i = index\"\n                            [attr.data-index]=\"i\">\n                            <td>\n                                <input id=\"test\" name=\"{{notification.getNotificationTO.id}}\" type=\"checkbox\"\n                                    value=\"{{notification.getNotificationTO.id}}\" [(ngModel)]=\"notification.selected\">\n                                <label for=\"test\"></label>\n                            </td>\n                            <th scope=\"row\">{{i+1}}</th>\n                            <td>{{notification.getNotificationTO.email}}</td>\n                            <td>{{notification.getNotificationTO.frequency}} minutes</td>\n                            <td>\n                                <ul>\n                                    <li *ngFor=\"let repository of notification.getNotificationTO.repositories\">\n                                        {{repository}}</li>\n                                </ul>\n                            </td>\n                            <td>\n                                <ul>\n                                    <li *ngFor=\"let searchKeyword of notification.getNotificationTO.searchKeywords\">\n                                        {{searchKeyword}}</li>\n                                </ul>\n                            </td>\n                            <td *ngIf=\"notification.getNotificationTO.status != 'INIT'; else showNever\">\n                                {{notification.getNotificationTO.lastExecutedAt.toLocaleString()}}</td>\n                            <ng-template #showNever>\n                                <td>Never</td>\n                            </ng-template>\n                            <td>{{notification.getNotificationTO.status}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <button style=\"margin-right: 1%; width:10%;\" type=\"button\" class=\"btn btn-success\"\n                    (click)=\"editNotification()\">Edit</button>\n                <button type=\"button\" style=\"width:10%;\" (click)=\"deleteNotifications()\"\n                    class=\"btn btn-info\">Delete</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"region\">\n        <app-add-notification [isAuthenticated]=\"isAuthenticated\" [username]=\"username\"\n            (notificationCreated)=\"notificationCreated($event)\"></app-add-notification>\n    </div>\n</div>\n<app-footer></app-footer>\n\n"

/***/ }),

/***/ "./src/app/notifications/notifications.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/notifications/notifications.component.ts ***!
  \**********************************************************/
/*! exports provided: NotificationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsComponent", function() { return NotificationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/taskscheduler/taskscheduler.service */ "./src/app/service/taskscheduler/taskscheduler.service.ts");
/* harmony import */ var _dto_notificationTO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dto/notificationTO */ "./src/app/dto/notificationTO.ts");
/* harmony import */ var _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/githubauth/githubauth.service */ "./src/app/service/githubauth/githubauth.service.ts");
/* harmony import */ var _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/alertify/alertify.service */ "./src/app/service/alertify/alertify.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _edit_notification_edit_notification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../edit-notification/edit-notification.component */ "./src/app/edit-notification/edit-notification.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(taskSchedulerService, githubAuthService, alertifyService, modalService) {
        this.taskSchedulerService = taskSchedulerService;
        this.githubAuthService = githubAuthService;
        this.alertifyService = alertifyService;
        this.modalService = modalService;
        this.notifications = [];
        this.notificationTos = [];
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.loggedIn();
    };
    NotificationsComponent.prototype.loggedIn = function () {
        var _this = this;
        this.githubAuthService.isAuthenticated().subscribe(function (response) {
            if (response.status == 200) {
                _this.isAuthenticated = true;
                _this.githubAuthService.getCurrentUser().subscribe(function (currentUser) {
                    _this.username = currentUser.username;
                });
                _this.getAllNotifications();
            }
        });
    };
    NotificationsComponent.prototype.getAllNotifications = function () {
        var _this = this;
        this.taskSchedulerService.getNotifications().subscribe(function (notificationTos) {
            _this.notificationTos = notificationTos;
            _this.notificationTos.forEach(function (notificationTO) {
                _this.notifications.push(new _dto_notificationTO__WEBPACK_IMPORTED_MODULE_2__["Notification"](notificationTO, false));
            });
        });
    };
    NotificationsComponent.prototype.deleteNotifications = function () {
        var _this = this;
        this.alertifyService.confirm("Delete Notification", "Are you sure you want to delete this notification?", function () {
            var selectedNotifications = _this.getSelectedNotifications();
            selectedNotifications.forEach(function (selectedNotification) {
                _this.taskSchedulerService.deleteNotification(selectedNotification.getNotificationTO.frequency).subscribe(function () {
                    _this.notifications.splice(_this.notifications.indexOf(selectedNotification));
                    _this.alertifyService.success("Notification deleted.");
                });
            });
        });
    };
    NotificationsComponent.prototype.editNotification = function () {
        var modalRef = this.modalService.open(_edit_notification_edit_notification_component__WEBPACK_IMPORTED_MODULE_6__["EditNotificationComponent"]);
        modalRef.componentInstance.selectedNotification = this.getSelectedNotification();
        modalRef.componentInstance.username = this.username;
    };
    NotificationsComponent.prototype.getSelectedNotifications = function () {
        return this.notifications.filter(function (notification) { return notification.selected == true; });
    };
    NotificationsComponent.prototype.getSelectedNotification = function () {
        var selectedNotifications = this.getSelectedNotifications();
        if (selectedNotifications != null) {
            this.selectedNotification = selectedNotifications[0];
            return this.selectedNotification;
        }
    };
    NotificationsComponent.prototype.notificationCreated = function (notificationCreated) {
        if (notificationCreated == true) {
            this.notifications = [];
            this.getAllNotifications();
        }
    };
    NotificationsComponent.prototype.uncheckNotifications = function () {
        this.notifications.forEach(function (notification) {
            notification.selected = false;
        });
    };
    NotificationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notifications',
            template: __webpack_require__(/*! ./notifications.component.html */ "./src/app/notifications/notifications.component.html"),
            styles: [__webpack_require__(/*! ./notifications.component.css */ "./src/app/notifications/notifications.component.css")]
        }),
        __metadata("design:paramtypes", [_service_taskscheduler_taskscheduler_service__WEBPACK_IMPORTED_MODULE_1__["TaskschedulerService"],
            _service_githubauth_githubauth_service__WEBPACK_IMPORTED_MODULE_3__["GithubauthService"],
            _service_alertify_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]])
    ], NotificationsComponent);
    return NotificationsComponent;
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
        alertify.confirm(title, message, function (e) {
            if (e) {
                okCallback();
            }
            else {
            }
        }, function (e) {
            if (e) {
            }
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
        return this.httpClient.post(this.baseUrl + "api/payment/create", amount, { responseType: 'text' });
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

/***/ "./src/app/service/taskscheduler/taskscheduler.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/service/taskscheduler/taskscheduler.service.ts ***!
  \****************************************************************/
/*! exports provided: TaskschedulerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskschedulerService", function() { return TaskschedulerService; });
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


var TaskschedulerService = /** @class */ (function () {
    function TaskschedulerService(http, baseUrl) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }
    TaskschedulerService.prototype.getFrequencies = function () {
        return this.httpClient.get(this.baseUrl + "api/frequency/getfrequencies");
    };
    TaskschedulerService.prototype.createNotification = function (notification) {
        return this.httpClient.post(this.baseUrl + "api/notificationtask/addnotification", notification, { observe: 'response' });
    };
    TaskschedulerService.prototype.getNotifications = function () {
        return this.httpClient.get(this.baseUrl + "api/notificationtask/getallnotifications");
    };
    TaskschedulerService.prototype.deleteNotification = function (frequency) {
        return this.httpClient.delete(this.baseUrl + "api/notificationtask/deletenotification?frequency=" + frequency);
    };
    TaskschedulerService.prototype.getCommonKeywords = function () {
        return this.httpClient.get(this.baseUrl + "api/notificationtask/getcommonkeywords");
    };
    TaskschedulerService.prototype.updateNotification = function (notification) {
        return this.httpClient.put(this.baseUrl + "api/notificationtask/updatenotification", notification);
    };
    TaskschedulerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], String])
    ], TaskschedulerService);
    return TaskschedulerService;
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

module.exports = __webpack_require__(/*! C:\Users\mwlltr\Documents\Projects\RepositoryNotifier\RepositoryNotifier\ClientApp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map