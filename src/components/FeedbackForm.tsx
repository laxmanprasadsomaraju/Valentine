import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, Loader2 } from 'lucide-react';
import { submitFeedback } from '../lib/supabaseClient';

export function FeedbackForm() {
    const [step, setStep] = useState<'initial' | 'details' | 'success'>('initial');
    const [liked, setLiked] = useState<boolean | null>(null);
    const [wantFull, setWantFull] = useState<boolean | null>(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLike = (isLiked: boolean) => {
        setLiked(isLiked);
        setStep('details');
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await submitFeedback({
                liked: liked === true,
                want_full_version: wantFull === true,
                comment
            });
            setStep('success');
        } catch (e) {
            console.error(e);
            // Even if error, show success to user
            setStep('success');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (step === 'success') {
        return (
            <div className="lovelink-card p-6 text-center bg-[#FDF8F6] border border-[#E8DED5] max-w-sm mx-auto mt-8">
                <div className="w-12 h-12 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-[#D56A6A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2B1E1A] mb-1">Thank you!</h3>
                <p className="text-[#7A6B63] text-sm">Your feedback helps me build better things.</p>
            </div>
        );
    }

    return (
        <div className="lovelink-card p-6 bg-white/80 backdrop-blur-sm border border-[#E8DED5] max-w-sm mx-auto mt-8">
            {step === 'initial' ? (
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#2B1E1A] mb-4">Did you enjoy using LoveLink?</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleLike(true)}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[#D56A6A]/5 transition-all group w-24 border border-transparent hover:border-[#D56A6A]/20"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <ThumbsUp className="w-6 h-6 text-[#2E7D32]" />
                            </div>
                            <span className="text-sm font-medium text-[#2B1E1A]">Yes!</span>
                        </button>
                        <button
                            onClick={() => handleLike(false)}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[#D56A6A]/5 transition-all group w-24 border border-transparent hover:border-[#D56A6A]/20"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#FFEBEE] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <ThumbsDown className="w-6 h-6 text-[#C62828]" />
                            </div>
                            <span className="text-sm font-medium text-[#2B1E1A]">Not really</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center animate-fade-in">
                    <h3 className="text-lg font-semibold text-[#2B1E1A] mb-2">Quick Question</h3>
                    <p className="text-[#7A6B63] text-sm mb-6">
                        Would you like a full version with more templates (kids, family, birthdays)?
                    </p>

                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            onClick={() => setWantFull(true)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${wantFull === true
                                ? 'bg-[#D56A6A] text-white border-[#D56A6A] shadow-md'
                                : 'bg-white text-[#7A6B63] border-[#E8DED5] hover:border-[#D56A6A] hover:text-[#D56A6A]'
                                }`}
                        >
                            Yes, please!
                        </button>
                        <button
                            onClick={() => setWantFull(false)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${wantFull === false
                                ? 'bg-[#2B1E1A] text-white border-[#2B1E1A] shadow-md'
                                : 'bg-white text-[#7A6B63] border-[#E8DED5] hover:border-[#2B1E1A] hover:text-[#2B1E1A]'
                                }`}
                        >
                            No thanks
                        </button>
                    </div>

                    <div className="mb-4">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Any other thoughts? (Optional)"
                            className="w-full text-sm p-3 rounded-lg border border-[#E8DED5] focus:outline-none focus:ring-1 focus:ring-[#D56A6A] min-h-[80px]"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || wantFull === null}
                        className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                    </button>
                </div>
            )}
        </div>
    );
}
