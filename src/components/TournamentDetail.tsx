// ======================= TOURNAMENT DETAIL (UPDATED) =======================
import { useParams, useNavigate, Link } from "react-router";
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, Building, Banknote, Award } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useOlympiads } from "../lib/tournament-context";
import { PaymentModal } from "./PaymentModal";
import { useState, useEffect } from "react";

export function TournamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, unregister, getById } = useOlympiads();

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const olympiad = getById(id || "");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!olympiad) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Тэмцээн олдсонгүй</h1>
        <Link to="/" className="text-blue-600">Нүүр хуудас руу буцах</Link>
      </div>
    );
  }

  const isOwner = user?.role === "organizer" && user?.id === olympiad.organizer_id;

  const isRegistered = user
    ? olympiad.registrations.includes(user.id)
    : false;

  const isFull = olympiad.registered_count >= olympiad.max_participants;
  const isPast = new Date(olympiad.date) < new Date();

  const handleRegister = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user) return;
    await register(olympiad.id, user.id);
    setShowPaymentModal(false);
  };

  const handleUnregister = async () => {
    if (!user) return;
    if (confirm("Бүртгэлээ цуцлах уу?")) {
      await unregister(olympiad.id, user.id);
    }
  };

  const canInteract = user?.role === "student";

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6">
        <ArrowLeft className="size-4" />
        Буцах
      </button>

      <div className="bg-white p-8 rounded-xl border">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">{olympiad.title}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {olympiad.category}
          </span>
        </div>

        {isOwner && (
          <button
            onClick={() => navigate(`/tournament/${olympiad.id}/edit`)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            Засах (Edit)
          </button>
        )}

        {isRegistered && (
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <CheckCircle className="size-5" />
            Бүртгэлтэй
          </div>
        )}

        <p className="mt-4 text-gray-700">{olympiad.description}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="flex gap-2">
            <Calendar className="text-blue-600" />
            {new Date(olympiad.date).toLocaleDateString()}
          </div>

          <div className="flex gap-2">
            <MapPin className="text-green-600" />
            {olympiad.location}
          </div>

          <div className="flex gap-2">
            <Users className="text-purple-600" />
            {olympiad.registered_count} / {olympiad.max_participants}
          </div>

          <div className="flex gap-2">
            <Building className="text-orange-600" />
            {olympiad.organizer_name}
          </div>

          <div className="flex gap-2">
            <Banknote className="text-yellow-600" />
            {olympiad.registration_fee.toLocaleString()}₮
          </div>

          {olympiad.preparation_material && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Award className="size-4 text-violet-600" />
              <a
                href={olympiad.preparation_material.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:underline"
              >
                {olympiad.preparation_material.fileName}
              </a>
            </div>
          )}
        </div>

        {canInteract && (
          <div className="mt-6 border-t pt-6">
            {isRegistered ? (
              <button
                onClick={handleUnregister}
                className="px-6 py-2 bg-red-100 text-red-700 rounded-lg"
              >
                Бүртгэл цуцлах
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={isFull || isPast}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {isFull ? "Дүүрсэн" : isPast ? "Дууссан" : "Бүртгүүлэх"}
              </button>
            )}
          </div>
        )}
      </div>

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentSuccess}
          tournamentTitle={olympiad.title}
          fee={olympiad.registration_fee}
          olympiadId={olympiad.id}
          organizerId={olympiad.organizer_id}
        />
      )}
    </div>
  );
}
