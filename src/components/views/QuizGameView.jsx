import React from 'react';
import { triggerRipple } from '../../utils/ripple';

export default function QuizGameView({
  locale,
  t,
  quiz,
  qIndex,
  choice,
  answered,
  score,
  onBackToGames,
  onStartQuizQuestions,
  onSelectChoice,
  onCheckAnswer,
  onNextQuizQuestion,
  onOpenRelatedTopic,
}) {
  const localizedQuiz = quiz.locales[locale] || quiz.locales.en;
  const questions = localizedQuiz.questions;

  const renderShellContent = () => {
    if (qIndex < 0) {
      return (
        <div className="passage-reveal">
          <div className="text-[#854634] text-[0.78rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]" lang={locale}>
            {t.quizDraftLabel}
          </div>
          <h3 className="text-[1.48rem] leading-[1.45] mt-3 mb-4 font-bold" lang={locale}>
            {t.quizStartHeading}
          </h3>
          <p className="text-[#59242b] text-[1.02rem]" lang={locale}>
            {t.quizStartDesc}
          </p>
          <button
            type="button"
            onPointerDown={triggerRipple}
            onClick={onStartQuizQuestions}
            className="relative overflow-hidden mt-7 min-h-[64px] rounded-[18px] py-[12px] px-[28px] text-[1.04rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.96] text-white transition-transform"
          >
            <span lang={locale}>{t.quizStartBtn}</span>
          </button>
        </div>
      );
    }

    if (qIndex >= questions.length) {
      return (
        <div className="passage-reveal">
          <div className="text-[#854634] text-[0.78rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]" lang={locale}>
            {t.quizCompleteLabel}
          </div>
          <h3 className="text-[1.48rem] leading-[1.48] mt-3 mb-4 font-bold" lang={locale}>
            {t.result}
          </h3>
          <div className="score-pop text-[4.6rem] leading-[1.15] text-[#63161f] font-black mt-[10px] mb-5">
            {score} / {questions.length}
          </div>
          <p className="text-[#59242b]" lang={locale}>
            {t.quizResultNote}
          </p>
          <button
            type="button"
            onPointerDown={triggerRipple}
            onClick={onStartQuizQuestions}
            className="relative overflow-hidden mt-[24px] min-h-[64px] rounded-[18px] py-[12px] px-[28px] text-[1.04rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.96] text-white transition-transform"
          >
            <span lang={locale}>{t.retry}</span> ↻
          </button>
        </div>
      );
    }

    const q = questions[qIndex];
    const progressValue = qIndex + (answered ? 1 : 0);
    const matched = q.choices.find((ch) => ch.id === q.correctChoiceId);
    const isCorrect = choice === q.correctChoiceId;

    return (
      <div key={q.id} className="passage-reveal">
        <div className="text-[#854634] text-[0.8rem] tracking-[0.12em] font-extrabold uppercase mb-[9px]" lang={locale}>
          {t.number} {qIndex + 1} / {questions.length}
        </div>

        <div
          className="h-2.5 bg-[#eadfd0] rounded-full overflow-hidden mt-[15px] mb-6"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={progressValue}
        >
          <div
            className="h-full bg-[#63161f] transition-[width] duration-300 ease-out"
            style={{ width: `${(progressValue / questions.length) * 100}%` }}
          />
        </div>

        <h3 id="active-question" className="text-[1.45rem] leading-[1.48] mt-3 mb-5 font-bold" lang={locale}>
          {q.question}
        </h3>

        <fieldset className="border-0 p-0 m-0 grid gap-[12px]">
          <legend className="sr-only">{t.chooseOneLegend}</legend>
          {q.choices.map((a) => (
            <label
              key={a.id}
              onPointerDown={triggerRipple}
              className="answer-option relative overflow-hidden min-h-[64px] flex gap-[14px] items-center py-[14px] px-5 border-2 border-[#d3beb0] rounded-[16px] cursor-pointer bg-white"
            >
              <input
                type="radio"
                name="quiz-answer"
                value={a.id}
                checked={choice === a.id}
                disabled={answered}
                onChange={() => onSelectChoice(a.id)}
                className="w-[22px] h-[22px] accent-[#63161f] flex-none"
              />
              <span className="text-[1.04rem] font-semibold" lang={locale}>
                {a.text}
              </span>
            </label>
          ))}
        </fieldset>

        {answered && (
          <div
            role="status"
            lang={locale}
            className={`passage-reveal p-4 rounded-[16px] mt-4 grid gap-[6px] border ${
              isCorrect
                ? 'bg-[#e9f2e6] text-[#1f472d] border-[#a5c69d]'
                : 'bg-[#fbe4df] text-[#781f26] border-[#dfb0a7]'
            }`}
          >
            <strong>
              {isCorrect ? t.right : t.wrong} · {t.correctAnswer} {matched?.text}
            </strong>
            <span className="text-[0.96rem]">{q.explanation}</span>
            <small className="text-[0.78rem] opacity-85">
              {t.sourceRef} #{q.sourceParagraphIndex + 1}
            </small>
          </div>
        )}

        <div className="flex gap-[12px] flex-wrap mt-[24px]">
          {!answered ? (
            <button
              type="button"
              disabled={!choice}
              onPointerDown={triggerRipple}
              onClick={onCheckAnswer}
              className="relative overflow-hidden min-h-[64px] rounded-[18px] py-[12px] px-[28px] text-[1.02rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.96] text-white transition-transform"
            >
              <span lang={locale}>{t.check}</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onPointerDown={triggerRipple}
                onClick={onNextQuizQuestion}
                className="relative overflow-hidden min-h-[64px] rounded-[18px] py-[12px] px-[28px] text-[1.02rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-[#63161f] hover:bg-[#7b1d28] active:scale-[0.96] text-white transition-transform"
              >
                <span lang={locale}>
                  {qIndex === questions.length - 1 ? `${t.seeScore} →` : `${t.next} →`}
                </span>
              </button>
              <button
                type="button"
                onPointerDown={triggerRipple}
                onClick={() => onOpenRelatedTopic(q.relatedTopicKey)}
                className="relative overflow-hidden min-h-[64px] rounded-[18px] py-[12px] px-[24px] text-[0.98rem] font-extrabold inline-flex gap-[10px] items-center justify-center bg-transparent hover:bg-[#f5e7dc] active:scale-[0.96] text-[#59151d] border-2 border-[#a87c71] transition-transform"
              >
                <span lang={locale}>{t.relatedReading}</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="view-quiz"
      className="pt-[35px] max-[650px]:pt-[10px] select-none"
      aria-labelledby="quiz-view-title"
    >
      <button
        type="button"
        onPointerDown={triggerRipple}
        onClick={onBackToGames}
        className="relative overflow-hidden border border-[#e6c17777] bg-[#4e141c55] hover:bg-[#6a1b2688] active:scale-[0.96] text-[#fff8ee] rounded-[15px] py-[10px] px-[20px] min-h-[54px] font-extrabold mb-6 transition-transform"
      >
        ← <span lang={locale}>{t.allGames}</span>
      </button>

      <div className="grid grid-cols-[minmax(270px,0.77fr)_minmax(420px,1.23fr)] max-[1130px]:grid-cols-[1fr_1.28fr] max-[760px]:grid-cols-1 gap-[clamp(35px,6vw,90px)] max-[1130px]:gap-5 items-start">
        <div>
          <div className="overline" lang={locale}>
            {t.quizGameLabel}
          </div>
          <h2 id="quiz-view-title" className="mt-[17px] mb-[22px] max-[760px]:text-[2.35rem] font-bold text-[#fffaf0]" lang={locale}>
            {t.quizTitle}
          </h2>
          <p className="text-[#f0dfd7] text-[1.04rem]" lang={locale}>
            {t.quizSide}
          </p>
          <div className="flex flex-wrap gap-[11px] mt-7">
            <span className="inline-flex gap-[9px] items-center py-[10px] px-[16px] border border-[var(--stroke)] rounded-[40px] text-[#f5e7d9] text-[0.82rem] font-bold bg-[#ffffff0c]">
              <span lang={locale}>{t.fourQuestions}</span>
            </span>
            <span className="inline-flex gap-[9px] items-center py-[10px] px-[16px] border border-[var(--stroke)] rounded-[40px] text-[#f5e7d9] text-[0.82rem] font-bold bg-[#ffffff0c]">
              ✣ <span lang={locale}>{t.sourceGame}</span>
            </span>
          </div>
        </div>

        <div
          id="quiz-content"
          className="bg-[#fffaf1] text-[#2d1014] rounded-[28px] shadow-museum p-[clamp(20px,3.7vw,42px)] max-[760px]:p-[22px] max-[410px]:p-[17px] min-h-[420px] max-[760px]:min-h-0"
        >
          {renderShellContent()}
        </div>
      </div>
    </section>
  );
}
