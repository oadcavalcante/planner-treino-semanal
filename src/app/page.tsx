"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/header";

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

export default function Home() {
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});

  // Carregar estados do localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem("completedExercises");
    const savedDays = localStorage.getItem("completedDays");
    if (savedExercises) {
      setCompletedExercises(JSON.parse(savedExercises));
    }
    if (savedDays) {
      setCompletedDays(JSON.parse(savedDays));
    }
  }, []);

  // Salvar estados no localStorage
  useEffect(() => {
    localStorage.setItem("completedExercises", JSON.stringify(completedExercises));
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
  }, [completedExercises, completedDays]);

  // Verificar se todos os exercícios de um dia estão concluídos
  useEffect(() => {
    treinoSemana.forEach((treino) => {
      if (treino.sequencia.length > 0) {
        const allCompleted = treino.sequencia.every((_, idx) => completedExercises[`${treino.dia}-${idx}`]);
        if (allCompleted && !completedDays[treino.dia]) {
          setCompletedDays((prev) => ({ ...prev, [treino.dia]: true }));
        } else if (!allCompleted && completedDays[treino.dia]) {
          setCompletedDays((prev) => ({ ...prev, [treino.dia]: false }));
        }
      }
    });
  }, [completedExercises, completedDays]);

  const toggleExercise = (dia: string, index: number) => {
    setCompletedExercises((prev: Record<string, boolean>) => ({
      ...prev,
      [`${dia}-${index}`]: !prev[`${dia}-${index}`],
    }));
  };

  const toggleDay = (dia: string) => {
    setCompletedDays((prev) => {
      const newState = { ...prev, [dia]: !prev[dia] };
      if (newState[dia]) {
        // Marcar todos os exercícios do dia como concluídos
        treinoSemana
          .find((treino) => treino.dia === dia)
          ?.sequencia.forEach((_, idx) => {
            setCompletedExercises((prevEx) => ({
              ...prevEx,
              [`${dia}-${idx}`]: true,
            }));
          });
      } else {
        // Desmarcar todos os exercícios do dia
        treinoSemana
          .find((treino) => treino.dia === dia)
          ?.sequencia.forEach((_, idx) => {
            setCompletedExercises((prevEx) => ({
              ...prevEx,
              [`${dia}-${idx}`]: false,
            }));
          });
      }
      return newState;
    });
  };

  const resetDay = (dia: string) => {
    setCompletedExercises((prev) => {
      const newState = { ...prev };
      const treino = treinoSemana.find((treino) => treino.dia === dia);
      if (treino) {
        treino.sequencia.forEach((_, idx) => {
          delete newState[`${dia}-${idx}` as keyof typeof newState];
        });
      }
      return newState;
    });
    setCompletedDays((prev) => ({ ...prev, [dia]: false }));
  };

  return (
    <main className="p-2 sm:p-4 h-screen flex flex-col items-center justify-center overflow-y-auto">
      <Header />
      <Tabs defaultValue="Segunda" className="w-full max-w-sm sm:max-w-4xl flex-1 flex flex-col">
        <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-2 bg-transparent p-0 w-full">
          {treinoSemana.map((treino) => (
            <TabsTrigger
              key={treino.dia}
              value={treino.dia}
              className="flex-grow text-blue-800 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg border border-blue-200 bg-white data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500 data-[state=active]:shadow-md hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
            >
              <span className="block sm:hidden">{treino.dia.split("-")[0].slice(0, 3)}</span>
              <span className="hidden sm:block">{treino.dia}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {treinoSemana.map((treino) => (
          <TabsContent key={treino.dia} value={treino.dia} className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{
                backgroundColor: completedDays[treino.dia] ? "#d1fae5" : "rgba(255, 255, 255, 0)",
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              <Card className="bg-gradient-to-r from-blue-200 to-blue-300 border-blue-400 shadow-xl text-center min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
                <CardContent className="p-3 sm:p-4 pt-5 sm:pt-1">
                  <h2 className="text-base sm:text-lg text-blue-900 mb-2 sm:mb-3">
                    <span className="font-bold">Grupo Muscular:</span> {treino.grupoMuscular}
                  </h2>
                  {treino.sequencia.length > 0 ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Checkbox
                          id={`day-${treino.dia}`}
                          checked={completedDays[treino.dia] || false}
                          onCheckedChange={() => toggleDay(treino.dia)}
                          className="border-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label
                          htmlFor={`day-${treino.dia}`}
                          className="text-blue-800 font-semibold text-sm sm:text-base"
                        >
                          Dia concluído
                        </label>
                        {completedDays[treino.dia] && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </motion.div>
                        )}
                      </div>
                      <ul className="space-y-2 sm:space-y-3">
                        {treino.sequencia.map((ex, idx) => (
                          <motion.li
                            key={idx}
                            className="flex flex-row justify-between items-center p-3 sm:p-4 bg-white rounded-lg border border-blue-200 shadow-sm"
                            initial={{ opacity: 1 }}
                            animate={{
                              opacity: completedExercises[`${treino.dia}-${idx}`] ? 0.7 : 1,
                              backgroundColor: completedExercises[`${treino.dia}-${idx}`] ? "#e6f3ff" : "#ffffff",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Checkbox
                                id={`${treino.dia}-${idx}`}
                                checked={completedExercises[`${treino.dia}-${idx}`] || false}
                                onCheckedChange={() => toggleExercise(treino.dia, idx)}
                                className="border-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              />
                              <label
                                htmlFor={`${treino.dia}-${idx}`}
                                className={`text-blue-800 font-semibold text-xs sm:text-sm truncate ${
                                  completedExercises[`${treino.dia}-${idx}`] ? "line-through" : ""
                                }`}
                              >
                                {ex.exercicio}
                              </label>
                            </div>
                            <Badge className="bg-blue-500 text-white text-xs sm:text-sm flex-shrink-0">{ex.reps}</Badge>
                          </motion.li>
                        ))}
                      </ul>
                      <button
                        onClick={() => resetDay(treino.dia)}
                        className="mt-2 text-blue-600 underline text-xs sm:text-sm hover:text-blue-800"
                      >
                        Resetar dia
                      </button>
                    </>
                  ) : (
                    <p className="text-blue-700 italic text-sm sm:text-base font-medium">Dia de descanso 💤</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}