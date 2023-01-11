/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InertiaApp } from '@inertiajs/inertia-react';
import React, { useMemo } from 'react';
// import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
// import 'react-toastify/dist/ReactToastify.css';
import { ToastContext } from './Contexts/Toast';

//Ant Design
import 'antd/dist/reset.css';

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
    const contextValue = useMemo(() => ({ username: 'Ant Design' }), []);

    return (
        <>
            {/* <ToastContainer /> */}
            <ToastContext.Provider value={contextValue}>
                <InertiaApp
                    initialPage={JSON.parse(app.dataset.page)}
                    resolveComponent={(pageString) =>
                        import(`./Pages/${pageString}`).then(
                            (module) => module.default,
                        )
                    }
                />
            </ToastContext.Provider>
        </>
    );
};

export default App;
