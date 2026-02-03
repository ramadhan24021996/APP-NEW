import React from 'react';

const Background3D = ({ children, color1, color2, showGrid = true }) => {
    return (
        <div className="page-container-3d">
            <div className="bg-blob blob-1" style={{ background: color1 || 'var(--primary)' }}></div>
            <div className="bg-blob blob-2" style={{ background: color2 || 'var(--secondary)' }}></div>
            {showGrid && <div className="mesh-grid"></div>}
            <div className="glass-panel-3d">
                {children}
            </div>
        </div>
    );
};

export default Background3D;
