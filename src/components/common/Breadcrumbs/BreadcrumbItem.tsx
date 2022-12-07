import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

export default function BreadcrumbItem({ to, label, isActive = false }: { to: string, label: string, isActive?: boolean }) {
    return (
        <LinkContainer to={ to }>
            <h6 className={`m-0 ${isActive ? 'text-primary' : '' }`}>{ label }</h6>
        </LinkContainer>
    );
}