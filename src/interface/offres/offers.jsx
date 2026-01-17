import React from 'react'
import {themeContext} from '../../context/themeContext';
import style from './offers.module.css'
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import iphone16pro from '../../frontend/image/offers/iphone16Pro.png';
import caspeugbl from '../../frontend/image/offers/GBL-CASQUE.jpg';
import xiomiredmi13pro from '../../frontend/image/offers/Xiaomi-Redmi.png.png';

export default function Offers() {
  const { t } = useTranslation();
  const {WebsiteTheme} = React.useContext(themeContext);
  const theme = useTheme()

  const OffreValue = [
    {id: 1, name: "Xiomi Redmi 13 Pro", Offre: "20%", image: xiomiredmi13pro},
    {id: 2, name: "Caspue GBL", Offre: "40%", image: caspeugbl},
    {id: 3, name: "Iphone 16 Pro", Offre: "25%", image: iphone16pro}
  ]
  return (
    <div
    id='offers'
    className={`${style.offers} ${WebsiteTheme}`}>
      <h3
        className={style.gradientText}
        style={{
          backgroundImage: theme.palette.WebsiteMode.text.H3Text,
        }}
      >
        {t('header.offers')}
      </h3>
      <div className={style.offersContainer}>
        {OffreValue.map((item) => (
          <div key={item.id} 
          style={{
            backgroundColor: theme.palette.WebsiteMode.background.bg4,
          }}
          className={style.offersItem}>
            <img src={item.image} alt={item.name} />
            <h4
            style={{
               backgroundImage: theme.palette.WebsiteMode.text.H3Text,
            }}
            >{item.name}</h4>
            <p>{item.Offre}</p>
          </div>
        ))}
      </div>
      <button
      style={{
        color: theme.palette.WebsiteMode.text.text1,
        borderColor: theme.palette.WebsiteMode.text.text1,
      }}
      >{t("offers.AllProduct")}</button>
    </div>
  )
}
