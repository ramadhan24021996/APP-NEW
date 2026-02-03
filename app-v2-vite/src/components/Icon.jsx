import React, { useEffect } from 'react';

const Icon = ({ name, size = 20, color = "currentColor" }) => {
    useEffect(() => {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }, [name]);
    return <i data-lucide={name} style={{ width: size, height: size, color }}></i>;
};

export default Icon;
