import React from 'react';

import TabBarItem from '../../components/TabBarItem/TabBarItem';

import styles from './TabBar.module.scss';

interface TabBarProps {
  labels: string[],
  activeTab: string
  setActiveTab: (label: string) => void
}

const TabBar: React.FC<TabBarProps> = ({ labels, activeTab, setActiveTab  }) => {
  return(
    <div className={styles.tabBar}>
      {
        labels.map(label =>{
          return <TabBarItem label={label} activeTab={activeTab} setActiveTab={setActiveTab}/>
        })
      }
    </div>
  )
}

export default TabBar;