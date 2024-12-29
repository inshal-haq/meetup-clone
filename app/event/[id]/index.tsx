import dayjs from 'dayjs';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import SupaImage from '~/components/SupaImage';
import { useAuth } from '~/contexts/AuthProvider';
import { Attendance, Event } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function EventScreen() {
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data);

    const { data: attendanceData } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .eq('event_id', id)
      .single();
    setAttendance(attendanceData);
    setLoading(false);
  };

  const joinEvent = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .insert({ user_id: user.id, event_id: event.id })
      .select()
      .single();

    setAttendance(data);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
      <SupaImage path={event.image_uri} className="aspect-video w-full rounded-xl" />
      <Text className="text-3xl font-bold" numberOfLines={2}>
        {event.title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">
        {dayjs(event.date).format('ddd, D MMM')} • {dayjs(event.date).format('h:MM A')}
      </Text>
      <Text className="text-lg">{event.description}</Text>
      <Link href={`/event/${event.id}/attendance`} className="text-lg">
        View Attendance
      </Link>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-300 p-5 pb-10">
        <Text className="text-xl font-semibold">Free</Text>
        {attendance ? (
          <Text className="text-lg font-semibold text-green-500">You are attending!</Text>
        ) : (
          <Pressable onPress={() => joinEvent()} className="rounded-md bg-red-400 p-5 px-8">
            <Text className="text-lg font-bold text-white">Join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
