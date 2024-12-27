import { Stack } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { supabase } from '~/utils/supabase';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
      </View>

      <Button
        title="Sign Out"
        onPress={async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error('Error signing out:', error.message);
            }
          } catch (error) {
            console.error('Error signing out:', error);
          }
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
