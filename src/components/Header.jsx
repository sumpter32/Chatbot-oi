import React from 'react';

function Header({ selectedModel, models, onModelChange }) {
  console.log('Models in Header:', models); // Debug log

  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">OpenWebUI Chatbot</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Model:</span>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {!models || models.length === 0 ? (
              <option value="">Loading models...</option>
            ) : (
              models.map(model => (
                <option key={model.id || model.name} value={model.id || model.name}>
                  {model.id || model.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;