import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Image } from 'react-native';

export default function EventListItem({ event }) {
  return (
    <View className="gap-3 p-3">
      <View className="flex-row gap-4">
        <View className="flex-1 gap-2">
          <Text className="text-lg font-semibold uppercase text-amber-800">
            Wed 13, Sep • 19:30 CET
          </Text>
          <Text className="text-xl font-bold" numberOfLines={2}>
            {event.title}
          </Text>
          <Text className="text-gray-700">{event.location}</Text>
        </View>

        <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-xl" />
      </View>

      <View className="flex-row gap-3">
        <Text className="mr-auto text-gray-700">16 going</Text>
        <Ionicons name="share-outline" size={20} color="gray" />
        <Ionicons name="bookmark-outline" size={20} color="gray" />
      </View>
    </View>
  );
}
