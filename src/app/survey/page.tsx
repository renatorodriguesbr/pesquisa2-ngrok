"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function SurveyPage() {
  const [liked, setLiked] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [word, setWord] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (liked === null || rating === null || !word.trim()) return;
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          liked,
          rating,
          word
        })
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Obrigado!</h1>
          <p className="text-slate-600 font-medium">Suas respostas foram registradas com sucesso e já estão no painel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 border-b pb-4">Pesquisa de Satisfação</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Question 1 */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-slate-700">1. Você gostou da agenda?</label>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => setLiked(true)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${liked === true ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-200'}`}
              >
                Sim
              </button>
              <button 
                type="button" 
                onClick={() => setLiked(false)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${liked === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-red-200'}`}
              >
                Não
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-slate-700">2. Qual sua satisfação sobre a agenda?</label>
            <p className="text-sm text-slate-500 leading-none">De 1 a 5, sendo 5 a nota máxima.</p>
            <div className="flex justify-between gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all flex items-center justify-center
                    ${rating === num ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-200' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-slate-700">3. Diga uma palavra que mais representa o tema:</label>
            <input 
              type="text" 
              maxLength={20}
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Digite até 20 caracteres"
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-700 font-medium"
            />
            <p className="text-right text-xs text-slate-400 font-medium">
              {word.length}/20
            </p>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={liked === null || rating === null || !word.trim() || loading}
            className="w-full py-4 mt-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center"
          >
            {loading ? "Enviando..." : "Confirmar e Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
