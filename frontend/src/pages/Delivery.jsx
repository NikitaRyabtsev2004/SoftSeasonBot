import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';

function Delivery() {
  const deliveryMethods = [
    {
      icon: '🚚',
      title: 'Курьерская доставка по Москве',
      items: ['Стоимость: 300 ₽', 'Срок доставки: 1-2 дня', 'Бесплатно при заказе от 5000 ₽', 'Доставка в удобное для вас время'],
    },
    {
      icon: '📮',
      title: 'Почта России',
      items: ['Стоимость: от 350 ₽ (зависит от региона)', 'Срок доставки: 5-14 дней', 'Доставка по всей России', 'Отслеживание посылки'],
    },
    {
      icon: '🏪',
      title: 'Пункты выдачи (СДЭК, Boxberry)',
      items: ['Стоимость: от 250 ₽', 'Срок доставки: 2-5 дней', 'Более 10 000 пунктов выдачи по России', 'Удобный график работы'],
    },
    {
      icon: '🏃',
      title: 'Самовывоз из Москвы',
      items: ['Стоимость: Бесплатно', 'Срок: В день заказа или на следующий день', 'Адрес: Москва (уточняется при оформлении)'],
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Доставка
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Мы предлагаем несколько удобных способов доставки вашего заказа.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              📦 Способы доставки
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {deliveryMethods.map((method, index) => (
              <Card key={index} sx={{ borderRadius: 2, backgroundColor: 'grey.50' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {method.icon} {method.title}
                  </Typography>
                  <List dense>
                    {method.items.map((item, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
              ⏱️ Сроки обработки заказа
            </Typography>
            <Typography variant="body1">
              Все заказы обрабатываются в течение 1-2 рабочих дней. После отправки вы получите
              трек-номер для отслеживания посылки.
            </Typography>
          </Box>

          <Card sx={{ mt: 4, backgroundColor: 'warning.light', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2">
                <strong>💡 Важно:</strong> Точная стоимость и срок доставки рассчитываются
                индивидуально при оформлении заказа в зависимости от вашего адреса и выбранного способа доставки.
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Delivery;
