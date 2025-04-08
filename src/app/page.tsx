"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const treinoSemana = [
  {
    dia: "Segunda",
    grupoMuscular: "Peito e tríceps",
    sequencia: [
      { exercicio: "Supino reto", reps: "4x10" },
      { exercicio: "Supino inclinado com halteres", reps: "3x12" },
      { exercicio: "Crossover", reps: "3x15" },
      { exercicio: "Tríceps na polia", reps: "4x12" },
    ],
  },
  {
    dia: "Terça",
    grupoMuscular: "Costas e bíceps",
    sequencia: [
      { exercicio: "Puxada na frente", reps: "4x10" },
      { exercicio: "Remada curvada", reps: "3x12" },
      { exercicio: "Pulldown unilateral", reps: "3x15" },
      { exercicio: "Rosca direta", reps: "4x12" },
    ],
  },
  {
    dia: "Quarta",
    grupoMuscular: "Pernas",
    sequencia: [
      { exercicio: "Agachamento livre", reps: "4x8" },
      { exercicio: "Leg press", reps: "4x12" },
      { exercicio: "Cadeira extensora", reps: "3x15" },
      { exercicio: "Flexora", reps: "3x15" },
    ],
  },
  {
    dia: "Quinta",
    grupoMuscular: "Ombros",
    sequencia: [
      { exercicio: "Desenvolvimento com halteres", reps: "4x10" },
      { exercicio: "Elevação lateral", reps: "3x12" },
      { exercicio: "Remada alta", reps: "3x12" },
      { exercicio: "Crucifixo invertido", reps: "3x15" },
    ],
  },
  {
    dia: "Sexta",
    grupoMuscular: "Peito e tríceps (leve)",
    sequencia: [
      { exercicio: "Supino reto com halteres", reps: "3x12" },
      { exercicio: "Peck deck", reps: "3x15" },
      { exercicio: "Tríceps francês", reps: "3x12" },
    ],
  },
  {
    dia: "Sábado",
    grupoMuscular: "Cardio e core",
    sequencia: [
      { exercicio: "Abdominal prancha", reps: "3x 1min" },
      { exercicio: "Corrida leve", reps: "30 min" },
      { exercicio: "Elevação de pernas", reps: "3x20" },
    ],
  },
  {
    dia: "Domingo",
    grupoMuscular: "Descanso",
    sequencia: [],
  },
];

export default function PlannerPage() {
  return (
    <main className="p-4 sm:p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl font-bold text-blue-800 mb-8 sm:mb-10 text-center max-w-sm sm:max-w-2xl">
        Planner de treino semanal @oadcavalcante 💪
      </h1>

      <Tabs defaultValue="Segunda" className="w-full max-w-sm sm:max-w-4xl">
        <TabsList className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-4 bg-transparent p-0 w-full">
          {treinoSemana.map((treino) => (
            <TabsTrigger
              key={treino.dia}
              value={treino.dia}
              className={`flex-grow text-blue-800 text-sm sm:text-base font-semibold px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-blue-200 bg-white data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500 data-[state=active]:shadow-md hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 ${
                treino.dia === "Sábado" || treino.dia === "Domingo" ? "mb-8 sm:mb-0" : ""
              }`}
            >
              <span className="block sm:hidden">{treino.dia.split("-")[0].slice(0, 3)}</span>
              <span className="hidden sm:block">{treino.dia}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {treinoSemana.map((treino) => (
          <TabsContent key={treino.dia} value={treino.dia}>
            <Card className="bg-gradient-to-r from-blue-200 to-blue-300 border-blue-400 shadow-xl text-center">
              <CardContent className="p-5 sm:p-6 pt-7 sm:pt-8">
                <h2 className="text-lg sm:text-xl text-blue-900 mb-4 sm:mb-5">
                  <span className="font-bold">Grupo Muscular:</span> {treino.grupoMuscular}
                </h2>
                {treino.sequencia.length > 0 ? (
                  <ul className="space-y-4 sm:space-y-5">
                    {treino.sequencia.map((ex, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 bg-white rounded-lg border border-blue-200 shadow-sm gap-2"
                      >
                        <span className="text-blue-800 font-semibold text-sm sm:text-base">{ex.exercicio}</span>
                        <Badge className="bg-blue-500 text-white text-xs sm:text-sm">{ex.reps}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-blue-700 italic text-base sm:text-lg font-medium">Dia de descanso 💤</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
