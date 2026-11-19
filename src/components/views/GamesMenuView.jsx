import React from 'react';
import { triggerRipple } from '../../utils/ripple';

export default function GamesMenuView({ locale, t, onSelectTimeline, onSelectQuiz }) {
  return (
    <section
      id="view-games"
      className="pt-[35px] max-[650px]:pt-[10px] select-none"
      aria-labelledby="games-title"
    >
      <div className="max-w-[880px] mb-8">
        <div className="overline" lang={locale}>
          {t.playAndLearn}
        </div>
        <h2 id="games-title" className="my-[18px] font-bold text-[#fffaf0]" lang={locale}>
          {t.gamesHeadline}
        </h2>
        <p className="text-[#f0dfd7] max-w-[65ch] text-[1.05rem]" lang={locale}>
          {t.gamesIntro}
        </p>
      </div>

      <div className="grid grid-cols-2 max-[760px]:grid-cols-1 gap-[20px] max-[760px]:gap-4">
        <button
          type="button"
          id="select-timeline"
          onPointerDown={triggerRipple}
          onClick={onSelectTimeline}
          className="game-choice p-8 max-[760px]:p-[22px] text-left text-[#2d1014] border border-[#dfc5a8] rounded-[32px] flex flex-col items-start min-h-[360px] max-[760px]:min-h-[240px] max-[650px]:min-h-[280px] gap-3 relative overflow-hidden"
        >
          <span className="text-[0.72rem] font-black tracking-[0.1em] text-[#7a3b2e] uppercase" lang={locale}>
            {t.timelineBadge}
          </span>
          <span className="text-[2.75rem] leading-none text-[#63161f]" aria-hidden="true">
            ✣
          </span>
          <h3 className="text-[1.72rem] max-[760px]:text-[1.45rem] leading-[1.35] font-bold" lang={locale}>
            {t.timelineTitle}
          </h3>
          <p className="text-[0.98rem] text-[#59242b] max-w-[48ch]" lang={locale}>
            {t.timelineDesc}
          </p>
          <span className="mt-auto text-[0.95rem] font-black text-[#63161f]" lang={locale}>
            {t.startTimeline}
          </span>
        </button>

        <button
          type="button"
          id="select-quiz"
          onPointerDown={triggerRipple}
          onClick={onSelectQuiz}
          className="game-choice p-8 max-[760px]:p-[22px] text-left text-[#2d1014] border border-[#dfc5a8] rounded-[32px] flex flex-col items-start min-h-[360px] max-[760px]:min-h-[240px] max-[650px]:min-h-[280px] gap-3 relative overflow-hidden"
        >
          <span className="text-[0.72rem] font-black tracking-[0.1em] text-[#7a3b2e] uppercase" lang={locale}>
            {t.quizBadge}
          </span>
          <span className="text-[2.75rem] leading-none text-[#63161f]" aria-hidden="true">
            ✦
          </span>
          <h3 className="text-[1.72rem] max-[760px]:text-[1.45rem] leading-[1.35] font-bold" lang={locale}>
            {t.quizTitle}
          </h3>
          <p className="text-[0.98rem] text-[#59242b] max-w-[48ch]" lang={locale}>
            {t.quizDesc}
          </p>
          <span className="mt-auto text-[0.95rem] font-black text-[#63161f]" lang={locale}>
            {t.startQuiz}
          </span>
        </button>
      </div>
    </section>
  );
}
