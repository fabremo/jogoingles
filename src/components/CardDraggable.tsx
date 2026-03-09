'use client'

import { motion } from 'framer-motion';

// Você define aqui mesmo!
interface Palavra {
    id: string;
    en: string;
    pt: string;
}

interface CardDraggableProps {
    item: Palavra;
    containerRef: React.RefObject<any>;
    isDragging: boolean;
    onDragStart: () => void;
    onDragEnd: (point: { x: number, y: number }) => void;
}

export function CardDraggable({ item, containerRef, isDragging, onDragStart, onDragEnd }: CardDraggableProps) {
    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={(_, info) => onDragEnd(info.point)}
            whileTap={{ cursor: 'grabbing', scale: 1.05, zIndex: 50 }}
            className="flex items-center justify-center h-full w-full bg-blue-600 text-white font-bold rounded-xl cursor-grab shadow-md select-none px-2 sm:px-4 text-center leading-tight transition-colors hover:bg-blue-700 text-xs sm:text-base break-words touch-none"
        >
            {isDragging ? `Can I have...?` : item.pt}
        </motion.div>
    );
}