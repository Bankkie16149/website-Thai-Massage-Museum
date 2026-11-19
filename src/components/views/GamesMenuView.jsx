import React from 'react';

export default function GamesMenuView({ locale, t, onSelectTimeline, onSelectQuiz }) {
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';

  return (
    <section
      id="view-games"
      className="pt-[35px] max-[650px]:pt-[10px]"
      aria-labelledby="games-title"
    >
      <div className="max-w-[880px] mb-8">
        <div className="overline" lang={copyLang}>
          {t.playAndLearn}
        </div>
        <h2 id="games-title" className="my-[18px] font-bold" lang={copyLang}>
          {t.gamesHeadline}
        </h2>
        <p className="text-[#d5e1d2] max-w-[65ch] text-[1.03rem]" lang={copyLang}>
          {t.gamesIntro}
        </p>
      </div>

      <div className="grid grid-cols-2 max-[760px]:grid-cols-1 gap-[19px] max-[760px]:gap-3">
        <button
          type="button"
          id="select-timeline"
          onClick={onSelectTimeline}
          className="game-choice p-7 max-[760px]:p-[21px] text-left text-[#203a30] border border-[#d3bf9f] rounded-[32px] flex flex-col items-start min-h-[360px] max-[760px]:min-h-[225px] max-[650px]:min-h-[285px] gap-3 relative overflow-hidden"
        >
          <span className="text-[0.69rem] font-black tracking-[0.1em] text-[#836a44] uppercase">
            NEW / INTERACTIVE CHALLENGE
          </span>
          <span className="text-[2.75rem] leading-none" aria-hidden="true">
            ✣
          </span>
          <h3 className="text-[1.72rem] max-[760px]:text-[1.45rem] leading-[1.35] font-bold" lang={copyLang}>
            {t.timelineTitle}
          </h3>
          <p className="text-[0.96rem] text-[#486054] max-w-[48ch]" lang={copyLang}>
            {t.timelineDesc}
          </p>
          <span className="mt-auto text-[0.86rem] font-black text-[#2c6950]" lang={copyLang}>
            {t.startTimeline}
          </span>
        </button>

        <button
          type="button"
          id="select-quiz"
          onClick={onSelectQuiz}
          className="game-choice p-7 max-[760px]:p-[21px] text-left text-[#203a30] border border-[#d3bf9f] rounded-[32px] flex flex-col items-start min-h-[360px] max-[760px]:min-h-[225px] max-[650px]:min-h-[285px] gap-3 relative overflow-hidden"
        >
          <span className="text-[0.69rem] font-black tracking-[0.1em] text-[#836a44] uppercase">
            ORIGINAL / 4 QUESTIONS
          </span>
          <span className="text-[2.75rem] leading-none" aria-hidden="true">
            ✦
          </span>
          <h3 className="text-[1.72rem] max-[760px]:text-[1.45rem] leading-[1.35] font-bold" lang={copyLang}>
            {t.quizTitle}
          </h3>
          <p className="text-[0.96rem] text-[#486054] max-w-[48ch]" lang={copyLang}>
            {t.quizDesc}
          </p>
          <span className="mt-auto text-[0.86rem] font-black text-[#2c6950]" lang={copyLang}>
            {t.startQuiz}
          </span>
        </button>
      </div>
    </section>
  );
}
