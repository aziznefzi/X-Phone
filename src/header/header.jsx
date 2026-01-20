import React, { useState, useContext, useEffect, useRef } from 'react'
import style from './header.module.css'
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import Slide from '@mui/material/Slide';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { themeContext } from '../context/themeContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const {WebsiteTheme, setWebsiteTheme} = useContext(themeContext)
    const [navOpen, setNavOpen] = useState(false);
    const containerRef = useRef(null);
    const { t } = useTranslation();
    const theme = useTheme()
    const links = [
        { id: 1, name: t('header.home'), href: '#home', icon: HomeIcon },
        { id: 2, name: t('header.offers'), href: '#offers', icon: LocalOfferIcon },
        { id: 3, name: t('header.brands'), href: '#brands', icon: StorefrontIcon },
        { id: 4, name: t('header.about'), href: '#about', icon: InfoIcon },
        { id: 5, name: t('header.footer'), href: '#footer', icon: LinkIcon },
    ]
    
    const NavList = links.map((item) => {
        const Icon = item.icon;
        return (
            <li key={item.id}
            onClick={() => { setNavOpen(false) }}
            className={style.navItem}>
                <a 
                style={{color: theme.palette.WebsiteMode.text.text5}}
                href={item.href}
                className={style.navLink}>
                    <Icon sx={{ 
                        color: theme.palette.primary.color5,
                        fontSize: 20 }} />
                    <span>{item.name}</span>
                </a>
            </li>
        )
    })

    const toggleNav = () => {
        if(navOpen === true){
            document.body.style.overflow = 'auto';
        }else{
            document.body.style.overflow = 'hidden';
        }
        setNavOpen(!navOpen);
    };
    const toggleTheme = () => {
        const newTheme = WebsiteTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setWebsiteTheme(newTheme);
    };
    return (
        <header 
        className={`${style.header} ${WebsiteTheme}`}>
            <nav 
            className={style.nav}>
            <div className={style.navIcons}>
            {navOpen? 
            <CancelIcon onClick={toggleNav}/>: 
            <MenuIcon onClick={toggleNav}/>}
            </div>
                <ul className={style.navList}>
                    {NavList}
                </ul>
                <div className={style.actions}>
                 <LanguageToggle />              
                    <div 
                        className={style.ThemeToggle} 
                        onClick={toggleTheme}
                        style={{ 
                        cursor: 'pointer'
                    }}
                    >
                        {WebsiteTheme === "dark" ?
                        <WbSunnyIcon/> :
                        <NightlightRoundIcon/>}
                    </div>
                <ProductUsButton/>
                 </div>
            </nav>
            <Slide direction="up" in={navOpen} mountOnEnter unmountOnExit container={containerRef.current}>
            <nav
            className={style.navMobile}>
                <ul className={style.navList}>
                    {NavList}
                </ul>
                <ProductUsButton/>
            </nav>
            </Slide>
        </header>
    )
}

function LanguageToggle() {
    const {t, i18n} = useTranslation();
    const theme = useTheme();
    const currentLangName = i18n.language === 'en' ? t('header.english') : t('header.arabic');
    const [langOpen, setLangOpen] = useState(false);
    const selectRef = useRef(null);
    const { WebsiteTheme } = useContext(themeContext);
    const handleLanguageSelect = (lang) => {
        i18n.changeLanguage(lang);
        setLangOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={style.LangSection}>
            <div
                className={`${style.selectContainer} ${langOpen ? style.active : ''}`}
                onClick={() => setLangOpen(!langOpen)}
                ref={selectRef}
            >
                <div 
                style={{color: theme.palette.primary.color4}}
                className={style.customSelectDisplay}>
                    {currentLangName}
                </div>
                <label className={style.selectLabel}>{t("header.Lang")}</label>      
                {langOpen && (
                    <div className={`${style.dropdownMenu} ${WebsiteTheme}`}>
                        <div 
                            className={`${style.dropdownItem} ${i18n.language === 'en' ? style.selected : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleLanguageSelect('en'); }}
                        >
                            {t("header.english")}
                        </div>
                        <div 
                            className={`${style.dropdownItem} ${i18n.language === 'ar' ? style.selected : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleLanguageSelect('ar'); }}
                        >
                            {t("header.arabic")}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProductUsButton() {
    const { t } = useTranslation();
    return (
    <>
        <button className={style.cta}>{t('header.shopNow')}</button>
    </>
    )
}
