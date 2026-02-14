// MongoDB Schema for LoveLink
const mongoose = require('mongoose');

const FlowerSchema = new mongoose.Schema({
  id: String,
  type: String,
  color: String,
  stemColor: String,
  x: Number,
  y: Number,
  rotation: Number,
  scale: Number
});

const CardSchema = new mongoose.Schema({
  id: String,
  type: String,
  order: Number,
  questions: [String],
  content: String
});

const PlanSchema = new mongoose.Schema({
  thisYear: String,
  nextYear: String,
  manifestation: String
});

const LinkItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  url: String
});

const BouquetSchema = new mongoose.Schema({
  flowers: [FlowerSchema],
  ribbonColor: String,
  wrapStyle: String,
  tagLine: String,
  ribbonName: String,
  potStyle: String
});

const LoveLinkSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  senderToken: { type: String, unique: true, required: true },
  receiverToken: { type: String, unique: true, required: true },
  pinHash: String,
  themeId: { type: String, default: 'default' },
  tone: { type: String, default: 'Sweet' },
  senderName: String,
  receiverName: String,
  partnerTitle: String,
  customTitle: String,
  senderNote: String,
  senderBouquet: BouquetSchema,
  cards: [CardSchema],
  plans: PlanSchema,
  links: [LinkItemSchema],
  musicUrl: String,
  status: { type: String, enum: ['draft', 'sent', 'replied'], default: 'draft' },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  openDate: Date
});

const LoveResponseSchema = new mongoose.Schema({
  loveLinkId: { type: String, required: true },
  receiverNote: String,
  receiverBouquet: BouquetSchema,
  cardAnswers: [{
    cardId: String,
    answers: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

const StatsSchema = new mongoose.Schema({
  totalLinksCreated: { type: Number, default: 0 },
  totalLinksShared: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = {
  LoveLink: mongoose.models.LoveLink || mongoose.model('LoveLink', LoveLinkSchema),
  LoveResponse: mongoose.models.LoveResponse || mongoose.model('LoveResponse', LoveResponseSchema),
  Stats: mongoose.models.Stats || mongoose.model('Stats', StatsSchema)
};
