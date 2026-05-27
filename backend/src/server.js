require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { iniciarBaseDados } = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ mensagem: 'API do CACA a funcionar' }));
app.use('/api/auth', authRoutes);
app.use('/api/utilizadores', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contactos', contactRoutes);

iniciarBaseDados().then(() => {
  app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
});
