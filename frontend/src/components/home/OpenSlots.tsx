import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Compass, Sparkles, Building, Briefcase, Award } from 'lucide-react';

export const OpenSlots: React.FC = () => {
  const jobs = [
    {
      id: 'j1',
      title: 'Senior UX Designer',
      timeAgo: '19h ago',
      company: '3Portals',
      icon: <Box className="w-3.5 h-3.5 text-blue-600" />,
      employmentType: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: 'Min 3 years experience',
      deadline: '30 Apr 2026',
    },
    {
      id: 'j2',
      title: 'Full Stack Web Developer',
      timeAgo: '1d ago',
      company: '45 Degrees*',
      icon: <Compass className="w-3.5 h-3.5 text-indigo-600" />,
      employmentType: 'Full-time',
      location: 'Bandung, Indonesia',
      experience: 'Min 2 years experience',
      deadline: '31 Apr 2026',
    },
    {
      id: 'j3',
      title: 'Digital Marketing Specialist',
      timeAgo: '2d ago',
      company: 'Acme Corp',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" />,
      employmentType: 'Full-time',
      location: 'Bali, Indonesia',
      experience: 'Min 3 - 5 years experience',
      deadline: '24 Apr 2026',
    },
    {
      id: 'j4',
      title: 'Warehouse Supervisor',
      timeAgo: '1d ago',
      company: 'Starlight',
      icon: <Building className="w-3.5 h-3.5 text-amber-600" />,
      employmentType: 'Full-time',
      location: 'Yogyakarta, Indonesia',
      experience: 'Min 2 years experience',
      deadline: '5 May 2026',
    },
    {
      id: 'j5',
      title: 'Sales Representative',
      timeAgo: '3d ago',
      company: 'Alt+Shift',
      icon: <Briefcase className="w-3.5 h-3.5 text-sky-600" />,
      employmentType: 'Full-time',
      location: 'Jakarta, Indonesia',
      experience: 'Min 1 years experience',
      deadline: '28 April 2026',
    },
    {
      id: 'j6',
      title: 'Marketing Coordinator',
      timeAgo: '1w ago',
      company: 'BuildingBlocks',
      icon: <Award className="w-3.5 h-3.5 text-purple-600" />,
      employmentType: 'Contract',
      location: 'Jakarta, Indonesia',
      experience: 'Min 1 years experience',
      deadline: '2 May 2026',
    },
  ];

  return (
    <section id="career" className="py-20 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Image 1 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 mb-2">
            Career
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Latest Job Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Browse fresh opportunities to take the next step in your career.
          </p>
        </div>

        {/* 6 Job Cards Grid (2 rows x 3 columns matching Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Title & Time Ago */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">
                    {job.timeAgo}
                  </span>
                </div>

                {/* Company Name */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-4">
                  {job.icon}
                  <span>{job.company}</span>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs text-slate-500">
                  <p>{job.employmentType} • {job.location}</p>
                  <p>{job.experience}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Deadline
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {job.deadline}
                  </span>
                </div>
                <Link
                  to="/direktori"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 text-xs font-semibold transition-colors shadow-2xs"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Centered View All Jobs Button matching Image 1 */}
        <div className="text-center mt-12">
          <Link
            to="/direktori"
            className="inline-block rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 px-8 py-2.5 text-xs font-semibold shadow-2xs transition-all hover:shadow-xs"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};
