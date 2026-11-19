import React from 'react';
import { LANGUAGES } from '../data/copyData';
import { triggerRipple } from '../utils/ripple';

export default function AttractScreen({
  locale,
  t,
  brandTitle,
  heroPhoto,
  secondaryPhoto,
  onStart,
  onSelectLanguageAndStart,
}) {
  return (
    <div
      className="attract-backdrop min-h-[100svh] w-full flex flex-col justify-between p-[clamp(24px,4vw,56px)] text-[#f7efe2] relative overflow-hidden select-none"
      role="region"
      aria-label={brandTitle}
    >
      {/* Decorative Temple Orbit */}
      <div
        className="pointer-events-none absolute -right-[14vw] -top-[18vw] w-[62vw] h-[62vw] rounded-full border border-[#e6c17726] shadow-[0_0_0_5vw_#e6c17706] photo-orbit"
        aria-hidden="true"
      />

      {/* Top Museum Crest */}
      <div className="flex items-center justify-between gap-4 relative z-[1] flex-wrap">
        <div className="flex items-center gap-4">
          <span
            className="grid place-items-center w-[54px] h-[54px] border-[1.5px] border-[#e6c177] text-[#e6c177] rotate-45 rounded-[12px] font-serif text-[26px]"
            aria-hidden="true"
          >
            ❖
          </span>
          <div>
            <p className="text-[0.78rem] tracking-[0.2em] font-black text-[#e6c177] uppercase">
              {t.attractKicker}
            </p>
            <p className="text-[0.82rem] text-[#e8d9cf] opacity-85">{t.attractHours}</p>
          </div>
        </div>

        <span className="inline-flex gap-2.5 items-center py-2.5 px-4 rounded-full border border-[#e6c17740] bg-[#19060999] text-[0.78rem] tracking-[0.16em] font-extrabold text-[#f3dfb8]">
          <i className="w-2.5 h-2.5 rounded-full bg-[#e6c177] shadow-[0_0_0_5px_#e6c17733]" aria-hidden="true" />
          {t.kioskStatus}
        </span>
      </div>

      {/* Main Attract Centerpiece */}
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] max-[960px]:grid-cols-1 gap-[clamp(28px,5vw,72px)] items-center my-auto py-8 relative z-[1]">
        <div>
          <div className="overline mb-4" lang={locale}>
            {t.kioskSubtitle}
          </div>

          <h1
            className="text-[clamp(2.4rem,4.6vw,5.2rem)] leading-[1.15] font-extrabold text-[#fffaf0] mb-5"
            lang={locale}
          >
            {brandTitle}
          </h1>

          <p
            className="text-[clamp(1.05rem,1.45vw,1.38rem)] leading-[1.75] text-[#f0dfd7] max-w-[48ch] mb-8"
            lang={locale}
          >
            {t.attractLead}
          </p>

          <button
            type="button"
            id="attract-start"
            onPointerDown={triggerRipple}
            onClick={onStart}
            className="relative overflow-hidden min-h-[72px] rounded-[22px] py-4 px-9 text-[clamp(1.05rem,1.3vw,1.25rem)] font-black inline-flex items-center justify-center gap-3 bg-[#e6c177] hover:bg-[#f2d493] active:scale-[0.96] text-[#2b0a0f] shadow-[0_18px_40px_#12020480] transition-transform"
          >
            <span>✧ {t.attractStart}</span>
            <span aria-hidden="true" className="text-[1.35rem]">
              →
            </span>
          </button>
        </div>

        {/* Framed Museum Photos */}
        <div className="relative flex justify-center items-center max-[960px]:hidden">
          <div className="relative w-full max-w-[460px]">
            <div className="rounded-[34px] overflow-hidden border-[8px] border-[#e2bd78] shadow-[0_28px_70px_#0d0204b0] aspect-[4/4.3] bg-[#3a1016]">
              <img
                src={heroPhoto}
                alt=""
                className="w-full h-full object-cover"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 -left-8 w-[170px] h-[135px] rounded-[20px] overflow-hidden border-[5px] border-[#f7efe2] shadow-[0_18px_40px_#00000088] -rotate-3 bg-[#3a1016]">
              <img
                src={secondaryPhoto}
                alt=""
                className="w-full h-full object-cover"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 7-Language Quick Entry Bar */}
      <div className="max-w-[1440px] w-full mx-auto relative z-[1] bg-[#f2e2cb] text-[#2d1014] rounded-[26px] p-4 sm:p-5 shadow-[0_18px_50px_#0e02047a]">
        <div className="flex items-center justify-between gap-3 mb-3 px-1">
          <strong className="text-[0.95rem] sm:text-[1.08rem] font-black text-[#4a1c22]" lang={locale}>
            文 {t.attractChooseLang}
          </strong>
          <span className="text-[0.72rem] font-extrabold tracking-[0.12em] text-[#662931] max-[650px]:hidden">
            07 LANGUAGES
          </span>
        </div>

        <div
          className="grid grid-cols-7 max-[1080px]:grid-cols-4 max-[600px]:grid-cols-2 gap-2.5"
          role="group"
          aria-label={t.chooseLangAria}
        >
          {LANGUAGES.map(([code, short, name, english]) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={active ? 'true' : 'false'}
                onPointerDown={triggerRipple}
                onClick={() => onSelectLanguageAndStart(code)}
                className={`language-tile rounded-[16px] border-2 min-h-[76px] px-3 py-2 flex flex-col items-start justify-center text-left relative overflow-hidden ${
                  active
                    ? 'selected'
                    : 'bg-[#fffaf0] border-[#d3be9f] text-[#2d1014]'
                }`}
              >
                <span
                  className={`text-[0.78rem] font-serif font-black ${
                    active ? 'text-[#e2bd78]' : 'text-[#784336]'
                  }`}
                >
                  {short}
                </span>
                <span className="text-[clamp(0.92rem,1.15vw,1.16rem)] font-black leading-[1.28]">
                  {name}
                </span>
                <span className="text-[0.66rem] opacity-75">{english}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Museum License / Attribution */}
      <p
        className="max-w-[1440px] w-full mx-auto text-center text-[#dfc6bd] text-[0.75rem] tracking-[0.05em] pt-3 relative z-[1] flex items-center justify-center gap-2 flex-wrap opacity-90"
        lang={locale}
      >
        <span className="text-[#e6c177]" aria-hidden="true">❖</span>
        <span>{t.footerNote}</span>
      </p>
    </div>
  );
}
