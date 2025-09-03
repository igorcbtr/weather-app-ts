import './Background.css'
import React from 'react';
interface BackgroundProps {
  children?: React.ReactNode;
}

export function Background ({children} : BackgroundProps) {
    return (
        <div className="page-div">
            {children}
        </div>
    )
}