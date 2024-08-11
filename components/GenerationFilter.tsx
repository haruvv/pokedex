'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface GenerationFilterProps {
  generations: { id: number; name: string }[];
  selectedGeneration: number | null;
  onGenerationChange: (generationId: number | null) => void;
}

const GenerationFilter: React.FC<GenerationFilterProps> = ({
  generations,
  selectedGeneration,
  onGenerationChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (generationId: number | null) => {
    onGenerationChange(generationId);
    setIsOpen(false);
  };

  const selectedName = selectedGeneration
    ? generations.find((gen) => gen.id === selectedGeneration)?.name
    : 'All Generations';

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className="block truncate">{selectedName}</span>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div
            onClick={() => handleSelect(null)}
            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white ${
              selectedGeneration === null ? 'bg-indigo-600 text-white' : 'text-gray-900'
            }`}
          >
            All Generations
          </div>
          {generations.map((generation) => (
            <div
              key={generation.id}
              onClick={() => handleSelect(generation.id)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white ${
                selectedGeneration === generation.id ? 'bg-indigo-600 text-white' : 'text-gray-900'
              }`}
            >
              {generation.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerationFilter;
