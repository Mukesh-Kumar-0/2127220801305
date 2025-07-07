import express from 'express';
import shortid from 'shortid';
import Url from '../models/Url.js';

const router = express.Router();
router.post('/', async (req, res) => {
  const { url, shortCode, validity } = req.body;

  if (!url) return res.status(400).json({ message: 'URL is required' });

  let code = shortCode || shortid.generate();

  try {
    const existing = await Url.findOne({ shortCode: code });
    if (existing) return res.status(409).json({ message: 'Short code already in use so use any other' });

    const newUrl = new Url({
      originalUrl: url,
      shortCode: code,
      validityMinutes: validity,
    });

    await newUrl.save();

    res.status(201).json({
      shortUrl: `http://localhost:3000/${code}`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:code', async (req, res) => {
  try {
    const found = await Url.findOne({ shortCode: req.params.code });

    if (!found) return res.status(404).send('Short URL not found');
    if (found.isExpired) return res.status(410).send('Short URL has expired');

    res.redirect(found.originalUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
