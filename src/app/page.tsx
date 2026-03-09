"use client";

import { useEffect, useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";

// WordCloud needs to be run client-side to avoid hydration mismatch with window/document
const WordCloud = dynamic(() => import("@/components/WordCloud"), { ssr: false });

type SurveyData = {
  id: string;
  liked: boolean;
  rating: number;
  word: string;
};

const COLORS = ['#3b82f6', '#ef4444']; // Blue for Yes, Red for No

export default function DashboardPage() {
  const [data, setData] = useState<SurveyData[]>([]);
  
  // Custom Ngrok State
  const [ngrokUrl, setNgrokUrl] = useState("");
  const [surveyUrl, setSurveyUrl] = useState("");

  useEffect(() => {
    // Polling function to get real-time results
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/results");
        if (res.ok) {
          const results = await res.json();
          setData(results);
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
      }
    };

    fetchResults(); // initial fetch
    const interval = setInterval(fetchResults, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Effect to update the Survey URL (QR Code payload) when ngrokUrl changes
  useEffect(() => {
    if (ngrokUrl) {
      // Clean up the URL in case the user pasted with a trailing slash
      const cleanUrl = ngrokUrl.trim().replace(/\/$/, "");
      setSurveyUrl(`${cleanUrl}/survey`);
    } else if (typeof window !== "undefined") {
      setSurveyUrl(`${window.location.protocol}//${window.location.host}/survey`);
    }
  }, [ngrokUrl]);

  // Aggregating data for liked (Sim/Não)
  const likedData = useMemo(() => {
    let yes = 0, no = 0;
    data.forEach(item => item.liked ? yes++ : no++);
    return [
      { name: 'Sim', value: yes },
      { name: 'Não', value: no },
    ];
  }, [data]);

  // Aggregating data for rating (1 to 5)
  const ratingData = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach(item => {
      if (counts[item.rating as keyof typeof counts] !== undefined) {
        counts[item.rating as keyof typeof counts]++;
      }
    });
    return [
      { rating: '1 Estrela', count: counts[1] },
      { rating: '2 Estrelas', count: counts[2] },
      { rating: '3 Estrelas', count: counts[3] },
      { rating: '4 Estrelas', count: counts[4] },
      { rating: '5 Estrelas', count: counts[5] },
    ];
  }, [data]);

  // Aggregating data for word cloud
  const wordData = useMemo(() => {
    const wordCounts: Record<string, number> = {};
    data.forEach(item => {
      if (item.word) {
        const word = item.word.toLowerCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    return Object.entries(wordCounts).map(([text, value]) => ({
      text,
      value: value * 10 // Multiplier to make differences more visible in wordcloud
    }));
  }, [data]);

  const totalVotes = data.length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 rounded-2xl shadow-sm gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Painel de Satisfação</h1>
            <p className="text-slate-500 mt-2 text-lg">Acompanhe os resultados em tempo real ({totalVotes} respostas)</p>
            
            <div className="mt-6 max-w-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cole sua URL Pública (Ngrok):</label>
              <input
                type="text"
                placeholder="Ex: https://1234.ngrok-free.app"
                value={ngrokUrl}
                onChange={(e) => setNgrokUrl(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full lg:w-auto">
            <div className="text-right flex-1">
              <p className="font-bold text-slate-800">Participe agora!</p>
              <p className="text-sm text-slate-500">Leia o QR Code ou acesse:</p>
              <a href={surveyUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                {surveyUrl}
              </a>
            </div>
            {surveyUrl && (
              <div className="bg-white p-2 rounded-lg shadow-sm border shrink-0">
                <QRCodeSVG value={surveyUrl} size={110} />
              </div>
            )}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Liked Chart (Sim/Não) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-6">1. Você gostou da agenda?</h2>
            {totalVotes > 0 ? (
              <div className="font-bold flex-1 max-h-80">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={likedData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {likedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} votos`, 'Quantidade']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
             <div className="flex-1 flex items-center justify-center text-slate-400">Aguardando respostas...</div> 
            )}
          </div>

          {/* Rating Chart (1 a 5) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-6">2. Nível de Satisfação</h2>
            {totalVotes > 0 ? (
               <div className="font-bold flex-1 max-h-80">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="rating" />
                    <YAxis allowDecimals={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} formatter={(value) => [`${value} votos`, 'Quantidade']} />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
               </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">Aguardando respostas...</div>
            )}
          </div>

          {/* Word Cloud */}
          <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 lg:col-span-2 flex flex-col min-h-[400px]">
            <h2 className="text-xl font-bold text-slate-800 mb-6">3. Palavras mais representativas</h2>
            <div className="flex-1 flex items-center justify-center">
              {totalVotes > 0 ? (
                <WordCloud words={wordData} />
              ) : (
                <div className="text-slate-400">Aguardando respostas...</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
