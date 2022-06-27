import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import classnames from 'classnames';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RouteList } from '../../../Enums/Route';
import { RiAdminFill, RiDeleteBinLine, RiLockPasswordFill } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';
import SidebarDropdown from '../../molecules/Sidebars/SidebarDropdown.molecule';
import OverlayBox from '../../atoms/Box/OverlayBox.atom';
import { usePage } from '@inertiajs/inertia-react';

const Sidebar = (): any => {
    const [profileActive, setProfileActive] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const { playerId, userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    return (
        <>
            <GiHamburgerMenu
                className="sidebar__burger"
                onClick={() => setIsShow(!isShow)}
            />

            <OverlayBox isShow={isShow} handleClose={() => setIsShow(false)} />

            <div
                className={classnames('sidebar', {
                    show: isShow,
                })}
            >
                <div className="sidebar__top">
                    <a className="sidebar__logo" href="/">
                        <img
                            className="sidebar__pic sidebar__pic_black"
                            src="/unity/img/logo.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="sidebar__wrapper">
                    <div className="sidebar__inner">
                        <div className="sidebar__list">
                            <div className="sidebar__group">
                                <div className="sidebar__menu">
                                    {RouteList.map(function (route) {
                                        // intersec
                                        const isPermissionAvail = permissionList.filter(function (n) { return route.permissions.indexOf(n) !== -1; })
                                        if (isPermissionAvail.length < 1) {
                                            return (<></>);
                                        } else if (route.children) {
                                            return (
                                                <SidebarDropdown
                                                    key={route.name}
                                                    title={route.name}
                                                    dropdowns={route.children}
                                                    icon={route.icon}
                                                />
                                            );
                                        } else {
                                            return (
                                                <Link
                                                    key={route.name}
                                                    className={classnames(
                                                        'sidebar__item',
                                                        {
                                                            active:
                                                                window.location
                                                                    .pathname ===
                                                                route.href,
                                                        },
                                                    )}
                                                    href={route.href}
                                                >
                                                    <div className="sidebar__text">
                                                        {route.name}
                                                    </div>
                                                </Link>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            <br />
                            <div className="sidebar__profile">
                                <div
                                    className="sidebar__details"
                                    style={{
                                        display: profileActive
                                            ? 'block'
                                            : 'none',
                                    }}
                                >
                                    <Link
                                        className="sidebar__link"
                                        href="/change-password"
                                    >
                                        <div className="sidebar__icon">
                                            <RiLockPasswordFill />
                                        </div>
                                        <div className="sidebar__text">
                                            Ubah Password
                                        </div>
                                    </Link>
                                    <Link
                                        className="sidebar__link"
                                        href="/?cache=clean-all"
                                    >
                                        <div className="sidebar__icon">
                                            <RiDeleteBinLine />
                                        </div>
                                        <div className="sidebar__text">
                                            Clean Cache
                                        </div>
                                    </Link>
                                    <Link
                                        className="sidebar__link"
                                        href={`/auth/logout?one_signal_player_id=${playerId}`}
                                    >
                                        <div className="sidebar__icon">
                                            <BiLogOutCircle />
                                        </div>
                                        <div className="sidebar__text">
                                            Log out
                                        </div>
                                    </Link>
                                </div>
                                <a
                                    className={classnames('sidebar__user', {
                                        active: profileActive,
                                    })}
                                    onClick={() =>
                                        setProfileActive(!profileActive)
                                    }
                                    href="#"
                                >
                                    <div className="sidebar__ava">
                                        <RiAdminFill size={22} />
                                    </div>
                                    <div className="sidebar__desc">
                                        <div className="sidebar__man">
                                            Admin
                                        </div>
                                    </div>
                                    <div className="sidebar__arrow">
                                        <svg className="icon icon-arrows">
                                            <use xlinkHref="/unity/img/sprite.svg#icon-arrows"></use>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
