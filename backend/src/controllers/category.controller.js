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
exports.categoryController = void 0;
const db_1 = require("../db");
exports.categoryController = {
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.query;
                console.log("done");
                let categories;
                if (!type === undefined) {
                    categories = yield db_1.db.designCategory.findMany({
                        where: { designType: type }
                    });
                }
                else {
                    categories = yield db_1.db.designCategory.findMany();
                }
                console.log(categories);
                res.status(200).json({
                    data: categories,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type } = req.body;
                const category = yield db_1.db.designCategory.create({
                    data: { name, designType: type },
                });
                res.status(201).json({
                    success: true,
                    data: category,
                    error: null,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    data: null,
                    error: error.message,
                });
            }
        });
    },
    createSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, id, type } = req.body;
                const subCategory = yield db_1.db.subCategory.create({
                    data: {
                        name,
                        designCategoryId: id,
                    },
                });
                res.status(201).json({
                    success: true,
                    data: subCategory,
                    error: null,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    data: null,
                    error: error.message,
                });
            }
        });
    },
    getSubCategoriesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const subCategories = yield db_1.db.subCategory.findMany({
                    where: { designCategoryId: id },
                    include: {
                        designs: true,
                    },
                });
                res.status(200).json(subCategories);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to fetch subcategories" });
            }
        });
    },
    // Delete a category and all its associated subcategories and designs in a single transaction
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                // Run all deletions concurrently as an atomic transaction.
                const result = yield db_1.db.$transaction([
                    db_1.db.subCategory.deleteMany({
                        where: { designCategoryId: categoryId },
                    }),
                    db_1.db.design.deleteMany({
                        where: { designCategoryId: categoryId },
                    }),
                    db_1.db.designCategory.delete({
                        where: { id: categoryId },
                    }),
                ]);
                // result is an array with the results for each operation.
                res.status(200).json({
                    success: true,
                    data: result,
                    error: null,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to delete category" });
            }
        });
    },
    // Delete a subcategory and its associated designs in a single transaction
    deleteSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subCategoryId } = req.params;
                // Run both deletion queries concurrently as part of a transaction.
                const result = yield db_1.db.$transaction([
                    db_1.db.design.deleteMany({
                        where: { subCategoryId },
                    }),
                    db_1.db.subCategory.delete({
                        where: { id: subCategoryId },
                    }),
                ]);
                res.status(200).json({
                    success: true,
                    data: result,
                    error: null,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to delete subcategory" });
            }
        });
    }
};
