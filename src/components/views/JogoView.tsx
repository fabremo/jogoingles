'use client'

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RotateCcw, Loader2, Volume2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CardDraggable } from '@/components/CardDraggable';

// Mantemos a interface para o TypeScript não reclamar
interface Palavra {
    id: string;
    en: string;
    pt: string;
}

const falarIngles = (texto: string) => {
    // Cancela falas anteriores para não encavalar
    window.speechSynthesis.cancel();

    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'en-US'; // Define o idioma como inglês americano
    mensagem.rate = 0.9;     // Velocidade um pouco mais lenta para facilitar o aprendizado

    window.speechSynthesis.speak(mensagem);
};

const falarFrase = (texto: string) => {
    window.speechSynthesis.cancel(); // Para áudios anteriores
    const mensagem = new SpeechSynthesisUtterance(`Can I have ${texto}`);
    mensagem.lang = 'en-US';
    mensagem.rate = 0.85; // Velocidade levemente reduzida
    window.speechSynthesis.speak(mensagem);
};

export function JogoView() {
    const containerRef = useRef(null);
    const [acertos, setAcertos] = useState<string[]>([]);
    const [estoque, setEstoque] = useState<Palavra[]>([]);
    const [palavrasEmJogo, setPalavrasEmJogo] = useState<Palavra[]>([]);

    const [listaEn, setListaEn] = useState<Palavra[]>([]);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    // const [palavrasDoBanco, setPalavrasDoBanco] = useState<Palavra[]>([]);
    const [loading, setLoading] = useState(true);

    const prepararNovaRodada = (dadosCompletos: Palavra[]) => {
        setAcertos([]); // Reseta o progresso

        // 1. Embaralha tudo
        const embaralhadas = [...dadosCompletos].sort(() => Math.random() - 0.5);

        // 2. Seleciona apenas 5
        const selecionadas = embaralhadas.slice(0, 5);

        setPalavrasEmJogo(selecionadas);

        // 3. Cria a lista da direita (alvos) também embaralhada entre as 5
        setListaEn([...selecionadas].sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        const buscarDados = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('palavras')
                    .select('*');

                if (error) throw error;

                if (data) {
                    setEstoque(data);
                    prepararNovaRodada(data);

                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        buscarDados();
    }, []);

    const checarDrop = (point: { x: number, y: number }, id: string) => {
        setDraggingId(null);
        const target = document.getElementById(`target-${id}`);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const colidiu = (
            point.x > rect.left &&
            point.x < rect.right &&
            point.y > rect.top &&
            point.y < rect.bottom
        );

        //   if (colidiu) {
        //       setAcertos((prev) => prev.includes(id) ? prev : [...prev, id]);
        //  }
        if (colidiu) {
            // 1. Achamos a palavra no nosso estado para pegar o texto em inglês
            const palavraAcertada = palavrasEmJogo.find(p => p.id === id);

            // 2. Disparamos o áudio (ex: "Can I have a coffee?")
            if (palavraAcertada) {
                falarIngles(`Can I have ${palavraAcertada.en}`);
            }

            // 3. Registramos o acerto na tela
            setAcertos((prev) => prev.includes(id) ? prev : [...prev, id]);

            //target.innerText = "Can I have " + target.innerText;
        }
    };

    // Tela de carregamento amigável
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 gap-4 px-4 text-center">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-medium">Carregando seus blocos de conversação...</p>
            </div>
        );
    }
    const jogoFinalizado = acertos.length > 0 && acertos.length === palavrasEmJogo.length;
    return (
        <div
            ref={containerRef}
            className="max-w-4xl mx-auto p-3 sm:p-6 lg:p-10 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
            <header className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-10">
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-black text-slate-800 uppercase tracking-tighter leading-tight">
                        BCE: {acertos.length} / {palavrasEmJogo.length}
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm">
                        Arraste para a tradução correta
                    </p>
                </div>

                <button
                    onClick={() => prepararNovaRodada(estoque)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                >
                    <RotateCcw size={18} />
                    {jogoFinalizado ? 'Reiniciar' : 'Embaralhar'}
                </button>
            </header>

            <div className="text-slate-800 mb-4 sm:mb-6 font-semibold italic opacity-70 text-xs sm:text-base leading-relaxed">
                Estrutura de hoje: Can I have + Complemento
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-12 items-start">
                {/* COLUNA PORTUGUÊS (Blocos que o usuário arrasta) */}
                <div className="flex flex-col gap-3 min-w-0">
                    {palavrasEmJogo.map((item) => (
                        <div key={`slot-pt-${item.id}`} className="h-12 sm:h-16 min-w-0">
                            {!acertos.includes(item.id) && (

                                <CardDraggable
                                    item={item}
                                    containerRef={containerRef}
                                    isDragging={draggingId === item.id}
                                    onDragStart={() => setDraggingId(item.id)}
                                    onDragEnd={(point) => checarDrop(point, item.id)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* COLUNA INGLÊS (Alvos) */}
                <div className="flex flex-col gap-3 min-w-0">
                    {listaEn.map((item) => {
                        const jaAcertou = acertos.includes(item.id);
                        return (
                            <div
                                key={`target-slot-${item.id}`}
                                id={`target-${item.id}`}
                                className={`
                                    flex items-center justify-center h-12 sm:h-16 w-full border-2 border-dashed rounded-xl transition-all duration-300 select-none px-2 sm:px-4 text-center text-xs sm:text-base leading-tight break-words min-w-0
                                    ${jaAcertou
                                        ? 'bg-green-500 border-green-600 text-white font-bold scale-105 shadow-sm'
                                        : 'border-slate-300 text-slate-400 bg-white'
                                    }
                                `}
                            >
                                {/* Se acertou, mostra a frase completa. Se não, mostra só o complemento */}
                                {jaAcertou ? `Can I have ${item.en}` : item.en}

                                {/* Botão de Áudio - Só aparece se acertou */}
                                {jaAcertou && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita qualquer comportamento estranho no container
                                            falarFrase(item.en);
                                        }}
                                        className="absolute -right-2 -top-2 bg-white text-green-600 p-1.5 rounded-full shadow-lg border border-green-200 hover:scale-110 active:scale-90 transition-transform"
                                        title="Ouvir pronúncia"
                                    >
                                        <Volume2 size={14} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {acertos.length > 0 && acertos.length === palavrasEmJogo.length && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-8 sm:mt-12 p-4 sm:p-6 bg-green-100 border-2 border-green-200 text-green-700 text-center rounded-2xl font-bold shadow-inner text-sm sm:text-base leading-relaxed"
                >
                    ✨ Sensacional! Você completou todas as frases!
                </motion.div>
            )}
        </div>
    );
}