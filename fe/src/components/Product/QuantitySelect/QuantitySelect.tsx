import { Select } from '@base-ui-components/react/select';
import styles from './QuantitySelect.module.scss';

interface QuantitySelectProps {
  quantity: string;
  onQuantityChange: (quantity: string) => void;
}

const QuantitySelect = ({onQuantityChange, quantity}: QuantitySelectProps) => {

  const maxQuantity = 3;

  const handleSelectChange = (quantity: string) => {
    onQuantityChange(quantity);
  };

  return (
    <Select.Root
      value={quantity}
      onValueChange={handleSelectChange}
      alignItemToTrigger={false}
    >
      <Select.Trigger className={styles.Select}>
        <Select.Value placeholder="QTY" />
        <Select.Icon className={styles.SelectIcon}>▼</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.Positioner} sideOffset={8}>
          <Select.ScrollUpArrow className={styles.ScrollArrow} />
          <Select.Popup className={styles.Popup}>
            {Array.from({length: maxQuantity}).map((_, i) => 
              <Select.Item className={styles.Item} value={i + 1} key={i}>
                <Select.ItemText className={styles.ItemText}>
                  {i + 1}
                </Select.ItemText>
              </Select.Item>
            )}
          </Select.Popup>
          <Select.ScrollDownArrow className={styles.ScrollArrow} />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export default QuantitySelect;
