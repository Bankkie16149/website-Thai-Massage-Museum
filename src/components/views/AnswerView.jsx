import React, { useEffect, useState } from 'react';
import { triggerRipple } from '../../utils/ripple';

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
  fontScale,
  answerTitleRef,
  onBack,
  onToggleExpand,
  onToggleFontScale,
  onNextQuestion,
  onGoGames,
}) {
  const g = groups[topic];
  const gallery = g.gallery;
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setPhotoIndex(0);
  }, [topic]);

  const activeImgId = gallery[photoIndex] ?? gallery[0];

  const handlePrevPhoto = () => {
    setPhotoIndex((idx) => (idx - 1 + gallery.length) % gallery.length);
  };

  const handleNextPhoto = () => {
    setPhotoIndex((idx) => (idx + 1) % gallery.length);
  };

  return (
    <section
      id="view-answer"
      className="answer pt-[32px] max-[650px]:pt-[10px]"
      aria-labelledby="answer-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 select-none">
        <button
          type="button"
          id="answer-back"
          onPointerDown={triggerRipple}
          onClick={onBack}
          className="relative overflow-hidden border border-[#e6c17777] text-[#fff8ee] bg-[#4e141c55] hover:bg-[#6a1b2688] active:scale-[0.96] rounded-[15px] min-h-[54px] py-[10px] px-[20px] font-extrabold transition-transform"
        >
          ← <span lang={locale}>{t.allQuestions}</span>
        </button>

        {/* Kiosk Text Size Toggle */}
        <div className="flex items-center gap-2 bg-[#190609aa] border border-[#e6c17745] rounded-[16px] p-1.5">
          <span className="text-[0.76rem] font-bold text-[#e6d2c7] px-2 max-[500px]:hidden" lang={locale}>
            {t.textSizeLabel}
          </span>
          <button
            type="button"
            onClick={() => onToggleFontScale('normal')}
            aria-pressed={fontScale === 'normal' ? 'true' : 'false'}
            className={`min-h-[44px] px-3.5 rounded-[12px] text-[0.86rem] font-extrabold transition-colors ${
              fontScale === 'normal'
                ? 'bg-[#e6c177] text-[#2b0a0f]'
                : 'bg-transparent text-[#f7efe2] hover:bg-[#ffffff14]'
            }`}
          >
            {t.textNormal}
          </button>
          <button
            type="button"
            onClick={() => onToggleFontScale('large')}
            aria-pressed={fontScale === 'large' ? 'true' : 'false'}
            className={`min-h-[44px] px-3.5 rounded-[12px] text-[0.94rem] font-extrabold transition-colors ${
              fontScale === 'large'
                ? 'bg-[#e6c177] text-[#2b0a0f]'
                : 'bg-transparent text-[#f7efe2] hover:bg-[#ffffff14]'
            }`}
          >
            {t.textLarge}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.13fr)_minmax(330px,0.87fr)] max-[1130px]:gap-[25px] max-[760px]:grid-cols-1 max-[760px]:gap-6 gap-[46px] items-start pt-[28px] max-[760px]:pt-[14px] pb-[10px]">
        <div>
          <div className="overline" id="answer-overline" lang={locale}>
            {t.discoveryPrefix} / {String(topic + 1).padStart(2, '0')} — 06
          </div>

          <p
            className="text-[#ecc37b] text-[1.06rem] font-extrabold leading-[1.6] mt-[15px]"
            id="answer-question"
            lang={locale}
          >
            {t.questions[topic]}
          </p>

          <h2
            ref={answerTitleRef}
            id="answer-title"
            tabIndex={-1}
            lang={locale}
            className="mt-[18px] mb-[22px] max-[760px]:text-[2rem] max-[760px]:my-4 font-bold text-[#fffaf0]"
          >
            {t.shortTitles[topic]}
          </h2>

          <div
            className="mt-5 bg-[#faf1e3] rounded-[28px] p-[clamp(24px,3.3vw,44px)] max-[760px]:p-[22px] text-[#2d1014] shadow-museum"
            id="answer-text"
            aria-live="polite"
            lang={locale}
          >
            {g.readingIndexes.map((n, j) => {
              if (j > 0 && !isExpanded) return null;
              return (
                <p
                  key={n}
                  className={`${
                    j > 0 ? 'passage-reveal ' : ''
                  }${
                    fontScale === 'large'
                      ? 'text-[clamp(1.18rem,1.45vw,1.35rem)] leading-[1.95]'
                      : 'text-[clamp(1.01rem,1.22vw,1.14rem)] leading-[1.92]'
                  } mb-[16px] last:mb-0 whitespace-pre-wrap transition-[font-size] duration-200`}
                >
                  {paras[n]}
                </p>
              );
            })}

            {g.readingIndexes.length > 1 && (
              <button
                type="button"
                onPointerDown={triggerRipple}
                onClick={onToggleExpand}
                aria-expanded={isExpanded ? 'true' : 'false'}
                className="relative overflow-hidden mt-[6px] mb-[16px] min-h-[62px] w-full border-2 border-[#b57c70] rounded-[16px] bg-[#f2e2d4] hover:bg-[#ead2be] active:scale-[0.98] text-[#59151d] py-[12px] px-[18px] text-[1.04rem] font-black transition-all select-none focus-visible:outline-[#63161f]"
              >
                {isExpanded ? t.readLess : t.readMore}
              </button>
            )}

            <p className="border-t border-[#e0cdb8] pt-[14px] mt-5 text-[0.8rem] text-[#662931]" lang={locale}>
              {source.sourceFilename} · {t.originalTextNote}
            </p>
          </div>

          <div className="mt-[22px] flex gap-[12px] flex-wrap select-none">
            <button
              type="button"
              id="next-question"
              onPointerDown={triggerRipple}
              onClick={onNextQuestion}
              className="relative overflow-hidden min-h-[64px] max-[650px]:min-h-[56px] rounded-[18px] max-[650px]:rounded-[14px] py-[12px] px-[26px] text-[1rem] max-[650px]:text-[0.88rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#e6c177] hover:bg-[#f0d69d] active:scale-[0.96] text-[#2b0a0f] transition-transform"
            >
              <span lang={locale}>{t.nextQuestion}</span> →
            </button>

            <button
              type="button"
              onPointerDown={triggerRipple}
              onClick={onGoGames}
              className="relative overflow-hidden min-h-[64px] max-[650px]:min-h-[56px] rounded-[18px] max-[650px]:rounded-[14px] py-[12px] px-[26px] text-[1rem] max-[650px]:text-[0.88rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#4e141c55] hover:bg-[#6a1b2688] active:scale-[0.96] text-[#fff8ee] border border-[#e6c17766] transition-transform"
            >
              <span lang={locale}>{t.games}</span> ↗
            </button>
          </div>

          <div className="flex justify-between items-center mt-[25px] gap-3 border-t border-[var(--stroke)] pt-[18px] text-[#f0decb] text-[0.88rem] select-none">
            <span id="answer-count" lang={locale}>
              {visited.size} / 6 {t.discovered}
            </span>
            <div className="flex gap-[8px]" id="discovery-dots" aria-hidden="true">
              {groups.map((_, n) => (
                <i
                  key={n}
                  className={`block w-[14px] h-[14px] border border-[#e6c17799] rounded-full ${
                    visited.has(n) ? 'bg-[#e6c177]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Exhibition Gallery Frame (supports all photos in g.gallery) */}
        <div className="sticky top-[22px] max-[760px]:static select-none">
          <div className="rounded-[28px] overflow-hidden border-[8px] border-[#d8b67b] h-[min(58vh,520px)] min-h-[340px] max-[760px]:h-[290px] max-[760px]:min-h-0 max-[760px]:max-w-[540px] bg-[#3a1016] relative">
            <img
              key={activeImgId}
              id="answer-image"
              src={media[String(activeImgId)].large}
              alt={`${t.imageLabel} ${activeImgId}`}
              decoding="async"
              className="gallery-photo-enter w-full h-full object-cover object-center"
            />

            {gallery.length > 1 && (
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label={t.prevPhoto}
                  className="min-w-[52px] min-h-[52px] rounded-full bg-[#190609cc] hover:bg-[#63161f] active:scale-[0.94] text-[#fff8ee] border border-[#e6c17780] grid place-items-center text-[1.35rem] backdrop-blur-sm transition-transform"
                >
                  ‹
                </button>
                <span
                  className="py-1.5 px-4 rounded-full bg-[#190609cc] text-[#f7ebd4] text-[0.82rem] font-extrabold border border-[#e6c17755] backdrop-blur-sm"
                  lang={locale}
                >
                  {t.photoOf} {photoIndex + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label={t.nextPhoto}
                  className="min-w-[52px] min-h-[52px] rounded-full bg-[#190609cc] hover:bg-[#63161f] active:scale-[0.94] text-[#fff8ee] border border-[#e6c17780] grid place-items-center text-[1.35rem] backdrop-blur-sm transition-transform"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" role="group" aria-label={t.imageLabel}>
              {gallery.map((imgId, idx) => {
                const active = idx === photoIndex;
                return (
                  <button
                    key={imgId}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    aria-label={`${t.photoOf} ${idx + 1}`}
                    aria-pressed={active ? 'true' : 'false'}
                    className={`w-[72px] h-[58px] rounded-[12px] overflow-hidden border-2 shrink-0 transition-transform active:scale-[0.96] ${
                      active
                        ? 'border-[#e6c177] ring-2 ring-[#e6c17755]'
                        : 'border-[#ffffff33] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={media[String(imgId)].small}
                      alt=""
                      className="w-full h-full object-cover"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          )}

          <p className="text-[#e6d2c7] text-[0.78rem] mt-[12px]" id="image-source-note" lang={locale}>
            {t.sourceNote} · #{activeImgId}
          </p>
        </div>
      </div>
    </section>
  );
}
