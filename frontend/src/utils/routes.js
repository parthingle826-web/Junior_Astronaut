

export const VIEW_TO_PATH = {
  landing: '/',
  register: '/register',
  dashboard: '/dashboard',
  training: '/training',
  briefing: '/mission-briefing',
  launch: '/launch',
  mission_control: '/mission-control',
  moon_landing: '/moon-landing',
  lunar_exploration: '/lunar-exploration',
  nasa_data: '/nasa-data',
  report: '/mission-report',
  certificate: '/certificate',
  leaderboard: '/leaderboard',
  about: '/about'
};


export const PATH_TO_VIEW_ALIASES = {
  '': 'landing',
  '/': 'landing',
  'landing': 'landing',
  'register': 'register',
  'registration': 'register',
  'astronaut-registration': 'register',
  'dashboard': 'dashboard',
  'cadet-dashboard': 'dashboard',
  'training': 'training',
  'training-center': 'training',
  'briefing': 'briefing',
  'mission-briefing': 'briefing',
  'launch': 'launch',
  'launch-sequence': 'launch',
  'mission-control': 'mission_control',
  'mission_control': 'mission_control',
  'moon-landing': 'moon_landing',
  'moon_landing': 'moon_landing',
  'lunar-exploration': 'lunar_exploration',
  'lunar_exploration': 'lunar_exploration',
  'nasa-data': 'nasa_data',
  'nasa_data': 'nasa_data',
  'report': 'report',
  'mission-report': 'report',
  'certificate': 'certificate',
  'leaderboard': 'leaderboard',
  'about': 'about'
};


export const PUBLIC_VIEWS = new Set(['landing', 'register']);

/**
 * Check if a given view requires an enrolled astronaut profile
 * @param {string} view 
 * @returns {boolean}
 */
export const isProtectedRoute = (view) => {
  if (!view) return false;
  return !PUBLIC_VIEWS.has(view);
};

/**
 * Get canonical URL pathname for a view
 * @param {string} view 
 * @returns {string}
 */
export const getPathForView = (view) => {
  return VIEW_TO_PATH[view] || '/';
};

/**
 * Normalize any path, hash, or slug into a valid internal view ID
 * @param {string} raw 
 * @returns {string|null}
 */
export const normalizeView = (raw) => {
  if (!raw && raw !== '') return null;
  const cleaned = String(raw).replace(/^[#/]+/, '').toLowerCase().trim();
  if (!cleaned || cleaned === 'index.html') return 'landing';
  return PATH_TO_VIEW_ALIASES[cleaned] || null;
};

/**
 * Extract view ID from the current browser location (pathname or hash)
 * @returns {string}
 */
export const getViewFromLocation = () => {
  if (typeof window === 'undefined') return 'landing';


  if (window.location.hash) {
    const hashCleaned = window.location.hash.replace(/^#[/]?/, '');
    const hashView = normalizeView(hashCleaned);
    if (hashView) return hashView;
  }


  const pathname = window.location.pathname;
  const pathView = normalizeView(pathname);
  if (pathView) return pathView;

  return 'landing';
};

/**
 * Synchronously resolve the initial view and session state on app boot/reload.
 * Ensures zero-flash restoration and immediate route protection before render.
 * @returns {{ initialView: string, astronaut: object|null, shouldRedirectUrl: boolean, redirectPath: string }}
 */
export const resolveInitialSession = () => {
  let savedAstronaut = null;
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('jamt_astronaut') : null;
    savedAstronaut = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to parse astronaut from localStorage', e);
  }

  const urlView = getViewFromLocation();
  const savedRouteRaw = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('jamt_last_route') || localStorage.getItem('jamt_view') || savedAstronaut?.lastRoute)
    : null;
  const savedView = savedRouteRaw ? normalizeView(savedRouteRaw) : null;

  
  if (savedAstronaut) {

    if (urlView && urlView !== 'landing') {
      return {
        initialView: urlView,
        astronaut: savedAstronaut,
        shouldRedirectUrl: false,
        redirectPath: getPathForView(urlView)
      };
    }

    
    const resumeView = (savedView && savedView !== 'landing' && savedView !== 'register')
      ? savedView
      : 'dashboard';

    return {
      initialView: resumeView,
      astronaut: savedAstronaut,
      shouldRedirectUrl: true,
      redirectPath: getPathForView(resumeView)
    };
  }

  
  if (urlView && isProtectedRoute(urlView)) {

    return {
      initialView: 'landing',
      astronaut: null,
      shouldRedirectUrl: true,
      redirectPath: '/',
      blockedFrom: urlView
    };
  }

  const safeView = urlView === 'register' ? 'register' : 'landing';
  return {
    initialView: safeView,
    astronaut: null,
    shouldRedirectUrl: window.location.pathname !== getPathForView(safeView),
    redirectPath: getPathForView(safeView)
  };
};
