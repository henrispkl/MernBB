import moment from 'moment';

const convertDate = ISOdate => {
  let convertedDate = '';
  const date = new Date(ISOdate);
  const dateNow = new Date();
  const diffTime = Math.abs(date - dateNow);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If last post is more than 3 days old, show full date
  if (diffDays > 3) {
    const year = date.getFullYear();
    let month = date.toLocaleString('default', {
      month: 'short',
    });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    let day = date.getDate();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    // Add zero to days
    if (day < 10) {
      day = '0' + day;
    }

    // Add zero to minutes
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    convertedDate = `${month} ${day}, ${year}, ${hours}:${minutes}`;
  } else {
    convertedDate = moment(date).fromNow();
  }

  return convertedDate;
};

export default convertDate;
