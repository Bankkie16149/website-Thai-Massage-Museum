import React from 'react';
import { QUESTION_ICONS } from '../../data/copyData';
import { triggerRipple } from '../../utils/ripple';

export default function FrontView({
  locale,
  t,
  paras,
  groups,
  media,
  visited,
  frontHeadRef,
  onSurprise,
  onGoGames,
  onOpenTopic,
}) {
  return (
    <section
      id="view-front"
      className="grid grid-cols-[minmax(310px,0.82fr)_minmax(0,1.38fr)] max-[1100px]:grid-cols-1 gap-[clamp(25px,3.4vw,60px)] max-[1100px]:gap-[28px] max-[650px]:gap-[22px] items-center select-none"
      aria-labelledby="front-head"
    >
      <div className="relative pt-[3px] min-w-0 isolate max-[1100px]:max-w-full max-[650px]:pt-[3px] max-[650px]:px-[5px]">
        <span
          className="absolute -top-[55px] -left-[20px] -z-[1] font-serif text-[clamp(250px,29vw,425px)] leading-none text-[#e6c1770d] -rotate-[15deg] pointer-events-none"
          aria-hidden="true"
        >
          ?
        </span>

        <div className="overline" lang={locale}>
          {t.welcome}
        </div>

        <h1
          ref={frontHeadRef}
          id="front-head"
          tabIndex={-1}
          lang={locale}
          className="text-[clamp(2.5rem,4vw,5.4rem)] max-[650px]:text-[clamp(2.1rem,8.5vw,3.5rem)] mt-[12px] mb-[19px] max-[650px]:my-[13px] max-w-[16ch] max-[1100px]:max-w-[22ch] leading-[1.15] max-[650px]:leading-[1.12]"
        >
          <span>{t.headlineA}</span>
          <br />
          <em className="not-italic text-[#ecc37b] inline-block drop-shadow-[0_8px_34px_#e6b56536]">
            {t.headlineB}
          </em>
        </h1>

        <p
          className="text-[clamp(.98rem,1.22vw,1.22rem)] max-[650px]:text-[0.95rem] leading-[1.82] max-[650px]:leading-[1.66] max-w-[43ch] text-[#f0e0da]"
          lang={locale}
        >
          {t.intro}
        </p>

        <p
          className="text-[#dfc6bd] text-[0.76rem] opacity-80 max-w-[58ch] mt-4 max-[650px]:mt-[10px] leading-[1.6]"
          id="source-title"
          lang={locale}
        >
          {paras[0]}
        </p>

        <div className="flex gap-[12px] flex-wrap mt-[24px] max-[650px]:mt-[16px]">
          <button
            type="button"
            id="surprise"
            onPointerDown={triggerRipple}
            onClick={onSurprise}
            className="relative overflow-hidden min-h-[64px] max-[650px]:min-h-[56px] rounded-[18px] max-[650px]:rounded-[14px] py-[12px] px-[26px] max-[650px]:py-[10px] max-[650px]:px-[16px] text-[1rem] max-[650px]:text-[0.88rem] font-extrabold inline-flex gap-[10px] items-center justify-center text-center bg-[#e6c177] hover:bg-[#f0d69d] active:scale-[0.96] text-[#2b0a0f] border border-transparent transition-transform shadow-[0_12px_28px_#14030555]"
          >
            ✧ <span lang={locale}>{t.surprise}</span> <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            onPointerDown={triggerRipple}
            onClick={onGoGames}
            className="relative overflow-hidden min-h-[64px] max-[650px]:min-h-[56px] rounded-[18px] max-[650px]:rounded-[14px] py-[12px] px-[26px] max-[650px]:py-[10px] max-[650px]:px-[16px] text-[1rem] max-[650px]:text-[0.88rem] font-extrabold inline-flex gap-[10px] items-center justify-center text-center bg-[#4e141c55] hover:bg-[#6a1b2688] active:scale-[0.96] text-[#fff8ee] border border-[#e6c17766] transition-transform"
          >
            <span lang={locale}>{t.play}</span> →
          </button>
        </div>

        <div className="mt-[28px] flex gap-[18px] items-center max-w-[460px] relative max-[1100px]:hidden">
          <span
            className="photo-orbit absolute w-[180px] h-[180px] -left-[10px] -top-[24px] border border-dashed border-[#ebc77b80] rounded-full -z-[1]"
            aria-hidden="true"
          />
          <img
            id="entry-photo"
            src={media['6'].large}
            alt=""
            decoding="async"
            className="w-[160px] h-[133px] object-cover object-[50%_48%] border-[5px] border-[#d7bc80] shadow-[0_18px_34px_#0008] -rotate-[5deg] rounded-[23px_85px_28px_27px]"
          />
          <div className="text-[0.75rem] leading-[1.53] text-[#ead9d1] max-w-[235px]" lang={locale}>
            <strong className="text-[#f3d89d] block mb-[3px] text-[0.82rem]">
              {t.photoTitle}
            </strong>
            <span>{t.photoCaption}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute right-0 -top-[14px] text-[#e2bd78] font-serif text-[0.77rem] tracking-[0.15em]"
          aria-hidden="true"
          lang={locale}
        >
          {t.exploreIndex}
        </div>

        <div className="px-[6px] pb-[12px] max-[650px]:pb-[14px] flex gap-4 max-[650px]:gap-1 justify-between items-center">
          <div>
            <div className="overline" lang={locale}>
              {t.pickOne}
            </div>
            <strong className="text-[1.18rem] max-[650px]:text-[1.06rem] block text-[#fff8ee]" lang={locale}>
              {t.choose}
            </strong>
            <p className="text-[#e7d4cc] text-[0.76rem] max-[650px]:text-[0.72rem]" lang={locale}>
              {t.chooseHint}
            </p>
          </div>
          <span
            className="w-12 h-12 max-[650px]:w-10 max-[650px]:h-10 grid place-items-center border-2 border-[#e4c17e] rounded-full text-[1.5rem] text-[#f3dbac] shrink-0"
            aria-hidden="true"
          >
            ?
          </span>
        </div>

        <div
          id="question-grid"
          className="grid grid-cols-12 max-[650px]:grid-cols-2 gap-[12px] max-[650px]:gap-[9px]"
          aria-label={t.choose}
        >
          {groups.map((g, i) => {
            const isVisited = visited.has(i);
            const title = t.questions[i];
            return (
              <button
                key={g.key}
                type="button"
                aria-label={title}
                style={{ '--stagger-i': i }}
                onPointerDown={triggerRipple}
                onClick={() => onOpenTopic(i)}
                className={`question-card question-card-stagger qtopic-${i} min-h-[158px] min-[1500px]:min-h-[180px] max-[1100px]:min-h-[144px] max-[650px]:min-h-[164px] max-[360px]:min-h-[170px] text-left rounded-[22px] max-[650px]:rounded-[16px] py-[19px] px-[22px] max-[650px]:py-[13px] max-[650px]:px-[13px] flex flex-col gap-[9px] max-[650px]:gap-[10px] relative isolate overflow-hidden text-[#2d1014] ${
                  isVisited ? 'visited' : ''
                }`}
              >
                <div className="flex justify-between gap-3 items-start relative z-[1]">
                  <span className="font-serif font-bold text-[0.78rem] max-[650px]:text-[0.62rem] text-[#662931] tracking-[0.12em]">
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <span className="text-[1.75rem] max-[650px]:text-[1.2rem] text-[#78212b]" aria-hidden="true">
                    {QUESTION_ICONS[i]}
                  </span>
                </div>

                <span
                  lang={locale}
                  className="text-[clamp(1.02rem,1.3vw,1.28rem)] max-[650px]:text-[clamp(.93rem,3.5vw,1.1rem)] font-black leading-[1.38] max-[650px]:leading-[1.45] max-w-[27ch] max-[650px]:max-w-[19ch] [text-wrap:pretty] line-clamp-3 relative z-[1]"
                >
                  {title}
                </span>

                <img
                  className="qphoto absolute -right-[2px] top-0 w-[35%] h-full object-cover object-center opacity-[0.72] -z-[1] pointer-events-none"
                  src={media[String(g.gallery[0])].small}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                {isVisited ? (
                  <span
                    className="text-[#781f2a] text-[0.78rem] font-extrabold mt-auto self-start min-h-[26px] relative z-[1]"
                    lang={locale}
                  >
                    ✓ {t.already}
                  </span>
                ) : (
                  <span className="bg-[#63161f] text-[#fff5d9] rounded-full w-[32px] h-[32px] max-[650px]:w-[28px] max-[650px]:h-[28px] grid place-items-center text-[1.2rem] mt-auto self-start min-h-[26px] relative z-[1]">
                    ↗
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between gap-[15px] pt-[17px] px-[5px] pb-[1px] items-center text-[#eddcd4] text-[0.86rem] max-[650px]:text-[0.74rem]">
          <span id="explore-count" role="status" lang={locale}>
            {visited.size} / 6 {t.discovered}
          </span>
          <div className="h-[11px] w-[180px] rounded-[10px] bg-[#ffffff25] overflow-hidden" aria-hidden="true">
            <div
              id="explore-progress"
              className="bg-[#e6c177] h-full transition-[width] duration-200"
              style={{ width: `${(visited.size / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
