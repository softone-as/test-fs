/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
// import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContext } from './Contexts/Toast';
import { AppProvider } from './Contexts/App';
import { NotificationResponseProvider } from './Contexts/NotificationResponse';

//Ant Design
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { globalThemeConfig } from './Utils/theme';

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
            <ConfigProvider theme={globalThemeConfig}>
                <AppProvider>
                    <NotificationResponseProvider>
                        <InertiaApp
                            initialPage={JSON.parse(app.dataset.page)}
                            resolveComponent={(pageString) =>
                                import(`./Pages/${pageString}`).then(
                                    (module) => module.default,
                                )
                            }
                        />
                    </NotificationResponseProvider>
                </AppProvider>
            </ConfigProvider>
        </>
    );
};

export default App;
