import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../public/unity/css/unity.css';
import '../public/css/app.css';

import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: +process.env.TRACES_SAMPLE_RATE || 1.0,
    });
}

if (process.env.LOGROCKET_APP_ID) {
    LogRocket.init(process.env.LOGROCKET_APP_ID);

    LogRocket.identify('LOCAL_DEVELOPMENT', {
        host: process.env.HOST_BACKOFFICE,
        env: process.env.NODE_ENV,
    });

    LogRocket.getSessionURL((sessionURL) => {
        Sentry.configureScope((scope) => {
            scope.setExtra('sessionURL', sessionURL);
        });
    });
}

// After
ReactDOM.render(<App />, document.getElementById('app'));
