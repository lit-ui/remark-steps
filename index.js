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
const unist_util_visit_1 = require("unist-util-visit");
const plugin = (options) => {
    const transformer = (ast) => __awaiter(void 0, void 0, void 0, function* () {
        (0, unist_util_visit_1.visit)(ast, "containerDirective", (node) => {
            var _a;
            if (node.type === "containerDirective" && node.name === "steps") {
                let newChildren = [];
                let stepDivNode = null;
                let nonHeadingChildren = [];
                (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
                    var _a, _b;
                    if (child.type === "heading" && child.depth === 3) {
                        if (nonHeadingChildren.length > 0 && stepDivNode) {
                            stepDivNode === null || stepDivNode === void 0 ? void 0 : stepDivNode.children.push({
                                type: "div",
                                children: [...nonHeadingChildren],
                                data: {
                                    hProperties: {
                                        className: "step_content",
                                    },
                                },
                            });
                            nonHeadingChildren = [];
                        }
                        const originalClassName = ((_b = (_a = child.data) === null || _a === void 0 ? void 0 : _a.hProperties) === null || _b === void 0 ? void 0 : _b.className) || "";
                        child.data = {
                            hProperties: {
                                id: child.children[0].value,
                                className: `step_title ${originalClassName}`.trim(),
                            },
                        };
                        stepDivNode = {
                            type: "div",
                            children: [child],
                            data: {
                                hProperties: {
                                    className: "step",
                                },
                            },
                        };
                        newChildren.push(stepDivNode);
                    }
                    else {
                        nonHeadingChildren.push(child);
                    }
                });
                if (nonHeadingChildren.length > 0 && stepDivNode) {
                    stepDivNode.children.push({
                        type: "div",
                        children: [...nonHeadingChildren],
                        data: {
                            hProperties: {
                                className: "step_content",
                            },
                        },
                    });
                }
                node.children = newChildren;
                node.data = {
                    hProperties: {
                        className: "steps",
                    },
                };
            }
        });
    });
    return transformer;
};
exports.default = plugin;
