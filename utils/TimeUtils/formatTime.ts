export const formatTimePosted = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = {
    minute: 60,
    hour: 3600,
    day: 86400,
    month: 2592000
  };

  if (seconds < intervals.minute) return 'Just now';
  if (seconds < intervals.hour) {
    const minutes = Math.floor(seconds / intervals.minute);
    return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  }
  if (seconds < intervals.day) {
    const hours = Math.floor(seconds / intervals.hour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (seconds < intervals.month) {
    const days = Math.floor(seconds / intervals.day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};