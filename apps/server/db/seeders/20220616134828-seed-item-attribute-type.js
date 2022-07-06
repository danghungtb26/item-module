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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: (queryInterface, sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const attributes = yield queryInterface.sequelize.query('SELECT * FROM "item_attributes" ', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log('🚀 ~ file: 20220616134828-seed-item-attribute-type.ts ~ line 9 ~ up: ~ attributes', attributes);
        const types = yield queryInterface.sequelize.query('SELECT * FROM "item_types"', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (types.length === 0 || attributes.length === 0)
            return;
        yield queryInterface.bulkInsert('item_attribute_types', attributes.map(i => ({ attribute_id: i.id, item_type_id: types[0].id })));
    }),
    down: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('item_attribute_types', {});
    }),
};
