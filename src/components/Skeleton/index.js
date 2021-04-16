import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader viewBox="0 0 1360 900" height={900} width={1360} backgroundColor="#212325"
    foregroundColor="#1D2021" {...props}>
    <rect x="550" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="660" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="770" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="880" y="0" rx="4" ry="4" width="100" height="20" />

    <rect x="220" y="40" rx="8" ry="8" width="318" height="218" />
    <rect x="220" y="270" rx="0" ry="0" width="200" height="18" />
    <rect x="220" y="295" rx="0" ry="0" width="120" height="20" />

    <rect x="580" y="40" rx="8" ry="8" width="318" height="218" />
    <rect x="580" y="270" rx="0" ry="0" width="200" height="18" />
    <rect x="580" y="295" rx="0" ry="0" width="120" height="20" />

    <rect x="940" y="40" rx="8" ry="8" width="318" height="218" />
    <rect x="940" y="270" rx="0" ry="0" width="200" height="18" />
    <rect x="940" y="295" rx="0" ry="0" width="120" height="20" />

    <rect x="220" y="360" rx="8" ry="8" width="318" height="218" />
    <rect x="220" y="590" rx="0" ry="0" width="200" height="18" />
    <rect x="220" y="615" rx="0" ry="0" width="120" height="20" />

    <rect x="580" y="360" rx="8" ry="8" width="318" height="218" />
    <rect x="580" y="590" rx="0" ry="0" width="200" height="18" />
    <rect x="580" y="615" rx="0" ry="0" width="120" height="20" />

    <rect x="940" y="360" rx="8" ry="8" width="318" height="218" />
    <rect x="940" y="590" rx="0" ry="0" width="200" height="18" />
    <rect x="940" y="615" rx="0" ry="0" width="120" height="20" />


  </ContentLoader>
)

export default Skeleton;
