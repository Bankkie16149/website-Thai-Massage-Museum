import React, { useCallback, useEffect, useRef, useState } from 'react';
import sourceData from './data/sourceData.json';
import quizData from './data/quizData.json';
import imagesData from './data/imagesData.json';
import { COPY } from './data/copyData';
import TopHeader from './components/TopHeader';
import FallbackBanner from './components/FallbackBanner';
import LanguageDialog from './components/LanguageDialog';
import LanguageStage from './components/LanguageStage';
import BottomRail from './components/BottomRail';
import FrontView from './components/views/FrontView';
import AnswerView from './components/views/AnswerView';
import GamesMenuView from './components/views/GamesMenuView';
import TimelineGameView from './components/views/TimelineGameView';
import QuizGameView from './components/views/QuizGameView';

const groups = sourceData.technicalReadingGroups;

export default function App() {
  const [locale, setLocale] = useState('th');
  const [mode, setMode] = useState('front');
  const [topic, setTopic] = useState(0);
  const [visited, setVisited] = useState(() => new Set());
  const [expandedTopics, setExpandedTopics] = useState(() => new Set());
  const [languageChosen, setLanguageChosen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

  // Timeline game state
  const [stamps, setStamps] = useState([]);
  const [misses, setMisses] = useState(0);
  const [timelineStatus, setTimelineStatus] = useState('ready'); // 'ready' | 'good' | 'wrong' | 'win'

  // Quiz game state
  const [qIndex, setQIndex] = useState(-1);
  const [choice, setChoice] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const frontHeadRef = useRef(null);
  const answerTitleRef = useRef(null);

  const source = sourceData.locales[locale] || sourceData.locales.th;
  const paras = source.paragraphs;
  const t = COPY[locale] || COPY.en;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${source.title} · Interactive Museum Explorer`;
  }, [locale, source.title]);

  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  useEffect(() => {
    document.body.classList.toggle('language-chosen', languageChosen);
  }, [languageChosen]);

  const showView = useCallback((nextMode, scroll = true) => {
    setMode(nextMode);
    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const openTopic = useCallback(
    (i) => {
      setTopic(i);
      setVisited((prev) => {
        const next = new Set(prev);
        next.add(i);
        return next;
      });
      showView('answer');
      requestAnimationFrame(() => {
        answerTitleRef.current?.focus({ preventScroll: true });
      });
    },
    [showView]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.matches('input,select,textarea') || languageDialogOpen) return;
      if (mode === 'front' && /^[1-6]$/.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        openTopic(Number(e.key) - 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mode, languageDialogOpen, openTopic]);

  const resetTimeline = useCallback(() => {
    setStamps([]);
    setMisses(0);
    setTimelineStatus('ready');
  }, []);

  const handleSelectLocale = useCallback(
    (newLocale, { fromInteractiveTile = false } = {}) => {
      if (!sourceData.locales[newLocale]) return;
      if (fromInteractiveTile) {
        setLanguageChosen(true);
      }
      setLocale(newLocale);
      setLanguageDialogOpen(false);

      if (mode === 'timeline') {
        resetTimeline();
      } else if (mode === 'quiz') {
        setQIndex(-1);
        setScore(0);
        setAnswered(false);
        setChoice(null);
      }

      if (fromInteractiveTile && mode === 'front' && window.matchMedia('(max-width:650px)').matches) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          frontHeadRef.current?.focus({ preventScroll: true });
        });
      }
    },
    [mode, resetTimeline]
  );

  const handleSurprise = () => {
    const nextIdx = groups.findIndex((_, i) => !visited.has(i));
    openTopic(nextIdx >= 0 ? nextIdx : 0);
  };

  const handleToggleExpand = () => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const handleNextQuestion = () => {
    openTopic((topic + 1) % groups.length);
  };

  const handleStartTimeline = () => {
    resetTimeline();
    showView('timeline');
  };

  const handleSelectTimelineCard = (k) => {
    const wanted = stamps.length;
    if (k !== wanted) {
      setMisses((m) => m + 1);
      setTimelineStatus('wrong');
      return;
    }
    const nextStamps = [...stamps, k];
    setStamps(nextStamps);
    setTimelineStatus(nextStamps.length === 4 ? 'win' : 'good');
  };

  const timelineFeedbackText =
    timelineStatus === 'win'
      ? t.timelineWin
      : timelineStatus === 'wrong'
        ? t.timelineWrong
        : timelineStatus === 'good'
          ? t.timelineGood
          : t.timelineReady;

  const handleStartQuiz = () => {
    setQIndex(-1);
    setChoice(null);
    setAnswered(false);
    setScore(0);
    showView('quiz');
  };

  const handleStartQuizQuestions = () => {
    setQIndex(0);
    setScore(0);
    setChoice(null);
    setAnswered(false);
  };

  const handleCheckQuizAnswer = () => {
    if (!choice) return;
    setAnswered(true);
    if (choice === quizData.questions[qIndex].correctChoiceId) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setQIndex((idx) => idx + 1);
    setChoice(null);
    setAnswered(false);
  };

  const handleOpenRelatedTopic = (topicKey) => {
    const idx = groups.findIndex((g) => g.key === topicKey);
    if (idx >= 0) openTopic(idx);
  };

  return (
    <>
      <TopHeader
        locale={locale}
        brandTitle={paras[0]}
        t={t}
        onSelectLocale={(code) => handleSelectLocale(code, { fromInteractiveTile: false })}
        onOpenLanguageDialog={() => setLanguageDialogOpen(true)}
        onGoHome={() => showView('front')}
      />

      <FallbackBanner locale={locale} />

      <LanguageDialog
        isOpen={languageDialogOpen}
        locale={locale}
        onSelectLanguage={(code) => handleSelectLocale(code, { fromInteractiveTile: true })}
        onClose={() => setLanguageDialogOpen(false)}
      />

      <main className="screen" id="experience">
        <div className="max-w-[1560px] px-[34px] pb-[42px] max-[1100px]:px-[22px] max-[1100px]:pb-[30px] max-[650px]:px-3 max-[650px]:pb-[22px] min-[1500px]:px-[45px] mx-auto">
          {mode === 'front' && (
            <LanguageStage
              locale={locale}
              onSelectLanguage={(code) => handleSelectLocale(code, { fromInteractiveTile: true })}
            />
          )}

          {mode === 'front' && (
            <FrontView
              locale={locale}
              t={t}
              paras={paras}
              groups={groups}
              media={imagesData}
              visited={visited}
              frontHeadRef={frontHeadRef}
              onSurprise={handleSurprise}
              onGoGames={() => showView('games')}
              onOpenTopic={openTopic}
            />
          )}

          {mode === 'answer' && (
            <AnswerView
              locale={locale}
              t={t}
              source={source}
              paras={paras}
              groups={groups}
              topic={topic}
              media={imagesData}
              visited={visited}
              isExpanded={expandedTopics.has(topic)}
              answerTitleRef={answerTitleRef}
              onBack={() => showView('front')}
              onToggleExpand={handleToggleExpand}
              onNextQuestion={handleNextQuestion}
              onGoGames={() => showView('games')}
            />
          )}

          {mode === 'games' && (
            <GamesMenuView
              locale={locale}
              t={t}
              onSelectTimeline={handleStartTimeline}
              onSelectQuiz={handleStartQuiz}
            />
          )}

          {mode === 'timeline' && (
            <TimelineGameView
              locale={locale}
              t={t}
              paras={paras}
              stamps={stamps}
              misses={misses}
              feedback={timelineFeedbackText}
              isWarning={timelineStatus === 'wrong'}
              onBackToGames={() => showView('games')}
              onSelectCard={handleSelectTimelineCard}
              onReset={resetTimeline}
            />
          )}

          {mode === 'quiz' && (
            <QuizGameView
              locale={locale}
              t={t}
              quiz={quizData}
              qIndex={qIndex}
              choice={choice}
              answered={answered}
              score={score}
              onBackToGames={() => showView('games')}
              onSwitchToThai={() => handleSelectLocale('th')}
              onStartQuizQuestions={handleStartQuizQuestions}
              onSelectChoice={setChoice}
              onCheckAnswer={handleCheckQuizAnswer}
              onNextQuizQuestion={handleNextQuizQuestion}
              onOpenRelatedTopic={handleOpenRelatedTopic}
            />
          )}

          <BottomRail
            mode={mode}
            locale={locale}
            t={t}
            onNavigate={(target) => showView(target)}
            onOpenExhibit={() => openTopic(5)}
          />
        </div>
      </main>
    </>
  );
}
