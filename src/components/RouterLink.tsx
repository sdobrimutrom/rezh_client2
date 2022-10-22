import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { ReactNode } from 'react';
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
            React.forwardRef<HTMLAnchorElement, MyNavLinkProps>(
                function IJUSTWANTTOKILLTHEONEWHOWROTETHISCODE(navLinkProps, ref) {
                    const { className: previousClasses, ...rest } = navLinkProps;
                    const elementClasses = previousClasses?.toString() ?? '';
                    return (
                        <NavLink
                            {...rest}
                            ref={ref}
                            to={props.to}
                            end
                            className={({ isActive }) =>
                                isActive ? elementClasses + ' Mui-selected' : elementClasses
                            }
                        />
                    );
                }
            ),
        [props.to]
    );
    return (
        <ListItemButton component={MyNavLink}>
            {Icon ? (
                <ListItemIcon
                    sx={{ '.Mui-selected > &': { color: (theme) => theme.palette.primary.main } }}>
                    <Icon />
                </ListItemIcon>
            ) : (
                <ListItemIcon
                    sx={{
                        '.Mui-selected > &': { color: (theme) => theme.palette.primary.main }
                    }}></ListItemIcon>
            )}
            <ListItemText primary={props.text} />
        </ListItemButton>
    );
};
