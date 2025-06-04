import React, { useState } from 'react';
import styles from "./Skeleton.module.scss";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  skeletonWidth?: string | number;
  skeletonHeight?: string | number;
}

const ImageWithSkeleton = ({
  src,
  alt,
  skeletonWidth = '100%',
  skeletonHeight = '100%',
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
      setIsLoading(false);
  };

  const skeletonStyles: React.CSSProperties = {
    width: skeletonWidth,
    height: skeletonHeight,
  };

  if (isLoading) {
    return (
      <div className={styles['skeleton-loader']} style={skeletonStyles}>
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={skeletonStyles}
    />
  );
};

export default ImageWithSkeleton;