import React from 'react';
import { LANGUAGES } from '../data/copyData';
import { triggerRipple } from '../utils/ripple';

export default function TopHeader({
  locale,
  brandTitle,
  t,
  onSelectLocale,
  onOpenLanguageDialog,
  onGoHome,
  onResetSession,
}) {
  const selected = LANGUAGES.find(([code]) => code === locale) || LANGUAGES[0];

  return (
    <>
      <a href="#experience" className="sr-only" id="skip">
        {t.skipLink}
      </a>

      <header className="bg-[#190609] text-[#f7efe2] border-b border-[#e6c17738] relative z-[4] select-none">
        <div className="w-[min(1570px,calc(100%-56px))] max-[1100px]:w-[calc(100%-34px)] max-[650px]:w-[calc(100%-22px)] mx-auto flex items-center gap-[18px] max-[650px]:gap-[8px] min-h-[84px] max-[650px]:min-h-[70px] py-2">
          <div
            className="flex items-center gap-[13px] max-[650px]:gap-[9px] min-w-0"
            aria-label={brandTitle}
          >
            <span
              className="grid place-items-center w-[49px] h-[49px] max-[650px]:w-[40px] max-[650px]:h-[40px] flex-none border-[1.5px] border-[#e6c177] text-[#e6c177] rotate-45 rounded-[10px] font-serif text-[24px] max-[650px]:text-[19px]"
              aria-hidden="true"
            >
              ❖
            </span>
            <div className="min-w-0">
              <strong
                id="brand-source"
                lang={locale}
                className="text-[1rem] max-[650px]:text-[0.8rem] leading-[1.3] block text-[#fff8ee] max-[650px]:line-clamp-2"
              >
                {brandTitle}
              </strong>
              <small className="text-[0.64rem] max-[650px]:text-[0.52rem] tracking-[0.17em] max-[650px]:tracking-[0.06em] font-extrabold block text-[#d9b26f]">
                {t.kioskSubtitle}
              </small>
            </div>
          </div>

          <div className="flex-1" />

          <div className="inline-flex gap-[9px] items-center text-[0.74rem] tracking-[0.14em] font-black text-[#eddcd4] whitespace-nowrap max-[1220px]:hidden">
            <i
              className="w-2.5 h-2.5 rounded-full bg-[#e6c177] shadow-[0_0_0_4px_#e6c17733]"
              aria-hidden="true"
            />
            <span lang={locale}>{t.kioskStatus}</span>
          </div>

          <div className="flex gap-2 items-center max-[650px]:ml-auto">
            <label htmlFor="locale-select" className="sr-only" id="lang-label">
              {t.languageLabel}
            </label>
            <select
              id="locale-select"
              className="sr-only"
              aria-label={t.chooseLangAria}
              value={locale}
              onChange={(e) => onSelectLocale(e.target.value)}
            >
              {LANGUAGES.map(([code, , name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              type="button"
              id="language-trigger"
              onPointerDown={triggerRipple}
              onClick={onOpenLanguageDialog}
              aria-haspopup="dialog"
              aria-controls="language-dialog"
              aria-label={`${t.chooseLangAria}: ${selected[3]}`}
              className="relative overflow-hidden shrink-0 min-h-[60px] max-[650px]:min-h-[52px] rounded-[18px] max-[650px]:rounded-[13px] py-[8px] px-[15px] max-[650px]:py-[6px] max-[650px]:px-[9px] bg-[#f7ebd1] hover:bg-[#fff6e3] active:scale-[0.96] border-2 border-[#e4c37d] text-[#2d1014] flex gap-[11px] max-[650px]:gap-[7px] items-center shadow-[inset_0_0_0_3px_#fff9e3] transition-transform"
            >
              <span
                className="text-[1.75rem] max-[650px]:text-[1.25rem] font-serif border-r border-[#c2ab8c] pr-[11px] max-[650px]:pr-[6px]"
                aria-hidden="true"
              >
                文
              </span>
              <span className="text-left flex flex-col leading-[1.28] min-w-[96px] max-[650px]:min-w-[54px]">
                <small className="text-[0.58rem] tracking-[0.09em] text-[#662931] font-extrabold max-[650px]:hidden">
                  {t.languageLabel}
                </small>
                <strong
                  id="current-language"
                  className="text-[1.1rem] max-[650px]:text-[0.86rem] whitespace-nowrap"
                >
                  {selected[2]}
                </strong>
              </span>
              <span aria-hidden="true" className="text-[1.35rem] max-[650px]:text-[1rem]">
                ⌄
              </span>
            </button>
          </div>

          <button
            type="button"
            id="restart"
            onPointerDown={triggerRipple}
            onClick={onGoHome}
            className="relative overflow-hidden whitespace-nowrap shrink-0 min-h-[58px] max-[650px]:min-h-[50px] bg-[#4e141c] hover:bg-[#681c26] active:scale-[0.96] text-[#fdf6e6] border border-[#b88672] rounded-[16px] max-[650px]:rounded-[13px] py-[10px] px-[18px] max-[650px]:py-[7px] max-[650px]:px-[10px] max-[650px]:text-[0.74rem] font-extrabold transition-transform"
          >
            ⌂ <span lang={locale}>{t.home}</span>
          </button>

          <button
            type="button"
            id="reset-session"
            onPointerDown={triggerRipple}
            onClick={onResetSession}
            title={t.resetSession}
            aria-label={t.resetSession}
            className="relative overflow-hidden whitespace-nowrap shrink-0 min-h-[58px] max-[650px]:min-h-[50px] bg-transparent hover:bg-[#ffffff14] active:scale-[0.96] text-[#f0d8b2] border border-[#e6c17755] rounded-[16px] max-[650px]:rounded-[13px] py-[10px] px-[14px] max-[650px]:py-[7px] max-[650px]:px-[9px] text-[0.84rem] max-[650px]:text-[0.72rem] font-extrabold transition-transform"
          >
            ↺ <span className="max-[820px]:hidden" lang={locale}>{t.resetSession}</span>
          </button>
        </div>
      </header>
    </>
  );
}
