import React from 'react';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  items,
  onClose,
}) => {
  return (
    <div className="context-menu" style={{ top: `${y}px`, left: `${x}px` }}>
      <ul className="list-none m-0 p-2">
        {items.map((item, index) => (
          <li key={index} className="context-menu-item">
            <button
              className="context-menu-button"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
