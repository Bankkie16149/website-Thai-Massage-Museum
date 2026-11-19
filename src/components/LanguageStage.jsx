import React from 'react';
import { LANGUAGES } from '../data/copyData';
import { triggerRipple } from '../utils/ripple';

export default function LanguageStage({ locale, t, onSelectLanguage }) {
  const selected = LANGUAGES.find(([code]) => code === locale) || LANGUAGES[0];

  return (
    <div
      className="language-stage relative mt-5 mb-8 max-[650px]:mt-[11px] max-[650px]:mb-[20px] bg-[#f2e2cb] text-[#2d1014] rounded-[28px] max-[650px]:rounded-[21px] pt-[21px] px-[27px] pb-[15px] max-[650px]:pt-[16px] max-[650px]:px-[12px] max-[650px]:pb-[11px] overflow-hidden select-none"
      id="language-stage"
      aria-labelledby="language-stage-title"
    >
      <div className="flex gap-[17px] max-[650px]:gap-[9px] items-center mb-[13px] max-[650px]:mb-[11px] relative z-[1]">
        <span className="text-[1.28rem] max-[650px]:text-[0.85rem] font-serif tracking-[0.05em] text-[#662931] whitespace-nowrap font-bold">
          01 <span className="text-[#9e6e54] text-[0.73rem]">/</span> 03
        </span>
        <div>
          <div className="text-[0.68rem] max-[650px]:text-[0.52rem] font-black tracking-[0.18em] text-[#662931]" lang={locale}>
            {t.stageEyebrow}
          </div>
          <h2
            id="language-stage-title"
            lang={locale}
            className="text-[clamp(1.23rem,2.2vw,1.8rem)] max-[650px]:text-[1.2rem] leading-[1.38] mt-[2px] font-black"
          >
            {t.stageTitle}
            <span className="text-[0.68rem] max-[650px]:text-[0.6rem] tracking-[0.12em] text-[#662931] pl-[12px] max-[1100px]:inline-block max-[650px]:block max-[650px]:pl-0 font-extrabold">
              {t.stageSubtitle}
            </span>
          </h2>
        </div>
        <div
          className="ml-auto font-serif text-[2.4rem] max-[650px]:text-[1.6rem] text-[#8d433a] border border-[#b98a73] rounded-full w-[45px] h-[45px] max-[650px]:w-[32px] max-[650px]:h-[32px] grid place-items-center shrink-0"
          aria-hidden="true"
        >
          文
        </div>
      </div>

      <div
        id="language-tiles"
        role="group"
        aria-label={t.chooseLangAria}
        className="grid grid-cols-7 max-[1100px]:grid-cols-4 gap-[10px] max-[650px]:gap-[6px] relative z-[1]"
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
              className={`language-tile rounded-[18px] max-[650px]:rounded-[12px] border-2 max-[650px]:border-[1.5px] min-w-0 min-h-[93px] min-[1500px]:min-h-[100px] max-[650px]:min-h-[79px] max-[360px]:min-h-[75px] flex flex-col items-start justify-center text-left py-2 px-[13px] max-[650px]:p-[7px] relative overflow-hidden ${
                active
                  ? 'selected'
                  : 'bg-[#fffaf0] border-[#d3be9f] text-[#2d1014]'
              }`}
            >
              <span
                className={`text-[0.9rem] max-[650px]:text-[0.65rem] leading-[1.1] font-serif tracking-[0.05em] font-black ${
                  active ? 'text-[#e2bd78]' : 'text-[#784336]'
                }`}
              >
                {short}
              </span>
              <span className="text-[clamp(.95rem,1.13vw,1.27rem)] max-[650px]:text-[clamp(.74rem,2.8vw,.99rem)] max-[360px]:text-[0.75rem] font-black leading-[1.36] max-[650px]:leading-[1.26] whitespace-normal break-words">
                {name}
              </span>
              <span className="text-[0.68rem] max-[650px]:text-[0.56rem] tracking-[0.03em] opacity-75 leading-[1.35] max-[650px]:leading-[1.18]">
                {english}
              </span>
              {active && (
                <span
                  className="text-[0.84rem] max-[650px]:text-[0.7rem] absolute top-[7px] right-[10px] max-[650px]:top-[5px] max-[650px]:right-[5px] text-[#e9c987]"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className="text-[0.62rem] max-[650px]:text-[0.5rem] tracking-[0.11em] max-[650px]:tracking-[0.02em] font-black mt-[13px] flex justify-between gap-3 text-[#662931] max-[650px]:flex-wrap"
        lang={locale}
      >
        <span>{t.stageBaseline}</span>
        <span id="selected-language-note" role="status" className="text-[#63161f]">
          ● {selected[2]} — {t.selectedTag}
        </span>
      </div>
    </div>
  );
}
