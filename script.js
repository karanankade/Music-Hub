// Music Hub JavaScript — complete corrected version
class MusicHub {
    constructor() {
        // hidden audio element will be bound in init()
        this.audio = null;
        this.currentTrack = null;
        this.isPlaying = false;
        this.volume = 75;
        this.isMuted = false;
        this.shuffle = false;
        this.repeat = false;

        this.likedTrackIds = this.loadFromStorage('likedTrackIds', []);
        this.playlists = this.loadFromStorage('playlists', []);

        // All audio files (from Music/)
        const musicFiles = [
            "Aaj Unse Pehli Mulakat  Full Cover Song  Gopal Sharma  Rajendra  Acharya.mp3",
            "Ab to Tera intezar hi nahin Hai hindi pop Mumbai song maan panu i popstar.mp3",
            "Amaal Mallik & Shreya Ghoshal - Yeh Aaina.mp3",
            "Amit Trivedi - Yaar Mere (From  Homebound ).mp3",
            "Amruta Fadnavis - Laal Ferrari.mp3",
            "Annkur_R_Pathakk_Mera_Hua_From_Ek_Deewane_Ki_Deewaniyat_O.mp3",
            "Arijit Singh - Bekhayali (Arijit Singh Version).mp3",
            "Arijit Singh - Tujhe Kitna Chahne Lage.mp3",
            "Armaan Malik - Pehla Pyaar.mp3",
            "Azeem-O-Shaan Shahenshah.mp3",
            "Come Away With Me.mp3",
            "Daayre.mp3",
            "Dhoom 3 Overture Instrumental.mp3",
            "Dhoom Instrumental.mp3",
            "Dhoom Machale Dhoom Arabic Version.mp3",
            "Dhoom Machale Dhoom SPANISH.mp3",
            "Fakira.mp3",
            "Gerua.mp3",
            "Ila Arun - Goli Maar Bheje Mein (From  Crazxy ).mp3",
            "Inn Lamhon Ke Daaman Mein.mp3",
            "Jaani - Dekha Ji Dekha Maine.mp3",
            "Janam Janam.mp3",
            "Jashn-E-Bahaaraa.mp3",
            "Jat Ludhiyane Da.mp3",
            "Javed-Mohsin - Teri Galiyon Mein.mp3",
            "Jubin Nautiyal - Tujhe Kitna Chahein Aur.mp3",
            "Kamli.mp3",
            "Khwaja Mere Khwaja.mp3",
            "Main Bhi Nahin Soya.mp3",
            "Malang.mp3",
            "Manma Emotion Jaage.mp3",
            "Mann Dhaavataya  Radhika Bhide  I-Popstar Season 1  Episode 2.mp3",
            "Mann Mohanaa.mp3",
            "Mera Deewanapan  Amrinder Gill  Judaa 2  Latest Punjabi Romantic Songs.mp3",
            "Neeti Mohan - Bahon Ke Darmiyan.mp3",
            "Premika.mp3",
            "Rajat Nagpal - Pyaar Aata Hai.mp3",
            "Ranjheya Ve  Zain Zohaib  Yratta media.mp3",
            "Sachet Tandon - Bekhayali.mp3",
            "Sachet Tandon & Parampara Tandon - Mere Sohneya.mp3",
            "Sachin-Jigar - Tum Mere Na Huye (From  Thamma ).mp3",
            "Salim-Sulaiman - Tum Jo Kaho Toh (From  Bhoomi 2025 ).mp3",
            "Soch Na Sake (From Airlift).mp3",
            "Tere Bina Na Guzara - Satinder Sartaaj.mp3",
            "Theme of Dilwale.mp3",
            "Tu Hi Junoon.mp3",
            "Tukur Tukur.mp3",
            "Vishal Mishra - Holi Aayi Re   Coke Studio Bharat.mp3",
            "Vishal Mishra - Kaise Hua.mp3",
            "Whistle Baja.mp3"
        ];

        // Covers available in img/ (exact title strings)
        const availableCovers = new Set([
            "Aaj Unse Pehli Mulakat  Full Cover Song  Gopal Sharma  Rajendra  Acharya",
            "Ab to Tera intezar hi nahin Hai hindi pop Mumbai song maan panu i popstar",
            "Amaal Mallik & Shreya Ghoshal - Yeh Aaina",
            "Amit Trivedi - Yaar Mere (From  Homebound )",
            "Amruta Fadnavis - Laal Ferrari",
            "Annkur_R_Pathakk_Mera_Hua_From_Ek_Deewane_Ki_Deewaniyat_O",
            "Arijit Singh - Bekhayali (Arijit Singh Version)",
            "Arijit Singh - Tujhe Kitna Chahne Lage",
            "Armaan Malik - Pehla Pyaar",
            "Azeem-O-Shaan Shahenshah",
            "Come Away With Me",
            "Daayre",
            "Dhoom 3 Overture Instrumental",
            "Dhoom Instrumental",
            "Dhoom Machale Dhoom Arabic Version",
            "Dhoom Machale Dhoom SPANISH",
            "Fakira",
            "Gerua",
            "Ila Arun - Goli Maar Bheje Mein (From  Crazxy )",
            "Inn Lamhon Ke Daaman Mein",
            "Jaani - Dekha Ji Dekha Maine",
            "Janam Janam",
            "Jashn-E-Bahaaraa",
            "Jat Ludhiyane Da",
            "Javed-Mohsin - Teri Galiyon Mein",
            "Jubin Nautiyal - Tujhe Kitna Chahein Aur",
            "Kamli",
            "Khwaja Mere Khwaja",
            "Main Bhi Nahin Soya",
            "Malang",
            "Manma Emotion Jaage",
            "Mann Dhaavataya  Radhika Bhide  I-Popstar Season 1  Episode 2",
            "Mann Mohanaa",
            "Mera Deewanapan  Amrinder Gill  Judaa 2  Latest Punjabi Romantic Songs",
            "Neeti Mohan - Bahon Ke Darmiyan",
            "Premika",
            "Rajat Nagpal - Pyaar Aata Hai",
            "Ranjheya Ve  Zain Zohaib  Yratta media",
            "Sachet Tandon - Bekhayali",
            "Sachet Tandon & Parampara Tandon - Mere Sohneya",
            "Sachin-Jigar - Tum Mere Na Huye (From  Thamma )",
            "Salim-Sulaiman - Tum Jo Kaho Toh (From  Bhoomi 2025 )",
            "Soch Na Sake (From Airlift)",
            "Tere Bina Na Guzara - Satinder Sartaaj",
            "Theme of Dilwale",
            "Tu Hi Junoon",
            "Tukur Tukur",
            "Vishal Mishra - Holi Aayi Re   Coke Studio Bharat",
            "Vishal Mishra - Kaise Hua",
            "Whistle Baja"
        ]);

        // Feature detection: create a temporary audio element to check canPlayType
        const tmpAudio = document.createElement('audio');
        const supports = {
            mp3: !!tmpAudio.canPlayType && tmpAudio.canPlayType('audio/mpeg') !== '',
            flac: !!tmpAudio.canPlayType && (tmpAudio.canPlayType('audio/flac') !== '' || tmpAudio.canPlayType('audio/x-flac') !== '')
        };

        // Build track objects
        this.tracks = musicFiles.map((fileName, index) => {
            const title = fileName.replace(/\.(mp3|flac)$/i, "");
            const extMatch = fileName.match(/\.(mp3|flac)$/i);
            const ext = extMatch ? extMatch[1].toLowerCase() : '';
            const playable = (ext === 'mp3' && supports.mp3) || (ext === 'flac' && supports.flac);

            // cover path if available; don't encode yet (encode when using)
            const cover = availableCovers.has(title) ? `img/${title}.jpg` : undefined;

            return {
                id: index + 1,
                title,
                artist: "",
                album: "",
                duration: 0,
                url: `Music/${fileName}`,
                cover,
                playable
            };
        });

        // Initialize UI + audio binding
        this.init();
    }

