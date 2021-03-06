import {
  YoutubeChannelPlaylistsResponse,
  YoutubePlaylistDetailsResponse,
  YoutubeSearchResponse,
} from "./itemsLoader";
export {
  YoutubeChannelPlaylistsResponse,
  YoutubePlaylistDetailsResponse,
  YoutubeSearchResponse,
} from "./itemsLoader";

export const loadPlaylistItems = (
  playlistId: string
): Promise<YoutubePlaylistDetailsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(samplePlaylistResponse), 1000);
  });

export const loadChannelItems = (
  channelId: string
): Promise<YoutubeChannelPlaylistsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(sampleChannelPlaylists), 1000);
  });

export const loadSearchResults = (
  tern: string
): Promise<YoutubeSearchResponse> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(sampleSearchResponse), 1000);
  });

const sampleSearchResponse: YoutubeSearchResponse = {
  nextPageToken: "CBkQAA",
  items: [
    {
      id: "i8SE2by3",
      image: "https://i.ytimg.com/vi/5z6IKnYXqFM/mqdefault.jpg",
      channelTitle: "The Psychedelic Muse",
      channelId: "UCAepXw94EhaO0CZV9f5D3fQ",
      itemId: "5z6IKnYXqFM",
      name: "Sync24 - Comfortable Void [Full Album]",
      itemType: "video",
    },
    {
      id: "qHugt2eE",
      image: "https://i.ytimg.com/vi/8ONz3_vjJIY/mqdefault.jpg",
      channelTitle: "The Psychedelic Muse",
      channelId: "UCAepXw94EhaO0CZV9f5D3fQ",
      itemId: "8ONz3_vjJIY",
      name: "Sync24 - Omnious [Full Album]",
      itemType: "video",
    },
    {
      id: "CuTzeBEc",
      image: "https://i.ytimg.com/vi/vtZv-1tlgzA/mqdefault.jpg",
      channelTitle: "SYNC24",
      channelId: "UCrxV2H8jBQdBxIBjQIegKmw",
      itemId: "vtZv-1tlgzA",
      name: "SYNC24 - ACIDIOUS  | Album live preview in 360",
      itemType: "video",
    },
    {
      id: "53dQQ7Xw",
      image: "https://i.ytimg.com/vi/joI6Dg1uNBY/mqdefault.jpg",
      channelTitle: "Psybrations",
      channelId: "UCEkBEbI7ME92qqjMjqvuIQA",
      itemId: "joI6Dg1uNBY",
      name: "SYNC24 - Dance of the Droids [Music Video]",
      itemType: "video",
    },
    {
      id: "GZIoMQu3",
      image: "https://i.ytimg.com/vi/gOi3FQ0R5fM/mqdefault.jpg",
      channelTitle: "Cosmic Soundwaves",
      channelId: "UC1PtAfzqXQJGvGCEMAwT30Q",
      itemId: "gOi3FQ0R5fM",
      name: "Sync24 - Ambient Archive [1996???-???2002] [Full Album]",
      itemType: "video",
    },
    {
      id: "kxwYFJYX",
      image: "https://i.ytimg.com/vi/3QMvfdXRbm4/mqdefault.jpg",
      itemId: "PLrz8hHdG8-5BaFU3C8-klOA4L6ws-Lw_b",
      name: "Sync24 - Source | Leftfield Records [Full Album]",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      itemType: "playlist",
    },
    {
      id: "OpST8y8z",
      image: "https://i.ytimg.com/vi/CNnkAWLpOFc/mqdefault.jpg",
      channelTitle: "Psychedelic Universe",
      channelId: "UCyRw5ZEQ2mVwNKq9GnSTHRA",
      itemId: "CNnkAWLpOFc",
      name: "Sync24 - Omnious (Full Album)",
      itemType: "video",
    },
    {
      id: "BlXuK1DT",
      image: "https://i.ytimg.com/vi/QZmIN2XyuMM/mqdefault.jpg",
      channelTitle: "Brume argent??e",
      channelId: "UCpRYF3rIduXq4QJ8aXSKPVA",
      itemId: "QZmIN2XyuMM",
      name: "Sync 24 - Source",
      itemType: "video",
    },
    {
      id: "jlR6rgPf",
      image: "https://i.ytimg.com/vi/QYVRGOLR1eQ/mqdefault.jpg",
      channelTitle: "FOLD",
      channelId: "UCIRWmnDrZQeOprPJG9MFCeQ",
      itemId: "QYVRGOLR1eQ",
      name: "FOLD X Cultivated Electronics  // Sync24",
      itemType: "video",
    },
    {
      id: "8bBuLaXi",
      image: "https://i.ytimg.com/vi/fwPlURyv964/mqdefault.jpg",
      channelTitle: "DeFeKT",
      channelId: "UCdL7B98WOSeN5_CPW0OA2hg",
      itemId: "fwPlURyv964",
      name: "Sync 24 & DeFeKT - Pulse Effect",
      itemType: "video",
    },
    {
      id: "Q0_bEUxC",
      image: "https://i.ytimg.com/vi/c117hJ9dje8/mqdefault.jpg",
      itemId: "PLt4Ljtd00HDDGp7zThOo9bo6icToNWC2O",
      name: "Sync24 - Acidious - 2020",
      channelTitle: "A. Fedorov",
      channelId: "UCJsgvVDwBGl__jTJ7uYwl0g",
      itemType: "playlist",
    },
    {
      id: "KyaP7Gy9",
      image: "https://i.ytimg.com/vi/vQFDW0_GB8Q/mqdefault.jpg",
      channelTitle: "AmbientHD",
      channelId: "UCjCFEPN34Vygrld7qmUCc9w",
      itemId: "vQFDW0_GB8Q",
      name: "Sync24 - DOT",
      itemType: "video",
    },
    {
      id: "nfL5Skqi",
      image: "https://i.ytimg.com/vi/c43Lx9q1TV4/mqdefault.jpg",
      channelTitle: "SpaceArt Light",
      channelId: "UCsD5tCx_pEFu7nDNA2zAIfA",
      itemId: "c43Lx9q1TV4",
      name: "Sync24 - Comfortable Void [Full Album Unmixed]",
      itemType: "video",
    },
    {
      id: "-zZJsxy8",
      image: "https://i.ytimg.com/vi/DeC7B9PMmGc/mqdefault.jpg",
      channelTitle: "Chiliocosm",
      channelId: "UCyRn7wIop2N4Y10sLU0pEvw",
      itemId: "DeC7B9PMmGc",
      name: "Sync24 - Memloop",
      itemType: "video",
    },
    {
      id: "JO5M3OBa",
      image: "https://i.ytimg.com/vi/p82D2C3bof8/mqdefault.jpg",
      channelTitle: "Neomorpheous90",
      channelId: "UC2FSbblNJ3bCSfkVMvdoozQ",
      itemId: "p82D2C3bof8",
      name: "Sync24 - Inadvertent [Comfortable Void 2012]",
      itemType: "video",
    },
    {
      id: "5RJFd3fg",
      image: "https://i.ytimg.com/vi/z4tvPOlSk4c/mqdefault.jpg",
      channelTitle: "Euphorhythm Music",
      channelId: "UCUwMatz3g6h9ikRU9yX7jHA",
      itemId: "z4tvPOlSk4c",
      name: "Sync24 - Feet in The Water",
      itemType: "video",
    },
    {
      id: "-rS5-XpF",
      image: "https://i.ytimg.com/vi/BWJrL212SRg/mqdefault.jpg",
      channelTitle: "Trancentral",
      channelId: "UCPvkTCeGc0U7KUL5QVcKF-w",
      itemId: "BWJrL212SRg",
      name: "Sync24 - Omnious [Full Album]",
      itemType: "video",
    },
    {
      id: "7pdtk17f",
      image: "https://i.ytimg.com/vi/xcBwxHj838A/mqdefault.jpg",
      channelTitle: "DZP Music",
      channelId: "UCcEW4SihMCGpa92wUD3vqvA",
      itemId: "xcBwxHj838A",
      name: "Sync24 - Omnious (Full Album)",
      itemType: "video",
    },
    {
      id: "n19rhs63",
      image: "https://i.ytimg.com/vi/3mKbtXdgAYQ/mqdefault.jpg",
      channelTitle: "Scaran100",
      channelId: "UC2LArxdTecS6oIT1JELrnCg",
      itemId: "3mKbtXdgAYQ",
      name: "SYNC24 - Ambient Archive [ 1996-2002 ] full album",
      itemType: "video",
    },
    {
      id: "bxRTAtde",
      image: "https://i.ytimg.com/vi/W4Cd-mnaB7o/mqdefault.jpg",
      channelTitle: "Adaviri",
      channelId: "UCi86VBxArKye-4jnronmlGQ",
      itemId: "W4Cd-mnaB7o",
      name: "Sync24 - Replicant",
      itemType: "video",
    },
    {
      id: "A9NFPzXs",
      image: "https://i.ytimg.com/vi/44mR0n1BJiU/mqdefault.jpg",
      channelTitle: "atomicLogic",
      channelId: "UC4ZSbfPgb_YgywZG0xLbSTQ",
      itemId: "44mR0n1BJiU",
      name: "Sync24 - Source (album edit)",
      itemType: "video",
    },
    {
      id: "4WvJrUb0",
      image: "https://i.ytimg.com/vi/i7RbPMxLxOo/mqdefault.jpg",
      channelTitle: "goacidia90",
      channelId: "UCXJcXDVo3Mi0F9xF30KC08A",
      itemId: "i7RbPMxLxOo",
      name: "Sync24 - Comfortable Void",
      itemType: "video",
    },
    {
      id: "mDSmIOzo",
      image: "https://i.ytimg.com/vi/EWAnlgDvSvM/mqdefault.jpg",
      channelTitle: "343 Labs",
      channelId: "UC4x8XyyOBeyrb9ht164QlCw",
      itemId: "EWAnlgDvSvM",
      name: "Electro in Ableton Live & Pro Tools feat. Sync 24 | Selway's Techno Saturdays",
      itemType: "video",
    },
    {
      id: "FmsD49M2",
      image: "https://i.ytimg.com/vi/_L-pYD1LOOI/mqdefault.jpg",
      channelTitle: "Sync24 - Topic",
      channelId: "UCmVxIp6j_HZR-gVZ-K35stA",
      itemId: "_L-pYD1LOOI",
      name: "Ouroboros",
      itemType: "video",
    },
    {
      id: "RgpyByRB",
      image: "https://i.ytimg.com/vi/L1N_nAxKOmU/mqdefault.jpg",
      channelTitle: "VGK MUSIC VIDEOS",
      channelId: "UCmFgjr8bOl2BWKMToR31ieQ",
      itemId: "L1N_nAxKOmU",
      name: "SYNC24 - Inadvertent",
      itemType: "video",
    },
  ],
};

