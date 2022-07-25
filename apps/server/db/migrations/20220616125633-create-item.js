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
        yield queryInterface.createTable('items', {
            id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name: {
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: false,
            },
            description: {
                type: sequelize_typescript_1.DataType.TEXT,
            },
            slug: {
                type: sequelize_typescript_1.DataType.STRING,
            },
            title: {
                type: sequelize_typescript_1.DataType.STRING,
            },
            subtitle: {
                type: sequelize_typescript_1.DataType.STRING,
            },
            image: {
                type: sequelize_typescript_1.DataType.STRING,
            },
            images: {
                type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
                defaultValue: [],
            },
            price: {
                type: sequelize_typescript_1.DataType.INTEGER,
                defaultValue: 0,
            },
            supplier_id: {
                type: sequelize_typescript_1.DataType.BIGINT,
            },
            status_id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                references: {
                    model: 'item_statuses',
                    key: 'id',
                },
            },
            category_id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            type_id: {
                type: sequelize_typescript_1.DataType.BIGINT,
                references: {
                    model: 'item_types',
                    key: 'id',
                },
            },
            order: {
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
            },
            dynamic: {
                type: sequelize_typescript_1.DataType.JSONB,
                defaultValue: {},
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
        yield queryInterface.dropTable('items');
    }),
};
