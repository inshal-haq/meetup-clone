import { Stack } from 'expo-router';

import events from '~/assets/events.json';
import EventListItem from '~/components/EventListItem';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <EventListItem event={events[0]} />
      <EventListItem event={events[1]} />
    </>
  );
}
