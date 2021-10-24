import { Input } from 'antd';
import styles from '@/styles/search-filter.less';
interface SearchFilterProps {
  onSearch: () => void;
  searchProps: defs.DepartmentQueryDTO;
  changeSearchProps: (searchProps: defs.DepartmentQueryDTO) => void;
}

export default function SearchFilter(props: SearchFilterProps) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>关键词：</span>
        <Input.Search
          allowClear={true}
          value={props.searchProps.departmentName}
          onSearch={props.onSearch}
          onChange={(e) =>
            props.changeSearchProps({
              departmentName: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
