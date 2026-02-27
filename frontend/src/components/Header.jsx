import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Container,
    Button,
} from '@mui/material';
import {
    Menu as MenuIcon,
    ShoppingCart,
    Close as CloseIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, selectCartCount } from '../store/cartSlice';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);

    const navLinks = [
        { path: '/', label: 'Каталог' },
        { path: '/about', label: 'О нас' },
        { path: '/delivery', label: 'Доставка' },
        { path: '/payment', label: 'Оплата' },
        { path: '/return', label: 'Возврат' },
    ];

    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    const drawer = (
        <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: 'center', width: 280 }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white' }}>🧶</Typography>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                        SoftSeason
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Магазин вязаной одежды
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{ pt: 2 }}>
                {navLinks.map((link) => (
                    <ListItem key={link.path} disablePadding sx={{ px: 2, mb: 1 }}>
                        <ListItemButton
                            component={Link}
                            to={link.path}
                            selected={location.pathname === link.path}
                            onClick={() => setMobileOpen(false)}
                            sx={{
                                borderRadius: 2,
                                textAlign: 'left',
                                py: 1.5,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                },
                            }}
                        >
                            <ListItemText
                                primary={link.label}
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
                    {/* Mobile menu button */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ display: { md: 'none' }, mr: 2 }}
                    >
                        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>

                    {/* Logo - всегда виден полностью */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: 'primary.main',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <Typography variant="h5" sx={{ color: 'white' }}>🧶</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                SoftSeason
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Магазин вязаной одежды
                            </Typography>
                        </Box>
                    </Box>

                    {/* Desktop navigation - центрированная */}
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.path}
                                component={Link}
                                to={link.path}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    color: location.pathname === link.path ? 'white' : 'text.primary',
                                    backgroundColor: location.pathname === link.path ? 'primary.main' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: location.pathname === link.path ? 'primary.dark' : 'action.hover',
                                    },
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Cart button */}
                    <IconButton
                        onClick={handleCartClick}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            width: 48,
                            height: 48,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        <Badge badgeContent={cartCount} color="error" max={99}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </Container>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                        borderRadius: '0 16px 16px 0',
                    },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
}

export default Header;