import React from 'react';
import { TIMELINE_POSITIONS } from '../../data/copyData';

function labelFromParagraph(s) {
  let a = s.split(/[（(]/, 1)[0].trim();
  if (a.length > 38) a = a.slice(0, 38) + '…';
  return a || s.slice(0, 35);
}

export default function TimelineGameView({
  locale,
  t,
  paras,
  stamps,
  misses,
  feedback,
  isWarning,
  onBackToGames,
  onSelectCard,
  onReset,
}) {
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';
  const won = stamps.length === 4;

  return (
    <section
      id="view-timeline"
      className="pt-[35px] max-[650px]:pt-[10px]"
      aria-labelledby="timeline-title"
    >
      <button
        type="button"
        onClick={onBackToGames}
        className="border border-[#ffffff6a] bg-transparent hover:bg-[#ffffff13] text-[var(--cream)] rounded-[14px] py-[9px] px-[16px] min-h-[45px] font-extrabold mb-6"
      >
        ← <span lang={copyLang}>{t.allGames}</span>
      </button>

      <div className="grid grid-cols-[minmax(270px,0.77fr)_minmax(420px,1.23fr)] max-[1130px]:grid-cols-[1fr_1.28fr] max-[760px]:grid-cols-1 gap-[clamp(35px,6vw,90px)] max-[1130px]:gap-5 items-start">
        <div>
          <div className="overline">EXPLORER GAME / 01</div>
          <h2 id="timeline-title" className="mt-[17px] mb-[22px] max-[760px]:text-[2.35rem] font-bold" lang={copyLang}>
            {t.timelineTitle}
          </h2>
          <p className="text-[#d4e0d5] text-[1rem]" lang={copyLang}>
            {t.timelineHelp}
          </p>

          <div className="flex flex-wrap gap-[11px] mt-7">
            <span className="inline-flex gap-[9px] items-center py-[9px] px-[14px] border border-[var(--stroke)] rounded-[40px] text-[#e6dfce] text-[0.74rem] font-bold bg-[#ffffff07]">
              ✦ <span id="stamp-count">{stamps.length} / 4</span>
            </span>
            <span className="inline-flex gap-[9px] items-center py-[9px] px-[14px] border border-[var(--stroke)] rounded-[40px] text-[#e6dfce] text-[0.74rem] font-bold bg-[#ffffff07]">
              <b id="miss-count" className="text-[#f2cd89]">
                {misses}
              </b>{' '}
              <span lang={copyLang}>{t.mistakes}</span>
            </span>
          </div>
        </div>

        <div className="bg-[#fffaf1] text-[#233e31] rounded-[28px] shadow-museum p-[clamp(20px,3.7vw,42px)] max-[760px]:p-[22px] max-[410px]:p-[17px] min-h-[420px] max-[760px]:min-h-0">
          <div className="text-[#866d48] text-[0.75rem] tracking-[0.12em] font-extrabold uppercase" lang={copyLang}>
            {t.interactiveBoard}
          </div>
          <h3 className="font-extrabold text-[1.42rem] leading-[1.43] mt-3 mb-[23px]" lang={copyLang}>
            {t.timelinePrompt}
          </h3>

          <div id="timeline-slots" className="grid grid-cols-4 gap-2 mt-[15px] mb-[26px]" aria-label="Timeline slots">
            {[0, 1, 2, 3].map((i) => {
              const filled = i < stamps.length;
              return (
                <div
                  key={i}
                  className={`rounded-[13px] h-[85px] max-[760px]:h-[70px] max-[410px]:h-[73px] flex flex-col items-center justify-center gap-[3px] px-1 text-center ${
                    filled
                      ? 'border-[1.5px] border-[#56745b] bg-[#dceadd]'
                      : 'border-[1.5px] border-dashed border-[#a6ad98] bg-[#eef0e4]'
                  }`}
                >
                  <strong className="text-[1.02rem] max-[760px]:text-[0.85rem]">
                    {filled ? '✦' : String(i + 1).padStart(2, '0')}
                  </strong>
                  <small className="text-[0.63rem] max-[410px]:text-[0.59rem] text-[#677b6b] line-clamp-2">
                    {filled ? labelFromParagraph(paras[6 + i]) : '—'}
                  </small>
                </div>
              );
            })}
          </div>

          <div id="timeline-items" className="grid grid-cols-2 gap-[11px]" aria-label="Heritage cards">
            {TIMELINE_POSITIONS.map((k) => {
              const used = stamps.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  disabled={used || won}
                  data-source-index={k}
                  onClick={() => onSelectCard(k)}
                  className={`min-h-[93px] max-[410px]:min-h-[87px] flex justify-between items-center gap-3 rounded-[16px] border border-[#c3cbbd] py-[15px] px-[18px] max-[410px]:p-3 text-[#223c31] font-black max-[410px]:text-[0.89rem] text-left ${
                    used
                      ? 'bg-[#ebeee5] opacity-55'
                      : 'bg-[#f9faf5] hover:bg-[#e1eddd]'
                  }`}
                >
                  <span>{labelFromParagraph(paras[6 + k])}</span>
                  <span className="font-serif font-bold text-[1.1rem] text-[#8c986e]">
                    {used ? '✓' : '↗'}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="timeline-feedback"
            role="status"
            aria-live="polite"
            className={`min-h-[45px] mt-[18px] rounded-[13px] py-[10px] px-[14px] text-[0.94rem] ${
              isWarning
                ? 'bg-[#f7e4d6] text-[#713e23]'
                : 'bg-[#e5ebdf] text-[#304b3c]'
            }`}
          >
            {feedback}
          </div>

          {won && (
            <div id="timeline-reveal" className="mt-[18px] text-[#395746] text-[0.89rem] leading-[1.75]">
              {[6, 7, 8, 9].map((idx) => (
                <p key={idx} className="mb-[9px] last:mb-0">
                  {paras[idx]}
                </p>
              ))}
            </div>
          )}

          <button
            type="button"
            id="timeline-reset"
            onClick={onReset}
            className="mt-[15px] border border-[#879a80] bg-transparent hover:bg-[#eef3ea] text-[#2a513c] rounded-[12px] py-[9px] px-[17px] font-extrabold min-h-[45px]"
          >
            <span lang={copyLang}>{t.replay}</span> ↻
          </button>
        </div>
      </div>
    </section>
  );
}
