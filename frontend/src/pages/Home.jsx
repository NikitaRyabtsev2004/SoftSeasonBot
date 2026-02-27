import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Avatar,
    Pagination,
    Skeleton,
} from '@mui/material';
import {
    Close as CloseIcon,
    TouchApp as TouchAppIcon,
    NavigateNext as NavigateNextIcon,
    NavigateBefore as NavigateBeforeIcon,
} from '@mui/icons-material';
import {
    selectPaginatedProducts,
    selectCategories,
    selectCurrentCategory,
    selectSelectedProduct,
    selectZoomedMaterial,
    selectCurrentImageIndex,
    selectLoading,
    selectCurrentPage,
    selectTotalPages,
    fetchCategories,
    fetchProducts,
    setCurrentCategory,
    setSelectedProduct,
    setZoomedMaterial,
    setCurrentImageIndex,
    setCurrentPage,
} from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector(selectPaginatedProducts);
    const categories = useSelector(selectCategories);
    const currentCategory = useSelector(selectCurrentCategory);
    const selectedProduct = useSelector(selectSelectedProduct);
    const zoomedMaterial = useSelector(selectZoomedMaterial);
    const currentImageIndex = useSelector(selectCurrentImageIndex);
    const loading = useSelector(selectLoading);
    const currentPage = useSelector(selectCurrentPage);
    const totalPages = useSelector(selectTotalPages);

    const [activeStep, setActiveStep] = useState(0);
    const [isPressing, setIsPressing] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false); // ДОБАВИТЬ - для полноэкранной галереи
    const [galleryIndex, setGalleryIndex] = useState(0);
    const pressTimer = useRef(null);
    const touchStartX = useRef(0);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProduct) {
            setActiveStep(0);
        }
    }, [selectedProduct]);

    const handleCategoryChange = (category) => {
        dispatch(setCurrentCategory(category));
        dispatch(fetchProducts(category));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`"${product.title}" добавлен в корзину`, {
            description: `${product.price.toLocaleString()} ₽`,
            duration: 3000,
        });
    };

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Обработчики для зажатия imgM в каталоге
    const handleMaterialPressStart = (e, imgM) => {
        e.stopPropagation();
        setIsPressing(true);
        pressTimer.current = setTimeout(() => {
            dispatch(setZoomedMaterial(imgM));
            setIsPressing(false);
        }, 500);
    };

    const handleMaterialPressEnd = (e) => {
        e.stopPropagation();
        setIsPressing(false);
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    const handleMouseMove = (e, product) => {
        if (!product.img || product.img.length <= 1) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const index = Math.min(Math.floor(percent * product.img.length), product.img.length - 1);
        const imgElement = e.currentTarget.querySelector('.product-main-img');
        if (imgElement) {
            imgElement.src = product.img[index];
            dispatch(setCurrentImageIndex({ productId: product.id, index }));
        }
    };

    const handleMouseLeave = (e, product) => {
        const imgElement = e.currentTarget.querySelector('.product-main-img');
        if (imgElement) {
            imgElement.src = product.img[0];
            dispatch(setCurrentImageIndex({ productId: product.id, index: 0 }));
        }
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e, product) => {
        if (!product.img || product.img.length <= 1) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percent = Math.max(0, Math.min(1, x / rect.width));
        const index = Math.floor(percent * product.img.length);
        const imgElement = e.currentTarget.querySelector('.product-main-img');
        if (imgElement && index < product.img.length) {
            imgElement.src = product.img[index];
            dispatch(setCurrentImageIndex({ productId: product.id, index }));
        }
    };

    const handleThumbnailClick = (idx) => {
        setActiveStep(idx);
    };

    const openGallery = (index) => {
        setGalleryIndex(index);
        setGalleryOpen(true);
    };

    // ДОБАВИТЬ: закрыть галерею
    const closeGallery = () => {
        setGalleryOpen(false);
    };

    // ДОБАВИТЬ: следующее фото
    const nextImage = (e) => {
        e?.stopPropagation();
        if (selectedProduct?.img) {
            setGalleryIndex((prev) => (prev + 1) % selectedProduct.img.length);
        }
    };

    // ДОБАВИТЬ: предыдущее фото
    const prevImage = (e) => {
        e?.stopPropagation();
        if (selectedProduct?.img) {
            setGalleryIndex((prev) => (prev - 1 + selectedProduct.img.length) % selectedProduct.img.length);
        }
    };

    // ДОБАВИТЬ: обработка свайпа для галереи
    const handleGalleryTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleGalleryTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    };

    return (
        <>
            {/* Categories */}
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 80,
                    zIndex: 40,
                    py: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            overflowX: 'auto',
                            pb: 1,
                            '&::-webkit-scrollbar': { height: 6 },
                            '&::-webkit-scrollbar-track': { bgcolor: 'grey.100', borderRadius: 3 },
                            '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 3 },
                        }}
                    >
                        <Chip
                            label="Все товары"
                            onClick={() => handleCategoryChange(null)}
                            color={currentCategory === null ? 'primary' : 'default'}
                            variant={currentCategory === null ? 'filled' : 'outlined'}
                            clickable
                            sx={{
                                flexShrink: 0,
                                borderRadius: 2,
                                px: 1,
                                fontWeight: 600,
                            }}
                        />
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => handleCategoryChange(cat)}
                                color={currentCategory === cat ? 'primary' : 'default'}
                                variant={currentCategory === cat ? 'filled' : 'outlined'}
                                clickable
                                sx={{
                                    flexShrink: 0,
                                    borderRadius: 2,
                                    px: 1,
                                    fontWeight: 600,
                                }}
                            />
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* Products - ИСПРАВЛЕНО: maxWidth lg и жесткие breakpoints */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {loading ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} variant="rectangular" height={350} sx={{ borderRadius: 4 }} />
                        ))}
                    </Box>
                ) : (
                    <>
                        {/* Используем CSS Grid вместо MUI Grid для надежности */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',  // Всегда 2 на мобильных
                                    md: 'repeat(3, 1fr)', // 3 на десктопе (900px+)
                                },
                                gap: 2,
                            }}
                        >
                            {products.map((product) => (
                                <Card
                                    key={product.id}
                                    onClick={() => dispatch(setSelectedProduct(product))}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                            transform: 'translateY(-4px)',
                                        },
                                    }}
                                >
                                    {/* Фото */}
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            paddingTop: '153.33%',
                                            overflow: 'hidden',
                                            bgcolor: 'grey.50',
                                        }}
                                        onMouseMove={(e) => handleMouseMove(e, product)}
                                        onMouseLeave={(e) => handleMouseLeave(e, product)}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={(e) => handleTouchMove(e, product)}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.img?.[0]}
                                            alt={product.title}
                                            className="product-main-img"
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'opacity 0.2s',
                                            }}
                                        />

                                        {/* Image indicators */}
                                        {product.img && product.img.length > 1 && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 12,
                                                    left: 12,
                                                    display: 'flex',
                                                    gap: 0.8,
                                                }}
                                            >
                                                {product.img.map((_, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor:
                                                                (currentImageIndex[product.id] || 0) === idx
                                                                    ? 'primary.main'
                                                                    : 'rgba(255, 255, 255, 0.8)',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        )}

                                        {/* Material circle - зажатие */}
                                        {product.imgM && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 12,
                                                    right: 12,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                {/* Подсказка "Зажмите" */}
                                                <Box
                                                    sx={{
                                                        bgcolor: 'rgba(0,0,0,0.7)',
                                                        color: 'white',
                                                        px: 1,
                                                        py: 0.3,
                                                        borderRadius: 1,
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        whiteSpace: 'nowrap',
                                                        backdropFilter: 'blur(4px)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.3,
                                                    }}
                                                >
                                                    <TouchAppIcon sx={{ fontSize: 10 }} />
                                                    Зажмите
                                                </Box>

                                                <Avatar
                                                    src={product.imgM}
                                                    alt="Материал"
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        border: '3px solid white',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                        cursor: 'pointer',
                                                        userSelect: 'none',
                                                        WebkitTouchCallout: 'none',
                                                        WebkitUserSelect: 'none',
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onMouseDown={(e) => handleMaterialPressStart(e, product.imgM)}
                                                    onMouseUp={handleMaterialPressEnd}
                                                    onMouseLeave={handleMaterialPressEnd}
                                                    onTouchStart={(e) => handleMaterialPressStart(e, product.imgM)}
                                                    onTouchEnd={handleMaterialPressEnd}
                                                    onContextMenu={(e) => e.preventDefault()}
                                                />
                                            </Box>
                                        )}
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={700}
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mb: 1,
                                                lineHeight: 1.3,
                                                fontSize: { xs: '0.85rem', sm: '1rem' },
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mb: 1.5,
                                                flexGrow: 1,
                                                fontWeight: '400',
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                            }}
                                        >
                                            {product.desc || 'Нажмите для подробностей'}
                                        </Typography>
                                        <p style={{ fontSize: "12px", color: "#303030a9" }}>нажмите чтобы перейти к товару</p>
                                        <Box sx={{ mt: 'auto' }}>
                                            <Typography variant="h6" color="primary.main" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                                {product.price.toLocaleString()} ₽
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(product);
                                                }}
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1,
                                                    fontWeight: 700,
                                                    boxShadow: 'none',
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    '&:hover': {
                                                        boxShadow: '0 4px 12px rgba(44, 62, 80, 0.3)',
                                                    },
                                                }}
                                            >
                                                В корзину
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            fontWeight: 600,
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </>
                )}
            </Container>

            {/* Product Dialog - ИСПРАВЛЕННЫЕ РАЗМЕРЫ ФОТО */}
            <Dialog
                open={!!selectedProduct}
                onClose={() => dispatch(setSelectedProduct(null))}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: { xs: 2, sm: 4 },
                        overflow: 'hidden',
                        m: { xs: 1, sm: 2, md: 4 },
                        maxHeight: { xs: '98vh', sm: '90vh' },
                    },
                }}
            >
                {selectedProduct && (
                    <>
                        <DialogTitle
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: { xs: 2, sm: 3 },
                                pb: { xs: 1, sm: 2 },
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6" fontWeight={800} sx={{ pr: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                {selectedProduct.title}
                            </Typography>
                            <IconButton
                                onClick={() => dispatch(setSelectedProduct(null))}
                                sx={{
                                    bgcolor: 'grey.100',
                                    '&:hover': { bgcolor: 'grey.200' },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                            {/* CSS Grid для модалки: на мобилке 1 колонка, на ПК 2 */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        md: '1fr 1fr',
                                    },
                                    gap: { xs: 2, md: 4 },
                                }}
                            >
                                {/* Левая колонка - Фото */}
                                <Box>
                                    {/* Основное фото - БОЛЬШОЕ с фиксированной высотой */}
                                    <Box
                                        onClick={() => openGallery(activeStep)}
                                        sx={{
                                            width: '100%',
                                            aspectRatio: '3/4',
                                            bgcolor: 'grey.50',
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'zoom-in',
                                            '&:hover::after': {
                                                content: '"🔍 Нажмите для увеличения"',
                                                position: 'absolute',
                                                bottom: 16,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                bgcolor: 'rgba(0,0,0,0.7)',
                                                color: 'white',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                pointerEvents: 'none',
                                                opacity: { xs: 1, md: 0 },
                                                transition: 'opacity 0.2s',
                                            },
                                            '&:hover': {
                                                '&::after': {
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    >
                                        <img
                                            src={selectedProduct.img?.[activeStep]}
                                            alt={selectedProduct.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s',
                                            }}
                                        />
                                    </Box>

                                    {/* Thumbnails */}
                                    {selectedProduct.img && selectedProduct.img.length > 1 && (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                                mt: 2,
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                            }}
                                        >
                                            {selectedProduct.img.map((img, idx) => (
                                                <Box
                                                    key={idx}
                                                    onClick={() => handleThumbnailClick(idx)}
                                                    sx={{
                                                        width: 70,
                                                        height: 70,
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        border: activeStep === idx ? '3px solid' : '3px solid transparent',
                                                        borderColor: activeStep === idx ? 'primary.main' : 'grey.200',
                                                        opacity: activeStep === idx ? 1 : 0.6,
                                                        transition: 'all 0.2s',
                                                        flexShrink: 0,
                                                        '&:hover': {
                                                            opacity: 1,
                                                            borderColor: activeStep === idx ? 'primary.main' : 'grey.400',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${selectedProduct.title} ${idx + 1}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Box>

                                {/* Правая колонка - Информация */}
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                    {/* Материал - клик */}
                                    {selectedProduct.imgM && (
                                        <Box sx={{ mb: 3, mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                                Материал (нажмите для увеличения):
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => dispatch(setZoomedMaterial(selectedProduct.imgM))}
                                            >
                                                <Avatar
                                                    src={selectedProduct.imgM}
                                                    alt="Материал"
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        border: '2px solid',
                                                        borderColor: 'divider',
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            borderColor: 'primary.main',
                                                            transform: 'scale(1.05)',
                                                        },
                                                    }}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    Нажмите чтобы увеличить
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Цена */}
                                    <Typography
                                        variant="h3"
                                        color="primary.main"
                                        fontWeight={800}
                                        gutterBottom
                                        sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                                    >
                                        {selectedProduct.price?.toLocaleString()} ₽
                                    </Typography>

                                    {/* Описание */}
                                    <Box sx={{ mb: 3, flexGrow: 1 }}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                            Описание:
                                        </Typography>
                                        <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                            {selectedProduct.desc || 'Описание отсутствует'}
                                        </Typography>
                                    </Box>

                                    {/* Кнопка */}
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={() => {
                                            handleAddToCart(selectedProduct);
                                            dispatch(setSelectedProduct(null));
                                        }}
                                        sx={{
                                            borderRadius: 3,
                                            py: 2,
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            boxShadow: 'none',
                                            '&:hover': {
                                                boxShadow: '0 8px 20px rgba(44, 62, 80, 0.3)',
                                            },
                                        }}
                                    >
                                        Добавить в корзину
                                    </Button>
                                </Box>
                            </Box>
                        </DialogContent>
                    </>
                )}
            </Dialog>

            {/* Zoomed Material Dialog с крестиком */}
            <Dialog
                open={!!zoomedMaterial}
                onClose={() => dispatch(setZoomedMaterial(null))}
                maxWidth={false}
                fullScreen
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.95)',
                    },
                }}
            >
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <IconButton
                        onClick={() => dispatch(setZoomedMaterial(null))}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            zIndex: 10,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            width: 48,
                            height: 48,
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 4,
                        }}
                        onClick={() => dispatch(setZoomedMaterial(null))}
                    >
                        <Box
                            component="img"
                            src={zoomedMaterial}
                            alt="Увеличенный материал"
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                maxWidth: '70vw',
                                maxHeight: '70vh',
                                borderRadius: '50%',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            }}
                        />
                    </Box>
                </Box>
            </Dialog>

            {/* Fullscreen Gallery Dialog */}
            <Dialog
                open={galleryOpen}
                onClose={closeGallery}
                maxWidth={false}
                fullScreen
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.95)',
                    },
                }}
            >
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Крестик закрытия */}
                    <IconButton
                        onClick={closeGallery}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            zIndex: 10,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            width: 48,
                            height: 48,
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Счетчик фото */}
                    {selectedProduct?.img && selectedProduct.img.length > 1 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            {galleryIndex + 1} / {selectedProduct.img.length}
                        </Box>
                    )}

                    {/* Кнопка назад */}
                    {selectedProduct?.img && selectedProduct.img.length > 1 && (
                        <IconButton
                            onClick={prevImage}
                            sx={{
                                position: 'absolute',
                                left: 20,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                width: 56,
                                height: 56,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                },
                            }}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 32 }} />
                        </IconButton>
                    )}

                    {/* Кнопка вперед */}
                    {selectedProduct?.img && selectedProduct.img.length > 1 && (
                        <IconButton
                            onClick={nextImage}
                            sx={{
                                position: 'absolute',
                                right: 20,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                width: 56,
                                height: 56,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                },
                            }}
                        >
                            <NavigateNextIcon sx={{ fontSize: 32 }} />
                        </IconButton>
                    )}

                    {/* Контейнер фото с свайпом */}
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: { xs: 2, sm: 4, md: 8 },
                        }}
                        onClick={closeGallery}
                        onTouchStart={handleGalleryTouchStart}
                        onTouchEnd={handleGalleryTouchEnd}
                    >
                        <Box
                            component="img"
                            src={selectedProduct?.img?.[galleryIndex]}
                            alt={`${selectedProduct?.title} ${galleryIndex + 1}`}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: 2,
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            }}
                        />
                    </Box>

                    {/* Thumbnails внизу (если больше 1 фото) */}
                    {selectedProduct?.img && selectedProduct.img.length > 1 && (
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                position: 'absolute',
                                bottom: 20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10,
                                maxWidth: '90%',
                                overflowX: 'auto',
                                pb: 1,
                                '&::-webkit-scrollbar': { height: 4 },
                                '&::-webkit-scrollbar-track': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 },
                                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 },
                            }}
                        >
                            {selectedProduct.img.map((img, idx) => (
                                <Box
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setGalleryIndex(idx);
                                    }}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: galleryIndex === idx ? '3px solid white' : '3px solid transparent',
                                        opacity: galleryIndex === idx ? 1 : 0.6,
                                        transition: 'all 0.2s',
                                        flexShrink: 0,
                                        '&:hover': {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Box>
            </Dialog>
        </>
    );
}

export default Home;