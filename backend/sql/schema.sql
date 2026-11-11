-- ============================================================
-- KoneksiAlumni Database Schema
-- Target: Supabase PostgreSQL (jalankan di SQL Editor Supabase)
-- ============================================================

-- 1. CUSTOM ENUM TYPES
CREATE TYPE user_role AS ENUM ('student', 'alumni', 'admin');
CREATE TYPE session_type AS ENUM ('mock_interview', 'cv_review', 'career_sharing');
CREATE TYPE slot_status AS ENUM ('available', 'booked', 'cancelled');
CREATE TYPE booking_status AS ENUM ('confirmed', 'completed', 'cancelled');

-- 2. PROFILES (terhubung ke auth.users milik Supabase)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'student',
    full_name VARCHAR(150) NOT NULL,
    university_email VARCHAR(150) UNIQUE NOT NULL,
    bio TEXT,
    current_company VARCHAR(100),
    current_position VARCHAR(100),
    linkedin_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_verified ON profiles(is_verified);

-- 3. TOPICS (kategori keahlian mentoring)
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- 4. ALUMNI_TOPICS (relasi many-to-many)
CREATE TABLE alumni_topics (
    alumni_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic_id INT REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (alumni_id, topic_id)
);

-- 5. MENTORSHIP SLOTS (jadwal ketersediaan alumni)
CREATE TABLE mentorship_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumni_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    session_type session_type NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status slot_status DEFAULT 'available',
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

CREATE INDEX idx_slots_alumni ON mentorship_slots(alumni_id);
CREATE INDEX idx_slots_status ON mentorship_slots(status);
CREATE INDEX idx_slots_start_time ON mentorship_slots(start_time);

-- 6. BOOKINGS (pemesanan sesi mentoring)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID UNIQUE NOT NULL REFERENCES mentorship_slots(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    notes TEXT,
    cv_file_path TEXT,
    meeting_url TEXT,
    status booking_status DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- 7. REVIEWS (ulasan & rating pasca-sesi)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id),
    alumni_id UUID NOT NULL REFERENCES profiles(id),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_alumni ON reviews(alumni_id);

-- 8. IDEMPOTENCY KEYS (mencegah duplikasi request)
CREATE TABLE idempotency_keys (
    key VARCHAR(255) PRIMARY KEY,
    response JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-cleanup idempotency keys older than 24 hours (jalankan via pg_cron atau scheduled function)
-- SELECT cron.schedule('cleanup-idempotency', '0 * * * *', $$DELETE FROM idempotency_keys WHERE created_at < NOW() - INTERVAL '24 hours'$$);

