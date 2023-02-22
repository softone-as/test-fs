import React from 'react';
import { Link } from '@inertiajs/inertia-react';

import { Route } from 'apps/backoffice/app/Enums/Route';

const CompanyLogo = () => {
    return (
        <Link href={Route.Dashboard}>
            <img src="/img/company-logo.svg" width="80px" />
        </Link>
    );
};

export default CompanyLogo;
