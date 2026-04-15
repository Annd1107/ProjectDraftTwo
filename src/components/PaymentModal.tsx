import { useState } from "react";
import { X, CreditCard, Building, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../lib/auth-context";
import { updateRevenue } from "../services/organizerService"; 
import { useOlympiads } from "../lib/tournament-context";

interface PaymentModalProps {
  onClose: () => void;
  onConfirm: () => void;
  tournamentTitle: string;
  fee: number;
  olympiadId: string;
  organizerId: string;
}

export function PaymentModal({ onClose, onConfirm, tournamentTitle, fee, olympiadId, organizerId }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qpay">("qpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const {register} = useOlympiads();

  const handlePayment = async () => {
  if (!user) return;

  setIsProcessing(true);

  try {
    // simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // ✅ 2. insert payment
    const { error } = await supabase.from("payment").insert({
       id: Math.random().toString(36).substr(2, 9),
      student_id: user.id,
      olympiad_id: olympiadId,
      total_fee: fee,
      paid_date: new Date().toISOString(),
      OrganizerId: organizerId,
      payment_method: paymentMethod,
      status: "paid",
    });
    await updateRevenue(organizerId, fee);

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onConfirm(); // optional UI refresh
    }, 1200);

  } catch (err) {
    console.error(err);
    alert("Төлбөр хийхэд алдаа гарлаа");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Төлбөр төлөх
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {tournamentTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Бүртгэлийн хураамж</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                {fee.toLocaleString()}₮
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-3 font-semibold">
                Төлбөрийн хэрэгсэл сонгох
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("qpay")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "qpay"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 shadow-md"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <Building className="size-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">QPay</div>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 shadow-md"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <CreditCard className="size-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Карт</div>
                </button>
              </div>
            </div>

            {paymentMethod === "qpay" && (
              <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  QPay-ээр төлбөр төлсний дараа бүртгэл баталгаажна.
                </p>
                <div className="flex justify-center">
                  <img
                    src={"src/assets/qpay-qr.png"}
                    alt="QPay QR Code"
                    className="w-48 h-48 border-4 border-white dark:border-gray-600 rounded-xl shadow-lg"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Картын мэдээллээ оруулснаар аюулгүй төлбөр төлөх боломжтой.
                  Виза болон Мастеркарт картуудыг дэмждэг.
                </p>
              </div>
            )}

            {/* Warning */}
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl flex items-start gap-3">
              <AlertCircle className="size-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Анхааруулга:</strong> Энэ нь туршилтын төлбөр юм.
                Бодит төлбөр авахгүй бөгөөд "Төлбөр төлөх" товч дарснаар
                бүртгэл баталгаажна.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isProcessing ? "Төлж байна..." : "Төлбөр төлөх"}
              </button>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-6 py-3.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50 font-semibold"
              >
                Цуцлах
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center size-20 bg-green-100 dark:bg-green-900/50 rounded-full mx-auto mb-6">
              <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Амжилттай!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Төлбөр амжилттай төлөгдлөө.
              <br />
              Бүртгэл баталгаажлаа.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}