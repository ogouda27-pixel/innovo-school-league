import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  Calendar,
  Users,
  Shield,
  Lock,
  Unlock,
  Edit3,
  Check,
  X,
  Share2,
  Download,
  Upload,
  AlertTriangle,
  Clock,
  Filter,
  Image as ImageIcon,
  RotateCcw,
  LogOut,
  CheckCircle2,
  Cloud,
} from "lucide-react";

// ضع هنا رابط قاعدة البيانات الذي نسخته من Firebase Realtime Database (بدون / في النهاية)
const FIREBASE_DB_URL = "https://YOUR-PROJECT-ID-default-rtdb.firebaseio.com";

const INITIAL_ADMIN = {
  email: "admin@innovo.edu.eg",
  password: "Innovo@2026",
};

const INITIAL_TEAMS = [
  {
    id: "T1",
    group: "A",
    name: "Team 1",
    color: "#2563eb",
    logo: "",
    captain: "بلال وائل طه",
    players: [
      "محمد خالد رمضان حسن",
      "بلال وائل طه (C)",
      "أحمد محمد إسماعيل محمد",
      "يوسف محمد علي",
      "سيف الله سيد حسن محمد علي",
    ],
  },
  {
    id: "T3",
    group: "A",
    name: "Team 3",
    color: "#0891b2",
    logo: "",
    captain: "محمد محمد ناجي أبو السعود",
    players: [
      "إياد سامح يسري عبد المطلب",
      "أدهم محمد عبد الرحيم",
      "محمد محمد ناجي أبو السعود (C)",
      "فادي جرجس",
      "خالد أحمد محمود مسعود",
    ],
  },
  {
    id: "T5",
    group: "A",
    name: "Team 5",
    color: "#059669",
    logo: "",
    captain: "إياد محمد جلال أحمد",
    players: [
      "محمد أحمد محمد قرني",
      "ياسين وليد عبد الجواد",
      "يس إيهاب عبد الواحد عبد القادر",
      "إياد محمد جلال أحمد (C)",
    ],
  },
  {
    id: "T7",
    group: "A",
    name: "Team 7",
    color: "#d97706",
    logo: "",
    captain: "أحمد عبد الوهاب إبراهيم",
    players: [
      "محمد أحمد محمد علي",
      "أحمد عبد الوهاب إبراهيم (C)",
      "محمد صلاح محمد محمود",
      "أدهم صبحي إبراهيم الدسوقي",
      "أدهم عزت علي",
    ],
  },
  {
    id: "T2",
    group: "B",
    name: "Team 2",
    color: "#7c3aed",
    logo: "",
    captain: "محمد مصطفى بدر الدين محمد",
    players: [
      "آدم عماد عبد الستار",
      "محمد السيد فرغلي السيد",
      "ياسين وليد إبراهيم",
      "محمد مصطفى بدر الدين محمد (C)",
      "كريم هشام عبد الوهاب حمص",
    ],
  },
  {
    id: "T4",
    group: "B",
    name: "Team 4",
    color: "#db2777",
    logo: "",
    captain: "أحمد جمعة سيد أمين",
    players: [
      "أحمد محمد أحمد عبد التواب",
      "أحمد جمعة سيد أمين (C)",
      "مصطفى إبراهيم محمد أبو كاشف",
      "عبد الرحمن عزت عودة متولي",
      "مارك ملاك إدوار عزيز",
    ],
  },
  {
    id: "T6",
    group: "B",
    name: "Team 6",
    color: "#dc2626",
    logo: "",
    captain: "مارك ملاك إدوار عزيز",
    players: [
      "محمد أحمد محمد برعي",
      "آدم إبراهيم أبو بكر ياسين",
      "ياسين محمد أحمد علي",
      "خالد محمد أحمد حسين",
      "مارك ملاك إدوار عزيز (C)",
    ],
  },
  {
    id: "T8",
    group: "B",
    name: "Team 8",
    color: "#4f46e5",
    logo: "",
    captain: "عبد الله حسين هاشم",
    players: [
      "د. ريمون أرمنيوس",
      "م. عبد الرحمن سعد",
      "م. كرلس شوقي",
      "مهند أحمد عبد الحميد عبد الحميد",
      "ك. عمر عبد الرحمن",
      "عبد الله حسين هاشم (C)",
    ],
  },
];

