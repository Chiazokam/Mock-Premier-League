import mongoose from 'mongoose';

const fixtureSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  home: {
    type: mongoose.Schema.Types.String,
    ref: 'name',
  },
  away: {
    type: mongoose.Schema.Types.String,
    ref: 'name',
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed'],
  },
  slug: {
    type: String,
    required: true,
  },
});

const Fixture = mongoose.model('Fixture', fixtureSchema);
export default Fixture;
