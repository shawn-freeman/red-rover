'use client';

import React, { useMemo, useState } from "react";
  
export default function App() {
  const [inputText, setInput ] = useState('(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)');

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
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2>Original Order</h2>
          <section className="border p-4">
              <div>{inputText}</div>
          </section>
        </div>        

        <div>
          <h2>Alphabetical Order</h2>
          <section className="border p-4">
              <div>{inputText}</div>
          </section>
        </div>
      </div>
    </div>
  );
}