import React, { useEffect, useRef } from 'react';
import { LANGUAGES } from '../data/copyData';

export default function LanguageDialog({ isOpen, locale, onSelectLanguage, onClose }) {
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
      dialog.close();
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
        dialog.close();
      }
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id="language-dialog"
      closedby="any"
      aria-labelledby="language-dialog-title"
      onClose={onClose}
      className="language-dialog w-full max-w-[min(1180px,95vw)] max-h-[96svh] rounded-[35px] bg-[#f5e8c9] text-[#183e37]"
    >
      <div className="dialog-surface p-[clamp(22px,5vw,56px)] max-[650px]:py-[20px] max-[650px]:px-[13px] max-h-[96svh] overflow-auto">
        <div className="flex justify-between items-start gap-[18px]">
          <div>
            <span className="text-[0.81rem] tracking-[0.17em] font-black text-[#7c794e]">
              WELCOME / LANGUAGE GATE
            </span>
            <h2
              id="language-dialog-title"
              className="text-[clamp(2.2rem,4.5vw,4.4rem)] max-[650px]:text-[2rem] mt-2 font-bold"
            >
              เลือกภาษา{' '}
              <span className="text-[clamp(1rem,2vw,1.9rem)] font-medium text-[#617b69] inline-block">
                / Choose your language
              </span>
            </h2>
          </div>
          <button
            type="button"
            id="language-close"
            onClick={onClose}
            aria-label="Close language selector"
            className="min-w-[70px] min-h-[70px] max-[650px]:min-w-[53px] max-[650px]:min-h-[53px] bg-[#1d4c40] hover:bg-[#153c32] text-white border-0 rounded-full text-[2rem] max-[650px]:text-[1.4rem] grid place-items-center shrink-0"
          >
            ✕
          </button>
        </div>

        <p className="mt-[14px] mb-[28px] text-[1.03rem] max-[650px]:text-[0.76rem] text-[#3e5b4d]">
          เลือกภาษาจากเอกสารต้นฉบับทั้ง 7 ภาษา · Select one of seven supplied source languages.
        </p>

        <div
          id="dialog-languages"
          role="group"
          aria-label="Languages"
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
                onClick={() => onSelectLanguage(code)}
                className={`border-2 rounded-[25px] max-[650px]:rounded-[17px] text-left relative py-[23px] px-[21px] max-[650px]:py-[14px] max-[650px]:px-[12px] min-h-[146px] max-[650px]:min-h-[126px] flex flex-col items-start justify-center transition-transform hover:-translate-y-0.5 ${
                  active
                    ? 'selected bg-[#155247] text-[#fff4dc] border-[#dbb96d]'
                    : 'bg-[#fffaf0] text-[#1b4139] border-[#c6b893] hover:bg-white'
                }`}
              >
                <span
                  className={`text-[1.1rem] leading-[1.1] font-serif tracking-[0.05em] font-black ${
                    active ? 'text-[#d4c497]' : 'text-[#695339]'
                  }`}
                >
                  {short}
                </span>
                <span className="text-[clamp(1.17rem,2vw,1.7rem)] font-black leading-[1.36] whitespace-normal break-words">
                  {name}
                </span>
                <span className="text-[0.84rem] tracking-[0.03em] opacity-70 leading-[1.35]">
                  {english}
                </span>
                {active && (
                  <span
                    className="text-[0.84rem] absolute top-[7px] right-[10px] text-[#e9c987]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-[0.7rem] max-[650px]:text-[0.58rem] tracking-[0.11em] text-[#3e5b4d] font-extrabold">
          EVERY LANGUAGE OPENS ITS OWN ORIGINAL MUSEUM DOCUMENT · NO MACHINE TRANSLATION
        </p>
      </div>
    </dialog>
  );
}
