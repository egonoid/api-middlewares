const eventLogger = () => {
    return {
        before: (handler, next) => {
            console.log(JSON.stringify(handler.event, null, 2));
            next();
        },
    };
};
export default eventLogger;
//# sourceMappingURL=eventLogger.middleware.js.map