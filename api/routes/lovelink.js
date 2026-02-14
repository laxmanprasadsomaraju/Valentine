// API Routes for LoveLink
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { LoveLink, LoveResponse, Stats } = require('../models/LoveLink');

// Generate unique slug
const generateSlug = () => {
  return 'll-' + crypto.randomBytes(4).toString('hex');
};

const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Create new LoveLink
router.post('/create', async (req, res) => {
  try {
    const slug = generateSlug();
    const senderToken = generateToken();
    const receiverToken = generateToken();
    
    const loveLink = new LoveLink({
      slug,
      senderToken,
      receiverToken,
      ...req.body
    });
    
    await loveLink.save();
    
    // Update stats
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalLinksCreated: 1 }, lastUpdated: new Date() },
      { upsert: true }
    );
    
    res.json({
      success: true,
      slug,
      senderToken,
      receiverToken,
      viewUrl: `/v/${slug}`
    });
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get LoveLink by slug (public view)
router.get('/view/:slug', async (req, res) => {
  try {
    const loveLink = await LoveLink.findOne({ slug: req.params.slug });
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    // Check expiry
    if (loveLink.expiresAt && new Date() > loveLink.expiresAt) {
      return res.status(410).json({ success: false, error: 'Link has expired' });
    }
    
    // Check open date
    if (loveLink.openDate && new Date() < loveLink.openDate) {
      return res.status(403).json({ 
        success: false, 
        error: 'Link not yet available',
        openDate: loveLink.openDate
      });
    }
    
    // Increment view count
    await LoveLink.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewCount: 1 } }
    );
    
    // Update stats
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalViews: 1 }, lastUpdated: new Date() },
      { upsert: true }
    );
    
    // Return public data (no tokens)
    res.json({
      success: true,
      data: {
        slug: loveLink.slug,
        senderName: loveLink.senderName,
        receiverName: loveLink.receiverName,
        partnerTitle: loveLink.partnerTitle,
        customTitle: loveLink.customTitle,
        senderNote: loveLink.senderNote,
        senderBouquet: loveLink.senderBouquet,
        cards: loveLink.cards,
        plans: loveLink.plans,
        links: loveLink.links,
        musicUrl: loveLink.musicUrl,
        hasPin: !!loveLink.pinHash,
        viewCount: loveLink.viewCount,
        createdAt: loveLink.createdAt
      }
    });
  } catch (error) {
    console.error('View error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify PIN
router.post('/verify-pin/:slug', async (req, res) => {
  try {
    const { pin } = req.body;
    const loveLink = await LoveLink.findOne({ slug: req.params.slug });
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    if (loveLink.pinHash && loveLink.pinHash !== pin) {
      return res.status(401).json({ success: false, error: 'Incorrect PIN' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('PIN verify error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get LoveLink by sender token (for editing)
router.get('/edit/:token', async (req, res) => {
  try {
    const loveLink = await LoveLink.findOne({ senderToken: req.params.token });
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    res.json({ success: true, data: loveLink });
  } catch (error) {
    console.error('Edit error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update LoveLink
router.put('/update/:token', async (req, res) => {
  try {
    const loveLink = await LoveLink.findOneAndUpdate(
      { senderToken: req.params.token },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    res.json({ success: true, data: loveLink });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit response
router.post('/respond/:slug', async (req, res) => {
  try {
    const loveLink = await LoveLink.findOne({ slug: req.params.slug });
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    const response = new LoveResponse({
      loveLinkId: loveLink.slug,
      ...req.body
    });
    
    await response.save();
    
    // Update status
    await LoveLink.findOneAndUpdate(
      { slug: req.params.slug },
      { status: 'replied' }
    );
    
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Respond error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Stats.findOne({}) || { totalLinksCreated: 0, totalViews: 0 };
    const totalLinks = await LoveLink.countDocuments();
    const totalShared = await LoveLink.countDocuments({ status: { $in: ['sent', 'replied'] } });
    
    res.json({
      success: true,
      data: {
        totalLinksCreated: stats.totalLinksCreated || totalLinks,
        totalLinksShared: totalShared,
        totalViews: stats.totalViews,
        activeLinks: totalLinks
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete LoveLink
router.delete('/delete/:token', async (req, res) => {
  try {
    const loveLink = await LoveLink.findOneAndDelete({ senderToken: req.params.token });
    
    if (!loveLink) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
