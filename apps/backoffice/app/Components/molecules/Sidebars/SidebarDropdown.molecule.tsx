import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';

import { RouteType } from '../../../Enums/Route';

type SidebarDropdownProps = {
    title: string;
    dropdowns: RouteType[];
    icon: string;
};

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
    title,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    icon: Icon,
    dropdowns,
}) => {
    const [isActive, setIsActive] = useState(false);
    const { playerId, userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    const isMenuActive = (dropdown: RouteType) =>
        window.location.pathname.startsWith(dropdown.href);

    React.useEffect(() => {
        dropdowns.map((dropdown) => {
            if (isMenuActive(dropdown)) {
                setIsActive(true);
            }
        });
    }, []);

    return (
        <div className="sidebar__profile">
            <a
                className={classNames('sidebar__user', {
                    active: isActive,
                })}
                onClick={() => setIsActive(!isActive)}
                href="#"
            >
                <div className="sidebar__ava">{Icon && <Icon />}</div>
                <div className="sidebar__desc">
                    <div className="sidebar__man">{title}</div>
                </div>
                <div className="sidebar__arrow">
                    <svg className="icon icon-arrows">
                        <use xlinkHref="/unity/img/sprite.svg#icon-arrows"></use>
                    </svg>
                </div>
            </a>

            <div
                className="sidebar__details"
                style={{
                    display: isActive ? 'block' : 'none'
                }}
            >
                {dropdowns?.map((dropdown) => {
                    const SidebarIcon = dropdown.icon;
                    const isPermissionAvail = permissionList.filter(function (n) { return dropdown.permissions.indexOf(n) !== -1; })

                    if (isPermissionAvail.length < 1) {
                        return (<></>);
                    } else {
                        return (
                            <Link
                                className={classNames('sidebar__link', {
                                    active: isMenuActive(dropdown),
                                })}
                                href={dropdown.href}
                                key={dropdown.href}
                            >
                                <div className="sidebar__icon">
                                    {SidebarIcon && <SidebarIcon />}
                                </div>
                                <div className="sidebar__text">{dropdown.name}</div>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SidebarDropdown;
