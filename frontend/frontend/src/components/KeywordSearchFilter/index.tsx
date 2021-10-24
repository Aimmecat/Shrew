import * as React from 'react';
import { Input } from 'antd';
import styles from './index.less';
import { KeywordSearchProps } from '@/interfaces/common';

interface SearchFilterProps {
  onSearch: (searchProps: KeywordSearchProps) => void;
  searchProps: KeywordSearchProps;
  changeSearchProps: (searchProps: KeywordSearchProps) => void;
}

export default class KeywordSearchFilter extends React.Component<SearchFilterProps> {
  public constructor(props: SearchFilterProps) {
    super(props);
  }

  private handlePropChanged(prop: any, invoke?: boolean) {
    const searchProps: KeywordSearchProps = {
      ...this.props.searchProps,
      ...prop,
    };
    this.props.changeSearchProps(searchProps);
    if (invoke) this.props.onSearch(searchProps);
  }

  render() {
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>关键词：</span>
          <Input.Search
            allowClear={true}
            value={this.props.searchProps.keyword}
            onSearch={value => this.handlePropChanged({ keyword: value }, true)}
            onChange={e =>
              this.props.changeSearchProps({ ...this.props.searchProps, keyword: e.target.value })
            }
          />
        </div>
      </div>
    );
  }
}
