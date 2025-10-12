"use client";

import { useForm } from 'react-hook-form';

interface Phase2FormData {
  experience: string;
  skills: string[];
  availability: string;
  location: string;
}

interface ArtSignupPhase2Props {
  initialData: Phase2FormData;
  onNext: (data: Phase2FormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const ArtSignupPhase2: React.FC<ArtSignupPhase2Props> = ({
  initialData,
  onNext,
  onBack,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<Phase2FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const onSubmit = (data: Phase2FormData) => {
    onNext(data);
  };

  const skillOptions = [
    'Pembersihan Rumah',
    'Memasak',
    'Mencuci dan Menyetrika',
    'Mengurus Anak',
    'Mengurus Lansia',
    'Berkebun',
    'Belanja',
    'Supir'
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    const currentSkills = getValues('skills') || [];
    if (checked) {
      setValue('skills', [...currentSkills, skill]);
    } else {
      setValue('skills', currentSkills.filter(s => s !== skill));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Experience Field */}
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Pengalaman Kerja
        </label>
        <select
          id="experience"
          {...register('experience', {
            required: 'Pengalaman kerja harus dipilih'
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.experience ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          disabled={isLoading}
        >
          <option value="">Pilih pengalaman kerja</option>
          <option value="fresh">Baru Memulai (0-1 tahun)</option>
          <option value="experienced">Berpengalaman (1-3 tahun)</option>
          <option value="expert">Ahli (3+ tahun)</option>
        </select>
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
        )}
      </div>

      {/* Skills Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keahlian (Pilih yang sesuai)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {skillOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => handleSkillChange(skill, e.target.checked)}
                defaultChecked={initialData.skills?.includes(skill)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Field */}
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
          Ketersediaan Waktu
        </label>
        <select
          id="availability"
          {...register('availability', {
            required: 'Ketersediaan waktu harus dipilih'
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.availability ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          disabled={isLoading}
        >
          <option value="">Pilih ketersediaan waktu</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="weekend">Weekend Only</option>
          <option value="flexible">Fleksibel</option>
        </select>
        {errors.availability && (
          <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
        )}
      </div>

      {/* Location Field */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Lokasi Domisili
        </label>
        <input
          id="location"
          type="text"
          {...register('location', {
            required: 'Lokasi domisili harus diisi'
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.location ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
          disabled={isLoading}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
      </div>
    </form>
  );
};