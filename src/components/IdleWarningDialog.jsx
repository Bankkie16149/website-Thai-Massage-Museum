import React, { useEffect, useRef } from 'react';
import { closeTopLayer } from '../utils/dialogAnimation';
import { triggerRipple } from '../utils/ripple';

export default function IdleWarningDialog({
  isOpen,
  secondsLeft,
  locale,
  t,
  onContinue,
  onResetNow,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      closeTopLayer(dialog);
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="idle-warning-dialog"
      closedby="none"
      aria-labelledby="idle-warning-title"
      onCancel={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="kiosk-dialog w-full max-w-[min(560px,92vw)] rounded-[30px] bg-[#fff8ee] text-[#2d1014]"
    >
      <div className="p-7 sm:p-9 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#63161f] text-[#e6c177] grid place-items-center text-[1.9rem] font-serif">
          ⏳
        </div>

        <h2
          id="idle-warning-title"
          lang={locale}
          className="text-[clamp(1.45rem,2.4vw,1.9rem)] font-black text-[#2d1014] mb-3"
        >
          {t.idleTitle}
        </h2>

        <p className="text-[1rem] text-[#59242b] mb-3" lang={locale}>
          {t.idleMessage}
        </p>

        <div
          className="text-[3.2rem] font-black text-[#63161f] leading-none my-4"
          aria-live="polite"
        >
          {secondsLeft}{' '}
          <span className="text-[1.15rem] font-bold text-[#662931]">{t.idleSeconds}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <button
            type="button"
            autoFocus
            onPointerDown={triggerRipple}
            onClick={onContinue}
            className="relative overflow-hidden min-h-[64px] flex-1 rounded-[18px] px-6 py-3 text-[1.05rem] font-black bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.96] text-[#fff8ee] transition-transform"
          >
            {t.idleContinue}
          </button>
          <button
            type="button"
            onPointerDown={triggerRipple}
            onClick={onResetNow}
            className="relative overflow-hidden min-h-[64px] flex-1 rounded-[18px] px-6 py-3 text-[1rem] font-extrabold border-2 border-[#a87c71] bg-transparent hover:bg-[#f5e6df] active:scale-[0.96] text-[#4a1c22] transition-transform"
          >
            {t.idleResetNow}
          </button>
        </div>
      </div>
    </dialog>
  );
}
