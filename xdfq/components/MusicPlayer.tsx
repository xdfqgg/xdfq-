"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface Song {
  title: string;
  author: string;
  url: string;
  pic: string;
}

// 预设歌单
const PRESETS: { name: string; id: string }[] = [
  { name: "华语热门", id: "7452423867" },
  { name: "欧美热歌", id: "3136952023" },
  { name: "日语精选", id: "2829816519" },
  { name: "轻音乐", id: "2958957614" },
];

const DEFAULT_API = "https://api.injahow.cn/meting/";

export default function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 设置弹窗
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrl, setApiUrl] = useState(DEFAULT_API);
  const [playlistId, setPlaylistId] = useState(PRESETS[0].id);
  const [inputId, setInputId] = useState(PRESETS[0].id);

  // 获取歌单
  const fetchPlaylist = useCallback((id: string) => {
    setLoading(true);
    fetch(
      `${apiUrl}?server=netease&type=playlist&id=${id}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSongs(data);
          setCurrent(0);
          setPlaying(false);
          setPlaylistId(id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [apiUrl]);

  // 初始加载
  useEffect(() => {
    fetchPlaylist(playlistId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 切换歌曲
  useEffect(() => {
    if (audioRef.current && songs[current]) {
      audioRef.current.src = songs[current].url;
      if (playing) audioRef.current.play();
    }
  }, [current, songs]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !songs[current]) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }, [playing, current, songs]);

  const next = () => setCurrent((c) => (c + 1) % songs.length);
  const prev = () => setCurrent((c) => (c - 1 + songs.length) % songs.length);

  const song = songs[current];

  return (
    <>
      {/* ====== 播放器本体 ====== */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-stone-800/70 backdrop-blur border border-amber-200 dark:border-stone-700 shadow-lg">
        {/* 封面 */}
        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-amber-100 dark:bg-stone-700">
          {song ? (
            <img src={song.pic} alt={song.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg">
              {loading ? "⏳" : "🎵"}
            </div>
          )}
        </div>

        {/* 歌曲信息 */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-amber-950 dark:text-amber-50 truncate">
            {song ? song.title : loading ? "加载中..." : "无歌曲"}
          </p>
          <p className="text-[10px] text-amber-500 truncate">
            {song ? song.author : `${songs.length} 首`}
          </p>
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded-full text-xs text-amber-500 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded-full text-xs text-amber-500 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
          >
            ⏭
          </button>
          {/* 设置按钮 */}
          <button
            onClick={() => setShowSettings(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-xs text-amber-400 hover:text-amber-600 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors ml-1"
            title="设置"
          >
            ⚙
          </button>
        </div>

        <audio
          ref={audioRef}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={next}
        />
      </div>

      {/* ====== 设置弹窗（Portal 到 body，保证居中） ====== */}
      {showSettings &&
        createPortal(
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
          <div
            className="bg-white dark:bg-stone-800 rounded-2xl border border-amber-200 dark:border-stone-700 shadow-2xl p-6 w-80 max-h-[80vh] overflow-y-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-amber-950 dark:text-amber-50">🎵 音乐设置</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-lg bg-amber-100 dark:bg-stone-700 text-amber-500 hover:bg-amber-200 dark:hover:bg-stone-600 hover:text-amber-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* API 地址 */}
            <label className="block text-xs text-amber-600 dark:text-amber-400 mb-1">
              API 地址
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-amber-200 dark:border-stone-600 bg-amber-50 dark:bg-stone-700 text-amber-950 dark:text-amber-100 mb-4 focus:outline-none focus:border-amber-400"
              placeholder="输入 API 地址"
            />

            {/* 歌单 ID */}
            <label className="block text-xs text-amber-600 dark:text-amber-400 mb-1">
              歌单 ID
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-amber-200 dark:border-stone-600 bg-amber-50 dark:bg-stone-700 text-amber-950 dark:text-amber-100 focus:outline-none focus:border-amber-400"
                placeholder="输入歌单 ID"
              />
              <button
                onClick={() => {
                  fetchPlaylist(inputId);
                  setShowSettings(false);
                }}
                className="px-3 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              >
                加载
              </button>
            </div>

            {/* 预设歌单 */}
            <label className="block text-xs text-amber-600 dark:text-amber-400 mb-2">
              推荐歌单
            </label>
            <div className="flex flex-col gap-1">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setInputId(preset.id);
                    fetchPlaylist(preset.id);
                    setShowSettings(false);
                  }}
                  className={`text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                    playlistId === preset.id
                      ? "bg-amber-100 dark:bg-amber-800/40 text-amber-700 dark:text-amber-300 font-medium"
                      : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700"
                  }`}
                >
                  🎶 {preset.name}
                  <span className="text-[10px] opacity-50 ml-2">{preset.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
