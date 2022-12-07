import React from 'react';

export default function BreadcrumbGroup({ children }: { children: Array<JSX.Element> }) {
    return (
        <div className={ 'd-flex flex-row flex-wrap gap-2 align-items-center my-2 user-select-none' }>
            { children.map((breadcrumb, index) => {
                return (
                    <React.Fragment key={ index }>
                        { breadcrumb }
                        { index !== children.length - 1 && <span>{ '>' }</span> }
                    </React.Fragment>);
            }) }
        </div>
    );
}