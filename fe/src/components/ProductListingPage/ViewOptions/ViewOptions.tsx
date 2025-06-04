import { useDispatch, useSelector } from "react-redux";
import SortBySelect from "../SortBySelect/SortBySelect";
import styles from "./ViewOptions.module.scss";
import { AppDispatch } from "@/redux/store";
import { selectView } from "@/redux/products/selectors";
import { changeLimit, changeViewMode } from "@/redux/products/slice";
import ListIcon from "./ListIcon";
import GridIcon from "./GridIcon";

const ViewOptions = () => {
    const dispatch = useDispatch<AppDispatch>();

    const currentView = useSelector(selectView);
    const handleViewChange = (newView: 'grid' | 'list') => {
        dispatch(changeViewMode(newView));
        const newLimit = newView === 'grid' ? 9 : 5;
        dispatch(changeLimit(newLimit));
    };
    
    return (
        <div className={styles.viewOptions}>
            <SortBySelect />
            <div className={styles.viewOptions__buttons}>
                <button className={styles.viewOptions__button} onClick={() => handleViewChange('list')}>
                    <ListIcon currentView={currentView} />
                </button>
                <button className={styles.viewOptions__button} onClick={() => handleViewChange('grid')}>
                    <GridIcon currentView={currentView} />
                </button>
            </div>
        </div>
    );
}

export default ViewOptions;