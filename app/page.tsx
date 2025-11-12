'use client';

import { useState } from 'react';
import { submitTicket } from '@/lib/ticket';

interface TicketFormData {
  email: string;
  title: string;
  description: string;
}

interface TicketResponse {
  statusCode: number;
  data: {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    createdDate: string;
    modifiedDate: string;
  };
}

export default function Home() {
  const [formData, setFormData] = useState<TicketFormData>({
    email: '',
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketData, setTicketData] = useState<TicketResponse['data'] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await submitTicket(formData);

      if (response.statusCode === 1) {
        setSubmitSuccess(true);
        setTicketData(response.data);
        setFormData({ email: '', title: '', description: '' });
      } else {
        setSubmitError('提交失敗，請稍後再試');
      }
    } catch (error) {
      setSubmitError('提交失敗，請檢查網路連線');
      console.error('Error submitting ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">鼠定闖關客服支援</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              我們隨時為您提供協助，請填寫以下表單
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && ticketData && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">提交成功！</h3>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                    您的客服單已成功建立，我們會盡快處理
                  </p>
                  <div className="mt-3 rounded-md bg-white p-3 dark:bg-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">工單編號：</span>
                      <span className="font-mono">{ticketData.id}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-800 dark:bg-red-900/20">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="ml-3 text-sm text-red-700 dark:text-red-300">{submitError}</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  電子郵件 <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  問題類型 <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <select
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-10 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400 appearance-none"
                  >
                    <option value="">請選擇問題類型</option>
                    <option value="帳號相關問題">帳號相關問題</option>
                    <option value="儲值與交易問題">儲值與交易問題</option>
                    <option value="遊戲BUG回報">遊戲BUG回報</option>
                    <option value="活動與獎勵問題">活動與獎勵問題</option>
                    <option value="遊戲內容諮詢">遊戲內容諮詢</option>
                    <option value="遊戲平衡與建議">遊戲平衡與建議</option>
                    <option value="封禁與檢舉">封禁與檢舉</option>
                    <option value="技術支援問題">技術支援問題</option>
                    <option value="其他">其他</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  詳細內容 <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    placeholder="請詳細描述您遇到的問題，包含錯誤訊息、發生時間等資訊..."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  請盡可能提供詳細資訊，以便我們更快為您解決問題
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      提交中...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      提交客服表單
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <svg className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              常見問題
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                <span>我們會在 24 小時內回覆您的問題</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                <span>請確保提供正確的電子郵件地址以便我們聯繫您</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
