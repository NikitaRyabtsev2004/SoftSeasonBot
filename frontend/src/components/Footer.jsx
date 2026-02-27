import { Box, Container, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, Telegram, Email, Phone, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
    const socialLinks = [
        { icon: <Facebook />, label: 'VK', href: '#' },
        { icon: <Instagram />, label: 'Instagram', href: '#' },
        { icon: <Telegram />, label: 'Telegram', href: '#' },
    ];

    const infoLinks = [
        { label: 'О нас', path: '/about' },
        { label: 'Доставка', path: '/delivery' },
        { label: 'Оплата', path: '/payment' },
        { label: 'Возврат', path: '/return' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.dark',
                color: 'white',
                mt: 'auto',
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Logo and description */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    backgroundColor: 'secondary.main',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h5">🧶</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6" fontWeight={800}>
                                    SoftSeason
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    Магазин вязаной одежды
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                            Качественные товары для вашего комфорта и стиля. Ручная работа с любовью к деталям.
                        </Typography>
                    </Grid>

                    {/* Information */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'white' }}>
                            Информация
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {infoLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'rgba(255,255,255,0.8)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        '&:hover': {
                                            color: 'secondary.main',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contacts */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'white' }}>
                            Контакты
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Phone fontSize="small" sx={{ color: 'secondary.main' }} />
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    +7 (999) 674-53-02
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Email fontSize="small" sx={{ color: 'secondary.main' }} />
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    softseason@softseason.ru
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <LocationOn fontSize="small" sx={{ color: 'secondary.main' }} />
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Москва
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Social media */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'white' }}>
                            Мы в соцсетях
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            {socialLinks.map((social) => (
                                <IconButton
                                    key={social.label}
                                    href={social.href}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        width: 44,
                                        height: 44,
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }} align="center">
                    © 2026 SoftSeason. Все права защищены.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;