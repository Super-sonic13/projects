import React from 'react';
import { color } from '../../../utils/types';

import styles from './Radio.module.scss';

interface RadioProps {
  label: string,
  name: string
  value: color,
  onChangeHandler: (value: string) => void
}

const Radio: React.FC<RadioProps> = ({ label, name, value, onChangeHandler }) => {
  return(
    <div className={styles.wrapper}>
      <label>
        <input 
          className={styles.radio}
          type="radio"
          name={name}
          value={value}
          onChange={e => onChangeHandler(e.currentTarget.value)} 
        />
        {label}
      </label>
    </div>
  )
}

export default Radio;