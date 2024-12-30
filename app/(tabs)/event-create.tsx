import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AddressAutocomplete from '~/components/AddressAutocomplete';
import Avatar from '~/components/Avatar';

import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function EventCreateScreen() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState(null);
  const { user } = useAuth();

  const createEvent = async () => {
    setLoading(true);

    const long = location.features[0].properties.coordinates.longitude;
    const lat = location.features[0].properties.coordinates.latitude;

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          date: date.toISOString(),
          user_id: user.id,
          image_uri: imageUrl,
          location: location.features[0].properties.name,
          location_point: `POINT(${long} ${lat})`,
        },
      ])
      .select()
      .single();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    } else {
      setTitle('');
      setDescription('');
      setDate(new Date());

      router.push('/');
    }

    setLoading(false);
  };
  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-3 bg-white p-5 pt-10">
      <View className="items-center">
        <Avatar
          size={200}
          url={imageUrl}
          onUpload={(url: string) => {
            setImageUrl(url);
          }}
        />
      </View>
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
      <AddressAutocomplete onSelected={setLocation} />

      <Pressable
        onPress={() => createEvent()}
        disabled={loading}
        className="mt-auto items-center rounded-md bg-red-400 p-5 px-8">
        <Text className="text-lg font-bold text-white">Create Event</Text>
      </Pressable>
    </ScrollView>
  );
}
