import moment from "moment-timezone";

const now = moment().tz("America/New_York");//.utcOffset('-05:00'); // UTC-5 for Eastern Standard Time (EST)

// Function to create Moment object from date only
const createMomentFromDate = (date) => {
  return moment(date, 'YYYY-MM-DD').tz("America/New_York");
};

const start = createMomentFromDate("2024-07-09")
console.log("Now is " + now.toLocaleString());
console.log(createMomentFromDate("2024-07-09").toLocaleString());
console.log(now.isSameOrAfter(start, "day"))

