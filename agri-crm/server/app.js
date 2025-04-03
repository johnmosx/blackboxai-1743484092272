const express = require('express');
const cors = require('cors');
const db = require('./models');
const farmerRoutes = require('./routes/farmers');
const authRoutes = require('./routes/auth');
const phenologyStageRoutes = require('./routes/phenologyStageRoutes');
const userRoutes = require('./routes/userRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const cropTypeRoutes = require('./routes/cropTypeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/farmers', farmerRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/crop-types', cropTypeRoutes);
app.use('/api/phenology-stages', phenologyStageRoutes);


// Database connection
db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;