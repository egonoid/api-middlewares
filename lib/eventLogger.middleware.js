"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventLogger = () => {
    return {
        before: (handler, next) => {
            console.log(JSON.stringify(handler.event, null, 2));
            next();
        },
    };
};
exports.default = eventLogger;
//# sourceMappingURL=eventLogger.middleware.js.map