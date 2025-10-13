"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface Phase2FormData {
  services: string[];
  specialSkills: string[];
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string;
  availability: string[];
  // New profile fields
  profileTitle: string;
  bio: string;
  education: string;
  university: string;
  graduationYear: string;
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
    setValue,
  } = useForm<Phase2FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(initialData.services || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData.specialSkills || []);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(initialData.availability || []);

  const serviceOptions = [
    'Asisten Rumah Tangga',
    'Baby Sitter',
    'Perawat Lansia'
  ];

  const skillOptions = [
    'Memasak',
    'Pertolongan Pertama(P3K)',
    'Mengemudi Mobil (SIM A)',
    'Komunikasi',
    'Laundry',
    'House Cleaning',
    'Mengemudi Motor (SIM B)',
    'Mengasuh Anak'
  ];

  const availabilityOptions = [
    'Penuh Waktu',
    'Paruh Waktu',
    'Menginap',
    'Harian/Lepas'
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    let newServices;
    if (checked) {
      newServices = [...selectedServices, service];
    } else {
      newServices = selectedServices.filter(s => s !== service);
    }
    setSelectedServices(newServices);
    setValue('services', newServices);
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    let newSkills;
    if (checked) {
      newSkills = [...selectedSkills, skill];
    } else {
      newSkills = selectedSkills.filter(s => s !== skill);
    }
    setSelectedSkills(newSkills);
    setValue('specialSkills', newSkills);
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    let newAvailability;
    if (checked) {
      newAvailability = [...selectedAvailability, availability];
    } else {
      newAvailability = selectedAvailability.filter(a => a !== availability);
    }
    setSelectedAvailability(newAvailability);
    setValue('availability', newAvailability);
  };

  const onFormSubmit = (data: Phase2FormData) => {
    const finalData = {
      ...data,
      services: selectedServices,
      specialSkills: selectedSkills,
      availability: selectedAvailability
    };
    onNext(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Services Offered */}
      <div>
        {/* Profile Title */}
        <div>
          <label htmlFor="profileTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Judul Profil Anda
          </label>
          <p className="text-xs text-gray-500 mb-2">
            💡 Buat 'slogan' singkat dan menarik yang menggambarkan Anda.
          </p>
          <input
            id="profileTitle"
            type="text"
            {...register('profileTitle', {
              required: 'Judul profil harus diisi',
              minLength: {
                value: 10,
                message: 'Judul profil minimal 10 karakter'
              },
              maxLength: {
                value: 100,
                message: 'Judul profil maksimal 100 karakter'
              }
            })}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Contoh: ART Cekatan, Bersih, dan Bisa Memasak atau Pengasuh Anak"
            disabled={isLoading}
          />
          {errors.profileTitle && (
            <p className="mt-1 text-sm text-red-600">{errors.profileTitle.message}</p>
          )}
        </div>

        {/* About Me / Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Tentang Saya
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Ini kesempatan Anda untuk 'bercerita'. Jelaskan pengalaman, sifat, dan kenapa keluarga harus memilih Anda. Semakin personal, semakin baik!
          </p>
          <textarea
            id="bio"
            rows={4}
            {...register('bio', {
              required: 'Deskripsi tentang diri Anda harus diisi',
              minLength: {
                value: 50,
                message: 'Deskripsi minimal 50 karakter'
              },
              maxLength: {
                value: 500,
                message: 'Deskripsi maksimal 500 karakter'
              }
            })}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Contoh: Saya memiliki pengalaman 5 tahun sebagai ART. Saya sangat teliti dalam membersihkan rumah, bisa memasak masakan Indonesia dan Chinese, serta sabar dalam mengasuh anak. Saya orangnya jujur, dapat dipercaya, dan selalu berusaha memberikan yang terbaik..."
            disabled={isLoading}
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        {/* Education Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Pendidikan Terakhir
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Education Level */}
            <div>
              <label htmlFor="education" className="block text-xs font-medium text-gray-600 mb-1">
                Jenjang
              </label>
              <select
                id="education"
                {...register('education', {
                  required: 'Jenjang pendidikan harus dipilih'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                disabled={isLoading}
              >
                <option value="">Pilih jenjang</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA/SMK">SMA/SMK</option>
                <option value="D1">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
              {errors.education && (
                <p className="mt-1 text-xs text-red-600">{errors.education.message}</p>
              )}
            </div>

            {/* University/School */}
            <div>
              <label htmlFor="university" className="block text-xs font-medium text-gray-600 mb-1">
                Universitas/Sekolah
              </label>
              <input
                id="university"
                type="text"
                {...register('university', {
                  required: 'Nama institusi harus diisi'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama sekolah/universitas"
                disabled={isLoading}
              />
              {errors.university && (
                <p className="mt-1 text-xs text-red-600">{errors.university.message}</p>
              )}
            </div>

            {/* Graduation Year */}
            <div>
              <label htmlFor="graduationYear" className="block text-xs font-medium text-gray-600 mb-1">
                Tahun Lulus
              </label>
              <select
                id="graduationYear"
                {...register('graduationYear', {
                  required: 'Tahun lulus harus dipilih'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                disabled={isLoading}
              >
                <option value="">Pilih tahun</option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.graduationYear && (
                <p className="mt-1 text-xs text-red-600">{errors.graduationYear.message}</p>
              )}
            </div>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Layanan yang Anda Tawarkan:
        </label>
        <div className="space-y-2">
          {serviceOptions.map((service) => (
            <label key={service} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={(e) => handleServiceChange(service, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keahlian Khusus yang Dikuasai:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {skillOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={(e) => handleSkillChange(skill, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Expected Salary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tarif yang Anda Harapkan
        </label>
        <div className="flex flex-col md:flex-row space-x-2 space-y-2 md:space-y-0">
          <select
            {...register('salaryMin', {
              required: 'Tarif minimum harus dipilih',
              valueAsNumber: true
            })}
            className={`flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${errors.salaryMin ? 'ring-2 ring-red-500 bg-red-50' : ''
              }`}
            disabled={isLoading}
          >
            <option value={0}>Rp.0 - Rp.500.000,00</option>
            <option value={500000}>Rp.500.000 - Rp.1.000.000</option>
            <option value={1000000}>Rp.1.000.000 - Rp.2.000.000</option>
            <option value={2000000}>Rp.2.000.000 - Rp.3.000.000</option>
            <option value={3000000}>Rp.3.000.000 - Rp.4.000.000</option>
            <option value={4000000}>Rp.4.000.000 - Rp.5.000.000</option>
            <option value={5000000}>Rp.5.000.000+</option>
          </select>
          <select
            {...register('salaryUnit', {
              required: 'Unit gaji harus dipilih'
            })}
            className={`px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${errors.salaryUnit ? 'ring-2 ring-red-500 bg-red-50' : ''
              }`}
            disabled={isLoading}
          >
            <option value="/Bulan">/ Bulan</option>
            <option value="/Hari">/ Hari</option>
            <option value="/Jam">/ Jam</option>
          </select>
        </div>
        {(errors.salaryMin || errors.salaryUnit) && (
          <p className="mt-1 text-sm text-red-600">
            {errors.salaryMin?.message || errors.salaryUnit?.message}
          </p>
        )}
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ketersediaan
        </label>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAvailability.includes(option)}
                onChange={(e) => handleAvailabilityChange(option, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>



      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
        >
          Sebelumnya
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