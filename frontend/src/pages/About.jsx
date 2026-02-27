import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, color }) => ({
    height: '100%',
    borderRadius: 24,
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid',
    borderColor: theme.palette[color]?.light || theme.palette.divider,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 20px 40px ${theme.palette[color]?.light}40`,
        borderColor: theme.palette[color]?.main,
    },
}));

function About() {
    const advantages = [
        { icon: '✨', title: 'Качество', desc: 'Используем только лучшие материалы', color: 'primary' },
        { icon: '💝', title: 'Забота', desc: 'Индивидуальный подход к каждому заказу', color: 'secondary' },
        { icon: '🚀', title: 'Скорость', desc: 'Быстрая обработка и доставка', color: 'success' },
        { icon: '🎨', title: 'Стиль', desc: 'Современные и классические дизайны', color: 'info' },
    ];

    const features = [
        'Высокое качество материалов',
        'Уникальные дизайны',
        'Ручная работа',
        'Индивидуальный подход к каждому клиенту',
        'Быстрая доставка по всей России',
    ];

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom textAlign="center" sx={{ mb: 4 }}>
                О нас
            </Typography>

            <Card sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                backgroundColor: 'primary.main',
                                fontSize: '3rem',
                            }}
                        >
                            🧶
                        </Avatar>
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography variant="h4" color="primary.main" fontWeight={800}>
                                SoftSeason
                            </Typography>
                            <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                Магазин вязаной одежды
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Добро пожаловать в <strong>SoftSeason</strong> — ваш надежный магазин качественной вязаной одежды!
                        </Typography>

                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                            Мы специализируемся на создании уникальных вязаных изделий, которые сочетают в себе
                            комфорт, стиль и качество. Каждый товар в нашем каталоге — это результат тщательной
                            работы и внимания к деталям.
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom color="primary.main">
                                Наши преимущества:
                            </Typography>
                            <Box component="ul" sx={{ ml: 2, mt: 1 }}>
                                {features.map((feature, idx) => (
                                    <Typography
                                        component="li"
                                        variant="body1"
                                        key={idx}
                                        sx={{ mb: 1, lineHeight: 1.6 }}
                                    >
                                        {feature}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom color="primary.main">
                                Наша миссия:
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Мы стремимся сделать вязаную одежду доступной для каждого, кто ценит комфорт и стиль.
                                Наша цель — создавать изделия, которые будут радовать вас долгие годы.
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Typography variant="h4" fontWeight={800} gutterBottom textAlign="center" sx={{ mb: 4 }}>
                Почему выбирают нас
            </Typography>

            <Grid container spacing={3}>
                {advantages.map((adv, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <StyledCard color={adv.color}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ mb: 2 }}>
                                    {adv.icon}
                                </Typography>
                                <Typography variant="h5" fontWeight={800} gutterBottom color={`${adv.color}.main`}>
                                    {adv.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {adv.desc}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default About;