var convertUTCtoTimestamp = function(utc_string) {
  return Math.round(new Date(utc_string) / 1000);
};

export default convertUTCtoTimestamp;
