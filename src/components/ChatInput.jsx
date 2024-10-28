import React from 'react';
import { FiSend } from 'react-icons/fi';

function ChatInput({ input, setInput, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiSend className="w-5 h-5" />
      </button>
    </form>
  );
}

export default ChatInput;