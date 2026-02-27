import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    Stack,
} from '@mui/material';
import {
    Close as CloseIcon,
    Delete as DeleteIcon,
    ShoppingBasket as ShoppingBasketIcon,
} from '@mui/icons-material';
import { selectCartItems, selectCartTotal, selectIsCartOpen, closeCart, removeFromCart } from '../store/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const isOpen = useSelector(selectIsCartOpen);

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => dispatch(closeCart())}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    maxHeight: '85vh',
                    m: { xs: 2, sm: 4 },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 3,
                    pb: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ShoppingBasketIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={800}>
                        Корзина ({items.length})
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => dispatch(closeCart())}
                    sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                {items.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 10,
                            px: 3,
                        }}
                    >
                        <ShoppingBasketIcon sx={{ fontSize: 100, color: 'grey.300', mb: 3 }} />
                        <Typography variant="h5" color="text.secondary" fontWeight={600}>
                            Корзина пуста
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Добавьте товары из каталога
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {items.map((item, index) => (
                            <Box key={item.id}>
                                <ListItem
                                    sx={{
                                        px: 3,
                                        py: 2.5,
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            src={item.img?.[0]}
                                            alt={item.title}
                                            sx={{ width: 80, height: 80, borderRadius: 2 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 0.5 }}>
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Stack spacing={0.5}>
                                                <Typography variant="body1" color="primary.main" fontWeight={800}>
                                                    {item.price.toLocaleString()} ₽
                                                </Typography>
                                                <Chip
                                                    label="1 шт"
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ width: 'fit-content', fontWeight: 600 }}
                                                />
                                            </Stack>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleRemove(item.id)}
                                            color="error"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'error.light',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index < items.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </List>
                )}
            </DialogContent>

            {items.length > 0 && (
                <>
                    <Divider />
                    <DialogActions sx={{ p: 3, flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight={700}>
                                Итого:
                            </Typography>
                            <Typography variant="h4" color="primary.main" fontWeight={800}>
                                {total.toLocaleString()} ₽
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                borderRadius: 3,
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 8px 20px rgba(44, 62, 80, 0.3)',
                                },
                            }}
                        >
                            Оформить заказ
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

export default Cart;