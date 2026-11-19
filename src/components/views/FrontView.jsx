import React from 'react';
import { COPY, QUESTION_ICONS } from '../../data/copyData';

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
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';
  const questionTitle = (i) => t.questions[i] || COPY.en.questions[i];

  const sourceQuestionLabel = (i) => {
    if (locale === 'th' || locale === 'en') return questionTitle(i);
    const chars = Array.from(paras[groups[i].headingIndex] || '');
    return chars.length > 61 ? chars.slice(0, 61).join('') + '…' : chars.join('');
  };

  return (
    <section
      id="view-front"
      className="grid grid-cols-[minmax(310px,0.8fr)_minmax(0,1.4fr)] max-[1100px]:grid-cols-1 gap-[clamp(25px,3.4vw,60px)] max-[1100px]:gap-[28px] max-[650px]:gap-[22px] items-center"
      aria-labelledby="front-head"
    >
      <div className="relative pt-[3px] min-w-0 isolate max-[1100px]:max-w-full max-[650px]:pt-[3px] max-[650px]:px-[5px]">
        <span
          className="absolute -top-[55px] -left-[20px] -z-[1] font-serif text-[clamp(250px,29vw,425px)] leading-none text-[#d5c3960d] -rotate-[15deg] pointer-events-none"
          aria-hidden="true"
        >
          ?
        </span>

        <div className="overline" lang={copyLang}>
          {t.welcome}
        </div>

        <h1
          ref={frontHeadRef}
          id="front-head"
          tabIndex={-1}
          className="text-[clamp(2.6rem,4.1vw,5.8rem)] max-[650px]:text-[clamp(2.2rem,9vw,3.7rem)] mt-[12px] mb-[19px] max-[650px]:my-[13px] max-w-[16ch] max-[1100px]:max-w-[22ch] leading-[1.15] max-[650px]:leading-[1.12]"
        >
          <span lang={copyLang}>{t.headlineA}</span>
          <br />
          <em className="not-italic text-[#ecc37b] inline-block drop-shadow-[0_8px_34px_#e6b56536]" lang={copyLang}>
            {t.headlineB}
          </em>
        </h1>

        <p
          className="text-[clamp(.95rem,1.18vw,1.18rem)] max-[650px]:text-[0.94rem] leading-[1.82] max-[650px]:leading-[1.66] max-w-[43ch] text-[#e0e9dd]"
          lang={copyLang}
        >
          {t.intro}
        </p>

        <p className="text-[#b2c4b6] text-[0.72rem] opacity-70 max-w-[58ch] mt-4 max-[650px]:mt-[10px] leading-[1.6]" id="source-title">
          {paras[0]}
        </p>

        <div className="flex gap-[11px] flex-wrap mt-[23px] max-[650px]:mt-[15px]">
          <button
            type="button"
            id="surprise"
            onClick={onSurprise}
            className="min-h-[61px] max-[650px]:min-h-[54px] rounded-[18px] max-[650px]:rounded-[14px] py-[11px] px-[25px] max-[650px]:py-[10px] max-[650px]:px-[14px] text-[0.96rem] max-[650px]:text-[0.84rem] font-extrabold inline-flex gap-[10px] items-center justify-center text-center bg-[#e6c177] hover:bg-[#f0d69d] text-[#20392f] border border-transparent transition-transform hover:-translate-y-0.5"
          >
            ✧ <span lang={copyLang}>{t.surprise}</span> <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            onClick={onGoGames}
            className="min-h-[61px] max-[650px]:min-h-[54px] rounded-[18px] max-[650px]:rounded-[14px] py-[11px] px-[25px] max-[650px]:py-[10px] max-[650px]:px-[14px] text-[0.96rem] max-[650px]:text-[0.84rem] font-extrabold inline-flex gap-[10px] items-center justify-center text-center bg-transparent hover:bg-[#ffffff13] text-[#f7f1e5] border border-[#e6e1cc63] transition-transform hover:-translate-y-0.5"
          >
            <span lang={copyLang}>{t.play}</span> →
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
            className="w-[160px] h-[133px] object-cover object-[50%_48%] border-[5px] border-[#d7bc80] shadow-[0_18px_34px_#0007] -rotate-[5deg] rounded-[23px_85px_28px_27px]"
          />
          <div className="text-[0.73rem] leading-[1.53] text-[#cfdbce] max-w-[225px]">
            <strong className="text-[#f3d89d] block mb-[3px] text-[0.8rem]" lang={copyLang}>
              {t.photoTitle}
            </strong>
            <span lang={copyLang}>{t.photoCaption}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute right-0 -top-[13px] text-[#d5c48f] font-serif text-[0.77rem] tracking-[0.15em]" aria-hidden="true">
          02 / EXPLORE
        </div>

        <div className="px-[6px] pb-[12px] max-[650px]:pb-[14px] flex gap-4 max-[650px]:gap-1 justify-between items-center">
          <div>
            <div className="overline" lang={copyLang}>
              {t.pickOne}
            </div>
            <strong className="text-[1.14rem] max-[650px]:text-[1.05rem] block" lang={copyLang}>
              {t.choose}
            </strong>
            <p className="text-[#cfdfd0] text-[0.73rem] max-[650px]:text-[0.72rem]" lang={copyLang}>
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
          className="grid grid-cols-12 max-[650px]:grid-cols-2 gap-[11px] max-[650px]:gap-[8px]"
          aria-label="Choose a museum question"
        >
          {groups.map((g, i) => {
            const isVisited = visited.has(i);
            return (
              <button
                key={g.key}
                type="button"
                aria-label={questionTitle(i)}
                onClick={() => onOpenTopic(i)}
                className={`question-card qtopic-${i} min-h-[151px] min-[1500px]:min-h-[175px] max-[1100px]:min-h-[138px] max-[650px]:min-h-[160px] max-[360px]:min-h-[166px] text-left rounded-[21px] max-[650px]:rounded-[16px] py-[18px] px-[22px] max-[650px]:py-[12px] max-[650px]:px-[13px] flex flex-col gap-[9px] max-[650px]:gap-[10px] relative isolate overflow-hidden text-[#21392f] ${
                  isVisited ? 'visited' : ''
                }`}
              >
                <div className="flex justify-between gap-3 items-start relative z-[1]">
                  <span className="font-serif font-bold text-[0.77rem] max-[650px]:text-[0.59rem] text-[#365946] tracking-[0.12em]">
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <span className="text-[1.7rem] max-[650px]:text-[1.16rem] text-[#376955]" aria-hidden="true">
                    {QUESTION_ICONS[i]}
                  </span>
                </div>

                <span
                  lang={locale}
                  className="text-[clamp(1rem,1.28vw,1.26rem)] max-[650px]:text-[clamp(.93rem,3.5vw,1.1rem)] font-black leading-[1.38] max-[650px]:leading-[1.45] max-w-[27ch] max-[650px]:max-w-[19ch] [text-wrap:pretty] line-clamp-3 relative z-[1]"
                >
                  {sourceQuestionLabel(i)}
                </span>

                {locale !== 'th' && locale !== 'en' && (
                  <small className="text-[#365946] text-[0.72rem] max-[650px]:text-[0.57rem] leading-[1.25] max-w-[75%] max-[650px]:max-w-[98%] line-clamp-1 relative z-[1]">
                    {questionTitle(i)}
                  </small>
                )}

                <img
                  className="qphoto absolute -right-[2px] top-0 w-[35%] h-full object-cover object-center opacity-[0.72] -z-[1] pointer-events-none"
                  src={media[String(g.gallery[0])].small}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                {isVisited ? (
                  <span className="text-[#326145] text-[0.73rem] font-extrabold mt-auto self-start min-h-[23px] relative z-[1]">
                    ✓ {t.already}
                  </span>
                ) : (
                  <span className="bg-[#19463f] text-[#fff5d9] rounded-full w-[29px] h-[29px] max-[650px]:w-[25px] max-[650px]:h-[25px] grid place-items-center text-[1.2rem] mt-auto self-start min-h-[23px] relative z-[1]">
                    ↗
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between gap-[15px] pt-[17px] px-[5px] pb-[1px] items-center text-[#d6e1d3] text-[0.82rem] max-[650px]:text-[0.69rem]">
          <span id="explore-count" role="status">
            {visited.size} / 6 {t.discovered}
          </span>
          <div className="h-[10px] w-[170px] rounded-[10px] bg-[#ffffff25] overflow-hidden" aria-hidden="true">
            <div
              id="explore-progress"
              className="bg-[#e3c485] h-full transition-[width] duration-200"
              style={{ width: `${(visited.size / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
