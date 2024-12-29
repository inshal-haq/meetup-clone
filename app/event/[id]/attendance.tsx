import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function AttendanceScreen() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchAttendees();
  }, [id]);

  const fetchAttendees = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);

    setAttendees(data);
  };

  return (
    <FlatList
      data={attendees}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between border-b border-gray-200 p-3">
          <Text className="text-lg font-semibold">{item.profiles.full_name || 'User'}</Text>
        </View>
      )}
    />
  );
}
