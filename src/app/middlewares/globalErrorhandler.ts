



// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 401;
    let details = 'Error message describing the issue';

    let error: TErrorSources = [
        {
            path: '',
            details: 'Additional error details, if applicable',
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        details = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        details = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        details = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        details = simplifiedError?.message;
        error = simplifiedError?.errorSources;
    } else if (err instanceof Error) {
        details = err.message;
        error = [
            {
                path: '',
                details: err?.message,
            },
        ];
    }

    // Main Error Return
    return res.status(statusCode).json({
        success: false,
        details,
        statusCode: statusCode,
        error,
        stack: config.node_env === 'development' ? err?.stack : null,
    }) as unknown as void;
};

export default globalErrorHandler;