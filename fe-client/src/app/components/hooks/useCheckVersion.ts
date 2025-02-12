import { useEffect } from 'react';

const CommonConstant = {
    KEY_VERSION: 'narcipia_web_version'
};

const environment = {
    version: '1.5.0'
};

const useCheckVersion = () => {

    useEffect(() => {
        const buildVersion = localStorage.getItem(CommonConstant.KEY_VERSION);

        if (!buildVersion) {
            localStorage.setItem(CommonConstant.KEY_VERSION, environment.version);
        } else if (buildVersion !== environment.version) {
            localStorage.setItem(CommonConstant.KEY_VERSION, environment.version);
            if (window.confirm('A new version is available. Reload the page to update?')) {
                window.location.reload();
            }
        }
    }, []);
};

export default useCheckVersion;