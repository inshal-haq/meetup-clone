import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image } from 'react-native';

import events from '~/assets/events.json'; // dummy data

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <View className="flex-1 gap-3 bg-white p-3">
      <Stack.Screen
        options={{
          headerTitle: 'Event',
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: 'black',
        }}
      />
      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-xl" />
      <Text className="text-3xl font-bold" numberOfLines={2}>
        {event.title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">
        {dayjs(event.datetime).format('ddd, D MMM')} • {dayjs(event.datetime).format('h:MM A')}
      </Text>
      <Text className="text-lg">{event.description}</Text>
    </View>
  );
}
