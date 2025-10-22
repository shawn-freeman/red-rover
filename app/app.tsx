'use client';

import React, { useMemo, useState } from "react";
  
export default function App() {
  const [inputText, setInput ] = useState('');

  return (
    <div className="p-4">
      <h1>Red Rover Code Puzzle </h1>

      <label >
        <div className="">Input</div>
        <textarea
          value={inputText}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full h-32 border p-3"
          aria-label="field-expression"
        />
      </label>
      
    </div>
  );
}