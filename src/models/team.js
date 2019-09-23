import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stadiumName: {
    type: String,
  },
});

teamSchema.pre('remove', (next) => {
  this.model('Fixture').deleteMany({ home: this._id }, next);
});

teamSchema.pre('remove', (next) => {
  this.model('Fixture').deleteMany({ away: this._id }, next);
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
