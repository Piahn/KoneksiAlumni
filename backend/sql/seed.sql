-- ============================================================
-- KoneksiAlumni Seed Data
-- Data awal untuk topik keahlian mentoring
-- ============================================================

INSERT INTO topics (name) VALUES
    ('Frontend Web'),
    ('Backend Web'),
    ('Mobile Development'),
    ('UI/UX Design'),
    ('Data Science'),
    ('AI / Machine Learning'),
    ('Cloud & DevOps'),
    ('Cybersecurity'),
    ('Product Management'),
    ('Business & Startup'),
    ('Embedded Systems'),
    ('Game Development')
ON CONFLICT (name) DO NOTHING;

