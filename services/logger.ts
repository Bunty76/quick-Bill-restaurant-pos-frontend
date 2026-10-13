/// <reference types="vite/client" />

// Mirror the same prod/dev URL strategy used in api.ts
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
        ? 'https://quick-bill-restaurant-pos.onrender.com/api'
        : '/api');

interface LogPayload {
    level: 'info' | 'warn' | 'error';
    message: string;
    meta?: Record<string, any>;
}

const sendLog = (payload: LogPayload) => {
    // Also log to console for easy debugging during development
    switch(payload.level) {
        case 'info': console.info(`[INFO] ${payload.message}`, payload.meta || ''); break;
        case 'warn': console.warn(`[WARN] ${payload.message}`, payload.meta || ''); break;
        case 'error': console.error(`[ERROR] ${payload.message}`, payload.meta || ''); break;
    }

    // Attach the auth token so the protected /logs endpoint accepts the request
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Do not await this, logging should be fire-and-forget
    fetch(`${API_BASE_URL}/logs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    }).catch(err => {
        // If logging fails, we don't want to create a loop of errors.
        // Just log it to the console and move on.
        console.error('FATAL: Failed to send log to server:', err);
    });
};

export const logger = {
    info: (message: string, meta?: Record<string, any>) => {
        sendLog({ level: 'info', message, meta });
    },
    warn: (message: string, meta?: Record<string, any>) => {
        sendLog({ level: 'warn', message, meta });
    },
    error: (message: string, meta?: Record<string, any>) => {
        sendLog({ level: 'error', message, meta });
    },
};
