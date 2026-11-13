import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  CheckCircle2,
  Sparkles,
  Send,
  MessageSquare,
  ThumbsUp,
  ArrowLeft
} from 'lucide-react';

interface StudentFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year',
  'Recent Graduate'
];

const FEATURE_TAGS = [
  'AI Mock Interview',
  'AI Voice Practice',
  'AI Career Roadmap',
  'Adaptive Learning',
  'ATS Resume Builder',
  'Job Readiness Tests'
];

export default function StudentFeedbackModal({ isOpen, onClose }: StudentFeedbackModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    yearOfStudy: 'Final Year',
    rating: 5,
    selectedFeatures: ['AI Mock Interview', 'AI Voice Practice'] as string[],
    feedback: '',
    recommend: 'Yes, definitely!'
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close on Escape key & sync body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.selectedFeatures.includes(feature);
      const updated = exists
        ? prev.selectedFeatures.filter((f) => f !== feature)
        : [...prev.selectedFeatures, feature];
      return { ...prev, selectedFeatures: updated };
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.college.trim()) errs.college = 'College/University name is required';
    if (!formData.department.trim()) errs.department = 'Degree / Department is required';
    if (!formData.feedback.trim()) errs.feedback = 'Please share your thoughts or suggestions';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('vabsgen_student_feedback') || '[]');
        existing.push({
          ...formData,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('vabsgen_student_feedback', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      yearOfStudy: 'Final Year',
      rating: 5,
      selectedFeatures: ['AI Mock Interview', 'AI Voice Practice'],
      feedback: '',
      recommend: 'Yes, definitely!'
    });
    setErrors({});
  };

  const ratingLabel = (val: number) => {
    switch (val) {
      case 5: return 'Outstanding — Exactly what I need';
      case 4: return 'Very Good — Super helpful';
      case 3: return 'Good — On the right track';
      case 2: return 'Fair — Needs more features';
      default: return 'Needs Improvement';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d0d11] border border-orange-500/25 shadow-[0_0_60px_rgba(249,115,22,0.22)] text-white z-10"
            style={{ padding: '28px' }}
          >
            {/* Ambient Corner Glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
            />

            {/* Top Bar: Badge & Close Button */}
            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
              <div
                className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider"
                style={{ padding: '6px 14px' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>Student Feedback</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Feedback Modal"
                className="rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-white border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer flex items-center justify-center"
                style={{ width: '38px', height: '38px', padding: 0 }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6 relative z-10"
              >
                <div
                  className="rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.5)] mb-5"
                  style={{ width: '72px', height: '72px' }}
                >
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  Thank You, {formData.fullName.split(' ')[0] || 'Student'}!
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-md mb-6">
                  Your feedback and student details have been recorded successfully. Our team uses your insights to build smarter AI interview simulations and personalized learning paths.
                </p>

                {/* Response summary card */}
                <div
                  className="w-full rounded-2xl bg-white/[0.03] border border-white/10 text-left mb-6"
                  style={{ padding: '18px 22px' }}
                >
                  <h4 className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-3">
                    Submitted Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-stone-500 block text-xs">Student Name</span>
                      <span className="text-white font-medium">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-xs">College</span>
                      <span className="text-white font-medium">{formData.college}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-xs">Department / Year</span>
                      <span className="text-white font-medium">{formData.department} ({formData.yearOfStudy})</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-xs">Platform Rating</span>
                      <span className="text-orange-400 font-bold inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                        {formData.rating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ padding: '14px 20px' }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Platform
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-sm font-semibold transition-all cursor-pointer"
                    style={{ padding: '14px 20px' }}
                  >
                    Submit Another Response
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Feedback Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10" noValidate>
                {/* Header Text */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    Student Details & Experience
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Tell us about your campus experience and what you need most to achieve career readiness with Vabsgen AI.
                  </p>
                </div>

                {/* Section 1: Student Information */}
                <div
                  className="rounded-2xl bg-white/[0.025] border border-white/10 flex flex-col gap-4"
                  style={{ padding: '20px' }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <User className="w-4 h-4" />
                    <span>1. Student Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Full Name <span className="text-orange-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alex Johnson"
                          className={`w-full rounded-xl bg-black/50 border text-white text-sm outline-none transition-all placeholder:text-stone-600 ${
                            errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-orange-500'
                          }`}
                          style={{ padding: '12px 14px 12px 40px' }}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        College / Personal Email <span className="text-orange-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@college.edu"
                          className={`w-full rounded-xl bg-black/50 border text-white text-sm outline-none transition-all placeholder:text-stone-600 ${
                            errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-orange-500'
                          }`}
                          style={{ padding: '12px 14px 12px 40px' }}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Phone / WhatsApp <span className="text-stone-500">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white text-sm outline-none transition-all placeholder:text-stone-600"
                          style={{ padding: '12px 14px 12px 40px' }}
                        />
                      </div>
                    </div>

                    {/* College Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        College / University Name <span className="text-orange-400">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          placeholder="e.g. National Institute of Tech"
                          className={`w-full rounded-xl bg-black/50 border text-white text-sm outline-none transition-all placeholder:text-stone-600 ${
                            errors.college ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-orange-500'
                          }`}
                          style={{ padding: '12px 14px 12px 40px' }}
                        />
                      </div>
                      {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
                    </div>

                    {/* Department / Branch */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Degree & Department <span className="text-orange-400">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          placeholder="e.g. B.Tech Computer Science"
                          className={`w-full rounded-xl bg-black/50 border text-white text-sm outline-none transition-all placeholder:text-stone-600 ${
                            errors.department ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-orange-500'
                          }`}
                          style={{ padding: '12px 14px 12px 40px' }}
                        />
                      </div>
                      {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
                    </div>

                    {/* Year of Study */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Current Year of Study <span className="text-orange-400">*</span>
                      </label>
                      <select
                        value={formData.yearOfStudy}
                        onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                        className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-orange-500 text-white text-sm outline-none transition-all cursor-pointer"
                        style={{ padding: '12px 14px' }}
                      >
                        {YEAR_OPTIONS.map((year) => (
                          <option key={year} value={year} className="bg-stone-900 text-white">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Platform Rating & Features */}
                <div
                  className="rounded-2xl bg-white/[0.025] border border-white/10 flex flex-col gap-4"
                  style={{ padding: '20px' }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <Star className="w-4 h-4" />
                    <span>2. Platform Experience & Rating</span>
                  </div>

                  {/* Rating Stars */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-2">
                      Overall Impression of Vabsgen
                    </label>
                    <div className="flex items-center gap-2 mb-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (hoverRating !== null ? hoverRating : formData.rating) >= star;
                        return (
                          <button
                            type="button"
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-7 h-7 transition-colors ${
                                isFilled
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                                  : 'text-stone-600 fill-transparent'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-semibold text-amber-300 ml-2">
                        {ratingLabel(hoverRating !== null ? hoverRating : formData.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-2">
                      Features you find most valuable for your career (Select all that apply):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FEATURE_TAGS.map((tag) => {
                        const isSelected = formData.selectedFeatures.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleFeature(tag)}
                            className={`rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-orange-500/20 text-orange-300 border-orange-500/60 shadow-[0_0_12px_rgba(249,115,22,0.25)]'
                                : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/25 hover:text-white'
                            }`}
                            style={{ padding: '7px 13px' }}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Feedback & Feature Requests <span className="text-orange-400">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea
                        rows={3}
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        placeholder="What interview topics, languages, or placement challenges would you like Vabsgen AI to help you solve?"
                        className={`w-full rounded-xl bg-black/50 border text-white text-sm outline-none transition-all placeholder:text-stone-600 resize-none ${
                          errors.feedback ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-orange-500'
                        }`}
                        style={{ padding: '12px 14px 12px 40px' }}
                      />
                    </div>
                    {errors.feedback && <p className="text-red-400 text-xs mt-1">{errors.feedback}</p>}
                  </div>

                  {/* Recommend Radio */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />
                      Would you recommend Vabsgen to classmates?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['Yes, definitely!', 'Maybe / Needs time', 'Not yet'].map((opt) => (
                        <label
                          key={opt}
                          className={`rounded-xl border cursor-pointer text-xs font-medium flex items-center gap-2 transition-all ${
                            formData.recommend === opt
                              ? 'bg-orange-500/15 border-orange-500/50 text-white'
                              : 'bg-black/40 border-white/10 text-stone-400 hover:text-white'
                          }`}
                          style={{ padding: '10px 14px' }}
                        >
                          <input
                            type="radio"
                            name="recommend"
                            value={opt}
                            checked={formData.recommend === opt}
                            onChange={() => setFormData({ ...formData, recommend: opt })}
                            className="accent-orange-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white border border-white/10 text-sm font-semibold transition-all cursor-pointer"
                    style={{ padding: '13px 22px' }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-[0_4px_24px_rgba(249,115,22,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ padding: '13px 28px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Student Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

