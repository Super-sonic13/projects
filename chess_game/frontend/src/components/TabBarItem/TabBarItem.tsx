import React from 'react';

import styles from './TabBarItem.module.scss';

interface TabBarItemProps {
  label: string,
  activeTab: string,
  setActiveTab: (label: string) => void
}


const TabBarItem: React.FC<TabBarItemProps> = ({ label, activeTab, setActiveTab }) => {
  return(
    <div className={`${styles.tab} ${activeTab === label ? styles.activeTab : ''}`} onClick={() => setActiveTab(label)}>
      {label}
    </div>
  )
}

export default TabBarItem;