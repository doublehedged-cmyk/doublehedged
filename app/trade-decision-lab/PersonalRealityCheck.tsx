"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./lab.module.css";

type Reflection = "No" | "Possibly" | "Yes" | "";
const DB_NAME = "double-hedged-lab";
const STORE_NAME = "personal-reminders";

function openReminderDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readReminder() {
  const db = await openReminderDb();
  return new Promise<Blob | null>((resolve, reject) => {
    const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get("active");
    request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : null);
    request.onerror = () => reject(request.error);
  }).finally(() => db.close());
}

async function saveReminder(blob: Blob) {
  const db = await openReminderDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(blob, "active");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export default function PersonalRealityCheck({ onComplete }: { onComplete: (complete: boolean) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const lastTimeRef = useRef(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [listened, setListened] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reflection, setReflection] = useState<Reflection>("");
  const [replacing, setReplacing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    readReminder().then((blob) => {
      if (active && blob) setAudioUrl(URL.createObjectURL(blob));
    }).catch(() => {
      if (active) setError("This browser could not open your saved reminder.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setRecordSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  useEffect(() => {
    if (recording && recordSeconds >= 30) recorderRef.current?.stop();
  }, [recordSeconds, recording]);

  useEffect(() => {
    onComplete(listened && confirmed && Boolean(reflection));
  }, [confirmed, listened, onComplete, reflection]);

  function resetGate() {
    setListened(false);
    setConfirmed(false);
    setReflection("");
    setProgress(0);
    lastTimeRef.current = 0;
  }

  async function storeBlob(blob: Blob) {
    await saveReminder(blob);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(blob));
    setReplacing(false);
    resetGate();
    setError("");
  }

  async function startRecording() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice recording is not supported here. Please upload an audio note instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size) await storeBlob(blob);
      };
      setRecordSeconds(0);
      setRecording(true);
      recorder.start();
    } catch {
      setError("Microphone access was not available. You can upload a voice note instead.");
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function uploadReminder(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("audio/")) { setError("Please choose an audio file."); return; }
    const probeUrl = URL.createObjectURL(file);
    const probe = new Audio(probeUrl);
    probe.onloadedmetadata = () => {
      URL.revokeObjectURL(probeUrl);
      if (!Number.isFinite(probe.duration) || probe.duration > 30.5) {
        setError("Please choose a reminder that is 30 seconds or shorter.");
        return;
      }
      void storeBlob(file);
    };
    probe.onerror = () => { URL.revokeObjectURL(probeUrl); setError("That audio file could not be read."); };
  }

  async function playFromStart() {
    const audio = audioRef.current;
    if (!audio) return;
    resetGate();
    audio.currentTime = 0;
    audio.playbackRate = 1;
    lastTimeRef.current = 0;
    try { await audio.play(); } catch { setError("Playback could not start. Please press Play again."); }
  }

  const complete = listened && confirmed && Boolean(reflection);
  const showSetup = !audioUrl || replacing;

  return (
    <div className={styles.realityCheck}>
      <div className={styles.realityIntro}>
        <div className={styles.headphones} aria-hidden="true">🎧</div>
        <div>
          <strong>Your experience. Your voice. Your final checkpoint.</strong>
          <p>Before risking real money, spend 30 seconds reconnecting with a lesson you already earned.</p>
        </div>
      </div>

      {loading ? <p className={styles.realityStatus}>Opening your private reminder…</p> : null}
      {showSetup && !loading ? (
        <div className={styles.realitySetup}>
          <blockquote>“Record a message to your future self after one of your biggest trading mistakes. What happened? What rule did you break? What do you never want to repeat?”</blockquote>
          <div className={styles.recordRow}>
            <button type="button" className={`${styles.recordButton} ${recording ? styles.isRecording : ""}`} onClick={recording ? stopRecording : startRecording}>
              <span /> {recording ? `Stop recording · ${30 - Math.min(30, recordSeconds)}s` : "Record voice reminder"}
            </button>
            <label className={styles.audioUpload}>Upload audio<input type="file" accept="audio/*" onChange={uploadReminder} /></label>
            {audioUrl ? <button type="button" className={styles.cancelReplace} onClick={() => setReplacing(false)}>Keep current</button> : null}
          </div>
          <small>One reminder is stored privately in this browser. Recording stops automatically at 30 seconds.</small>
        </div>
      ) : null}

      {audioUrl && !replacing ? (
        <div className={styles.playerShell}>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onRateChange={(event) => { if (event.currentTarget.playbackRate !== 1) event.currentTarget.playbackRate = 1; }}
            onSeeking={(event) => { if (Math.abs(event.currentTarget.currentTime - lastTimeRef.current) > 0.75) event.currentTarget.currentTime = lastTimeRef.current; }}
            onTimeUpdate={(event) => {
              lastTimeRef.current = event.currentTarget.currentTime;
              setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0);
            }}
            onEnded={() => { setPlaying(false); setProgress(1); setListened(true); }}
          />
          <div className={`${styles.waveform} ${playing ? styles.waveformPlaying : ""}`} aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${24 + ((index * 17) % 58)}%`, animationDelay: `${(index % 8) * -0.08}s` }} />)}
          </div>
          <div className={styles.audioProgress}><span style={{ width: `${progress * 100}%` }} /></div>
          <div className={styles.playerFooter}>
            <button type="button" className={styles.playButton} disabled={playing} onClick={playFromStart}>{playing ? "Listening…" : listened ? "Listen again" : "▶ Play full reminder"}</button>
            <span>{Math.ceil(progress * duration)} / {Math.ceil(duration) || "—"} sec</span>
            <button type="button" className={styles.replaceButton} onClick={() => { audioRef.current?.pause(); setReplacing(true); }}>Replace reminder</button>
          </div>
        </div>
      ) : null}

      {error ? <div className={styles.realityError}>{error}</div> : null}
      {audioUrl && !replacing ? (
        <div className={styles.realityConfirm}>
          <label className={listened ? styles.confirmEnabled : ""}><input type="checkbox" disabled={!listened} checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> I have listened to my reminder and I understand the lesson it contains.</label>
          {listened ? <div className={styles.reflection}><strong>Does today&apos;s trade repeat the same mistake described in your recording?</strong><div>{(["No", "Possibly", "Yes"] as Reflection[]).map((answer) => <button type="button" key={answer} className={reflection === answer ? styles.reflectionSelected : ""} onClick={() => setReflection(answer)}>{answer}</button>)}</div></div> : <p className={styles.listenHint}>Listen to the full recording to unlock your confirmation. Playback cannot be skipped or sped up.</p>}
          {reflection === "Yes" || reflection === "Possibly" ? <div className={styles.realityWarning}>Your current trade resembles a mistake you&apos;ve identified in your own trading history. Consider reviewing your setup before proceeding.</div> : null}
          {complete ? <div className={styles.realityComplete}>Reality check complete · Continue with awareness, not certainty.</div> : null}
        </div>
      ) : null}
    </div>
  );
}
