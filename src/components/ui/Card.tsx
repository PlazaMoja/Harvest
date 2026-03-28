import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, title, subtitle, actions, elevated = false, className = '', onClick }: CardProps) {
  const cardClass = elevated ? 'card-elevated' : 'card';
  const clickableClass = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${cardClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle || actions) && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              {title && <h3 className="text-xl font-semibold text-[hsl(var(--harvest-dark))] mb-1">{title}</h3>}
              {subtitle && <p className="text-sm text-[hsl(var(--harvest-earth-light))]">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  );
}
