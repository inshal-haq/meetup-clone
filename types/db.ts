import { Database } from './supabase';

export type Event = Database['public']['Tables']['events']['Row'];
export type Attendance = Database['public']['Tables']['attendance']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export type NearbyEvent = Database['public']['Functions']['nearby_events']['Returns'];
