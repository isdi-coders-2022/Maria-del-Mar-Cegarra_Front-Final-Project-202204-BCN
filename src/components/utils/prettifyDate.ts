const prettifyDate = (date: string) => {
  const timeDiff = Date.now() - Date.parse(date);
  const dateDivided = date.split(" ");

  const month = dateDivided[1];
  const day = dateDivided[2];
  const year = dateDivided[3];

  const seconds = timeDiff / 1000;
  const minutes = timeDiff / 1000 / 60;
  const hours = timeDiff / 1000 / 60 / 60;
  const days = timeDiff / 1000 / 60 / 60 / 24;

  const secondsPretty = `${Math.round(seconds)} seconds ago`;
  const minutesPretty = `${Math.round(minutes)} minutes ago`;
  const hoursPretty = `${Math.round(hours)} hours ago`;
  const daysPretty = `${Math.round(days)} days ago`;
  const datePretty = `${day} of ${month} of ${year}`;

  if (seconds < 60) {
    return secondsPretty;
  } else if (minutes < 60) {
    return minutesPretty;
  } else if (hours < 24) {
    return hoursPretty;
  } else if (days < 7) {
    return daysPretty;
  } else {
    return datePretty;
  }
};

export default prettifyDate;
