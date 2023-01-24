/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
// import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContext } from './Contexts/Toast';

//Ant Design
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { globalConfig } from './Utils/theme';

// 006D75

const App = () => {
    // TEMP disabled
    // OneSignal.init({
    //     appId: process.env.ONE_SIGNAL_APP_ID,
    //     allowLocalhostAsSecureOrigin: true,
    // }).then(() => {
    //     OneSignal.isPushNotificationsEnabled((isEnabled) => {
    //         if (!isEnabled) {
    //             OneSignal.showSlidedownPrompt({
    //                 force: true,
    //                 forceSlidedownOverNative: true,
    //             });
    //         }
    //     });
    // });

    return (
        <>
            <ConfigProvider theme={globalConfig}>
                <InertiaApp
                    initialPage={JSON.parse(app.dataset.page)}
                    resolveComponent={(pageString) =>
                        import(`./Pages/${pageString}`).then(
                            (module) => module.default,
                        )
                    }
                />
            </ConfigProvider>
        </>
    );
};

export default App;
