// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { validationResult, check } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { sendReferralEmail } = require('./services/emailService');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Validation middleware
const validateReferralData = [
  check('referrerName').notEmpty(),
  check('referrerEmail').isEmail(),
  check('refereeName').notEmpty(),
  check('refereeEmail').isEmail(),
];

// POST endpoint to save referral data
app.post('/api/referrals', validateReferralData, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
      },
    });

    await sendReferralEmail(referrerEmail, refereeEmail);

    res.status(201).json(referral);
  } catch (error) {
    console.error('Error saving referral:', error);
    res.status(500).json({ error: 'An error occurred while saving the referral' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
