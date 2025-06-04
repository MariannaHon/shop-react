import { Slider } from '@base-ui-components/react/slider';
import styles from './PriceFilter.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectOverallPriceRange } from '@/redux/products/selectors';
import { AppDispatch } from '@/redux/store';
import { changeFilter } from '@/redux/filters/slice';

const PriceFilter = () => {
  const isLoading = useSelector(selectLoading);
  const overallPriceRange = useSelector(selectOverallPriceRange);

  const [rangeValues, setRangeValues] = useState<[number, number]>([overallPriceRange.min, overallPriceRange.max]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isLoading) {
      setRangeValues([overallPriceRange.min, overallPriceRange.max])
    }
  }, [isLoading, overallPriceRange])

  const handleSliderValueChange = (newValue: number[]) => {
    setRangeValues([newValue[0], newValue[1]]);
  };

  const handleSliderValueCommit = (committedValue: number[]) => {
    dispatch(changeFilter({filter: 'price', value: [committedValue[0], committedValue[1]]}));
  };

  return (
    <div className={styles.sliderComponent}>
      {!isLoading &&
        <div className={styles.slider}>
          <Slider.Root
            defaultValue={[overallPriceRange.min, overallPriceRange.max]}
            min={overallPriceRange.min}
            max={overallPriceRange.max}
            onValueChange={handleSliderValueChange}
            onValueCommitted={handleSliderValueCommit}
            step={0.01}
          >
            <Slider.Control className={styles.Control}>
              <Slider.Track className={styles.Track}>
                <Slider.Indicator className={styles.Indicator} />
                <Slider.Thumb className={styles.Thumb}/>
                <Slider.Thumb className={styles.Thumb}/>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      }
      <div className={styles.values}>
        <div className={styles.valueBox}>{rangeValues[0]}</div>
        <div className={styles.valueBox}>{rangeValues[1]}</div>
      </div>
    </div>
  );
};

export default PriceFilter;