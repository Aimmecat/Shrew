/*
 * @Author: your name
 * @Date: 2021-04-16 11:03:02
 * @LastEditTime: 2021-04-18 10:34:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\pages\base\myhw\searchFilter\index.tsx
 */
import { Input } from 'antd';
import styles from '@/styles/search-filter.less';
interface SearchFilterProps {
  onSearch: () => void;
  searchProps: defs.MyhwQueryDTO;
  changeSearchProps: (searchProps: defs.MyhwQueryDTO) => void;
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
              equipmentName: e.target.value,
              equipmentValue: e.target.value,
              userPeople: e.target.value,
              homeId: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
