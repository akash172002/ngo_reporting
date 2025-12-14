import Report from "../models/Report.js";

export const getDashboard = async (req, res, next) => {
  try {
    const { month, ngoId, page = 1, limit = 10 } = req.query;

    const match = {};
    if (month) match.month = month;
    if (ngoId) match.ngoId = ngoId;

    const skip = (page - 1) * limit;

    const summary = await Report.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          ngos: { $addToSet: "$ngoId" },
          peopleHelped: { $sum: "$peopleHelped" },
          eventsConducted: { $sum: "$eventsConducted" },
          fundsUtilized: { $sum: "$fundsUtilized" },
        },
      },
      {
        $project: {
          totalNGOs: { $size: "$ngos" },
          peopleHelped: 1,
          eventsConducted: 1,
          fundsUtilized: 1,
        },
      },
    ]);

    const reports = await Report.find(match).skip(skip).limit(Number(limit));

    res.json({
      summary: summary[0] || {},
      page: Number(page),
      limit: Number(limit),
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};
