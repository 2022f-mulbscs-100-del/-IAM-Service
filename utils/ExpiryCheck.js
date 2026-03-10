export const ExpiryCheck = (expiryTime) => {
  const currentTime = new Date();
  const timeDiff = currentTime - expiryTime;
  return timeDiff > 0;
};
