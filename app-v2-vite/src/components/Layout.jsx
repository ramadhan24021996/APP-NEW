import React from 'react';

/**
 * Column: Vertical flex container
 */
export const Column = ({ 
    children, 
    align = 'stretch', 
    justify = 'flex-start', 
    gap = 0, 
    padding = 0,
    style = {},
    className = '',
    ...props 
}) => {
    return (
        <div 
            className={`layout-column ${className}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: align,
                justifyContent: justify,
                gap: typeof gap === 'number' ? `${gap}px` : gap,
                padding: typeof padding === 'number' ? `${padding}px` : padding,
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Row: Horizontal flex container
 */
export const Row = ({ 
    children, 
    align = 'center', 
    justify = 'flex-start', 
    gap = 0, 
    padding = 0,
    style = {},
    className = '',
    ...props 
}) => {
    return (
        <div 
            className={`layout-row ${className}`}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: align,
                justifyContent: justify,
                gap: typeof gap === 'number' ? `${gap}px` : gap,
                padding: typeof padding === 'number' ? `${padding}px` : padding,
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Box: Container for stacking or centering
 */
export const Box = ({ 
    children, 
    padding = 0,
    style = {},
    className = '',
    contentAlign = 'center',
    ...props 
}) => {
    const alignmentStyles = contentAlign === 'center' ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    } : {};

    return (
        <div 
            className={`layout-box ${className}`}
            style={{
                position: 'relative',
                padding: typeof padding === 'number' ? `${padding}px` : padding,
                ...alignmentStyles,
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Spacer: Flexible or fixed empty space
 */
export const Spacer = ({ size = 0, flex = 0, style = {} }) => {
    return (
        <div 
            style={{
                flex: flex || 'none',
                width: typeof size === 'number' ? `${size}px` : size,
                height: typeof size === 'number' ? `${size}px` : size,
                ...style
            }}
        />
    );
};
