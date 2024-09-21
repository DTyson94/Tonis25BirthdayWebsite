document.addEventListener('DOMContentLoaded', function() {
    const playPauseButton = document.getElementById('play-pause');
    const prevTrackButton = document.getElementById('prev-track');
    const nextTrackButton = document.getElementById('next-track');
    const currentTrackSpan = document.getElementById('current-track');
    
    const playlist = [
        'Wannabe - Spice Girls',
        'Smells Like Teen Spirit - Nirvana',
        '...Baby One More Time - Britney Spears',
        'I Will Always Love You - Whitney Houston',
        'Macarena - Los del Río'
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    function updateTrackInfo() {
        currentTrackSpan.textContent = `Now Playing: ${playlist[currentTrackIndex]}`;
    }
    
    function togglePlayPause() {
        isPlaying = !isPlaying;
        playPauseButton.innerHTML = isPlaying ? '&#9724;' : '&#9658;';
        updateTrackInfo();
    }
    
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        updateTrackInfo();
    }
    
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        updateTrackInfo();
    }
    
    playPauseButton.addEventListener('click', togglePlayPause);
    prevTrackButton.addEventListener('click', prevTrack);
    nextTrackButton.addEventListener('click', nextTrack);
    
    // Initialize the track info
    updateTrackInfo();
});
