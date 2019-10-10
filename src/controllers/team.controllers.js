import Team from '../models/team';
import client from '../redis';
import keys from '../utils/redisKeys.utils';

const { teams } = keys;

class TeamController { 
  /**
 * @description Create Team controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async createTeam(req, res) {
    try {
      const { name, stadiumName } = req.body;

      const data = await new Team({ name, stadiumName });
      await data.save();
      client.del(teams);
      return res.status(201).json({
        status: 201,
        data,
        message: 'Successfully created a team',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  /**
 * @description Get Teams controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async getTeams(req, res) {
    client.get(teams, async (error, result) => {
      if (result) {
        return res.status(200).json({
          source: 'cache',
          status: 200,
          message: 'Successfully retrieved all teams',
          data: JSON.parse(result),
        });
      }
      const data = await Team.find({});
      client.setex(teams, 3600, JSON.stringify(data));
      if (data.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No Teams found',
        });
      }
      return res.status(200).json({
        source: 'server',
        status: 200,
        message: 'Successfully retrieved all teams',
        data,
      });
    });
  }

  /**
 * @description Update Team
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async updateTeam(req, res) {
    try {
      const { name, stadiumName } = req.body;
      const { id: _id } = req.params;
      const data = await Team.findOneAndUpdate(
        { _id },
        { name, stadiumName },
        { new: true },
      );
      if (!data) {
        return res.status(404).json({
          status: 404,
          message: 'Team Not Found',
        });
      }
      client.del(teams);
      return res.status(200).json({
        status: 200,
        data,
        message: 'Successfully updated the team',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  /**
 * @description Delete Team
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async deleteTeam(req, res) {
    try {
      const { id: _id } = req.params;
      const data = await Team.findOneAndDelete({ _id });
      if (!data) {
        return res.status(404).json({
          status: 404,
          message: 'Team Not Found',
        });
      }
      client.del(teams);
      return res.status(200).json({
        data,
        message: 'Successfully deleted the team',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default TeamController;
