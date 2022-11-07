import React, { ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, NavLinkProps } from 'react-router-dom';

type RouterLinkProps = React.PropsWithChildren<{
    to: string;
    text: string;
    icon?: any;
}>;

export const RouterLink = (props: RouterLinkProps) => {
    let Icon;
    if (props.icon) {
        Icon = props.icon;
    }

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
        <Nav.Link as={ MyNavLink }>
            { props.text }
        </Nav.Link>
    );
};
