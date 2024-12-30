const API_BASE_URL = 'https://api.mapbox.com/search/searchbox/v1';
const accessToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

export async function getAddressSuggestions(input: string, session_token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/suggest?q=${input}&language=en&proximity=-73.990593,40.740121&session_token=${session_token}&access_token=${accessToken}`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveAddressDetails(mapbox_id: string, session_token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/retrieve/${mapbox_id}?session_token=${session_token}&access_token=${accessToken}`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}
