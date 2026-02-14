import React, { useState } from 'react';
import { X, Loader2, Send } from 'lucide-react';
import { submitFeedback } from '../lib/supabaseClient';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState(''); // Optional
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        try {
            // Append email to comment if provided
            const fullComment = email ? `[Email: ${email}]\n\n${comment}` : comment;

            await submitFeedback({
                comment: fullComment,
                // Using generic feedback type
                liked: undefined,
                want_full_version: undefined
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setComment('');
                setEmail('');
            }, 2000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#FDF8F6] rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-scale-in border border-[#E8DED5]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#7A6B63] hover:text-[#2B1E1A] transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {success ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                            <Send className="w-6 h-6 text-[#2E7D32]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2B1E1A] mb-2">Thank you!</h3>
                        <p className="text-[#7A6B63]">Your feedback has been sent.</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-semibold text-[#2B1E1A] mb-1">Send Feedback</h3>
                        <p className="text-sm text-[#7A6B63] mb-6">
                            Have a suggestion or found a bug? Let me know!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2B1E1A] mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell me what you think..."
                                    className="w-full h-32 lovelink-input resize-none p-3 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2B1E1A] mb-1">
                                    Email (optional)
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="If you'd like a reply"
                                    className="w-full lovelink-input p-3 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !comment.trim()}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Feedback
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
