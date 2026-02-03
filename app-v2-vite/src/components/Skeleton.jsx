import React from 'react';

export const Skeleton = ({
    width = '100%',
    height = '20px',
    borderRadius = '8px',
    marginBottom = '0',
    className = '',
    style = {}
}) => {
    return (
        <div
            className={`skeleton-base ${className}`}
            style={{
                width,
                height,
                borderRadius,
                marginBottom,
                background: 'rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
        >
            <div className="skeleton-shimmer"></div>
        </div>
    );
};

export const DiscussionSkeleton = () => (
    <div className="card" style={{ cursor: 'default', pointerEvents: 'none', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 15 }}>
            <Skeleton width="44px" height="44px" borderRadius="50%" />
            <div style={{ flex: 1 }}>
                <Skeleton width="40%" height="12px" marginBottom="6px" />
                <Skeleton width="20%" height="10px" />
            </div>
        </div>
        <Skeleton width="90%" height="16px" marginBottom="8px" />
        <Skeleton width="70%" height="16px" marginBottom="16px" />
        <div style={{ display: 'flex', gap: 8 }}>
            <Skeleton width="60px" height="24px" borderRadius="12px" />
            <Skeleton width="60px" height="24px" borderRadius="12px" />
        </div>
    </div>
);

export const BidangDetailSkeleton = () => (
    <div className="animate">
        <div style={{ padding: '24px 16px' }}>
            <Skeleton width="150px" height="28px" marginBottom="24px" />
            <div style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
                <Skeleton height="44px" borderRadius="16px" />
                <Skeleton height="44px" borderRadius="16px" />
                <Skeleton height="44px" borderRadius="16px" />
            </div>
            {[1, 2, 3].map(i => <DiscussionSkeleton key={i} />)}
        </div>
    </div>
);

export default Skeleton;
