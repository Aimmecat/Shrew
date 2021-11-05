import { Input } from 'antd';
import styles from '@/styles/search-filter.less';
interface SearchFilterProps {
  onSearch: () => void;
  searchProps: defs.Iot_dataQueryDTO;
  changeSearchProps: (searchProps: defs.Iot_dataQueryDTO) => void;
}

export default function SearchFilter(props: SearchFilterProps) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>关键词：</span>
        <Input.Search
          allowClear={true}
          onSearch={props.onSearch}
          onChange={(e) =>
            props.changeSearchProps({
              equipmentId: e.target.value,
              location:e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
