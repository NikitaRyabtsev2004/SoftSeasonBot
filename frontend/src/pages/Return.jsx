import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';

function Return() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Возврат и обмен
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Мы заботимся о вашем комфорте и предлагаем удобные условия возврата и обмена товаров.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              🔄 Условия возврата
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card sx={{ borderRadius: 2, backgroundColor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ⏰ Сроки возврата
                </Typography>
                <List dense>
                  <ListItem><ListItemText primary="Вы можете вернуть товар в течение 14 дней с момента получения" /></ListItem>
                  <ListItem><ListItemText primary="Товар должен быть в оригинальной упаковке" /></ListItem>
                  <ListItem><ListItemText primary="Сохранены все бирки и этикетки" /></ListItem>
                  <ListItem><ListItemText primary="Товар не должен иметь следов использования" /></ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, backgroundColor: 'success.light' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ✅ Что можно вернуть
                </Typography>
                <List dense>
                  <ListItem><ListItemText primary="Товар надлежащего качества (если не подошел размер, цвет и т.д.)" /></ListItem>
                  <ListItem><ListItemText primary="Товар с производственным браком" /></ListItem>
                  <ListItem><ListItemText primary="Товар, не соответствующий описанию" /></ListItem>
                  <ListItem><ListItemText primary="Поврежденный товар при доставке" /></ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, backgroundColor: 'error.light' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ❌ Что нельзя вернуть
                </Typography>
                <List dense>
                  <ListItem><ListItemText primary="Товары, изготовленные на заказ" /></ListItem>
                  <ListItem><ListItemText primary="Товары со следами использования" /></ListItem>
                  <ListItem><ListItemText primary="Товары без оригинальной упаковки и бирок" /></ListItem>
                  <ListItem><ListItemText primary="Товары, поврежденные по вине покупателя" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="secondary.main" gutterBottom>
              🔁 Обмен товара
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Вы можете обменять товар на другой размер, цвет или модель в течение 14 дней с момента получения.
            </Typography>
            <Card sx={{ borderRadius: 2, backgroundColor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Как оформить обмен:
                </Typography>
                <List>
                  <ListItem><ListItemText primary="1. Свяжитесь с нашей службой поддержки" /></ListItem>
                  <ListItem><ListItemText primary="2. Укажите номер заказа и причину обмена" /></ListItem>
                  <ListItem><ListItemText primary="3. Отправьте товар обратно (мы компенсируем доставку)" /></ListItem>
                  <ListItem><ListItemText primary="4. Получите новый товар в течение 3-5 дней" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
              💰 Возврат денежных средств
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Деньги возвращаются тем же способом, которым была произведена оплата:
            </Typography>
            <List dense>
              <ListItem><ListItemText primary="На банковскую карту — в течение 5-10 рабочих дней" /></ListItem>
              <ListItem><ListItemText primary="На электронный кошелек — в течение 3-5 рабочих дней" /></ListItem>
              <ListItem><ListItemText primary="Наличными (если оплата была при получении) — сразу при возврате" /></ListItem>
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" color="warning.main" gutterBottom>
              📋 Как оформить возврат
            </Typography>
            <Card sx={{ borderRadius: 2, backgroundColor: 'grey.50' }}>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="1. Свяжитесь с нами"
                      secondary="Напишите на email: softseason@softseason.ru или позвоните: +7 (999) 674-53-02"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="2. Заполните заявление"
                      secondary="Мы отправим вам форму заявления на возврат"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="3. Отправьте товар"
                      secondary="Упакуйте товар в оригинальную упаковку и отправьте по указанному адресу"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="4. Получите деньги"
                      secondary="После получения и проверки товара мы вернем вам деньги"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Card sx={{ backgroundColor: 'warning.light', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2">
                <strong>💡 Важно:</strong> Стоимость обратной доставки товара надлежащего качества
                оплачивается покупателем. Если товар имеет брак или не соответствует описанию,
                мы компенсируем все расходы на доставку.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2">
                <strong>📞 Остались вопросы?</strong> Наша служба поддержки работает ежедневно
                с 9:00 до 21:00. Мы всегда готовы помочь вам решить любые вопросы!
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Return;
