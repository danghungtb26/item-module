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
exports.default = {
    up: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const attributes = [
            { name: 'name', value_type: 'string' },
            { name: 'description', value_type: 'string' },
            { name: 'slug', value_type: 'string' },
            { name: 'title', value_type: 'string' },
            { name: 'subtitle', value_type: 'string' },
            { name: 'image', value_type: 'string' },
            { name: 'images', value_type: 'array' },
            { name: 'price', value_type: 'number' },
            { name: 'string', value_type: 'string' },
            { name: 'number', value_type: 'number' },
            { name: 'boolean', value_type: 'boolean' },
        ];
        yield queryInterface.bulkInsert('item_attributes', attributes);
    }),
    down: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('item_attributes', {});
    }),
};