    init() {
        // Bind audio element (hidden-audio if present)
        const audioEl = document.getElementById('hidden-audio');
        this.audio = audioEl || document.createElement('audio');
        this.audio.preload = 'metadata';
        this.audio.volume = this.volume / 100;

        this.setupEventListeners();
        this.setupLucideIcons();
        this.renderTracks();
        this.switchLibraryTabs();
        this.setupAudioEvents();
         this.setGreeting();

    }

    setGreeting() {
        const greetingElement = document.getElementById("greeting");
        if (!greetingElement) return; // safety check

        const now = new Date();
        const hour = now.getHours();

        let greetingText = "";
        if (hour >= 5 && hour < 12) {
            greetingText = "Good morning";
        } else if (hour >= 12 && hour < 18) {
            greetingText = "Good afternoon";
        } else {
            greetingText = "Good evening";
        }

        greetingElement.textContent = greetingText;
    }

    setupLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    setupEventListeners() {

        // Restore playlists & likes from storage (already loaded in constructor)
        // ensure arrays are valid
        if (!Array.isArray(this.likedTrackIds)) this.likedTrackIds = [];
        if (!Array.isArray(this.playlists)) this.playlists = [];
    }

    // Storage helpers
    loadFromStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    }

    setupLucideIcons() {
        if (typeof lucide !== 'undefined' && lucide && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    setupEventListeners() {
        // Navigation items
        document.querySelectorAll('.nav-item[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.switchSection(target.dataset.section);
            });
        });

        const playBtn = document.getElementById('play-pause-btn');
        if (playBtn) playBtn.addEventListener('click', () => this.togglePlayPause());

        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousTrack());

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextTrack());

        const volumeBtn = document.getElementById('volume-btn');
        if (volumeBtn) volumeBtn.addEventListener('click', () => this.toggleMute());

        const shuffleBtn = document.getElementById('shuffle-btn');
        if (shuffleBtn) shuffleBtn.addEventListener('click', () => this.toggleShuffle());

        const repeatBtn = document.getElementById('repeat-btn');
        if (repeatBtn) repeatBtn.addEventListener('click', () => this.toggleRepeat());

        const vRange = document.getElementById('volume-range');
        if (vRange) vRange.addEventListener('input', (e) => this.setVolume(e.target.value));

        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.addEventListener('input', (e) => this.searchTracks(e.target.value));

        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) progressBar.addEventListener('click', (e) => this.seekTo(e));

        // Sidebar actions
        const createBtn = document.getElementById('create-playlist-btn');
        if (createBtn) createBtn.addEventListener('click', () => this.createPlaylist());

        const likedNavBtn = document.getElementById('liked-songs-nav-btn');
        if (likedNavBtn) likedNavBtn.addEventListener('click', () => {
            this.switchSection('library');
            this.renderLibrary('Liked Songs');
        });
    }

    setupAudioEvents() {
        // timeupdate
        this.audio.addEventListener('timeupdate', () => this.updateProgress());

        // metadata loaded -> set duration on track object and UI
        this.audio.addEventListener('loadedmetadata', () => {
            if (this.currentTrack) {
                this.currentTrack.duration = Math.floor(this.audio.duration || 0);
                const totalTimeEl = document.getElementById('total-time');
                if (totalTimeEl) totalTimeEl.textContent = this.formatTime(this.currentTrack.duration);
            }
        });

        this.audio.addEventListener('ended', () => {
            if (this.repeat) {
                // restart same track
                if (this.currentTrack) this.selectTrack(this.currentTrack);
            } else {
                this.nextTrack();
            }
        });

        this.audio.addEventListener('error', () => {
            const src = this.audio.currentSrc || (this.currentTrack ? this.currentTrack.url : '');
            console.warn('Audio error for source:', src, this.audio.error);
            if (this.currentTrack && this.currentTrack.playable === false) {
                alert('This audio format is not supported by your browser.');
            } else {
                alert('Failed to load this track. Please try another.');
            }
            this.isPlaying = false;
            this.updatePlayButton();
            this.updateTrackIcons();
        });

        // Keep play/pause icon consistent with actual state
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.updateTrackIcons();
        });
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.updateTrackIcons();
        });
    }

    switchSection(section) {
        // nav items
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const navItem = document.querySelector(`.nav-item[data-section="${section}"]`);
        if (navItem) navItem.classList.add('active');

        // sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        const targetSec = document.getElementById(`${section}-section`);
        if (targetSec) targetSec.classList.add('active');
    }

    // Encode each path segment so special characters don't break URLs
    encodePath(path) {
        if (!path) return '';
        return path.split('/').map(seg => encodeURIComponent(seg)).join('/');
    }

    renderTracks() {
        const grid = document.getElementById('all-songs-grid') || document.querySelector('.music-grid');
        if (!grid) return;
        grid.innerHTML = '';

        this.tracks.forEach(track => {
            const card = document.createElement('div');
            card.className = 'music-card';

            const coverStyle = track.cover ? `style="background-image:url('${this.encodePath(track.cover)}'); background-size: cover; background-position: center;"` : '';
            const safeArtist = track.artist || '';
            card.innerHTML = `
                <div class="card-cover" ${coverStyle}></div>
                <h3 class="track-title">${track.title}</h3>
                <p class="track-artist">${safeArtist}</p>
                <button class="play-btn" data-track="${track.id}">${track.playable === false ? '⚠' : '▶'}</button>
            `;

            const btn = card.querySelector('.play-btn');
            if (track.playable === false) {
                btn.title = 'Format not supported by your browser';
                btn.style.opacity = '0.6';
            }
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectTrack(track);
            });

            // Clicking anywhere on the card also selects the track
            card.addEventListener('click', () => this.selectTrack(track));

            grid.appendChild(card);
        });

        this.setupLucideIcons();
        this.updateTrackIcons();
    }

    // Toggle between play/pause icon in both player and card
    selectTrack(track) {
        // If same track clicked => toggle play/pause
        if (this.currentTrack && this.currentTrack.id === track.id) {
            this.togglePlayPause();
            return;
        }

        this.currentTrack = track;

        // Rebuild <source>
        if (this.audio) {
            // Remove existing children <source> if any
            while (this.audio.firstChild) this.audio.removeChild(this.audio.firstChild);

            const source = document.createElement('source');
            source.src = this.encodePath(track.url);
            const isFlac = /\.flac$/i.test(track.url);
            source.type = isFlac ? 'audio/flac' : 'audio/mpeg';
            this.audio.appendChild(source);

            // For some browsers, setting audio.src can help
            try {
                this.audio.src = source.src;
            } catch (err) {
                // ignore
            }
        }

        // Reset time and play
        try {
            this.audio.currentTime = 0;
        } catch (err) {
            // ignore if not allowed yet
        }

        this.isPlaying = true;
        const playPromise = this.audio.play();
        if (playPromise && playPromise.catch) {
            playPromise.catch((err) => {
                console.warn('Play prevented or failed:', err);
                this.isPlaying = false;
                this.updatePlayButton();
                this.updateTrackIcons();
            });
        }

        this.updatePlayerDisplay();
        this.updatePlayButton();
        this.updateTrackIcons();

        // Bind context menu to current title for quick playlist add (only once)
        const playerTitle = document.getElementById('current-title');
        if (playerTitle && !playerTitle.dataset.boundPlaylistAdd) {
            playerTitle.dataset.boundPlaylistAdd = '1';
            playerTitle.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (this.playlists.length === 0) {
                    alert('No playlists. Click Create Playlist in the sidebar first.');
                    return;
                }
                const names = this.playlists.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
                const choice = prompt(`Add current track to playlist:\n${names}\nEnter number:`);
                const idx = Number(choice) - 1;
                if (!Number.isInteger(idx) || idx < 0 || idx >= this.playlists.length) return;
                this.addToPlaylist(this.playlists[idx].id, this.currentTrack.id);
                alert(`Added to ${this.playlists[idx].name}`);
            });
        }
    }

    togglePlayPause() {
        if (!this.currentTrack) {
            // If no track selected yet, start the first one
            if (this.tracks.length > 0) {
                this.selectTrack(this.tracks[0]);
            }
            return;
        }

        if (this.isPlaying) {
            this.audio.pause();
        } else {
            const p = this.audio.play();
            if (p && p.catch) p.catch(() => {}); // suppress unhandled
        }
        // Let event listeners update isPlaying, but keep UI in sync:
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        this.updateTrackIcons();
    }

    updatePlayButton() {
        const btn = document.getElementById('play-pause-btn');
        if (!btn) return;
        btn.textContent = this.isPlaying ? '⏸' : '▶';
    }

    // Update icon on track cards
    updateTrackIcons() {
        document.querySelectorAll('.play-btn').forEach(btn => {
            // Default to play icon unless marked otherwise
            btn.textContent = '▶';
        });

        if (this.currentTrack) {
            const currentBtn = document.querySelector(`.play-btn[data-track="${this.currentTrack.id}"]`);
            if (currentBtn) {
                currentBtn.textContent = this.isPlaying ? '⏸' : '▶';
            }
        }
    }

    updatePlayerDisplay() {
        const titleEl = document.getElementById('current-title');
        const artistEl = document.getElementById('current-artist');
        const totalTimeEl = document.getElementById('total-time');
        const coverEl = document.querySelector('.track-cover');

        if (titleEl && this.currentTrack) {
            titleEl.textContent = this.currentTrack.title;
        }
        if (artistEl && this.currentTrack) {
            artistEl.textContent = this.currentTrack.artist || '';
        }
        if (totalTimeEl && this.currentTrack) {
            totalTimeEl.textContent = this.formatTime(this.currentTrack.duration || 0);
        }
        if (coverEl && this.currentTrack && this.currentTrack.cover) {
            coverEl.style.backgroundImage = `url('${this.encodePath(this.currentTrack.cover)}')`;
            coverEl.style.backgroundSize = 'cover';
            coverEl.style.backgroundPosition = 'center';
        } else if (coverEl) {
            coverEl.style.backgroundImage = '';
        }
    }

    updateProgress() {
        if (!this.audio || !this.audio.duration) {
            return;
        }
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.width = `${progress}%`;

        const currentTimeEl = document.getElementById('current-time');
        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.audio.currentTime || 0);
    }

    seekTo(e) {
        if (!this.currentTrack || !this.audio || !this.audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.audio.currentTime = percent * this.audio.duration;
    }

    previousTrack() {
        if (!this.currentTrack) return;
        const index = this.tracks.findIndex(t => t.id === this.currentTrack.id);
        const prevIndex = index > 0 ? index - 1 : this.tracks.length - 1;
        this.selectTrack(this.tracks[prevIndex]);
    }

    nextTrack() {
        if (!this.currentTrack) return;
        const index = this.tracks.findIndex(t => t.id === this.currentTrack.id);
        let nextIndex;
        if (this.shuffle) {
            nextIndex = Math.floor(Math.random() * this.tracks.length);
        } else {
            nextIndex = index < this.tracks.length - 1 ? index + 1 : 0;
        }
        this.selectTrack(this.tracks[nextIndex]);
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        const btn = document.getElementById('shuffle-btn');
        if (btn) btn.classList.toggle('active', this.shuffle);
        alert(`Shuffle: ${this.shuffle ? 'On' : 'Off'}`);
    }

    toggleRepeat() {
        this.repeat = !this.repeat;
        const btn = document.getElementById('repeat-btn');
        if (btn) btn.classList.toggle('active', this.repeat);
        alert(`Repeat: ${this.repeat ? 'On' : 'Off'}`);
    }

    setVolume(value) {
        value = Number(value);
        if (Number.isNaN(value)) return;
        this.volume = value;
        if (this.audio) this.audio.volume = Math.max(0, Math.min(1, value / 100));
        this.isMuted = value === 0;
        const vRange = document.getElementById('volume-range');
        if (vRange) vRange.value = value;
        this.updateVolumeIcon();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.audio) this.audio.muted = this.isMuted;
        const vRange = document.getElementById('volume-range');
        if (vRange) vRange.value = this.isMuted ? 0 : this.volume;
        this.updateVolumeIcon();
    }

    updateVolumeIcon() {
        const volumeBtn = document.getElementById('volume-btn');
        if (!volumeBtn) return;
        const icon = volumeBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', this.isMuted ? 'volume-x' : 'volume-2');
            this.setupLucideIcons();
        } else {
            // Fallback: change text
            volumeBtn.textContent = this.isMuted ? '🔇' : '🔊';
        }
    }

    searchTracks(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        resultsContainer.innerHTML = '';

        const q = (query || '').trim().toLowerCase();
        const results = this.tracks.filter(track =>
            track.title.toLowerCase().includes(q) ||
            (track.artist || '').toLowerCase().includes(q) ||
            (track.album || '').toLowerCase().includes(q)
        );

        if (q && results.length === 0) {
            resultsContainer.innerHTML = `<p style="color: var(--text-muted);">No results for "${this.escapeHtml(query)}"</p>`;
            return;
        }

        (q ? results : this.tracks).forEach(track => {
            const trackElement = document.createElement('div');
            trackElement.className = 'search-result';
            const coverUrl = track.cover ? this.encodePath(track.cover) : '';
            const durationText = this.formatTime(track.duration || 0);
            trackElement.innerHTML = `
                <div style="width: 48px; height: 48px; border-radius: 8px; background-image: url('${coverUrl}'); background-size: cover; background-position: center;"></div>
                <div style="flex:1; margin-left: 8px;">
                    <h4 style="margin:0; font-size: 14px;">${this.escapeHtml(track.title)}</h4>
                    <p style="margin:0; color: var(--text-muted); font-size: 12px;">${this.escapeHtml(track.artist || '')}</p>
                </div>
                <span style="margin-left:8px;">${durationText}</span>
            `;
            trackElement.addEventListener('click', () => this.selectTrack(track));
            resultsContainer.appendChild(trackElement);
        });
    }

    switchLibraryTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderLibrary(tab.textContent.trim());
            });
        });
    }

    renderLibrary(activeTab) {
        const container = document.querySelector('.library-content');
        if (!container) return;
        container.innerHTML = '';

        if (activeTab === 'Liked Songs') {
            const likedTracks = this.tracks.filter(t => this.likedTrackIds.includes(t.id));
            if (likedTracks.length === 0) {
                container.innerHTML = `<p style="color:var(--text-muted)">No liked songs yet.</p>`;
                return;
            }
            likedTracks.forEach(track => {
                const row = document.createElement('div');
                row.className = 'search-result';
                const coverUrl = track.cover ? this.encodePath(track.cover) : '';
                row.innerHTML = `
                    <div style="width:48px;height:48px;border-radius:8px;background-image:url('${coverUrl}');background-size:cover;background-position:center;"></div>
                    <div style="flex:1; margin-left:8px;">
                        <h4 style="margin:0">${this.escapeHtml(track.title)}</h4>
                        <p style="margin:0; color: var(--text-muted); font-size:12px">${this.escapeHtml(track.artist)}</p>
                    </div>
                    <button class="like-btn liked" data-like="${track.id}" title="Unlike"><i data-lucide="heart"></i></button>
                `;
                row.addEventListener('click', () => this.selectTrack(track));
                const likeBtn = row.querySelector('.like-btn');
                if (likeBtn) {
                    likeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleLike(track.id);
                        this.renderLibrary('Liked Songs');
                    });
                }
                container.appendChild(row);
            });
            this.setupLucideIcons();
            return;
        }

        // Playlists tab
        if (activeTab === 'Playlists') {
            if (this.playlists.length === 0) {
                container.innerHTML = `<p style="color:var(--text-muted)">No playlists yet. Click "Create Playlist" to add one.</p>`;
                return;
            }
            this.playlists.forEach(pl => {
                const plEl = document.createElement('div');
                plEl.style.marginBottom = '16px';
                plEl.innerHTML = `
                    <h3 style="margin-bottom:8px;">${this.escapeHtml(pl.name)}</h3>
                    <div data-pl="${pl.id}"></div>
                `;
                const tracksWrap = plEl.querySelector('[data-pl]');
                const tracks = pl.trackIds.map(id => this.tracks.find(t => t && t.id === id)).filter(Boolean);
                if (tracks.length === 0) {
                    tracksWrap.innerHTML = `<p style="color:var(--text-muted)">Empty playlist</p>`;
                } else {
                    tracks.forEach(track => {
                        const row = document.createElement('div');
                        row.className = 'search-result';
                        const coverUrl = track.cover ? this.encodePath(track.cover) : '';
                        row.innerHTML = `
                            <div style="width:48px;height:48px;border-radius:8px;background-image:url('${coverUrl}');background-size:cover;background-position:center;"></div>
                            <div style="flex:1; margin-left:8px;">
                                <h4 style="margin:0">${this.escapeHtml(track.title)}</h4>
                                <p style="margin:0; color: var(--text-muted); font-size:12px">${this.escapeHtml(track.artist)}</p>
                            </div>
                            <button data-remove="${track.id}" title="Remove from playlist">Remove</button>
                        `;
                        row.addEventListener('click', () => this.selectTrack(track));
                        const removeBtn = row.querySelector('[data-remove]');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                this.removeFromPlaylist(pl.id, track.id);
                                this.renderLibrary('Playlists');
                            });
                        }
                        tracksWrap.appendChild(row);
                    });
                }
                container.appendChild(plEl);
            });
            return;
        }

        // Recently Played or other tabs
        container.innerHTML = `<p style="color:var(--text-muted)">Coming soon.</p>`;
    }

    toggleLike(trackId) {
        const idx = this.likedTrackIds.indexOf(trackId);
        if (idx === -1) this.likedTrackIds.push(trackId);
        else this.likedTrackIds.splice(idx, 1);
        this.saveToStorage('likedTrackIds', this.likedTrackIds);
    }

    createPlaylist() {
        const name = prompt('Playlist name?');
        if (!name) return;
        const playlist = { id: Date.now(), name: name.trim(), trackIds: [] };
        this.playlists.push(playlist);
        this.saveToStorage('playlists', this.playlists);
        this.switchSection('library');
        this.renderLibrary('Playlists');
    }

    addToPlaylist(playlistId, trackId) {
        const pl = this.playlists.find(p => p.id === playlistId);
        if (!pl) return;
        if (!pl.trackIds.includes(trackId)) pl.trackIds.push(trackId);
        this.saveToStorage('playlists', this.playlists);
    }

    removeFromPlaylist(playlistId, trackId) {
        const pl = this.playlists.find(p => p.id === playlistId);
        if (!pl) return;
        pl.trackIds = pl.trackIds.filter(id => id !== trackId);
        this.saveToStorage('playlists', this.playlists);
    }

    formatTime(seconds) {
        seconds = Number(seconds) || 0;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Small helper to escape HTML in inserted strings
    escapeHtml(str) {
        if (!str && str !== '') return '';
        return String(str).replace(/[&<>"'`=/]/g, (s) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            };
            return map[s] || s;
        });
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.musicHub = new MusicHub();
    } catch (err) {
        console.error('Failed to initialize MusicHub:', err);
    }
});