const samplePlaylistResponse: YoutubeChannelPlaylistsResponse = {
  items: [
    {
      id: "YxPuFerM",
      image: "https://i.ytimg.com/vi/3QMvfdXRbm4/mqdefault.jpg",
      itemId: "3QMvfdXRbm4",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Walk on Spheres | Chill Space",
      itemType: "video",
    },
    {
      id: "6Qanyy_u",
      image: "https://i.ytimg.com/vi/-rSVsS2aTsQ/mqdefault.jpg",
      itemId: "-rSVsS2aTsQ",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Memloop | Chill Space",
      itemType: "video",
    },
    {
      id: "8Vay6LY5",
      image: "https://i.ytimg.com/vi/6x4dLkuRHCQ/mqdefault.jpg",
      itemId: "6x4dLkuRHCQ",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Cryptobiosis | Chill Space",
      itemType: "video",
    },
    {
      id: "NtcMLXsA",
      image: "https://i.ytimg.com/vi/mTOYuY5KcDg/mqdefault.jpg",
      itemId: "mTOYuY5KcDg",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - mBorg | Chill Space",
      itemType: "video",
    },
    {
      id: "CgTqJ-5b",
      image: "https://i.ytimg.com/vi/y9ZaGBIg7Ss/mqdefault.jpg",
      itemId: "y9ZaGBIg7Ss",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Suspended Animation | Chill Space",
      itemType: "video",
    },
    {
      id: "5bnb2z4W",
      image: "https://i.ytimg.com/vi/sm-NN7mro60/mqdefault.jpg",
      itemId: "sm-NN7mro60",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Biota | Chill Space",
      itemType: "video",
    },
    {
      id: "IxDjORYW",
      image: "https://i.ytimg.com/vi/xClDSrzaDCM/mqdefault.jpg",
      itemId: "xClDSrzaDCM",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Replicant | Chill Space",
      itemType: "video",
    },
    {
      id: "lNrDP3Ea",
      image: "https://i.ytimg.com/vi/XcN9C1B-Yio/mqdefault.jpg",
      itemId: "XcN9C1B-Yio",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - White Pixels | Chill Space",
      itemType: "video",
    },
    {
      id: "2ZpvID9G",
      image: "https://i.ytimg.com/vi/xy-PtAjbEWA/mqdefault.jpg",
      itemId: "xy-PtAjbEWA",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - From A to A | Chill Space",
      itemType: "video",
    },
    {
      id: "G_37i1uj",
      image: "https://i.ytimg.com/vi/mge7GNI5S2g/mqdefault.jpg",
      itemId: "mge7GNI5S2g",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Woodland (resurrected) | Chill Space",
      itemType: "video",
    },
    {
      id: "lSUpIHja",
      image: "https://i.ytimg.com/vi/zwYxhTx3ntY/mqdefault.jpg",
      itemId: "zwYxhTx3ntY",
      channelTitle: "Chill Space",
      channelId: "UCNHbHR2KOc851Kkb_TJ2Orw",
      name: "Sync24 - Source (album edit) | Chill Space",
      itemType: "video",
    },
  ],
};

