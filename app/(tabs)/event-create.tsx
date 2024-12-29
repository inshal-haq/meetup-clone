import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function EventCreateScreen() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const { user } = useAuth();

  const createEvent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date, user_id: user.id }])
      .select()
      .single();

    setTitle('');
    setDescription('');
    setDate(new Date());

    setLoading(false);
    router.push('/');
  };
  return (
    <View className="flex-1 gap-3 bg-white p-5 pt-10">
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Event Name"
        className="rounded-md border border-gray-300 p-3"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md border border-gray-300 p-3"
      />
      <Text
        onPress={() => setOpen(true)}
        className="rounded-md border border-gray-300 p-3 text-center">
        {date.toLocaleString()}
      </Text>
      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        mode="datetime"
        minuteInterval={15}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Pressable
        onPress={() => createEvent()}
        disabled={loading}
        className="mt-auto items-center rounded-md bg-red-400 p-5 px-8">
        <Text className="text-lg font-bold text-white">Create Event</Text>
      </Pressable>
    </View>
  );
}
