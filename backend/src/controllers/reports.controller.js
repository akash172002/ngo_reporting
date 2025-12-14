import Report from "../models/Report.js";

export const submitReport = async (req, res, next) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } =
      req.body;

    const report = await Report.findOneAndUpdate(
      { ngoId, month },
      { peopleHelped, eventsConducted, fundsUtilized },
      { upsert: true, new: true }
    );

    res.json(report);
  } catch (error) {
    next(error);
  }
};
