/* eslint-disable func-names */
import uuid from 'uuid';
import Fixture from '../models/fixture';
import client from '../redis';
import keys from '../utils/redisKeys.utils';

const { fixtures } = keys;

class FixtureController {
  /**
 * @description Create Fixture controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async createFixture(req, res) {
    const {
      time, home, away, location, status,
    } = req.body;

    const date = new Date(time).toISOString();
    const idSubstring = uuid.v4().substring(0, 5);
    const slug = `${home}-${away}-${idSubstring}`;
    const data = await new Fixture({
      time: date, home, away, location, status, slug,
    });
    await data.save();
    client.del(fixtures);
    client.del(status);
    client.del(home);
    client.del(away);
    client.del(slug);

    return res.status(201).json({
      status: 201,
      data,
      message: 'Successfully created a fixture',
    });
  }

  /**
 * @description Get Fixtures controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async getFixtures(req, res) {
    let data;
    const { status } = req.query;
    client.get(status || fixtures, async (error, result) => {
      if (result) {
        return res.status(200).json({
          source: 'cache',
          status: 200,
          message: `Successfully retrieved all ${status || ''} fixtures`,
          data: JSON.parse(result),
        });
      }
      if (!status) {
        data = await Fixture.find({});
        client.setex(fixtures, 3600, JSON.stringify(data));
      } else {
        data = await Fixture.find({ status });
        client.setex(status, 3600, JSON.stringify(data));
      }
      if (data.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No Fixtures found',
        });
      }
      return res.status(200).json({
        source: 'server',
        status: 200,
        message: `Successfully retrieved all ${status || ''} fixtures`,
        data,
      });
    });
  }

  /**
 * @description Get Fixture By Unique Slug
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async getFixture(req, res) {
    const { slug } = req.params;
    client.get(slug, async (error, result) => {
      if (result) {
        return res.status(200).json({
          source: 'cache',
          status: 200,
          message: 'Successfully retrieved fixture',
          data: JSON.parse(result),
        });
      }
      const data = await Fixture.find({ slug });
      client.setex(slug, 3600, JSON.stringify(data));
      if (data.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Fixture may have been deleted or does not exist',
        });
      }
      return res.status(200).json({
        source: 'server',
        status: 200,
        message: 'Successfully retrieved fixture',
        data,
      });
    });
  }

  /**
 * @description Update Fixture
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async updateFixture(req, res) {
    const {
      time, home, away, location, status,
    } = req.body;
    const { id: _id } = req.params;
    const idSubstring = uuid.v4().substring(0, 5);
    const slug = `${home}-${away}-${idSubstring}`;
    const data = await Fixture.findOneAndUpdate(
      { _id },
      {
        time, home, away, location, status, slug,
      },
      { new: true },
    );
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Fixture Not Found',
      });
    }
    client.del(fixtures);
    client.del(status);
    client.del(home);
    client.del(away);
    client.del(slug);
    return res.status(200).json({
      status: 200,
      data,
      message: 'Successfully updated the fixture',
    });
  }

  /**
 * @description Delete Fixture
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async deleteFixture(req, res) {
    const { id: _id } = req.params;
    const data = await Fixture.findOneAndDelete({ _id });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Fixture Not Found',
      });
    }
    client.del(fixtures);
    client.del(data.status);
    client.del(data.home);
    client.del(data.away);
    client.del(data.slug);
    return res.status(200).json({
      status: 200,
      data,
      message: 'Successfully deleted the fixture',
    });
  }
}

export default FixtureController;
