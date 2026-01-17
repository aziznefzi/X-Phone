import React from 'react'
import './App.css'
import Header from './header/header'
import Home from './interface/home/home'
import Offers from './interface/offres/offers'
import Brands from './interface/Brands/Brands'
import About from './interface/About/About'
import Footer from "./interface/footer/footer"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { getTheme } from './frontend/theme/theme';
import { useContext } from 'react'
import { themeContext } from './context/themeContext'

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useTheme } from "@mui/material/styles"
function App() {
  const { WebsiteTheme } = useContext(themeContext);
  const theme = useMemo(() => getTheme(localStorage.getItem('theme') || WebsiteTheme), [WebsiteTheme]);
  const { i18n } = useTranslation();
  useEffect(() => {
   document.body.style.backgroundColor = theme.palette.WebsiteMode.background.bg1,
   document.body.style.color = theme.palette.WebsiteMode.text.text1
  }, [theme])

  useEffect(() => {
    const code = i18n.language || 'en';
    document.documentElement.dir = code.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  }, [i18n.language]);

  return (
    <>
    <ThemeProvider theme={theme}>
     <Header/>
     <Home/>
     <Offers/>
     <Brands/>
     <About/>
     <Footer/>
    </ThemeProvider>
    </>
  )
}

export default App
