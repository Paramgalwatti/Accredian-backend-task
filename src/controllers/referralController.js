const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendReferralEmail } = require('../services/emailService');

const saveReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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
    res.status(500).json({ error: 'An error occurred while saving the referral' });
  }
};

module.exports = {
  saveReferral,
};
