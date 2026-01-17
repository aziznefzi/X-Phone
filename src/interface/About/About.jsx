import React from 'react';
import style from './About.module.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Cpu, ShieldCheck, Headphones } from 'lucide-react';
import aboutImage from '../../frontend/image/aboutImage.png';

export default function About() {
  const { t } = useTranslation();
  const theme = useTheme();

  const sectionStyle = {
    '--primary-color': theme.palette.primary.main,
    '--primary-color-alpha': `${theme.palette.primary.main}33`,
    '--primary-gradient': `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.color5})`,
    '--text-color': theme.palette.WebsiteMode.text.text1,
    '--border-color': theme.palette.WebsiteMode.background.bg4,
  };

  const features = [
    {
      icon: <Cpu size={32} />,
      title: t('about.innovation'),
      desc: t('about.innovationDesc'),
    },
    {
      icon: <ShieldCheck size={32} />,
      title: t('about.security'),
      desc: t('about.securityDesc'),
    },
    {
      icon: <Headphones size={32} />,
      title: t('about.support'),
      desc: t('about.supportDesc'),
    },
  ];

  return (
    <section id="about" className={style.aboutContainer} style={sectionStyle}>
      <div className={style.heroContent}>
        <div className={style.textContent}>
          <h2 className={style.title}>{t('about.title')}</h2>
          <p className={style.subtitle}>{t('about.subtitle')}</p>
        </div>
        <div className={style.imageWrapper}>
          <div className={style.imageBlob}></div>
          <img src={aboutImage} alt="Phone-X Vision" className={style.mainImage} />
        </div>
      </div>

      <div className={style.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index}
          style={{
            backgroundColor: theme.palette.WebsiteMode.background.bg3,
          }}
          className={style.featureCard}>
            <div className={style.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={style.featureTitle}>{feature.title}</h3>
            <p className={style.featureDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
