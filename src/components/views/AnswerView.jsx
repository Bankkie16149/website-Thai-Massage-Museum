import React from 'react';
import { COPY } from '../../data/copyData';

export default function AnswerView({
  locale,
  t,
  source,
  paras,
  groups,
  topic,
  media,
  visited,
  isExpanded,
  answerTitleRef,
  onBack,
  onToggleExpand,
  onNextQuestion,
  onGoGames,
}) {
  const g = groups[topic];
  const copyLang = locale === 'th' || locale === 'en' ? locale : 'en';
  const questionTitle = (i) => t.questions[i] || COPY.en.questions[i];

  const headingText = (() => {
    if (locale === 'th' || locale === 'en') {
      return t.shortTitles[topic];
    }
    const raw = paras[g.headingIndex] || '';
    const chars = Array.from(raw);
    return chars.length > 68 ? chars.slice(0, 68).join('') + '…' : raw;
  })();

  const imgId = g.gallery[0];

  return (
    <section
      id="view-answer"
      className="answer pt-[35px] max-[650px]:pt-[10px]"
      aria-labelledby="answer-title"
    >
      <button
        type="button"
        id="answer-back"
        onClick={onBack}
        className="border border-[#ffffff50] text-[#f2e9d7] bg-transparent hover:bg-[#ffffff13] rounded-[13px] min-h-[45px] py-[7px] px-[15px] font-extrabold"
      >
        ← <span lang={copyLang}>{t.allQuestions}</span>
      </button>

      <div className="grid grid-cols-[minmax(0,1.13fr)_minmax(330px,0.87fr)] max-[1130px]:gap-[25px] max-[760px]:grid-cols-1 max-[760px]:gap-5 gap-[46px] items-start pt-[30px] max-[760px]:pt-[13px] pb-[10px]">
        <div>
          <div className="overline" id="answer-overline">
            DISCOVERY / {String(topic + 1).padStart(2, '0')} — 06
          </div>

          <p className="text-[#e7ce9f] text-[1.02rem] font-extrabold leading-[1.6] mt-[17px]" id="answer-question">
            {questionTitle(topic)}
          </p>

          <h2
            ref={answerTitleRef}
            id="answer-title"
            tabIndex={-1}
            className="mt-[22px] mb-[25px] max-[760px]:text-[2rem] max-[760px]:my-4 font-bold"
          >
            {headingText}
          </h2>

          <div
            className="mt-5 bg-[#f9f1df] rounded-[28px] p-[clamp(24px,3.3vw,44px)] max-[760px]:p-[22px] text-[#223b32] shadow-museum"
            id="answer-text"
            aria-live="polite"
          >
            {g.readingIndexes.map((n, j) => {
              if (j > 0 && !isExpanded) return null;
              return (
                <p
                  key={n}
                  className="text-[clamp(.99rem,1.2vw,1.1rem)] leading-[1.94] mb-[15px] last:mb-0 whitespace-pre-wrap"
                >
                  {paras[n]}
                </p>
              );
            })}

            {g.readingIndexes.length > 1 && (
              <button
                type="button"
                onClick={onToggleExpand}
                aria-expanded={isExpanded ? 'true' : 'false'}
                className="mt-[5px] mb-[14px] min-h-[59px] max-[650px]:min-h-[60px] w-full border-2 border-[#9caa8d] rounded-[15px] bg-[#e5ead9] hover:bg-[#d3dfc6] text-[#204a3d] py-[12px] px-[18px] text-[1rem] max-[650px]:text-[1.06rem] font-black transition-colors focus-visible:outline-[#1e5547]"
              >
                {isExpanded ? t.readLess : t.readMore}
              </button>
            )}

            <p
              className="border-t border-[#ddd3bd] pt-[14px] mt-5 text-[0.77rem] text-[#455f52]"
              lang={locale === 'th' ? 'th' : 'en'}
            >
              {source.sourceFilename} ·{' '}
              {locale === 'th' ? 'ข้อความจากเอกสารต้นฉบับ' : 'Original text from provided document'}
            </p>
          </div>

          <div className="mt-[22px] flex gap-[10px] flex-wrap">
            <button
              type="button"
              id="next-question"
              onClick={onNextQuestion}
              className="min-h-[61px] max-[650px]:min-h-[54px] rounded-[18px] max-[650px]:rounded-[14px] py-[11px] px-[25px] max-[650px]:py-[10px] max-[650px]:px-[14px] text-[0.96rem] max-[650px]:text-[0.84rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#e6c177] hover:bg-[#f0d69d] text-[#20392f] transition-transform hover:-translate-y-0.5"
            >
              <span lang={copyLang}>{t.nextQuestion}</span> →
            </button>

            <button
              type="button"
              onClick={onGoGames}
              className="min-h-[61px] max-[650px]:min-h-[54px] rounded-[18px] max-[650px]:rounded-[14px] py-[11px] px-[25px] max-[650px]:py-[10px] max-[650px]:px-[14px] text-[0.96rem] max-[650px]:text-[0.84rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-transparent hover:bg-[#ffffff13] text-[#f7f1e5] border border-[#e6e1cc63] transition-transform hover:-translate-y-0.5"
            >
              <span lang={copyLang}>{t.games}</span> ↗
            </button>
          </div>

          <div className="flex justify-between items-center mt-[25px] gap-3 border-t border-[var(--stroke)] pt-[18px] text-[#e3d7bc] text-[0.86rem]">
            <span id="answer-count">
              {visited.size} / 6 {t.discovered}
            </span>
            <div className="flex gap-[7px]" id="discovery-dots" aria-hidden="true">
              {groups.map((_, n) => (
                <i
                  key={n}
                  className={`block w-[13px] h-[13px] border border-[#e5dcbb8c] rounded-full ${
                    visited.has(n) ? 'bg-[#e2be7d]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-[22px] max-[760px]:static">
          <div className="rounded-[28px] overflow-hidden border-[9px] border-[#d1be8e] h-[min(62vh,560px)] min-h-[360px] max-[760px]:h-[260px] max-[760px]:min-h-0 max-[760px]:max-w-[520px] bg-[#5b685c]">
            <img
              id="answer-image"
              src={media[String(imgId)].large}
              alt={(locale === 'th' ? 'ภาพหมายเลข ' : 'Source document image ') + imgId}
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="text-[#c8d4c9] text-[0.76rem] mt-[13px]" id="image-source-note">
            {t.sourceNote} · #{imgId}
          </p>
        </div>
      </div>
    </section>
  );
}
