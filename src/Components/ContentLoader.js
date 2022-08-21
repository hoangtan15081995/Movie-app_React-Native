import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

const MyLoader = props => (
  <>
  <ContentLoader
    // viewBox="0 0 400 200"
    width={setWidth(100)}
    height={220}
    backgroundColor="#d8d5d5"
    foregroundColor="#e7e4e4"
    {...props}>
    <Rect x="20" y="0" rx="10" ry="10" width={setWidth(35)} height="200" />
    <Rect x={setWidth(35) + 40} y="0" rx="0" ry="0" width={setWidth(65) - 60} height="16" />
    <Rect x={setWidth(35) + 40} y="22" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="36" rx="0" ry="0" width="30" height="10" />
    <Rect x={setWidth(35) + 40} y="175" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="190" rx="0" ry="0" width="80" height="10" />
  </ContentLoader>
  {/* <ContentLoader
    // viewBox="0 0 400 200"
    width={setWidth(100)}
    height={220}
    backgroundColor="#d8d5d5"
    foregroundColor="#e7e4e4"
    {...props}>
    <Rect x="20" y="0" rx="10" ry="10" width={setWidth(35)} height="200" />
    <Rect x={setWidth(35) + 40} y="0" rx="0" ry="0" width={setWidth(65) - 60} height="16" />
    <Rect x={setWidth(35) + 40} y="22" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="36" rx="0" ry="0" width="30" height="10" />
    <Rect x={setWidth(35) + 40} y="175" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="190" rx="0" ry="0" width="80" height="10" />
  </ContentLoader>
  <ContentLoader
    // viewBox="0 0 400 200"
    width={setWidth(100)}
    height={220}
    backgroundColor="#d8d5d5"
    foregroundColor="#e7e4e4"
    {...props}>
    <Rect x="20" y="0" rx="10" ry="10" width={setWidth(35)} height="200" />
    <Rect x={setWidth(35) + 40} y="0" rx="0" ry="0" width={setWidth(65) - 60} height="16" />
    <Rect x={setWidth(35) + 40} y="22" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="36" rx="0" ry="0" width="30" height="10" />
    <Rect x={setWidth(35) + 40} y="175" rx="0" ry="0" width="110" height="10" />
    <Rect x={setWidth(35) + 40} y="190" rx="0" ry="0" width="80" height="10" />
  </ContentLoader> */}
  </>
  
);

export default MyLoader;
