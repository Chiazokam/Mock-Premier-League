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

const Team = mongoose.model('Team', teamSchema);
export default Team;
