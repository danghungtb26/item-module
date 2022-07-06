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
const sequelize_typescript_1 = require("sequelize-typescript");
exports.default = {
    up: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('categories', {
            id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            parent_id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            name: {
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_typescript_1.DataType.STRING,
            },
            sub_category_count: {
                type: sequelize_typescript_1.DataType.INTEGER,
                defaultValue: 0,
            },
            order: {
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
            },
            deleted_at: {
                type: sequelize_typescript_1.DataType.DATE,
            },
            created_at: {
                type: sequelize_typescript_1.DataType.DATE,
                defaultValue: new Date(),
            },
            updated_at: {
                type: sequelize_typescript_1.DataType.DATE,
                defaultValue: new Date(),
            },
        });
    }),
    down: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('categories');
    }),
};
