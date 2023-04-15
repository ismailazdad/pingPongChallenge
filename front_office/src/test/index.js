import {render as rtlRender} from '@testing-library/react'
import React from "react";


export function Wrapper({children}) {
    return (<div>
        {children}
        </div>
    )
}

export function render(ui) {
    rtlRender(ui, {wrapper: Wrapper})
}