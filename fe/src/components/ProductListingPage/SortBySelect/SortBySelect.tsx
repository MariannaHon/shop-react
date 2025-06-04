import { Select } from '@base-ui-components/react/select';
import styles from './SortBySelect.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { changeSortOrder, OrderType } from '@/redux/products/slice';

const SortBySelect = () => {
  const [sortSelect, setSortSelect] = useState<OrderType>('alphabetical');
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (selected: OrderType) => {
    setSortSelect(selected);
    dispatch(changeSortOrder(selected));
  };

  return (
    <Select.Root
      value={sortSelect}
      onValueChange={handleSelectChange}
      defaultValue="alphabetical"
    >
      <Select.Trigger className={styles.Select}>
        <Select.Value placeholder="Sans-serif" />
        <Select.Icon className={styles.SelectIcon}>▼</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.Positioner} sideOffset={8}>
          <Select.ScrollUpArrow className={styles.ScrollArrow} />
          <Select.Popup className={styles.Popup}>
            <Select.Item className={styles.Item} value="alphabetical">
              <Select.ItemText className={styles.ItemText}>
                name
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={styles.Item} value="high-low">
              <Select.ItemText className={styles.ItemText}>
                price: high to low
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={styles.Item} value="low-high">
              <Select.ItemText className={styles.ItemText}>
                price: low to high
              </Select.ItemText>
            </Select.Item>
          </Select.Popup>
          <Select.ScrollDownArrow className={styles.ScrollArrow} />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export default SortBySelect;
