export const getLocation = (
  setLoading: (isLoading: boolean) => void,
  setLat: (lat: number) => void,
  setLong: (long: number) => void,
  setError: (isError: boolean) => void
): void => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLoading(true);
      setError(false);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setLoading(false);
    },
    () => {
      setLoading(false);
      setError(true);
    }
  );
};
