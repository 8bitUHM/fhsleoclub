const dateTerms = {
  AM:"AM",
  PM:"PM"
}

export const convertTo24 = (date:string):string => {
  const strippedDate = date.replace(/[AaPp][Mm]/gm, '');
  let hours = Number(strippedDate.split(":")[0]);
  const minutes = strippedDate.split(":")[1];
  if (date.includes(dateTerms.PM) && hours < 12) {
    hours += 12;
  }

  if (date.includes(dateTerms.AM) && hours === 12) {
   hours -= 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

export const convertTo12 = (date:string):string => {
  let hours = Number(date.split(":")[0]);
  const minutes = date.split(":")[1];

  let timeString;

  if (hours === 12) {
    timeString = `${hours}:${minutes}${dateTerms.PM}`;
  } else if (hours === 0) {
    hours = 12;
    timeString = `${hours}:${minutes}${dateTerms.AM}`;
  } else if (hours > 12) {
    hours -= 12;
    timeString = `${hours}:${minutes}${dateTerms.PM}`;
  } else {
    timeString = `${hours}:${minutes}${dateTerms.AM}`;
  }

  return timeString;
}