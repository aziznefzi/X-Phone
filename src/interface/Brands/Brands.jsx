import React from 'react'
import style from './Brands.module.css'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { themeContext } from '../../context/themeContext';

import Apple from "../../frontend/image/brands/apple-icon.svg"
import Samsung from "../../frontend/image/brands/samsung-icon.svg"
import Xiaomi from "../../frontend/image/brands/xiaomi-mi-logo-icon.svg"
import Oppo from "../../frontend/image/brands/oppo-mobile-logo-icon.svg"
import Vivo from "../../frontend/image/brands/vivo-mobile-logo-icon.svg"
import Realme from "../../frontend/image/brands/realme-mobile-logo-icon.svg"
import OnePlus from "../../frontend/image/brands/oneplus-mobile-logo-icon.svg"

export default function Brands() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { WebsiteTheme } = React.useContext(themeContext);

  const BrandsValue = [
    { id: 1, classe: "iconMode", icon: Apple, name: "Apple" },
    { id: 2, classe: "iconMode", icon: Samsung, name: "Samsung" },
    { id: 3, icon: Xiaomi, name: "Xiaomi" },
    { id: 4, icon: Oppo, name: "Oppo" },
    { id: 5, icon: Vivo, name: "Vivo" },
    { id: 6, icon: Realme, name: "Realme" },
    { id: 7, icon: OnePlus, name: "OnePlus" }
  ]

  return (
    <div 
    id="brands"
    className={`${style.Brands} ${WebsiteTheme}`}>
      <h3
        className={style.gradientText}
        style={{
          backgroundImage: theme.palette.WebsiteMode.text.H3Text,
        }}
      >
        {t('header.brands')}
      </h3>
      <div className={style.BrandsContainer}>
        {BrandsValue.map((item) => (
          <div key={item.id} 
          style={{
            backgroundColor: theme.palette.WebsiteMode.background.bg4
          }}
          className={style.BrandsItem}>
            <img 
              src={item.icon} 
              alt={item.name} 
              className={`${style.brandIcon} ${item.classe ? style[item.classe] : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
