import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { figure } from '../../utils/types';
import getFigureImage from '../../utils/getFigureImage';
import styles from './FigureImg.module.scss';


interface FigureImgProps {
  figure?: figure
}

const FigureImg: React.FC<FigureImgProps> = ({ figure }) => {

  const userColor: string = useSelector((state: RootState) => state.user.color);

  const getImageALT = (): string => {
    return `${figure!.color[0]}${figure!.type.toUpperCase()}`;
  }

  return(
    <>
      {
        figure 
        ? <img src={getFigureImage(figure)} 
            className={`${styles.figureImage} ${userColor === 'black' ? styles.rotatedFigureImg : ''}`} 
            alt={getImageALT()}>
          </img>
        : null
      }
    </>
  )
}

export default FigureImg;