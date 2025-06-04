import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
}

const Skeleton = ({width = '100%', height = '20px'}: SkeletonProps) => {

  const componentStyles: React.CSSProperties = {
    width,
    height,
  };


  return (
    <div
      className={styles['skeleton-loader']}
      style={componentStyles}
    />
  );
};

export default Skeleton;