import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

export default function BreadcrumbItem({ children }: { children: Array<JSX.Element> }) {
    return (
        <div className={ 'd-flex flex-row flex-wrap gap-2 align-items-center my-2 user-select-none' }>
            { children.map((breadcrumb, index) => {
                return (<>{ breadcrumb } { index !== children.length - 1 && <span>{ '>' }</span> }</>);
            }) }
        </div>
    );
}