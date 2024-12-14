interface IDate {
  calendar: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}

const dateToISO = (date: IDate | string | undefined): string => {
  if (!date) {
    return new Date().toISOString();
  }

  if (typeof date === "string" && !isNaN(Date.parse(date))) {
    return new Date(date).toISOString();
  }

  if (typeof date === "object") {
    const { year, month, day } = date;

    if (
      typeof year !== "number" ||
      typeof month !== "number" ||
      typeof day !== "number" ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      throw new Error("Invalid date components provided.");
    }

    const jsDate = new Date(year, month - 1, day);

    if (isNaN(jsDate.getTime())) {
      throw new Error("Invalid Date generated.");
    }

    return jsDate.toISOString();
  }

  throw new Error("Invalid date format or type provided.");
};

export default dateToISO;
