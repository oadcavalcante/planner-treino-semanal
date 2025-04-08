"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const treinoSemana = [
  {
    dia: "Segunda",
    grupoMuscular: "Peito e tríceps",
    sequencia: [
      { exercicio: "Supino reto com barra", reps: "4x8" },
      { exercicio: "Supino inclinado com halteres", reps: "3x10" },
      { exercicio: "Crucifixo na máquina (peck deck)", reps: "3x12" },
      { exercicio: "Tríceps na polia (corda)", reps: "3x12" },
      { exercicio: "Tríceps testa com halteres", reps: "3x10" },
    ],
  },
  {
    dia: "Terça",
    grupoMuscular: "Costas e bíceps",
    sequencia: [
      { exercicio: "Levantamento terra", reps: "4x6" },
      { exercicio: "Puxada na frente (pegada aberta)", reps: "3x10" },
      { exercicio: "Remada curvada com barra", reps: "3x8" },
      { exercicio: "Rosca direta com barra", reps: "3x12" },
      { exercicio: "Rosca martelo com halteres", reps: "3x10" },
    ],
  },
  {
    dia: "Quarta",
    grupoMuscular: "Pernas e panturrilhas",
    sequencia: [
      { exercicio: "Agachamento livre", reps: "4x8" },
      { exercicio: "Leg press", reps: "3x10" },
      { exercicio: "Cadeira extensora", reps: "3x12" },
      { exercicio: "Mesa flexora", reps: "3x12" },
      { exercicio: "Elevação de panturrilha em pé", reps: "3x15" },
    ],
  },
  {
    dia: "Quinta",
    grupoMuscular: "Ombros e abdominais",
    sequencia: [
      { exercicio: "Desenvolvimento com barra (militar)", reps: "4x8" },
      { exercicio: "Elevação lateral com halteres", reps: "3x12" },
      { exercicio: "Elevação frontal com halteres", reps: "3x12" },
      { exercicio: "Abdominal prancha", reps: "3x45s" },
      { exercicio: "Elevação de pernas (na barra)", reps: "3x15" },
    ],
  },
  {
    dia: "Sexta",
    grupoMuscular: "Corpo inteiro (foco em força)",
    sequencia: [
      { exercicio: "Supino reto com barra", reps: "4x6" },
      { exercicio: "Remada curvada com barra", reps: "4x6" },
      { exercicio: "Agachamento livre", reps: "4x6" },
      { exercicio: "Desenvolvimento com halteres", reps: "3x8" },
      { exercicio: "Rosca direta com barra", reps: "3x10" },
    ],
  },
  {
    dia: "Sábado",
    grupoMuscular: "Hipertrofia geral e core",
    sequencia: [
      { exercicio: "Supino inclinado com halteres", reps: "3x10" },
      { exercicio: "Puxada na frente (pegada fechada)", reps: "3x10" },
      { exercicio: "Elevação lateral com halteres", reps: "3x12" },
      { exercicio: "Rosca martelo com halteres", reps: "3x12" },
      { exercicio: "Abdominal prancha lateral", reps: "3x30s" },
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
              <CardContent className="p-5 sm:p-6 pt-7 sm:pt-1">
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
