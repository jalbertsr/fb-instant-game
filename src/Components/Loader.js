import React from 'react';
import ContentLoader from "react-content-loader";

const MainLoader = props => (
  <ContentLoader
    height={150}
    width={375}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="121.27" y="44.65" rx="4" ry="4" width="117" height="16.13" />
    <rect x="40" y="113.63" rx="3" ry="3" width="118.44" height="10.17" />
    <rect x="222.8" y="110.59" rx="3" ry="3" width="105.04" height="9.48" />
  </ContentLoader>
);

export default MainLoader;
