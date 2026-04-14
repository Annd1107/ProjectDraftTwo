import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getOlympiads, updateOlympiad } from "../lib/tournament-api";
import { supabase } from "../utils/supabase";
import { useAuth } from "../lib/auth-context";

export function TournamentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [olympiad, setOlympiad] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [pdf, setPdf] = useState<File | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getOlympiads();
      const found = data.find((o: any) => o.id === id);

      if (!found) return navigate("/");

      // owner check
      if (user?.id !== found.organizer_id) {
        return navigate("/");
      }

      setOlympiad(found);

      setTitle(found.title);
      setDescription(found.description);
      setCategory(found.category);
      setDate(found.date);
      setLocation(found.location);
      setFee(found.registration_fee);
      setMaxParticipants(found.max_participants);

      setLoading(false);
    };

    load();
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let prep = olympiad.preparation_material;

   if (pdf) {
      const filePath = `materials/${Date.now()}_${pdf.name}`;

      const { error } = await supabase.storage
        .from("pdfs") // ⚠️ must match your bucket name
        .upload(filePath, pdf);

      if (error) {
        console.error("Upload error:", error.message);
        alert("File upload failed");
        return;
      }

      const { data } = supabase.storage
        .from("pdfs")
        .getPublicUrl(filePath);

      prep = {
        fileName: pdf.name,
        fileUrl: data.publicUrl,
      };
    }


    await updateOlympiad(id!, {
      title,
      description,
      category,
      date,
      location,
      registration_fee: fee,
      max_participants: maxParticipants,
      preparation_material: prep,
    });

    navigate(`/tournament/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Tournament</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2" />

        <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2" />

        <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border p-2" />

        <input type="number" value={fee} onChange={(e) => setFee(Number(e.target.value))} className="w-full border p-2" />
        <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value))} className="w-full border p-2" />

        <input type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files?.[0] || null)} />

        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}