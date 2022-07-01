(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pg"));
	else if(typeof define === 'function' && define.amd)
		define(["pg"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("pg")) : factory(root["pg"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, (__WEBPACK_EXTERNAL_MODULE__47027__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 46030:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_typescript_1 = __webpack_require__(4464);
const config_1 = __importDefault(__webpack_require__(7668));
const Models = __importStar(__webpack_require__(46584));
const env = "production" || 0;
exports["default"] = new sequelize_typescript_1.Sequelize(
// @ts-ignore
(_a = config_1.default[env].database) !== null && _a !== void 0 ? _a : '', 
// @ts-ignore
(_b = config_1.default[env].username) !== null && _b !== void 0 ? _b : '', 
// @ts-ignore
(_c = config_1.default[env].password) !== null && _c !== void 0 ? _c : '', Object.assign(Object.assign({}, config_1.default[env]), { models: Object.values(Models) }));


/***/ }),

/***/ 66217:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Category_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(4464);
const base_1 = __webpack_require__(18796);
let Category = Category_1 = class Category extends base_1.Base {
};
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Category.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Category.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Category.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, field: 'parent_id' })
], Category.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: 'sub_category_count' })
], Category.prototype, "subCategoryCount", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Category_1)
], Category.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category_1)
], Category.prototype, "parent", void 0);
Category = Category_1 = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Categories', modelName: 'Categories' })
], Category);
exports.Category = Category;


/***/ }),

/***/ 62801:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Item_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
const sequelize_typescript_1 = __webpack_require__(4464);
const base_1 = __webpack_require__(18796);
const _1 = __webpack_require__(46584);
let Item = Item_1 = class Item extends base_1.Base {
    getAttributes() {
        return Item_1.attributes;
    }
    static get attributes() {
        return Object.keys(this.getAttributes()).filter(i => i !== 'order' && !i.toLowerCase().includes('id') && !i.toLowerCase().includes('at'));
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT)
], Item.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT)
], Item.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Item.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Item.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Item.prototype, "subtitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Item.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING))
], Item.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.NUMBER)
], Item.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, field: 'supplier_id' })
], Item.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Item.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.ItemStatus),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, field: 'status_id' })
], Item.prototype, "statusId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, field: 'category_id' })
], Item.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.ItemType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, field: 'type_id' })
], Item.prototype, "typeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Category)
], Item.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.ItemStatus)
], Item.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.ItemType)
], Item.prototype, "type", void 0);
Item = Item_1 = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Items', modelName: 'Items' })
], Item);
exports.Item = Item;


/***/ }),

/***/ 68827:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemStatus = void 0;
const sequelize_typescript_1 = __webpack_require__(4464);
const base_1 = __webpack_require__(18796);
let ItemStatus = class ItemStatus extends base_1.Base {
};
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], ItemStatus.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], ItemStatus.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ItemStatus.prototype, "order", void 0);
ItemStatus = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ItemStatuses', modelName: 'ItemStatuses' })
], ItemStatus);
exports.ItemStatus = ItemStatus;


/***/ }),

/***/ 54169:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemType = void 0;
const sequelize_typescript_1 = __webpack_require__(4464);
const base_1 = __webpack_require__(18796);
let ItemType = class ItemType extends base_1.Base {
};
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], ItemType.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], ItemType.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING))
], ItemType.prototype, "includes", void 0);
ItemType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ItemTypes', modelName: 'ItemTypes' })
], ItemType);
exports.ItemType = ItemType;


/***/ }),

/***/ 18796:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base = void 0;
const sequelize_typescript_1 = __webpack_require__(4464);
let Base = class Base extends sequelize_typescript_1.Model {
    // @CreatedAt
    // @Column({ field: 'created_at' })
    // created_at?: Date
    // @UpdatedAt
    // @Column({ field: 'updated_at' })
    // updated_at?: Date
    // @DeletedAt
    // @Column({ field: 'deleted_at' })
    // deleted_at?: Date
    upsert(options) {
        const keys = Object.keys(options);
        keys.forEach(i => {
            if (this.getAttributes().includes(i)) {
                this.setDataValue(i, options[i]);
            }
        });
    }
    getAttributes() {
        return [];
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Base.prototype, "order", void 0);
Base = __decorate([
    (0, sequelize_typescript_1.Table)({ createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' })
], Base);
exports.Base = Base;


/***/ }),

/***/ 46584:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(68827), exports);
__exportStar(__webpack_require__(62801), exports);
__exportStar(__webpack_require__(54169), exports);
__exportStar(__webpack_require__(66217), exports);


/***/ }),

/***/ 67800:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(46030);
const models_1 = __webpack_require__(46584);
exports["default"] = {
    up: (_queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.Category.create({ name: 'Category 1' });
    }),
    down: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Categories', {});
    }),
};


/***/ }),

/***/ 7668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// @ts-ignore
module.exports = {
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: __webpack_require__(47027),
    },
  },
  development: {
    username: process.env.POSTGRES_USERNAME || 'item',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'item',
    host: process.env.POSTGRES_HOSTNAME || 'localhost',
    dialect: 'postgres',
    options: {
      dialectModule: __webpack_require__(47027),
    },
  },
  staging: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: __webpack_require__(47027),
    },
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: __webpack_require__(47027),
    },
  },
}


/***/ }),

/***/ 4464:
/***/ ((module) => {

"use strict";
module.exports = require("sequelize-typescript");

/***/ }),

/***/ 47027:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__47027__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(67800);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});