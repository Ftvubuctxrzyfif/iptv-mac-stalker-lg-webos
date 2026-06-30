import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Maximize, Cast, Loader2, AlertCircle } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  logo: string;
  number: number;
}

interface VideoPlayerProps {
  channel: Channel | null;
  streamUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onClose?: () => void;
}

const VideoPlayer = ({ channel, streamUrl, isLoading, error, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && streamUrl) {
      video.src = streamUrl;
      video.load();
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(console.error);
      }
    }
  }, [streamUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Stream Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-lg font-medium">Loading Stream...</p>
          {channel && (
            <p className="text-sm text-muted-foreground mt-2">{channel.name}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        autoPlay
        controls={false}
        playsInline
      />

      {/* Channel info overlay */}
      {channel && (
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-3">
            {channel.logo && (
              <img src={channel.logo} alt={channel.name} className="w-10 h-10 object-contain" />
            )}
            <div>
              <h3 className="font-semibold text-white">{channel.name}</h3>
              <Badge variant="secondary" className="text-xs">
                Ch {channel.number}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Cast button */}
      <button
        onClick={() => {
          const video = videoRef.current;
          if (video && 'cast' in video) {
            // Casting would be implemented here
            console.log('Cast functionality');
          }
        }}
        className="absolute top-4 right-4 p-2 bg-black/70 backdrop-blur-sm rounded-lg hover:bg-black/80 transition-colors"
        title="Cast to TV"
      >
        <Cast className="w-5 h-5 text-white" />
      </button>

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white">
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>

            <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white">
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </Button>

            <span className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={toggleFullscreen} variant="ghost" size="icon" className="text-white">
              <Maximize className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Auto-hide controls after 3 seconds */}
      <div
        className="absolute inset-0"
        onMouseMove={() => {
          setShowControls(true);
          setTimeout(() => setShowControls(false), 3000);
        }}
      />
    </div>
  );
};

export default VideoPlayer;
