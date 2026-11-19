import React, { useEffect, useRef } from 'react';
import { LANGUAGES } from '../data/copyData';
import { closeTopLayer } from '../utils/dialogAnimation';
import { triggerRipple } from '../utils/ripple';

export default function LanguageDialog({ isOpen, locale, t, onSelectLanguage, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.querySelector('button.selected')?.focus();
      });
    } else if (!isOpen && dialog.open) {
      closeTopLayer(dialog);
    }
  }, [isOpen]);

  // Fallback light-dismiss for browsers without native <dialog closedby="any"> support (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const outside = (e) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    let pressedOutside = false;
    const handlePointerDown = (e) => {
      pressedOutside = outside(e);
    };
    const handlePointerUp = (e) => {
      if (pressedOutside && outside(e) && dialog.open) {
        closeTopLayer(dialog);
      }
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    closeTopLayer(dialogRef.current);
  };

  return (
    <dialog
      ref={dialogRef}
      id="language-dialog"
      closedby="any"
      aria-labelledby="language-dialog-title"
      onCancel={handleCancel}
      onClose={onClose}
      className="kiosk-dialog w-full max-w-[min(1180px,95vw)] max-h-[96svh] rounded-[35px] bg-[#f5e5cc] text-[#2d1014] select-none"
    >
      <div className="dialog-surface p-[clamp(22px,5vw,56px)] max-[650px]:py-[20px] max-[650px]:px-[13px] max-h-[96svh] overflow-auto">
        <div className="flex justify-between items-start gap-[18px]">
          <div>
            <span className="text-[0.81rem] tracking-[0.17em] font-black text-[#7d4234]" lang={locale}>
              {t.dialogKicker}
            </span>
            <h2
              id="language-dialog-title"
              lang={locale}
              className="text-[clamp(2rem,4.2vw,3.9rem)] max-[650px]:text-[1.85rem] mt-2 font-bold"
            >
              {t.dialogTitle}{' '}
              <span className="text-[clamp(0.95rem,1.8vw,1.6rem)] font-medium text-[#662931] inline-block">
                / {t.dialogSubtitle}
              </span>
            </h2>
          </div>
          <button
            type="button"
            id="language-close"
            onPointerDown={triggerRipple}
            onClick={() => closeTopLayer(dialogRef.current)}
            aria-label={t.dialogCloseAria}
            className="relative overflow-hidden min-w-[70px] min-h-[70px] max-[650px]:min-w-[54px] max-[650px]:min-h-[54px] bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.94] text-white border-0 rounded-full text-[2rem] max-[650px]:text-[1.4rem] grid place-items-center shrink-0 transition-transform"
          >
            ✕
          </button>
        </div>

        <p className="mt-[14px] mb-[28px] text-[1.03rem] max-[650px]:text-[0.84rem] text-[#59242b]" lang={locale}>
          {t.dialogCaption}
        </p>

        <div
          id="dialog-languages"
          role="group"
          aria-label={t.chooseLangAria}
          className="grid grid-cols-4 max-[650px]:grid-cols-2 gap-[14px] max-[650px]:gap-[9px]"
        >
          {LANGUAGES.map(([code, short, name, english]) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                data-locale={code}
                lang={code}
                aria-label={`${name} (${english})`}
                aria-pressed={active ? 'true' : 'false'}
                onPointerDown={triggerRipple}
                onClick={() => onSelectLanguage(code)}
                className={`border-2 rounded-[25px] max-[650px]:rounded-[17px] text-left relative overflow-hidden py-[23px] px-[21px] max-[650px]:py-[14px] max-[650px]:px-[12px] min-h-[146px] max-[650px]:min-h-[120px] flex flex-col items-start justify-center transition-transform active:scale-[0.96] ${
                  active
                    ? 'selected bg-[#63161f] text-[#fff4dc] border-[#e2bd78]'
                    : 'bg-[#fffaf0] text-[#2d1014] border-[#d3be9f] hover:bg-white'
                }`}
              >
                <span
                  className={`text-[1.1rem] leading-[1.1] font-serif tracking-[0.05em] font-black ${
                    active ? 'text-[#e2bd78]' : 'text-[#784336]'
                  }`}
                >
                  {short}
                </span>
                <span className="text-[clamp(1.17rem,2vw,1.7rem)] font-black leading-[1.36] whitespace-normal break-words">
                  {name}
                </span>
                <span className="text-[0.84rem] tracking-[0.03em] opacity-75 leading-[1.35]">
                  {english}
                </span>
                {active && (
                  <span
                    className="text-[0.88rem] absolute top-[10px] right-[12px] text-[#e9c987]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-[0.72rem] max-[650px]:text-[0.6rem] tracking-[0.1em] text-[#662931] font-extrabold" lang={locale}>
          {t.dialogFoot}
        </p>
      </div>
    </dialog>
  );
}
