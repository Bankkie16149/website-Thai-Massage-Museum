import React, { useState } from 'react';
import { triggerRipple } from '../../utils/ripple';

export default function TimelineGameView({
  locale,
  t,
  timelineData,
  positions,
  stamps,
  misses,
  score,
  feedback,
  isWarning,
  onBackToGames,
  onSelectCard,
  onReset,
}) {
  const items = timelineData.locales[locale]?.items || timelineData.locales.en.items;
  const maxScore = items.length * timelineData.scoring.pointsPerCorrect;
  const won = stamps.length === items.length;
  const [shakingCard, setShakingCard] = useState(null);

  const handleCardTap = (k) => {
    if (k !== stamps.length) {
      setShakingCard(null);
      requestAnimationFrame(() => setShakingCard(k));
    }
    onSelectCard(k);
  };

  const tierLabel =
    score >= maxScore ? t.tierPerfect : score >= maxScore * 0.8 ? t.tierGreat : t.tierComplete;

  return (
    <section
      id="view-timeline"
      className="pt-[35px] max-[650px]:pt-[10px] select-none"
      aria-labelledby="timeline-title"
    >
      <button
        type="button"
        onPointerDown={triggerRipple}
        onClick={onBackToGames}
        className="relative overflow-hidden border border-[#e6c17777] bg-[#4e141c55] hover:bg-[#6a1b2688] active:scale-[0.96] text-[#fff8ee] rounded-[15px] py-[10px] px-[20px] min-h-[54px] font-extrabold mb-6 transition-transform"
      >
        ← <span lang={locale}>{t.allGames}</span>
      </button>

      <div className="grid grid-cols-[minmax(270px,0.75fr)_minmax(440px,1.25fr)] max-[1130px]:grid-cols-[1fr_1.3fr] max-[760px]:grid-cols-1 gap-[clamp(32px,5.5vw,82px)] max-[1130px]:gap-5 items-start">
        <div>
          <div className="overline" lang={locale}>
            {t.timelineGameLabel}
          </div>
          <h2
            id="timeline-title"
            className="mt-[17px] mb-[22px] max-[760px]:text-[2.2rem] font-bold text-[#fffaf0]"
            lang={locale}
          >
            {t.timelineTitle}
          </h2>
          <p className="text-[#f0dfd7] text-[1.02rem]" lang={locale}>
            {t.timelineHelp}
          </p>

          <div className="flex flex-wrap gap-[10px] mt-7">
            <span className="inline-flex gap-[8px] items-center py-[10px] px-[16px] border border-[var(--stroke)] rounded-[40px] text-[#f5e7d9] text-[0.84rem] font-bold bg-[#ffffff0c]">
              ✦{' '}
              <span id="stamp-count">
                {stamps.length} / {items.length}
              </span>
            </span>

            <span
              className="inline-flex gap-[8px] items-center py-[10px] px-[16px] border border-[#e6c17766] rounded-[40px] text-[#fff8ee] text-[0.86rem] font-extrabold bg-[#63161f99]"
              aria-live="polite"
            >
              ★{' '}
              <span id="timeline-score" className="text-[#e6c177]">
                {score} / {maxScore}
              </span>{' '}
              <span lang={locale}>{t.pointsUnit}</span>
            </span>

            <span className="inline-flex gap-[8px] items-center py-[10px] px-[16px] border border-[var(--stroke)] rounded-[40px] text-[#f5e7d9] text-[0.84rem] font-bold bg-[#ffffff0c]">
              <b id="miss-count" className="text-[#e6c177]">
                {misses}
              </b>{' '}
              <span lang={locale}>{t.mistakes}</span>
            </span>
          </div>
        </div>

        <div className="bg-[#fffaf1] text-[#2d1014] rounded-[28px] shadow-museum p-[clamp(20px,3.7vw,42px)] max-[760px]:p-[22px] max-[410px]:p-[17px] min-h-[420px] max-[760px]:min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[#854634] text-[0.78rem] tracking-[0.12em] font-extrabold uppercase" lang={locale}>
              {t.interactiveBoard}
            </div>
            <div
              className="text-[0.86rem] font-black text-[#63161f] bg-[#f4e0da] px-3.5 py-1 rounded-full border border-[#d6ada5]"
              lang={locale}
            >
              {t.scoreLabel}: {score} / {maxScore}
            </div>
          </div>

          <h3 className="font-extrabold text-[1.42rem] leading-[1.43] mt-3 mb-[22px]" lang={locale}>
            {t.timelinePrompt}
          </h3>

          {/* 5 Chronological Slots */}
          <div
            id="timeline-slots"
            className="grid grid-cols-5 max-[760px]:grid-cols-3 max-[450px]:grid-cols-2 gap-2 mt-[14px] mb-[24px]"
            aria-label={t.interactiveBoard}
          >
            {items.map((item, i) => {
              const filled = i < stamps.length;
              return (
                <div
                  key={item.id}
                  className={`rounded-[14px] min-h-[96px] max-[760px]:min-h-[82px] flex flex-col items-center justify-center gap-[3px] px-2 py-2 text-center transition-colors duration-200 ${
                    filled
                      ? 'border-2 border-[#7d222c] bg-[#f4e0da]'
                      : 'border-[1.5px] border-dashed border-[#b89f93] bg-[#f3ece2]'
                  }`}
                >
                  <strong className={`text-[1.06rem] max-[760px]:text-[0.92rem] text-[#63161f] ${filled ? 'stamp-pop' : ''}`}>
                    {filled ? '✦' : String(i + 1).padStart(2, '0')}
                  </strong>
                  <small className="text-[0.68rem] max-[410px]:text-[0.62rem] text-[#59242b] font-bold leading-tight line-clamp-2" lang={locale}>
                    {filled ? item.label : '—'}
                  </small>
                  {filled && (
                    <span className="text-[0.58rem] text-[#7d222c] font-semibold line-clamp-1" lang={locale}>
                      {item.era}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 5 Shuffled Touch Cards */}
          <div
            id="timeline-items"
            className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-[12px]"
            aria-label={t.timelineTitle}
          >
            {positions.map((k) => {
              const item = items[k];
              const used = stamps.includes(k);
              const isShaking = shakingCard === k;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={used || won}
                  data-source-index={k}
                  onPointerDown={triggerRipple}
                  onClick={() => handleCardTap(k)}
                  onAnimationEnd={() => {
                    if (isShaking) setShakingCard(null);
                  }}
                  className={`relative overflow-hidden last:col-span-2 max-[560px]:last:col-span-1 min-h-[88px] flex justify-between items-center gap-3 rounded-[18px] border-2 border-[#d3beb0] py-[15px] px-[20px] text-[#2d1014] font-black text-[0.98rem] max-[410px]:text-[0.9rem] text-left transition-transform active:scale-[0.96] ${
                    isShaking ? 'gentle-shake ' : ''
                  }${
                    used
                      ? 'bg-[#efe6dd] opacity-55'
                      : 'bg-[#fffcf6] hover:bg-[#f7e7df]'
                  }`}
                >
                  <span lang={locale}>{item.label}</span>
                  <span className="font-serif font-bold text-[1.15rem] text-[#7d222c] shrink-0">
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
            lang={locale}
            className={`min-h-[48px] mt-[18px] rounded-[14px] py-[12px] px-[16px] text-[0.98rem] font-semibold transition-colors duration-200 ${
              isWarning
                ? 'bg-[#fbe0da] text-[#7c1d24] border border-[#dfa59a]'
                : 'bg-[#efe6d8] text-[#4a1c22]'
            }`}
          >
            {feedback}
          </div>

          {won && (
            <div
              id="timeline-reveal"
              className="passage-reveal mt-[20px] text-[#2d1014] bg-[#f8efe3] p-5 rounded-[20px] border-2 border-[#d8b67b]"
              lang={locale}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e0cdb8]">
                <div>
                  <div className="text-[0.74rem] font-black tracking-[0.12em] uppercase text-[#7d222c]">
                    {tierLabel}
                  </div>
                  <div className="text-[1.08rem] font-extrabold text-[#4a1c22] mt-0.5">
                    {t.timelineSummaryTitle}
                  </div>
                </div>
                <div className="score-pop text-[2.2rem] leading-none font-black text-[#63161f]">
                  {score} <span className="text-[1rem] font-bold text-[#662931]">/ {maxScore} {t.pointsUnit}</span>
                </div>
              </div>

              <ol className="m-0 pl-0 list-none grid gap-2.5 text-[0.94rem] leading-[1.65]">
                {items.map((item, idx) => (
                  <li key={item.id} className="flex gap-3 items-start">
                    <span className="w-7 h-7 rounded-full bg-[#63161f] text-[#fff8ee] text-[0.8rem] font-black grid place-items-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-[#63161f]">{item.label}</strong>
                      <p className="text-[#4a1c22] text-[0.88rem] mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <button
            type="button"
            id="timeline-reset"
            onPointerDown={triggerRipple}
            onClick={onReset}
            className="relative overflow-hidden mt-[18px] border-2 border-[#9e7064] bg-transparent hover:bg-[#f5e7dc] active:scale-[0.96] text-[#59151d] rounded-[14px] py-[10px] px-[20px] font-extrabold min-h-[54px] transition-transform"
          >
            <span lang={locale}>{t.replay}</span> ↻
          </button>
        </div>
      </div>
    </section>
  );
}
