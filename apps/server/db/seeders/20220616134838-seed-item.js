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
const faker_1 = require("@faker-js/faker");
exports.default = {
    up: (queryInterface, sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield queryInterface.sequelize.query('SELECT * FROM "categories" ', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const statuses = yield queryInterface.sequelize.query('SELECT * FROM "item_statuses" ', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const types = yield queryInterface.sequelize.query('SELECT * FROM "item_types"', {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const items = Array.from({ length: 15 }).map(_ => {
            var _a, _b;
            return ({
                name: faker_1.faker.word.noun(40),
                description: faker_1.faker.lorem.text(),
                slug: faker_1.faker.lorem.slug(4),
                title: faker_1.faker.word.noun(40),
                image: faker_1.faker.image.imageUrl(),
                status_id: (_a = statuses[0]) === null || _a === void 0 ? void 0 : _a.id,
                type_id: (_b = types[0]) === null || _b === void 0 ? void 0 : _b.id,
                category_id: categories === null || categories === void 0 ? void 0 : categories[0].id,
            });
        });
        yield queryInterface.bulkInsert('items', items);
    }),
    down: (queryInterface, _sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('items', {});
    }),
};
