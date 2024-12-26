import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

import events from '~/assets/events.json'; // dummy data

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);

  return (
    <View>
      <Text>Event title: {event?.title}</Text>
    </View>
  );
}