const INITIAL_MATCHES = [
  { id: 1, stage: "Group A - الجولة 1", group: "A", date: "الخميس 26 نوفمبر 2026", time: "10:30 - 10:55 ص", homeId: "T1", awayId: "T3", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 2, stage: "Group A - الجولة 1", group: "A", date: "الأحد 29 نوفمبر 2026", time: "10:30 - 10:55 ص", homeId: "T5", awayId: "T7", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 3, stage: "Group B - الجولة 1", group: "B", date: "الثلاثاء 1 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T2", awayId: "T4", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 4, stage: "Group B - الجولة 1", group: "B", date: "الخميس 3 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T6", awayId: "T8", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 5, stage: "Group A - الجولة 2", group: "A", date: "الأحد 6 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T1", awayId: "T5", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 6, stage: "Group A - الجولة 2", group: "A", date: "الثلاثاء 8 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T3", awayId: "T7", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 7, stage: "Group B - الجولة 2", group: "B", date: "الخميس 10 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T2", awayId: "T6", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 8, stage: "Group B - الجولة 2", group: "B", date: "الأحد 13 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T4", awayId: "T8", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 9, stage: "Group A - الجولة 3", group: "A", date: "الثلاثاء 15 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T1", awayId: "T7", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 10, stage: "Group A - الجولة 3", group: "A", date: "الخميس 17 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T3", awayId: "T5", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 11, stage: "Group B - الجولة 3", group: "B", date: "الأحد 20 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T2", awayId: "T8", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 12, stage: "Group B - الجولة 3", group: "B", date: "الثلاثاء 22 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: "T4", awayId: "T6", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 13, stage: "نصف النهائي 1", group: "KO", date: "الخميس 24 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: null, awayId: null, homeLabel: "أول المجموعة A", awayLabel: "ثاني المجموعة B", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 14, stage: "نصف النهائي 2", group: "KO", date: "الأحد 27 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: null, awayId: null, homeLabel: "أول المجموعة B", awayLabel: "ثاني المجموعة A", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 15, stage: "تحديد المركز الثالث", group: "KO", date: "الثلاثاء 29 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: null, awayId: null, homeLabel: "خاسر نصف النهائي 1", awayLabel: "خاسر نصف النهائي 2", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
  { id: 16, stage: "المباراة النهائية", group: "KO", date: "الخميس 31 ديسمبر 2026", time: "10:30 - 10:55 ص", homeId: null, awayId: null, homeLabel: "فائز نصف النهائي 1", awayLabel: "فائز نصف النهائي 2", homeScore: null, awayScore: null, status: "upcoming", homeYellow: 0, awayYellow: 0, homeRed: 0, awayRed: 0, note: "" },
];

const isCloudConfigured = () =>
  FIREBASE_DB_URL && !FIREBASE_DB_URL.includes("YOUR-PROJECT-ID");

export default function App() {
  const [teams, setTeams] = useState(() => {
    try {
      const saved = localStorage.getItem("innovo_2026_teams");
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch {
      return INITIAL_TEAMS;
    }
  });

  const [matches, setMatches] = useState(() => {
    try {
      const saved = localStorage.getItem("innovo_2026_matches");
      return saved ? JSON.parse(saved) : INITIAL_MATCHES;
    } catch {
      return INITIAL_MATCHES;
    }
  });

  const [leagueLogo, setLeagueLogo] = useState(() => {
    try {
      return localStorage.getItem("innovo_2026_logo") || "";
    } catch {
      return "";
    }
  });

  const [adminCreds, setAdminCreds] = useState(() => {
    try {
      const saved = localStorage.getItem("innovo_2026_admin");
      return saved ? JSON.parse(saved) : INITIAL_ADMIN;
    } catch {
      return INITIAL_ADMIN;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("matches");
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [teamFilter, setTeamFilter] = useState("ALL");
  const [editingMatchId, setEditingMatchId] = useState(null);
  const [matchDraft, setMatchDraft] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [cloudStatus, setCloudStatus] = useState(
    isCloudConfigured() ? "connected" : "local"
  );

  const [newEmail, setNewEmail] = useState(adminCreds.email);
  const [newPassword, setNewPassword] = useState(adminCreds.password);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // حفظ نسخة محلية دائماً
  useEffect(() => {
    try {
      localStorage.setItem("innovo_2026_teams", JSON.stringify(teams));
    } catch {}
  }, [teams]);

  useEffect(() => {
    try {
      localStorage.setItem("innovo_2026_matches", JSON.stringify(matches));
    } catch {}
  }, [matches]);

  useEffect(() => {
    try {
      localStorage.setItem("innovo_2026_logo", leagueLogo);
    } catch {}
  }, [leagueLogo]);

  useEffect(() => {
    try {
      localStorage.setItem("innovo_2026_admin", JSON.stringify(adminCreds));
    } catch {}
  }, [adminCreds]);

  // قراءة التحديثات من Firebase لكل الأجهزة والموبايلات بشكل دوري
  useEffect(() => {
    if (!isCloudConfigured()) return;

    let active = true;
    const pullFromCloud = async () => {
      try {
        const res = await fetch(`${FIREBASE_DB_URL}/leagueData.json`);
        if (!res.ok) return;
        const data = await res.json();
        if (!active || !data) return;

        // لا نطغى على تعديلات المشرف أثناء التحرير المباشر
        if (!isAdmin) {
          if (Array.isArray(data.teams)) setTeams(data.teams);
          if (Array.isArray(data.matches)) setMatches(data.matches);
          if (typeof data.leagueLogo === "string") setLeagueLogo(data.leagueLogo);
        }
        setCloudStatus("connected");
      } catch {
        if (active) setCloudStatus("local");
      }
    };

    pullFromCloud();
    const interval = setInterval(pullFromCloud, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isAdmin]);

  // رفع البيانات إلى Firebase عند قيام المشرف بالتعديل
  const syncToCloud = async (nextTeams, nextMatches, nextLogo) => {
    if (!isCloudConfigured()) return;
    try {
      await fetch(`${FIREBASE_DB_URL}/leagueData.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teams: nextTeams,
          matches: nextMatches,
          leagueLogo: nextLogo,
          updatedAt: Date.now(),
        }),
      });
      setCloudStatus("connected");
    } catch {
      setCloudStatus("local");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginEmail.trim().toLowerCase() === adminCreds.email.toLowerCase() &&
      loginPassword === adminCreds.password
    ) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError("");
      setLoginEmail("");
      setLoginPassword("");
      showToast("تم تسجيل دخول المشرف بنجاح");
    } else {
      setLoginError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (activeTab === "admin") setActiveTab("matches");
    showToast("تم تسجيل الخروج - وضع المشاهدة للطلاب");
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("تم نسخ رابط المتابعة لمشاركته مع المدرسة والطلاب");
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
        showToast("تم تحديث الشعار بنجاح");
      }
    };
    reader.readAsDataURL(file);
  };

  const getTeam = (id) => teams.find((t) => t.id === id);

  const standings = useMemo(() => {
    const calcGroup = (groupCode) => {
      const groupTeams = teams.filter((t) => t.group === groupCode);
      const groupMatches = matches.filter(
        (m) =>
          m.group === groupCode &&
          m.status === "finished" &&
          m.homeScore !== null &&
          m.awayScore !== null &&
          m.homeScore !== "" &&
          m.awayScore !== ""
      );

      const table = groupTeams.map((team) => ({
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0,
        yellow: 0,
        red: 0,
        fairPlayScore: 0,
      }));

      const mapById = Object.fromEntries(table.map((row) => [row.team.id, row]));

      for (const m of groupMatches) {
        const h = mapById[m.homeId];
        const a = mapById[m.awayId];
        if (!h || !a) continue;

        const hs = Number(m.homeScore);
        const as = Number(m.awayScore);

        h.played += 1;
        a.played += 1;
        h.gf += hs;
        h.ga += as;
        a.gf += as;
        a.ga += hs;
        h.gd = h.gf - h.ga;
        a.gd = a.gf - a.ga;

        h.yellow += Number(m.homeYellow || 0);
        a.yellow += Number(m.awayYellow || 0);
        h.red += Number(m.homeRed || 0);
        a.red += Number(m.awayRed || 0);

        if (hs > as) {
          h.won += 1;
          h.points += 2;
          a.lost += 1;
        } else if (as > hs) {
          a.won += 1;
          a.points += 2;
          h.lost += 1;
        } else {
          h.drawn += 1;
          a.drawn += 1;
          h.points += 1;
          a.points += 1;
        }
      }

      for (const row of table) {
        row.fairPlayScore = row.yellow * 1 + row.red * 3;
      }

      const headToHead = (id1, id2) => {
        let p1 = 0,
          p2 = 0,
          gd1 = 0,
          gd2 = 0;
        for (const m of groupMatches) {
          if (
            (m.homeId === id1 && m.awayId === id2) ||
            (m.homeId === id2 && m.awayId === id1)
          ) {
            const hs = Number(m.homeScore);
            const as = Number(m.awayScore);
            const s1 = m.homeId === id1 ? hs : as;
            const s2 = m.homeId === id1 ? as : hs;
            gd1 += s1 - s2;
            gd2 += s2 - s1;
            if (s1 > s2) p1 += 2;
            else if (s2 > s1) p2 += 2;
            else {
              p1 += 1;
              p2 += 1;
            }
          }
        }
        return { p1, p2, gd1, gd2 };
      };

      table.sort((x, y) => {
        if (y.points !== x.points) return y.points - x.points;
        const h2h = headToHead(x.team.id, y.team.id);
        if (h2h.p2 !== h2h.p1) return h2h.p2 - h2h.p1;
        if (h2h.gd2 !== h2h.gd1) return h2h.gd2 - h2h.gd1;
        if (y.gd !== x.gd) return y.gd - x.gd;
        if (y.gf !== x.gf) return y.gf - x.gf;
        if (x.fairPlayScore !== y.fairPlayScore)
          return x.fairPlayScore - y.fairPlayScore;
        return x.team.name.localeCompare(y.team.name, "ar");
      });

      return table;
    };

    return {
      A: calcGroup("A"),
      B: calcGroup("B"),
    };
  }, [teams, matches]);

  const startEditMatch = (match) => {
    if (!isAdmin) return;
    setEditingMatchId(match.id);
    setMatchDraft({
      homeId: match.homeId || "",
      awayId: match.awayId || "",
      homeScore: match.homeScore ?? "",
      awayScore: match.awayScore ?? "",
      status: match.status || "upcoming",
      homeYellow: match.homeYellow ?? 0,
      awayYellow: match.awayYellow ?? 0,
      homeRed: match.homeRed ?? 0,
      awayRed: match.awayRed ?? 0,
      note: match.note || "",
    });
  };

  const saveMatchEdit = (id) => {
    if (!isAdmin || !matchDraft) return;
    const nextMatches = matches.map((m) =>
      m.id === id
        ? {
            ...m,
            homeId: matchDraft.homeId || null,
            awayId: matchDraft.awayId || null,
            homeScore:
              matchDraft.homeScore === "" ? null : Number(matchDraft.homeScore),
            awayScore:
              matchDraft.awayScore === "" ? null : Number(matchDraft.awayScore),
            status: matchDraft.status,
            homeYellow: Number(matchDraft.homeYellow || 0),
            awayYellow: Number(matchDraft.awayYellow || 0),
            homeRed: Number(matchDraft.homeRed || 0),
            awayRed: Number(matchDraft.awayRed || 0),
            note: matchDraft.note,
          }
        : m
    );
    setMatches(nextMatches);
    syncToCloud(teams, nextMatches, leagueLogo);
    setEditingMatchId(null);
    setMatchDraft(null);
    showToast("تم حفظ النتيجة ومزامنتها لجميع الطلاب");
  };

  const applyWalkover = (winnerSide) => {
    if (!matchDraft) return;
    setMatchDraft({
      ...matchDraft,
      homeScore: winnerSide === "home" ? 3 : 0,
      awayScore: winnerSide === "away" ? 3 : 0,
      status: "finished",
      note:
        matchDraft.note ||
        (winnerSide === "home"
          ? "فوز بالانسحاب (3 - 0) حسب اللائحة"
          : "فوز بالانسحاب (0 - 3) حسب اللائحة"),
    });
  };

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      if (groupFilter !== "ALL" && m.group !== groupFilter) return false;
      if (teamFilter !== "ALL" && m.homeId !== teamFilter && m.awayId !== teamFilter)
        return false;
      return true;
    });
  }, [matches, groupFilter, teamFilter]);

  const finishedCount = matches.filter((m) => m.status === "finished").length;
  const remainingCount = matches.length - finishedCount;

  const exportBackup = () => {
    const data = JSON.stringify({ teams, matches, leagueLogo }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "innovo-school-league-2026-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("تم تحميل نسخة احتياطية JSON");
  };

  const importBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const nextTeams = Array.isArray(parsed.teams) ? parsed.teams : teams;
        const nextMatches = Array.isArray(parsed.matches) ? parsed.matches : matches;
        const nextLogo =
          typeof parsed.leagueLogo === "string" ? parsed.leagueLogo : leagueLogo;
        setTeams(nextTeams);
        setMatches(nextMatches);
        setLeagueLogo(nextLogo);
        syncToCloud(nextTeams, nextMatches, nextLogo);
        showToast("تم استعادة النسخة الاحتياطية ومزامنتها");
      } catch {
        showToast("ملف النسخة الاحتياطية غير صالح");
      }
    };
    reader.readAsText(file);
  };

  const resetAllData = () => {
    if (!isAdmin) return;
    if (
      window.confirm(
        "هل أنت متأكد من إعادة ضبط جميع النتائج والفرق واللوجو إلى الوضع الافتراضي؟"
      )
    ) {
      setTeams(INITIAL_TEAMS);
      setMatches(INITIAL_MATCHES);
      setLeagueLogo("");
      syncToCloud(INITIAL_TEAMS, INITIAL_MATCHES, "");
      showToast("تمت إعادة الضبط للوضع الافتراضي");
    }
  };

  const renderTeamBadge = (team, fallbackLabel = "سيُحدد") => {
    if (!team) {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {fallbackLabel}
        </span>
      );
    }
    return (
      <div className="flex items-center gap-2.5">
        {team.logo ? (
          <img
            src={team.logo}
            alt={team.name}
            className="h-8 w-8 rounded-full border border-slate-200 object-cover bg-white"
          />
        ) : (
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: team.color || "#1e293b" }}
          >
            {team.id}
          </span>
        )}
        <span className="font-bold text-slate-900">{team.name}</span>
      </div>
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      {toastMsg && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {leagueLogo ? (
                <img
                  src={leagueLogo}
                  alt="شعار البطولة"
                  className="h-14 w-14 rounded-2xl border border-slate-200 object-cover bg-white shadow-sm"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                  <Trophy className="h-7 w-7" />
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    INNOVO SCHOOL LEAGUE 2026
                  </h1>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                    4 × 4
                  </span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                  Innovo Applied Technology School • ONE SCHOOL. ONE LEAGUE. ONE CHAMPION.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Share2 className="h-4 w-4 text-blue-600" />
                <span>مشاركة للطلاب</span>
              </button>

              {isAdmin ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خروج المشرف</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Lock className="h-4 w-4 text-amber-400" />
                  <span>دخول المشرف</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="text-xs text-slate-500">إجمالي المباريات</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">16 مباراة</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="text-xs text-slate-500">المباريات المنتهية</div>
              <div className="mt-1 text-lg font-extrabold text-emerald-600">
                {finishedCount}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="text-xs text-slate-500">المباريات المتبقية</div>
              <div className="mt-1 text-lg font-extrabold text-blue-600">
                {remainingCount}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="text-xs text-slate-500">موعد النهائي</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">
                الخميس 31 ديسمبر 2026
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <nav className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("matches")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "matches"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>النتائج والجدول</span>
              </button>
              <button
                onClick={() => setActiveTab("standings")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "standings"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Trophy className="h-4 w-4" />
                <span>ترتيب المجموعات</span>
              </button>
              <button
                onClick={() => setActiveTab("teams")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "teams"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>الفرق واللاعبون</span>
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition ${
                    activeTab === "admin"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>إدارة الفرق واللوجو</span>
                </button>
              )}
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600">
                <Cloud
                  className={`h-3.5 w-3.5 ${
                    cloudStatus === "connected" ? "text-emerald-600" : "text-amber-500"
                  }`}
                />
                <span>
                  {cloudStatus === "connected"
                    ? "مزامنة سحابية حية"
                    : "تخزين محلي"}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600">
                {isAdmin ? (
                  <>
                    <Unlock className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">وضع المشرف: التعديل مفعّل</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                    <span>وضع المتابعة للطلاب (للقراءة فقط)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {activeTab === "matches" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Filter className="h-3.5 w-3.5" />
                  تصفية:
                </span>
                {[
                  { id: "ALL", label: "الكل (16)" },
                  { id: "A", label: "Group A" },
                  { id: "B", label: "Group B" },
                  { id: "KO", label: "الأدوار الإقصائية" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setGroupFilter(f.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      groupFilter === f.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="ALL">كل الفرق</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Group {t.group})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredMatches.map((match) => {
                const homeTeam = getTeam(match.homeId);
                const awayTeam = getTeam(match.awayId);
                const isEditing = editingMatchId === match.id && isAdmin;

                return (
                  <div
                    key={match.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs text-slate-500">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
                          مباراة #{match.id}
                        </span>
                        <span className="font-semibold text-blue-700">{match.stage}</span>
                        <span>•</span>
                        <span>{match.date}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {match.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {match.status === "live" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
                            مباشر الآن
                          </span>
                        )}
                        {match.status === "finished" && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                            انتهت
                          </span>
                        )}
                        {match.status === "upcoming" && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                            لم تبدأ
                          </span>
                        )}

                        {isAdmin && !isEditing && (
                          <button
                            onClick={() => startEditMatch(match)}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>تعديل النتيجة</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {!isEditing ? (
                      <div className="mt-3 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex w-full items-center justify-between sm:w-2/5 sm:justify-start">
                          {renderTeamBadge(homeTeam, match.homeLabel || "سيُحدد")}
                          {(match.homeYellow > 0 || match.homeRed > 0) && (
                            <div className="flex items-center gap-1 text-xs">
                              {match.homeYellow > 0 && (
                                <span className="rounded bg-amber-300 px-1.5 py-0.5 font-bold text-slate-900">
                                  {match.homeYellow}🟨
                                </span>
                              )}
                              {match.homeRed > 0 && (
                                <span className="rounded bg-rose-600 px-1.5 py-0.5 font-bold text-white">
                                  {match.homeRed}🟥
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-2 text-lg font-extrabold text-white">
                          <span>{match.homeScore ?? "-"}</span>
                          <span className="text-slate-400">:</span>
                          <span>{match.awayScore ?? "-"}</span>
                        </div>

                        <div className="flex w-full items-center justify-between sm:w-2/5 sm:justify-end">
                          {(match.awayYellow > 0 || match.awayRed > 0) && (
                            <div className="mr-2 flex items-center gap-1 text-xs">
                              {match.awayYellow > 0 && (
                                <span className="rounded bg-amber-300 px-1.5 py-0.5 font-bold text-slate-900">
                                  {match.awayYellow}🟨
                                </span>
                              )}
                              {match.awayRed > 0 && (
                                <span className="rounded bg-rose-600 px-1.5 py-0.5 font-bold text-white">
                                  {match.awayRed}🟥
                                </span>
                              )}
                            </div>
                          )}
                          {renderTeamBadge(awayTeam, match.awayLabel || "سيُحدد")}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-4 rounded-xl bg-slate-50 p-4 border border-slate-200">
                        {match.group === "KO" && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-slate-700">
                                الطرف الأول ({match.homeLabel})
                              </label>
                              <select
                                value={matchDraft.homeId}
                                onChange={(e) =>
                                  setMatchDraft({ ...matchDraft, homeId: e.target.value })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                              >
                                <option value="">غير محدد بعد</option>
                                {teams.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-slate-700">
                                الطرف الثاني ({match.awayLabel})
                              </label>
                              <select
                                value={matchDraft.awayId}
                                onChange={(e) =>
                                  setMatchDraft({ ...matchDraft, awayId: e.target.value })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                              >
                                <option value="">غير محدد بعد</option>
                                {teams.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-slate-700">
                              أهداف {homeTeam?.name || "الطرف 1"}
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.homeScore}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, homeScore: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-center text-base font-bold"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-slate-700">
                              أهداف {awayTeam?.name || "الطرف 2"}
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.awayScore}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, awayScore: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-center text-base font-bold"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-slate-700">
                              حالة المباراة
                            </label>
                            <select
                              value={matchDraft.status}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, status: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
                            >
                              <option value="upcoming">لم تبدأ</option>
                              <option value="live">مباشر الآن</option>
                              <option value="finished">انتهت</option>
                            </select>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-slate-700">
                              انسحاب سريع (3 - 0)
                            </label>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => applyWalkover("home")}
                                className="flex-1 rounded-lg bg-amber-100 px-2 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200"
                              >
                                فوز الأول 3-0
                              </button>
                              <button
                                type="button"
                                onClick={() => applyWalkover("away")}
                                className="flex-1 rounded-lg bg-amber-100 px-2 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200"
                              >
                                فوز الثاني 3-0
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">
                              صفراء (الطرف 1)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.homeYellow}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, homeYellow: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">
                              حمراء (الطرف 1)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.homeRed}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, homeRed: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">
                              صفراء (الطرف 2)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.awayYellow}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, awayYellow: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-600">
                              حمراء (الطرف 2)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={matchDraft.awayRed}
                              onChange={(e) =>
                                setMatchDraft({ ...matchDraft, awayRed: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-slate-600">
                            ملاحظة المباراة (اختياري)
                          </label>
                          <input
                            type="text"
                            value={matchDraft.note}
                            onChange={(e) =>
                              setMatchDraft({ ...matchDraft, note: e.target.value })
                            }
                            placeholder="مثال: ركلات ترجيح / انسحاب / إيقاف..."
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMatchId(null);
                              setMatchDraft(null);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>إلغاء</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => saveMatchEdit(match.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>حفظ النتيجة</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {match.note && (
                      <div className="mt-2.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 border border-amber-200/70">
                        {match.note}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "standings" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[
              { code: "A", title: "المجموعة الأولى (Group A)" },
              { code: "B", title: "المجموعة الثانية (Group B)" },
            ].map((grp) => (
              <div
                key={grp.code}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
                  <h2 className="font-extrabold text-slate-900">{grp.title}</h2>
                  <span className="text-xs font-semibold text-emerald-700">
                    يتأهل الأول والثاني لنصف النهائي
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs sm:text-sm">
                    <thead className="bg-slate-100/80 text-slate-600">
                      <tr>
                        <th className="px-3 py-2.5 font-bold">#</th>
                        <th className="px-3 py-2.5 font-bold">الفريق</th>
                        <th className="px-2 py-2.5 text-center font-bold">لعب</th>
                        <th className="px-2 py-2.5 text-center font-bold">فوز</th>
                        <th className="px-2 py-2.5 text-center font-bold">تعادل</th>
                        <th className="px-2 py-2.5 text-center font-bold">خسارة</th>
                        <th className="px-2 py-2.5 text-center font-bold">له:عليه</th>
                        <th className="px-2 py-2.5 text-center font-bold">فارق</th>
                        <th className="px-3 py-2.5 text-center font-extrabold text-blue-700">
                          نقاط
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {standings[grp.code].map((row, idx) => (
                        <tr
                          key={row.team.id}
                          className={idx < 2 ? "bg-emerald-50/40" : ""}
                        >
                          <td className="px-3 py-2.5 font-bold">
                            <span
                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                                idx < 2
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {idx + 1}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            {renderTeamBadge(row.team)}
                          </td>
                          <td className="px-2 py-2.5 text-center font-semibold">
                            {row.played}
                          </td>
                          <td className="px-2 py-2.5 text-center text-emerald-700 font-bold">
                            {row.won}
                          </td>
                          <td className="px-2 py-2.5 text-center text-slate-600">
                            {row.drawn}
                          </td>
                          <td className="px-2 py-2.5 text-center text-rose-600">
                            {row.lost}
                          </td>
                          <td className="px-2 py-2.5 text-center text-slate-700">
                            {row.gf}:{row.ga}
                          </td>
                          <td className="px-2 py-2.5 text-center font-bold">
                            {row.gd > 0 ? `+${row.gd}` : row.gd}
                          </td>
                          <td className="px-3 py-2.5 text-center text-base font-extrabold text-blue-700">
                            {row.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "teams" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  {renderTeamBadge(team)}
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                    Group {team.group}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                  {team.players.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5"
                    >
                      <span>{p}</span>
                      <span className="text-slate-400">#{i + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "admin" && isAdmin && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900">
                شعار البطولة والمزامنة والنسخ الاحتياطي
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100">
                  <ImageIcon className="h-4 w-4 text-blue-600" />
                  <span>رفع شعار البطولة / المدرسة</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, (imgData) => {
                        setLeagueLogo(imgData);
                        syncToCloud(teams, matches, imgData);
                      })
                    }
                  />
                </label>

                {leagueLogo && (
                  <button
                    onClick={() => {
                      setLeagueLogo("");
                      syncToCloud(teams, matches, "");
                    }}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                  >
                    إزالة الشعار
                  </button>
                )}

                <button
                  onClick={() => {
                    syncToCloud(teams, matches, leagueLogo);
                    showToast("تمت مزامنة كل البيانات مع السحابة الآن");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  <Cloud className="h-4 w-4" />
                  <span>مزامنة فورية الآن</span>
                </button>

                <button
                  onClick={exportBackup}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  <span>تصدير نسخة احتياطية</span>
                </button>

                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                  <Upload className="h-4 w-4 text-emerald-600" />
                  <span>استعادة نسخة احتياطية</span>
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={importBackup}
                  />
                </label>

                <button
                  onClick={resetAllData}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>إعادة ضبط الكل</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900">
                تعديل أسماء وشعارات وألوان الفرق
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-[180px]">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="h-10 w-10 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: team.color }}
                        >
                          {team.id}
                        </span>
                      )}
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => {
                          const updated = teams.map((t) =>
                            t.id === team.id ? { ...t, name: e.target.value } : t
                          );
                          setTeams(updated);
                          syncToCloud(updated, matches, leagueLogo);
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={team.color}
                        onChange={(e) => {
                          const updated = teams.map((t) =>
                            t.id === team.id ? { ...t, color: e.target.value } : t
                          );
                          setTeams(updated);
                          syncToCloud(updated, matches, leagueLogo);
                        }}
                        className="h-8 w-8 cursor-pointer rounded border border-slate-300 bg-white"
                        title="لون الفريق"
                      />
                      <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100">
                        لوجو
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (imgData) => {
                              const updated = teams.map((t) =>
                                t.id === team.id ? { ...t, logo: imgData } : t
                              );
                              setTeams(updated);
                              syncToCloud(updated, matches, leagueLogo);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900">
                بيانات دخول المشرف
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    setAdminCreds({
                      email: newEmail.trim(),
                      password: newPassword,
                    });
                    showToast("تم تحديث بيانات دخول المشرف");
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                  حفظ بيانات الدخول
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  تسجيل دخول المشرف
                </h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@innovo.edu.eg"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                دخول
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
