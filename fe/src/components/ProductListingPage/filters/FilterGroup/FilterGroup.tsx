import React, { useState, ReactNode } from 'react';

import styles from './FilterGroup.module.scss';

interface FilterGroupProps {
  title: string;
  children: ReactNode;
}

const FilterGroup = ({title, children}: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleToggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <div className={`${styles.group} ${isOpen ? styles.isOpen : styles.isClosed}`}>
      <div className={styles.header}>
        <span className={styles.header__title}>{title}</span>
        <button type="button" className={styles.header__button} onClick={handleToggle}>
          <span className={styles.header__icon}>{isOpen ? '▲' : '▼'}</span>
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FilterGroup;