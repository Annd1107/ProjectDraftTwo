import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Users, Mail, School } from "lucide-react";

import { getRegistrations } from "../lib/tournament-api";
import { getStudents, Student } from "../services/studentService";

interface Registration {
  student_id: string;
  olympiad_id: string;
}

export function RegisteredStudents() {
  const { id } = useParams();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // registrations
        const registrations: Registration[] =
          await getRegistrations();

        const filtered = registrations.filter(
          (r) => r.olympiad_id === id
        );

        const studentIds = filtered.map((r) => r.student_id);

        // all students
        const allStudents = await getStudents();

        // registered students only
        const registeredStudents = allStudents.filter((s) =>
          studentIds.includes(s.id)
        );

        setStudents(registeredStudents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/organizer"
            className="inline-flex items-center gap-2 text-violet-600 hover:underline mb-4"
          >
            <ArrowLeft className="size-4" />
            Буцах
          </Link>

          <div className="flex items-center gap-3">
            <Users className="size-8 text-violet-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Бүртгүүлсэн сурагчид
            </h1>
          </div>

          <p className="text-gray-500 mt-2">
            Нийт: {students.length} сурагч
          </p>
        </div>

        {/* Students */}
        {students.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center">
            <Users className="size-16 mx-auto text-gray-300 mb-4" />

            <p className="text-gray-500">
              Бүртгүүлсэн сурагч алга байна
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-violet-100 dark:border-violet-900 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {student.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      ID: {student.id}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {student.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="size-4" />
                      {student.email}
                    </div>
                  )}

                  {student.school && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <School className="size-4" />
                      {student.school}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}