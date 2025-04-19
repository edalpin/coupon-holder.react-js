import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

type ModalProps = {
  title: string;
  isOpen: boolean;
  renderContent: () => React.ReactNode;
  onClose: () => void;
};

export const Modal = (props: ModalProps) => {
  const { title, isOpen, renderContent, onClose } = props;

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <section
          className={cn(
            'fixed inset-0 flex items-center justify-center z-50',
            'bg-black/80'
          )}
        >
          <section
            className={cn(
              'rounded-2xl w-5/6 border-2',
              'bg-accent border-black'
            )}
          >
            <header
              className={cn(
                'flex justify-between items-center p-2 border-b-2 rounded-tl-2xl rounded-tr-2xl',
                'bg-secondary font-bold'
              )}
            >
              <p className="w-full">{title}</p>
              <Button variant="primary" onClick={onClose} className="bg-error">
                <X className="w-4 h-4" />
              </Button>
            </header>
            <section className="p-5 flex flex-col justify-center items-center">
              {renderContent()}
            </section>
          </section>
        </section>,
        document.body
      )}
    </>
  );
};
