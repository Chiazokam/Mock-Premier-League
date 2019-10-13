/* eslint-disable func-names */
import Fixture from '../models/fixture';
import Team from '../models/team';
import client from '../redis';
import searchByStatus from '../utils/search.utils';

class SearchController {
  /**
 * @description Search Fixtures and Teams controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */

  /* istanbul ignore next */
  static async searchResource(req, res) {
    const { name, status } = req.query;
    client.get(name, async (error, result) => {
      if (result) {
        if (status === 'pending' || status === 'completed') {
          const resultJSON = JSON.parse(result);
          const filteredFixtures = searchByStatus(status, resultJSON.fixtures);
          return res.status(200).json({
            source: 'cache',
            status: 200,
            message: 'Successfully retrieved team details',
            data: {
              team: resultJSON.team,
              fixtures: filteredFixtures,
            },
          });
        }
        return res.status(200).json({
          source: 'cache',
          status: 200,
          message: 'Successfully retrieved team details',
          data: JSON.parse(result),
        });
      }
      const teamDetails = await Team.find({ name });
      if (teamDetails.length === 0) {
        return res.status(404).json({
          source: 'server',
          status: 404,
          message: 'Search Unsuccessful',
        });
      }
      const teamFixtures = await Fixture.find({
        $or: [{ home: name }, { away: name }],
      });

      const team = {
        team: teamDetails,
        fixtures: teamFixtures,
      };

      client.setex(name, 3600, JSON.stringify(team));
      if (status === 'pending' || status === 'completed') {
        const filteredFixtures = searchByStatus(status, teamFixtures);
        return res.status(200).json({
          source: 'server',
          status: 200,
          message: 'Successfully retrieved team details',
          data: {
            ...team,
            fixtures: filteredFixtures,
          },
        });
      }

      return res.status(200).json({
        source: 'server',
        status: 200,
        message: 'Successfully retrieved team details',
        data: team,
      });
    });
  }
}

export default SearchController;