const sampleChannelPlaylists: YoutubeChannelPlaylistsResponse = {
  nextPageToken: "CBkQAA",
  items: [
    {
      id: "_YuMGj4P",
      image: "https://i.ytimg.com/vi/gt02I1Th0Do/mqdefault.jpg",
      itemId: "PL22J3VaeABQD7ylKfs5DnSUs0pI1ZzplI",
      name: "JBP Meaning Wave | Akira the Don",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "6AUUi9Su",
      image: "https://i.ytimg.com/vi/C1sEHNw4UIg/mqdefault.jpg",
      itemId: "PL22J3VaeABQB9_JvppLW-SfTyY3JWVzIV",
      name: "Jordan Peterson in Interviews | 2021",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "VJYJVsJL",
      image: "https://i.ytimg.com/vi/grhlTFPaMaw/mqdefault.jpg",
      itemId: "PL22J3VaeABQApdJp7jC0c4aIiKj_vfbUT",
      name: "Beyond Order: 12 More Rules for Life",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "mLtx-PEz",
      image: "https://i.ytimg.com/vi/48ewiClu9Ho/mqdefault.jpg",
      itemId: "PL22J3VaeABQDC30C6Xza5G8MqUD9gyUR4",
      name: "Auckland Clips",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "Aa0hHJnY",
      image: "https://i.ytimg.com/vi/MnUfXYGtT5Q/mqdefault.jpg",
      itemId: "PL22J3VaeABQCYY-rn3F5X6j6BiFnILr_5",
      name: "On (my) Belief in God",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "Pc08hBkj",
      image: "https://i.ytimg.com/vi/WlckHEA-Ldk/mqdefault.jpg",
      itemId: "PL22J3VaeABQB-zLnGRxYE2duD9RLjc8TI",
      name: "Podcasts",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "H-5j5cbB",
      image: "https://i.ytimg.com/vi/_xjP4fMwdLY/mqdefault.jpg",
      itemId: "PL22J3VaeABQD3XHkDO5cdaogrbPQM3zhF",
      name: "JB Peterson: Criticism and Discussion",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "cXhLYsBf",
      image: "https://i.ytimg.com/vi/VoLEe7YEwWw/mqdefault.jpg",
      itemId: "PL22J3VaeABQCvNnWM3p2cYMtArHCA_oWO",
      name: "Public Talks and Events",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "U7FrsaGK",
      image: "https://i.ytimg.com/vi/_vAat1HQU0M/mqdefault.jpg",
      itemId: "PL22J3VaeABQBCm6PcPQzMtFkDz_-M_xch",
      name: "12 Rules for Life",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "XhMcv3SV",
      image: "https://i.ytimg.com/vi/4IdzC6mJzLA/mqdefault.jpg",
      itemId: "PL22J3VaeABQCrcaPywwblW8dQkxiTQdVo",
      name: "Products",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "icfboldi",
      image: "https://i.ytimg.com/vi/f-wWBGo6a2w/mqdefault.jpg",
      itemId: "PL22J3VaeABQD_IZs7y60I3lUrrFTzkpat",
      name: "The Psychological Significance of the Biblical Stories: Genesis",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "aLcHzmJ3",
      image: "https://i.ytimg.com/vi/u6CsGY8wpGw/mqdefault.jpg",
      itemId: "PL22J3VaeABQAbP8Fl9nB-yxu6YNfhUWtt",
      name: "Q & A's",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "WPihWyyr",
      image: "https://i.ytimg.com/vi/hJ4JEypNH2s/mqdefault.jpg",
      itemId: "PL22J3VaeABQA_4uQfPdSEhiNhQM236_O-",
      name: "Dialogues with Interesting People",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "b4RV1oW5",
      image: "https://i.ytimg.com/vi/I8Xc2_FtpHI/mqdefault.jpg",
      itemId: "PL22J3VaeABQAT-0aSPq-OKOpQlHyR4k5h",
      name: "2017 Maps of Meaning: The Architecture of Belief (University of Toronto)",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "Iy3zgShW",
      image: "https://i.ytimg.com/vi/kYYJlNbV1OM/mqdefault.jpg",
      itemId: "PL22J3VaeABQApSdW8X71Ihe34eKN6XhCi",
      name: "2017 Personality and Its Transformations (University of Toronto)",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "kDPAOqYo",
      image: "https://i.ytimg.com/vi/mDg8sP_atIA/mqdefault.jpg",
      itemId: "PL22J3VaeABQBgT8FlpBUKjpoOKjR4t6XM",
      name: "Recent Interviews and Podcasts",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "Vx1OJjWE",
      image: "https://i.ytimg.com/vi/vjDdFXwITXo/mqdefault.jpg",
      itemId: "PL22J3VaeABQD0f71oraDkMv9LfntA2-Sm",
      name: "The Alternative to Left and Right Wing Ideological Possession",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "_cMD33on",
      image: "https://i.ytimg.com/vi/Bpim_n0r0z0/mqdefault.jpg",
      itemId: "PL22J3VaeABQD8oW-mqWpKumeqglQCe6VZ",
      name: "Professor Against Political Correctness",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "GKYnBFKz",
      image: "https://i.ytimg.com/vi/MCOw0eJ84d8/mqdefault.jpg",
      itemId: "PL22J3VaeABQARn07dlhIViWyORP02WLjT",
      name: "Great Paragraphs",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "7Nbz6d9b",
      image: "https://i.ytimg.com/vi/AHnHMtk2FLc/mqdefault.jpg",
      itemId: "PL22J3VaeABQB8vK3Dhky0GAioqeJUHzUM",
      name: "Introductory Videos: 1-5 minutes",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "NcBg0zjs",
      image: "https://i.ytimg.com/vi/UGLsnu5RLe8/mqdefault.jpg",
      itemId: "PL22J3VaeABQAOhH1CLMNnMl2R-O1abW1T",
      name: "2016 Personality and Its Transformations (University of Toronto)",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "DqQ3IROI",
      image: "https://i.ytimg.com/vi/bjnvtRgpg6g/mqdefault.jpg",
      itemId: "PL22J3VaeABQAGbKJNDrRa6GNL0iL4KoOj",
      name: "2016 Maps of Meaning (University of Toronto)",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "Q9dEoVU-",
      image: "https://i.ytimg.com/vi/07Ys4tQPRis/mqdefault.jpg",
      itemId: "PL22J3VaeABQAi08kRDEA8WsLYS0YcGtwd",
      name: "2015 External Videos",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "hSguTm7Q",
      image: "https://i.ytimg.com/vi/knEZN9U-9xc/mqdefault.jpg",
      itemId: "PL22J3VaeABQC6oShltYc6rMUDAGJ7_G5e",
      name: "Psychology and Religion: 13 30-min lectures: TVO's Maps of Meaning",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
    {
      id: "osF9FwTx",
      image: "https://i.ytimg.com/vi/z-AmpAhspCg/mqdefault.jpg",
      itemId: "PL22J3VaeABQCDeqQjrNLGqdlEbVR9Lowk",
      name: "Maps of Meaning (Farsi) / ?????? ????????????????? ????????",
      channelTitle: "Jordan B Peterson",
      channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
      itemType: "playlist",
    },
  ],
};
