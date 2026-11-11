export type UserRole = 'student' | 'alumni' | 'admin';

export type SessionType = 'cv_review' | 'mock_interview' | 'career_sharing';

export type SlotStatus = 'available' | 'booked' | 'cancelled';

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  headline?: string;
  graduation_year?: number;
  department?: string;
  linkedin_url?: string;
  current_company?: string;
  current_position?: string;
  verified_at?: string | null;
  created_at?: string;
}

export interface AlumniTopic {
  id?: string;
  topic_id?: string;
  name: string;
}

export interface AlumniProfileItem {
  id: string;
  full_name: string;
  avatar_url?: string;
  current_company: string;
  current_position: string;
  bio: string;
  headline?: string;
  graduation_year?: number;
  department?: string;
  linkedin_url?: string;
  topics: { name: string }[];
  average_rating: number;
  total_reviews: number;
}

export interface MentorshipSlot {
  id: string;
  alumni_id: string;
  session_type: SessionType;
  start_time: string;
  end_time: string;
  status: SlotStatus;
  created_at?: string;
  alumni?: {
    full_name: string;
    current_company?: string;
    current_position?: string;
  };
}

export interface Booking {
  id: string;
  slot_id: string;
  student_id: string;
  session_type: SessionType;
  status: BookingStatus;
  meeting_url: string;
  notes?: string;
  cv_file_path?: string;
  created_at: string;
  slot?: MentorshipSlot;
  student?: {
    full_name: string;
    email: string;
    department?: string;
  };
  alumni?: {
    full_name: string;
    current_company?: string;
    current_position?: string;
  };
}

export interface Review {
  id: string;
  booking_id: string;
  student_id: string;
  alumni_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  student?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface TopicItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

