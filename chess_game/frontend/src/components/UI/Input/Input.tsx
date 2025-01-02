import React from 'react';

import styles from './Input.module.scss';

interface InputProps {
  placeholder: string,
  onChangeHandler: (value: string) => void 
}

const Input: React.FC<InputProps> = ({ placeholder, onChangeHandler }) => {
  return (
    <input
      className={styles.input} 
      placeholder={placeholder} 
      onChange={e => onChangeHandler(e.currentTarget.value)}
    />
  )
}

export default Input;