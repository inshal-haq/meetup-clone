import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { getAddressSuggestions, retrieveAddressDetails } from '~/utils/AddressAutocomplete';

export default function AddressAutocomplete({ onSelected }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { session } = useAuth();

  const search = async () => {
    const data = await getAddressSuggestions(input, session.access_token);
    setSuggestions(data.suggestions);
  };

  const handleSelectLocation = async (suggestion: string) => {
    setSelectedLocation(suggestion);
    setInput(suggestion.name);
    setSuggestions([]);

    const details = await retrieveAddressDetails(suggestion.mapbox_id, session.access_token);
    onSelected(details);
  };

  return (
    <View>
      <View className="flex-row items-center gap-3">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Search for an address"
          className="flex-1 border border-gray-300 p-2"
        />
        <FontAwesome onPress={search} name="search" size={24} color="black" />
      </View>

      <View className="gap-2">
        {suggestions.map((item) => (
          <Pressable
            onPress={() => handleSelectLocation(item)}
            key={item.mapbox_id}
            className="rounded border border-gray-300 p-2">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm text-gray-500">{item.place_formatted}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
