import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Chip, Stack } from '@mui/material';

function Payment() {
  const paymentMethods = [
    {
      icon: '💳',
      title: 'Банковские карты онлайн',
      items: ['Visa, MasterCard, МИР', 'Безопасная оплата через защищенное соединение', 'Мгновенное подтверждение платежа', 'Возможность оплаты в рассрочку'],
      chips: ['VISA', 'MasterCard', 'МИР'],
      chipColors: ['primary', 'warning', 'success'],
    },
    {
      icon: '📱',
      title: 'Электронные кошельки',
      items: ['ЮMoney (Яндекс.Деньги)', 'QIWI Кошелек', 'WebMoney', 'Быстрая оплата без комиссии'],
    },
    {
      icon: '🏦',
      title: 'Банковский перевод',
      items: ['Оплата по реквизитам', 'Для юридических лиц', 'Выставление счета на оплату', 'Срок зачисления: 1-3 рабочих дня'],
    },
    {
      icon: '📦',
      title: 'Оплата при получении',
      items: ['Наличными курьеру', 'Картой при получении', 'Доступно для заказов до 10 000 ₽', 'Только для Москвы и МО'],
    },
    {
      icon: '🔄',
      title: 'Рассрочка',
      items: ['Рассрочка на 3, 6, 12 месяцев', 'Без переплат и скрытых комиссий', 'Быстрое одобрение онлайн', 'Доступно для заказов от 3000 ₽'],
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Оплата
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Мы принимаем различные способы оплаты для вашего удобства.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              💳 Способы оплаты
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {paymentMethods.map((method, index) => (
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
                  {method.chips && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {method.chips.map((chip, idx) => (
                        <Chip
                          key={idx}
                          label={chip}
                          color={method.chipColors[idx]}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
              🔒 Безопасность платежей
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1">
                Все платежи проходят через защищенное соединение с использованием протокола SSL.
                Мы не храним данные ваших банковских карт.
              </Typography>
              <Typography variant="body1">
                Платежная система соответствует международному стандарту безопасности PCI DSS.
              </Typography>
            </Box>
          </Box>

          <Card sx={{ mt: 4, backgroundColor: 'info.light', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2">
                <strong>💡 Важно:</strong> После оплаты вы получите электронный чек на указанный
                email. Если у вас возникли вопросы по оплате, свяжитесь с нашей службой поддержки.
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Payment;
