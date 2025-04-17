'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="w-full max-w-4xl mx-auto mb-4 sm:mb-6">
      <Card className="bg-gradient-to-r from-red-800 to-red-600 border-amber-900 shadow-2xl">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Planner de Treino
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg text-blue-200 italic">
                @oadcavalcante
              </span>
              <motion.span
                className="text-xl sm:text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                💪
              </motion.span>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
