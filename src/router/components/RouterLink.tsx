import React, { ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, NavLinkProps } from 'react-router-dom';

type RouterLinkProps = React.PropsWithChildren<{
    to: string;
    children: any;
}>;

export const RouterLink = (props: RouterLinkProps) => {
    type MyNavLinkProps = Omit<NavLinkProps, 'to'>;
    const MyNavLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, MyNavLinkProps>(function IJUSTWANTTOKILLTHEONEWHOWROTETHISCODE(
                navLinkProps,
                ref,
            ) {
                const { className: previousClasses, ...rest } = navLinkProps;
                const elementClasses = previousClasses?.toString() ?? '';
                return (
                    <NavLink
                        { ...rest }
                        ref={ ref }
                        to={ props.to }
                        end
                        className={ ({ isActive }) => (isActive ? elementClasses + ' Mui-selected' : elementClasses) }
                    />
                );
            }),
        [props.to],
    );
    return (
        <Nav.Link as={ MyNavLink } className={'d-flex flex-row gap-2 align-items-center padding-0'}>
            { props.children }
        </Nav.Link>
    );
};
