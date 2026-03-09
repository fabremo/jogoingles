'use client'

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react'; // Ícone para o botão

const PALAVRAS = [
    { id: '1', pt: "Pai", en: "Father" },
    { id: '2', pt: "Mãe", en: "Mother" },
    { id: '3', pt: "Carro", en: "Car" },
    { id: '4', pt: "Amarelo", en: "Yellow" },
    { id: '5', pt: "Bola", en: "Ball" },
    { id: '6', pt: "Estranho", en: "Weird" },
    { id: '7', pt: "Saia", en: "Skirt" },
    { id: '8', pt: "Hoje", en: "Today" },
    { id: '9', pt: "Casa", en: "House" },
    { id: '10', pt: "Livro", en: "Book" },
];

export function JogoView() {
    const containerRef = useRef(null);
    const [acertos, setAcertos] = useState<string[]>([]);
    const [listaEn, setListaEn] = useState<typeof PALAVRAS>([]);

    // Função isolada para embaralhar
    const embaralhar = () => {
        setAcertos([]); // Limpa os acertos
        setListaEn([...PALAVRAS].sort(() => Math.random() - 0.5));
    };

    // Embaralha ao carregar o componente pela primeira vez
    useEffect(() => {
        embaralhar();
    }, []);

    const checarDrop = (point: { x: number, y: number }, id: string) => {
        const target = document.getElementById(`target-${id}`);
        if (!target) return;

        const rect = target.getBoundingClientRect();

        const colidiu = (
            point.x > rect.left &&
            point.x < rect.right &&
            point.y > rect.top &&
            point.y < rect.bottom
        );

        if (colidiu) {
            setAcertos((prev) => {
                if (prev.includes(id)) return prev;
                return [...prev, id];
            });
        }
    };

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto p-10 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
                        Vocabulário: {acertos.length} / {PALAVRAS.length}
                    </h2>
                    <p className="text-slate-500 text-sm">Arraste para a tradução correta</p>
                </div>

                {/* Botão de Reiniciar */}
                <button
                    onClick={embaralhar}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                >
                    <RotateCcw size={18} />
                    Reiniciar
                </button>
            </header>

            <div className="grid grid-cols-2 gap-12">

                {/* COLUNA PORTUGUÊS */}
                <div className="flex flex-col gap-3">
                    {PALAVRAS.map((item) => (
                        <div key={`slot-pt-${item.id}`} className="h-14">
                            {!acertos.includes(item.id) && (
                                <motion.div
                                    drag
                                    dragConstraints={containerRef}
                                    dragMomentum={false}
                                    onDragEnd={(_, info) => checarDrop(info.point, item.id)}
                                    whileTap={{ cursor: "grabbing", scale: 1.05 }}
                                    className="flex items-center justify-center h-full bg-blue-600 text-white font-bold rounded-xl cursor-grab shadow-md select-none"
                                >
                                    {item.pt}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* COLUNA INGLÊS */}
                <div className="flex flex-col gap-3">
                    {listaEn.map((item) => {
                        const jaAcertou = acertos.includes(item.id);
                        return (
                            <div
                                key={`target-slot-${item.id}`}
                                id={`target-${item.id}`}
                                className={`
                                    flex items-center justify-center h-14 border-2 border-dashed rounded-xl transition-all duration-300 select-none
                                    ${jaAcertou
                                        ? 'bg-green-500 border-green-600 text-white font-bold scale-105 shadow-sm'
                                        : 'border-slate-300 text-slate-400 bg-white'
                                    }
                                `}
                            >
                                {item.en}
                            </div>
                        );
                    })}
                </div>
            </div>

            {acertos.length === PALAVRAS.length && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-12 p-6 bg-green-100 border-2 border-green-200 text-green-700 text-center rounded-2xl font-bold"
                >
                    ✨ Parabéns! Você dominou todas as palavras!
                </motion.div>
            )}
        </div>
    );
}