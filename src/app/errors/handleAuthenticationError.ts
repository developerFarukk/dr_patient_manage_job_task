

import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleAuthenticationErr = (message: string): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: 'Authentication',
            details: message || 'Authentication failed. Invalid credentials.',
        },
    ];

    const statusCode = 401;

    return {
        statusCode,
        message: 'Authentication Error',
        errorSources,
    };
};

export default handleAuthenticationErr;
