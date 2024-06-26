import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../public/unity/css/unity.css';
import '../public/css/app.css';

import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';

if (process.env.SENTRY_DSN) {
    const replay = new Sentry.replayIntegration({
        maskAllText: false, 
        maxReplayDuration: 1000 * 60 * 5, // 5 minutes
    });

    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            new Sentry.browserTracingIntegration(),
            replay
        ],
        environment: process.env.NODE_ENV,
        ignoreErrors: [/Network Error/i],
        denyUrls: [
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
            /^chrome-extension:\/\//i,
        ],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: +process.env.TRACES_SAMPLE_RATE || 1.0,
        replaysSessionSampleRate: +process.env.REPLAYS_SESSION_SAMPLE_RATE || 0.3,
        replaysOnErrorSampleRate: +process.env.REPLAYS_ON_ERROR_SAMPLE_RATE || 1.0,
    });

    replay.start();
}

if (process.env.LOGROCKET_APP_ID) {
    LogRocket.init(process.env.LOGROCKET_APP_ID);

    LogRocket.identify('LOCAL_DEVELOPMENT', {
        host: process.env.HOST_BACKOFFICE,
        env: process.env.NODE_ENV,
    });

    LogRocket.getSessionURL((sessionURL) => {
        Sentry.getCurrentScope((scope) => {
            scope.setExtra('sessionURL', sessionURL);
        });
    });
}

// After
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
