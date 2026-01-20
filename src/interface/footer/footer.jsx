import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack, Divider, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './foooter.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();
  const mode = theme.palette.mode;
  
  // Custom colors from theme
  const bg = theme.palette.WebsiteMode.background.bg3;
  const textColor = theme.palette.WebsiteMode.text.text1;
  const secondaryText = theme.palette.WebsiteMode.text.text8;
  const accentColor = theme.palette.primary.main;

  return (
    <Box 
      id='footer'
      component="footer" 
      sx={{ 
        bgcolor: bg, 
        color: textColor,
        pt: 8, 
        pb: 4,
        borderTop: `1px solid ${mode === 'dark' ? '#333' : '#414141ff'}`,
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo & Farewell Message */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                mb: 2, 
                background: theme.palette.WebsiteMode.text.H3Text,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              {t('footer.title')}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: secondaryText, 
                mb: 3,
                lineHeight: 1.8,
                maxWidth: '300px'
              }}
            >
              {t('footer.farewell')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton className={styles.socialIcon} sx={{ color: accentColor }}>
                <Facebook size={20} />
              </IconButton>
              <IconButton className={styles.socialIcon} sx={{ color: accentColor }}>
                <Twitter size={20} />
              </IconButton>
              <IconButton className={styles.socialIcon} sx={{ color: accentColor }}>
                <Instagram size={20} />
              </IconButton>
              <IconButton className={styles.socialIcon} sx={{ color: accentColor }}>
                <Github size={20} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('footer.quickLinks')} 
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
                {t('footer.links.home')}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
                {t('footer.links.offers')}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
                {t('footer.links.brands')}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
                {t('footer.links.about')}
              </Typography>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('about.support', 'Contact Us')}
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MapPin size={18} color={accentColor} />
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  123 Tech Avenue, Silicon Valley
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone size={18} color={accentColor} />
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  +1 (234) 567-890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Mail size={18} color={accentColor} />
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  support@phone-x.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: mode === 'dark' ? '#222' : '#eee' }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="caption" sx={{ color: secondaryText }}>
            {t('footer.rights')}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
              Privacy Policy
            </Typography>
            <Typography variant="caption" sx={{ color: secondaryText, cursor: 'pointer', '&:hover': { color: accentColor } }}>
              Terms of Service
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
