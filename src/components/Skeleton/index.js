import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
<ContentLoader viewBox="0 0 1360 900" height={900} width={1360} backgroundColor="#212325"
    foregroundColor="#1D2021" {...props}>
    <rect x="220" y="20" rx="8" ry="8" width="318" height="218" />
    <rect x="220" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="220" y="275" rx="0" ry="0" width="120" height="20" />

    <rect x="580" y="20" rx="8" ry="8" width="318" height="218" />
    <rect x="580" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="580" y="275" rx="0" ry="0" width="120" height="20" />

    <rect x="940" y="20" rx="8" ry="8" width="318" height="218" />
    <rect x="940" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="940" y="275" rx="0" ry="0" width="120" height="20" />

    <rect x="220" y="340" rx="8" ry="8" width="318" height="218" />
    <rect x="220" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="220" y="595" rx="0" ry="0" width="120" height="20" />

    <rect x="580" y="340" rx="8" ry="8" width="318" height="218" />
    <rect x="580" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="580" y="595" rx="0" ry="0" width="120" height="20" />

    <rect x="940" y="340" rx="8" ry="8" width="318" height="218" />
    <rect x="940" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="940" y="595" rx="0" ry="0" width="120" height="20" />


  </ContentLoader>
)

export default Skeleton;
