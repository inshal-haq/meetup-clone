import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import events from '~/assets/events.json'; // dummy data
import EventListItem from '~/components/EventListItem';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem key={item.id} event={item} />}
        showsVerticalScrollIndicator={false}
        className="bg-white"
      />
    </>
  );
}
