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
exports.designController = void 0;
const db_1 = require("../db");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createDesignSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    pdfLink: zod_1.z.string().url(),
    pdfUploadId: zod_1.z.string().nonempty(),
    thumbnailUrl: zod_1.z.string().url(),
    thumbnailUploadId: zod_1.z.string().nonempty(),
    designCategoryId: zod_1.z.string().nonempty(),
    subCategoryId: zod_1.z.string().nonempty(),
    published: zod_1.z.boolean(),
    type: zod_1.z.nativeEnum(client_1.DesignType),
});
exports.designController = {
    updateDesign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedDesign = yield db_1.db.design.update({
                    where: { id },
                    data: {
                        name: data.name,
                        description: data.description,
                        designCategoryId: data.designCategoryId,
                        subCategoryId: data.subCategoryId,
                        pdfLink: data.pdfLink,
                        pdfUploadId: data.pdfUploadId,
                        thumbnailUrl: data.thumbnailUrl,
                        thumbnailUploadId: data.thumbnailUploadId,
                        designType: data.designType,
                        published: data.published,
                        status: data.status
                    },
                });
                res.status(200).json({ data: updatedDesign, error: null, success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error updating design:", error);
                }
                res.status(500).json({ error: "Failed to update design. Please try again." });
            }
        });
    },
    createDesign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const validatedParams = createDesignSchema.safeParse(req.body);
                if (!validatedParams.success) {
                    res.status(400).json({ error: "Invalid input data" });
                    return;
                }
                const design = yield db_1.db.design.create({
                    data: {
                        name: validatedParams.data.name,
                        description: validatedParams.data.description,
                        pdfLink: validatedParams.data.pdfLink,
                        pdfUploadId: validatedParams.data.pdfUploadId,
                        thumbnailUrl: validatedParams.data.thumbnailUrl,
                        thumbnailUploadId: validatedParams.data.thumbnailUploadId,
                        designCategoryId: validatedParams.data.designCategoryId,
                        subCategoryId: validatedParams.data.subCategoryId,
                        published: validatedParams.data.published,
                        designType: validatedParams.data.type,
                        userId: (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id,
                        createdBy: ((_b = req.body.user) === null || _b === void 0 ? void 0 : _b.name) || "Unknown",
                    },
                });
                res.status(201).json({
                    data: design,
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
    deleteDesign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield db_1.db.design.delete({ where: { id } });
                res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                res.status(500).json({ error: "Failed to delete design" });
            }
        });
    },
    getAllDesigns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const designs = yield db_1.db.design.findMany({
                    include: { user: true, designCategory: true, subCategory: true },
                });
                res.status(200).json({
                    data: designs,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.log("Error getting all designs: ", error);
                res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    getDesignById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const design = yield db_1.db.design.findUnique({ where: { id } });
                res.status(200).json({
                    data: design,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error fetching design by id: ", error);
                }
                res.status(500).json({
                    data: null,
                    error: "Something went wrong.",
                    success: false,
                });
            }
        });
    }
};
