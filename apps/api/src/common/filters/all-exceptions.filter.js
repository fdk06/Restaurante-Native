var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
let AllExceptionsFilter = (() => {
    let _classDecorators = [Catch()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AllExceptionsFilter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AllExceptionsFilter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        httpAdapterHost;
        constructor(httpAdapterHost) {
            this.httpAdapterHost = httpAdapterHost;
        }
        catch(exception, host) {
            // Extraigo el contexto HTTP para poder enviar la respuesta
            const { httpAdapter } = this.httpAdapterHost;
            const ctx = host.switchToHttp();
            // Determino el código de estado (si es HttpException uso su status, sino 500)
            const httpStatus = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
            // Extraigo el mensaje (si es HttpException puede tener una respuesta personalizada)
            let message = 'Internal server error';
            if (exception instanceof HttpException) {
                const response = exception.getResponse();
                message = typeof response === 'string' ? response : response.message || response;
            }
            else if (exception instanceof Error) {
                // En desarrollo podría mostrar el error real, pero genéricamente lo dejo así
                message = exception.message;
            }
            // Estructuro la respuesta según lo solicitado
            const responseBody = {
                statusCode: httpStatus,
                message,
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest()),
            };
            // Envío la respuesta
            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
    };
    return AllExceptionsFilter = _classThis;
})();
export { AllExceptionsFilter };
