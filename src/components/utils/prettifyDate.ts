const prettifyDate = (date: string) => {
  const timeDiff = Date.now() - Date.parse(date);
  const dateNoTime = date.split("T");
  const dateDivided = dateNoTime[0].split("-");
  const months = [
    "",
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const month = parseInt(dateDivided[1]);
  const postDate =
    timeDiff / 1000 <= 60
      ? `${Math.round(timeDiff / 1000)} seconds ago`
      : timeDiff / 1000 / 60 <= 60
      ? `${Math.round(timeDiff / 1000 / 60)} minutes ago`
      : timeDiff / 1000 / 60 / 60 <= 23
      ? `${Math.round(timeDiff / 1000 / 60 / 60)} hours ago`
      : timeDiff / 1000 / 60 / 60 / 24 <= 7
      ? `${Math.round(timeDiff / 1000 / 60 / 60 / 24)} days ago`
      : `${dateDivided[2]} of ${months[month]} of ${dateDivided[0]}`;
  return postDate;
};

export default prettifyDate;
