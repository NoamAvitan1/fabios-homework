"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.router = void 0;
const { initTRPC } = require('@trpc/server');
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = t.router;
exports.publicProcedure = t.procedure;
